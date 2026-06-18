// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import { list } from "../../api/raiExternalSafetyProviders/operations.js";
import { RaiExternalSafetyProvidersListOptionalParams } from "../../api/raiExternalSafetyProviders/options.js";
import { RaiExternalSafetyProviderSchema } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RaiExternalSafetyProviders operations. */
export interface RaiExternalSafetyProvidersOperations {
  /** Gets the safety providers associated with the subscription */
  list: (
    options?: RaiExternalSafetyProvidersListOptionalParams,
  ) => PagedAsyncIterableIterator<RaiExternalSafetyProviderSchema>;
}

function _getRaiExternalSafetyProviders(context: CognitiveServicesManagementContext) {
  return {
    list: (options?: RaiExternalSafetyProvidersListOptionalParams) => list(context, options),
  };
}

export function _getRaiExternalSafetyProvidersOperations(
  context: CognitiveServicesManagementContext,
): RaiExternalSafetyProvidersOperations {
  return {
    ..._getRaiExternalSafetyProviders(context),
  };
}
