### Guide

1. Build the keyvault-keys perf tests package `rush build -t perf-keyvault-keys`.
2. Copy the `sample.env` file and name it as `.env`.
3. Create an Azure KeyVault and populate the `.env` file with `KEYVAULT_URI` variable.
4. Populate the `.env` file with your Azure Credentials.
5. Refer to the [rate limits](https://docs.microsoft.com/azure/key-vault/general/service-limits) and then run the tests as follows:

- Get Key
  - `npm run perf-test:node -- GetKeyTest --warmup 1 --iterations 1 --parallel 5`
- Decrypt
  - `npm run perf-test:node -- DecryptTest --warmup 1 --iterations 1 --parallel 5`
- Sign
  - `npm run perf-test:node -- SignTest --warmup 1 --iterations 1 --parallel 5`
- UnwrapKey
  - `npm run perf-test:node -- UnwrapKeyTest --warmup 1 --iterations 1 --parallel 5`
