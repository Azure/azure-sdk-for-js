// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AttestationManagementContext } from "../../api/attestationManagementContext.js";
import { listByProvider } from "../../api/privateLinkResources/operations.js";
import type { PrivateLinkResourcesListByProviderOptionalParams } from "../../api/privateLinkResources/options.js";
import type { PrivateLinkResourceListResult } from "../../models/models.js";

/** Interface representing a PrivateLinkResources operations. */
export interface PrivateLinkResourcesOperations {
  /** Gets the private link resources supported for the attestation provider. */
  listByProvider: (
    resourceGroupName: string,
    providerName: string,
    options?: PrivateLinkResourcesListByProviderOptionalParams,
  ) => Promise<PrivateLinkResourceListResult>;
}

function _getPrivateLinkResources(context: AttestationManagementContext) {
  return {
    listByProvider: (
      resourceGroupName: string,
      providerName: string,
      options?: PrivateLinkResourcesListByProviderOptionalParams,
    ) => listByProvider(context, resourceGroupName, providerName, options),
  };
}

export function _getPrivateLinkResourcesOperations(
  context: AttestationManagementContext,
): PrivateLinkResourcesOperations {
  return {
    ..._getPrivateLinkResources(context),
  };
}
