// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftDatadogContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  MonitoredSubscriptionProperties,
  monitoredSubscriptionPropertiesSerializer,
  monitoredSubscriptionPropertiesDeserializer,
  _MonitoredSubscriptionPropertiesList,
  _monitoredSubscriptionPropertiesListDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  MonitoredSubscriptionsListOptionalParams,
  MonitoredSubscriptionsDeleteOptionalParams,
  MonitoredSubscriptionsUpdateOptionalParams,
  MonitoredSubscriptionsCreateorUpdateOptionalParams,
  MonitoredSubscriptionsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: MonitoredSubscriptionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}/monitoredSubscriptions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2025-12-26-preview",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_MonitoredSubscriptionPropertiesList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _monitoredSubscriptionPropertiesListDeserializer(result.body);
}

/** List the subscriptions currently being monitored by the Datadog monitor resource. */
export function list(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: MonitoredSubscriptionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MonitoredSubscriptionProperties> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, monitorName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-12-26-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  configurationName: string,
  options: MonitoredSubscriptionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}/monitoredSubscriptions/{configurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      configurationName: configurationName,
      "api%2Dversion": context.apiVersion ?? "2025-12-26-preview",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Updates the subscriptions that are being monitored by the Datadog monitor resource */
export function $delete(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  configurationName: string,
  options: MonitoredSubscriptionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, monitorName, configurationName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-26-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  configurationName: string,
  options: MonitoredSubscriptionsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}/monitoredSubscriptions/{configurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      configurationName: configurationName,
      "api%2Dversion": context.apiVersion ?? "2025-12-26-preview",
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
      body: !options?.body
        ? options?.body
        : monitoredSubscriptionPropertiesSerializer(options?.body),
    });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<MonitoredSubscriptionProperties> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return monitoredSubscriptionPropertiesDeserializer(result.body);
}

/** Updates the subscriptions that are being monitored by the Datadog monitor resource */
export function update(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  configurationName: string,
  options: MonitoredSubscriptionsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MonitoredSubscriptionProperties>, MonitoredSubscriptionProperties> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, monitorName, configurationName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-26-preview",
  }) as PollerLike<
    OperationState<MonitoredSubscriptionProperties>,
    MonitoredSubscriptionProperties
  >;
}

export function _createorUpdateSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  configurationName: string,
  options: MonitoredSubscriptionsCreateorUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}/monitoredSubscriptions/{configurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      configurationName: configurationName,
      "api%2Dversion": context.apiVersion ?? "2025-12-26-preview",
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
      body: !options?.body
        ? options?.body
        : monitoredSubscriptionPropertiesSerializer(options?.body),
    });
}

export async function _createorUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<MonitoredSubscriptionProperties> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return monitoredSubscriptionPropertiesDeserializer(result.body);
}

/** Add the subscriptions that should be monitored by the Datadog monitor resource. */
export function createorUpdate(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  configurationName: string,
  options: MonitoredSubscriptionsCreateorUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MonitoredSubscriptionProperties>, MonitoredSubscriptionProperties> {
  return getLongRunningPoller(context, _createorUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createorUpdateSend(context, resourceGroupName, monitorName, configurationName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-26-preview",
  }) as PollerLike<
    OperationState<MonitoredSubscriptionProperties>,
    MonitoredSubscriptionProperties
  >;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  configurationName: string,
  options: MonitoredSubscriptionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}/monitoredSubscriptions/{configurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      configurationName: configurationName,
      "api%2Dversion": context.apiVersion ?? "2025-12-26-preview",
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
): Promise<MonitoredSubscriptionProperties> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return monitoredSubscriptionPropertiesDeserializer(result.body);
}

/** List the subscriptions currently being monitored by the Datadog monitor resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  configurationName: string,
  options: MonitoredSubscriptionsGetOptionalParams = { requestOptions: {} },
): Promise<MonitoredSubscriptionProperties> {
  const result = await _getSend(
    context,
    resourceGroupName,
    monitorName,
    configurationName,
    options,
  );
  return _getDeserialize(result);
}
