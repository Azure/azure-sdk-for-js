// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PowerBIDedicatedContext } from "../../api/powerBIDedicatedContext.js";
import { AutoScaleVCore, AutoScaleVCoreUpdateParameters } from "../../models/models.js";
import {
  AutoScaleVCoresListBySubscriptionOptionalParams,
  AutoScaleVCoresListByResourceGroupOptionalParams,
  AutoScaleVCoresDeleteOptionalParams,
  AutoScaleVCoresUpdateOptionalParams,
  AutoScaleVCoresCreateOptionalParams,
  AutoScaleVCoresGetOptionalParams,
} from "../../api/autoScaleVCores/options.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/autoScaleVCores/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AutoScaleVCores operations. */
export interface AutoScaleVCoresOperations {
  /** Lists all the auto scale v-cores for the given subscription. */
  listBySubscription: (
    options?: AutoScaleVCoresListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<AutoScaleVCore>;
  /** Gets all the auto scale v-cores for the given resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AutoScaleVCoresListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<AutoScaleVCore>;
  /** Deletes the specified auto scale v-core. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    vcoreName: string,
    options?: AutoScaleVCoresDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the current state of the specified auto scale v-core. */
  update: (
    resourceGroupName: string,
    vcoreName: string,
    vCoreUpdateParameters: AutoScaleVCoreUpdateParameters,
    options?: AutoScaleVCoresUpdateOptionalParams,
  ) => Promise<AutoScaleVCore>;
  /** Provisions the specified auto scale v-core based on the configuration specified in the request. */
  create: (
    resourceGroupName: string,
    vcoreName: string,
    vCoreParameters: AutoScaleVCore,
    options?: AutoScaleVCoresCreateOptionalParams,
  ) => Promise<AutoScaleVCore>;
  /** Gets details about the specified auto scale v-core. */
  get: (
    resourceGroupName: string,
    vcoreName: string,
    options?: AutoScaleVCoresGetOptionalParams,
  ) => Promise<AutoScaleVCore>;
}

function _getAutoScaleVCores(context: PowerBIDedicatedContext) {
  return {
    listBySubscription: (options?: AutoScaleVCoresListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AutoScaleVCoresListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      vcoreName: string,
      options?: AutoScaleVCoresDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, vcoreName, options),
    update: (
      resourceGroupName: string,
      vcoreName: string,
      vCoreUpdateParameters: AutoScaleVCoreUpdateParameters,
      options?: AutoScaleVCoresUpdateOptionalParams,
    ) => update(context, resourceGroupName, vcoreName, vCoreUpdateParameters, options),
    create: (
      resourceGroupName: string,
      vcoreName: string,
      vCoreParameters: AutoScaleVCore,
      options?: AutoScaleVCoresCreateOptionalParams,
    ) => create(context, resourceGroupName, vcoreName, vCoreParameters, options),
    get: (
      resourceGroupName: string,
      vcoreName: string,
      options?: AutoScaleVCoresGetOptionalParams,
    ) => get(context, resourceGroupName, vcoreName, options),
  };
}

export function _getAutoScaleVCoresOperations(
  context: PowerBIDedicatedContext,
): AutoScaleVCoresOperations {
  return {
    ..._getAutoScaleVCores(context),
  };
}
