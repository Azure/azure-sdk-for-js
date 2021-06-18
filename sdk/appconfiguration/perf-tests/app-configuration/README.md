### Guide

1. Build the app-config perf tests package `rush build -t perf-app-configuration`.
2. Copy the `sample.env` file and name it as `.env`.
3. Create a storage account and populate the `.env` file with `APPCONFIG_CONNECTION_STRING` variable.
4. Run the tests as follows

   - list settings
     - `npm run perf-test:node -- ListSettingsTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
