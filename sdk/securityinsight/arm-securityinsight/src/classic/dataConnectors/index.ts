// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import {
  disconnect,
  connect,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/dataConnectors/operations.js";
import type {
  DataConnectorsDisconnectOptionalParams,
  DataConnectorsConnectOptionalParams,
  DataConnectorsListOptionalParams,
  DataConnectorsDeleteOptionalParams,
  DataConnectorsCreateOrUpdateOptionalParams,
  DataConnectorsGetOptionalParams,
} from "../../api/dataConnectors/options.js";
import type { DataConnectorUnion, DataConnectorConnectBody } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DataConnectors operations. */
export interface DataConnectorsOperations {
  /** Disconnect a data connector. */
  disconnect: (
    resourceGroupName: string,
    workspaceName: string,
    dataConnectorId: string,
    options?: DataConnectorsDisconnectOptionalParams,
  ) => Promise<void>;
  /** Connects a data connector. */
  connect: (
    resourceGroupName: string,
    workspaceName: string,
    dataConnectorId: string,
    connectBody: DataConnectorConnectBody,
    options?: DataConnectorsConnectOptionalParams,
  ) => Promise<void>;
  /** Gets all data connectors. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: DataConnectorsListOptionalParams,
  ) => PagedAsyncIterableIterator<DataConnectorUnion>;
  /** Delete the data connector. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    dataConnectorId: string,
    options?: DataConnectorsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates the data connector. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    dataConnectorId: string,
    dataConnector: DataConnectorUnion,
    options?: DataConnectorsCreateOrUpdateOptionalParams,
  ) => Promise<DataConnectorUnion>;
  /** Gets a data connector. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    dataConnectorId: string,
    options?: DataConnectorsGetOptionalParams,
  ) => Promise<DataConnectorUnion>;
}

function _getDataConnectors(context: SecurityInsightsContext) {
  return {
    disconnect: (
      resourceGroupName: string,
      workspaceName: string,
      dataConnectorId: string,
      options?: DataConnectorsDisconnectOptionalParams,
    ) => disconnect(context, resourceGroupName, workspaceName, dataConnectorId, options),
    connect: (
      resourceGroupName: string,
      workspaceName: string,
      dataConnectorId: string,
      connectBody: DataConnectorConnectBody,
      options?: DataConnectorsConnectOptionalParams,
    ) => connect(context, resourceGroupName, workspaceName, dataConnectorId, connectBody, options),
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: DataConnectorsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      dataConnectorId: string,
      options?: DataConnectorsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, dataConnectorId, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      dataConnectorId: string,
      dataConnector: DataConnectorUnion,
      options?: DataConnectorsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        dataConnectorId,
        dataConnector,
        options,
      ),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      dataConnectorId: string,
      options?: DataConnectorsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, dataConnectorId, options),
  };
}

export function _getDataConnectorsOperations(
  context: SecurityInsightsContext,
): DataConnectorsOperations {
  return {
    ..._getDataConnectors(context),
  };
}
