// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/apiGateway/operations.js";
import {
  ApiGatewayListOptionalParams,
  ApiGatewayListByResourceGroupOptionalParams,
  ApiGatewayDeleteOptionalParams,
  ApiGatewayUpdateOptionalParams,
  ApiGatewayCreateOrUpdateOptionalParams,
  ApiGatewayGetOptionalParams,
} from "../../api/apiGateway/options.js";
import {
  ApiManagementGatewayResource,
  ApiManagementGatewayUpdateParameters,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ApiGateway operations. */
export interface ApiGatewayOperations {
  /** List all API Management gateways within a subscription. */
  list: (
    options?: ApiGatewayListOptionalParams,
  ) => PagedAsyncIterableIterator<ApiManagementGatewayResource>;
  /** List all API Management gateways within a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ApiGatewayListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ApiManagementGatewayResource>;
  /** Deletes an existing API Management gateway. */
  delete: (
    resourceGroupName: string,
    gatewayName: string,
    options?: ApiGatewayDeleteOptionalParams,
  ) => PollerLike<OperationState<ApiManagementGatewayResource>, ApiManagementGatewayResource>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    gatewayName: string,
    options?: ApiGatewayDeleteOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ApiManagementGatewayResource>, ApiManagementGatewayResource>
  >;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    gatewayName: string,
    options?: ApiGatewayDeleteOptionalParams,
  ) => Promise<ApiManagementGatewayResource>;
  /** Updates an existing API Management gateway. */
  update: (
    resourceGroupName: string,
    gatewayName: string,
    parameters: ApiManagementGatewayUpdateParameters,
    options?: ApiGatewayUpdateOptionalParams,
  ) => PollerLike<OperationState<ApiManagementGatewayResource>, ApiManagementGatewayResource>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    gatewayName: string,
    parameters: ApiManagementGatewayUpdateParameters,
    options?: ApiGatewayUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ApiManagementGatewayResource>, ApiManagementGatewayResource>
  >;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    gatewayName: string,
    parameters: ApiManagementGatewayUpdateParameters,
    options?: ApiGatewayUpdateOptionalParams,
  ) => Promise<ApiManagementGatewayResource>;
  /** Creates or updates an API Management gateway. This is long running operation and could take several minutes to complete. */
  createOrUpdate: (
    resourceGroupName: string,
    gatewayName: string,
    parameters: ApiManagementGatewayResource,
    options?: ApiGatewayCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ApiManagementGatewayResource>, ApiManagementGatewayResource>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    gatewayName: string,
    parameters: ApiManagementGatewayResource,
    options?: ApiGatewayCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ApiManagementGatewayResource>, ApiManagementGatewayResource>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    gatewayName: string,
    parameters: ApiManagementGatewayResource,
    options?: ApiGatewayCreateOrUpdateOptionalParams,
  ) => Promise<ApiManagementGatewayResource>;
  /** Gets an API Management gateway resource description. */
  get: (
    resourceGroupName: string,
    gatewayName: string,
    options?: ApiGatewayGetOptionalParams,
  ) => Promise<ApiManagementGatewayResource>;
}

function _getApiGateway(context: ApiManagementContext) {
  return {
    list: (options?: ApiGatewayListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ApiGatewayListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      gatewayName: string,
      options?: ApiGatewayDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, gatewayName, options),
    beginDelete: async (
      resourceGroupName: string,
      gatewayName: string,
      options?: ApiGatewayDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, gatewayName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      gatewayName: string,
      options?: ApiGatewayDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, gatewayName, options);
    },
    update: (
      resourceGroupName: string,
      gatewayName: string,
      parameters: ApiManagementGatewayUpdateParameters,
      options?: ApiGatewayUpdateOptionalParams,
    ) => update(context, resourceGroupName, gatewayName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      gatewayName: string,
      parameters: ApiManagementGatewayUpdateParameters,
      options?: ApiGatewayUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, gatewayName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      gatewayName: string,
      parameters: ApiManagementGatewayUpdateParameters,
      options?: ApiGatewayUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, gatewayName, parameters, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      gatewayName: string,
      parameters: ApiManagementGatewayResource,
      options?: ApiGatewayCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, gatewayName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      gatewayName: string,
      parameters: ApiManagementGatewayResource,
      options?: ApiGatewayCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, gatewayName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      gatewayName: string,
      parameters: ApiManagementGatewayResource,
      options?: ApiGatewayCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, gatewayName, parameters, options);
    },
    get: (resourceGroupName: string, gatewayName: string, options?: ApiGatewayGetOptionalParams) =>
      get(context, resourceGroupName, gatewayName, options),
  };
}

export function _getApiGatewayOperations(context: ApiManagementContext): ApiGatewayOperations {
  return {
    ..._getApiGateway(context),
  };
}
