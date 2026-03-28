// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext as Client } from "../index.js";
import type {
  Incident,
  _IncidentList,
  IncidentAlertList,
  IncidentBookmarkList,
  IncidentEntitiesResponse,
  IncidentsRunPlaybookResponse,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  incidentSerializer,
  incidentDeserializer,
  _incidentListDeserializer,
  manualTriggerRequestBodySerializer,
  incidentAlertListDeserializer,
  incidentBookmarkListDeserializer,
  incidentEntitiesResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  IncidentsListEntitiesOptionalParams,
  IncidentsListBookmarksOptionalParams,
  IncidentsListAlertsOptionalParams,
  IncidentsRunPlaybookOptionalParams,
  IncidentsListOptionalParams,
  IncidentsDeleteOptionalParams,
  IncidentsCreateOrUpdateOptionalParams,
  IncidentsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listEntitiesSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  incidentId: string,
  options: IncidentsListEntitiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/incidents/{incidentId}/entities{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      incidentId: incidentId,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
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

export async function _listEntitiesDeserialize(
  result: PathUncheckedResponse,
): Promise<IncidentEntitiesResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return incidentEntitiesResponseDeserializer(result.body);
}

/** Gets all entities for an incident. */
export async function listEntities(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  incidentId: string,
  options: IncidentsListEntitiesOptionalParams = { requestOptions: {} },
): Promise<IncidentEntitiesResponse> {
  const result = await _listEntitiesSend(
    context,
    resourceGroupName,
    workspaceName,
    incidentId,
    options,
  );
  return _listEntitiesDeserialize(result);
}

export function _listBookmarksSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  incidentId: string,
  options: IncidentsListBookmarksOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/incidents/{incidentId}/bookmarks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      incidentId: incidentId,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
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

export async function _listBookmarksDeserialize(
  result: PathUncheckedResponse,
): Promise<IncidentBookmarkList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return incidentBookmarkListDeserializer(result.body);
}

/** Gets all bookmarks for an incident. */
export async function listBookmarks(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  incidentId: string,
  options: IncidentsListBookmarksOptionalParams = { requestOptions: {} },
): Promise<IncidentBookmarkList> {
  const result = await _listBookmarksSend(
    context,
    resourceGroupName,
    workspaceName,
    incidentId,
    options,
  );
  return _listBookmarksDeserialize(result);
}

export function _listAlertsSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  incidentId: string,
  options: IncidentsListAlertsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/incidents/{incidentId}/alerts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      incidentId: incidentId,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
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

export async function _listAlertsDeserialize(
  result: PathUncheckedResponse,
): Promise<IncidentAlertList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return incidentAlertListDeserializer(result.body);
}

/** Gets all alerts for an incident. */
export async function listAlerts(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  incidentId: string,
  options: IncidentsListAlertsOptionalParams = { requestOptions: {} },
): Promise<IncidentAlertList> {
  const result = await _listAlertsSend(
    context,
    resourceGroupName,
    workspaceName,
    incidentId,
    options,
  );
  return _listAlertsDeserialize(result);
}

export function _runPlaybookSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  incidentIdentifier: string,
  options: IncidentsRunPlaybookOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/incidents/{incidentIdentifier}/runPlaybook{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      incidentIdentifier: incidentIdentifier,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["requestBody"]
      ? options["requestBody"]
      : manualTriggerRequestBodySerializer(options["requestBody"]),
  });
}

export async function _runPlaybookDeserialize(
  result: PathUncheckedResponse,
): Promise<IncidentsRunPlaybookResponse> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return { body: result.body };
}

/** Triggers playbook on a specific incident */
export async function runPlaybook(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  incidentIdentifier: string,
  options: IncidentsRunPlaybookOptionalParams = { requestOptions: {} },
): Promise<IncidentsRunPlaybookResponse> {
  const result = await _runPlaybookSend(
    context,
    resourceGroupName,
    workspaceName,
    incidentIdentifier,
    options,
  );
  return _runPlaybookDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: IncidentsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/incidents{?api%2Dversion,%24filter,%24orderby,%24top,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
      "%24filter": options?.filter,
      "%24orderby": options?.orderby,
      "%24top": options?.top,
      "%24skipToken": options?.skipToken,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_IncidentList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _incidentListDeserializer(result.body);
}

/** Gets all incidents. */
export function list(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: IncidentsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Incident> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, workspaceName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-07-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  incidentId: string,
  options: IncidentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/incidents/{incidentId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      incidentId: incidentId,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a given incident. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  incidentId: string,
  options: IncidentsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, workspaceName, incidentId, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  incidentId: string,
  incident: Incident,
  options: IncidentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/incidents/{incidentId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      incidentId: incidentId,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: incidentSerializer(incident),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Incident> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return incidentDeserializer(result.body);
}

/** Creates or updates an incident. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  incidentId: string,
  incident: Incident,
  options: IncidentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<Incident> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    workspaceName,
    incidentId,
    incident,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  incidentId: string,
  options: IncidentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/incidents/{incidentId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      incidentId: incidentId,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Incident> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return incidentDeserializer(result.body);
}

/** Gets a given incident. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  incidentId: string,
  options: IncidentsGetOptionalParams = { requestOptions: {} },
): Promise<Incident> {
  const result = await _getSend(context, resourceGroupName, workspaceName, incidentId, options);
  return _getDeserialize(result);
}
