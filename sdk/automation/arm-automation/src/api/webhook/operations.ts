// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext as Client } from "../index.js";
import type {
  Webhook,
  WebhookCreateOrUpdateParameters,
  WebhookUpdateParameters,
  _WebhookListResult,
  WebhookGenerateUriResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  webhookDeserializer,
  webhookCreateOrUpdateParametersSerializer,
  webhookUpdateParametersSerializer,
  _webhookListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  WebhookListByAutomationAccountOptionalParams,
  WebhookDeleteOptionalParams,
  WebhookUpdateOptionalParams,
  WebhookCreateOrUpdateOptionalParams,
  WebhookGetOptionalParams,
  WebhookGenerateUriOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByAutomationAccountSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  options: WebhookListByAutomationAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/webhooks{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
      "%24filter": options?.filter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listByAutomationAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<_WebhookListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _webhookListResultDeserializer(result.body);
}

/** Retrieve a list of webhooks. */
export function listByAutomationAccount(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  options: WebhookListByAutomationAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Webhook> {
  return buildPagedAsyncIterator(
    context,
    () => _listByAutomationAccountSend(context, resourceGroupName, automationAccountName, options),
    _listByAutomationAccountDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-10-23" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  webhookName: string,
  options: WebhookDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/webhooks/{webhookName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      webhookName: webhookName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete the webhook by name. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  webhookName: string,
  options: WebhookDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    automationAccountName,
    webhookName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  webhookName: string,
  parameters: WebhookUpdateParameters,
  options: WebhookUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/webhooks/{webhookName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      webhookName: webhookName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: webhookUpdateParametersSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Webhook> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return webhookDeserializer(result.body);
}

/** Update the webhook identified by webhook name. */
export async function update(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  webhookName: string,
  parameters: WebhookUpdateParameters,
  options: WebhookUpdateOptionalParams = { requestOptions: {} },
): Promise<Webhook> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    automationAccountName,
    webhookName,
    parameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  webhookName: string,
  parameters: WebhookCreateOrUpdateParameters,
  options: WebhookCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/webhooks/{webhookName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      webhookName: webhookName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: webhookCreateOrUpdateParametersSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Webhook> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return webhookDeserializer(result.body);
}

/** Create the webhook identified by webhook name. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  webhookName: string,
  parameters: WebhookCreateOrUpdateParameters,
  options: WebhookCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<Webhook> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    automationAccountName,
    webhookName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  webhookName: string,
  options: WebhookGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/webhooks/{webhookName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      webhookName: webhookName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Webhook> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return webhookDeserializer(result.body);
}

/** Retrieve the webhook identified by webhook name. */
export async function get(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  webhookName: string,
  options: WebhookGetOptionalParams = { requestOptions: {} },
): Promise<Webhook> {
  const result = await _getSend(
    context,
    resourceGroupName,
    automationAccountName,
    webhookName,
    options,
  );
  return _getDeserialize(result);
}

export function _generateUriSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  options: WebhookGenerateUriOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/webhooks/generateUri{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "text/plain", ...options.requestOptions?.headers },
  });
}

export async function _generateUriDeserialize(
  result: PathUncheckedResponse,
): Promise<WebhookGenerateUriResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return { body: result.body };
}

/** Generates a Uri for use in creating a webhook. */
export async function generateUri(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  options: WebhookGenerateUriOptionalParams = { requestOptions: {} },
): Promise<WebhookGenerateUriResponse> {
  const result = await _generateUriSend(context, resourceGroupName, automationAccountName, options);
  return _generateUriDeserialize(result);
}
