const Downloader = require('nodejs-file-downloader');
const csv = require('csv-parser')
const fs = require('fs')

const csvUrl: string = 'https://pics.ebaystatic.com/aw/pics/catchanges/US_NewStructure(Oct2019).csv';
const jsonIn: any = [];
let res: Result = [];

type Result = CategoriesTree[];

interface CategoriesTree {
    name: string; // category name
    value: string; // category ID
    subSchemas?: CategoriesTree[]; // child categories
}


(async () => {

    const downloader = new Downloader({
        url: csvUrl,
        directory: "categories",
        cloneFiles: false
    })
    try {
        await downloader.download();
        fs.createReadStream('./categories/US_NewStructure(Oct2019).csv')
            .pipe(csv(["L1", "L2", "L3", "L4", "L5", "L6", "CategoryID"]))//для удобства преобразовываем csv в json
            .on('data', (data) => jsonIn.push(data))
            .on('end', () => {
                res = treeParser(jsonIn, res, 0)
                fs.writeFileSync('./categories/result.json', JSON.stringify(res))
            });
        console.log("Script executed successfully")
    } catch (error) {
        console.log('Download failed', error)
    }
})();





const treeParser = (json: any, categoryTree: CategoriesTree[] = [], elNumber: number): Result => {///преобразование json в дерево
    while (true) {
        if (elNumber != json.length - 1) {
            elNumber++
        }
        else break
        while (json[elNumber].L1) {
            categoryTree.push({ name: json[elNumber].L1, value: json[elNumber].CategoryID, subSchemas: [] })
            if (elNumber != json.length - 1) {
                elNumber++
            }
            else break
            while (json[elNumber].L2) {
                categoryTree[categoryTree.length - 1].subSchemas.push({ name: json[elNumber].L2, value: json[elNumber].CategoryID, subSchemas: [] })
                if (elNumber != json.length - 1) {
                    elNumber++
                }
                else break
                while (json[elNumber].L3) {
                    categoryTree[categoryTree.length - 1].subSchemas[categoryTree[categoryTree.length - 1].subSchemas.length - 1].subSchemas.push({ name: json[elNumber].L3, value: json[elNumber].CategoryID, subSchemas: [] })
                    if (elNumber != json.length - 1) {
                        elNumber++
                    }
                    else break
                    while (json[elNumber].L4) {
                        categoryTree[categoryTree.length - 1].subSchemas[categoryTree[categoryTree.length - 1].subSchemas.length - 1].subSchemas[categoryTree[categoryTree.length - 1].subSchemas[categoryTree[categoryTree.length - 1].subSchemas.length - 1].subSchemas.length - 1].subSchemas.push({ name: json[elNumber].L4, value: json[elNumber].CategoryID, subSchemas: [] })
                        if (elNumber != json.length - 1) {
                            elNumber++
                        }
                        else break
                        while (json[elNumber].L5) {
                            categoryTree[categoryTree.length - 1].subSchemas[categoryTree[categoryTree.length - 1].subSchemas.length - 1].subSchemas[categoryTree[categoryTree.length - 1].subSchemas[categoryTree[categoryTree.length - 1].subSchemas.length - 1].subSchemas.length - 1].subSchemas[categoryTree[categoryTree.length - 1].subSchemas[categoryTree[categoryTree.length - 1].subSchemas.length - 1].subSchemas[categoryTree[categoryTree.length - 1].subSchemas[categoryTree[categoryTree.length - 1].subSchemas.length - 1].subSchemas.length - 1].subSchemas.length - 1].subSchemas.push({ name: json[elNumber].L5, value: json[elNumber].CategoryID, subSchemas: [] })
                            if (elNumber != json.length - 1) {
                                elNumber++
                            }
                            else break
                            while (json[elNumber].L6) {
                                categoryTree[categoryTree.length - 1].subSchemas[categoryTree[categoryTree.length - 1].subSchemas.length - 1].subSchemas[categoryTree[categoryTree.length - 1].subSchemas[categoryTree[categoryTree.length - 1].subSchemas.length - 1].subSchemas.length - 1].subSchemas[categoryTree[categoryTree.length - 1].subSchemas[categoryTree[categoryTree.length - 1].subSchemas.length - 1].subSchemas[categoryTree[categoryTree.length - 1].subSchemas[categoryTree[categoryTree.length - 1].subSchemas.length - 1].subSchemas.length - 1].subSchemas.length - 1].subSchemas[categoryTree[categoryTree.length - 1].subSchemas[categoryTree[categoryTree.length - 1].subSchemas.length - 1].subSchemas[categoryTree[categoryTree.length - 1].subSchemas[categoryTree[categoryTree.length - 1].subSchemas.length - 1].subSchemas.length - 1].subSchemas[categoryTree[categoryTree.length - 1].subSchemas[categoryTree[categoryTree.length - 1].subSchemas.length - 1].subSchemas[categoryTree[categoryTree.length - 1].subSchemas[categoryTree[categoryTree.length - 1].subSchemas.length - 1].subSchemas.length - 1].subSchemas.length - 1].subSchemas.length - 1].subSchemas.push({ name: json[elNumber].L6, value: json[elNumber].CategoryID, subSchemas: [] })
                                if (elNumber != json.length - 1) {
                                    elNumber++
                                }
                                else break
                            }
                        }
                    }
                }
            }
        }
    }
    return categoryTree
}