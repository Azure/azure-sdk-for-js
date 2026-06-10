// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext } from "../../api/cdnManagementContext.js";
import {
  enableCustomHttps,
  disableCustomHttps,
  listByEndpoint,
  $delete,
  create,
  get,
} from "../../api/customDomains/operations.js";
import type {
  CustomDomainsEnableCustomHttpsOptionalParams,
  CustomDomainsDisableCustomHttpsOptionalParams,
  CustomDomainsListByEndpointOptionalParams,
  CustomDomainsDeleteOptionalParams,
  CustomDomainsCreateOptionalParams,
  CustomDomainsGetOptionalParams,
} from "../../api/customDomains/options.js";
import type { CustomDomain, CustomDomainParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CustomDomains operations. */
export interface CustomDomainsOperations {
  /** Enable https delivery of the custom domain. */
  enableCustomHttps: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    customDomainName: string,
    options?: CustomDomainsEnableCustomHttpsOptionalParams,
  ) => PollerLike<OperationState<CustomDomain>, CustomDomain>;
  /** Disable https delivery of the custom domain. */
  disableCustomHttps: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    customDomainName: string,
    options?: CustomDomainsDisableCustomHttpsOptionalParams,
  ) => PollerLike<OperationState<CustomDomain>, CustomDomain>;
  /** Lists all of the existing custom domains within an endpoint. */
  listByEndpoint: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    options?: CustomDomainsListByEndpointOptionalParams,
  ) => PagedAsyncIterableIterator<CustomDomain>;
  /** Deletes an existing custom domain within an endpoint. */
  delete: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    customDomainName: string,
    options?: CustomDomainsDeleteOptionalParams,
  ) => PollerLike<OperationState<CustomDomain>, CustomDomain>;
  /** Creates a new custom domain within an endpoint. */
  create: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    customDomainName: string,
    customDomainProperties: CustomDomainParameters,
    options?: CustomDomainsCreateOptionalParams,
  ) => PollerLike<OperationState<CustomDomain>, CustomDomain>;
  /** Gets an existing custom domain within an endpoint. */
  get: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    customDomainName: string,
    options?: CustomDomainsGetOptionalParams,
  ) => Promise<CustomDomain>;
}

function _getCustomDomains(context: CdnManagementContext) {
  return {
    enableCustomHttps: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      customDomainName: string,
      options?: CustomDomainsEnableCustomHttpsOptionalParams,
    ) =>
      enableCustomHttps(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        customDomainName,
        options,
      ),
    disableCustomHttps: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      customDomainName: string,
      options?: CustomDomainsDisableCustomHttpsOptionalParams,
    ) =>
      disableCustomHttps(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        customDomainName,
        options,
      ),
    listByEndpoint: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      options?: CustomDomainsListByEndpointOptionalParams,
    ) => listByEndpoint(context, resourceGroupName, profileName, endpointName, options),
    delete: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      customDomainName: string,
      options?: CustomDomainsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, profileName, endpointName, customDomainName, options),
    create: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      customDomainName: string,
      customDomainProperties: CustomDomainParameters,
      options?: CustomDomainsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        customDomainName,
        customDomainProperties,
        options,
      ),
    get: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      customDomainName: string,
      options?: CustomDomainsGetOptionalParams,
    ) => get(context, resourceGroupName, profileName, endpointName, customDomainName, options),
  };
}

export function _getCustomDomainsOperations(
  context: CdnManagementContext,
): CustomDomainsOperations {
  return {
    ..._getCustomDomains(context),
  };
}
