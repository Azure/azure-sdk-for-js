### Guide

1. Build the storage-blob perf tests package `rush build -t test-utils-perfstress`.
2. Create a storage account and populate the .env file with `STORAGE_CONNECTION_STRING` variables.
3. Run the tests as follows

   - download
     - `npm run perf-test:node -- StorageBlobDownloadTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
   - upload
     - `npm run perf-test:node -- StorageBlobUploadTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
   - list blobs
     - `npm run perf-test:node -- StorageBlobListTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
