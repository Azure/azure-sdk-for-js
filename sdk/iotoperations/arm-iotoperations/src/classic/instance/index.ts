// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTOperationsContext } from "../../api/ioTOperationsContext.js";
import {
  instanceGet,
  instanceCreateOrUpdate,
  instanceUpdate,
  instanceDelete,
  instanceListByResourceGroup,
  instanceListBySubscription,
} from "../../api/instance/index.js";
import { InstanceResource, InstancePatchModel } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  InstanceGetOptionalParams,
  InstanceCreateOrUpdateOptionalParams,
  InstanceUpdateOptionalParams,
  InstanceDeleteOptionalParams,
  InstanceListByResourceGroupOptionalParams,
  InstanceListBySubscriptionOptionalParams,
} from "../../api/options.js";

/** Interface representing a Instance operations. */
export interface InstanceOperations {
  /** Get a InstanceResource */
  get: (
    resourceGroupName: string,
    instanceName: string,
    options?: InstanceGetOptionalParams,
  ) => Promise<InstanceResource>;
  /** Create a InstanceResource */
  createOrUpdate: (
    resourceGroupName: string,
    instanceName: string,
    resource: InstanceResource,
    options?: InstanceCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<InstanceResource>, InstanceResource>;
  /** Update a InstanceResource */
  update: (
    resourceGroupName: string,
    instanceName: string,
    properties: InstancePatchModel,
    options?: InstanceUpdateOptionalParams,
  ) => Promise<InstanceResource>;
  /** Delete a InstanceResource */
  delete: (
    resourceGroupName: string,
    instanceName: string,
    options?: InstanceDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List InstanceResource resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: InstanceListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<InstanceResource>;
  /** List InstanceResource resources by subscription ID */
  listBySubscription: (
    options?: InstanceListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<InstanceResource>;
}

export function getInstance(
  context: IoTOperationsContext,
  subscriptionId: string,
) {
  return {
    get: (
      resourceGroupName: string,
      instanceName: string,
      options?: InstanceGetOptionalParams,
    ) =>
      instanceGet(
        context,
        subscriptionId,
        resourceGroupName,
        instanceName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      instanceName: string,
      resource: InstanceResource,
      options?: InstanceCreateOrUpdateOptionalParams,
    ) =>
      instanceCreateOrUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        instanceName,
        resource,
        options,
      ),
    update: (
      resourceGroupName: string,
      instanceName: string,
      properties: InstancePatchModel,
      options?: InstanceUpdateOptionalParams,
    ) =>
      instanceUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        instanceName,
        properties,
        options,
      ),
    delete: (
      resourceGroupName: string,
      instanceName: string,
      options?: InstanceDeleteOptionalParams,
    ) =>
      instanceDelete(
        context,
        subscriptionId,
        resourceGroupName,
        instanceName,
        options,
      ),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: InstanceListByResourceGroupOptionalParams,
    ) =>
      instanceListByResourceGroup(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    listBySubscription: (options?: InstanceListBySubscriptionOptionalParams) =>
      instanceListBySubscription(context, subscriptionId, options),
  };
}

export function getInstanceOperations(
  context: IoTOperationsContext,
  subscriptionId: string,
): InstanceOperations {
  return {
    ...getInstance(context, subscriptionId),
  };
}
