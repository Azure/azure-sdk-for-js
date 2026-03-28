// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/scopeConnections/operations.js";
import type {
  ScopeConnectionsListOptionalParams,
  ScopeConnectionsDeleteOptionalParams,
  ScopeConnectionsCreateOrUpdateOptionalParams,
  ScopeConnectionsGetOptionalParams,
} from "../../api/scopeConnections/options.js";
import type { ScopeConnection } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ScopeConnections operations. */
export interface ScopeConnectionsOperations {
  /** List all scope connections created by this network manager. */
  list: (
    resourceGroupName: string,
    networkManagerName: string,
    options?: ScopeConnectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<ScopeConnection>;
  /** Delete the pending scope connection created by this network manager. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkManagerName: string,
    scopeConnectionName: string,
    options?: ScopeConnectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates scope connection from Network Manager */
  createOrUpdate: (
    resourceGroupName: string,
    networkManagerName: string,
    scopeConnectionName: string,
    parameters: ScopeConnection,
    options?: ScopeConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<ScopeConnection>;
  /** Get specified scope connection created by this Network Manager. */
  get: (
    resourceGroupName: string,
    networkManagerName: string,
    scopeConnectionName: string,
    options?: ScopeConnectionsGetOptionalParams,
  ) => Promise<ScopeConnection>;
}

function _getScopeConnections(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      networkManagerName: string,
      options?: ScopeConnectionsListOptionalParams,
    ) => list(context, resourceGroupName, networkManagerName, options),
    delete: (
      resourceGroupName: string,
      networkManagerName: string,
      scopeConnectionName: string,
      options?: ScopeConnectionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkManagerName, scopeConnectionName, options),
    createOrUpdate: (
      resourceGroupName: string,
      networkManagerName: string,
      scopeConnectionName: string,
      parameters: ScopeConnection,
      options?: ScopeConnectionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        networkManagerName,
        scopeConnectionName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      networkManagerName: string,
      scopeConnectionName: string,
      options?: ScopeConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, networkManagerName, scopeConnectionName, options),
  };
}

export function _getScopeConnectionsOperations(
  context: NetworkManagementContext,
): ScopeConnectionsOperations {
  return {
    ..._getScopeConnections(context),
  };
}
