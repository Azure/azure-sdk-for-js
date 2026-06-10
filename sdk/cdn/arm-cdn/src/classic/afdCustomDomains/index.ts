// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext } from "../../api/cdnManagementContext.js";
import {
  refreshValidationToken,
  listByProfile,
  $delete,
  update,
  create,
  get,
} from "../../api/afdCustomDomains/operations.js";
import type {
  AFDCustomDomainsRefreshValidationTokenOptionalParams,
  AFDCustomDomainsListByProfileOptionalParams,
  AFDCustomDomainsDeleteOptionalParams,
  AFDCustomDomainsUpdateOptionalParams,
  AFDCustomDomainsCreateOptionalParams,
  AFDCustomDomainsGetOptionalParams,
} from "../../api/afdCustomDomains/options.js";
import type { AFDDomain, AFDDomainUpdateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AFDCustomDomains operations. */
export interface AFDCustomDomainsOperations {
  /** Updates the domain validation token. */
  refreshValidationToken: (
    resourceGroupName: string,
    profileName: string,
    customDomainName: string,
    options?: AFDCustomDomainsRefreshValidationTokenOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Lists existing AzureFrontDoor domains. */
  listByProfile: (
    resourceGroupName: string,
    profileName: string,
    options?: AFDCustomDomainsListByProfileOptionalParams,
  ) => PagedAsyncIterableIterator<AFDDomain>;
  /** Deletes an existing AzureFrontDoor domain with the specified domain name under the specified subscription, resource group and profile. */
  delete: (
    resourceGroupName: string,
    profileName: string,
    customDomainName: string,
    options?: AFDCustomDomainsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates an existing domain within a profile. */
  update: (
    resourceGroupName: string,
    profileName: string,
    customDomainName: string,
    customDomainUpdateProperties: AFDDomainUpdateParameters,
    options?: AFDCustomDomainsUpdateOptionalParams,
  ) => PollerLike<OperationState<AFDDomain>, AFDDomain>;
  /** Creates a new domain within the specified profile. */
  create: (
    resourceGroupName: string,
    profileName: string,
    customDomainName: string,
    customDomain: AFDDomain,
    options?: AFDCustomDomainsCreateOptionalParams,
  ) => PollerLike<OperationState<AFDDomain>, AFDDomain>;
  /** Gets an existing AzureFrontDoor domain with the specified domain name under the specified subscription, resource group and profile. */
  get: (
    resourceGroupName: string,
    profileName: string,
    customDomainName: string,
    options?: AFDCustomDomainsGetOptionalParams,
  ) => Promise<AFDDomain>;
}

function _getAFDCustomDomains(context: CdnManagementContext) {
  return {
    refreshValidationToken: (
      resourceGroupName: string,
      profileName: string,
      customDomainName: string,
      options?: AFDCustomDomainsRefreshValidationTokenOptionalParams,
    ) => refreshValidationToken(context, resourceGroupName, profileName, customDomainName, options),
    listByProfile: (
      resourceGroupName: string,
      profileName: string,
      options?: AFDCustomDomainsListByProfileOptionalParams,
    ) => listByProfile(context, resourceGroupName, profileName, options),
    delete: (
      resourceGroupName: string,
      profileName: string,
      customDomainName: string,
      options?: AFDCustomDomainsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, profileName, customDomainName, options),
    update: (
      resourceGroupName: string,
      profileName: string,
      customDomainName: string,
      customDomainUpdateProperties: AFDDomainUpdateParameters,
      options?: AFDCustomDomainsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        profileName,
        customDomainName,
        customDomainUpdateProperties,
        options,
      ),
    create: (
      resourceGroupName: string,
      profileName: string,
      customDomainName: string,
      customDomain: AFDDomain,
      options?: AFDCustomDomainsCreateOptionalParams,
    ) => create(context, resourceGroupName, profileName, customDomainName, customDomain, options),
    get: (
      resourceGroupName: string,
      profileName: string,
      customDomainName: string,
      options?: AFDCustomDomainsGetOptionalParams,
    ) => get(context, resourceGroupName, profileName, customDomainName, options),
  };
}

export function _getAFDCustomDomainsOperations(
  context: CdnManagementContext,
): AFDCustomDomainsOperations {
  return {
    ..._getAFDCustomDomains(context),
  };
}
