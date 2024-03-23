const fs = require('fs');
const csv = require('csv-parser');

// Generator function to read user data from CSV files
function* readUserData(filePath) {
    const fileStream = fs.createReadStream(filePath).pipe(csv());

    for await (const row of fileStream) {
        yield row;
    }
}

// Generator function to process user data
function* processUserData(userDataGenerator) {
    for await (const user of userDataGenerator) {
        // Perform data processing tasks here
        // For example: validate user data, calculate statistics, etc.
        yield user;
    }
}

// Generator function to aggregate processed user data
function* aggregateUserData(userDataGenerators) {
    for (const userDataGenerator of userDataGenerators) {
        for await (const user of userDataGenerator) {
            // Aggregate processed user data
            // For example: combine data from multiple files into a single dataset
            yield user;
        }
    }
}

// Define paths to CSV files containing user data
const filePaths = ['users1.csv', 'users2.csv', 'users3.csv'];

// Create generators for reading user data from CSV files
const userDataGenerators = filePaths.map(filePath => readUserData(filePath));

// Create generator for processing user data
const processedUserDataGenerator = processUserData(aggregateUserData(userDataGenerators));

// Iterate over processed user data and perform further actions
(async () => {
    for await (const user of processedUserDataGenerator) {
        // Perform additional tasks with processed user data
        console.log(user);
    }
})();





// We define three generator functions:

// readUserData: Reads user data from a CSV file and yields each row.
// processUserData: Processes user data received from a generator and yields the processed data.
// aggregateUserData: Aggregates processed user data from multiple generators into a single stream.
// We define paths to CSV files containing user data and create generator instances for reading user data from these files.

// We compose the generators together using delegation, where each generator yields values to the next generator in the pipeline.

// Finally, we iterate over the processed user data and perform additional tasks as needed.

// This example demonstrates how composition with generators enables modular and reusable code structures for processing large datasets efficiently. Each generator function handles a specific aspect of the data processing pipeline, making the code easy to understand, maintain, and extend.






