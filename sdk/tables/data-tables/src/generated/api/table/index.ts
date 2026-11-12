// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  setAccessPolicy,
  getAccessPolicy,
  insertEntity,
  deleteEntity,
  mergeEntity,
  updateEntity,
  queryEntityWithPartitionAndRowKey,
  queryEntities,
  $delete,
  create,
  query,
} from "./operations.js";
export type {
  TableSetAccessPolicyOptionalParams,
  TableGetAccessPolicyOptionalParams,
  TableInsertEntityOptionalParams,
  TableDeleteEntityOptionalParams,
  TableMergeEntityOptionalParams,
  TableUpdateEntityOptionalParams,
  TableQueryEntityWithPartitionAndRowKeyOptionalParams,
  TableQueryEntitiesOptionalParams,
  TableDeleteOptionalParams,
  TableCreateOptionalParams,
  TableQueryOptionalParams,
} from "./options.js";
