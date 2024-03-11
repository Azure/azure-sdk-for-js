### Guide

1. Build the storage-blob perf tests package `rush build -t perf-storage-blob`.
2. Copy the `sample.env` file and name it as `.env`.
3. Create a storage account and populate the `.env` file with `STORAGE_CONNECTION_STRING` variable.
4. Run the tests as follows

   - download
     - `npm run perf-test:node -- StorageBlobDownloadTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
   - upload
     - `npm run perf-test:node -- StorageBlobUploadTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
   - upload file
     - `npm run perf-test:node -- StorageBlobUploadFileTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
   - list blobs
     - `npm run perf-test:node -- StorageBlobListTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
   - download using sas with storage-blob
     - `npm run perf-test:node -- StorageBlobDownloadWithSASTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
   - download using sas with core-rest-pipeline
     - `npm run perf-test:node -- CoreHTTPSDownloadWithSASTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
   - download test with profiling
     - `npm run perf-test:node -- StorageBlobDownloadTest --duration 10 --profile --parallel 64`
