// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  enableRecommendation,
  disableRecommendation,
  $delete,
  createOrUpdate,
  get,
  listByDatabase,
  listRecommendedByDatabase,
  update,
  listCurrentByDatabase,
} from "./operations.js";
export type {
  SensitivityLabelsEnableRecommendationOptionalParams,
  SensitivityLabelsDisableRecommendationOptionalParams,
  SensitivityLabelsDeleteOptionalParams,
  SensitivityLabelsCreateOrUpdateOptionalParams,
  SensitivityLabelsGetOptionalParams,
  SensitivityLabelsListByDatabaseOptionalParams,
  SensitivityLabelsListRecommendedByDatabaseOptionalParams,
  SensitivityLabelsUpdateOptionalParams,
  SensitivityLabelsListCurrentByDatabaseOptionalParams,
} from "./options.js";
