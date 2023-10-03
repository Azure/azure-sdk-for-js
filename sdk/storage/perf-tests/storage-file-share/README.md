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
   - get service props
     - `npm run perf-test:node -- StorageServiceGetPropertiesTest --duration 60 --iterations 1 --parallel 10 --cpus=1`
   - get share props
     - `npm run perf-test:node -- StorageShareGetPropertiesTest --duration 60 --iterations 1 --parallel 10 --cpus=1`
   - get dir props
     - `npm run perf-test:node -- StorageDirGetPropertiesTest --duration 60 --iterations 1 --parallel 10 --cpus=1`
   - get dir props
     - `npm run perf-test:node -- StorageFileGetPropertiesTest --duration 60 --iterations 1 --parallel 10 --cpus=1`
   - without using perf framework (Emma's Test)
     - `ts-node test/getProps-adhoc-test.ts`
