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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use delete instead */
  beginDelete: (
    hubName: string,
    resourceGroupName: string,
    resourceName: string,
    options?: WebPubSubHubsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    hubName: string,
    resourceGroupName: string,
    resourceName: string,
    options?: WebPubSubHubsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a hub setting. */
  createOrUpdate: (
    hubName: string,
    resourceGroupName: string,
    resourceName: string,
    parameters: WebPubSubHub,
    options?: WebPubSubHubsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<WebPubSubHub>, WebPubSubHub>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    hubName: string,
    resourceGroupName: string,
    resourceName: string,
    parameters: WebPubSubHub,
    options?: WebPubSubHubsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<WebPubSubHub>, WebPubSubHub>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    hubName: string,
    resourceGroupName: string,
    resourceName: string,
    parameters: WebPubSubHub,
    options?: WebPubSubHubsCreateOrUpdateOptionalParams,
  ) => Promise<WebPubSubHub>;
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
    beginDelete: async (
      hubName: string,
      resourceGroupName: string,
      resourceName: string,
      options?: WebPubSubHubsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, hubName, resourceGroupName, resourceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      hubName: string,
      resourceGroupName: string,
      resourceName: string,
      options?: WebPubSubHubsDeleteOptionalParams,
    ) => {
      return await $delete(context, hubName, resourceGroupName, resourceName, options);
    },
    createOrUpdate: (
      hubName: string,
      resourceGroupName: string,
      resourceName: string,
      parameters: WebPubSubHub,
      options?: WebPubSubHubsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, hubName, resourceGroupName, resourceName, parameters, options),
    beginCreateOrUpdate: async (
      hubName: string,
      resourceGroupName: string,
      resourceName: string,
      parameters: WebPubSubHub,
      options?: WebPubSubHubsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        hubName,
        resourceGroupName,
        resourceName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      hubName: string,
      resourceGroupName: string,
      resourceName: string,
      parameters: WebPubSubHub,
      options?: WebPubSubHubsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        hubName,
        resourceGroupName,
        resourceName,
        parameters,
        options,
      );
    },
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
