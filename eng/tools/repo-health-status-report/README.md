# JavaScript SDK Health Status Report

This script generates a health status report for the Azure SDK for JavaScript. The report can be found at [aka.ms/azsdk/javascript/health](https://aka.ms/azsdk/javascript/health).

## How to run locally

1. `pnpm install`
2. `az login` to use `DefaultAzureCredential`
3. Set `GH_TOKEN` to a [fine-grained GitHub PAT](https://github.com/settings/personal-access-tokens) scoped to `Azure/azure-sdk-for-js` with read-only **Issues** access.
4. run the script: `pnpm run run-tool`

The command writes `health_report.csv` locally. To also upload the result, run
`pnpm run run-tool -- --upload`; that credential needs **Contents** write access.
