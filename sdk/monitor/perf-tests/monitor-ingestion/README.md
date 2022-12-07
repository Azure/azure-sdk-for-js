# Perf tests for `monitor-ingestion`

### Guide

1. Build the monitor-ingestion perf tests package `rush build -t perf-monitor-ingestion`.
2. Copy the `sample.env` file and name it as `.env`.
3. Create the necessary test resources (either using the `New-TestResources.ps1` script or by following [this guide])
4. Run the tests as follows:

- upload logs
  - `npm run perf-test:node -- UploadLogsTest --warmup 1 --iterations 1 --parallel 50 --duration 15`
  - The option `--logsCount` can be used to specify the number of logs to upload.
  - The option `--maxConcurrency` can be used to specify the maximum number of concurrent upload requests in the case that the
    upload is split into multiple requests due to the size of the logs being uploaded exceeding 1MB.
  - The option `--logLength` can be used to set the length of each log to be uploaded.
  - The boolean option `--randomLogValue` can be set to true to make the log's content a random string. By default, a repeating string is used.
