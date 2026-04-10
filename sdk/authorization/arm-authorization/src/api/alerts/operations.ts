// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/microsoft/common/models.js";
import type {
  Alert,
  AlertOperationResult,
} from "../../models/microsoft/roleManagementAlerts/models.js";
import {
  alertSerializer,
  alertDeserializer,
  alertOperationResultDeserializer,
} from "../../models/microsoft/roleManagementAlerts/models.js";
import type { _AlertListResult } from "../../models/models.js";
import { _alertListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AlertsRefreshAllOptionalParams,
  AlertsRefreshOptionalParams,
  AlertsListForScopeOptionalParams,
  AlertsUpdateOptionalParams,
  AlertsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _refreshAllSend(
  context: Client,
  scope: string,
  options: AlertsRefreshAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleManagementAlerts/refresh{?api%2Dversion}",
    {
      scope: scope,
      "api%2Dversion": "2022-08-01-preview",
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

export async function _refreshAllDeserialize(
  result: PathUncheckedResponse,
): Promise<AlertOperationResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return alertOperationResultDeserializer(result.body);
}

/** Refresh all alerts for a resource scope. */
export function refreshAll(
  context: Client,
  scope: string,
  options: AlertsRefreshAllOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AlertOperationResult>, AlertOperationResult> {
  return getLongRunningPoller(context, _refreshAllDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _refreshAllSend(context, scope, options),
    resourceLocationConfig: "location",
    apiVersion: "2022-08-01-preview",
  }) as PollerLike<OperationState<AlertOperationResult>, AlertOperationResult>;
}

export function _refreshSend(
  context: Client,
  scope: string,
  alertId: string,
  options: AlertsRefreshOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleManagementAlerts/{+alertId}/refresh{?api%2Dversion}",
    {
      scope: scope,
      alertId: alertId,
      "api%2Dversion": "2022-08-01-preview",
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

export async function _refreshDeserialize(
  result: PathUncheckedResponse,
): Promise<AlertOperationResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return alertOperationResultDeserializer(result.body);
}

/** Refresh an alert. */
export function refresh(
  context: Client,
  scope: string,
  alertId: string,
  options: AlertsRefreshOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AlertOperationResult>, AlertOperationResult> {
  return getLongRunningPoller(context, _refreshDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _refreshSend(context, scope, alertId, options),
    resourceLocationConfig: "location",
    apiVersion: "2022-08-01-preview",
  }) as PollerLike<OperationState<AlertOperationResult>, AlertOperationResult>;
}

export function _listForScopeSend(
  context: Client,
  scope: string,
  options: AlertsListForScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleManagementAlerts{?api%2Dversion}",
    {
      scope: scope,
      "api%2Dversion": "2022-08-01-preview",
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

export async function _listForScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<_AlertListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _alertListResultDeserializer(result.body);
}

/** Gets alerts for a resource scope. */
export function listForScope(
  context: Client,
  scope: string,
  options: AlertsListForScopeOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Alert> {
  return buildPagedAsyncIterator(
    context,
    () => _listForScopeSend(context, scope, options),
    _listForScopeDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2022-08-01-preview" },
  );
}

export function _updateSend(
  context: Client,
  scope: string,
  alertId: string,
  parameters: Alert,
  options: AlertsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleManagementAlerts/{+alertId}{?api%2Dversion}",
    {
      scope: scope,
      alertId: alertId,
      "api%2Dversion": "2022-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: alertSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Update an alert. */
export async function update(
  context: Client,
  scope: string,
  alertId: string,
  parameters: Alert,
  options: AlertsUpdateOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _updateSend(context, scope, alertId, parameters, options);
  return _updateDeserialize(result);
}

export function _getSend(
  context: Client,
  scope: string,
  alertId: string,
  options: AlertsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleManagementAlerts/{+alertId}{?api%2Dversion}",
    {
      scope: scope,
      alertId: alertId,
      "api%2Dversion": "2022-08-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Alert> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return alertDeserializer(result.body);
}

/** Get the specified alert. */
export async function get(
  context: Client,
  scope: string,
  alertId: string,
  options: AlertsGetOptionalParams = { requestOptions: {} },
): Promise<Alert> {
  const result = await _getSend(context, scope, alertId, options);
  return _getDeserialize(result);
}
