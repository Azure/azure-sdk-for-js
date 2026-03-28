// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/apiGateway/operations.js";
import type {
  ApiGatewayListOptionalParams,
  ApiGatewayListByResourceGroupOptionalParams,
  ApiGatewayDeleteOptionalParams,
  ApiGatewayUpdateOptionalParams,
  ApiGatewayCreateOrUpdateOptionalParams,
  ApiGatewayGetOptionalParams,
} from "../../api/apiGateway/options.js";
import type {
  ApiManagementGatewayResource,
  ApiManagementGatewayUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

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
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    gatewayName: string,
    options?: ApiGatewayDeleteOptionalParams,
  ) => PollerLike<OperationState<ApiManagementGatewayResource>, ApiManagementGatewayResource>;
  /** Updates an existing API Management gateway. */
  update: (
    resourceGroupName: string,
    gatewayName: string,
    parameters: ApiManagementGatewayUpdateParameters,
    options?: ApiGatewayUpdateOptionalParams,
  ) => PollerLike<OperationState<ApiManagementGatewayResource>, ApiManagementGatewayResource>;
  /** Creates or updates an API Management gateway. This is long running operation and could take several minutes to complete. */
  createOrUpdate: (
    resourceGroupName: string,
    gatewayName: string,
    parameters: ApiManagementGatewayResource,
    options?: ApiGatewayCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ApiManagementGatewayResource>, ApiManagementGatewayResource>;
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
    update: (
      resourceGroupName: string,
      gatewayName: string,
      parameters: ApiManagementGatewayUpdateParameters,
      options?: ApiGatewayUpdateOptionalParams,
    ) => update(context, resourceGroupName, gatewayName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      gatewayName: string,
      parameters: ApiManagementGatewayResource,
      options?: ApiGatewayCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, gatewayName, parameters, options),
    get: (resourceGroupName: string, gatewayName: string, options?: ApiGatewayGetOptionalParams) =>
      get(context, resourceGroupName, gatewayName, options),
  };
}

export function _getApiGatewayOperations(context: ApiManagementContext): ApiGatewayOperations {
  return {
    ..._getApiGateway(context),
  };
}
