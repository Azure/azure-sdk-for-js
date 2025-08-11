# JavaScript SDK Health Status Report

This script generates a health status report for the Azure SDK for JavaScript. The report can be found at [aka.ms/azsdk/javascript/health](https://aka.ms/azsdk/javascript/health).

## How to run locally

1. `npm install`
2. `az login` to use `DefaultAzureCredential`
3. set the `GITHUB_TOKEN` environment variable to your [GitHub PAT](https://github.com/settings/tokens) (with repo permissions).
4. run the script: `npm run run-tool`
