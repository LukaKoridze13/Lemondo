const categories = [
    {
        name: "უძრავი ქონება",
        id: 1
    },
    {
        name: "ბიზნესი",
        id: 2
    },
    {
        name: "მედია",
        id: 3
    }
]

const domainList = [
    {
        domainName: "example1",
        domainExtension: ".ge",
        price: 578,
        categories: [1, 2]
    },
    {
        domainName: "aexample2",
        domainExtension: ".com.ge",
        price: 301,
        categories: [2, 3]
    },
    {
        domainName: "bexample3",
        domainExtension: ".edu.ge",
        price: 299,
        categories: [2]
    },
    {
        domainName: "cexample4",
        domainExtension: ".ge",
        price: 239,
        categories: [3]
    },
    {
        domainName: "dexample5",
        domainExtension: ".org.ge",
        price: 159,
        categories: [2, 3]
    }
    ,
    {
        domainName: "dexample5",
        domainExtension: ".org.ge",
        price: 159,
        categories: [1, 3]
    }
    ,
    {
        domainName: "dexample5",
        domainExtension: ".org.com",
        price: 159,
        categories: [1, 2]
    }
    ,
    {
        domainName: "dexample5",
        domainExtension: ".edu.ge",
        price: 159,
        categories: [1, 2]
    }
    ,
    {
        domainName: "dexample5",
        domainExtension: ".ge",
        price: 159,
        categories: [2, 3]
    }
]

export default {categories, domainList}