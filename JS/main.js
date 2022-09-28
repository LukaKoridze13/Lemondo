import Data from '../Data/data.js'
let domains = Data.domainList;
let categories = Data.categories;

// Domains on the market
let domainCount = document.querySelector('.domenebiMarketze span')
domainCount.innerText = domains.length

// Sorting
let sorters = document.querySelectorAll('.sorters p')
let sortImage = document.createElement('img')
sortImage.style.marginLeft='5px'
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