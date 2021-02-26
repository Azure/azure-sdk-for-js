### Guide

1. Build the ai-form-recognizer perf tests package `rush build -t @azure-tests/perf-ai-form-recognizer`.
2. Copy the `sample.env` file and name it as `.env`.
3. Create a cognitive services account and populate the `.env` file with the relevant credentials.
4. Run the tests as follows

   - custom model recognition
     - `npm run perf-test:node -- CustomModelRecognitionTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
