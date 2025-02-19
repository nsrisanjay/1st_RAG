import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
const csvpath = "C:/Users/nsris/Documents/FINAL FOOD DATASET/FOOD-DATA-GROUP1.csv"

const loader = new CSVLoader(csvpath);
const docs = await loader.load();
// console.log(docs[1].pageContent);
const len = docs.length
console.log(len);

const singleColumnLoader = new CSVLoader(csvpath, {
    column: "Sugars",
    separator: ",",
  });

  const singleColumnLoader2 = new CSVLoader(csvpath, {
    column: "food",
    separator: ",",
  });

  let dataObj = [];
  const singleColumnDocs = await singleColumnLoader.load();
  const singleColumnDocs2 = await singleColumnLoader2.load();
//   console.log(singleColumnDocs[0].pageContent);
//   console.log(singleColumnDocs2[0].pageContent);
for(let i=0;i<len;i++)
{
    let obj = {};
    obj.food = singleColumnDocs2[i].pageContent;
    obj.sugars = singleColumnDocs[i].pageContent;
    dataObj.push(obj);
    // console.log(obj)
}

export default dataObj;


  