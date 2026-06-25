// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PowerPlatformContext } from "../../api/powerPlatformContext.js";
import {
  listByEnterprisePolicy,
  $delete,
  createOrUpdate,
  get,
} from "../../api/privateEndpointConnections/operations.js";
import {
  PrivateEndpointConnectionsListByEnterprisePolicyOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "../../api/privateEndpointConnections/options.js";
import { PrivateEndpointConnection } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PrivateEndpointConnections operations. */
export interface PrivateEndpointConnectionsOperations {
  /** List all private endpoint connections on an EnterprisePolicy. */
  listByEnterprisePolicy: (
    resourceGroupName: string,
    enterprisePolicyName: string,
    options?: PrivateEndpointConnectionsListByEnterprisePolicyOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnection>;
  /** Deletes a private endpoint connection with a given name. */
  delete: (
    resourceGroupName: string,
    enterprisePolicyName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Approve or reject a private endpoint connection with a given name. */
  createOrUpdate: (
    resourceGroupName: string,
    enterprisePolicyName: string,
    privateEndpointConnectionName: string,
    parameters: PrivateEndpointConnection,
    options?: PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
  /** Gets a private endpoint connection. */
  get: (
    resourceGroupName: string,
    enterprisePolicyName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsGetOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
}

function _getPrivateEndpointConnections(context: PowerPlatformContext) {
  return {
    listByEnterprisePolicy: (
      resourceGroupName: string,
      enterprisePolicyName: string,
      options?: PrivateEndpointConnectionsListByEnterprisePolicyOptionalParams,
    ) => listByEnterprisePolicy(context, resourceGroupName, enterprisePolicyName, options),
    delete: (
      resourceGroupName: string,
      enterprisePolicyName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        enterprisePolicyName,
        privateEndpointConnectionName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      enterprisePolicyName: string,
      privateEndpointConnectionName: string,
      parameters: PrivateEndpointConnection,
      options?: PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        enterprisePolicyName,
        privateEndpointConnectionName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      enterprisePolicyName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsGetOptionalParams,
    ) =>
      get(context, resourceGroupName, enterprisePolicyName, privateEndpointConnectionName, options),
  };
}

export function _getPrivateEndpointConnectionsOperations(
  context: PowerPlatformContext,
): PrivateEndpointConnectionsOperations {
  return {
    ..._getPrivateEndpointConnections(context),
  };
}
