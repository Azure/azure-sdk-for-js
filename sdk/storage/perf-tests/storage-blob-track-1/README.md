### Guide

1. Navigate to `sdk\storage\perf-tests\storage-blob-track-1`
2. Do `rush update`.
3. Run `npm run setup`.
4. Copy the `sample.env` file and name it as `.env`.
5. Create a storage account and populate the `.env` file with `STORAGE_CONNECTION_STRING` variable.
6. Run the tests as follows

   - no-op
     - `npm run perf-test:node -- NoOp --duration 7`
   - download
     - `npm run perf-test:node -- StorageBlobDownloadTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
   - upload
     - `npm run perf-test:node -- StorageBlobUploadTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
   - list blobs
     - `npm run perf-test:node -- StorageBlobListTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
