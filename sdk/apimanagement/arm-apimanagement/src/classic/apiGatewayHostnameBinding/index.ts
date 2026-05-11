// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  refreshSecret,
  listByGateway,
  $delete,
  createOrUpdate,
  get,
} from "../../api/apiGatewayHostnameBinding/operations.js";
import {
  ApiGatewayHostnameBindingRefreshSecretOptionalParams,
  ApiGatewayHostnameBindingListByGatewayOptionalParams,
  ApiGatewayHostnameBindingDeleteOptionalParams,
  ApiGatewayHostnameBindingCreateOrUpdateOptionalParams,
  ApiGatewayHostnameBindingGetOptionalParams,
} from "../../api/apiGatewayHostnameBinding/options.js";
import { GatewayHostnameBindingResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ApiGatewayHostnameBinding operations. */
export interface ApiGatewayHostnameBindingOperations {
  /** Refresh the secret for an API Management gateway hostname binding. */
  refreshSecret: (
    resourceGroupName: string,
    gatewayName: string,
    hostnameBindingName: string,
    options?: ApiGatewayHostnameBindingRefreshSecretOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List all API Management gateway hostname bindings within a gateway. */
  listByGateway: (
    resourceGroupName: string,
    gatewayName: string,
    options?: ApiGatewayHostnameBindingListByGatewayOptionalParams,
  ) => PagedAsyncIterableIterator<GatewayHostnameBindingResource>;
  /** Deletes an existing API Management gateway hostname binding. */
  delete: (
    resourceGroupName: string,
    gatewayName: string,
    hostnameBindingName: string,
    ifMatch: string,
    options?: ApiGatewayHostnameBindingDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates or updates an API Management gateway hostname binding. This is long running operation and could take several minutes to complete. */
  createOrUpdate: (
    resourceGroupName: string,
    gatewayName: string,
    hostnameBindingName: string,
    parameters: GatewayHostnameBindingResource,
    options?: ApiGatewayHostnameBindingCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<GatewayHostnameBindingResource>, GatewayHostnameBindingResource>;
  /** Gets an API Management gateway hostname binding resource description. */
  get: (
    resourceGroupName: string,
    gatewayName: string,
    hostnameBindingName: string,
    options?: ApiGatewayHostnameBindingGetOptionalParams,
  ) => Promise<GatewayHostnameBindingResource>;
}

function _getApiGatewayHostnameBinding(context: ApiManagementContext) {
  return {
    refreshSecret: (
      resourceGroupName: string,
      gatewayName: string,
      hostnameBindingName: string,
      options?: ApiGatewayHostnameBindingRefreshSecretOptionalParams,
    ) => refreshSecret(context, resourceGroupName, gatewayName, hostnameBindingName, options),
    listByGateway: (
      resourceGroupName: string,
      gatewayName: string,
      options?: ApiGatewayHostnameBindingListByGatewayOptionalParams,
    ) => listByGateway(context, resourceGroupName, gatewayName, options),
    delete: (
      resourceGroupName: string,
      gatewayName: string,
      hostnameBindingName: string,
      ifMatch: string,
      options?: ApiGatewayHostnameBindingDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, gatewayName, hostnameBindingName, ifMatch, options),
    createOrUpdate: (
      resourceGroupName: string,
      gatewayName: string,
      hostnameBindingName: string,
      parameters: GatewayHostnameBindingResource,
      options?: ApiGatewayHostnameBindingCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        gatewayName,
        hostnameBindingName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      gatewayName: string,
      hostnameBindingName: string,
      options?: ApiGatewayHostnameBindingGetOptionalParams,
    ) => get(context, resourceGroupName, gatewayName, hostnameBindingName, options),
  };
}

export function _getApiGatewayHostnameBindingOperations(
  context: ApiManagementContext,
): ApiGatewayHostnameBindingOperations {
  return {
    ..._getApiGatewayHostnameBinding(context),
  };
}
