// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataFactoryManagementContext } from "../../api/dataFactoryManagementContext.js";
import { $delete, createOrUpdate, get } from "../../api/privateEndpointConnection/operations.js";
import type {
  PrivateEndpointConnectionDeleteOptionalParams,
  PrivateEndpointConnectionCreateOrUpdateOptionalParams,
  PrivateEndpointConnectionGetOptionalParams,
} from "../../api/privateEndpointConnection/options.js";
import type {
  PrivateEndpointConnectionResource,
  PrivateLinkConnectionApprovalRequestResource,
} from "../../models/models.js";

/** Interface representing a PrivateEndpointConnection operations. */
export interface PrivateEndpointConnectionOperations {
  /** Deletes a private endpoint connection */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
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
