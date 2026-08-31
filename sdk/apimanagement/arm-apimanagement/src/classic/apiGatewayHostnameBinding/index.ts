// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  refreshSecret,
  listByGateway,
  $delete,
  createOrUpdate,
  get,
} from "../../api/apiGatewayHostnameBinding/operations.js";
import type {
  ApiGatewayHostnameBindingRefreshSecretOptionalParams,
  ApiGatewayHostnameBindingListByGatewayOptionalParams,
  ApiGatewayHostnameBindingDeleteOptionalParams,
  ApiGatewayHostnameBindingCreateOrUpdateOptionalParams,
  ApiGatewayHostnameBindingGetOptionalParams,
} from "../../api/apiGatewayHostnameBinding/options.js";
import type { GatewayHostnameBindingResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ApiGatewayHostnameBinding operations. */
export interface ApiGatewayHostnameBindingOperations {
  /** Refresh the secret for an API Management gateway hostname binding. */
  refreshSecret: (
    resourceGroupName: string,
    gatewayName: string,
    hostnameBindingName: string,
    options?: ApiGatewayHostnameBindingRefreshSecretOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use refreshSecret instead */
  beginRefreshSecret: (
    resourceGroupName: string,
    gatewayName: string,
    hostnameBindingName: string,
    options?: ApiGatewayHostnameBindingRefreshSecretOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use refreshSecret instead */
  beginRefreshSecretAndWait: (
    resourceGroupName: string,
    gatewayName: string,
    hostnameBindingName: string,
    options?: ApiGatewayHostnameBindingRefreshSecretOptionalParams,
  ) => Promise<void>;
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    gatewayName: string,
    hostnameBindingName: string,
    ifMatch: string,
    options?: ApiGatewayHostnameBindingDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    gatewayName: string,
    hostnameBindingName: string,
    ifMatch: string,
    options?: ApiGatewayHostnameBindingDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an API Management gateway hostname binding. This is long running operation and could take several minutes to complete. */
  createOrUpdate: (
    resourceGroupName: string,
    gatewayName: string,
    hostnameBindingName: string,
    parameters: GatewayHostnameBindingResource,
    options?: ApiGatewayHostnameBindingCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<GatewayHostnameBindingResource>, GatewayHostnameBindingResource>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    gatewayName: string,
    hostnameBindingName: string,
    parameters: GatewayHostnameBindingResource,
    options?: ApiGatewayHostnameBindingCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<GatewayHostnameBindingResource>, GatewayHostnameBindingResource>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    gatewayName: string,
    hostnameBindingName: string,
    parameters: GatewayHostnameBindingResource,
    options?: ApiGatewayHostnameBindingCreateOrUpdateOptionalParams,
  ) => Promise<GatewayHostnameBindingResource>;
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
    beginRefreshSecret: async (
      resourceGroupName: string,
      gatewayName: string,
      hostnameBindingName: string,
      options?: ApiGatewayHostnameBindingRefreshSecretOptionalParams,
    ) => {
      const poller = refreshSecret(
        context,
        resourceGroupName,
        gatewayName,
        hostnameBindingName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRefreshSecretAndWait: async (
      resourceGroupName: string,
      gatewayName: string,
      hostnameBindingName: string,
      options?: ApiGatewayHostnameBindingRefreshSecretOptionalParams,
    ) => {
      return await refreshSecret(
        context,
        resourceGroupName,
        gatewayName,
        hostnameBindingName,
        options,
      );
    },
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
    beginDelete: async (
      resourceGroupName: string,
      gatewayName: string,
      hostnameBindingName: string,
      ifMatch: string,
      options?: ApiGatewayHostnameBindingDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        gatewayName,
        hostnameBindingName,
        ifMatch,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      gatewayName: string,
      hostnameBindingName: string,
      ifMatch: string,
      options?: ApiGatewayHostnameBindingDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        gatewayName,
        hostnameBindingName,
        ifMatch,
        options,
      );
    },
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
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      gatewayName: string,
      hostnameBindingName: string,
      parameters: GatewayHostnameBindingResource,
      options?: ApiGatewayHostnameBindingCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        gatewayName,
        hostnameBindingName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      gatewayName: string,
      hostnameBindingName: string,
      parameters: GatewayHostnameBindingResource,
      options?: ApiGatewayHostnameBindingCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        gatewayName,
        hostnameBindingName,
        parameters,
        options,
      );
    },
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
