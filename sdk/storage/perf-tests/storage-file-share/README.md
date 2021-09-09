### Guide

1. Build the storage-blob perf tests package `rush build -t perf-storage-file-share`.
2. Copy the `sample.env` file and name it as `.env`.
3. Create a storage account and populate the `.env` file with `STORAGE_CONNECTION_STRING` variable.
4. Run the tests as follows
   - download
     - `npm run perf-test:node -- StorageFileShareDownloadTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
   - download to file
     - `npm run perf-test:node -- StorageFileShareDownloadToFileTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
   - upload
     - `npm run perf-test:node -- StorageFileShareUploadTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
   - upload from file
     - `npm run perf-test:node -- StorageFileShareUploadFromFileTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
