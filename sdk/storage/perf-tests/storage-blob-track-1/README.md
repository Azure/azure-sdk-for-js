### Guide

1. Navigate to `test-utils\perfstress` folder `cd sdk\test-utils\perfstress\`
2. Build the package `rush update && rush build -t test-utils-perfstress`
3. Pack the perf package `rushx pack`
4. Navigate to `storage-blob\perfstress\track-1` folder `cd sdk\storage\storage-blob\perfstress\track-1`.
5. Install the perf package `npm i ..\..\..\..\..\test-utils\perfstress\azure-test-utils-perfstress-1.0.0.tgz`
6. Run `npm install` to get `storage-blob V10`.
7. Create a storage account and populate the .env file with `ACCOUNT_NAME` and `ACCOUNT_KEY` variables.
8. Run the tests as follows
   - download
     - `npm run perfstress-test:node -- StorageBlobDownloadTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
   - upload
     - `npm run perfstress-test:node -- StorageBlobUploadTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
   - list blobs
     - `npm run perfstress-test:node -- StorageBlobListTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
