// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext } from "../../api/cdnManagementContext.js";
import {
  listResourceUsage,
  validateCustomDomain,
  loadContent,
  purgeContent,
  stop,
  start,
  listByProfile,
  $delete,
  update,
  create,
  get,
} from "../../api/endpoints/operations.js";
import type {
  EndpointsListResourceUsageOptionalParams,
  EndpointsValidateCustomDomainOptionalParams,
  EndpointsLoadContentOptionalParams,
  EndpointsPurgeContentOptionalParams,
  EndpointsStopOptionalParams,
  EndpointsStartOptionalParams,
  EndpointsListByProfileOptionalParams,
  EndpointsDeleteOptionalParams,
  EndpointsUpdateOptionalParams,
  EndpointsCreateOptionalParams,
  EndpointsGetOptionalParams,
} from "../../api/endpoints/options.js";
import type {
  ResourceUsage,
  ValidateCustomDomainInput,
  ValidateCustomDomainOutput,
  Endpoint,
  EndpointUpdateParameters,
  PurgeParameters,
  LoadParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Endpoints operations. */
export interface EndpointsOperations {
  /** Checks the quota and usage of geo filters and custom domains under the given endpoint. */
  listResourceUsage: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    options?: EndpointsListResourceUsageOptionalParams,
  ) => PagedAsyncIterableIterator<ResourceUsage>;
  /** Validates the custom domain mapping to ensure it maps to the correct CDN endpoint in DNS. */
  validateCustomDomain: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    customDomainProperties: ValidateCustomDomainInput,
    options?: EndpointsValidateCustomDomainOptionalParams,
  ) => Promise<ValidateCustomDomainOutput>;
  /** Pre-loads a content to CDN. Available for Verizon Profiles. */
  loadContent: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    contentFilePaths: LoadParameters,
    options?: EndpointsLoadContentOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Removes a content from CDN. */
  purgeContent: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    contentFilePaths: PurgeParameters,
    options?: EndpointsPurgeContentOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Stops an existing running CDN endpoint. */
  stop: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    options?: EndpointsStopOptionalParams,
  ) => PollerLike<OperationState<Endpoint>, Endpoint>;
  /** Starts an existing CDN endpoint that is on a stopped state. */
  start: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    options?: EndpointsStartOptionalParams,
  ) => PollerLike<OperationState<Endpoint>, Endpoint>;
  /** Lists existing CDN endpoints. */
  listByProfile: (
    resourceGroupName: string,
    profileName: string,
    options?: EndpointsListByProfileOptionalParams,
  ) => PagedAsyncIterableIterator<Endpoint>;
  /** Deletes an existing CDN endpoint with the specified endpoint name under the specified subscription, resource group and profile. */
  delete: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    options?: EndpointsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates an existing CDN endpoint with the specified endpoint name under the specified subscription, resource group and profile. Only tags can be updated after creating an endpoint. To update origins, use the Update Origin operation. To update origin groups, use the Update Origin group operation. To update custom domains, use the Update Custom Domain operation. */
  update: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    endpointUpdateProperties: EndpointUpdateParameters,
    options?: EndpointsUpdateOptionalParams,
  ) => PollerLike<OperationState<Endpoint>, Endpoint>;
  /** Creates a new CDN endpoint with the specified endpoint name under the specified subscription, resource group and profile. */
  create: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    endpointParam: Endpoint,
    options?: EndpointsCreateOptionalParams,
  ) => PollerLike<OperationState<Endpoint>, Endpoint>;
  /** Gets an existing CDN endpoint with the specified endpoint name under the specified subscription, resource group and profile. */
  get: (
    resourceGroupName: string,
    profileName: string,
    endpointName: string,
    options?: EndpointsGetOptionalParams,
  ) => Promise<Endpoint>;
}

function _getEndpoints(context: CdnManagementContext) {
  return {
    listResourceUsage: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      options?: EndpointsListResourceUsageOptionalParams,
    ) => listResourceUsage(context, resourceGroupName, profileName, endpointName, options),
    validateCustomDomain: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      customDomainProperties: ValidateCustomDomainInput,
      options?: EndpointsValidateCustomDomainOptionalParams,
    ) =>
      validateCustomDomain(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        customDomainProperties,
        options,
      ),
    loadContent: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      contentFilePaths: LoadParameters,
      options?: EndpointsLoadContentOptionalParams,
    ) =>
      loadContent(context, resourceGroupName, profileName, endpointName, contentFilePaths, options),
    purgeContent: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      contentFilePaths: PurgeParameters,
      options?: EndpointsPurgeContentOptionalParams,
    ) =>
      purgeContent(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        contentFilePaths,
        options,
      ),
    stop: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      options?: EndpointsStopOptionalParams,
    ) => stop(context, resourceGroupName, profileName, endpointName, options),
    start: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      options?: EndpointsStartOptionalParams,
    ) => start(context, resourceGroupName, profileName, endpointName, options),
    listByProfile: (
      resourceGroupName: string,
      profileName: string,
      options?: EndpointsListByProfileOptionalParams,
    ) => listByProfile(context, resourceGroupName, profileName, options),
    delete: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      options?: EndpointsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, profileName, endpointName, options),
    update: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      endpointUpdateProperties: EndpointUpdateParameters,
      options?: EndpointsUpdateOptionalParams,
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
      endpointParam: Endpoint,
      options?: EndpointsCreateOptionalParams,
    ) => create(context, resourceGroupName, profileName, endpointName, endpointParam, options),
    get: (
      resourceGroupName: string,
      profileName: string,
      endpointName: string,
      options?: EndpointsGetOptionalParams,
    ) => get(context, resourceGroupName, profileName, endpointName, options),
  };
}

export function _getEndpointsOperations(context: CdnManagementContext): EndpointsOperations {
  return {
    ..._getEndpoints(context),
  };
}
