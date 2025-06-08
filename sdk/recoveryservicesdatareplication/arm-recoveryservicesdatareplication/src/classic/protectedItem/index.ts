// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPIContext } from "../../api/azureSiteRecoveryManagementServiceAPIContext.js";
import {
  ProtectedItemModel,
  ProtectedItemModelUpdate,
  PlannedFailoverModel,
} from "../../models/models.js";
import {
  ProtectedItemPlannedFailoverOptionalParams,
  ProtectedItemListOptionalParams,
  ProtectedItemDeleteOptionalParams,
  ProtectedItemUpdateOptionalParams,
  ProtectedItemCreateOptionalParams,
  ProtectedItemGetOptionalParams,
} from "../../api/protectedItem/options.js";
import {
  plannedFailover,
  list,
  $delete,
  update,
  create,
  get,
} from "../../api/protectedItem/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ProtectedItem operations. */
export interface ProtectedItemOperations {
  /** Performs the planned failover on the protected item. */
  plannedFailover: (
    resourceGroupName: string,
    vaultName: string,
    protectedItemName: string,
    body: PlannedFailoverModel,
    options?: ProtectedItemPlannedFailoverOptionalParams,
  ) => PollerLike<OperationState<PlannedFailoverModel>, PlannedFailoverModel>;
  /** Gets the list of protected items in the given vault. */
  list: (
    resourceGroupName: string,
    vaultName: string,
    options?: ProtectedItemListOptionalParams,
  ) => PagedAsyncIterableIterator<ProtectedItemModel>;
  /** Removes the protected item. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    vaultName: string,
    protectedItemName: string,
    options?: ProtectedItemDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Performs update on the protected item. */
  update: (
    resourceGroupName: string,
    vaultName: string,
    protectedItemName: string,
    properties: ProtectedItemModelUpdate,
    options?: ProtectedItemUpdateOptionalParams,
  ) => PollerLike<OperationState<ProtectedItemModel>, ProtectedItemModel>;
  /** Creates the protected item. */
  create: (
    resourceGroupName: string,
    vaultName: string,
    protectedItemName: string,
    resource: ProtectedItemModel,
    options?: ProtectedItemCreateOptionalParams,
  ) => PollerLike<OperationState<ProtectedItemModel>, ProtectedItemModel>;
  /** Gets the details of the protected item. */
  get: (
    resourceGroupName: string,
    vaultName: string,
    protectedItemName: string,
    options?: ProtectedItemGetOptionalParams,
  ) => Promise<ProtectedItemModel>;
}

function _getProtectedItem(context: AzureSiteRecoveryManagementServiceAPIContext) {
  return {
    plannedFailover: (
      resourceGroupName: string,
      vaultName: string,
      protectedItemName: string,
      body: PlannedFailoverModel,
      options?: ProtectedItemPlannedFailoverOptionalParams,
    ) => plannedFailover(context, resourceGroupName, vaultName, protectedItemName, body, options),
    list: (
      resourceGroupName: string,
      vaultName: string,
      options?: ProtectedItemListOptionalParams,
    ) => list(context, resourceGroupName, vaultName, options),
    delete: (
      resourceGroupName: string,
      vaultName: string,
      protectedItemName: string,
      options?: ProtectedItemDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, vaultName, protectedItemName, options),
    update: (
      resourceGroupName: string,
      vaultName: string,
      protectedItemName: string,
      properties: ProtectedItemModelUpdate,
      options?: ProtectedItemUpdateOptionalParams,
    ) => update(context, resourceGroupName, vaultName, protectedItemName, properties, options),
    create: (
      resourceGroupName: string,
      vaultName: string,
      protectedItemName: string,
      resource: ProtectedItemModel,
      options?: ProtectedItemCreateOptionalParams,
    ) => create(context, resourceGroupName, vaultName, protectedItemName, resource, options),
    get: (
      resourceGroupName: string,
      vaultName: string,
      protectedItemName: string,
      options?: ProtectedItemGetOptionalParams,
    ) => get(context, resourceGroupName, vaultName, protectedItemName, options),
  };
}

export function _getProtectedItemOperations(
  context: AzureSiteRecoveryManagementServiceAPIContext,
): ProtectedItemOperations {
  return {
    ..._getProtectedItem(context),
  };
}
