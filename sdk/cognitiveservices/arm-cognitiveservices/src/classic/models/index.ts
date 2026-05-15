// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import { list } from "../../api/models/operations.js";
import type { ModelsListOptionalParams } from "../../api/models/options.js";
import type { Model } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Models operations. */
export interface ModelsOperations {
  /** List Models. */
  list: (location: string, options?: ModelsListOptionalParams) => PagedAsyncIterableIterator<Model>;
}

function _getModels(context: CognitiveServicesManagementContext) {
  return {
    list: (location: string, options?: ModelsListOptionalParams) =>
      list(context, location, options),
  };
}

export function _getModelsOperations(
  context: CognitiveServicesManagementContext,
): ModelsOperations {
  return {
    ..._getModels(context),
  };
}
