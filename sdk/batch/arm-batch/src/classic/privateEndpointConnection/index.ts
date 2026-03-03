// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BatchManagementContext } from "../../api/batchManagementContext.js";
import {
  listByBatchAccount,
  $delete,
  update,
  get,
} from "../../api/privateEndpointConnection/operations.js";
import type {
  PrivateEndpointConnectionListByBatchAccountOptionalParams,
  PrivateEndpointConnectionDeleteOptionalParams,
  PrivateEndpointConnectionUpdateOptionalParams,
  PrivateEndpointConnectionGetOptionalParams,
} from "../../api/privateEndpointConnection/options.js";
import type { PrivateEndpointConnection } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrivateEndpointConnection operations. */
export interface PrivateEndpointConnectionOperations {
  /** Lists all of the private endpoint connections in the specified account. */
  listByBatchAccount: (
    resourceGroupName: string,
    accountName: string,
    options?: PrivateEndpointConnectionListByBatchAccountOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnection>;
  /** Deletes the specified private endpoint connection. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates the properties of an existing private endpoint connection. */
  update: (
    resourceGroupName: string,
    accountName: string,
    privateEndpointConnectionName: string,
    parameters: PrivateEndpointConnection,
    options?: PrivateEndpointConnectionUpdateOptionalParams,
  ) => PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>;
  /** Gets information about the specified private endpoint connection. */
  get: (
    resourceGroupName: string,
    accountName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionGetOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
}

function _getPrivateEndpointConnection(context: BatchManagementContext) {
  return {
    listByBatchAccount: (
      resourceGroupName: string,
      accountName: string,
      options?: PrivateEndpointConnectionListByBatchAccountOptionalParams,
    ) => listByBatchAccount(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, privateEndpointConnectionName, options),
    update: (
      resourceGroupName: string,
      accountName: string,
      privateEndpointConnectionName: string,
      parameters: PrivateEndpointConnection,
      options?: PrivateEndpointConnectionUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        accountName,
        privateEndpointConnectionName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      accountName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, privateEndpointConnectionName, options),
  };
}

export function _getPrivateEndpointConnectionOperations(
  context: BatchManagementContext,
): PrivateEndpointConnectionOperations {
  return {
    ..._getPrivateEndpointConnection(context),
  };
}
