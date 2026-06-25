// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  Alert,
  alertDeserializer,
  DismissAlertPayload,
  dismissAlertPayloadSerializer,
  AlertsResult,
  alertsResultDeserializer,
  ExternalCloudProviderType,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  AlertsListExternalOptionalParams,
  AlertsListOptionalParams,
  AlertsDismissOptionalParams,
  AlertsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listExternalSend(
  context: Client,
  externalCloudProviderType: ExternalCloudProviderType,
  externalCloudProviderId: string,
  options: AlertsListExternalOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.CostManagement/{externalCloudProviderType}/{externalCloudProviderId}/alerts{?api%2Dversion}",
    {
      externalCloudProviderType: externalCloudProviderType,
      externalCloudProviderId: externalCloudProviderId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
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

export async function _listExternalDeserialize(
  result: PathUncheckedResponse,
): Promise<AlertsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return alertsResultDeserializer(result.body);
}

/** Lists the Alerts for external cloud provider type defined. */
export async function listExternal(
  context: Client,
  externalCloudProviderType: ExternalCloudProviderType,
  externalCloudProviderId: string,
  options: AlertsListExternalOptionalParams = { requestOptions: {} },
): Promise<AlertsResult> {
  const result = await _listExternalSend(
    context,
    externalCloudProviderType,
    externalCloudProviderId,
    options,
  );
  return _listExternalDeserialize(result);
}

export function _listSend(
  context: Client,
  scope: string,
  options: AlertsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.CostManagement/alerts{?api%2Dversion}",
    {
      scope: scope,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<AlertsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return alertsResultDeserializer(result.body);
}

/** Lists the alerts for scope defined. */
export async function list(
  context: Client,
  scope: string,
  options: AlertsListOptionalParams = { requestOptions: {} },
): Promise<AlertsResult> {
  const result = await _listSend(context, scope, options);
  return _listDeserialize(result);
}

export function _dismissSend(
  context: Client,
  scope: string,
  alertId: string,
  parameters: DismissAlertPayload,
  options: AlertsDismissOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.CostManagement/alerts/{+alertId}{?api%2Dversion}",
    {
      scope: scope,
      alertId: alertId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
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
      body: dismissAlertPayloadSerializer(parameters),
    });
}

export async function _dismissDeserialize(result: PathUncheckedResponse): Promise<Alert> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return alertDeserializer(result.body);
}

/** Dismisses the specified alert */
export async function dismiss(
  context: Client,
  scope: string,
  alertId: string,
  parameters: DismissAlertPayload,
  options: AlertsDismissOptionalParams = { requestOptions: {} },
): Promise<Alert> {
  const result = await _dismissSend(context, scope, alertId, parameters, options);
  return _dismissDeserialize(result);
}

export function _getSend(
  context: Client,
  scope: string,
  alertId: string,
  options: AlertsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.CostManagement/alerts/{+alertId}{?api%2Dversion}",
    {
      scope: scope,
      alertId: alertId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Alert> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return alertDeserializer(result.body);
}

/** Gets the alert for the scope by alert ID. */
export async function get(
  context: Client,
  scope: string,
  alertId: string,
  options: AlertsGetOptionalParams = { requestOptions: {} },
): Promise<Alert> {
  const result = await _getSend(context, scope, alertId, options);
  return _getDeserialize(result);
}
