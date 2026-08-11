// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ResourceManagementContext } from "../../api/resourceManagementContext.js";
import { list } from "../../api/providerResourceTypes/operations.js";
import { ProviderResourceTypesListOptionalParams } from "../../api/providerResourceTypes/options.js";
import { ProviderResourceTypeListResult } from "../../models/models.js";

/** Interface representing a ProviderResourceTypes operations. */
export interface ProviderResourceTypesOperations {
  /** List the resource types for a specified resource provider. */
  list: (
    resourceProviderNamespace: string,
    options?: ProviderResourceTypesListOptionalParams,
  ) => Promise<ProviderResourceTypeListResult>;
}

function _getProviderResourceTypes(context: ResourceManagementContext) {
  return {
    list: (resourceProviderNamespace: string, options?: ProviderResourceTypesListOptionalParams) =>
      list(context, resourceProviderNamespace, options),
  };
}

export function _getProviderResourceTypesOperations(
  context: ResourceManagementContext,
): ProviderResourceTypesOperations {
  return {
    ..._getProviderResourceTypes(context),
  };
}
