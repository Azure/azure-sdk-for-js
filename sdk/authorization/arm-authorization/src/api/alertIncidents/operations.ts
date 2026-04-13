// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/microsoft/common/models.js";
import type { AlertIncident } from "../../models/microsoft/roleManagementAlerts/models.js";
import { alertIncidentDeserializer } from "../../models/microsoft/roleManagementAlerts/models.js";
import type { _AlertIncidentListResult } from "../../models/models.js";
import { _alertIncidentListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AlertIncidentsRemediateOptionalParams,
  AlertIncidentsListForScopeOptionalParams,
  AlertIncidentsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _remediateSend(
  context: Client,
  scope: string,
  alertId: string,
  alertIncidentId: string,
  options: AlertIncidentsRemediateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleManagementAlerts/{+alertId}/alertIncidents/{+alertIncidentId}/remediate{?api%2Dversion}",
    {
      scope: scope,
      alertId: alertId,
      alertIncidentId: alertIncidentId,
      "api%2Dversion": "2022-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _remediateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Remediate an alert incident. */
export async function remediate(
  context: Client,
  scope: string,
  alertId: string,
  alertIncidentId: string,
  options: AlertIncidentsRemediateOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _remediateSend(context, scope, alertId, alertIncidentId, options);
  return _remediateDeserialize(result);
}

export function _listForScopeSend(
  context: Client,
  scope: string,
  alertId: string,
  options: AlertIncidentsListForScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleManagementAlerts/{+alertId}/alertIncidents{?api%2Dversion}",
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

export async function _listForScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<_AlertIncidentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _alertIncidentListResultDeserializer(result.body);
}

/** Gets alert incidents for a resource scope. */
export function listForScope(
  context: Client,
  scope: string,
  alertId: string,
  options: AlertIncidentsListForScopeOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AlertIncident> {
  return buildPagedAsyncIterator(
    context,
    () => _listForScopeSend(context, scope, alertId, options),
    _listForScopeDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2022-08-01-preview" },
  );
}

export function _getSend(
  context: Client,
  scope: string,
  alertId: string,
  alertIncidentId: string,
  options: AlertIncidentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleManagementAlerts/{+alertId}/alertIncidents/{+alertIncidentId}{?api%2Dversion}",
    {
      scope: scope,
      alertId: alertId,
      alertIncidentId: alertIncidentId,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AlertIncident> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return alertIncidentDeserializer(result.body);
}

/** Get the specified alert incident. */
export async function get(
  context: Client,
  scope: string,
  alertId: string,
  alertIncidentId: string,
  options: AlertIncidentsGetOptionalParams = { requestOptions: {} },
): Promise<AlertIncident> {
  const result = await _getSend(context, scope, alertId, alertIncidentId, options);
  return _getDeserialize(result);
}
