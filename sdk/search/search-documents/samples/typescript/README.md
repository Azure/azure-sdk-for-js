# Azure Cognitive Search client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure Cognitive Search in some common scenarios.

| **File Name**                                                               | **Description**                         |
| --------------------------------------------------------------------------- | --------------------------------------- |
| **Data Source Connections**                                                 |
| [createDataSourceConnection.ts][createdatasourceconnection]                 | Creates a Datasource Connection         |
| [createOrUpdateDataSourceConnection.ts][createorupdatedatasourceconnection] | Updates a Datasource Connection         |
| [deleteDataSourceConnectionByName.ts][deletedatasourceconnectionbyname]     | Deletes Datasource Connection by Name   |
| [deleteDataSourceConnectionByObject.ts][deletedatasourceconnectionbyobject] | Deletes Datasource Connection by Object |
| [getDataSourceConnection.ts][getdatasourceconnection]                       | Gets a Datasource Connection            |
| [listDataSourceConnectionNames.ts][listdatasourceconnectionnames]           | List names of Datasource Connections    |
| [listDataSourceConnections.ts][listdatasourceconnections]                   | List Datasource Connections             |
| **Indexers**                                                                |
| [createIndexer.ts][createindexer]                                           | Creates an Indexer                      |
| [createOrUpdateIndexer.ts][createorupdateindexer]                           | Updates an Indexer                      |
| [deleteIndexerByName.ts][deleteindexerbyname]                               | Deletes Indexer by Name                 |
| [deleteIndexerByObject.ts][deleteindexerbyobject]                           | Deletes Indexer by Object               |
| [getIndexer.ts][getindexer]                                                 | Gets an Indexer                         |
| [getIndexerStatus.ts][getindexerstatus]                                     | Gets the status of an Indexer           |
| [listIndexerNames.ts][listindexernames]                                     | List names of Indexers                  |
| [listIndexers.ts][listindexers]                                             | List Indexers                           |
| [resetIndexer.ts][resetindexer]                                             | Resets an Indexer                       |
| [runIndexer.ts][runindexer]                                                 | Runs an Indexer                         |
| **Indexes**                                                                 |
| [analyzeText.ts][analyzetext]                                               | Analyzes a given text                   |
| [createIndex.ts][createindex]                                               | Creates an Index                        |
| [createOrUpdateIndex.ts][createorupdateindex]                               | Updates an Index                        |
| [deleteIndexByName.ts][deleteindexbyname]                                   | Deletes Index by Name                   |
| [deleteIndexByObject.ts][deleteindexbyobject]                               | Deletes Index by Object                 |
| [getIndex.ts][getindex]                                                     | Gets an Index                           |
| [getIndexStatistics.ts][getindexstatistics]                                 | Gets the Statistics of an Index         |
| [listIndexes.ts][listindexes]                                               | List Indexes                            |
| [listIndexNames.ts][listindexnames]                                         | List Names of Indexes                   |
| **Skillsets**                                                               |
| [createOrUpdateSkillset.ts][createorupdateskillset]                         | Updates a skillset                      |
| [createSkillset.ts][createskillset]                                         | Creates a skillset                      |
| [deleteSkillsetByName.ts][deleteskillsetbyname]                             | Deletes a Skillset by Name              |
| [deleteSkillsetByObject.ts][deleteskillsetbyobject]                         | Deletes a Skillset by Object            |
| [getSkillset.ts][getskillset]                                               | Gets a skillset                         |
| [listSkillsets.ts][listskillsets]                                           | List all skillsets                      |
| [listSkillsetsNames.ts][listskillsetsnames]                                 | List names of skillsets                 |
| **SynonymMaps**                                                             |
| [createOrUpdateSynonymMap.ts][createorupdatesynonymmap]                     | Updates a synonym map                   |
| [createSynonymMap.ts][createsynonymmap]                                     | Creates a synonym map                   |
| [deleteSynonymMapByName.ts][deletesynonymmapbyname]                         | Deletes a synonym map by Name           |
| [deleteSynonymMapByObject.ts][deletesynonymmapbyobject]                     | Deletes a synonym map by object         |
| [getSynonymMap.ts][getsynonymmap]                                           | Gets a synonym map                      |
| [listSynonymMapNames.ts][listsynonymmapnames]                               | List names of synonym maps              |
| [listSynonymMaps.ts][listsynonymmaps]                                       | List all synonym maps                   |

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

[apiref]: https://aka.ms/azsdk/js/search/docs
[search_resource]: https://docs.microsoft.com/azure/search/search-create-service-portal
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
[createdatasourceconnection]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/dataSourceConnections/createDataSourceConnection.ts
[createorupdatedatasourceconnection]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/dataSourceConnections/createOrUpdateDataSourceConnection.ts
[deletedatasourceconnectionbyname]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/dataSourceConnections/deleteDataSourceConnectionByName.ts
[deletedatasourceconnectionbyobject]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/dataSourceConnections/deleteDataSourceConnectionByObject.ts
[getdatasourceconnection]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/dataSourceConnections/getDataSourceConnection.ts
[listdatasourceconnectionnames]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/dataSourceConnections/listDataSourceConnectionNames.ts
[listdatasourceconnections]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/dataSourceConnections/listDataSourceConnections.ts
[createindexer]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/indexers/createIndexer.ts
[createorupdateindexer]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/indexers/createOrUpdateIndexer.ts
[deleteindexerbyname]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/indexers/deleteIndexerByName.ts
[deleteindexerbyobject]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/indexers/deleteIndexerByObject.ts
[getindexer]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/indexers/getIndexer.ts
[getindexerstatus]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/indexers/getIndexerStatus.ts
[listindexernames]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/indexers/listIndexerNames.ts
[listindexers]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/indexers/listIndexers.ts
[resetindexer]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/indexers/resetIndexer.ts
[runindexer]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/indexers/runIndexer.ts
[analyzetext]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/indexes/analyzeText.ts
[createindex]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/indexes/createIndex.ts
[createorupdateindex]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/indexes/createOrUpdateIndex.ts
[deleteindexbyname]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/indexes/deleteIndexByName.ts
[deleteindexbyobject]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/indexes/deleteIndexByObject.ts
[getindex]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/indexes/getIndex.ts
[getindexstatistics]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/indexes/getIndexStatistics.ts
[listindexes]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/indexes/listIndexes.ts
[listindexnames]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/indexes/listIndexNames.ts
[createorupdateskillset]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/skillSets/createOrUpdateSkillset.ts
[createskillset]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/skillSets/createSkillset.ts
[deleteskillsetbyname]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/skillSets/deleteSkillsetByName.ts
[deleteskillsetbyobject]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/skillSets/deleteSkillsetByObject.ts
[getskillset]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/skillSets/getSkillset.ts
[listskillsets]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/skillSets/listSkillsets.ts
[listskillsetsnames]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/skillSets/listSkillsetsNames.ts
[createorupdatesynonymmap]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/synonymMaps/createOrUpdateSynonymMap.ts
[createsynonymmap]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/synonymMaps/createSynonymMap.ts
[deletesynonymmapbyname]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/synonymMaps/deleteSynonymMapByName.ts
[deletesynonymmapbyobject]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/synonymMaps/deleteSynonymMapByObject.ts
[getsynonymmap]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/synonymMaps/getSynonymMap.ts
[listsynonymmapnames]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/synonymMaps/listSynonymMapNames.ts
[listsynonymmaps]: https://github.com/Azure/azure-sdk-for-js/blob/release/search-documents/11.3.0/sdk/search/search-documents/samples/typescript/src/synonymMaps/listSynonymMaps.ts
