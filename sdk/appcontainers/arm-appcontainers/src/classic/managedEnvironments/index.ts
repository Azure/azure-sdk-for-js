// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import {
  listWorkloadProfileStates,
  getAuthToken,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/managedEnvironments/operations.js";
import {
  ManagedEnvironmentsListWorkloadProfileStatesOptionalParams,
  ManagedEnvironmentsGetAuthTokenOptionalParams,
  ManagedEnvironmentsListBySubscriptionOptionalParams,
  ManagedEnvironmentsListByResourceGroupOptionalParams,
  ManagedEnvironmentsDeleteOptionalParams,
  ManagedEnvironmentsUpdateOptionalParams,
  ManagedEnvironmentsCreateOrUpdateOptionalParams,
  ManagedEnvironmentsGetOptionalParams,
} from "../../api/managedEnvironments/options.js";
import {
  ManagedEnvironment,
  EnvironmentAuthToken,
  WorkloadProfileStates,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ManagedEnvironments operations. */
export interface ManagedEnvironmentsOperations {
  /** Get all workload Profile States for a Managed Environment. */
  listWorkloadProfileStates: (
    resourceGroupName: string,
    environmentName: string,
    options?: ManagedEnvironmentsListWorkloadProfileStatesOptionalParams,
  ) => PagedAsyncIterableIterator<WorkloadProfileStates>;
  /** Checks if resource name is available. */
  getAuthToken: (
    resourceGroupName: string,
    environmentName: string,
    options?: ManagedEnvironmentsGetAuthTokenOptionalParams,
  ) => Promise<EnvironmentAuthToken>;
  /** Get all Managed Environments for a subscription. */
  listBySubscription: (
    options?: ManagedEnvironmentsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedEnvironment>;
  /** Get all the Managed Environments in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ManagedEnvironmentsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedEnvironment>;
  /** Delete a Managed Environment if it does not have any container apps. */
  delete: (
    resourceGroupName: string,
    environmentName: string,
    options?: ManagedEnvironmentsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    environmentName: string,
    options?: ManagedEnvironmentsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    environmentName: string,
    options?: ManagedEnvironmentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Patches a Managed Environment using JSON Merge Patch */
  update: (
    resourceGroupName: string,
    environmentName: string,
    environmentEnvelope: ManagedEnvironment,
    options?: ManagedEnvironmentsUpdateOptionalParams,
  ) => PollerLike<OperationState<ManagedEnvironment>, ManagedEnvironment>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    environmentName: string,
    environmentEnvelope: ManagedEnvironment,
    options?: ManagedEnvironmentsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ManagedEnvironment>, ManagedEnvironment>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    environmentName: string,
    environmentEnvelope: ManagedEnvironment,
    options?: ManagedEnvironmentsUpdateOptionalParams,
  ) => Promise<ManagedEnvironment>;
  /** Creates or updates a Managed Environment used to host container apps. */
  createOrUpdate: (
    resourceGroupName: string,
    environmentName: string,
    environmentEnvelope: ManagedEnvironment,
    options?: ManagedEnvironmentsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ManagedEnvironment>, ManagedEnvironment>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    environmentName: string,
    environmentEnvelope: ManagedEnvironment,
    options?: ManagedEnvironmentsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ManagedEnvironment>, ManagedEnvironment>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    environmentName: string,
    environmentEnvelope: ManagedEnvironment,
    options?: ManagedEnvironmentsCreateOrUpdateOptionalParams,
  ) => Promise<ManagedEnvironment>;
  /** Get the properties of a Managed Environment used to host container apps. */
  get: (
    resourceGroupName: string,
    environmentName: string,
    options?: ManagedEnvironmentsGetOptionalParams,
  ) => Promise<ManagedEnvironment>;
}

function _getManagedEnvironments(context: ContainerAppsAPIContext) {
  return {
    listWorkloadProfileStates: (
      resourceGroupName: string,
      environmentName: string,
      options?: ManagedEnvironmentsListWorkloadProfileStatesOptionalParams,
    ) => listWorkloadProfileStates(context, resourceGroupName, environmentName, options),
    getAuthToken: (
      resourceGroupName: string,
      environmentName: string,
      options?: ManagedEnvironmentsGetAuthTokenOptionalParams,
    ) => getAuthToken(context, resourceGroupName, environmentName, options),
    listBySubscription: (options?: ManagedEnvironmentsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ManagedEnvironmentsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      environmentName: string,
      options?: ManagedEnvironmentsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, environmentName, options),
    beginDelete: async (
      resourceGroupName: string,
      environmentName: string,
      options?: ManagedEnvironmentsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, environmentName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      environmentName: string,
      options?: ManagedEnvironmentsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, environmentName, options);
    },
    update: (
      resourceGroupName: string,
      environmentName: string,
      environmentEnvelope: ManagedEnvironment,
      options?: ManagedEnvironmentsUpdateOptionalParams,
    ) => update(context, resourceGroupName, environmentName, environmentEnvelope, options),
    beginUpdate: async (
      resourceGroupName: string,
      environmentName: string,
      environmentEnvelope: ManagedEnvironment,
      options?: ManagedEnvironmentsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        environmentName,
        environmentEnvelope,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      environmentName: string,
      environmentEnvelope: ManagedEnvironment,
      options?: ManagedEnvironmentsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        environmentName,
        environmentEnvelope,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      environmentName: string,
      environmentEnvelope: ManagedEnvironment,
      options?: ManagedEnvironmentsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, environmentName, environmentEnvelope, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      environmentName: string,
      environmentEnvelope: ManagedEnvironment,
      options?: ManagedEnvironmentsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        environmentName,
        environmentEnvelope,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      environmentName: string,
      environmentEnvelope: ManagedEnvironment,
      options?: ManagedEnvironmentsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        environmentName,
        environmentEnvelope,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      environmentName: string,
      options?: ManagedEnvironmentsGetOptionalParams,
    ) => get(context, resourceGroupName, environmentName, options),
  };
}

export function _getManagedEnvironmentsOperations(
  context: ContainerAppsAPIContext,
): ManagedEnvironmentsOperations {
  return {
    ..._getManagedEnvironments(context),
  };
}
