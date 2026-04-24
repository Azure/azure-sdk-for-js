// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import type {
  Alert,
  _AlertList,
  AlertSimulatorRequestBody,
} from "../../models/alertsAPI/models.js";
import {
  alertDeserializer,
  _alertListDeserializer,
  alertSimulatorRequestBodySerializer,
} from "../../models/alertsAPI/models.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import { errorResponseDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AlertsSimulateOptionalParams,
  AlertsListByResourceGroupOptionalParams,
  AlertsListOptionalParams,
  AlertsUpdateResourceGroupLevelStateToInProgressOptionalParams,
  AlertsUpdateResourceGroupLevelStateToActivateOptionalParams,
  AlertsUpdateResourceGroupLevelStateToDismissOptionalParams,
  AlertsUpdateResourceGroupLevelStateToResolveOptionalParams,
  AlertsListResourceGroupLevelByRegionOptionalParams,
  AlertsGetResourceGroupLevelOptionalParams,
  AlertsUpdateSubscriptionLevelStateToInProgressOptionalParams,
  AlertsUpdateSubscriptionLevelStateToActivateOptionalParams,
  AlertsUpdateSubscriptionLevelStateToResolveOptionalParams,
  AlertsUpdateSubscriptionLevelStateToDismissOptionalParams,
  AlertsListSubscriptionLevelByRegionOptionalParams,
  AlertsGetSubscriptionLevelOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _simulateSend(
  context: Client,
  ascLocation: string,
  alertSimulatorRequestBody: AlertSimulatorRequestBody,
  options: AlertsSimulateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/locations/{ascLocation}/alerts/default/simulate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      ascLocation: ascLocation,
      "api%2Dversion": "2022-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: alertSimulatorRequestBodySerializer(alertSimulatorRequestBody),
  });
}

export async function _simulateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Simulate security alerts */
export function simulate(
  context: Client,
  ascLocation: string,
  alertSimulatorRequestBody: AlertSimulatorRequestBody,
  options: AlertsSimulateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _simulateDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _simulateSend(context, ascLocation, alertSimulatorRequestBody, options),
    resourceLocationConfig: "original-uri",
    apiVersion: "2022-01-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: AlertsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/alerts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2022-01-01",
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
): Promise<_AlertList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _alertListDeserializer(result.body);
}

/** List all the alerts that are associated with the resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: AlertsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Alert> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2022-01-01" },
  );
}

export function _listSend(
  context: Client,
  options: AlertsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/alerts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2022-01-01",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_AlertList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _alertListDeserializer(result.body);
}

/** List all the alerts that are associated with the subscription */
export function list(
  context: Client,
  options: AlertsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Alert> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2022-01-01" },
  );
}

export function _updateResourceGroupLevelStateToInProgressSend(
  context: Client,
  resourceGroupName: string,
  ascLocation: string,
  alertName: string,
  options: AlertsUpdateResourceGroupLevelStateToInProgressOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/locations/{ascLocation}/alerts/{alertName}/inProgress{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ascLocation: ascLocation,
      alertName: alertName,
      "api%2Dversion": "2022-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _updateResourceGroupLevelStateToInProgressDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Update the alert's state */
export async function updateResourceGroupLevelStateToInProgress(
  context: Client,
  resourceGroupName: string,
  ascLocation: string,
  alertName: string,
  options: AlertsUpdateResourceGroupLevelStateToInProgressOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _updateResourceGroupLevelStateToInProgressSend(
    context,
    resourceGroupName,
    ascLocation,
    alertName,
    options,
  );
  return _updateResourceGroupLevelStateToInProgressDeserialize(result);
}

export function _updateResourceGroupLevelStateToActivateSend(
  context: Client,
  resourceGroupName: string,
  ascLocation: string,
  alertName: string,
  options: AlertsUpdateResourceGroupLevelStateToActivateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/locations/{ascLocation}/alerts/{alertName}/activate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ascLocation: ascLocation,
      alertName: alertName,
      "api%2Dversion": "2022-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _updateResourceGroupLevelStateToActivateDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Update the alert's state */
export async function updateResourceGroupLevelStateToActivate(
  context: Client,
  resourceGroupName: string,
  ascLocation: string,
  alertName: string,
  options: AlertsUpdateResourceGroupLevelStateToActivateOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _updateResourceGroupLevelStateToActivateSend(
    context,
    resourceGroupName,
    ascLocation,
    alertName,
    options,
  );
  return _updateResourceGroupLevelStateToActivateDeserialize(result);
}

export function _updateResourceGroupLevelStateToDismissSend(
  context: Client,
  resourceGroupName: string,
  ascLocation: string,
  alertName: string,
  options: AlertsUpdateResourceGroupLevelStateToDismissOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/locations/{ascLocation}/alerts/{alertName}/dismiss{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ascLocation: ascLocation,
      alertName: alertName,
      "api%2Dversion": "2022-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _updateResourceGroupLevelStateToDismissDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Update the alert's state */
export async function updateResourceGroupLevelStateToDismiss(
  context: Client,
  resourceGroupName: string,
  ascLocation: string,
  alertName: string,
  options: AlertsUpdateResourceGroupLevelStateToDismissOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _updateResourceGroupLevelStateToDismissSend(
    context,
    resourceGroupName,
    ascLocation,
    alertName,
    options,
  );
  return _updateResourceGroupLevelStateToDismissDeserialize(result);
}

export function _updateResourceGroupLevelStateToResolveSend(
  context: Client,
  resourceGroupName: string,
  ascLocation: string,
  alertName: string,
  options: AlertsUpdateResourceGroupLevelStateToResolveOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/locations/{ascLocation}/alerts/{alertName}/resolve{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ascLocation: ascLocation,
      alertName: alertName,
      "api%2Dversion": "2022-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _updateResourceGroupLevelStateToResolveDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Update the alert's state */
export async function updateResourceGroupLevelStateToResolve(
  context: Client,
  resourceGroupName: string,
  ascLocation: string,
  alertName: string,
  options: AlertsUpdateResourceGroupLevelStateToResolveOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _updateResourceGroupLevelStateToResolveSend(
    context,
    resourceGroupName,
    ascLocation,
    alertName,
    options,
  );
  return _updateResourceGroupLevelStateToResolveDeserialize(result);
}

export function _listResourceGroupLevelByRegionSend(
  context: Client,
  resourceGroupName: string,
  ascLocation: string,
  options: AlertsListResourceGroupLevelByRegionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/locations/{ascLocation}/alerts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ascLocation: ascLocation,
      "api%2Dversion": "2022-01-01",
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

export async function _listResourceGroupLevelByRegionDeserialize(
  result: PathUncheckedResponse,
): Promise<_AlertList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _alertListDeserializer(result.body);
}

/** List all the alerts that are associated with the resource group that are stored in a specific location */
export function listResourceGroupLevelByRegion(
  context: Client,
  resourceGroupName: string,
  ascLocation: string,
  options: AlertsListResourceGroupLevelByRegionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Alert> {
  return buildPagedAsyncIterator(
    context,
    () => _listResourceGroupLevelByRegionSend(context, resourceGroupName, ascLocation, options),
    _listResourceGroupLevelByRegionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2022-01-01" },
  );
}

export function _getResourceGroupLevelSend(
  context: Client,
  resourceGroupName: string,
  ascLocation: string,
  alertName: string,
  options: AlertsGetResourceGroupLevelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/locations/{ascLocation}/alerts/{alertName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ascLocation: ascLocation,
      alertName: alertName,
      "api%2Dversion": "2022-01-01",
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

export async function _getResourceGroupLevelDeserialize(
  result: PathUncheckedResponse,
): Promise<Alert> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return alertDeserializer(result.body);
}

/** Get an alert that is associated a resource group or a resource in a resource group */
export async function getResourceGroupLevel(
  context: Client,
  resourceGroupName: string,
  ascLocation: string,
  alertName: string,
  options: AlertsGetResourceGroupLevelOptionalParams = { requestOptions: {} },
): Promise<Alert> {
  const result = await _getResourceGroupLevelSend(
    context,
    resourceGroupName,
    ascLocation,
    alertName,
    options,
  );
  return _getResourceGroupLevelDeserialize(result);
}

export function _updateSubscriptionLevelStateToInProgressSend(
  context: Client,
  ascLocation: string,
  alertName: string,
  options: AlertsUpdateSubscriptionLevelStateToInProgressOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/locations/{ascLocation}/alerts/{alertName}/inProgress{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      ascLocation: ascLocation,
      alertName: alertName,
      "api%2Dversion": "2022-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _updateSubscriptionLevelStateToInProgressDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Update the alert's state */
export async function updateSubscriptionLevelStateToInProgress(
  context: Client,
  ascLocation: string,
  alertName: string,
  options: AlertsUpdateSubscriptionLevelStateToInProgressOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _updateSubscriptionLevelStateToInProgressSend(
    context,
    ascLocation,
    alertName,
    options,
  );
  return _updateSubscriptionLevelStateToInProgressDeserialize(result);
}

export function _updateSubscriptionLevelStateToActivateSend(
  context: Client,
  ascLocation: string,
  alertName: string,
  options: AlertsUpdateSubscriptionLevelStateToActivateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/locations/{ascLocation}/alerts/{alertName}/activate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      ascLocation: ascLocation,
      alertName: alertName,
      "api%2Dversion": "2022-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _updateSubscriptionLevelStateToActivateDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Update the alert's state */
export async function updateSubscriptionLevelStateToActivate(
  context: Client,
  ascLocation: string,
  alertName: string,
  options: AlertsUpdateSubscriptionLevelStateToActivateOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _updateSubscriptionLevelStateToActivateSend(
    context,
    ascLocation,
    alertName,
    options,
  );
  return _updateSubscriptionLevelStateToActivateDeserialize(result);
}

export function _updateSubscriptionLevelStateToResolveSend(
  context: Client,
  ascLocation: string,
  alertName: string,
  options: AlertsUpdateSubscriptionLevelStateToResolveOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/locations/{ascLocation}/alerts/{alertName}/resolve{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      ascLocation: ascLocation,
      alertName: alertName,
      "api%2Dversion": "2022-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _updateSubscriptionLevelStateToResolveDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Update the alert's state */
export async function updateSubscriptionLevelStateToResolve(
  context: Client,
  ascLocation: string,
  alertName: string,
  options: AlertsUpdateSubscriptionLevelStateToResolveOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _updateSubscriptionLevelStateToResolveSend(
    context,
    ascLocation,
    alertName,
    options,
  );
  return _updateSubscriptionLevelStateToResolveDeserialize(result);
}

export function _updateSubscriptionLevelStateToDismissSend(
  context: Client,
  ascLocation: string,
  alertName: string,
  options: AlertsUpdateSubscriptionLevelStateToDismissOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/locations/{ascLocation}/alerts/{alertName}/dismiss{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      ascLocation: ascLocation,
      alertName: alertName,
      "api%2Dversion": "2022-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _updateSubscriptionLevelStateToDismissDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Update the alert's state */
export async function updateSubscriptionLevelStateToDismiss(
  context: Client,
  ascLocation: string,
  alertName: string,
  options: AlertsUpdateSubscriptionLevelStateToDismissOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _updateSubscriptionLevelStateToDismissSend(
    context,
    ascLocation,
    alertName,
    options,
  );
  return _updateSubscriptionLevelStateToDismissDeserialize(result);
}

export function _listSubscriptionLevelByRegionSend(
  context: Client,
  ascLocation: string,
  options: AlertsListSubscriptionLevelByRegionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/locations/{ascLocation}/alerts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      ascLocation: ascLocation,
      "api%2Dversion": "2022-01-01",
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

export async function _listSubscriptionLevelByRegionDeserialize(
  result: PathUncheckedResponse,
): Promise<_AlertList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _alertListDeserializer(result.body);
}

/** List all the alerts that are associated with the subscription that are stored in a specific location */
export function listSubscriptionLevelByRegion(
  context: Client,
  ascLocation: string,
  options: AlertsListSubscriptionLevelByRegionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Alert> {
  return buildPagedAsyncIterator(
    context,
    () => _listSubscriptionLevelByRegionSend(context, ascLocation, options),
    _listSubscriptionLevelByRegionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2022-01-01" },
  );
}

export function _getSubscriptionLevelSend(
  context: Client,
  ascLocation: string,
  alertName: string,
  options: AlertsGetSubscriptionLevelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/locations/{ascLocation}/alerts/{alertName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      ascLocation: ascLocation,
      alertName: alertName,
      "api%2Dversion": "2022-01-01",
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

export async function _getSubscriptionLevelDeserialize(
  result: PathUncheckedResponse,
): Promise<Alert> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return alertDeserializer(result.body);
}

/** Get an alert that is associated with a subscription */
export async function getSubscriptionLevel(
  context: Client,
  ascLocation: string,
  alertName: string,
  options: AlertsGetSubscriptionLevelOptionalParams = { requestOptions: {} },
): Promise<Alert> {
  const result = await _getSubscriptionLevelSend(context, ascLocation, alertName, options);
  return _getSubscriptionLevelDeserialize(result);
}
