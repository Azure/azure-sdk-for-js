# Performance Tests for Azure Search Documents

These are the performance tests for Azure Search Documents.

### Guide

1. Build the `@azure/search-documents` perf tests package `rush build -t @azure-tests/perf-search-documents`.
2. Copy the `sample.env` file and name it as `.env`.
3. Create an Azure Search resource and populate the `.env` file with the required information.
4. Run the tests as follows:

- AutoComplete
  - `npm run perf-test:node -- AutoCompleteTest --warmup 1 --iterations 1 --parallel 2 --duration 15`
- Indexing Documents
  - `npm run perf-test:node -- IndexDocumentsTest --warmup 1 --iterations 1 --parallel 2 --duration 15`
- Document Search
  - `npm run perf-test:node -- SearchDocumentsTest --warmup 1 --iterations 1 --parallel 2 --duration 15`
- List Suggestions
  - `npm run perf-test:node -- SuggestTest --warmup 1 --iterations 1 --parallel 2 --duration 15`
