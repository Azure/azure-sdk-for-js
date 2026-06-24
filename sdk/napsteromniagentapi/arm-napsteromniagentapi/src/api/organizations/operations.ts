// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CompanionAPIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  OrganizationResource,
  organizationResourceSerializer,
  organizationResourceDeserializer,
  OrganizationResourceUpdate,
  organizationResourceUpdateSerializer,
  _OrganizationResourceListResult,
  _organizationResourceListResultDeserializer,
  SaaSData,
  saaSDataSerializer,
  LatestLinkedSaaSResponse,
  latestLinkedSaaSResponseDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  OrganizationsLatestLinkedSaaSOptionalParams,
  OrganizationsLinkSaaSOptionalParams,
  OrganizationsListBySubscriptionOptionalParams,
  OrganizationsListByResourceGroupOptionalParams,
  OrganizationsDeleteOptionalParams,
  OrganizationsUpdateOptionalParams,
  OrganizationsCreateOrUpdateOptionalParams,
  OrganizationsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _latestLinkedSaaSSend(
  context: Client,
  resourceGroupName: string,
  organizationname: string,
  options: OrganizationsLatestLinkedSaaSOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Napster.CompanionAPI/organizations/{organizationname}/latestLinkedSaaS{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationname: organizationname,
      "api%2Dversion": context.apiVersion ?? "2025-12-24-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _latestLinkedSaaSDeserialize(
  result: PathUncheckedResponse,
): Promise<LatestLinkedSaaSResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return latestLinkedSaaSResponseDeserializer(result.body);
}

/** Returns the latest SaaS linked to the Napster organization of the underlying monitor. */
export async function latestLinkedSaaS(
  context: Client,
  resourceGroupName: string,
  organizationname: string,
  options: OrganizationsLatestLinkedSaaSOptionalParams = { requestOptions: {} },
): Promise<LatestLinkedSaaSResponse> {
  const result = await _latestLinkedSaaSSend(context, resourceGroupName, organizationname, options);
  return _latestLinkedSaaSDeserialize(result);
}

export function _linkSaaSSend(
  context: Client,
  resourceGroupName: string,
  organizationname: string,
  body: SaaSData,
  options: OrganizationsLinkSaaSOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Napster.CompanionAPI/organizations/{organizationname}/linkSaaS{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationname: organizationname,
      "api%2Dversion": context.apiVersion ?? "2025-12-24-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: saaSDataSerializer(body),
    });
}

export async function _linkSaaSDeserialize(
  result: PathUncheckedResponse,
): Promise<OrganizationResource> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return organizationResourceDeserializer(result.body);
}

/** Links a new SaaS to the Napster organization of the underlying monitor. */
export function linkSaaS(
  context: Client,
  resourceGroupName: string,
  organizationname: string,
  body: SaaSData,
  options: OrganizationsLinkSaaSOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OrganizationResource>, OrganizationResource> {
  return getLongRunningPoller(context, _linkSaaSDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _linkSaaSSend(context, resourceGroupName, organizationname, body, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-24-preview",
  }) as PollerLike<OperationState<OrganizationResource>, OrganizationResource>;
}

export function _listBySubscriptionSend(
  context: Client,
  options: OrganizationsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Napster.CompanionAPI/organizations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-12-24-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_OrganizationResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _organizationResourceListResultDeserializer(result.body);
}

/** List OrganizationResource resources by subscription ID */
export function listBySubscription(
  context: Client,
  options: OrganizationsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<OrganizationResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-12-24-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: OrganizationsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Napster.CompanionAPI/organizations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-12-24-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_OrganizationResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _organizationResourceListResultDeserializer(result.body);
}

/** List OrganizationResource resources by resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: OrganizationsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<OrganizationResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-12-24-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  organizationname: string,
  options: OrganizationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Napster.CompanionAPI/organizations/{organizationname}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationname: organizationname,
      "api%2Dversion": context.apiVersion ?? "2025-12-24-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a OrganizationResource */
export function $delete(
  context: Client,
  resourceGroupName: string,
  organizationname: string,
  options: OrganizationsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, organizationname, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-24-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  organizationname: string,
  properties: OrganizationResourceUpdate,
  options: OrganizationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Napster.CompanionAPI/organizations/{organizationname}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationname: organizationname,
      "api%2Dversion": context.apiVersion ?? "2025-12-24-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: organizationResourceUpdateSerializer(properties),
    });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<OrganizationResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return organizationResourceDeserializer(result.body);
}

/** Update a OrganizationResource */
export function update(
  context: Client,
  resourceGroupName: string,
  organizationname: string,
  properties: OrganizationResourceUpdate,
  options: OrganizationsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OrganizationResource>, OrganizationResource> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, organizationname, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-24-preview",
  }) as PollerLike<OperationState<OrganizationResource>, OrganizationResource>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  organizationname: string,
  resource: OrganizationResource,
  options: OrganizationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Napster.CompanionAPI/organizations/{organizationname}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationname: organizationname,
      "api%2Dversion": context.apiVersion ?? "2025-12-24-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: organizationResourceSerializer(resource),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<OrganizationResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return organizationResourceDeserializer(result.body);
}

/** Create a OrganizationResource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  organizationname: string,
  resource: OrganizationResource,
  options: OrganizationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OrganizationResource>, OrganizationResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, organizationname, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-24-preview",
  }) as PollerLike<OperationState<OrganizationResource>, OrganizationResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  organizationname: string,
  options: OrganizationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Napster.CompanionAPI/organizations/{organizationname}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationname: organizationname,
      "api%2Dversion": context.apiVersion ?? "2025-12-24-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<OrganizationResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return organizationResourceDeserializer(result.body);
}

/** Get a OrganizationResource */
export async function get(
  context: Client,
  resourceGroupName: string,
  organizationname: string,
  options: OrganizationsGetOptionalParams = { requestOptions: {} },
): Promise<OrganizationResource> {
  const result = await _getSend(context, resourceGroupName, organizationname, options);
  return _getDeserialize(result);
}
