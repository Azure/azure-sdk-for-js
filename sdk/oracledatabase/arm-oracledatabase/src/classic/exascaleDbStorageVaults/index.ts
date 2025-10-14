// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext } from "../../api/oracleDatabaseManagementContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/exascaleDbStorageVaults/operations.js";
import type {
  ExascaleDbStorageVaultsListBySubscriptionOptionalParams,
  ExascaleDbStorageVaultsListByResourceGroupOptionalParams,
  ExascaleDbStorageVaultsDeleteOptionalParams,
  ExascaleDbStorageVaultsUpdateOptionalParams,
  ExascaleDbStorageVaultsCreateOptionalParams,
  ExascaleDbStorageVaultsGetOptionalParams,
} from "../../api/exascaleDbStorageVaults/options.js";
import type {
  ExascaleDbStorageVault,
  ExascaleDbStorageVaultTagsUpdate,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ExascaleDbStorageVaults operations. */
export interface ExascaleDbStorageVaultsOperations {
  /** List ExascaleDbStorageVault resources by subscription ID */
  listBySubscription: (
    options?: ExascaleDbStorageVaultsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ExascaleDbStorageVault>;
  /** List ExascaleDbStorageVault resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ExascaleDbStorageVaultsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ExascaleDbStorageVault>;
  /** Delete a ExascaleDbStorageVault */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    exascaleDbStorageVaultName: string,
    options?: ExascaleDbStorageVaultsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a ExascaleDbStorageVault */
  update: (
    resourceGroupName: string,
    exascaleDbStorageVaultName: string,
    properties: ExascaleDbStorageVaultTagsUpdate,
    options?: ExascaleDbStorageVaultsUpdateOptionalParams,
  ) => PollerLike<OperationState<ExascaleDbStorageVault>, ExascaleDbStorageVault>;
  /** Create a ExascaleDbStorageVault */
  create: (
    resourceGroupName: string,
    exascaleDbStorageVaultName: string,
    resource: ExascaleDbStorageVault,
    options?: ExascaleDbStorageVaultsCreateOptionalParams,
  ) => PollerLike<OperationState<ExascaleDbStorageVault>, ExascaleDbStorageVault>;
  /** Get a ExascaleDbStorageVault */
  get: (
    resourceGroupName: string,
    exascaleDbStorageVaultName: string,
    options?: ExascaleDbStorageVaultsGetOptionalParams,
  ) => Promise<ExascaleDbStorageVault>;
}

function _getExascaleDbStorageVaults(context: OracleDatabaseManagementContext) {
  return {
    listBySubscription: (options?: ExascaleDbStorageVaultsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ExascaleDbStorageVaultsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      exascaleDbStorageVaultName: string,
      options?: ExascaleDbStorageVaultsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, exascaleDbStorageVaultName, options),
    update: (
      resourceGroupName: string,
      exascaleDbStorageVaultName: string,
      properties: ExascaleDbStorageVaultTagsUpdate,
      options?: ExascaleDbStorageVaultsUpdateOptionalParams,
    ) => update(context, resourceGroupName, exascaleDbStorageVaultName, properties, options),
    create: (
      resourceGroupName: string,
      exascaleDbStorageVaultName: string,
      resource: ExascaleDbStorageVault,
      options?: ExascaleDbStorageVaultsCreateOptionalParams,
    ) => create(context, resourceGroupName, exascaleDbStorageVaultName, resource, options),
    get: (
      resourceGroupName: string,
      exascaleDbStorageVaultName: string,
      options?: ExascaleDbStorageVaultsGetOptionalParams,
    ) => get(context, resourceGroupName, exascaleDbStorageVaultName, options),
  };
}

export function _getExascaleDbStorageVaultsOperations(
  context: OracleDatabaseManagementContext,
): ExascaleDbStorageVaultsOperations {
  return {
    ..._getExascaleDbStorageVaults(context),
  };
}
