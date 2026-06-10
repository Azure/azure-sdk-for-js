// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext } from "../../api/cdnManagementContext.js";
import {
  validateCustomDomain,
  listResourceUsage,
  purgeContent,
  listByProfile,
  $delete,
  update,
  create,
  get,
} from "../../api/afdEndpoints/operations.js";
import type {
  AFDEndpointsValidateCustomDomainOptionalParams,
  AFDEndpointsListResourceUsageOptionalParams,
  AFDEndpointsPurgeContentOptionalParams,
  AFDEndpointsListByProfileOptionalParams,
  AFDEndpointsDeleteOptionalParams,
  AFDEndpointsUpdateOptionalParams,
  AFDEndpointsCreateOptionalParams,
  AFDEndpointsGetOptionalParams,
} from "../../api/afdEndpoints/options.js";
import type {
  AFDEndpoint,
  AFDEndpointUpdateParameters,
  AfdPurgeParameters,
  Usage,
  ValidateCustomDomainInput,
  ValidateCustomDomainOutput,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AFDEndpoints operations. */
export interface AFDEndpointsOperations {
  /** Validates the custom domain mapping to ensure it maps to the correct Azure Front Door endpoint in DNS. */
  validateCustomDomain: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    customDomainProperties: ValidateCustomDomainInput,
    options?: AFDEndpointsValidateCustomDomainOptionalParams,
  ) => Promise<ValidateCustomDomainOutput>;
  /** Checks the quota and actual usage of endpoints under the given Azure Front Door profile. */
  listResourceUsage: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    options?: AFDEndpointsListResourceUsageOptionalParams,
  ) => PagedAsyncIterableIterator<Usage>;
  /** Removes a content from AzureFrontDoor. */
  purgeContent: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    contents: AfdPurgeParameters,
    options?: AFDEndpointsPurgeContentOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Lists existing AzureFrontDoor endpoints. */
  listByProfile: (
    resourceGroupName: string,
    profileName: string,
    options?: AFDEndpointsListByProfileOptionalParams,
  ) => PagedAsyncIterableIterator<AFDEndpoint>;
  /** Deletes an existing AzureFrontDoor endpoint with the specified endpoint name under the specified subscription, resource group and profile. */
  delete: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    options?: AFDEndpointsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates an existing AzureFrontDoor endpoint with the specified endpoint name under the specified subscription, resource group and profile. Only tags can be updated after creating an endpoint. To update origins, use the Update Origin operation. To update origin groups, use the Update Origin group operation. To update domains, use the Update Custom Domain operation. */
  update: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    endpointUpdateProperties: AFDEndpointUpdateParameters,
    options?: AFDEndpointsUpdateOptionalParams,
  ) => PollerLike<OperationState<AFDEndpoint>, AFDEndpoint>;
  /** Creates a new AzureFrontDoor endpoint with the specified endpoint name under the specified subscription, resource group and profile. */
  create: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    endpointParam: AFDEndpoint,
    options?: AFDEndpointsCreateOptionalParams,
  ) => PollerLike<OperationState<AFDEndpoint>, AFDEndpoint>;
  /** Gets an existing AzureFrontDoor endpoint with the specified endpoint name under the specified subscription, resource group and profile. */
  get: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    options?: AFDEndpointsGetOptionalParams,
  ) => Promise<AFDEndpoint>;
}

function _getAFDEndpoints(context: CdnManagementContext) {
  return {
    validateCustomDomain: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      customDomainProperties: ValidateCustomDomainInput,
      options?: AFDEndpointsValidateCustomDomainOptionalParams,
    ) =>
      validateCustomDomain(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        customDomainProperties,
        options,
      ),
    listResourceUsage: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      options?: AFDEndpointsListResourceUsageOptionalParams,
    ) => listResourceUsage(context, resourceGroupName, profileName, endpointName, options),
    purgeContent: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      contents: AfdPurgeParameters,
      options?: AFDEndpointsPurgeContentOptionalParams,
    ) => purgeContent(context, resourceGroupName, profileName, endpointName, contents, options),
    listByProfile: (
      resourceGroupName: string,
      profileName: string,
      options?: AFDEndpointsListByProfileOptionalParams,
    ) => listByProfile(context, resourceGroupName, profileName, options),
    delete: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      options?: AFDEndpointsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, profileName, endpointName, options),
    update: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      endpointUpdateProperties: AFDEndpointUpdateParameters,
      options?: AFDEndpointsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        endpointUpdateProperties,
        options,
      ),
    create: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      endpointParam: AFDEndpoint,
      options?: AFDEndpointsCreateOptionalParams,
    ) => create(context, resourceGroupName, profileName, endpointName, endpointParam, options),
    get: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      options?: AFDEndpointsGetOptionalParams,
    ) => get(context, resourceGroupName, profileName, endpointName, options),
  };
}

export function _getAFDEndpointsOperations(context: CdnManagementContext): AFDEndpointsOperations {
  return {
    ..._getAFDEndpoints(context),
  };
}
