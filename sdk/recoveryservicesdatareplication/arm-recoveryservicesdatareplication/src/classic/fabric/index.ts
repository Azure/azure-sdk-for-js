// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPIContext } from "../../api/azureSiteRecoveryManagementServiceAPIContext.js";
import { FabricModel, FabricModelUpdate } from "../../models/models.js";
import {
  FabricListBySubscriptionOptionalParams,
  FabricListOptionalParams,
  FabricDeleteOptionalParams,
  FabricUpdateOptionalParams,
  FabricCreateOptionalParams,
  FabricGetOptionalParams,
} from "../../api/fabric/options.js";
import {
  listBySubscription,
  list,
  $delete,
  update,
  create,
  get,
} from "../../api/fabric/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Fabric operations. */
export interface FabricOperations {
  /** Gets the list of fabrics in the given subscription. */
  listBySubscription: (
    options?: FabricListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<FabricModel>;
  /** Gets the list of fabrics in the given subscription and resource group. */
  list: (
    resourceGroupName: string,
    options?: FabricListOptionalParams,
  ) => PagedAsyncIterableIterator<FabricModel>;
  /** Removes the fabric. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    fabricName: string,
    options?: FabricDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Performs update on the fabric. */
  update: (
    resourceGroupName: string,
    fabricName: string,
    properties: FabricModelUpdate,
    options?: FabricUpdateOptionalParams,
  ) => PollerLike<OperationState<FabricModel>, FabricModel>;
  /** Creates the fabric. */
  create: (
    resourceGroupName: string,
    fabricName: string,
    resource: FabricModel,
    options?: FabricCreateOptionalParams,
  ) => PollerLike<OperationState<FabricModel>, FabricModel>;
  /** Gets the details of the fabric. */
  get: (
    resourceGroupName: string,
    fabricName: string,
    options?: FabricGetOptionalParams,
  ) => Promise<FabricModel>;
}

function _getFabric(context: AzureSiteRecoveryManagementServiceAPIContext) {
  return {
    listBySubscription: (options?: FabricListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    list: (resourceGroupName: string, options?: FabricListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (resourceGroupName: string, fabricName: string, options?: FabricDeleteOptionalParams) =>
      $delete(context, resourceGroupName, fabricName, options),
    update: (
      resourceGroupName: string,
      fabricName: string,
      properties: FabricModelUpdate,
      options?: FabricUpdateOptionalParams,
    ) => update(context, resourceGroupName, fabricName, properties, options),
    create: (
      resourceGroupName: string,
      fabricName: string,
      resource: FabricModel,
      options?: FabricCreateOptionalParams,
    ) => create(context, resourceGroupName, fabricName, resource, options),
    get: (resourceGroupName: string, fabricName: string, options?: FabricGetOptionalParams) =>
      get(context, resourceGroupName, fabricName, options),
  };
}

export function _getFabricOperations(
  context: AzureSiteRecoveryManagementServiceAPIContext,
): FabricOperations {
  return {
    ..._getFabric(context),
  };
}
