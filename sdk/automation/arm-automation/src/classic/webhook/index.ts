// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import {
  listByAutomationAccount,
  $delete,
  update,
  createOrUpdate,
  get,
  generateUri,
} from "../../api/webhook/operations.js";
import type {
  WebhookListByAutomationAccountOptionalParams,
  WebhookDeleteOptionalParams,
  WebhookUpdateOptionalParams,
  WebhookCreateOrUpdateOptionalParams,
  WebhookGetOptionalParams,
  WebhookGenerateUriOptionalParams,
} from "../../api/webhook/options.js";
import type {
  Webhook,
  WebhookCreateOrUpdateParameters,
  WebhookUpdateParameters,
  WebhookGenerateUriResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Webhook operations. */
export interface WebhookOperations {
  /** Retrieve a list of webhooks. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: WebhookListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<Webhook>;
  /** Delete the webhook by name. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    webhookName: string,
    options?: WebhookDeleteOptionalParams,
  ) => Promise<void>;
  /** Update the webhook identified by webhook name. */
  update: (
    resourceGroupName: string,
    automationAccountName: string,
    webhookName: string,
    parameters: WebhookUpdateParameters,
    options?: WebhookUpdateOptionalParams,
  ) => Promise<Webhook>;
  /** Create the webhook identified by webhook name. */
  createOrUpdate: (
    resourceGroupName: string,
    automationAccountName: string,
    webhookName: string,
    parameters: WebhookCreateOrUpdateParameters,
    options?: WebhookCreateOrUpdateOptionalParams,
  ) => Promise<Webhook>;
  /** Retrieve the webhook identified by webhook name. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    webhookName: string,
    options?: WebhookGetOptionalParams,
  ) => Promise<Webhook>;
  /** Generates a Uri for use in creating a webhook. */
  generateUri: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: WebhookGenerateUriOptionalParams,
  ) => Promise<WebhookGenerateUriResponse>;
}

function _getWebhook(context: AutomationContext) {
  return {
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: WebhookListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      webhookName: string,
      options?: WebhookDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, automationAccountName, webhookName, options),
    update: (
      resourceGroupName: string,
      automationAccountName: string,
      webhookName: string,
      parameters: WebhookUpdateParameters,
      options?: WebhookUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, automationAccountName, webhookName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      automationAccountName: string,
      webhookName: string,
      parameters: WebhookCreateOrUpdateParameters,
      options?: WebhookCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        automationAccountName,
        webhookName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      webhookName: string,
      options?: WebhookGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, webhookName, options),
    generateUri: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: WebhookGenerateUriOptionalParams,
    ) => generateUri(context, resourceGroupName, automationAccountName, options),
  };
}

export function _getWebhookOperations(context: AutomationContext): WebhookOperations {
  return {
    ..._getWebhook(context),
  };
}
