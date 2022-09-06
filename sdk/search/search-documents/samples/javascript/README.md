# Azure Cognitive Search client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Cognitive Search in some common scenarios.

| **File Name**                                                               | **Description**                         |
| --------------------------------------------------------------------------- | --------------------------------------- |
| **Data Source Connections**                                                 |
| [createDataSourceConnection.js][createdatasourceconnection]                 | Creates a Datasource Connection         |
| [createOrUpdateDataSourceConnection.js][createorupdatedatasourceconnection] | Updates a Datasource Connection         |
| [deleteDataSourceConnectionByName.js][deletedatasourceconnectionbyname]     | Deletes Datasource Connection by Name   |
| [deleteDataSourceConnectionByObject.js][deletedatasourceconnectionbyobject] | Deletes Datasource Connection by Object |
| [getDataSourceConnection.js][getdatasourceconnection]                       | Gets a Datasource Connection            |
| [listDataSourceConnectionNames.js][listdatasourceconnectionnames]           | List names of Datasource Connections    |
| [listDataSourceConnections.js][listdatasourceconnections]                   | List Datasource Connections             |
| **Indexers**                                                                |
| [createIndexer.js][createindexer]                                           | Creates an Indexer                      |
| [createOrUpdateIndexer.js][createorupdateindexer]                           | Updates an Indexer                      |
| [deleteIndexerByName.js][deleteindexerbyname]                               | Deletes Indexer by Name                 |
| [deleteIndexerByObject.js][deleteindexerbyobject]                           | Deletes Indexer by Object               |
| [getIndexer.js][getindexer]                                                 | Gets an Indexer                         |
| [getIndexerStatus.js][getindexerstatus]                                     | Gets the status of an Indexer           |
| [listIndexerNames.js][listindexernames]                                     | List names of Indexers                  |
| [listIndexers.js][listindexers]                                             | List Indexers                           |
| [resetIndexer.js][resetindexer]                                             | Resets an Indexer                       |
| [runIndexer.js][runindexer]                                                 | Runs an Indexer                         |
| **Indexes**                                                                 |
| [analyzeText.js][analyzetext]                                               | Analyzes a given text                   |
| [createIndex.js][createindex]                                               | Creates an Index                        |
| [createOrUpdateIndex.js][createorupdateindex]                               | Updates an Index                        |
| [deleteIndexByName.js][deleteindexbyname]                                   | Deletes Index by Name                   |
| [deleteIndexByObject.js][deleteindexbyobject]                               | Deletes Index by Object                 |
| [getIndex.js][getindex]                                                     | Gets an Index                           |
| [getIndexStatistics.js][getindexstatistics]                                 | Gets the Statistics of an Index         |
| [listIndexes.js][listindexes]                                               | List Indexes                            |
| [listIndexNames.js][listindexnames]                                         | List Names of Indexes                   |
| **Skillsets**                                                               |
| [createOrUpdateSkillset.js][createorupdateskillset]                         | Updates a skillset                      |
| [createSkillset.js][createskillset]                                         | Creates a skillset                      |
| [deleteSkillsetByName.js][deleteskillsetbyname]                             | Deletes a Skillset by Name              |
| [deleteSkillsetByObject.js][deleteskillsetbyobject]                         | Deletes a Skillset by Object            |
| [getSkillset.js][getskillset]                                               | Gets a skillset                         |
| [listSkillsets.js][listskillsets]                                           | List all skillsets                      |
| [listSkillsetsNames.js][listskillsetsnames]                                 | List names of skillsets                 |
| **SynonymMaps**                                                             |
| [createOrUpdateSynonymMap.js][createorupdatesynonymmap]                     | Updates a synonym map                   |
| [createSynonymMap.js][createsynonymmap]                                     | Creates a synonym map                   |
| [deleteSynonymMapByName.js][deletesynonymmapbyname]                         | Deletes a synonym map by Name           |
| [deleteSynonymMapByObject.js][deletesynonymmapbyobject]                     | Deletes a synonym map by object         |
| [getSynonymMap.js][getsynonymmap]                                           | Gets a synonym map                      |
| [listSynonymMapNames.js][listsynonymmapnames]                               | List names of synonym maps              |
| [listSynonymMaps.js][listsynonymmaps]                                       | List all synonym maps                   |

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

[apiref]: https://aka.ms/azsdk/js/search/docs
[search_resource]: https://docs.microsoft.com/azure/search/search-create-service-portal
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/README.md
[createdatasourceconnection]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/dataSourceConnections/createDataSourceConnection.js
[createorupdatedatasourceconnection]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/dataSourceConnections/createOrUpdateDataSourceConnection.js
[deletedatasourceconnectionbyname]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/dataSourceConnections/deleteDataSourceConnectionByName.js
[deletedatasourceconnectionbyobject]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/dataSourceConnections/deleteDataSourceConnectionByObject.js
[getdatasourceconnection]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/dataSourceConnections/getDataSourceConnection.js
[listdatasourceconnectionnames]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/dataSourceConnections/listDataSourceConnectionNames.js
[listdatasourceconnections]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/dataSourceConnections/listDataSourceConnections.js
[createindexer]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/indexers/createIndexer.js
[createorupdateindexer]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/indexers/createOrUpdateIndexer.js
[deleteindexerbyname]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/indexers/deleteIndexerByName.js
[deleteindexerbyobject]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/indexers/deleteIndexerByObject.js
[getindexer]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/indexers/getIndexer.js
[getindexerstatus]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/indexers/getIndexerStatus.js
[listindexernames]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/indexers/listIndexerNames.js
[listindexers]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/indexers/listIndexers.js
[resetindexer]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/indexers/resetIndexer.js
[runindexer]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/indexers/runIndexer.js
[analyzetext]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/indexes/analyzeText.js
[createindex]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/indexes/createIndex.js
[createorupdateindex]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/indexes/createOrUpdateIndex.js
[deleteindexbyname]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/indexes/deleteIndexByName.js
[deleteindexbyobject]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/indexes/deleteIndexByObject.js
[getindex]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/indexes/getIndex.js
[getindexstatistics]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/indexes/getIndexStatistics.js
[listindexes]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/indexes/listIndexes.js
[listindexnames]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/indexes/listIndexNames.js
[createorupdateskillset]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/skillSets/createOrUpdateSkillset.js
[createskillset]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/skillSets/createSkillset.js
[deleteskillsetbyname]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/skillSets/deleteSkillsetByName.js
[deleteskillsetbyobject]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/skillSets/deleteSkillsetByObject.js
[getskillset]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/skillSets/getSkillset.js
[listskillsets]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/skillSets/listSkillsets.js
[listskillsetsnames]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/skillSets/listSkillsetsNames.js
[createorupdatesynonymmap]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/synonymMaps/createOrUpdateSynonymMap.js
[createsynonymmap]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/synonymMaps/createSynonymMap.js
[deletesynonymmapbyname]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/synonymMaps/deleteSynonymMapByName.js
[deletesynonymmapbyobject]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/synonymMaps/deleteSynonymMapByObject.js
[getsynonymmap]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/synonymMaps/getSynonymMap.js
[listsynonymmapnames]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/synonymMaps/listSynonymMapNames.js
[listsynonymmaps]: https://github.com/Azure/azure-sdk-for-js/tree/release/search-documents/11.3.0/sdk/search/search-documents/samples/javascript/src/synonymMaps/listSynonymMaps.js
