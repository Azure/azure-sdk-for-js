// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CommunicationServiceManagementContext as Client } from "../index.js";
import type {
  EmailServiceResource,
  EmailServiceResourceUpdate,
  _EmailServiceResourceList,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  emailServiceResourceSerializer,
  emailServiceResourceDeserializer,
  emailServiceResourceUpdateSerializer,
  _emailServiceResourceListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  EmailServicesListVerifiedExchangeOnlineDomainsOptionalParams,
  EmailServicesListBySubscriptionOptionalParams,
  EmailServicesListByResourceGroupOptionalParams,
  EmailServicesDeleteOptionalParams,
  EmailServicesUpdateOptionalParams,
  EmailServicesCreateOrUpdateOptionalParams,
  EmailServicesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listVerifiedExchangeOnlineDomainsSend(
  context: Client,
  options: EmailServicesListVerifiedExchangeOnlineDomainsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Communication/listVerifiedExchangeOnlineDomains{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-03-18",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listVerifiedExchangeOnlineDomainsDeserialize(
  result: PathUncheckedResponse,
): Promise<string[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return result.body.map((p: any) => {
    return p;
  });
}

/** Get a list of domains that are fully verified in Exchange Online. */
export async function listVerifiedExchangeOnlineDomains(
  context: Client,
  options: EmailServicesListVerifiedExchangeOnlineDomainsOptionalParams = { requestOptions: {} },
): Promise<string[]> {
  const result = await _listVerifiedExchangeOnlineDomainsSend(context, options);
  return _listVerifiedExchangeOnlineDomainsDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: EmailServicesListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Communication/emailServices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-03-18",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_EmailServiceResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _emailServiceResourceListDeserializer(result.body);
}

/** Handles requests to list all resources in a subscription. */
export function listBySubscription(
  context: Client,
  options: EmailServicesListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EmailServiceResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-03-18" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: EmailServicesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-03-18",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_EmailServiceResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _emailServiceResourceListDeserializer(result.body);
}

/** Handles requests to list all resources in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: EmailServicesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EmailServiceResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-03-18" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  options: EmailServicesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      emailServiceName: emailServiceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-18",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Operation to delete a EmailService. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  options: EmailServicesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, emailServiceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-18",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  parameters: EmailServiceResourceUpdate,
  options: EmailServicesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      emailServiceName: emailServiceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-18",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: emailServiceResourceUpdateSerializer(parameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<EmailServiceResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return emailServiceResourceDeserializer(result.body);
}

/** Operation to update an existing EmailService. */
export function update(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  parameters: EmailServiceResourceUpdate,
  options: EmailServicesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<EmailServiceResource>, EmailServiceResource> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, emailServiceName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-03-18",
  }) as PollerLike<OperationState<EmailServiceResource>, EmailServiceResource>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  parameters: EmailServiceResource,
  options: EmailServicesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      emailServiceName: emailServiceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-18",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: emailServiceResourceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<EmailServiceResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return emailServiceResourceDeserializer(result.body);
}

/** Create a new EmailService or update an existing EmailService. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  parameters: EmailServiceResource,
  options: EmailServicesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<EmailServiceResource>, EmailServiceResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, emailServiceName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-03-18",
  }) as PollerLike<OperationState<EmailServiceResource>, EmailServiceResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  options: EmailServicesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      emailServiceName: emailServiceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-18",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<EmailServiceResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return emailServiceResourceDeserializer(result.body);
}

/** Get the EmailService and its properties. */
export async function get(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  options: EmailServicesGetOptionalParams = { requestOptions: {} },
): Promise<EmailServiceResource> {
  const result = await _getSend(context, resourceGroupName, emailServiceName, options);
  return _getDeserialize(result);
}
