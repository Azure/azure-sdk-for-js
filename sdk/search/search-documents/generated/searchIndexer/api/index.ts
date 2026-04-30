// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  createSkillset,
  getSkillsets,
  getSkillset,
  deleteSkillset,
  createOrUpdateSkillset,
  getIndexerStatus,
  createIndexer,
  getIndexers,
  getIndexer,
  deleteIndexer,
  createOrUpdateIndexer,
  runIndexer,
  resetIndexer,
  createDataSourceConnection,
  getDataSourceConnections,
  getDataSourceConnection,
  deleteDataSourceConnection,
  createOrUpdateDataSourceConnection,
} from "./operations.js";
export type {
  CreateSkillsetOptionalParams,
  GetSkillsetsOptionalParams,
  GetSkillsetOptionalParams,
  DeleteSkillsetOptionalParams,
  CreateOrUpdateSkillsetOptionalParams,
  GetIndexerStatusOptionalParams,
  CreateIndexerOptionalParams,
  GetIndexersOptionalParams,
  GetIndexerOptionalParams,
  DeleteIndexerOptionalParams,
  CreateOrUpdateIndexerOptionalParams,
  RunIndexerOptionalParams,
  ResetIndexerOptionalParams,
  CreateDataSourceConnectionOptionalParams,
  GetDataSourceConnectionsOptionalParams,
  GetDataSourceConnectionOptionalParams,
  DeleteDataSourceConnectionOptionalParams,
  CreateOrUpdateDataSourceConnectionOptionalParams,
} from "./options.js";
export type {
  SearchIndexerContext,
  SearchIndexerClientOptionalParams,
} from "./searchIndexerContext.js";
export { createSearchIndexer } from "./searchIndexerContext.js";
