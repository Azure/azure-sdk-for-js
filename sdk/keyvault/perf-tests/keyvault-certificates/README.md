### Guide

1. Build the keyvault-certificates perf tests package `rush build -t perf-keyvault-certificates`.
2. Copy the `sample.env` file and name it as `.env`.
3. Create an Azure KeyVault and populate the `.env` file with `KEYVAULT_URI` variable.
4. Populate the `.env` file with your Azure Credentials.
5. Refer to the [rate limits](https://docs.microsoft.com/azure/key-vault/general/service-limits) and then run the tests as follows:

- Get Certificate
  - `npm run perf-test:node -- GetCertificateTest --warmup 1 --iterations 1 --parallel 5`
