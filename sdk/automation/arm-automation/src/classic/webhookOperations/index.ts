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
} from "../../api/webhookOperations/operations.js";
import type {
  WebhookOperationsListByAutomationAccountOptionalParams,
  WebhookOperationsDeleteOptionalParams,
  WebhookOperationsUpdateOptionalParams,
  WebhookOperationsCreateOrUpdateOptionalParams,
  WebhookOperationsGetOptionalParams,
  WebhookOperationsGenerateUriOptionalParams,
} from "../../api/webhookOperations/options.js";
import type {
  Webhook,
  WebhookCreateOrUpdateParameters,
  WebhookUpdateParameters,
  WebhookOperationsGenerateUriResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WebhookOperations operations. */
export interface WebhookOperationsOperations {
  /** Retrieve a list of webhooks. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: WebhookOperationsListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<Webhook>;
  /** Delete the webhook by name. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    webhookName: string,
    options?: WebhookOperationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update the webhook identified by webhook name. */
  update: (
    resourceGroupName: string,
    automationAccountName: string,
    webhookName: string,
    parameters: WebhookUpdateParameters,
    options?: WebhookOperationsUpdateOptionalParams,
  ) => Promise<Webhook>;
  /** Create the webhook identified by webhook name. */
  createOrUpdate: (
    resourceGroupName: string,
    automationAccountName: string,
    webhookName: string,
    parameters: WebhookCreateOrUpdateParameters,
    options?: WebhookOperationsCreateOrUpdateOptionalParams,
  ) => Promise<Webhook>;
  /** Retrieve the webhook identified by webhook name. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    webhookName: string,
    options?: WebhookOperationsGetOptionalParams,
  ) => Promise<Webhook>;
  /** Generates a Uri for use in creating a webhook. */
  generateUri: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: WebhookOperationsGenerateUriOptionalParams,
  ) => Promise<WebhookOperationsGenerateUriResponse>;
}

function _getWebhookOperations(context: AutomationContext) {
  return {
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: WebhookOperationsListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      webhookName: string,
      options?: WebhookOperationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, automationAccountName, webhookName, options),
    update: (
      resourceGroupName: string,
      automationAccountName: string,
      webhookName: string,
      parameters: WebhookUpdateParameters,
      options?: WebhookOperationsUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, automationAccountName, webhookName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      automationAccountName: string,
      webhookName: string,
      parameters: WebhookCreateOrUpdateParameters,
      options?: WebhookOperationsCreateOrUpdateOptionalParams,
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
      options?: WebhookOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, webhookName, options),
    generateUri: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: WebhookOperationsGenerateUriOptionalParams,
    ) => generateUri(context, resourceGroupName, automationAccountName, options),
  };
}

export function _getWebhookOperationsOperations(
  context: AutomationContext,
): WebhookOperationsOperations {
  return {
    ..._getWebhookOperations(context),
  };
}
