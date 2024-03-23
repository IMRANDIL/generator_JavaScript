// Import necessary modules
const fetch = require('node-fetch');

// Generator function to fetch data from APIs
function* fetchData() {
    try {
        // Fetch data from API 1
        const response1 = yield fetch('https://api.example.com/data1');
        const data1 = yield response1.json();

        // Fetch data from API 2
        const response2 = yield fetch('https://api.example.com/data2');
        const data2 = yield response2.json();

        // Process the data
        console.log('Data from API 1:', data1);
        console.log('Data from API 2:', data2);

        // Perform further processing
        // ...
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Coroutine runner function
async function runCoroutine(generator) {
    const iterator = generator();
    let result = iterator.next();

    while (!result.done) {
        try {
            const value = await result.value;
            result = iterator.next(value);
        } catch (error) {
            iterator.throw(error);
        }
    }
}

// Execute the coroutine
runCoroutine(fetchData);
