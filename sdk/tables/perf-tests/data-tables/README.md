# Performance Testing for Tables

## Instructions

1. Build the data-tables perf tests package `rush build -t perf-data-tables`.
2. Copy the `sample.env` file and name it as `.env`.
3. Create a Storage or CosmosDB account and populate the `.env` file with the relevant credentials.
4. Refer to the [Storage](https://docs.microsoft.com/azure/azure-resource-manager/management/azure-subscription-service-limits#storage-limits) or [CosmosDB](https://docs.microsoft.com/azure/cosmos-db/concepts-limits) rate limits and then run the tests as follows
     - `npm run perf-test:node -- CreateSimpleEntityTest`
     - `npm run perf-test:node -- CreateSimpleEntityBatchTest`
     - `npm run perf-test:node -- CreateComplexEntityTest`
     - `npm run perf-test:node -- CreateComplexEntityBatchTest`
     - `npm run perf-test:node -- ListSimpleEntitiesTest`
     - `npm run perf-test:node -- ListComplexEntitiesTest`