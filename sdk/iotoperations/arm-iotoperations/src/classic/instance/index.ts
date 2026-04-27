// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IoTOperationsContext } from "../../api/ioTOperationsContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/instance/operations.js";
import type {
  InstanceListBySubscriptionOptionalParams,
  InstanceListByResourceGroupOptionalParams,
  InstanceDeleteOptionalParams,
  InstanceUpdateOptionalParams,
  InstanceCreateOrUpdateOptionalParams,
  InstanceGetOptionalParams,
} from "../../api/instance/options.js";
import type { InstanceResource, InstancePatchModel } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Instance operations. */
export interface InstanceOperations {
  /** List InstanceResource resources by subscription ID */
  listBySubscription: (
    options?: InstanceListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<InstanceResource>;
  /** List InstanceResource resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: InstanceListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<InstanceResource>;
  /** Delete a InstanceResource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    instanceName: string,
    options?: InstanceDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a InstanceResource */
  update: (
    resourceGroupName: string,
    instanceName: string,
    properties: InstancePatchModel,
    options?: InstanceUpdateOptionalParams,
  ) => Promise<InstanceResource>;
  /** Create a InstanceResource */
  createOrUpdate: (
    resourceGroupName: string,
    instanceName: string,
    resource: InstanceResource,
    options?: InstanceCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<InstanceResource>, InstanceResource>;
  /** Get a InstanceResource */
  get: (
    resourceGroupName: string,
    instanceName: string,
    options?: InstanceGetOptionalParams,
  ) => Promise<InstanceResource>;
}

function _getInstance(context: IoTOperationsContext) {
  return {
    listBySubscription: (options?: InstanceListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: InstanceListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      instanceName: string,
      options?: InstanceDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, instanceName, options),
    update: (
      resourceGroupName: string,
      instanceName: string,
      properties: InstancePatchModel,
      options?: InstanceUpdateOptionalParams,
    ) => update(context, resourceGroupName, instanceName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      instanceName: string,
      resource: InstanceResource,
      options?: InstanceCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, instanceName, resource, options),
    get: (resourceGroupName: string, instanceName: string, options?: InstanceGetOptionalParams) =>
      get(context, resourceGroupName, instanceName, options),
  };
}

export function _getInstanceOperations(context: IoTOperationsContext): InstanceOperations {
  return {
    ..._getInstance(context),
  };
}
