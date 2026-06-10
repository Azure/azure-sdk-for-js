// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SignalRManagementContext } from "../../api/signalRManagementContext.js";
import {
  checkNameAvailability,
  listReplicaSkus,
  listSkus,
  restart,
  regenerateKey,
  listKeys,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/signalR/operations.js";
import type {
  SignalRCheckNameAvailabilityOptionalParams,
  SignalRListReplicaSkusOptionalParams,
  SignalRListSkusOptionalParams,
  SignalRRestartOptionalParams,
  SignalRRegenerateKeyOptionalParams,
  SignalRListKeysOptionalParams,
  SignalRListBySubscriptionOptionalParams,
  SignalRListByResourceGroupOptionalParams,
  SignalRDeleteOptionalParams,
  SignalRUpdateOptionalParams,
  SignalRCreateOrUpdateOptionalParams,
  SignalRGetOptionalParams,
} from "../../api/signalR/options.js";
import type {
  SignalRResource,
  SignalRKeys,
  RegenerateKeyParameters,
  SkuList,
  NameAvailabilityParameters,
  NameAvailability,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SignalR operations. */
export interface SignalROperations {
  /** Checks that the resource name is valid and is not already in use. */
  checkNameAvailability: (
    location: string,
    parameters: NameAvailabilityParameters,
    options?: SignalRCheckNameAvailabilityOptionalParams,
  ) => Promise<NameAvailability>;
  /** List all available skus of the replica resource. */
  listReplicaSkus: (
    resourceGroupName: string,
    resourceName: string,
    replicaName: string,
    options?: SignalRListReplicaSkusOptionalParams,
  ) => Promise<SkuList>;
  /** List all available skus of the resource. */
  listSkus: (
    resourceGroupName: string,
    resourceName: string,
    options?: SignalRListSkusOptionalParams,
  ) => Promise<SkuList>;
  /** Operation to restart a resource. */
  restart: (
    resourceGroupName: string,
    resourceName: string,
    options?: SignalRRestartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Regenerate the access key for the resource. PrimaryKey and SecondaryKey cannot be regenerated at the same time. */
  regenerateKey: (
    resourceGroupName: string,
    resourceName: string,
    parameters: RegenerateKeyParameters,
    options?: SignalRRegenerateKeyOptionalParams,
  ) => PollerLike<OperationState<SignalRKeys>, SignalRKeys>;
  /** Get the access keys of the resource. */
  listKeys: (
    resourceGroupName: string,
    resourceName: string,
    options?: SignalRListKeysOptionalParams,
  ) => Promise<SignalRKeys>;
  /** Handles requests to list all resources in a subscription. */
  listBySubscription: (
    options?: SignalRListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<SignalRResource>;
  /** Handles requests to list all resources in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: SignalRListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<SignalRResource>;
  /** Operation to delete a resource. */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    options?: SignalRDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Operation to update an exiting resource. */
  update: (
    resourceGroupName: string,
    resourceName: string,
    parameters: SignalRResource,
    options?: SignalRUpdateOptionalParams,
  ) => PollerLike<OperationState<SignalRResource>, SignalRResource>;
  /** Create or update a resource. */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    parameters: SignalRResource,
    options?: SignalRCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SignalRResource>, SignalRResource>;
  /** Get the resource and its properties. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    options?: SignalRGetOptionalParams,
  ) => Promise<SignalRResource>;
}

function _getSignalR(context: SignalRManagementContext) {
  return {
    checkNameAvailability: (
      location: string,
      parameters: NameAvailabilityParameters,
      options?: SignalRCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, location, parameters, options),
    listReplicaSkus: (
      resourceGroupName: string,
      resourceName: string,
      replicaName: string,
      options?: SignalRListReplicaSkusOptionalParams,
    ) => listReplicaSkus(context, resourceGroupName, resourceName, replicaName, options),
    listSkus: (
      resourceGroupName: string,
      resourceName: string,
      options?: SignalRListSkusOptionalParams,
    ) => listSkus(context, resourceGroupName, resourceName, options),
    restart: (
      resourceGroupName: string,
      resourceName: string,
      options?: SignalRRestartOptionalParams,
    ) => restart(context, resourceGroupName, resourceName, options),
    regenerateKey: (
      resourceGroupName: string,
      resourceName: string,
      parameters: RegenerateKeyParameters,
      options?: SignalRRegenerateKeyOptionalParams,
    ) => regenerateKey(context, resourceGroupName, resourceName, parameters, options),
    listKeys: (
      resourceGroupName: string,
      resourceName: string,
      options?: SignalRListKeysOptionalParams,
    ) => listKeys(context, resourceGroupName, resourceName, options),
    listBySubscription: (options?: SignalRListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: SignalRListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      options?: SignalRDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, options),
    update: (
      resourceGroupName: string,
      resourceName: string,
      parameters: SignalRResource,
      options?: SignalRUpdateOptionalParams,
    ) => update(context, resourceGroupName, resourceName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      parameters: SignalRResource,
      options?: SignalRCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, resourceName, parameters, options),
    get: (resourceGroupName: string, resourceName: string, options?: SignalRGetOptionalParams) =>
      get(context, resourceGroupName, resourceName, options),
  };
}

export function _getSignalROperations(context: SignalRManagementContext): SignalROperations {
  return {
    ..._getSignalR(context),
  };
}
