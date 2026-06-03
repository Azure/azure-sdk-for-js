// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebPubSubManagementContext } from "../../api/webPubSubManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/webPubSubHubs/operations.js";
import type {
  WebPubSubHubsListOptionalParams,
  WebPubSubHubsDeleteOptionalParams,
  WebPubSubHubsCreateOrUpdateOptionalParams,
  WebPubSubHubsGetOptionalParams,
} from "../../api/webPubSubHubs/options.js";
import type { WebPubSubHub } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a WebPubSubHubs operations. */
export interface WebPubSubHubsOperations {
  /** List hub settings. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: WebPubSubHubsListOptionalParams,
  ) => PagedAsyncIterableIterator<WebPubSubHub>;
  /** Delete a hub setting. */
  delete: (
    hubName: string,
    resourceGroupName: string,
    resourceName: string,
    options?: WebPubSubHubsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update a hub setting. */
  createOrUpdate: (
    hubName: string,
    resourceGroupName: string,
    resourceName: string,
    parameters: WebPubSubHub,
    options?: WebPubSubHubsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<WebPubSubHub>, WebPubSubHub>;
  /** Get a hub setting. */
  get: (
    hubName: string,
    resourceGroupName: string,
    resourceName: string,
    options?: WebPubSubHubsGetOptionalParams,
  ) => Promise<WebPubSubHub>;
}

function _getWebPubSubHubs(context: WebPubSubManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: WebPubSubHubsListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    delete: (
      hubName: string,
      resourceGroupName: string,
      resourceName: string,
      options?: WebPubSubHubsDeleteOptionalParams,
    ) => $delete(context, hubName, resourceGroupName, resourceName, options),
    createOrUpdate: (
      hubName: string,
      resourceGroupName: string,
      resourceName: string,
      parameters: WebPubSubHub,
      options?: WebPubSubHubsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, hubName, resourceGroupName, resourceName, parameters, options),
    get: (
      hubName: string,
      resourceGroupName: string,
      resourceName: string,
      options?: WebPubSubHubsGetOptionalParams,
    ) => get(context, hubName, resourceGroupName, resourceName, options),
  };
}

export function _getWebPubSubHubsOperations(
  context: WebPubSubManagementContext,
): WebPubSubHubsOperations {
  return {
    ..._getWebPubSubHubs(context),
  };
}
