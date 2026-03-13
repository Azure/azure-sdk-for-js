// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AlertsManagementContext as Client } from "../index.js";
import type {
  Alert,
  AlertState,
  AlertModification,
  _AlertsList,
  _AlertEnrichmentsList,
  AlertEnrichmentResponse,
  AlertsMetaData,
  AlertsSummary,
  Identifier,
  AlertsSummaryGroupByFields,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  alertDeserializer,
  alertsManagementErrorResponseDeserializer,
  alertModificationDeserializer,
  commentsSerializer,
  _alertsListDeserializer,
  _alertEnrichmentsListDeserializer,
  alertsMetaDataDeserializer,
  alertsSummaryDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AlertsGetSummaryOptionalParams,
  AlertsMetaDataOptionalParams,
  AlertsGetEnrichmentsOptionalParams,
  AlertsGetHistoryOptionalParams,
  AlertsChangeStateOptionalParams,
  AlertsGetAllOptionalParams,
  AlertsGetByIdOptionalParams,
  AlertsGetAllTenantOptionalParams,
  AlertsChangeStateTenantOptionalParams,
  AlertsGetHistoryTenantOptionalParams,
  AlertsGetByIdTenantOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSummarySend(
  context: Client,
  scope: string,
  groupby: AlertsSummaryGroupByFields,
  options: AlertsGetSummaryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.AlertsManagement/alertsSummary{?api%2Dversion,groupby,includeSmartGroupsCount,targetResource,targetResourceType,targetResourceGroup,monitorService,monitorCondition,severity,alertState,alertRule,timeRange,customTimeRange}",
    {
      scope: scope,
      "api%2Dversion": context.apiVersion ?? "2025-05-25-preview",
      groupby: groupby,
      includeSmartGroupsCount: options?.includeSmartGroupsCount,
      targetResource: options?.targetResource,
      targetResourceType: options?.targetResourceType,
      targetResourceGroup: options?.targetResourceGroup,
      monitorService: options?.monitorService,
      monitorCondition: options?.monitorCondition,
      severity: options?.severity,
      alertState: options?.alertState,
      alertRule: options?.alertRule,
      timeRange: options?.timeRange,
      customTimeRange: options?.customTimeRange,
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

export async function _getSummaryDeserialize(
  result: PathUncheckedResponse,
): Promise<AlertsSummary> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = alertsManagementErrorResponseDeserializer(result.body);

    throw error;
  }

  return alertsSummaryDeserializer(result.body);
}

/** Get a summarized count of your alerts grouped by various parameters (e.g. grouping by 'Severity' returns the count of alerts for each severity). */
export async function getSummary(
  context: Client,
  scope: string,
  groupby: AlertsSummaryGroupByFields,
  options: AlertsGetSummaryOptionalParams = { requestOptions: {} },
): Promise<AlertsSummary> {
  const result = await _getSummarySend(context, scope, groupby, options);
  return _getSummaryDeserialize(result);
}

export function _metaDataSend(
  context: Client,
  identifier: Identifier,
  options: AlertsMetaDataOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.AlertsManagement/alertsMetaData{?api%2Dversion,identifier}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-05-25-preview",
      identifier: identifier,
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

export async function _metaDataDeserialize(result: PathUncheckedResponse): Promise<AlertsMetaData> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = alertsManagementErrorResponseDeserializer(result.body);

    throw error;
  }

  return alertsMetaDataDeserializer(result.body);
}

/** List alerts meta data information based on value of identifier parameter. */
export async function metaData(
  context: Client,
  identifier: Identifier,
  options: AlertsMetaDataOptionalParams = { requestOptions: {} },
): Promise<AlertsMetaData> {
  const result = await _metaDataSend(context, identifier, options);
  return _metaDataDeserialize(result);
}

export function _getEnrichmentsSend(
  context: Client,
  scope: string,
  alertId: string,
  options: AlertsGetEnrichmentsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{scope}/providers/Microsoft.AlertsManagement/alerts/{alertId}/enrichments{?api%2Dversion}",
    {
      scope: scope,
      alertId: alertId,
      "api%2Dversion": context.apiVersion ?? "2025-05-25-preview",
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

export async function _getEnrichmentsDeserialize(
  result: PathUncheckedResponse,
): Promise<_AlertEnrichmentsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _alertEnrichmentsListDeserializer(result.body);
}

/** Get the enrichments of an alert. It returns a collection of one object named default. */
export function getEnrichments(
  context: Client,
  scope: string,
  alertId: string,
  options: AlertsGetEnrichmentsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AlertEnrichmentResponse> {
  return buildPagedAsyncIterator(
    context,
    () => _getEnrichmentsSend(context, scope, alertId, options),
    _getEnrichmentsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-05-25-preview",
    },
  );
}

export function _getHistorySend(
  context: Client,
  scope: string,
  alertId: string,
  options: AlertsGetHistoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{scope}/providers/Microsoft.AlertsManagement/alerts/{alertId}/history{?api%2Dversion}",
    {
      scope: scope,
      alertId: alertId,
      "api%2Dversion": context.apiVersion ?? "2025-05-25-preview",
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

export async function _getHistoryDeserialize(
  result: PathUncheckedResponse,
): Promise<AlertModification> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = alertsManagementErrorResponseDeserializer(result.body);

    throw error;
  }

  return alertModificationDeserializer(result.body);
}

/** Get the history of an alert, which captures any monitor condition changes (Fired/Resolved), alert state changes (New/Acknowledged/Closed) and applied action rules for that particular alert. If scope is a deleted resource then please use scope as parent resource of the delete resource. For example if my alert id is '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Compute/virtualMachines/vm1/providers/Microsoft.AlertsManagement/alerts/{alertId}' and 'vm1' is deleted then if you want to get history of this particular alert then use parent resource of scope. So in this example get history call will look like this: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.AlertsManagement/alerts/{alertId}/history'. */
export async function getHistory(
  context: Client,
  scope: string,
  alertId: string,
  options: AlertsGetHistoryOptionalParams = { requestOptions: {} },
): Promise<AlertModification> {
  const result = await _getHistorySend(context, scope, alertId, options);
  return _getHistoryDeserialize(result);
}

export function _changeStateSend(
  context: Client,
  scope: string,
  alertId: string,
  newState: AlertState,
  options: AlertsChangeStateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{scope}/providers/Microsoft.AlertsManagement/alerts/{alertId}/changestate{?api%2Dversion,newState}",
    {
      scope: scope,
      alertId: alertId,
      "api%2Dversion": context.apiVersion ?? "2025-05-25-preview",
      newState: newState,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["comment"] ? options["comment"] : commentsSerializer(options["comment"]),
  });
}

export async function _changeStateDeserialize(result: PathUncheckedResponse): Promise<Alert> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = alertsManagementErrorResponseDeserializer(result.body);

    throw error;
  }

  return alertDeserializer(result.body);
}

/** Change the state of an alert. If scope is a deleted resource then please use scope as parent resource of the delete resource. For example if my alert id is '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Compute/virtualMachines/vm1/providers/Microsoft.AlertsManagement/alerts/{alertId}' and 'vm1' is deleted then if you want to change state of this particular alert then use parent resource of scope. So in this example change state call will look like this: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.AlertsManagement/alerts/{alertId}'. */
export async function changeState(
  context: Client,
  scope: string,
  alertId: string,
  newState: AlertState,
  options: AlertsChangeStateOptionalParams = { requestOptions: {} },
): Promise<Alert> {
  const result = await _changeStateSend(context, scope, alertId, newState, options);
  return _changeStateDeserialize(result);
}

export function _getAllSend(
  context: Client,
  scope: string,
  options: AlertsGetAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{scope}/providers/Microsoft.AlertsManagement/alerts{?api%2Dversion,targetResource,targetResourceType,targetResourceGroup,monitorService,monitorCondition,severity,alertState,alertRule,smartGroupId,includeContext,includeEgressConfig,pageCount,sortBy,sortOrder,select,timeRange,customTimeRange}",
    {
      scope: scope,
      "api%2Dversion": context.apiVersion ?? "2025-05-25-preview",
      targetResource: options?.targetResource,
      targetResourceType: options?.targetResourceType,
      targetResourceGroup: options?.targetResourceGroup,
      monitorService: options?.monitorService,
      monitorCondition: options?.monitorCondition,
      severity: options?.severity,
      alertState: options?.alertState,
      alertRule: options?.alertRule,
      smartGroupId: options?.smartGroupId,
      includeContext: options?.includeContext,
      includeEgressConfig: options?.includeEgressConfig,
      pageCount: options?.pageCount,
      sortBy: options?.sortBy,
      sortOrder: options?.sortOrder,
      select: options?.select,
      timeRange: options?.timeRange,
      customTimeRange: options?.customTimeRange,
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

export async function _getAllDeserialize(result: PathUncheckedResponse): Promise<_AlertsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = alertsManagementErrorResponseDeserializer(result.body);

    throw error;
  }

  return _alertsListDeserializer(result.body);
}

/** List all existing alerts, where the results can be filtered on the basis of multiple parameters (e.g. time range). The results can then be sorted on the basis specific fields, with the default being lastModifiedDateTime. */
export function getAll(
  context: Client,
  scope: string,
  options: AlertsGetAllOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Alert> {
  return buildPagedAsyncIterator(
    context,
    () => _getAllSend(context, scope, options),
    _getAllDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-05-25-preview",
    },
  );
}

export function _getByIdSend(
  context: Client,
  scope: string,
  alertId: string,
  options: AlertsGetByIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{scope}/providers/Microsoft.AlertsManagement/alerts/{alertId}{?api%2Dversion}",
    {
      scope: scope,
      alertId: alertId,
      "api%2Dversion": context.apiVersion ?? "2025-05-25-preview",
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

export async function _getByIdDeserialize(result: PathUncheckedResponse): Promise<Alert> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = alertsManagementErrorResponseDeserializer(result.body);

    throw error;
  }

  return alertDeserializer(result.body);
}

/** Get information related to a specific alert. If scope is a deleted resource then please use scope as parent resource of the delete resource. For example if my alert id is '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Compute/virtualMachines/vm1/providers/Microsoft.AlertsManagement/alerts/{alertId}' and 'vm1' is deleted then if you want to get alert by id then use parent resource of scope. So in this example get alert by id call will look like this: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.AlertsManagement/alerts/{alertId}'. */
export async function getById(
  context: Client,
  scope: string,
  alertId: string,
  options: AlertsGetByIdOptionalParams = { requestOptions: {} },
): Promise<Alert> {
  const result = await _getByIdSend(context, scope, alertId, options);
  return _getByIdDeserialize(result);
}

export function _getAllTenantSend(
  context: Client,
  options: AlertsGetAllTenantOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.AlertsManagement/alerts{?api%2Dversion,targetResource,targetResourceType,targetResourceGroup,monitorService,monitorCondition,severity,alertState,alertRule,smartGroupId,includeContext,includeEgressConfig,pageCount,sortBy,sortOrder,select,timeRange,customTimeRange}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-05-25-preview",
      targetResource: options?.targetResource,
      targetResourceType: options?.targetResourceType,
      targetResourceGroup: options?.targetResourceGroup,
      monitorService: options?.monitorService,
      monitorCondition: options?.monitorCondition,
      severity: options?.severity,
      alertState: options?.alertState,
      alertRule: options?.alertRule,
      smartGroupId: options?.smartGroupId,
      includeContext: options?.includeContext,
      includeEgressConfig: options?.includeEgressConfig,
      pageCount: options?.pageCount,
      sortBy: options?.sortBy,
      sortOrder: options?.sortOrder,
      select: options?.select,
      timeRange: options?.timeRange,
      customTimeRange: options?.customTimeRange,
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

export async function _getAllTenantDeserialize(
  result: PathUncheckedResponse,
): Promise<_AlertsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = alertsManagementErrorResponseDeserializer(result.body);

    throw error;
  }

  return _alertsListDeserializer(result.body);
}

/** List all existing alerts, where the results can be filtered on the basis of multiple parameters (e.g. time range). The results can then be sorted on the basis specific fields, with the default being lastModifiedDateTime. */
export function getAllTenant(
  context: Client,
  options: AlertsGetAllTenantOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Alert> {
  return buildPagedAsyncIterator(
    context,
    () => _getAllTenantSend(context, options),
    _getAllTenantDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-05-25-preview",
    },
  );
}

export function _changeStateTenantSend(
  context: Client,
  alertId: string,
  newState: AlertState,
  options: AlertsChangeStateTenantOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.AlertsManagement/alerts/{alertId}/changestate{?api%2Dversion,newState}",
    {
      alertId: alertId,
      "api%2Dversion": context.apiVersion ?? "2025-05-25-preview",
      newState: newState,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["comment"] ? options["comment"] : commentsSerializer(options["comment"]),
  });
}

export async function _changeStateTenantDeserialize(result: PathUncheckedResponse): Promise<Alert> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = alertsManagementErrorResponseDeserializer(result.body);

    throw error;
  }

  return alertDeserializer(result.body);
}

/** Change the state of an alert. */
export async function changeStateTenant(
  context: Client,
  alertId: string,
  newState: AlertState,
  options: AlertsChangeStateTenantOptionalParams = { requestOptions: {} },
): Promise<Alert> {
  const result = await _changeStateTenantSend(context, alertId, newState, options);
  return _changeStateTenantDeserialize(result);
}

export function _getHistoryTenantSend(
  context: Client,
  alertId: string,
  options: AlertsGetHistoryTenantOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.AlertsManagement/alerts/{alertId}/history{?api%2Dversion}",
    {
      alertId: alertId,
      "api%2Dversion": context.apiVersion ?? "2025-05-25-preview",
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

export async function _getHistoryTenantDeserialize(
  result: PathUncheckedResponse,
): Promise<AlertModification> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = alertsManagementErrorResponseDeserializer(result.body);

    throw error;
  }

  return alertModificationDeserializer(result.body);
}

/** Get the history of an alert, which captures any monitor condition changes (Fired/Resolved), alert state changes (New/Acknowledged/Closed) and applied action rules for that particular alert. */
export async function getHistoryTenant(
  context: Client,
  alertId: string,
  options: AlertsGetHistoryTenantOptionalParams = { requestOptions: {} },
): Promise<AlertModification> {
  const result = await _getHistoryTenantSend(context, alertId, options);
  return _getHistoryTenantDeserialize(result);
}

export function _getByIdTenantSend(
  context: Client,
  alertId: string,
  options: AlertsGetByIdTenantOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.AlertsManagement/alerts/{alertId}{?api%2Dversion}",
    {
      alertId: alertId,
      "api%2Dversion": context.apiVersion ?? "2025-05-25-preview",
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

export async function _getByIdTenantDeserialize(result: PathUncheckedResponse): Promise<Alert> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = alertsManagementErrorResponseDeserializer(result.body);

    throw error;
  }

  return alertDeserializer(result.body);
}

/** Get information related to a specific alert. */
export async function getByIdTenant(
  context: Client,
  alertId: string,
  options: AlertsGetByIdTenantOptionalParams = { requestOptions: {} },
): Promise<Alert> {
  const result = await _getByIdTenantSend(context, alertId, options);
  return _getByIdTenantDeserialize(result);
}
