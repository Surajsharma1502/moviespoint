

const menus = [
    {
        "label": "Bollywood",
        "link": "/bollywood-movies/",
        "subMenu": [
            {
                "label": "1080p Bollywood Movies",
                "link": "/bollywood-movies/1080p-bollywood-movies-dvdrip-brrip/"
            },
            {
                "label": "300MB Bollywood Movies",
                "link": "/bollywood-movies/bollywood-movies-300mb/"
            },
            {
                "label": "700MB Bollywood Movies",
                "link": "/bollywood-movies/bollywood-movies-600mb/"
            },
            {
                "label": "720p Bollywood Movies",
                "link": "/bollywood-movies/720p-bollywood-movies-dvdrip-brrip/"
            },
            {
                "label": "100MB Hevc Bollywood Movies",
                "link": "/bollywood-movies/bollywood-hevc-movies-100mb-mkv/"
            },
            {
                "label": "New Bollywood Movies HD",
                "link": "/bollywood-movies/bollwood-movies-new-hd/"
            }
        ]
    },
    {
        "label": "Hollywood",
        "link": "/hollywood-movies/",
        "subMenu": [
            {
                "label": "1080p Hollywood Movies",
                "link": "/hollywood-movies/1080p-hollywood-movies-dvdrip-brrip/"
            },
            {
                "label": "720p Hollywood Movies",
                "link": "/hollywood-movies/720p-hollywood-movies-dvdrip-brrip/"
            },
            {
                "label": "Hollywood Movies 300MB",
                "link": "/hollywood-movies/hollywood-300mb-movies/"
            },
            {
                "label": "New Hollywood Movies",
                "link": "/hollywood-movies/hollywood-movies-new/"
            },
            {
                "label": "New Hollywood Movies HD",
                "link": "/hollywood-movies/hollywood-movies-new-hd/"
            }
        ]
    },
    {
        "label": "Dual Audio",
        "link": "/dual-audio-hindi-english-movies/",
        "subMenu": [
            {
                "label": "300MB Dual Audio Movies",
                "link": "/dual-audio-hindi-english-movies/dual-audio-hindi-english-movies-300mb/"
            },
            {
                "label": "720p Dual Audio Movies",
                "link": "/dual-audio-hindi-english-movies/dual-audio-hindi-english-movies-mkv-720p/"
            },
            {
                "label": "100MB Dual Audio Movies",
                "link": "/dual-audio-hindi-english-movies/dual-audio-hindi-english-movies-mkv-100mb/"
            },
            {
                "label": "1080p Dual Audio Movies",
                "link": "/dual-audio-hindi-english-movies/dual-audio-hindi-english-movies-mkv-1080p/"
            },
            {
                "label": "South Indian Dubbed Movies [300MB]",
                "link": "/south-indian-dubbed-movies-300mb/"
            },
            {
                "label": "South Indian Dubbed Movies [720p]",
                "link": "/south-indian-dubbed-movies-download/"
            }
        ]
    },
    {
        "label": "Web Series",
        "link": "/tv-shows/",
        "subMenu": [
            {
                "label": "Hindi Web Series",
                "link": "/web-series-hindi/"
            },
            {
                "label": "Hindi Dubbed TV Series",
                "link": "/hindi-dubbed-tv-shows/"
            },
            {
                "label": "WWE Wrestling",
                "link": "/tv-shows/wwe-wrestling/"
            },
            {
                "label": "Beyond Season 1",
                "link": "/tv-shows/beyond-season-1/"
            }
        ]
    },
    {
        "label": "Genre",
        "link": "",
        "subMenu": [
            {
                "label": "Action Movies",
                "link": "/action/"
            },
            {
                "label": "Adventure Movies",
                "link": "/adventure/"
            },
            {
                "label": "Animated Movies",
                "link": "/animation/"
            },
            {
                "label": "Comedy Movies",
                "link": "/comedy/"
            },
            {
                "label": "Crime Movies",
                "link": "/crime/"
            },
            {
                "label": "Documentary Movies",
                "link": "/documentary/"
            },
            {
                "label": "Drama Movies",
                "link": "/drama/"
            },
            {
                "label": "Family Movies",
                "link": "/family/"
            },
            {
                "label": "Horror Movies",
                "link": "/horror/"
            },
            {
                "label": "Romantic Movies",
                "link": "/romance/"
            },
            {
                "label": "Thriller Movies",
                "link": "/thriller/"
            },
            {
                "label": "War Movies",
                "link": "/war/"
            }
        ]
    },
    {
        "label": "By Year",
        "link": "/category/movies-by-year/",
        "subMenu": [
            { "label": "2025", "link": "/xfsearch/year/2025/" },
            { "label": "2024", "link": "/xfsearch/year/2024/" },
            { "label": "2023", "link": "/xfsearch/year/2023/" },
            { "label": "2022", "link": "/xfsearch/year/2022/" },
            { "label": "2021", "link": "/xfsearch/year/2021/" },
            { "label": "2020", "link": "/xfsearch/year/2020/" },
            { "label": "2019", "link": "/xfsearch/year/2019/" },
            { "label": "2018", "link": "/xfsearch/year/2018/" },
            { "label": "2017", "link": "/xfsearch/year/2017/" },
            { "label": "2016", "link": "/xfsearch/year/2016/" },
            { "label": "2015", "link": "/xfsearch/year/2015/" },
            { "label": "2014", "link": "/xfsearch/year/2014/" },
            { "label": "2013", "link": "/xfsearch/year/2013/" },
            { "label": "2012", "link": "/xfsearch/year/2012/" },
            { "label": "2011", "link": "/xfsearch/year/2011/" },
            { "label": "2010", "link": "/xfsearch/year/2010/" },
            { "label": "2009", "link": "/xfsearch/year/2009/" },
            { "label": "2008", "link": "/xfsearch/year/2008/" },
            { "label": "2007", "link": "/xfsearch/year/2007/" },
            { "label": "2006", "link": "/xfsearch/year/2006/" },
            { "label": "2005", "link": "/xfsearch/year/2005/" },
            { "label": "2004", "link": "/xfsearch/year/2004/" },
            { "label": "2003", "link": "/xfsearch/year/2003/" },
            { "label": "2002", "link": "/xfsearch/year/2002/" },
            { "label": "2001", "link": "/xfsearch/year/2001/" },
            { "label": "2000", "link": "/xfsearch/year/2000/" }
        ]
    }
]


const makeHeader = () => {
    let html = '';
    for (const menu of menus) {
        html += `
            <li class="relative group">
                <a href="#" class="hover:text-yellow-500">${menu.label}</a>
                <div class="absolute z-10 hidden group-hover:block left-0 pt-2">
                <ul class="mt-2 py-2 w-48 bg-gray-800 rounded-md shadow-lg">
            `;
        for (const subMenu of menu.subMenu) {
            const folderNames = subMenu.link.split('/').filter(Boolean)
            for (const folderName of folderNames) {
                if (!['xfsearch', 'year'].includes(folderName)) {
                    html += `<li>
                      <a href="/${folderName}/" class="block px-4 py-2 hover:bg-gray-700">${folderName}</a>
                    </li>`;
                }

            }
        }
        html += `</ul>
            </div>
            </li>
        `;
    }
    return html
}


const makePoster = (posters) => {
    let posterHtml = ''
    for (const element of posters) {
        const { imgUrl, title, date } = element
        posterHtml += `<div class="bg-gray-800 p-4 rounded-lg">
            <img src="${imgUrl}" alt="${title}" class="w-full h-auto rounded-md">
                <h3 class="mt-2 text-sm">${title}</h3>
                <p class="text-xs">${date}</p>
        </div>`
    }
    return posterHtml
}



const makePagination = ({ folderName, total, perPage = 30, currentPage = 1 }) => {
    const totalPages = Math.ceil(total / perPage);
    if (totalPages <= 1) return ''; // No pagination needed if only one page

    let paginationHTML = '<ul class="flex space-x-2">';

    // Previous button
    if (currentPage > 1) {
        paginationHTML += `<li><a href="/${folderName}/${currentPage === 2 ? 'index.html' : 'page-' + (currentPage - 1) + '/' + 'index.html'}" class="px-3 py-1 bg-gray-700 text-white rounded">«</a></li>`;
    }

    // Page numbers logic
    if (totalPages <= 8) {
        // Show all pages if total pages are 8 or less
        for (let i = 1; i <= totalPages; i++) {
            const link = i === 1 ? `/${folderName}/index.html` : `/${folderName}/page-${i}/index.html`;
            paginationHTML += `<li><a href="${link}" class="px-3 py-1 ${i === currentPage ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-white'} rounded">${i}</a></li>`;
        }
    } else {
        // If pages are more than 8, show logic to display limited pages
        if (currentPage <= 4) {
            // Show first 4 pages + "..."
            for (let i = 1; i <= 4; i++) {
                const link = i === 1 ? `/${folderName}/index.html` : `/${folderName}/page-${i}/index.html`;
                paginationHTML += `<li><a href="${link}" class="px-3 py-1 ${i === currentPage ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-white'} rounded">${i}</a></li>`;
            }
            paginationHTML += `<li><span class="px-3 py-1 text-white">...</span></li>`;
            paginationHTML += `<li><a href="/${folderName}/page-${totalPages}/index.html" class="px-3 py-1 bg-gray-700 text-white rounded">${totalPages}</a></li>`;
        } else if (currentPage >= totalPages - 3) {
            // Show "..." + last 4 pages
            paginationHTML += `<li><a href="/${folderName}/index.html" class="px-3 py-1 bg-gray-700 text-white rounded">1</a></li>`;
            paginationHTML += `<li><span class="px-3 py-1 text-white">...</span></li>`;
            for (let i = totalPages - 3; i <= totalPages; i++) {
                const link = `/${folderName}/page-${i}/index.html`;
                paginationHTML += `<li><a href="${link}" class="px-3 py-1 ${i === currentPage ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-white'} rounded">${i}</a></li>`;
            }
        } else {
            // Show first page, "..." before current page, current page, "..." after current page, last page
            paginationHTML += `<li><a href="/${folderName}/index.html" class="px-3 py-1 bg-gray-700 text-white rounded">1</a></li>`;
            paginationHTML += `<li><span class="px-3 py-1 text-white">...</span></li>`;

            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                const link = `/${folderName}/page-${i}/index.html`;
                paginationHTML += `<li><a href="${link}" class="px-3 py-1 ${i === currentPage ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-white'} rounded">${i}</a></li>`;
            }

            paginationHTML += `<li><span class="px-3 py-1 text-white">...</span></li>`;
            paginationHTML += `<li><a href="/${folderName}/page-${totalPages}/index.html" class="px-3 py-1 bg-gray-700 text-white rounded">${totalPages}</a></li>`;
        }
    }

    // Next button
    if (currentPage < totalPages) {
        paginationHTML += `<li><a href="/${folderName}/page-${currentPage + 1}/index.html" class="px-3 py-1 bg-gray-700 text-white rounded">»</a></li>`;
    }

    paginationHTML += '</ul>';
    return paginationHTML;
};




const makeCategoryPosterPage = ({ category, posters, pagination }) => {

    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Movie Point</title>
        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-black text-white">
        <header class="bg-gray-900 py-4 px-8">
            <div class="flex justify-between items-center">
                <h1 class="text-2xl font-bold">Movie Point</h1>
                <nav>
                    <ul class="flex space-x-6 items-center">
                        <li><a href="mop-/" class="hover:text-yellow-500">Home</a></li>
                        ${makeHeader()}
                    </ul>
                </nav>
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="text" id="search-navbar"
                        class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search...">
                </div>
            </div>
        </header>
    
        <main class="p-8">
            
            <section class="mb-8">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-semibold">${category}</h2>
                    <a href="#" class="text-yellow-500 hover:underline">See all</a>
                </div>
                <div class="grid grid-cols-6 gap-4">
                    ${makePoster(posters)}
                </div>
                <div class="flex justify-center mt-6">
                    <ul class="flex space-x-2">
                    ${makePagination(pagination)}
                    </ul>
                </div>
            </section>
        </main>
    
        <footer class="bg-gray-900 py-4 text-center">
            <p>&copy; 2025 Movie Hunter. All rights reserved.</p>
        </footer>
    </body>
    
    </html>
    `
}

module.exports = { makeCategoryPosterPage, menus }