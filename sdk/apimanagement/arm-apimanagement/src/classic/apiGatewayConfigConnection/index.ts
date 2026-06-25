// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByGateway,
  $delete,
  createOrUpdate,
  get,
} from "../../api/apiGatewayConfigConnection/operations.js";
import {
  ApiGatewayConfigConnectionListByGatewayOptionalParams,
  ApiGatewayConfigConnectionDeleteOptionalParams,
  ApiGatewayConfigConnectionCreateOrUpdateOptionalParams,
  ApiGatewayConfigConnectionGetOptionalParams,
} from "../../api/apiGatewayConfigConnection/options.js";
import { ApiManagementGatewayConfigConnectionResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ApiGatewayConfigConnection operations. */
export interface ApiGatewayConfigConnectionOperations {
  /** List all API Management gateway config connections within a gateway. */
  listByGateway: (
    resourceGroupName: string,
    gatewayName: string,
    options?: ApiGatewayConfigConnectionListByGatewayOptionalParams,
  ) => PagedAsyncIterableIterator<ApiManagementGatewayConfigConnectionResource>;
  /** Deletes an existing API Management gateway config connection. */
  delete: (
    resourceGroupName: string,
    gatewayName: string,
    configConnectionName: string,
    ifMatch: string,
    options?: ApiGatewayConfigConnectionDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    gatewayName: string,
    configConnectionName: string,
    ifMatch: string,
    options?: ApiGatewayConfigConnectionDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    gatewayName: string,
    configConnectionName: string,
    ifMatch: string,
    options?: ApiGatewayConfigConnectionDeleteOptionalParams,
  ) => Promise<void>;
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
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    gatewayName: string,
    configConnectionName: string,
    parameters: ApiManagementGatewayConfigConnectionResource,
    options?: ApiGatewayConfigConnectionCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ApiManagementGatewayConfigConnectionResource>,
      ApiManagementGatewayConfigConnectionResource
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    gatewayName: string,
    configConnectionName: string,
    parameters: ApiManagementGatewayConfigConnectionResource,
    options?: ApiGatewayConfigConnectionCreateOrUpdateOptionalParams,
  ) => Promise<ApiManagementGatewayConfigConnectionResource>;
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
    beginDelete: async (
      resourceGroupName: string,
      gatewayName: string,
      configConnectionName: string,
      ifMatch: string,
      options?: ApiGatewayConfigConnectionDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        gatewayName,
        configConnectionName,
        ifMatch,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      gatewayName: string,
      configConnectionName: string,
      ifMatch: string,
      options?: ApiGatewayConfigConnectionDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        gatewayName,
        configConnectionName,
        ifMatch,
        options,
      );
    },
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
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      gatewayName: string,
      configConnectionName: string,
      parameters: ApiManagementGatewayConfigConnectionResource,
      options?: ApiGatewayConfigConnectionCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        gatewayName,
        configConnectionName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      gatewayName: string,
      configConnectionName: string,
      parameters: ApiManagementGatewayConfigConnectionResource,
      options?: ApiGatewayConfigConnectionCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        gatewayName,
        configConnectionName,
        parameters,
        options,
      );
    },
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
