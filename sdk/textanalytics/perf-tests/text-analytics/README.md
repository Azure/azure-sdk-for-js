# Performance Testing for Text Analytics

## Instructions

1. Build the ai-text-analytics perf tests package `rush build -t perf-ai-text-analytics`.
2. Copy the `sample.env` file and name it as `.env`.
3. Create a cognitive services account and populate the `.env` file with the relevant credentials.
4. Refer to the [rate limits](https://docs.microsoft.com/azure/cognitive-services/text-analytics/concepts/data-limits?tabs=version-3) and then run the tests as follows

   - detect language
     - `npm run perf-test:node -- DetectLanguageTest --warmup 1 --iterations 1 --parallel 50 --duration 15 -n 1000`
