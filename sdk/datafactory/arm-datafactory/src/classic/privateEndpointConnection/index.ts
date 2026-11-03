// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementContext } from "../../api/dataFactoryManagementContext.js";
import { $delete, createOrUpdate, get } from "../../api/privateEndpointConnection/operations.js";
import {
  PrivateEndpointConnectionDeleteOptionalParams,
  PrivateEndpointConnectionCreateOrUpdateOptionalParams,
  PrivateEndpointConnectionGetOptionalParams,
} from "../../api/privateEndpointConnection/options.js";
import {
  PrivateEndpointConnectionResource,
  PrivateLinkConnectionApprovalRequestResource,
} from "../../models/models.js";

/** Interface representing a PrivateEndpointConnection operations. */
export interface PrivateEndpointConnectionOperations {
  /** Deletes a private endpoint connection */
  delete: (
    resourceGroupName: string,
    factoryName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionDeleteOptionalParams,
  ) => Promise<void>;
  /** Approves or rejects a private endpoint connection */
  createOrUpdate: (
    resourceGroupName: string,
    factoryName: string,
    privateEndpointConnectionName: string,
    privateEndpointWrapper: PrivateLinkConnectionApprovalRequestResource,
    options?: PrivateEndpointConnectionCreateOrUpdateOptionalParams,
  ) => Promise<PrivateEndpointConnectionResource>;
  /** Gets a private endpoint connection */
  get: (
    resourceGroupName: string,
    factoryName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionGetOptionalParams,
  ) => Promise<PrivateEndpointConnectionResource>;
}

function _getPrivateEndpointConnection(context: DataFactoryManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      factoryName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, factoryName, privateEndpointConnectionName, options),
    createOrUpdate: (
      resourceGroupName: string,
      factoryName: string,
      privateEndpointConnectionName: string,
      privateEndpointWrapper: PrivateLinkConnectionApprovalRequestResource,
      options?: PrivateEndpointConnectionCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        factoryName,
        privateEndpointConnectionName,
        privateEndpointWrapper,
        options,
      ),
    get: (
      resourceGroupName: string,
      factoryName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionGetOptionalParams,
    ) => get(context, resourceGroupName, factoryName, privateEndpointConnectionName, options),
  };
}

export function _getPrivateEndpointConnectionOperations(
  context: DataFactoryManagementContext,
): PrivateEndpointConnectionOperations {
  return {
    ..._getPrivateEndpointConnection(context),
  };
}
