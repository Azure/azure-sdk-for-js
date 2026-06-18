// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import { list } from "../../api/locationBasedModelCapacities/operations.js";
import { LocationBasedModelCapacitiesListOptionalParams } from "../../api/locationBasedModelCapacities/options.js";
import { ModelCapacityListResultValueItem } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a LocationBasedModelCapacities operations. */
export interface LocationBasedModelCapacitiesOperations {
  /** List Location Based ModelCapacities. */
  list: (
    location: string,
    modelFormat: string,
    modelName: string,
    modelVersion: string,
    options?: LocationBasedModelCapacitiesListOptionalParams,
  ) => PagedAsyncIterableIterator<ModelCapacityListResultValueItem>;
}

function _getLocationBasedModelCapacities(context: CognitiveServicesManagementContext) {
  return {
    list: (
      location: string,
      modelFormat: string,
      modelName: string,
      modelVersion: string,
      options?: LocationBasedModelCapacitiesListOptionalParams,
    ) => list(context, location, modelFormat, modelName, modelVersion, options),
  };
}

export function _getLocationBasedModelCapacitiesOperations(
  context: CognitiveServicesManagementContext,
): LocationBasedModelCapacitiesOperations {
  return {
    ..._getLocationBasedModelCapacities(context),
  };
}
