# Azure Cognitive Search client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Cognitive Search in some common scenarios.

| **File Name**                | **Description**          |
| ---------------------------- | ------------------------ |
| [readonlyQuery.js][readonly] | queries a public dataset |
| **Data Source Connections**  |
| [createDataSourceConnection.js][createDataSourceConnection] | Creates a Datasource Connection |
| [createOrUpdateDataSourceConnection.js][createOrUpdateDataSourceConnection] | Updates a Datasource Connection |
| [deleteDataSourceConnectionByName.js][deleteDataSourceConnectionByName] | Deletes Datasource Connection by Name |
| [deleteDataSourceConnectionByObject.js][deleteDataSourceConnectionByObject] | Deletes Datasource Connection by Object |
| [getDataSourceConnection.js][getDataSourceConnection] | Gets a Datasource Connection |
| [listDataSourceConnectionNames.js][listDataSourceConnectionNames] | List names of Datasource Connections |
| [listDataSourceConnections.js][listDataSourceConnections] | List Datasource Connections |
| **Indexers** |
| [createIndexer.js][createIndexer] | Creates an Indexer |
| [createOrUpdateIndexer.js][createOrUpdateIndexer] | Updates an Indexer |
| [deleteIndexerByName.js][deleteIndexerByName] | Deletes Indexer by Name |
| [deleteIndexerByObject.js][deleteIndexerByObject] | Deletes Indexer by Object |
| [getIndexer.js][getIndexer] | Gets an Indexer |
| [getIndexerStatus.js][getIndexerStatus] | Gets the status of an Indexer |
| [listIndexerNames.js][listIndexerNames] | List names of Indexers |
| [listIndexers.js][listIndexers] | List Indexers |
| [resetIndexer.js][resetIndexer] | Resets an Indexer |
| [runIndexer.js][runIndexer] | Runs an Indexer |
| **Indexes** |
| [analyzeText.js][analyzeText] | Analyzes a given text |
| [createIndex.js][createIndex] | Creates an Index |
| [createOrUpdateIndex.js][createOrUpdateIndex] | Updates an Index |
| [deleteIndexByName.js][deleteIndexByName] | Deletes Index by Name |
| [deleteIndexByObject.js][deleteIndexByObject] | Deletes Index by Object |
| [getIndex.js][getIndex] | Gets an Index |
| [getIndexStatistics.js][getIndexStatistics] | Gets the Statistics of an Index |
| [listIndexes.js][listIndexes] | List Indexes |
| [listIndexNames.js][listIndexNames] | List Names of Indexes |
| **Skillsets** |
| [createOrUpdateSkillset.js][createOrUpdateSkillset] | Updates a skillset |
| [createSkillset.js][createSkillset] | Creates a skillset |
| [deleteSkillsetByName.js][deleteSkillsetByName] | Deletes a Skillset by Name |
| [deleteSkillsetByObject.js][deleteSkillsetByObject] | Deletes a Skillset by Object |
| [getSkillset.js][getSkillset] | Gets a skillset |
| [listSkillsets.js][listSkillsets] | List all skillsets |
| [listSkillsetsNames.js][listSkillsetsNames] | List names of skillsets |
| **SynonymMaps** |
| [createOrUpdateSynonymMap.js][createOrUpdateSynonymMap] | Updates a synonym map |
| [createSynonymMap.js][createSynonymMap] | Creates a synonym map |
| [deleteSynonymMapByName.js][deleteSynonymMapByName] | Deletes a synonym map by Name |
| [deleteSynonymMapByObject.js][deleteSynonymMapByObject] | Deletes a synonym map by object |
| [getSynonymMap.js][getSynonymMap] | Gets a synonym map |
| [listSynonymMapNames.js][listSynonymMapNames] | List names of synonym maps |
| [listSynonymMaps.js][listSynonymMaps] | List all synonym maps |

## Prerequisites

The samples are compatible with Node.js >= 8.0.0.

You need [an Azure subscription][freesub] and [an Azure Cognitive Search service][search_resource] to run these sample programs. Samples retrieve credentials to access the Azure Cognitive Search endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node readonlyQuery.js
```

Alternatively, run a single sample with the correct environment variables set (step 3 is not required if you do this), for example (cross-platform):

```bash
npx cross-env SEARCH_API_ENDPOINT="<endpoint>" SEARCH_API_KEY="<api key>" node readonlyQuery.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[readonly]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/readonlyQuery.js
[apiref]: https://aka.ms/azsdk/js/search/docs
[search_resource]: https://docs.microsoft.com/azure/search/search-create-service-portal
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/README.md
[createDataSourceConnection]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/dataSourceConnections/createDataSourceConnection.js
[createOrUpdateDataSourceConnection]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/dataSourceConnections/createOrUpdateDataSourceConnection.js
[deleteDataSourceConnectionByName]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/dataSourceConnections/deleteDataSourceConnectionByName.js
[deleteDataSourceConnectionByObject]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/dataSourceConnections/deleteDataSourceConnectionByObject.js
[getDataSourceConnection]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/dataSourceConnections/getDataSourceConnection.js
[listDataSourceConnectionNames]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/dataSourceConnections/listDataSourceConnectionNames.js
[listDataSourceConnections]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/dataSourceConnections/listDataSourceConnections.js
[createIndexer]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/indexers/createIndexer.js
[createOrUpdateIndexer]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/indexers/createOrUpdateIndexer.js
[deleteIndexerByName]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/indexers/deleteIndexerByName.js
[deleteIndexerByObject]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/indexers/deleteIndexerByObject.js
[getIndexer]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/indexers/getIndexer.js
[getIndexerStatus]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/indexers/getIndexerStatus.js
[listIndexerNames]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/indexers/listIndexerNames.js
[listIndexers]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/indexers/listIndexers.js
[resetIndexer]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/indexers/resetIndexer.js
[runIndexer]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/indexers/runIndexer.js
[analyzeText]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/indexes/analyzeText.js
[createIndex]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/indexes/createIndex.js
[createOrUpdateIndex]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/indexes/createOrUpdateIndex.js
[deleteIndexByName]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/indexes/deleteIndexByName.js
[deleteIndexByObject]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/indexes/deleteIndexByObject.js
[getIndex]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/indexes/getIndex.js
[getIndexStatistics]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/indexes/getIndexStatistics.js
[listIndexes]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/indexes/listIndexes.js
[listIndexNames]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/indexes/listIndexNames.js
[createOrUpdateSkillset]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/skillSets/createOrUpdateSkillset.js
[createSkillset]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/skillSets/createSkillset.js
[deleteSkillsetByName]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/skillSets/deleteSkillsetByName.js
[deleteSkillsetByObject]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/skillSets/deleteSkillsetByObject.js
[getSkillset]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/skillSets/getSkillset.js
[listSkillsets]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/skillSets/listSkillsets.js
[listSkillsetsNames]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/skillSets/listSkillsetsNames.js
[createOrUpdateSynonymMap]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/synonymMaps/createOrUpdateSynonymMap.js
[createSynonymMap]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/synonymMaps/createSynonymMap.js
[deleteSynonymMapByName]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/synonymMaps/deleteSynonymMapByName.js
[deleteSynonymMapByObject]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/synonymMaps/deleteSynonymMapByObject.js
[getSynonymMap]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/synonymMaps/getSynonymMap.js
[listSynonymMapNames]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/synonymMaps/listSynonymMapNames.js
[listSynonymMaps]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples/javascript/src/synonymMaps/listSynonymMaps.js
