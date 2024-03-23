const fs = require("fs");
const xlsx = require("xlsx");
const csv = require("csv-parser");

// Define a generator function to read data lazily from a file
async function* lazyFileDataGenerator(filePath) {
  // Determine the file extension
  const fileExtension = filePath.split('.').pop().toLowerCase();
  
  if (fileExtension === 'xlsx' || fileExtension === 'xls') {
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
  } else if (fileExtension === 'csv') {
    // Open the CSV file for reading
    const stream = fs.createReadStream(filePath).pipe(csv());
    // Read each row of data from the CSV file
    for await (const row of stream) {
      yield row;
    }
  } else {
    throw new Error('Unsupported file format');
  }
}

// Function to measure memory usage
function measureMemoryUsage() {
  const memoryUsage = process.memoryUsage();
  console.log('Memory Usage:', memoryUsage);
}

// Usage
const filePath = "Financial_Sample.xlsx"; // Update with the path to your file
const fileDataGen = lazyFileDataGenerator(filePath);

console.log("fileDataGen:", fileDataGen);

// Process all file data lazily
(async function() {
  let nextValue;
  do {
    nextValue = await fileDataGen.next();
    if (!nextValue.done) {
      console.log(nextValue.value);
    }
  } while (!nextValue.done);
  
  // Measure memory usage after processing all rows
  measureMemoryUsage();
})();
