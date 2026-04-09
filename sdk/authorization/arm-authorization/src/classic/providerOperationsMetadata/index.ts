// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import { list, get } from "../../api/providerOperationsMetadata/operations.js";
import type {
  ProviderOperationsMetadataListOptionalParams,
  ProviderOperationsMetadataGetOptionalParams,
} from "../../api/providerOperationsMetadata/options.js";
import type { ProviderOperationsMetadata } from "../../models/microsoft/providerOperations/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ProviderOperationsMetadata operations. */
export interface ProviderOperationsMetadataOperations {
  /** Gets provider operations metadata for all resource providers. */
  list: (
    options?: ProviderOperationsMetadataListOptionalParams,
  ) => PagedAsyncIterableIterator<ProviderOperationsMetadata>;
  /** Gets provider operations metadata for the specified resource provider. */
  get: (
    resourceProviderNamespace: string,
    options?: ProviderOperationsMetadataGetOptionalParams,
  ) => Promise<ProviderOperationsMetadata>;
}

function _getProviderOperationsMetadata(context: AuthorizationManagementContext) {
  return {
    list: (options?: ProviderOperationsMetadataListOptionalParams) => list(context, options),
    get: (
      resourceProviderNamespace: string,
      options?: ProviderOperationsMetadataGetOptionalParams,
    ) => get(context, resourceProviderNamespace, options),
  };
}

export function _getProviderOperationsMetadataOperations(
  context: AuthorizationManagementContext,
): ProviderOperationsMetadataOperations {
  return {
    ..._getProviderOperationsMetadata(context),
  };
}
