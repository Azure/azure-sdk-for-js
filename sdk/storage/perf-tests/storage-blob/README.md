### Guide

1. Build the storage-blob perf tests package `rush build -t perf-test-storage-blob`.
2. Create a storage account and populate the .env file with `STORAGE_CONNECTION_STRING` variables.
3. Run the tests as follows

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
   - download using sas with node-fetch
     - `npm run perf-test:node -- NodeFetchDownloadWithSASTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
   - download using sas with core-http
     - `npm run perf-test:node -- CoreHTTPDownloadWithSASTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
   - download using sas with core-https
     - `npm run perf-test:node -- CoreHTTPSDownloadWithSASTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
