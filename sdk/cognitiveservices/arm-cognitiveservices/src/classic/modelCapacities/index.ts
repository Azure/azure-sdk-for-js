// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import { list } from "../../api/modelCapacities/operations.js";
import type { ModelCapacitiesListOptionalParams } from "../../api/modelCapacities/options.js";
import type { ModelCapacityListResultValueItem } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ModelCapacities operations. */
export interface ModelCapacitiesOperations {
  /** List ModelCapacities. */
  list: (
    modelFormat: string,
    modelName: string,
    modelVersion: string,
    options?: ModelCapacitiesListOptionalParams,
  ) => PagedAsyncIterableIterator<ModelCapacityListResultValueItem>;
}

function _getModelCapacities(context: CognitiveServicesManagementContext) {
  return {
    list: (
      modelFormat: string,
      modelName: string,
      modelVersion: string,
      options?: ModelCapacitiesListOptionalParams,
    ) => list(context, modelFormat, modelName, modelVersion, options),
  };
}

export function _getModelCapacitiesOperations(
  context: CognitiveServicesManagementContext,
): ModelCapacitiesOperations {
  return {
    ..._getModelCapacities(context),
  };
}
