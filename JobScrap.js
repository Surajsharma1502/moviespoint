const axios = require('axios');
const cheerio = require('cheerio');
async function scrapeLattestJobs() {
    try {
        const url = 'https://www.sarkariresult.com/latestjob/'
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const jobs = []
        $('#post ul li').each((index, element) => {
            const jobTitle = $(element).find('a').text().trim();
            const jobLink = $(element).find('a').attr('href');
            const lastDate = $(element).text().match(/Last Date : (\d{2}\/\d{2}\/\d{4})/)?.[1];
            jobs.push({ jobTitle, jobLink, lastDate })
        });
        return jobs
    } catch (error) {
        console.error('Error scraping the website:', error);
    }
}
async function scrapeJobData(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
    
        let extractedData = [];
        $('table').map((i, table) => {
            if (i === 1) {  // Check if the table index is 1
                let temp=[]
                $(table).find('tr').each((index, row) => {  // Iterate through each row
                    const key = $(row).find('td').eq(0).text();  // First td is the key
                    const value = $(row).find('td').eq(1).text().trim();  // Second td is the value
                    // console.log(`${key}${value}`);
                    temp.push({key,value})
                });
                extractedData.push(temp)
            } else if (i === 2) {
                const tableData = []
                let isNestedTable = false
                let nestedTable = { heading: [], rows: [] }
                $(table).find('tr').each((index, row) => {
                    let nestedTableData = []
    
                    $(row).children().each((_, td) => {
                        const rowData = []
                        $(td).children().each((_, el) => {
                            if ($(el).is('h2')) {
                                if(isNestedTable){
                                    tableData.push(nestedTable)
                                    nestedTable = { heading: [], rows: [] }
                                    nestedTableData = []
                                    isNestedTable=false
                                }
                                const link=$(el).find('a').attr('href');
                                if(link)
                                    rowData.push({link,label:$(el).text().trim()});    
                                else
                                rowData.push($(el).text().trim());
                            } else if ($(el).is('ul')) {
                                let list=[]
                                $(el).find('li').each((_, li) => {
                                    const text = $(li).text().trim();
                                    const [key, value] = text.split(':').map(str => str.trim());
                                    list.push(value ? { [key]: value } : key)
                                });
                                rowData.push({list})
                            }
                            else if ($(el).is('p')) {
                                isNestedTable = true
                                nestedTableData.push($(el).text().trim())
                            }
                        });
                        if (!isNestedTable)
                            tableData.push(rowData)                        
                        
                    });
                    if (!nestedTable.heading.length && nestedTableData.length) {
                        nestedTable.heading=nestedTableData
                    } else if(nestedTableData.length) {
                        nestedTable.rows=nestedTableData
                    }
                });
                extractedData.push(tableData)
            }
        });
        return extractedData
    } catch (error) {
        console.log(error)
    }
}


const { scrapeLattestJobs, scrapeJobData } = require("./scrap");
const fs =require('fs');

function showProgress(completed, total,barLength=30) {
    const percent = Math.floor((completed / total) * 100);
    const filledBar = Math.floor((completed / total) * barLength);
    const bar = "█".repeat(filledBar) + "-".repeat(barLength - filledBar);

    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(`Progress: [${bar}] ${percent}%`);

};

(async () => {
    try {
        const jobs = await scrapeLattestJobs(); // Get the list of latest jobs
        let jobDetails = [];
        let i=0;
        for (const job of jobs) {
            const details = await scrapeJobData(job.jobLink); // Fetch job details
            jobDetails.push({ job, details }); // Merge job listing with job details
            showProgress(i, jobs.length);
            i++
        }
        fs.writeFileSync("jobs.json", JSON.stringify(jobDetails, null, 2));
        console.log("✅ Job data saved successfully!");
    } catch (error) {
        console.error("❌ Error scraping jobs:", error.message);
    }
})();