# Performance Testing for Text Analytics

## Instructions

1. Build the ai-text-analytics perf tests package `rush build -t perf-ai-text-analytics`.
2. Copy the `sample.env` file and name it as `.env`.
3. Create a cognitive services account and populate the `.env` file with the relevant credentials.
4. Run the tests as follows

   - detect language
     - `npm run perf-test:node -- DetectLanguageTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
