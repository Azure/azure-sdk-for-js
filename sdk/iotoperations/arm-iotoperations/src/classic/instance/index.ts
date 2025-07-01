// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTOperationsContext } from "../../api/ioTOperationsContext.js";
import { InstanceResource, InstancePatchModel } from "../../models/models.js";
import {
  InstanceListBySubscriptionOptionalParams,
  InstanceListByResourceGroupOptionalParams,
  InstanceDeleteOptionalParams,
  InstanceUpdateOptionalParams,
  InstanceCreateOrUpdateOptionalParams,
  InstanceGetOptionalParams,
} from "../../api/instance/options.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/instance/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Instance operations. */
export interface InstanceOperations {
  /** List InstanceResource resources by subscription ID */
  listBySubscription: (
    apiVersion: string,
    options?: InstanceListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<InstanceResource>;
  /** List InstanceResource resources by resource group */
  listByResourceGroup: (
    apiVersion: string,
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
    apiVersion: string,
    resourceGroupName: string,
    instanceName: string,
    options?: InstanceDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a InstanceResource */
  update: (
    apiVersion: string,
    resourceGroupName: string,
    instanceName: string,
    properties: InstancePatchModel,
    options?: InstanceUpdateOptionalParams,
  ) => Promise<InstanceResource>;
  /** Create a InstanceResource */
  createOrUpdate: (
    apiVersion: string,
    resourceGroupName: string,
    instanceName: string,
    resource: InstanceResource,
    options?: InstanceCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<InstanceResource>, InstanceResource>;
  /** Get a InstanceResource */
  get: (
    apiVersion: string,
    resourceGroupName: string,
    instanceName: string,
    options?: InstanceGetOptionalParams,
  ) => Promise<InstanceResource>;
}

function _getInstance(context: IoTOperationsContext) {
  return {
    listBySubscription: (apiVersion: string, options?: InstanceListBySubscriptionOptionalParams) =>
      listBySubscription(context, apiVersion, options),
    listByResourceGroup: (
      apiVersion: string,
      resourceGroupName: string,
      options?: InstanceListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, apiVersion, resourceGroupName, options),
    delete: (
      apiVersion: string,
      resourceGroupName: string,
      instanceName: string,
      options?: InstanceDeleteOptionalParams,
    ) => $delete(context, apiVersion, resourceGroupName, instanceName, options),
    update: (
      apiVersion: string,
      resourceGroupName: string,
      instanceName: string,
      properties: InstancePatchModel,
      options?: InstanceUpdateOptionalParams,
    ) => update(context, apiVersion, resourceGroupName, instanceName, properties, options),
    createOrUpdate: (
      apiVersion: string,
      resourceGroupName: string,
      instanceName: string,
      resource: InstanceResource,
      options?: InstanceCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, apiVersion, resourceGroupName, instanceName, resource, options),
    get: (
      apiVersion: string,
      resourceGroupName: string,
      instanceName: string,
      options?: InstanceGetOptionalParams,
    ) => get(context, apiVersion, resourceGroupName, instanceName, options),
  };
}

export function _getInstanceOperations(context: IoTOperationsContext): InstanceOperations {
  return {
    ..._getInstance(context),
  };
}
