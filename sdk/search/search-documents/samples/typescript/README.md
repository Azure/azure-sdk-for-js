# Azure Cognitive Search client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure Cognitive Search in some common scenarios.

| **File Name**                | **Description**          |
| ---------------------------- | ------------------------ |
| [readonlyQuery.ts][readonly] | queries a public dataset |
| **Data Source Connections**  |
| [createDataSourceConnection.ts][createDataSourceConnection] | Creates a Datasource Connection |
| [createOrUpdateDataSourceConnection.ts][createOrUpdateDataSourceConnection] | Updates a Datasource Connection |
| [deleteDataSourceConnectionByName.ts][deleteDataSourceConnectionByName] | Deletes Datasource Connection by Name |
| [deleteDataSourceConnectionByObject.ts][deleteDataSourceConnectionByObject] | Deletes Datasource Connection by Object |
| [getDataSourceConnection.ts][getDataSourceConnection] | Gets a Datasource Connection |
| [listDataSourceConnectionNames.ts][listDataSourceConnectionNames] | List names of Datasource Connections |
| [listDataSourceConnections.ts][listDataSourceConnections] | List Datasource Connections |
| **Indexers** |
| [createIndexer.ts][createIndexer] | Creates an Indexer |
| [createOrUpdateIndexer.ts][createOrUpdateIndexer] | Updates an Indexer |
| [deleteIndexerByName.ts][deleteIndexerByName] | Deletes Indexer by Name |
| [deleteIndexerByObject.ts][deleteIndexerByObject] | Deletes Indexer by Object |
| [getIndexer.ts][getIndexer] | Gets an Indexer |
| [getIndexerStatus.ts][getIndexerStatus] | Gets the status of an Indexer |
| [listIndexerNames.ts][listIndexerNames] | List names of Indexers |
| [listIndexers.ts][listIndexers] | List Indexers |
| [resetIndexer.ts][resetIndexer] | Resets an Indexer |
| [runIndexer.ts][runIndexer] | Runs an Indexer |
| **Indexes** |
| [analyzeText.ts][analyzeText] | Analyzes a given text |
| [createIndex.ts][createIndex] | Creates an Index |
| [createOrUpdateIndex.ts][createOrUpdateIndex] | Updates an Index |
| [deleteIndexByName.ts][deleteIndexByName] | Deletes Index by Name |
| [deleteIndexByObject.ts][deleteIndexByObject] | Deletes Index by Object |
| [getIndex.ts][getIndex] | Gets an Index |
| [getIndexStatistics.ts][getIndexStatistics] | Gets the Statistics of an Index |
| [listIndexes.ts][listIndexes] | List Indexes |
| [listIndexNames.ts][listIndexNames] | List Names of Indexes |
| **Skillsets** |
| [createOrUpdateSkillset.ts][createOrUpdateSkillset] | Updates a skillset |
| [createSkillset.ts][createSkillset] | Creates a skillset |
| [deleteSkillsetByName.ts][deleteSkillsetByName] | Deletes a Skillset by Name |
| [deleteSkillsetByObject.ts][deleteSkillsetByObject] | Deletes a Skillset by Object |
| [getSkillset.ts][getSkillset] | Gets a skillset |
| [listSkillsets.ts][listSkillsets] | List all skillsets |
| [listSkillsetsNames.ts][listSkillsetsNames] | List names of skillsets |
| **SynonymMaps** |
| [createOrUpdateSynonymMap.ts][createOrUpdateSynonymMap] | Updates a synonym map |
| [createSynonymMap.ts][createSynonymMap] | Creates a synonym map |
| [deleteSynonymMapByName.ts][deleteSynonymMapByName] | Deletes a synonym map by Name |
| [deleteSynonymMapByObject.ts][deleteSynonymMapByObject] | Deletes a synonym map by object |
| [getSynonymMap.ts][getSynonymMap] | Gets a synonym map |
| [listSynonymMapNames.ts][listSynonymMapNames] | List names of synonym maps |
| [listSynonymMaps.ts][listSynonymMaps] | List all synonym maps |

## Prerequisites

The samples are compatible with Node.js >= 8.0.0.

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] and [an Azure Cognitive Search service][search_resource] to run these sample programs. Samples retrieve credentials to access the Azure Cognitive Search endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/readonlyQuery.js
```

Alternatively, run a single sample with the correct environment variables set (step 3 is not required if you do this), for example (cross-platform):

```bash
npx cross-env SEARCH_API_ENDPOINT="<endpoint>" SEARCH_API_KEY="<api key>" node dist/readonlyQuery.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[readonly]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/readonlyQuery.ts
[apiref]: https://aka.ms/azsdk/js/search/docs
[search_resource]: https://docs.microsoft.com/azure/search/search-create-service-portal
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
[createDataSourceConnection]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/dataSourceConnections/createDataSourceConnection.ts
[createOrUpdateDataSourceConnection]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/dataSourceConnections/createOrUpdateDataSourceConnection.ts
[deleteDataSourceConnectionByName]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/dataSourceConnections/deleteDataSourceConnectionByName.ts
[deleteDataSourceConnectionByObject]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/dataSourceConnections/deleteDataSourceConnectionByObject.ts
[getDataSourceConnection]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/dataSourceConnections/getDataSourceConnection.ts
[listDataSourceConnectionNames]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/dataSourceConnections/listDataSourceConnectionNames.ts
[listDataSourceConnections]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/dataSourceConnections/listDataSourceConnections.ts
[createIndexer]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/indexers/createIndexer.ts
[createOrUpdateIndexer]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/indexers/createOrUpdateIndexer.ts
[deleteIndexerByName]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/indexers/deleteIndexerByName.ts
[deleteIndexerByObject]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/indexers/deleteIndexerByObject.ts
[getIndexer]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/indexers/getIndexer.ts
[getIndexerStatus]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/indexers/getIndexerStatus.ts
[listIndexerNames]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/indexers/listIndexerNames.ts
[listIndexers]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/indexers/listIndexers.ts
[resetIndexer]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/indexers/resetIndexer.ts
[runIndexer]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/indexers/runIndexer.ts
[analyzeText]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/indexes/analyzeText.ts
[createIndex]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/indexes/createIndex.ts
[createOrUpdateIndex]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/indexes/createOrUpdateIndex.ts
[deleteIndexByName]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/indexes/deleteIndexByName.ts
[deleteIndexByObject]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/indexes/deleteIndexByObject.ts
[getIndex]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/indexes/getIndex.ts
[getIndexStatistics]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/indexes/getIndexStatistics.ts
[listIndexes]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/indexes/listIndexes.ts
[listIndexNames]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/indexes/listIndexNames.ts
[createOrUpdateSkillset]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/skillSets/createOrUpdateSkillset.ts
[createSkillset]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/skillSets/createSkillset.ts
[deleteSkillsetByName]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/skillSets/deleteSkillsetByName.ts
[deleteSkillsetByObject]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/skillSets/deleteSkillsetByObject.ts
[getSkillset]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/skillSets/getSkillset.ts
[listSkillsets]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/skillSets/listSkillsets.ts
[listSkillsetsNames]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/skillSets/listSkillsetsNames.ts
[createOrUpdateSynonymMap]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/synonymMaps/createOrUpdateSynonymMap.ts
[createSynonymMap]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/synonymMaps/createSynonymMap.ts
[deleteSynonymMapByName]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/synonymMaps/deleteSynonymMapByName.ts
[deleteSynonymMapByObject]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/synonymMaps/deleteSynonymMapByObject.ts
[getSynonymMap]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/synonymMaps/getSynonymMap.ts
[listSynonymMapNames]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/synonymMaps/listSynonymMapNames.ts
[listSynonymMaps]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search-documents/samples/typescript/src/synonymMaps/listSynonymMaps.ts
