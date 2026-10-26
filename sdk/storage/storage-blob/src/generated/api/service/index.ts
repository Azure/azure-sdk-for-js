// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  findBlobsByTags,
  submitBatch,
  getAccountInfo,
  getUserDelegationKey,
  listContainers,
  getStatistics,
  getProperties,
  setProperties,
} from "./operations.js";
export type {
  ServiceFindBlobsByTagsOptionalParams,
  ServiceSubmitBatchOptionalParams,
  ServiceGetAccountInfoOptionalParams,
  ServiceGetUserDelegationKeyOptionalParams,
  ServiceListContainersOptionalParams,
  ServiceGetStatisticsOptionalParams,
  ServiceGetPropertiesOptionalParams,
  ServiceSetPropertiesOptionalParams,
} from "./options.js";
