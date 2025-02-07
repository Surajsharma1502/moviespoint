const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/movie';
const fs = require('fs');
const { menus, makeHeader, makeCategoryPosterPage } = require('./script2');
const path = require('path');
const moviePosterSchema = new mongoose.Schema({
    title: { type: String, },
    postUrl: { type: String, },
    imgUrl: { type: String, },
    date: { type: String, },
    category: [{ type: String, },]
});


const MovieMOdel = mongoose.model('Movie', moviePosterSchema);

const MovieDetailsSchema = new mongoose.Schema({
    movieId: { type: mongoose.Schema.ObjectId, },
    movieTitle: { type: String, },
    movieDate: { type: String, },
    movieDescriptions: { type: String, },
    posterLink: { type: String, },
    imdbRating: { type: String, },
    language: { type: String, },
    releaseYear: { type: String, },
    format: { type: String, },
    size: { type: String, },
    duration: { type: String, },
    originalLanguage: { type: String, },
    quality: { type: String, },
    genre: { type: String, },
    cast: { type: String, }, // Array of actor names
    writers: { type: String, }, // Array of writers
    directors: { type: String, }, // Array of directors
    screenShot: { type: [String], },
    movieSynopsis: { type: String, },
    downloadLinks: [
        {
            text: { type: String, },
            link: { type: String, }
        }
    ],
});

const MovieDetailsModel = mongoose.model('MovieDetails', MovieDetailsSchema);



function cleanText(text) {
    const cleanedText = text
        .replace(/\s+/g, ' ')        // Replace all whitespace sequences with a single space
        .replace(/^\s+|\s+$/g, '');
    return cleanedText
}

function showProgress(completed, total, barLength = 30) {
    const percent = Math.floor((completed / total) * 100);
    const filledBar = Math.floor((completed / total) * barLength);
    const bar = "█".repeat(filledBar) + "-".repeat(barLength - filledBar);

    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(`Progress:${completed}/${total} [${bar}] ${percent}%`);

};
const getAllMoviesPoster = async () => {
    const baseUrl = "https://bollyflix.co.nl"
    for (const menu of menus) {
        for (const subMenu of menu.subMenu) {
            console.log(`Start ${subMenu.link.split('/').filter(Boolean)}`)
            const data = await extractMoviesPosterData(`${baseUrl}${subMenu.link}`)
            const movieData = data.map(ele => {
                return {
                    ...ele,
                    category: subMenu.link.split('/').filter(Boolean)
                }
            })
            await MovieMOdel.insertMany(movieData)
        }
    }
    await removeDuplicates()
}

const extractMoviesPosterData = async (url) => {
    let pageUrl = url
    let i = 1;
    const blogItems = [];
    let totalPage = 0
    do {
        if (i !== 1)
            pageUrl = url + `page/${i}/`
        const { data } = await axios.get(pageUrl);
        const $ = cheerio.load(data);
        if (!totalPage)
            totalPage = Number($('div.wp-pagenavi a').last().text().trim());
        $('div.blog-items .post-item').each((index, element) => {
            const title = $(element).find('h3.entry-title a').text();
            const postUrl = $(element).find('h3.entry-title a').attr('href');
            const imgUrl = $(element).find('img.blog-picture').attr('src');
            const date = $(element).find('.date-time span').text();
            blogItems.push({ title, postUrl, imgUrl, date });
        });
        showProgress(i, totalPage + 1, 30)
        i++

    } while (i <= totalPage);
    return blogItems;
};
async function removeDuplicates() {
    try {
        const duplicates = await MovieMOdel.aggregate([
            { $group: { _id: "$title", count: { $sum: 1 }, movies: { $push: "$_id" }, categories: { $push: "$category" } } },
            { $match: { count: { $gt: 1 } } }
        ]);

        // Loop through the duplicates and merge categories, then remove extra records
        for (const duplicate of duplicates) {
            const movieIds = duplicate.movies;
            const categories = [...new Set(duplicate.categories.flat())]; // Merge categories and remove duplicates

            // Keep the first movie and update its category field with the merged categories
            await MovieMOdel.updateOne(
                { _id: movieIds[0] },
                { $set: { category: categories } }
            );

            // Remove all other duplicate movies
            movieIds.shift(); // Remove the first ID to keep it
            await MovieMOdel.deleteMany({ _id: { $in: movieIds } });
        }

        console.log('Categories merged and duplicates removed successfully!');
    } catch (error) {
        console.error('Error removing duplicates:', error);
    }
};


const downloadImage = async (url) => {
    try {
        let url1 = `/movies${url}`
        const baseUrl = "https://bollyflix.co.nl"
        const folderPath = path.join(__dirname, path.dirname(url1))
        const fileName = path.basename(url1);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }
        const outputPath = path.join(folderPath, fileName);
        const response = await axios({
            url: baseUrl + url,
            method: 'GET',
            responseType: 'stream'
        });
        return new Promise((resolve, reject) => {
            response.data
                .pipe(fs.createWriteStream(outputPath))
                .on('finish', () => resolve(outputPath))
                .on('error', e => reject(e));
        })
    } catch (error) {
        console.error('Error downloading image:', error);
    }
};

const downloadPosterImage = async () => {
    const BATCH_SIZE = 100; // Process 100 images at a time
    const posters = await MovieMOdel.find({})
    const totalPoster = posters.length;
    for (let i = 0; i < totalPoster; i += BATCH_SIZE) {
        const batch = posters.slice(i, i + BATCH_SIZE);

        await Promise.all(
            batch.map(async (poster, index) => {
                try {
                    await downloadImage(poster.imgUrl)
                } catch (error) {
                    console.error(`Error processing movie at index ${i + index}:`, error);
                }
            })
        );
        showProgress(i + 1, totalPoster, 30);
    }
}


async function extractMoviedetail(url) {
    const { data } = await axios.get(url);
    let $ = cheerio.load(data);

    const extractData = {}


    extractData['movieTitle'] = $('.single-service-content h1').first().text().trim();
    extractData['movieDate'] = $('.single-service-content .entry-meta .entry-date').text().trim();
    extractData['movieDescriptions'] = ''
    extractData['posterLink'] = $('.aligncenter').first().attr('src')
    $('.entry-content').first().children().each((idx, child) => {
        if ($(child).is('p') && idx < 4) {
            extractData['movieDescriptions'] += cleanText($(child).text().trim())
        }
    })
    extractData['imdbRating'] = $('span').filter((i, el) => $(el).text().includes('IMDb Rating:')).text().split(':')[1]?.trim();
    extractData['language'] = $('strong:contains("Language:")')?.next()?.text()?.trim();
    extractData['releaseYear'] = $(`strong:contains("Release Year")`)?.get(0)?.nextSibling?.nodeValue?.trim() || null;
    extractData['format'] = $('strong:contains("Format:")').get(0)?.nextSibling?.nodeValue?.trim() || null;
    extractData['size'] = $('strong:contains("Size:")').get(0)?.nextSibling?.nodeValue?.trim() || null;
    extractData['duration'] = $('strong:contains("Runtime:")').get(0)?.nextSibling?.nodeValue?.trim() || null;
    extractData['originalLanguage'] = $('strong:contains("Original Language:")').get(0)?.nextSibling?.nodeValue?.trim() || null;
    extractData['quality'] = $('strong:contains("Quality:")')?.next()?.text()?.trim();
    extractData['genre'] = $('strong:contains("Genres:")').get(0)?.nextSibling?.nodeValue?.trim() || null;
    extractData['cast'] = $('strong:contains("Cast:")').get(0)?.nextSibling?.nodeValue?.trim() || null;
    extractData['writers'] = $('strong:contains("Writers:")').get(0)?.nextSibling?.nodeValue?.trim() || null;
    extractData['directors'] = $('strong:contains("Director:")').get(0)?.nextSibling?.nodeValue?.trim() || null;
    extractData['screenShot'] = [$('h3:contains("Screenshots")')?.next()?.find('img')?.first()?.attr('src')];
    extractData['movieSynopsis'] = $('h3:contains("Movie-SYNOPSIS/PLOT:")')?.next()?.text()?.trim();
    extractData['downloadLinks'] = [];
    let text = ''
    $('.download-links-div').first().children().each((idx, h3) => {
        if ((idx + 1) % 2 === 0) {
            extractData['downloadLinks']?.push({ text, link: $(h3).find('a')?.first()?.attr('href') })
            text = ''
        } else {
            text = $(h3).text()
        }
    })
    return extractData
}

const BATCH_SIZE = 200;

const getAllMovieDetails = async () => {
    try {
        await MovieDetailsModel.deleteMany({})

        const allMoviesPoster = await MovieMOdel.find({}).lean();
        const totalMovies = allMoviesPoster.length;

        for (let i = 0; i < totalMovies; i += BATCH_SIZE) {
            const batch = allMoviesPoster.slice(i, i + BATCH_SIZE);

            await Promise.all(
                batch.map(async (movie, index) => {
                    try {
                        const data = await extractMoviedetail(movie.postUrl);
                        await MovieDetailsModel.insertOne({ ...data, movieId: data._id });
                    } catch (error) {
                        console.error(`Error processing movie at index ${i + index}:`, error);
                    }
                })
            );
            showProgress(i + 1, totalMovies, 30);
        }

        console.log("All movies processed successfully!");
    } catch (error) {
        console.error("Error processing movies:", error);
    }
};
function makeFolder(folderName) {
    folderName = `./movies/${folderName}`
    if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName, { recursive: true });
    }
}

function writeFile(html, folder, fileName) {
    const folderPath = path.join(__dirname, `/movies/${folder}`)
    const outputPath = path.join(folderPath, fileName);
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
    fs.writeFileSync(outputPath, html)


}





const makeCategory = async () => {
    const perPage = 30;
    for (const menu of menus) {
        for (const subMenu of menu.subMenu) {
            const folderNames = subMenu.link.split('/').filter(Boolean)
            for (const folderName of folderNames) {
                if (!['xfsearch', 'year'].includes(folderName)) {
                    const posters = await MovieMOdel.find({ category: folderName })
                    makeFolder(folderName)
                    const totalPosters = posters.length;
                    const totalPages = Math.ceil(totalPosters / perPage);
                    for (let i = 1; i <= totalPages; i++) {
                        const pagePosters = posters.slice((i - 1) * perPage, i * perPage);
                        let posterPageHtml = makeCategoryPosterPage({
                            category: folderName, posters: pagePosters, pagination: {
                                folderName,
                                total: totalPosters,
                                perPage,
                                currentPage: i,
                            }
                        });
                        if (i === 1) {
                            writeFile(posterPageHtml, folderName, 'index.html')
                        }
                        writeFile(posterPageHtml, `${folderName}/page-${i}/`, 'index.html')
                    }

                }

            }
        }
    }

}




(async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('Connected to MongoDB');
        // await getAllMoviesPoster()
        // await downloadPosterImage()
        // await getAllMovieDetails()
        await makeCategory()



    } catch (error) {
        console.log(error)
    }
    process.exit(0)
})()