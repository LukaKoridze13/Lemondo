import Data from '../Data/data.js' // Importing data

let domains = Data.domainList; // All domains from data
let categories = Data.categories; // All categories from data
let domainZones = []; // Domain Extensions 
let visibleDomains = domains; // List that should be sorted and fileted
// Creating available domains list
domains.forEach((dom) => {
    if (!domainZones.includes(dom.domainExtension)) {
        domainZones.push(dom.domainExtension);
    }
})

// Adding Categories to domains
domains = domains.map((item, id) => {
    item.categories.map((category) => {
        categories.map((it) => {
            if (category === it.id) {
                item.categories.push(it.name)
            }
        })
    })
    item.uniqueID = id
    return item
})

// Removing Category IDs from domains
domains.forEach((item) => {
    for (let i = 0; i < item.categories.length / 2; i++) {
        item.categories.shift()
    }
})

// Finding Highest Available Price for price range
let prices = domains.map((items) => {
    return items.price
})
prices = prices.sort((a, b) => b - a);
const highestPrice = prices[0] // Highest Price
const highestSymbol = 30;

// All filters, that are collected from inputs
let filters = {
    name: null,
    priceMin: 0,
    priceMax: highestPrice,
    symbolMin: 0,
    symbolMax: highestSymbol,
    categories: [],
    zone: []
};


// Domains on the market counter
let domainCount = document.querySelector('.domenebiMarketze span')
domainCount.innerText = domains.length

// Creating Sorting Options
let sorters = document.querySelectorAll('.sorters p')
let sortImage = document.createElement('img') // Active Sorting Image
sortImage.style.marginLeft = '5px'
sortImage.src = '../Images/sort.svg'
sorters.forEach((option) => {
    option.addEventListener('click', (e) => {
        sorters.forEach((item) => {
            if (item.classList.contains('activeSort')) {
                item.children[0].remove();
            }
            item.classList.remove('activeSort')
        })
        option.classList.add('activeSort')
        option.appendChild(sortImage)
    })
})


// Creating Categories Chedckboxes
let categoriesDiv = document.querySelectorAll('.categoriesDiv')
categoriesDiv.forEach((boxer) => {
    categories.forEach((category) => {
        let box = document.createElement('div')
        box.style.display = 'flex'
        box.style.alignItems = 'center'
        box.style.marginTop = '25px'
        let checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.name = category.name
        checkbox.id = category.name
        let label = document.createElement('label')
        label.setAttribute('for', category.name)
        label.innerText = category.name
        box.appendChild(checkbox)
        box.appendChild(label)
        boxer.appendChild(box)

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                if (!filters.categories.includes(category.name)) {
                    filters.categories.push(category.name)
                }
            } else {
                filters.categories.splice(filters.categories.indexOf(category.name), 1);
            }
            filter();
        })
    })
})

// Domain Zones Checkboxes
let domainZone = document.querySelectorAll('.domainZones')
domainZone.forEach((boxer) => {
    domainZones.forEach((zone) => {
        let box = document.createElement('div')
        box.style.display = 'flex'
        box.style.alignItems = 'center'
        box.style.marginTop = '25px'
        let checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.name = zone
        checkbox.id = zone
        let label = document.createElement('label')
        label.setAttribute('for', zone)
        label.innerText = zone
        box.appendChild(checkbox)
        box.appendChild(label)
        boxer.appendChild(box)

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                if (!filters.zone.includes(zone)) {
                    filters.zone.push(zone)
                }
            } else {
                filters.zone.splice(filters.zone.indexOf(zone), 1);
            }
            filter();
        })
    })
})


// Drawing Domain Cards
let parent = document.querySelector('main .products .content_desktop .middle .right')
let parentMobile = document.querySelector('.content_mobile .right')
drawCards(domains);


// Sortings
let date = document.querySelectorAll('.sorters .date') // Date 
let deadline = document.querySelectorAll('.sorters .deadline') // Valid untill
let price = document.querySelectorAll('.sorters .price') // Price
let alphabet = document.querySelectorAll('.sorters .alphabet') // Name
let reversed = false; // If true, it's sorted by deadline, if false, it's sorted by date added
deadline.forEach((de) => {
    de.addEventListener('click', () => {
        if (!reversed) {
            visibleDomains = visibleDomains.reverse();
            drawCards(visibleDomains)
            reversed = !reversed;
        }
    })
})
date.forEach((de) => {
    de.addEventListener('click', () => {
        if (reversed) {
            visibleDomains = visibleDomains.reverse();
            drawCards(visibleDomains)
            reversed = !reversed;
        }
    })
})
price.forEach((de) => {
    de.addEventListener('click', () => {
        visibleDomains = visibleDomains.sort((a, b) => {
            return a.price - b.price
        })
        drawCards(visibleDomains)
    })
})
alphabet.forEach((de) => {
    de.addEventListener('click', () => {
        visibleDomains = visibleDomains.sort(function (a, b) {
            var textA = a.domainName.toUpperCase();
            var textB = b.domainName.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        drawCards(visibleDomains)
    })
})

if(window.innerWidth <= 480 ){
    // Inputs
    let minPriceInp = document.querySelectorAll('#minPrice')[1] // Min Price Input
    let maxPriceInp = document.querySelectorAll('#maxPrice')[1] // Max Price Input
    let minSymbolInp = document.querySelectorAll('#minSymbol')[1] // Min Symbol Input
    let maxSymbolInp = document.querySelectorAll('#maxSymbol')[1] // ax Symbol Input
    let minPrice = document.querySelectorAll('.minPrice')[1] // minPrice Dragger
    let maxPrice = document.querySelectorAll('.maxPrice')[1] // MaxPrice Dragger
    let minSymbol = document.querySelectorAll('.minSymbol')[1] //  minSymbol Dragger
    let maxSymbol = document.querySelectorAll('.maxSymbol')[1] // MaxSymbol Dragger
    let barPrice = document.querySelectorAll('.barPrice')[1] // price range bar
    let barSymbol = document.querySelectorAll('.barSymbol')[1] // symbol range bar
    let width = barPrice.getBoundingClientRect().width // bar width
    let x = barPrice.getBoundingClientRect().x  // bar X position

    minPriceInp.addEventListener('keyup', () => {

        // If max or price is not inputed, set to highest
        if (maxPriceInp.value === '') {
            maxPriceInp.value = highestPrice
        }


        if (Number(minPriceInp.value) < 0) {
            minPriceInp.value = 0
        }

        // calculated left px and sets
        let calc = Math.round(Number(minPriceInp.value) / highestPrice * width) - 12.5
        if (calc < 0) {
            calc = 0
        }
        if (calc > width - 12.5) {
            calc = width - 12.5
        }
        console.log(calc)

        minPrice.style.left = `${calc}px`

        // calculating green color starting and ending for range bar
        let startGreen = Math.round((Number(minPriceInp.value) / highestPrice * 100) * 10) / 10
        let endGreen = Math.round((Number(maxPriceInp.value) / highestPrice * 100) * 10) / 10
        barPrice.style.background = `linear-gradient(to right, #696974, #696974 ${startGreen - 1}%,#99CC66 ${startGreen}%,#99CC66 ${endGreen - 3}%, #696974 ${endGreen - 4}%)`

        // Adding minimum Price in filters
        filters.priceMin = Number(minPriceInp.value)

        // filter
        filter();

    });
    maxPriceInp.addEventListener('keyup', () => {
        // If min price is not inputed, set to highest
        if (minPriceInp.value === '') {
            minPriceInp.value = 0
        }

        // Checks if input value is valid
        if (Number(maxPriceInp.value) > highestPrice) {
            maxPriceInp.value = highestPrice
        }

        // calculated left px and sets
        let calc = Math.round(Number(maxPriceInp.value) / highestPrice * width) - 12.5
        if (calc < 0) {
            calc = 0
        }
        if (calc > width - 12.5) {
            calc = width - 12.5
        }
        maxPrice.style.left = `${calc}px`

        // calculating green color starting and ending for range bar
        let startGreen = Math.round((Number(minPriceInp.value) / highestPrice * 100) * 10) / 10
        let endGreen = Math.round((Number(maxPriceInp.value) / highestPrice * 100) * 10) / 10
        barPrice.style.background = `linear-gradient(to right, #696974, #696974 ${startGreen - 1}%,#99CC66 ${startGreen}%,#99CC66 ${endGreen - 3}%, #696974 ${endGreen - 4}%)`

        // Adding minimum Price in filters
        filters.priceMax = Number(maxPriceInp.value)

        // filter
        filter();
    });
    minSymbolInp.addEventListener('keyup', () => {

        // If max or Symbol is not inputed, set to highest
        if (maxSymbolInp.value === '') {
            maxSymbolInp.value = highestSymbol
        }


        if (Number(minSymbolInp.value) < 0) {
            minSymbolInp.value = 0
        }

        // calculated left px and sets
        let calc = Math.round(Number(minSymbolInp.value) / highestSymbol * width) - 12.5
        if (calc < 0) {
            calc = 0
        }
        if (calc > width - 12.5) {
            calc = width - 12.5
        }
        minSymbol.style.left = `${calc}px`

        // calculating green color starting and ending for range bar
        let startGreen = Math.round((Number(minSymbolInp.value) / highestSymbol * 100) * 10) / 10
        let endGreen = Math.round((Number(maxSymbolInp.value) / highestSymbol * 100) * 10) / 10
        barSymbol.style.background = `linear-gradient(to right, #696974, #696974 ${startGreen - 1}%,#99CC66 ${startGreen}%,#99CC66 ${endGreen - 3}%, #696974 ${endGreen - 4}%)`

        // Adding minimum Symbol in filters
        filters.symbolMin = Number(minSymbolInp.value)

        // filter
        filter();

    });
    maxSymbolInp.addEventListener('keyup', () => {
        // If min Symbol is not inputed, set to highest
        if (minSymbolInp.value === '') {
            minSymbolInp.value = 0
        }

        // Checks if input value is valid
        if (Number(maxSymbolInp.value) > highestSymbol) {
            maxSymbolInp.value = highestSymbol
        }

        // calculated left px and sets
        let calc = Math.round(Number(maxSymbolInp.value) / highestSymbol * width) - 12.5
        if (calc < 0) {
            calc = 0
        }
        if (calc > width - 12.5) {
            calc = width - 12.5
        }
        maxSymbol.style.left = `${calc}px`
        // calculating green color starting and ending for range bar
        let startGreen = Math.round((Number(minSymbolInp.value) / highestSymbol * 100) * 10) / 10
        let endGreen = Math.round((Number(maxSymbolInp.value) / highestSymbol * 100) * 10) / 10
        barSymbol.style.background = `linear-gradient(to right, #696974, #696974 ${startGreen - 1}%,#99CC66 ${startGreen}%,#99CC66 ${endGreen - 3}%, #696974 ${endGreen - 4}%)`

        // Adding minimum Symbol in filters
        filters.symbolMax = Number(maxSymbolInp.value)

        // filter
        filter();
    });
    // If user left input without instering valid value
    minSymbolInp.addEventListener('blur', () => {
        if (minSymbolInp.value === '') {
            minSymbolInp.value = 0
            filters.symbolMin = 0;
        }
        // Checks if input value is valid
        if (Number(minSymbolInp.value) > Number(maxSymbolInp.value)) {
            minSymbolInp.value = Number(maxSymbolInp.value)
        }
        filter();
        // calculated left px and sets
        let calc = Math.round(Number(minSymbolInp.value) / highestSymbol * width) - 12.5
        if (calc < 0) {
            calc = 0
        }
        if (calc > width - 12.5) {
            calc = width - 12.5
        }
        minSymbol.style.left = `${calc}px`
        // calculating green color starting and ending for range bar
        let startGreen = Math.round((Number(minSymbolInp.value) / highestSymbol * 100) * 10) / 10
        let endGreen = Math.round((Number(maxSymbolInp.value) / highestSymbol * 100) * 10) / 10
        barSymbol.style.background = `linear-gradient(to right, #696974, #696974 ${startGreen - 1}%,#99CC66 ${startGreen}%,#99CC66 ${endGreen - 3}%, #696974 ${endGreen - 4}%)`
    })
    maxSymbolInp.addEventListener('blur', () => {
        if (maxSymbolInp.value === '') {
            minSymbolInp.value = highestSymbol
            filters.symbolMax = highestSymbol;
        }
        if (Number(minSymbolInp.value) > Number(maxSymbolInp.value)) {
            maxSymbolInp.value = Number(minSymbolInp.value)
        }
        filter();
        // calculated left px and sets
        let calc = Math.round(Number(maxSymbolInp.value) / highestSymbol * width) - 12.5
        if (calc < 0) {
            calc = 0
        }
        if (calc > width - 12.5) {
            calc = width - 12.5
        }
        maxSymbol.style.left = `${calc}px`

        // calculating green color starting and ending for range bar
        let startGreen = Math.round((Number(minSymbolInp.value) / highestSymbol * 100) * 10) / 10
        let endGreen = Math.round((Number(maxSymbolInp.value) / highestSymbol * 100) * 10) / 10
        barSymbol.style.background = `linear-gradient(to right, #696974, #696974 ${startGreen - 1}%,#99CC66 ${startGreen}%,#99CC66 ${endGreen}%, #696974 ${endGreen}%)`

    })
    minPriceInp.addEventListener('blur', () => {
        if (minPriceInp.value === '') {
            minPriceInp.value = 0
            filters.priceMin = 0;
        }
        // Checks if input value is valid
        if (Number(minPriceInp.value) > Number(maxPriceInp.value)) {
            minPriceInp.value = Number(maxPriceInp.value)
            filters.priceMin = Number(maxPriceInp.value)
        }
        filter();
        // calculated left px and sets
        let calc = Math.round(Number(minPriceInp.value) / highestPrice * width) - 12.5
        if (calc < 0) {
            calc = 0
        }
        if (calc > width - 12.5) {
            calc = width - 12.5
        }
        console.log(calc)
        minPrice.style.left = `${calc}px`
        // calculating green color starting and ending for range bar
        let startGreen = Math.round((Number(minPriceInp.value) / highestPrice * 100) * 10) / 10
        let endGreen = Math.round((Number(maxPriceInp.value) / highestPrice * 100) * 10) / 10
        barPrice.style.background = `linear-gradient(to right, #696974, #696974 ${startGreen - 1}%,#99CC66 ${startGreen}%,#99CC66 ${endGreen - 3}%, #696974 ${endGreen - 4}%)`
    })
    maxPriceInp.addEventListener('blur', () => {
        if (maxPriceInp.value === '') {
            minPriceInp.value = highestPrice
            filters.priceMax = highestPrice;
        }
        if (Number(minPriceInp.value) > Number(maxPriceInp.value)) {
            maxPriceInp.value = Number(minPriceInp.value)
        }
        filter();
        // calculated left px and sets
        let calc = Math.round(Number(maxPriceInp.value) / highestPrice * width) - 12.5
        if (calc < 0) {
            calc = 0
        }
        if (calc > width - 12.5) {
            calc = width - 12.5
        }
        maxPrice.style.left = `${calc}px`

        // calculating green color starting and ending for range bar
        let startGreen = Math.round((Number(minPriceInp.value) / highestPrice * 100) * 10) / 10
        let endGreen = Math.round((Number(maxPriceInp.value) / highestPrice * 100) * 10) / 10
        barPrice.style.background = `linear-gradient(to right, #696974, #696974 ${startGreen - 1}%,#99CC66 ${startGreen}%,#99CC66 ${endGreen - 3}%, #696974 ${endGreen - 4}%)`

    })

    // Search

    let search = document.querySelectorAll('.search');
    search.forEach((pe) => {
        pe.addEventListener('keyup', (e) => {
            filters.name = e.target.value
            if (e.target.value === '') {
                filters.name = null;
            }
            filter()
        })
    })
    search.forEach((pe) => {
        pe.addEventListener('blur', (e) => {
            filters.name = e.target.value
            if (e.target.value === '') {
                filters.name = null;
            }
            filter()
        })
    })


    // Range Dragging

    // stopping drag after mouse is up
    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', moveMinPrice)
        document.removeEventListener('mousemove', moveMaxPrice)
        document.removeEventListener('mousemove', moveMinSymbol)
        document.removeEventListener('mousemove', moveMaxSymbol)
    })

    // events 
    minPrice.addEventListener('mousedown', () => {
        document.addEventListener('mousemove', moveMinPrice)
    })
    function moveMinPrice(event) {
        let left = event.clientX - x - 12.5
        if (left < 0) {
            left = 0
        }
        if (left > width - 12.5) {
            left = width - 12.5
        }
        if (maxPrice.style.left === '') {
            let limit = width - 37.5
            if (left >= limit) {
                left = limit
            }
        } else {
            let limit = parseInt(maxPrice.style.left) - 25
            if (left >= limit) {
                left = limit
            }
        }

        minPrice.style.left = left + 'px';
        // Changing min price value
        minPriceInp.value = Math.round((left + 12.5) / width * highestPrice)
        if (left === 0) {
            minPriceInp.value = 0;
        }
        minPriceInp.click();
    }
    minPriceInp.addEventListener('click', () => {

        // If max or price is not inputed, set to highest
        if (maxPriceInp.value === '') {
            maxPriceInp.value = highestPrice
        }


        if (Number(minPriceInp.value) < 0) {
            minPriceInp.value = 0
        }

        // calculating green color starting and ending for range bar
        let startGreen = Math.round((Number(minPriceInp.value) / highestPrice * 100) * 10) / 10
        let endGreen = Math.round((Number(maxPriceInp.value) / highestPrice * 100) * 10) / 10
        barPrice.style.background = `linear-gradient(to right, #696974, #696974 ${startGreen - 1}%,#99CC66 ${startGreen}%,#99CC66 ${endGreen - 3}%, #696974 ${endGreen - 4}%)`

        // Adding minimum Price in filters
        filters.priceMin = Number(minPriceInp.value)

        // filter
        filter();

    });

    maxPrice.addEventListener('mousedown', () => {
        document.addEventListener('mousemove', moveMaxPrice)
    })
    function moveMaxPrice(event) {
        let left = event.clientX - x - 12.5
        if (left < 0) {
            left = 0
        }
        if (left > width - 12.5) {
            left = width - 12.5
        }
        let limit = parseInt(minPrice.style.left) + 25
        if (left <= limit) {
            left = limit
        }
        maxPrice.style.left = left + 'px';
        // Changing max price value
        maxPriceInp.value = Math.round((left + 12.5) / width * highestPrice)
        if (left === width) {
            maxPriceInp.value = highestPrice;
        }
        if (left === 0) {
            maxPriceInp.value = 0;
        }
        maxPriceInp.click();
    }
    maxPriceInp.addEventListener('click', () => {
        // If min price is not inputed, set to highest
        if (minPriceInp.value === '') {
            minPriceInp.value = 0
        }
        // Checks if input value is valid
        if (Number(maxPriceInp.value) > highestPrice) {
            maxPriceInp.value = highestPrice
        }
        // calculating green color starting and ending for range bar
        let startGreen = Math.round((Number(minPriceInp.value) / highestPrice * 100) * 10) / 10
        let endGreen = Math.round((Number(maxPriceInp.value) / highestPrice * 100) * 10) / 10
        barPrice.style.background = `linear-gradient(to right, #696974, #696974 ${startGreen - 1}%,#99CC66 ${startGreen}%,#99CC66 ${endGreen - 3}%, #696974 ${endGreen - 4}%)`
        // Adding minimum Price in filters
        filters.priceMax = Number(maxPriceInp.value)
        // filter
        filter();
    });

    minSymbol.addEventListener('mousedown', () => {
        document.addEventListener('mousemove', moveMinSymbol)
    })
    function moveMinSymbol(event) {
        let left = event.clientX - x - 12.5
        if (left < 0) {
            left = 0
        }
        if (left > width - 12.5) {
            left = width - 12.5
        }
        if (maxSymbol.style.left === '') {
            let limit = width - 37.5
            if (left >= limit) {
                left = limit
            }
        } else {
            let limit = parseInt(maxSymbol.style.left) - 25
            if (left >= limit) {
                left = limit
            }
        }

        minSymbol.style.left = left + 'px';
        // Changing min Symbol value
        minSymbolInp.value = Math.round((left + 12.5) / width * highestSymbol)
        if (left === 0) {
            minSymbolInp.value = 0;
        }
        minSymbolInp.click();
    }
    minSymbolInp.addEventListener('click', () => {

        // If max or Symbol is not inputed, set to highest
        if (maxSymbolInp.value === '') {
            maxSymbolInp.value = highestSymbol
        }


        if (Number(minSymbolInp.value) < 0) {
            minSymbolInp.value = 0
        }

        // calculating green color starting and ending for range bar
        let startGreen = Math.round((Number(minSymbolInp.value) / highestSymbol * 100) * 10) / 10
        let endGreen = Math.round((Number(maxSymbolInp.value) / highestSymbol * 100) * 10) / 10
        barSymbol.style.background = `linear-gradient(to right, #696974, #696974 ${startGreen - 1}%,#99CC66 ${startGreen}%,#99CC66 ${endGreen - 3}%, #696974 ${endGreen - 4}%)`

        // Adding minimum Symbol in filters
        filters.symbolMin = Number(minSymbolInp.value)

        // filter
        filter();

    });

    maxSymbol.addEventListener('mousedown', () => {
        document.addEventListener('mousemove', moveMaxSymbol)
    })
    function moveMaxSymbol(event) {
        let left = event.clientX - x - 12.5
        if (left < 0) {
            left = 0
        }
        if (left > width - 12.5) {
            left = width - 12.5
        }
        let limit = parseInt(minSymbol.style.left) + 25
        if (left <= limit) {
            left = limit
        }
        maxSymbol.style.left = left + 'px';
        // Changing max Symbol value
        maxSymbolInp.value = Math.round((left + 12.5) / width * highestSymbol)
        if (left === width) {
            maxSymbolInp.value = highestSymbol;
        }
        if (left === 0) {
            maxSymbolInp.value = 0;
        }
        maxSymbolInp.click();
    }
    maxSymbolInp.addEventListener('click', () => {
        // If min Symbol is not inputed, set to highest
        if (minSymbolInp.value === '') {
            minSymbolInp.value = 0
        }
        // Checks if input value is valid
        if (Number(maxSymbolInp.value) > highestSymbol) {
            maxSymbolInp.value = highestSymbol
        }
        // calculating green color starting and ending for range bar
        let startGreen = Math.round((Number(minSymbolInp.value) / highestSymbol * 100) * 10) / 10
        let endGreen = Math.round((Number(maxSymbolInp.value) / highestSymbol * 100) * 10) / 10
        barSymbol.style.background = `linear-gradient(to right, #696974, #696974 ${startGreen - 1}%,#99CC66 ${startGreen}%,#99CC66 ${endGreen - 3}%, #696974 ${endGreen - 4}%)`
        // Adding minimum Symbol in filters
        filters.symbolMax = Number(maxSymbolInp.value)
        // filter
        filter();
    });
}else{
    // Inputs
let minPriceInp = document.querySelector('#minPrice') // Min Price Input
let maxPriceInp = document.querySelector('#maxPrice') // Max Price Input
let minSymbolInp = document.querySelector('#minSymbol') // Min Symbol Input
let maxSymbolInp = document.querySelector('#maxSymbol') // ax Symbol Input
let minPrice = document.querySelector('.minPrice') // minPrice Dragger
let maxPrice = document.querySelector('.maxPrice') // MaxPrice Dragger
let minSymbol = document.querySelector('.minSymbol') //  minSymbol Dragger
let maxSymbol = document.querySelector('.maxSymbol') // MaxSymbol Dragger
let barPrice = document.querySelector('.barPrice') // price range bar
let barSymbol = document.querySelector('.barSymbol') // symbol range bar
let width = barPrice.getBoundingClientRect().width // bar width
let x = barPrice.getBoundingClientRect().x  // bar X position

minPriceInp.addEventListener('keyup', () => {

    // If max or price is not inputed, set to highest
    if (maxPriceInp.value === '') {
        maxPriceInp.value = highestPrice
    }


    if (Number(minPriceInp.value) < 0) {
        minPriceInp.value = 0
    }

    // calculated left px and sets
    let calc = Math.round(Number(minPriceInp.value) / highestPrice * width) - 12.5
    if (calc < 0) {
        calc = 0
    }
    if (calc > width - 12.5) {
        calc = width - 12.5
    }
    console.log(calc)

    minPrice.style.left = `${calc}px`

    // calculating green color starting and ending for range bar
    let startGreen = Math.round((Number(minPriceInp.value) / highestPrice * 100) * 10) / 10
    let endGreen = Math.round((Number(maxPriceInp.value) / highestPrice * 100) * 10) / 10
    barPrice.style.background = `linear-gradient(to right, #696974, #696974 ${startGreen - 1}%,#99CC66 ${startGreen}%,#99CC66 ${endGreen - 3}%, #696974 ${endGreen - 4}%)`

    // Adding minimum Price in filters
    filters.priceMin = Number(minPriceInp.value)

    // filter
    filter();

});
maxPriceInp.addEventListener('keyup', () => {
    // If min price is not inputed, set to highest
    if (minPriceInp.value === '') {
        minPriceInp.value = 0
    }

    // Checks if input value is valid
    if (Number(maxPriceInp.value) > highestPrice) {
        maxPriceInp.value = highestPrice
    }

    // calculated left px and sets
    let calc = Math.round(Number(maxPriceInp.value) / highestPrice * width) - 12.5
    if (calc < 0) {
        calc = 0
    }
    if (calc > width - 12.5) {
        calc = width - 12.5
    }
    maxPrice.style.left = `${calc}px`

    // calculating green color starting and ending for range bar
    let startGreen = Math.round((Number(minPriceInp.value) / highestPrice * 100) * 10) / 10
    let endGreen = Math.round((Number(maxPriceInp.value) / highestPrice * 100) * 10) / 10
    barPrice.style.background = `linear-gradient(to right, #696974, #696974 ${startGreen - 1}%,#99CC66 ${startGreen}%,#99CC66 ${endGreen - 3}%, #696974 ${endGreen - 4}%)`

    // Adding minimum Price in filters
    filters.priceMax = Number(maxPriceInp.value)

    // filter
    filter();
});
minSymbolInp.addEventListener('keyup', () => {

    // If max or Symbol is not inputed, set to highest
    if (maxSymbolInp.value === '') {
        maxSymbolInp.value = highestSymbol
    }


    if (Number(minSymbolInp.value) < 0) {
        minSymbolInp.value = 0
    }

    // calculated left px and sets
    let calc = Math.round(Number(minSymbolInp.value) / highestSymbol * width) - 12.5
    if (calc < 0) {
        calc = 0
    }
    if (calc > width - 12.5) {
        calc = width - 12.5
    }
    minSymbol.style.left = `${calc}px`

    // calculating green color starting and ending for range bar
    let startGreen = Math.round((Number(minSymbolInp.value) / highestSymbol * 100) * 10) / 10
    let endGreen = Math.round((Number(maxSymbolInp.value) / highestSymbol * 100) * 10) / 10
    barSymbol.style.background = `linear-gradient(to right, #696974, #696974 ${startGreen - 1}%,#99CC66 ${startGreen}%,#99CC66 ${endGreen - 3}%, #696974 ${endGreen - 4}%)`

    // Adding minimum Symbol in filters
    filters.symbolMin = Number(minSymbolInp.value)

    // filter
    filter();

});
maxSymbolInp.addEventListener('keyup', () => {
    // If min Symbol is not inputed, set to highest
    if (minSymbolInp.value === '') {
        minSymbolInp.value = 0
    }

    // Checks if input value is valid
    if (Number(maxSymbolInp.value) > highestSymbol) {
        maxSymbolInp.value = highestSymbol
    }

    // calculated left px and sets
    let calc = Math.round(Number(maxSymbolInp.value) / highestSymbol * width) - 12.5
    if (calc < 0) {
        calc = 0
    }
    if (calc > width - 12.5) {
        calc = width - 12.5
    }
    maxSymbol.style.left = `${calc}px`
    // calculating green color starting and ending for range bar
    let startGreen = Math.round((Number(minSymbolInp.value) / highestSymbol * 100) * 10) / 10
    let endGreen = Math.round((Number(maxSymbolInp.value) / highestSymbol * 100) * 10) / 10
    barSymbol.style.background = `linear-gradient(to right, #696974, #696974 ${startGreen - 1}%,#99CC66 ${startGreen}%,#99CC66 ${endGreen - 3}%, #696974 ${endGreen - 4}%)`

    // Adding minimum Symbol in filters
    filters.symbolMax = Number(maxSymbolInp.value)

    // filter
    filter();
});
// If user left input without instering valid value
minSymbolInp.addEventListener('blur', () => {
    if (minSymbolInp.value === '') {
        minSymbolInp.value = 0
        filters.symbolMin = 0;
    }
    // Checks if input value is valid
    if (Number(minSymbolInp.value) > Number(maxSymbolInp.value)) {
        minSymbolInp.value = Number(maxSymbolInp.value)
    }
    filter();
    // calculated left px and sets
    let calc = Math.round(Number(minSymbolInp.value) / highestSymbol * width) - 12.5
    if (calc < 0) {
        calc = 0
    }
    if (calc > width - 12.5) {
        calc = width - 12.5
    }
    minSymbol.style.left = `${calc}px`
    // calculating green color starting and ending for range bar
    let startGreen = Math.round((Number(minSymbolInp.value) / highestSymbol * 100) * 10) / 10
    let endGreen = Math.round((Number(maxSymbolInp.value) / highestSymbol * 100) * 10) / 10
    barSymbol.style.background = `linear-gradient(to right, #696974, #696974 ${startGreen - 1}%,#99CC66 ${startGreen}%,#99CC66 ${endGreen - 3}%, #696974 ${endGreen - 4}%)`
})
maxSymbolInp.addEventListener('blur', () => {
    if (maxSymbolInp.value === '') {
        minSymbolInp.value = highestSymbol
        filters.symbolMax = highestSymbol;
    }
    if (Number(minSymbolInp.value) > Number(maxSymbolInp.value)) {
        maxSymbolInp.value = Number(minSymbolInp.value)
    }
    filter();
    // calculated left px and sets
    let calc = Math.round(Number(maxSymbolInp.value) / highestSymbol * width) - 12.5
    if (calc < 0) {
        calc = 0
    }
    if (calc > width - 12.5) {
        calc = width - 12.5
    }
    maxSymbol.style.left = `${calc}px`

    // calculating green color starting and ending for range bar
    let startGreen = Math.round((Number(minSymbolInp.value) / highestSymbol * 100) * 10) / 10
    let endGreen = Math.round((Number(maxSymbolInp.value) / highestSymbol * 100) * 10) / 10
    barSymbol.style.background = `linear-gradient(to right, #696974, #696974 ${startGreen - 1}%,#99CC66 ${startGreen}%,#99CC66 ${endGreen}%, #696974 ${endGreen}%)`

})
minPriceInp.addEventListener('blur', () => {
    if (minPriceInp.value === '') {
        minPriceInp.value = 0
        filters.priceMin = 0;
    }
    // Checks if input value is valid
    if (Number(minPriceInp.value) > Number(maxPriceInp.value)) {
        minPriceInp.value = Number(maxPriceInp.value)
        filters.priceMin = Number(maxPriceInp.value)
    }
    filter();
    // calculated left px and sets
    let calc = Math.round(Number(minPriceInp.value) / highestPrice * width) - 12.5
    if (calc < 0) {
        calc = 0
    }
    if (calc > width - 12.5) {
        calc = width - 12.5
    }
    console.log(calc)
    minPrice.style.left = `${calc}px`
    // calculating green color starting and ending for range bar
    let startGreen = Math.round((Number(minPriceInp.value) / highestPrice * 100) * 10) / 10
    let endGreen = Math.round((Number(maxPriceInp.value) / highestPrice * 100) * 10) / 10
    barPrice.style.background = `linear-gradient(to right, #696974, #696974 ${startGreen - 1}%,#99CC66 ${startGreen}%,#99CC66 ${endGreen - 3}%, #696974 ${endGreen - 4}%)`
})
maxPriceInp.addEventListener('blur', () => {
    if (maxPriceInp.value === '') {
        minPriceInp.value = highestPrice
        filters.priceMax = highestPrice;
    }
    if (Number(minPriceInp.value) > Number(maxPriceInp.value)) {
        maxPriceInp.value = Number(minPriceInp.value)
    }
    filter();
    // calculated left px and sets
    let calc = Math.round(Number(maxPriceInp.value) / highestPrice * width) - 12.5
    if (calc < 0) {
        calc = 0
    }
    if (calc > width - 12.5) {
        calc = width - 12.5
    }
    maxPrice.style.left = `${calc}px`

    // calculating green color starting and ending for range bar
    let startGreen = Math.round((Number(minPriceInp.value) / highestPrice * 100) * 10) / 10
    let endGreen = Math.round((Number(maxPriceInp.value) / highestPrice * 100) * 10) / 10
    barPrice.style.background = `linear-gradient(to right, #696974, #696974 ${startGreen - 1}%,#99CC66 ${startGreen}%,#99CC66 ${endGreen - 3}%, #696974 ${endGreen - 4}%)`

})

// Search

let search = document.querySelectorAll('.search');
search.forEach((pe) => {
    pe.addEventListener('keyup', (e) => {
        filters.name = e.target.value
        if (e.target.value === '') {
            filters.name = null;
        }
        filter()
    })
})
search.forEach((pe) => {
    pe.addEventListener('blur', (e) => {
        filters.name = e.target.value
        if (e.target.value === '') {
            filters.name = null;
        }
        filter()
    })
})


// Range Dragging

// stopping drag after mouse is up
document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', moveMinPrice)
    document.removeEventListener('mousemove', moveMaxPrice)
    document.removeEventListener('mousemove', moveMinSymbol)
    document.removeEventListener('mousemove', moveMaxSymbol)
})

// events 
minPrice.addEventListener('mousedown', () => {
    document.addEventListener('mousemove', moveMinPrice)
})
function moveMinPrice(event) {
    let left = event.clientX - x - 12.5
    if (left < 0) {
        left = 0
    }
    if (left > width - 12.5) {
        left = width - 12.5
    }
    if (maxPrice.style.left === '') {
        let limit = width - 37.5
        if (left >= limit) {
            left = limit
        }
    } else {
        let limit = parseInt(maxPrice.style.left) - 25
        if (left >= limit) {
            left = limit
        }
    }

    minPrice.style.left = left + 'px';
    // Changing min price value
    minPriceInp.value = Math.round((left + 12.5) / width * highestPrice)
    if (left === 0) {
        minPriceInp.value = 0;
    }
    minPriceInp.click();
}
minPriceInp.addEventListener('click', () => {

    // If max or price is not inputed, set to highest
    if (maxPriceInp.value === '') {
        maxPriceInp.value = highestPrice
    }


    if (Number(minPriceInp.value) < 0) {
        minPriceInp.value = 0
    }

    // calculating green color starting and ending for range bar
    let startGreen = Math.round((Number(minPriceInp.value) / highestPrice * 100) * 10) / 10
    let endGreen = Math.round((Number(maxPriceInp.value) / highestPrice * 100) * 10) / 10
    barPrice.style.background = `linear-gradient(to right, #696974, #696974 ${startGreen - 1}%,#99CC66 ${startGreen}%,#99CC66 ${endGreen - 3}%, #696974 ${endGreen - 4}%)`

    // Adding minimum Price in filters
    filters.priceMin = Number(minPriceInp.value)

    // filter
    filter();

});

maxPrice.addEventListener('mousedown', () => {
    document.addEventListener('mousemove', moveMaxPrice)
})
function moveMaxPrice(event) {
    let left = event.clientX - x - 12.5
    if (left < 0) {
        left = 0
    }
    if (left > width - 12.5) {
        left = width - 12.5
    }
    let limit = parseInt(minPrice.style.left) + 25
    if (left <= limit) {
        left = limit
    }
    maxPrice.style.left = left + 'px';
    // Changing max price value
    maxPriceInp.value = Math.round((left + 12.5) / width * highestPrice)
    if (left === width) {
        maxPriceInp.value = highestPrice;
    }
    if (left === 0) {
        maxPriceInp.value = 0;
    }
    maxPriceInp.click();
}
maxPriceInp.addEventListener('click', () => {
    // If min price is not inputed, set to highest
    if (minPriceInp.value === '') {
        minPriceInp.value = 0
    }
    // Checks if input value is valid
    if (Number(maxPriceInp.value) > highestPrice) {
        maxPriceInp.value = highestPrice
    }
    // calculating green color starting and ending for range bar
    let startGreen = Math.round((Number(minPriceInp.value) / highestPrice * 100) * 10) / 10
    let endGreen = Math.round((Number(maxPriceInp.value) / highestPrice * 100) * 10) / 10
    barPrice.style.background = `linear-gradient(to right, #696974, #696974 ${startGreen - 1}%,#99CC66 ${startGreen}%,#99CC66 ${endGreen - 3}%, #696974 ${endGreen - 4}%)`
    // Adding minimum Price in filters
    filters.priceMax = Number(maxPriceInp.value)
    // filter
    filter();
});

minSymbol.addEventListener('mousedown', () => {
    document.addEventListener('mousemove', moveMinSymbol)
})
function moveMinSymbol(event) {
    let left = event.clientX - x - 12.5
    if (left < 0) {
        left = 0
    }
    if (left > width - 12.5) {
        left = width - 12.5
    }
    if (maxSymbol.style.left === '') {
        let limit = width - 37.5
        if (left >= limit) {
            left = limit
        }
    } else {
        let limit = parseInt(maxSymbol.style.left) - 25
        if (left >= limit) {
            left = limit
        }
    }

    minSymbol.style.left = left + 'px';
    // Changing min Symbol value
    minSymbolInp.value = Math.round((left + 12.5) / width * highestSymbol)
    if (left === 0) {
        minSymbolInp.value = 0;
    }
    minSymbolInp.click();
}
minSymbolInp.addEventListener('click', () => {

    // If max or Symbol is not inputed, set to highest
    if (maxSymbolInp.value === '') {
        maxSymbolInp.value = highestSymbol
    }


    if (Number(minSymbolInp.value) < 0) {
        minSymbolInp.value = 0
    }

    // calculating green color starting and ending for range bar
    let startGreen = Math.round((Number(minSymbolInp.value) / highestSymbol * 100) * 10) / 10
    let endGreen = Math.round((Number(maxSymbolInp.value) / highestSymbol * 100) * 10) / 10
    barSymbol.style.background = `linear-gradient(to right, #696974, #696974 ${startGreen - 1}%,#99CC66 ${startGreen}%,#99CC66 ${endGreen - 3}%, #696974 ${endGreen - 4}%)`

    // Adding minimum Symbol in filters
    filters.symbolMin = Number(minSymbolInp.value)

    // filter
    filter();

});

maxSymbol.addEventListener('mousedown', () => {
    document.addEventListener('mousemove', moveMaxSymbol)
})
function moveMaxSymbol(event) {
    let left = event.clientX - x - 12.5
    if (left < 0) {
        left = 0
    }
    if (left > width - 12.5) {
        left = width - 12.5
    }
    let limit = parseInt(minSymbol.style.left) + 25
    if (left <= limit) {
        left = limit
    }
    maxSymbol.style.left = left + 'px';
    // Changing max Symbol value
    maxSymbolInp.value = Math.round((left + 12.5) / width * highestSymbol)
    if (left === width) {
        maxSymbolInp.value = highestSymbol;
    }
    if (left === 0) {
        maxSymbolInp.value = 0;
    }
    maxSymbolInp.click();
}
maxSymbolInp.addEventListener('click', () => {
    // If min Symbol is not inputed, set to highest
    if (minSymbolInp.value === '') {
        minSymbolInp.value = 0
    }
    // Checks if input value is valid
    if (Number(maxSymbolInp.value) > highestSymbol) {
        maxSymbolInp.value = highestSymbol
    }
    // calculating green color starting and ending for range bar
    let startGreen = Math.round((Number(minSymbolInp.value) / highestSymbol * 100) * 10) / 10
    let endGreen = Math.round((Number(maxSymbolInp.value) / highestSymbol * 100) * 10) / 10
    barSymbol.style.background = `linear-gradient(to right, #696974, #696974 ${startGreen - 1}%,#99CC66 ${startGreen}%,#99CC66 ${endGreen - 3}%, #696974 ${endGreen - 4}%)`
    // Adding minimum Symbol in filters
    filters.symbolMax = Number(maxSymbolInp.value)
    // filter
    filter();
});
}


// Mobile Sorting
let buttonSort = document.querySelector('.mobile_sort')
let buttonFilter = document.querySelector('.mobile_filter')
let mobileSort = document.querySelector('.mobileSortJS');
let mobileFilter = document.querySelector('.mobileFilterJS');
let container = document.querySelector('.container');
let close_sort = document.querySelector('.close_sort');
let close_filter = document.querySelector('.close_filter');
mobileSort.remove();
mobileFilter.remove();
buttonSort.addEventListener('click', () => {
    container.remove();
    document.body.appendChild(mobileSort)
})
buttonFilter.addEventListener('click', () => {
    container.remove();
    document.body.appendChild(mobileFilter)
})
close_sort.addEventListener('click', () => {
    mobileSort.remove();
    document.body.appendChild(container)
    console.log(filters)
})
close_filter.addEventListener('click', () => {
    mobileFilter.remove();
    document.body.appendChild(container)
})
function filter() {
    visibleDomains = [];
    domains.forEach((test) => {
        let valid = true;
        let name = test.domainName + test.domainExtension
        if (test.price > filters.priceMax || test.price < filters.priceMin) {
            valid = false;
        }
        if (name.length > filters.symbolMax || name.length < filters.symbolMin) {
            valid = false;
        }
        if (filters.categories.length !== 0) {
            let includes = false;
            test.categories.forEach((category) => {
                filters.categories.forEach((param) => {
                    if (category === param) {
                        includes = true;
                    }
                })
            })
            if (!includes) {
                valid = false;
            }
        }
        if (filters.zone.length !== 0) {
            if (!filters.zone.includes(test.domainExtension)) {
                valid = false;
            }
        }
        if (!name.includes(filters.name) && filters.name !== null) {
            valid = false;
        }
        if (valid) {
            visibleDomains.push(test);
        }
    })
    drawCards(visibleDomains)
}
function drawCards(data) {
    parent.innerHTML = '';
    parentMobile.innerHTML = '';
    data.forEach((product, index) => {
        let card = document.createElement('div');
        let left = document.createElement('div');
        let right = document.createElement('div');
        let img = document.createElement('img');
        img.src = '../Images/btn_dropdown.svg'
        let name = document.createElement('p');
        name.innerText = product.domainName + product.domainExtension;
        let priceGel = document.createElement('p');
        priceGel.innerText = product.price + " ₾";
        let priceUsd = document.createElement('p');
        priceUsd.innerText = Math.round(product.price / 2.85 * 10) / 10 + " $";
        let div = document.createElement('div');
        let cart = document.createElement('img');
        cart.src = '../Images/cart_white.svg';
        let contentbox = document.createElement('div');

        // Appends
        parent.appendChild(card)
        card.appendChild(contentbox)
        contentbox.appendChild(left);
        contentbox.appendChild(right);
        left.appendChild(img);
        left.appendChild(name);
        right.appendChild(div);
        right.appendChild(cart);
        div.appendChild(priceGel);
        div.appendChild(priceUsd);

        // CLassing
        card.classList.add('cardModel');
        contentbox.classList.add('contentbox');
        left.classList.add('leftCard');
        right.classList.add('rightCard');
        priceGel.classList.add('gel');
        priceUsd.classList.add('usd');

        let add = document.createElement('div')
        let p = document.createElement('p')
        p.innerText = 'დამატება'
        add.appendChild(p)
        let cartCopy = document.createElement('img');
        cartCopy.src = '../Images/cart_white.svg';
        add.appendChild(cartCopy)
        add.classList.add('adder')
        add.style.display = 'flex'
        add.style.alignItems = 'center'

        let basket = document.createElement('div');
        basket.style.width = '125px'
        basket.style.height = '36px'
        basket.style.backgroundColor = '#F5F5F8'
        basket.style.borderRadius = '10px'
        let mark = document.createElement('img');
        mark.src = '../Images/mark.svg'
        let text = document.createElement('p');
        text.innerHTML = 'კალათაშია'
        text.style.fontSize = '14px';
        text.style.color = '#696974'
        text.style.fontFamily = "ALK Rounded Nusx Med";
        text.style.fontWeight = 'bold'
        text.style.marginLeft = '6px'
        basket.appendChild(mark);
        basket.appendChild(text);
        basket.style.display = 'flex'
        basket.style.justifyContent = 'center';
        basket.style.alignItems = 'center'

        add.addEventListener('click', () => {
            domains.forEach((pr) => {
                if (pr.uniqueID === product.uniqueID) {
                    pr.inCart = true;
                }
            })
            card.removeEventListener('mouseenter', enter)
            card.removeEventListener('mouseenter', leave)
            right.remove();
            contentbox.appendChild(basket)
            contentbox.style.backgroundColor = 'white'
            card.style.backgroundColor = 'white'
            document.querySelector('.cartItems').innerText = Number(document.querySelector('.cartItems').innerText) + 1

        })
        // Hovering Cards
        card.addEventListener('mouseenter', enter)
        card.addEventListener('mouseleave', leave)
        function enter() {
            card.style.backgroundColor = '#F5F5F8'
            card.style.borderRadius = '10px'
            img.src = '../Images/hover_drop.svg'
            cart.remove()
            right.appendChild(add)
        }
        function leave() {
            card.style.backgroundColor = 'white'
            card.style.borderRadius = '0px'
            img.src = '../Images/btn_dropdown.svg'
            add.remove()
            right.appendChild(cart)
        }
        if (product.inCart) {
            card.removeEventListener('mouseenter', enter)
            card.removeEventListener('mouseenter', leave)
            right.remove();
            contentbox.appendChild(basket)
        }
    })
    data.forEach((product, index) => {
        let card = document.createElement('div');
        let left = document.createElement('div');
        let right = document.createElement('div');
        let img = document.createElement('img');
        img.src = '../Images/btn_dropdown.svg'
        let name = document.createElement('p');
        name.innerText = product.domainName + product.domainExtension;
        let priceGel = document.createElement('p');
        priceGel.innerText = product.price + " ₾";
        let priceUsd = document.createElement('p');
        priceUsd.innerText = Math.round(product.price / 2.85 * 10) / 10 + " $";
        let div = document.createElement('div');
        let cart = document.createElement('img');
        cart.src = '../Images/cart_white.svg';
        let contentbox = document.createElement('div');

        // Appends
        parentMobile.appendChild(card)
        card.appendChild(contentbox)
        contentbox.appendChild(left);
        contentbox.appendChild(right);
        left.appendChild(img);
        left.appendChild(name);
        right.appendChild(div);
        right.appendChild(cart);
        div.appendChild(priceGel);
        div.appendChild(priceUsd);

        // CLassing
        card.classList.add('cardModel');
        contentbox.classList.add('contentbox');
        left.classList.add('leftCard');
        right.classList.add('rightCard');
        priceGel.classList.add('gel');
        priceUsd.classList.add('usd');

        let add = document.createElement('div')
        let p = document.createElement('p')
        p.innerText = 'დამატება'
        add.appendChild(p)
        let cartCopy = document.createElement('img');
        cartCopy.src = '../Images/cart_white.svg';
        add.appendChild(cartCopy)
        add.classList.add('adder')
        add.style.display = 'flex'
        add.style.alignItems = 'center'

        let basket = document.createElement('div');
        basket.style.width = '100px'
        basket.style.height = '33px'
        basket.style.backgroundColor = '#F5F5F8'
        basket.style.borderRadius = '10px'
        let mark = document.createElement('img');
        mark.src = '../Images/mark.svg'
        let text = document.createElement('p');
        text.innerHTML = 'კალათაშია'
        text.style.fontSize = '11px';
        text.style.color = '#696974'
        text.style.fontFamily = "ALK Rounded Nusx Med";
        text.style.fontWeight = 'bold'
        text.style.marginLeft = '4px'
        basket.appendChild(mark);
        basket.appendChild(text);
        basket.style.display = 'flex'
        basket.style.justifyContent = 'center';
        basket.style.alignItems = 'center'

        cart.addEventListener('click', () => {
            domains.forEach((pr) => {
                if (pr.uniqueID === product.uniqueID) {
                    pr.inCart = true;
                }
            })
            right.remove();
            contentbox.appendChild(basket)
            contentbox.style.backgroundColor = 'white'
            card.style.backgroundColor = 'white'
            document.querySelector('.cartItems').innerText = Number(document.querySelector('.cartItems').innerText) + 1

        })
        if (product.inCart) {
            card.removeEventListener('mouseenter', enter)
            card.removeEventListener('mouseenter', leave)
            right.remove();
            contentbox.appendChild(basket)
        }
    })
}

