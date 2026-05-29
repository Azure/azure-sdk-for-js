// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import {
  checkNameAvailability,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/connectedEnvironments/operations.js";
import {
  ConnectedEnvironmentsCheckNameAvailabilityOptionalParams,
  ConnectedEnvironmentsListBySubscriptionOptionalParams,
  ConnectedEnvironmentsListByResourceGroupOptionalParams,
  ConnectedEnvironmentsDeleteOptionalParams,
  ConnectedEnvironmentsUpdateOptionalParams,
  ConnectedEnvironmentsCreateOrUpdateOptionalParams,
  ConnectedEnvironmentsGetOptionalParams,
} from "../../api/connectedEnvironments/options.js";
import {
  ConnectedEnvironment,
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResponse,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ConnectedEnvironments operations. */
export interface ConnectedEnvironmentsOperations {
  /** Checks if resource connectedEnvironmentName is available. */
  checkNameAvailability: (
    resourceGroupName: string,
    connectedEnvironmentName: string,
    checkNameAvailabilityRequest: CheckNameAvailabilityRequest,
    options?: ConnectedEnvironmentsCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameAvailabilityResponse>;
  /** Get all connectedEnvironments for a subscription. */
  listBySubscription: (
    options?: ConnectedEnvironmentsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ConnectedEnvironment>;
  /** Get all connectedEnvironments in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ConnectedEnvironmentsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ConnectedEnvironment>;
  /** Delete an connectedEnvironment. */
  delete: (
    resourceGroupName: string,
    connectedEnvironmentName: string,
    options?: ConnectedEnvironmentsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    connectedEnvironmentName: string,
    options?: ConnectedEnvironmentsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    connectedEnvironmentName: string,
    options?: ConnectedEnvironmentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Patches a Managed Environment. Only patching of tags is supported currently */
  update: (
    resourceGroupName: string,
    connectedEnvironmentName: string,
    options?: ConnectedEnvironmentsUpdateOptionalParams,
  ) => Promise<ConnectedEnvironment>;
  /** Creates or updates an connectedEnvironment. */
  createOrUpdate: (
    resourceGroupName: string,
    connectedEnvironmentName: string,
    environmentEnvelope: ConnectedEnvironment,
    options?: ConnectedEnvironmentsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ConnectedEnvironment>, ConnectedEnvironment>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    connectedEnvironmentName: string,
    environmentEnvelope: ConnectedEnvironment,
    options?: ConnectedEnvironmentsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ConnectedEnvironment>, ConnectedEnvironment>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    connectedEnvironmentName: string,
    environmentEnvelope: ConnectedEnvironment,
    options?: ConnectedEnvironmentsCreateOrUpdateOptionalParams,
  ) => Promise<ConnectedEnvironment>;
  /** Get the properties of an connectedEnvironment. */
  get: (
    resourceGroupName: string,
    connectedEnvironmentName: string,
    options?: ConnectedEnvironmentsGetOptionalParams,
  ) => Promise<ConnectedEnvironment>;
}

function _getConnectedEnvironments(context: ContainerAppsAPIContext) {
  return {
    checkNameAvailability: (
      resourceGroupName: string,
      connectedEnvironmentName: string,
      checkNameAvailabilityRequest: CheckNameAvailabilityRequest,
      options?: ConnectedEnvironmentsCheckNameAvailabilityOptionalParams,
    ) =>
      checkNameAvailability(
        context,
        resourceGroupName,
        connectedEnvironmentName,
        checkNameAvailabilityRequest,
        options,
      ),
    listBySubscription: (options?: ConnectedEnvironmentsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ConnectedEnvironmentsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      connectedEnvironmentName: string,
      options?: ConnectedEnvironmentsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, connectedEnvironmentName, options),
    beginDelete: async (
      resourceGroupName: string,
      connectedEnvironmentName: string,
      options?: ConnectedEnvironmentsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, connectedEnvironmentName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      connectedEnvironmentName: string,
      options?: ConnectedEnvironmentsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, connectedEnvironmentName, options);
    },
    update: (
      resourceGroupName: string,
      connectedEnvironmentName: string,
      options?: ConnectedEnvironmentsUpdateOptionalParams,
    ) => update(context, resourceGroupName, connectedEnvironmentName, options),
    createOrUpdate: (
      resourceGroupName: string,
      connectedEnvironmentName: string,
      environmentEnvelope: ConnectedEnvironment,
      options?: ConnectedEnvironmentsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        connectedEnvironmentName,
        environmentEnvelope,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      connectedEnvironmentName: string,
      environmentEnvelope: ConnectedEnvironment,
      options?: ConnectedEnvironmentsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        connectedEnvironmentName,
        environmentEnvelope,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      connectedEnvironmentName: string,
      environmentEnvelope: ConnectedEnvironment,
      options?: ConnectedEnvironmentsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        connectedEnvironmentName,
        environmentEnvelope,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      connectedEnvironmentName: string,
      options?: ConnectedEnvironmentsGetOptionalParams,
    ) => get(context, resourceGroupName, connectedEnvironmentName, options),
  };
}

export function _getConnectedEnvironmentsOperations(
  context: ContainerAppsAPIContext,
): ConnectedEnvironmentsOperations {
  return {
    ..._getConnectedEnvironments(context),
  };
}
