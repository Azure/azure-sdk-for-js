// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/aiGatewayResources/operations.js";
import type {
  AiGatewayResourcesListBySubscriptionOptionalParams,
  AiGatewayResourcesListByResourceGroupOptionalParams,
  AiGatewayResourcesDeleteOptionalParams,
  AiGatewayResourcesUpdateOptionalParams,
  AiGatewayResourcesCreateOrUpdateOptionalParams,
  AiGatewayResourcesGetOptionalParams,
} from "../../api/aiGatewayResources/options.js";
import type { AiGatewayResource, AiGatewayUpdateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AiGatewayResources operations. */
export interface AiGatewayResourcesOperations {
  /** List AiGatewayResource resources by subscription ID */
  listBySubscription: (
    options?: AiGatewayResourcesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<AiGatewayResource>;
  /** List AiGatewayResource resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AiGatewayResourcesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<AiGatewayResource>;
  /** Delete a AiGatewayResource */
  delete: (
    resourceGroupName: string,
    aiGatewayName: string,
    ifMatch: string,
    options?: AiGatewayResourcesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a AiGatewayResource */
  update: (
    resourceGroupName: string,
    aiGatewayName: string,
    ifMatch: string,
    properties: AiGatewayUpdateParameters,
    options?: AiGatewayResourcesUpdateOptionalParams,
  ) => PollerLike<OperationState<AiGatewayResource>, AiGatewayResource>;
  /** Create a AiGatewayResource */
  createOrUpdate: (
    resourceGroupName: string,
    aiGatewayName: string,
    resource: AiGatewayResource,
    options?: AiGatewayResourcesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AiGatewayResource>, AiGatewayResource>;
  /** Get a AiGatewayResource */
  get: (
    resourceGroupName: string,
    aiGatewayName: string,
    options?: AiGatewayResourcesGetOptionalParams,
  ) => Promise<AiGatewayResource>;
}

function _getAiGatewayResources(context: ApiManagementContext) {
  return {
    listBySubscription: (options?: AiGatewayResourcesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AiGatewayResourcesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      aiGatewayName: string,
      ifMatch: string,
      options?: AiGatewayResourcesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, aiGatewayName, ifMatch, options),
    update: (
      resourceGroupName: string,
      aiGatewayName: string,
      ifMatch: string,
      properties: AiGatewayUpdateParameters,
      options?: AiGatewayResourcesUpdateOptionalParams,
    ) => update(context, resourceGroupName, aiGatewayName, ifMatch, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      aiGatewayName: string,
      resource: AiGatewayResource,
      options?: AiGatewayResourcesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, aiGatewayName, resource, options),
    get: (
      resourceGroupName: string,
      aiGatewayName: string,
      options?: AiGatewayResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, aiGatewayName, options),
  };
}

export function _getAiGatewayResourcesOperations(
  context: ApiManagementContext,
): AiGatewayResourcesOperations {
  return {
    ..._getAiGatewayResources(context),
  };
}
