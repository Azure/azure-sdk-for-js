### Guide

1. Navigate to `sdk\storage\perf-tests\storage-file-share-track-1`
2. Do `rush update`.
3. Run `npm run setup`.
4. Copy the `sample.env` file and name it as `.env`.
5. Create a storage account and populate the `.env` file with `STORAGE_CONNECTION_STRING` variable.
6. Run the tests as follows
   - download
     - `npm run perf-test:node -- StorageFileShareDownloadTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
   - upload
     - `npm run perf-test:node -- StorageFileShareUploadTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
