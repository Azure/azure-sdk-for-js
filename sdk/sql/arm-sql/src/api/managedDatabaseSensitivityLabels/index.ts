// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  listByDatabase,
  listRecommendedByDatabase,
  update,
  listCurrentByDatabase,
  enableRecommendation,
  disableRecommendation,
  $delete,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  ManagedDatabaseSensitivityLabelsListByDatabaseOptionalParams,
  ManagedDatabaseSensitivityLabelsListRecommendedByDatabaseOptionalParams,
  ManagedDatabaseSensitivityLabelsUpdateOptionalParams,
  ManagedDatabaseSensitivityLabelsListCurrentByDatabaseOptionalParams,
  ManagedDatabaseSensitivityLabelsEnableRecommendationOptionalParams,
  ManagedDatabaseSensitivityLabelsDisableRecommendationOptionalParams,
  ManagedDatabaseSensitivityLabelsDeleteOptionalParams,
  ManagedDatabaseSensitivityLabelsCreateOrUpdateOptionalParams,
  ManagedDatabaseSensitivityLabelsGetOptionalParams,
} from "./options.js";
