### Guide

1. Build the storage-file-datalake package `rush build -t storage-file-datalake`.
2. Navigate to `storage-file-datalake` folder `cd sdk\storage\storage-file-datalake\`.
3. Create a storage account and populate the .env file at `storage\storage-file-datalake` folder with `ACCOUNT_NAME` and `ACCOUNT_KEY` variables.
4. Run the tests as shown below
   - append
     - `npm run perfstress-test:node -- StorageDFSAppendTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
   - read
     - `npm run perfstress-test:node -- StorageDFSReadTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
   - upload
     - `npm run perfstress-test:node -- StorageDFSUploadTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
   - upload from file
     - `npm run perfstress-test:node -- StorageDFSUploadFromFileTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
