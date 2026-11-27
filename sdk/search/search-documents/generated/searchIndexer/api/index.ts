// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  resetSkills,
  createSkillset,
  listSkillsets,
  getSkillset,
  deleteSkillset,
  createOrUpdateSkillset,
  getIndexerStatus,
  createIndexer,
  listIndexers,
  getIndexer,
  deleteIndexer,
  createOrUpdateIndexer,
  runIndexer,
  resetDocuments,
  resync,
  resetIndexer,
  createDataSourceConnection,
  listDataSourceConnections,
  getDataSourceConnection,
  deleteDataSourceConnection,
  createOrUpdateDataSourceConnection,
} from "./operations.js";
export type {
  ResetSkillsOptionalParams,
  CreateSkillsetOptionalParams,
  ListSkillsetsOptionalParams,
  GetSkillsetOptionalParams,
  DeleteSkillsetOptionalParams,
  CreateOrUpdateSkillsetOptionalParams,
  GetIndexerStatusOptionalParams,
  CreateIndexerOptionalParams,
  ListIndexersOptionalParams,
  GetIndexerOptionalParams,
  DeleteIndexerOptionalParams,
  CreateOrUpdateIndexerOptionalParams,
  RunIndexerOptionalParams,
  ResetDocumentsOptionalParams,
  ResyncOptionalParams,
  ResetIndexerOptionalParams,
  CreateDataSourceConnectionOptionalParams,
  ListDataSourceConnectionsOptionalParams,
  GetDataSourceConnectionOptionalParams,
  DeleteDataSourceConnectionOptionalParams,
  CreateOrUpdateDataSourceConnectionOptionalParams,
} from "./options.js";
export type {
  SearchIndexerContext,
  SearchIndexerClientOptionalParams,
} from "./searchIndexerContext.js";
export { createSearchIndexer } from "./searchIndexerContext.js";
