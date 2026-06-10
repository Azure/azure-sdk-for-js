// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import {
  $delete,
  create,
  get,
  deleteBulk,
  addBulk,
} from "../../api/connectionRaiBlocklistItem/operations.js";
import type {
  ConnectionRaiBlocklistItemDeleteOptionalParams,
  ConnectionRaiBlocklistItemCreateOptionalParams,
  ConnectionRaiBlocklistItemGetOptionalParams,
  ConnectionRaiBlocklistItemDeleteBulkOptionalParams,
  ConnectionRaiBlocklistItemAddBulkOptionalParams,
} from "../../api/connectionRaiBlocklistItem/options.js";
import type {
  RaiBlocklistItemBulkRequest,
  RaiBlocklistItemPropertiesBasicResource,
} from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ConnectionRaiBlocklistItem operations. */
export interface ConnectionRaiBlocklistItemOperations {
  /** Deletes the specified custom blocklist item associated with the Azure OpenAI connection. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    raiBlocklistName: string,
    raiBlocklistItemName: string,
    options?: ConnectionRaiBlocklistItemDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update the state of specified blocklist item associated with the Azure OpenAI connection. */
  create: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    raiBlocklistName: string,
    raiBlocklistItemName: string,
    body: RaiBlocklistItemPropertiesBasicResource,
    options?: ConnectionRaiBlocklistItemCreateOptionalParams,
  ) => PollerLike<
    OperationState<RaiBlocklistItemPropertiesBasicResource>,
    RaiBlocklistItemPropertiesBasicResource
  >;
  /** Gets the specified custom blocklist item associated with the Azure OpenAI connection. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    raiBlocklistName: string,
    raiBlocklistItemName: string,
    options?: ConnectionRaiBlocklistItemGetOptionalParams,
  ) => Promise<RaiBlocklistItemPropertiesBasicResource>;
  /** Delete multiple blocklist items from the specified blocklist associated with the Azure OpenAI connection. */
  deleteBulk: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    raiBlocklistName: string,
    body: string[],
    options?: ConnectionRaiBlocklistItemDeleteBulkOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Add multiple blocklist items to the specified blocklist associated with the Azure OpenAI connection. */
  addBulk: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    raiBlocklistName: string,
    body: RaiBlocklistItemBulkRequest[],
    options?: ConnectionRaiBlocklistItemAddBulkOptionalParams,
  ) => PollerLike<
    OperationState<RaiBlocklistItemPropertiesBasicResource[]>,
    RaiBlocklistItemPropertiesBasicResource[]
  >;
}

function _getConnectionRaiBlocklistItem(context: AzureMachineLearningServicesManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      raiBlocklistName: string,
      raiBlocklistItemName: string,
      options?: ConnectionRaiBlocklistItemDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        workspaceName,
        connectionName,
        raiBlocklistName,
        raiBlocklistItemName,
        options,
      ),
    create: (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      raiBlocklistName: string,
      raiBlocklistItemName: string,
      body: RaiBlocklistItemPropertiesBasicResource,
      options?: ConnectionRaiBlocklistItemCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        workspaceName,
        connectionName,
        raiBlocklistName,
        raiBlocklistItemName,
        body,
        options,
      ),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      raiBlocklistName: string,
      raiBlocklistItemName: string,
      options?: ConnectionRaiBlocklistItemGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        workspaceName,
        connectionName,
        raiBlocklistName,
        raiBlocklistItemName,
        options,
      ),
    deleteBulk: (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      raiBlocklistName: string,
      body: string[],
      options?: ConnectionRaiBlocklistItemDeleteBulkOptionalParams,
    ) =>
      deleteBulk(
        context,
        resourceGroupName,
        workspaceName,
        connectionName,
        raiBlocklistName,
        body,
        options,
      ),
    addBulk: (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      raiBlocklistName: string,
      body: RaiBlocklistItemBulkRequest[],
      options?: ConnectionRaiBlocklistItemAddBulkOptionalParams,
    ) =>
      addBulk(
        context,
        resourceGroupName,
        workspaceName,
        connectionName,
        raiBlocklistName,
        body,
        options,
      ),
  };
}

export function _getConnectionRaiBlocklistItemOperations(
  context: AzureMachineLearningServicesManagementContext,
): ConnectionRaiBlocklistItemOperations {
  return {
    ..._getConnectionRaiBlocklistItem(context),
  };
}
