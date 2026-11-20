// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConfluentManagementContext as Client } from "../index.js";
import type {
  MonitorResource,
  MonitorResourceUpdateParameters,
  _MonitorResourceListResult,
} from "../../models/models.js";
import {
  monitorResourceSerializer,
  monitorResourceDeserializer,
  resourceProviderDefaultErrorResponseDeserializer,
  errorResponseDeserializer,
  monitorResourceUpdateParametersSerializer,
  _monitorResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  MonitorResourcesListByOrganizationOptionalParams,
  MonitorResourcesDeleteOptionalParams,
  MonitorResourcesUpdateOptionalParams,
  MonitorResourcesCreateOrUpdateOptionalParams,
  MonitorResourcesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByOrganizationSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  options: MonitorResourcesListByOrganizationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/monitors{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      "api%2Dversion": context.apiVersion ?? "2026-10-21-preview",
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

export async function _listByOrganizationDeserialize(
  result: PathUncheckedResponse,
): Promise<_MonitorResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _monitorResourceListResultDeserializer(result.body);
}

/** Lists the monitors configured under a Confluent organization. */
export function listByOrganization(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  options: MonitorResourcesListByOrganizationOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MonitorResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByOrganizationSend(context, resourceGroupName, organizationName, options),
    _listByOrganizationDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-10-21-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  monitorName: string,
  options: MonitorResourcesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/monitors/{monitorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2026-10-21-preview",
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

/**
 * Deletes a monitor and stops sending Azure logs to its configured Confluent
 * topic.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  monitorName: string,
  options: MonitorResourcesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, organizationName, monitorName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-10-21-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  monitorName: string,
  properties: MonitorResourceUpdateParameters,
  options: MonitorResourcesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/monitors/{monitorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2026-10-21-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: monitorResourceUpdateParametersSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<MonitorResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return monitorResourceDeserializer(result.body);
}

/** Updates the Azure resource tags assigned to a monitor. */
export function update(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  monitorName: string,
  properties: MonitorResourceUpdateParameters,
  options: MonitorResourcesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MonitorResource>, MonitorResource> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, organizationName, monitorName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-10-21-preview",
  }) as PollerLike<OperationState<MonitorResource>, MonitorResource>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  monitorName: string,
  resource: MonitorResource,
  options: MonitorResourcesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/monitors/{monitorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2026-10-21-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: monitorResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<MonitorResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return monitorResourceDeserializer(result.body);
}

/**
 * Creates or replaces a monitor with the Confluent environment, cluster, and
 * topic to which selected Azure logs are sent.
 */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  monitorName: string,
  resource: MonitorResource,
  options: MonitorResourcesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MonitorResource>, MonitorResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        organizationName,
        monitorName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-10-21-preview",
  }) as PollerLike<OperationState<MonitorResource>, MonitorResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  monitorName: string,
  options: MonitorResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/monitors/{monitorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2026-10-21-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<MonitorResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return monitorResourceDeserializer(result.body);
}

/** Gets a monitor and its configured Confluent log destination. */
export async function get(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  monitorName: string,
  options: MonitorResourcesGetOptionalParams = { requestOptions: {} },
): Promise<MonitorResource> {
  const result = await _getSend(context, resourceGroupName, organizationName, monitorName, options);
  return _getDeserialize(result);
}
