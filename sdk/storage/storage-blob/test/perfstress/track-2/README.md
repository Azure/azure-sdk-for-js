### Guide

1. Build the storage-blob package `rush build -t storage-blob`.
2. Navigate to `storage-blob` folder `cd sdk\storage\storage-blob\`.
3. Create a storage account and populate the .env file at `storage\storage-blob` folder with `ACCOUNT_NAME` and `ACCOUNT_KEY` variables.
4. Run the tests as follows
   - download
     - `npm run perfstress-test:node -- StorageBlobDownloadTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
   - upload
     - `npm run perfstress-test:node -- StorageBlobUploadTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
   - upload file
     - `npm run perfstress-test:node -- StorageBlobUploadFileTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
   - list blobs
     - `npm run perfstress-test:node -- StorageBlobListTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
