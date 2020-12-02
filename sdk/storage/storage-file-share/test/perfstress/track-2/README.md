### Guide

1. Build the storage-file-share package `rush build -t storage-file-share`.
2. Navigate to `storage-file-share` folder `cd sdk\storage\storage-file-share\`.
3. Create a storage account and populate the .env file at `storage\storage-file-share` folder with `ACCOUNT_NAME` and `ACCOUNT_KEY` variables.
4. Run the tests as shown below
   - download
     - `npm run perfstress-test:node -- StorageFileShareDownloadTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
   - download to file
     - `npm run perfstress-test:node -- StorageFileShareDownloadToFileTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
   - upload
     - `npm run perfstress-test:node -- StorageFileShareUploadTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
   - upload from file
     - `npm run perfstress-test:node -- StorageFileShareUploadFromFileTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
