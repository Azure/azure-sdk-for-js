// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebPubSubManagementContext } from "../../api/webPubSubManagementContext.js";
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
} from "../../api/webPubSub/operations.js";
import type {
  WebPubSubCheckNameAvailabilityOptionalParams,
  WebPubSubListReplicaSkusOptionalParams,
  WebPubSubListSkusOptionalParams,
  WebPubSubRestartOptionalParams,
  WebPubSubRegenerateKeyOptionalParams,
  WebPubSubListKeysOptionalParams,
  WebPubSubListBySubscriptionOptionalParams,
  WebPubSubListByResourceGroupOptionalParams,
  WebPubSubDeleteOptionalParams,
  WebPubSubUpdateOptionalParams,
  WebPubSubCreateOrUpdateOptionalParams,
  WebPubSubGetOptionalParams,
} from "../../api/webPubSub/options.js";
import type {
  WebPubSubResource,
  WebPubSubKeys,
  RegenerateKeyParameters,
  SkuList,
  NameAvailabilityParameters,
  NameAvailability,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a WebPubSub operations. */
export interface WebPubSubOperations {
  /** Checks that the resource name is valid and is not already in use. */
  checkNameAvailability: (
    location: string,
    parameters: NameAvailabilityParameters,
    options?: WebPubSubCheckNameAvailabilityOptionalParams,
  ) => Promise<NameAvailability>;
  /** List all available skus of the replica resource. */
  listReplicaSkus: (
    resourceGroupName: string,
    resourceName: string,
    replicaName: string,
    options?: WebPubSubListReplicaSkusOptionalParams,
  ) => Promise<SkuList>;
  /** List all available skus of the resource. */
  listSkus: (
    resourceGroupName: string,
    resourceName: string,
    options?: WebPubSubListSkusOptionalParams,
  ) => Promise<SkuList>;
  /** Operation to restart a resource. */
  restart: (
    resourceGroupName: string,
    resourceName: string,
    options?: WebPubSubRestartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Regenerate the access key for the resource. PrimaryKey and SecondaryKey cannot be regenerated at the same time. */
  regenerateKey: (
    resourceGroupName: string,
    resourceName: string,
    parameters: RegenerateKeyParameters,
    options?: WebPubSubRegenerateKeyOptionalParams,
  ) => PollerLike<OperationState<WebPubSubKeys>, WebPubSubKeys>;
  /** Get the access keys of the resource. */
  listKeys: (
    resourceGroupName: string,
    resourceName: string,
    options?: WebPubSubListKeysOptionalParams,
  ) => Promise<WebPubSubKeys>;
  /** Handles requests to list all resources in a subscription. */
  listBySubscription: (
    options?: WebPubSubListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<WebPubSubResource>;
  /** Handles requests to list all resources in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: WebPubSubListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<WebPubSubResource>;
  /** Operation to delete a resource. */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    options?: WebPubSubDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Operation to update an exiting resource. */
  update: (
    resourceGroupName: string,
    resourceName: string,
    parameters: WebPubSubResource,
    options?: WebPubSubUpdateOptionalParams,
  ) => PollerLike<OperationState<WebPubSubResource>, WebPubSubResource>;
  /** Create or update a resource. */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    parameters: WebPubSubResource,
    options?: WebPubSubCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<WebPubSubResource>, WebPubSubResource>;
  /** Get the resource and its properties. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    options?: WebPubSubGetOptionalParams,
  ) => Promise<WebPubSubResource>;
}

function _getWebPubSub(context: WebPubSubManagementContext) {
  return {
    checkNameAvailability: (
      location: string,
      parameters: NameAvailabilityParameters,
      options?: WebPubSubCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, location, parameters, options),
    listReplicaSkus: (
      resourceGroupName: string,
      resourceName: string,
      replicaName: string,
      options?: WebPubSubListReplicaSkusOptionalParams,
    ) => listReplicaSkus(context, resourceGroupName, resourceName, replicaName, options),
    listSkus: (
      resourceGroupName: string,
      resourceName: string,
      options?: WebPubSubListSkusOptionalParams,
    ) => listSkus(context, resourceGroupName, resourceName, options),
    restart: (
      resourceGroupName: string,
      resourceName: string,
      options?: WebPubSubRestartOptionalParams,
    ) => restart(context, resourceGroupName, resourceName, options),
    regenerateKey: (
      resourceGroupName: string,
      resourceName: string,
      parameters: RegenerateKeyParameters,
      options?: WebPubSubRegenerateKeyOptionalParams,
    ) => regenerateKey(context, resourceGroupName, resourceName, parameters, options),
    listKeys: (
      resourceGroupName: string,
      resourceName: string,
      options?: WebPubSubListKeysOptionalParams,
    ) => listKeys(context, resourceGroupName, resourceName, options),
    listBySubscription: (options?: WebPubSubListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: WebPubSubListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      options?: WebPubSubDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, options),
    update: (
      resourceGroupName: string,
      resourceName: string,
      parameters: WebPubSubResource,
      options?: WebPubSubUpdateOptionalParams,
    ) => update(context, resourceGroupName, resourceName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      parameters: WebPubSubResource,
      options?: WebPubSubCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, resourceName, parameters, options),
    get: (resourceGroupName: string, resourceName: string, options?: WebPubSubGetOptionalParams) =>
      get(context, resourceGroupName, resourceName, options),
  };
}

export function _getWebPubSubOperations(context: WebPubSubManagementContext): WebPubSubOperations {
  return {
    ..._getWebPubSub(context),
  };
}
