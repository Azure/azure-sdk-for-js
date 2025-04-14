# Performance Testing for Azure Text Analysis

## Instructions

1. Build the ai-language-text perf tests package `rush build -t perf-ai-language-text`.
2. Copy the `sample.env` file and name it as `.env`.
3. Create a Language service account and populate the `.env` file with the relevant credentials.
4. Refer to the [rate limits](https://learn.microsoft.com/azure/cognitive-services/language-service/concepts/data-limits) and then run the tests as follows

   - language detection
     - `npm run perf-test:node -- LanguageDetectionTest --warmup 1 --iterations 1 --parallel 50 --duration 15 -n 1000`
