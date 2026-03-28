// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AttestationManagementContext } from "../../api/attestationManagementContext.js";
import { list, $delete, create, get } from "../../api/privateEndpointConnections/operations.js";
import type {
  PrivateEndpointConnectionsListOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsCreateOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "../../api/privateEndpointConnections/options.js";
import type { PrivateEndpointConnection } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PrivateEndpointConnections operations. */
export interface PrivateEndpointConnectionsOperations {
  /** List all the private endpoint connections associated with the attestation provider. */
  list: (
    resourceGroupName: string,
    providerName: string,
    options?: PrivateEndpointConnectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnection>;
  /** Deletes the specified private endpoint connection associated with the attestation provider. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    providerName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update the state of specified private endpoint connection associated with the attestation provider. */
  create: (
    resourceGroupName: string,
    providerName: string,
    privateEndpointConnectionName: string,
    properties: PrivateEndpointConnection,
    options?: PrivateEndpointConnectionsCreateOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
  /** Gets the specified private endpoint connection associated with the attestation provider. */
  get: (
    resourceGroupName: string,
    providerName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsGetOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
}

function _getPrivateEndpointConnections(context: AttestationManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      providerName: string,
      options?: PrivateEndpointConnectionsListOptionalParams,
    ) => list(context, resourceGroupName, providerName, options),
    delete: (
      resourceGroupName: string,
      providerName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, providerName, privateEndpointConnectionName, options),
    create: (
      resourceGroupName: string,
      providerName: string,
      privateEndpointConnectionName: string,
      properties: PrivateEndpointConnection,
      options?: PrivateEndpointConnectionsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        providerName,
        privateEndpointConnectionName,
        properties,
        options,
      ),
    get: (
      resourceGroupName: string,
      providerName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, providerName, privateEndpointConnectionName, options),
  };
}

export function _getPrivateEndpointConnectionsOperations(
  context: AttestationManagementContext,
): PrivateEndpointConnectionsOperations {
  return {
    ..._getPrivateEndpointConnections(context),
  };
}
