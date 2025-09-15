// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerRegistryManagementContext } from "../../api/containerRegistryManagementContext.js";
import {
  getCallbackConfig,
  listEvents,
  ping,
  list,
  $delete,
  update,
  create,
  get,
} from "../../api/webhooks/operations.js";
import type {
  WebhooksGetCallbackConfigOptionalParams,
  WebhooksListEventsOptionalParams,
  WebhooksPingOptionalParams,
  WebhooksListOptionalParams,
  WebhooksDeleteOptionalParams,
  WebhooksUpdateOptionalParams,
  WebhooksCreateOptionalParams,
  WebhooksGetOptionalParams,
} from "../../api/webhooks/options.js";
import type {
  Webhook,
  WebhookCreateParameters,
  WebhookUpdateParameters,
  EventInfo,
  Event,
  CallbackConfig,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Webhooks operations. */
export interface WebhooksOperations {
  /** Gets the configuration of service URI and custom headers for the webhook. */
  getCallbackConfig: (
    resourceGroupName: string,
    registryName: string,
    webhookName: string,
    options?: WebhooksGetCallbackConfigOptionalParams,
  ) => Promise<CallbackConfig>;
  /** Lists recent events for the specified webhook. */
  listEvents: (
    resourceGroupName: string,
    registryName: string,
    webhookName: string,
    options?: WebhooksListEventsOptionalParams,
  ) => PagedAsyncIterableIterator<Event>;
  /** Triggers a ping event to be sent to the webhook. */
  ping: (
    resourceGroupName: string,
    registryName: string,
    webhookName: string,
    options?: WebhooksPingOptionalParams,
  ) => Promise<EventInfo>;
  /** Lists all the webhooks for the specified container registry. */
  list: (
    resourceGroupName: string,
    registryName: string,
    options?: WebhooksListOptionalParams,
  ) => PagedAsyncIterableIterator<Webhook>;
  /** Deletes a webhook from a container registry. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    registryName: string,
    webhookName: string,
    options?: WebhooksDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a webhook with the specified parameters. */
  update: (
    resourceGroupName: string,
    registryName: string,
    webhookName: string,
    webhookUpdateParameters: WebhookUpdateParameters,
    options?: WebhooksUpdateOptionalParams,
  ) => PollerLike<OperationState<Webhook>, Webhook>;
  /** Creates a webhook for a container registry with the specified parameters. */
  create: (
    resourceGroupName: string,
    registryName: string,
    webhookName: string,
    webhookCreateParameters: WebhookCreateParameters,
    options?: WebhooksCreateOptionalParams,
  ) => PollerLike<OperationState<Webhook>, Webhook>;
  /** Gets the properties of the specified webhook. */
  get: (
    resourceGroupName: string,
    registryName: string,
    webhookName: string,
    options?: WebhooksGetOptionalParams,
  ) => Promise<Webhook>;
}

function _getWebhooks(context: ContainerRegistryManagementContext) {
  return {
    getCallbackConfig: (
      resourceGroupName: string,
      registryName: string,
      webhookName: string,
      options?: WebhooksGetCallbackConfigOptionalParams,
    ) => getCallbackConfig(context, resourceGroupName, registryName, webhookName, options),
    listEvents: (
      resourceGroupName: string,
      registryName: string,
      webhookName: string,
      options?: WebhooksListEventsOptionalParams,
    ) => listEvents(context, resourceGroupName, registryName, webhookName, options),
    ping: (
      resourceGroupName: string,
      registryName: string,
      webhookName: string,
      options?: WebhooksPingOptionalParams,
    ) => ping(context, resourceGroupName, registryName, webhookName, options),
    list: (resourceGroupName: string, registryName: string, options?: WebhooksListOptionalParams) =>
      list(context, resourceGroupName, registryName, options),
    delete: (
      resourceGroupName: string,
      registryName: string,
      webhookName: string,
      options?: WebhooksDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, registryName, webhookName, options),
    update: (
      resourceGroupName: string,
      registryName: string,
      webhookName: string,
      webhookUpdateParameters: WebhookUpdateParameters,
      options?: WebhooksUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        registryName,
        webhookName,
        webhookUpdateParameters,
        options,
      ),
    create: (
      resourceGroupName: string,
      registryName: string,
      webhookName: string,
      webhookCreateParameters: WebhookCreateParameters,
      options?: WebhooksCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        registryName,
        webhookName,
        webhookCreateParameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      registryName: string,
      webhookName: string,
      options?: WebhooksGetOptionalParams,
    ) => get(context, resourceGroupName, registryName, webhookName, options),
  };
}

export function _getWebhooksOperations(
  context: ContainerRegistryManagementContext,
): WebhooksOperations {
  return {
    ..._getWebhooks(context),
  };
}
