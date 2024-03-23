const fs = require("fs");
const xlsx = require("xlsx");



// Define a generator function to read users lazily from a file
console.log('before running the process>>>>>')
measureMemoryUsage()
async function* lazyUserGenerator(filePath) {
  // open the file
//   const fileStream = fs.createReadStream(filePath, { encoding: "utf8" });
   // Load Excel file
   const workbook = xlsx.readFile(filePath);

    // Read each sheet in the workbook
  for (const sheetName of workbook.SheetNames) {
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);
    
    // Yield each row of data from the sheet
    for (const row of data) {
      yield row;
    }
  }

  // Read and display the file data on console
  
//   for await (const data of fileStream) {
//     yield data;
//   }
}

// Function to measure memory usage
function measureMemoryUsage() {
    const memoryUsage = process.memoryUsage();
    console.log('Memory Usage:', memoryUsage);
  }

// Usage

// const userFilePath = "Financial_Sample.xlsx";
const userFilePath = "creditcard.csv";
// const userGen = lazyUserGenerator(userFilePath);
const excelDataGen = lazyUserGenerator(userFilePath);

console.log("excelGen>>>>>>>>>>>>", excelDataGen);



// Process all Excel data lazily
(async function() {
    let nextValue;
    do {
      nextValue = await excelDataGen.next();
      if (!nextValue.done) {
        console.log(nextValue.value);
      }
    } while (!nextValue.done);
     // Measure memory usage after processing all row
     measureMemoryUsage();
})()




// // Process users lazily

// userGen.next().then(({ value, done }) => {
//   if (!done) {
//     console.log(value);
//     // Measure memory usage after processing
//     measureMemoryUsage();
//   }
// });
