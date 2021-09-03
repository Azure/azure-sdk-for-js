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

[readonly]: .src/readonlyQuery.ts
[apiref]: https://aka.ms/azsdk/js/search/docs
[search_resource]: https://docs.microsoft.com/azure/search/search-create-service-portal
[freesub]: https://azure.microsoft.com/free/
[package]: ../../README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
[createdatasourceconnection]: .src/dataSourceConnections/createDataSourceConnection.ts
[createorupdatedatasourceconnection]: .src/dataSourceConnections/createOrUpdateDataSourceConnection.ts
[deletedatasourceconnectionbyname]: .src/dataSourceConnections/deleteDataSourceConnectionByName.ts
[deletedatasourceconnectionbyobject]: .src/dataSourceConnections/deleteDataSourceConnectionByObject.ts
[getdatasourceconnection]: .src/dataSourceConnections/getDataSourceConnection.ts
[listdatasourceconnectionnames]: .src/dataSourceConnections/listDataSourceConnectionNames.ts
[listdatasourceconnections]: .src/dataSourceConnections/listDataSourceConnections.ts
[createindexer]: .src/indexers/createIndexer.ts
[createorupdateindexer]: .src/indexers/createOrUpdateIndexer.ts
[deleteindexerbyname]: .src/indexers/deleteIndexerByName.ts
[deleteindexerbyobject]: .src/indexers/deleteIndexerByObject.ts
[getindexer]: .src/indexers/getIndexer.ts
[getindexerstatus]: .src/indexers/getIndexerStatus.ts
[listindexernames]: .src/indexers/listIndexerNames.ts
[listindexers]: .src/indexers/listIndexers.ts
[resetindexer]: .src/indexers/resetIndexer.ts
[runindexer]: .src/indexers/runIndexer.ts
[analyzetext]: .src/indexes/analyzeText.ts
[createindex]: .src/indexes/createIndex.ts
[createorupdateindex]: .src/indexes/createOrUpdateIndex.ts
[deleteindexbyname]: .src/indexes/deleteIndexByName.ts
[deleteindexbyobject]: .src/indexes/deleteIndexByObject.ts
[getindex]: .src/indexes/getIndex.ts
[getindexstatistics]: .src/indexes/getIndexStatistics.ts
[listindexes]: .src/indexes/listIndexes.ts
[listindexnames]: .src/indexes/listIndexNames.ts
[createorupdateskillset]: .src/skillSets/createOrUpdateSkillset.ts
[createskillset]: .src/skillSets/createSkillset.ts
[deleteskillsetbyname]: .src/skillSets/deleteSkillsetByName.ts
[deleteskillsetbyobject]: .src/skillSets/deleteSkillsetByObject.ts
[getskillset]: .src/skillSets/getSkillset.ts
[listskillsets]: .src/skillSets/listSkillsets.ts
[listskillsetsnames]: .src/skillSets/listSkillsetsNames.ts
[createorupdatesynonymmap]: .src/synonymMaps/createOrUpdateSynonymMap.ts
[createsynonymmap]: .src/synonymMaps/createSynonymMap.ts
[deletesynonymmapbyname]: .src/synonymMaps/deleteSynonymMapByName.ts
[deletesynonymmapbyobject]: .src/synonymMaps/deleteSynonymMapByObject.ts
[getsynonymmap]: .src/synonymMaps/getSynonymMap.ts
[listsynonymmapnames]: .src/synonymMaps/listSynonymMapNames.ts
[listsynonymmaps]: .src/synonymMaps/listSynonymMaps.ts
