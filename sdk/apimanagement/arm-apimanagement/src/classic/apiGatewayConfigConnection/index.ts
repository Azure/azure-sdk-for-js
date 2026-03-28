// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByGateway,
  $delete,
  createOrUpdate,
  get,
} from "../../api/apiGatewayConfigConnection/operations.js";
import type {
  ApiGatewayConfigConnectionListByGatewayOptionalParams,
  ApiGatewayConfigConnectionDeleteOptionalParams,
  ApiGatewayConfigConnectionCreateOrUpdateOptionalParams,
  ApiGatewayConfigConnectionGetOptionalParams,
} from "../../api/apiGatewayConfigConnection/options.js";
import type { ApiManagementGatewayConfigConnectionResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ApiGatewayConfigConnection operations. */
export interface ApiGatewayConfigConnectionOperations {
  /** List all API Management gateway config connections within a gateway. */
  listByGateway: (
    resourceGroupName: string,
    gatewayName: string,
    options?: ApiGatewayConfigConnectionListByGatewayOptionalParams,
  ) => PagedAsyncIterableIterator<ApiManagementGatewayConfigConnectionResource>;
  /** Deletes an existing API Management gateway config connection. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    gatewayName: string,
    configConnectionName: string,
    ifMatch: string,
    options?: ApiGatewayConfigConnectionDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates or updates an API Management gateway config connection. This is long running operation and could take several minutes to complete. */
  createOrUpdate: (
    resourceGroupName: string,
    gatewayName: string,
    configConnectionName: string,
    parameters: ApiManagementGatewayConfigConnectionResource,
    options?: ApiGatewayConfigConnectionCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<ApiManagementGatewayConfigConnectionResource>,
    ApiManagementGatewayConfigConnectionResource
  >;
  /** Gets an API Management gateway config connection resource description. */
  get: (
    resourceGroupName: string,
    gatewayName: string,
    configConnectionName: string,
    options?: ApiGatewayConfigConnectionGetOptionalParams,
  ) => Promise<ApiManagementGatewayConfigConnectionResource>;
}

function _getApiGatewayConfigConnection(context: ApiManagementContext) {
  return {
    listByGateway: (
      resourceGroupName: string,
      gatewayName: string,
      options?: ApiGatewayConfigConnectionListByGatewayOptionalParams,
    ) => listByGateway(context, resourceGroupName, gatewayName, options),
    delete: (
      resourceGroupName: string,
      gatewayName: string,
      configConnectionName: string,
      ifMatch: string,
      options?: ApiGatewayConfigConnectionDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, gatewayName, configConnectionName, ifMatch, options),
    createOrUpdate: (
      resourceGroupName: string,
      gatewayName: string,
      configConnectionName: string,
      parameters: ApiManagementGatewayConfigConnectionResource,
      options?: ApiGatewayConfigConnectionCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        gatewayName,
        configConnectionName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      gatewayName: string,
      configConnectionName: string,
      options?: ApiGatewayConfigConnectionGetOptionalParams,
    ) => get(context, resourceGroupName, gatewayName, configConnectionName, options),
  };
}

export function _getApiGatewayConfigConnectionOperations(
  context: ApiManagementContext,
): ApiGatewayConfigConnectionOperations {
  return {
    ..._getApiGatewayConfigConnection(context),
  };
}
