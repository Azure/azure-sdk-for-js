// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  listSkus,
  getStatus,
  modifyDeltaModelsAsync,
  listDeltaModelsAsync,
  getDeltaModelsStatusAsync,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  InferenceGroupsListSkusOptionalParams,
  InferenceGroupsGetStatusOptionalParams,
  InferenceGroupsModifyDeltaModelsAsyncOptionalParams,
  InferenceGroupsListDeltaModelsAsyncOptionalParams,
  InferenceGroupsGetDeltaModelsStatusAsyncOptionalParams,
  InferenceGroupsListOptionalParams,
  InferenceGroupsDeleteOptionalParams,
  InferenceGroupsUpdateOptionalParams,
  InferenceGroupsCreateOrUpdateOptionalParams,
  InferenceGroupsGetOptionalParams,
} from "./options.js";
