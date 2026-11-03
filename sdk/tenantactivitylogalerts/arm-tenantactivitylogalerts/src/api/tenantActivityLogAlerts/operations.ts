// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TenantActivityLogAlertsManagementContext as Client } from "../index.js";
import type {
  _TenantAlertRuleList,
  TenantActivityLogAlertResource,
  TenantAlertRulePatchObject,
} from "../../models/models.js";
import {
  _tenantAlertRuleListDeserializer,
  tenantActivityLogAlertResourceSerializer,
  tenantActivityLogAlertResourceDeserializer,
  errorResponseDeserializer,
  tenantAlertRulePatchObjectSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  TenantActivityLogAlertsListByManagementGroupOptionalParams,
  TenantActivityLogAlertsDeleteOptionalParams,
  TenantActivityLogAlertsUpdateOptionalParams,
  TenantActivityLogAlertsCreateOrUpdateOptionalParams,
  TenantActivityLogAlertsGetOptionalParams,
  TenantActivityLogAlertsListByTenantOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByManagementGroupSend(
  context: Client,
  managementGroupName: string,
  options: TenantActivityLogAlertsListByManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupName}/providers/Microsoft.AlertsManagement/tenantActivityLogAlerts{?api%2Dversion}",
    {
      managementGroupName: managementGroupName,
      "api%2Dversion": context.apiVersion ?? "2023-04-01-preview",
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

export async function _listByManagementGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_TenantAlertRuleList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _tenantAlertRuleListDeserializer(result.body);
}

/** Get a list of all Tenant Activity Log Alert rules in a management group. */
export function listByManagementGroup(
  context: Client,
  managementGroupName: string,
  options: TenantActivityLogAlertsListByManagementGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TenantActivityLogAlertResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByManagementGroupSend(context, managementGroupName, options),
    _listByManagementGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2023-04-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  managementGroupName: string,
  alertRuleName: string,
  options: TenantActivityLogAlertsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupName}/providers/Microsoft.AlertsManagement/tenantActivityLogAlerts/{alertRuleName}{?api%2Dversion}",
    {
      managementGroupName: managementGroupName,
      alertRuleName: alertRuleName,
      "api%2Dversion": context.apiVersion ?? "2023-04-01-preview",
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete a Tenant Activity Log Alert rule. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  managementGroupName: string,
  alertRuleName: string,
  options: TenantActivityLogAlertsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, managementGroupName, alertRuleName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  managementGroupName: string,
  alertRuleName: string,
  tenantActivityLogAlertRulePatch: TenantAlertRulePatchObject,
  options: TenantActivityLogAlertsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupName}/providers/Microsoft.AlertsManagement/tenantActivityLogAlerts/{alertRuleName}{?api%2Dversion}",
    {
      managementGroupName: managementGroupName,
      alertRuleName: alertRuleName,
      "api%2Dversion": context.apiVersion ?? "2023-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: tenantAlertRulePatchObjectSerializer(tenantActivityLogAlertRulePatch),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<TenantActivityLogAlertResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return tenantActivityLogAlertResourceDeserializer(result.body);
}

/** Updates 'tags' and 'enabled' fields in an existing Tenant Alert rule. This method is used to update the Alert rule tags, and to enable or disable the Alert rule. To update other fields use CreateOrUpdate operation. */
export async function update(
  context: Client,
  managementGroupName: string,
  alertRuleName: string,
  tenantActivityLogAlertRulePatch: TenantAlertRulePatchObject,
  options: TenantActivityLogAlertsUpdateOptionalParams = { requestOptions: {} },
): Promise<TenantActivityLogAlertResource> {
  const result = await _updateSend(
    context,
    managementGroupName,
    alertRuleName,
    tenantActivityLogAlertRulePatch,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  managementGroupName: string,
  alertRuleName: string,
  tenantActivityLogAlertRule: TenantActivityLogAlertResource,
  options: TenantActivityLogAlertsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupName}/providers/Microsoft.AlertsManagement/tenantActivityLogAlerts/{alertRuleName}{?api%2Dversion}",
    {
      managementGroupName: managementGroupName,
      alertRuleName: alertRuleName,
      "api%2Dversion": context.apiVersion ?? "2023-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: tenantActivityLogAlertResourceSerializer(tenantActivityLogAlertRule),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<TenantActivityLogAlertResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return tenantActivityLogAlertResourceDeserializer(result.body);
}

/** Create a new Tenant Activity Log Alert rule or update an existing one. */
export async function createOrUpdate(
  context: Client,
  managementGroupName: string,
  alertRuleName: string,
  tenantActivityLogAlertRule: TenantActivityLogAlertResource,
  options: TenantActivityLogAlertsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<TenantActivityLogAlertResource> {
  const result = await _createOrUpdateSend(
    context,
    managementGroupName,
    alertRuleName,
    tenantActivityLogAlertRule,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  managementGroupName: string,
  alertRuleName: string,
  options: TenantActivityLogAlertsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupName}/providers/Microsoft.AlertsManagement/tenantActivityLogAlerts/{alertRuleName}{?api%2Dversion}",
    {
      managementGroupName: managementGroupName,
      alertRuleName: alertRuleName,
      "api%2Dversion": context.apiVersion ?? "2023-04-01-preview",
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
): Promise<TenantActivityLogAlertResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return tenantActivityLogAlertResourceDeserializer(result.body);
}

/** Get Tenant Activity Log Alert rule. */
export async function get(
  context: Client,
  managementGroupName: string,
  alertRuleName: string,
  options: TenantActivityLogAlertsGetOptionalParams = { requestOptions: {} },
): Promise<TenantActivityLogAlertResource> {
  const result = await _getSend(context, managementGroupName, alertRuleName, options);
  return _getDeserialize(result);
}

export function _listByTenantSend(
  context: Client,
  options: TenantActivityLogAlertsListByTenantOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.AlertsManagement/tenantActivityLogAlerts{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2023-04-01-preview",
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

export async function _listByTenantDeserialize(
  result: PathUncheckedResponse,
): Promise<_TenantAlertRuleList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _tenantAlertRuleListDeserializer(result.body);
}

/** Get a list of all Tenant Activity Log Alert rules in the tenant. */
export function listByTenant(
  context: Client,
  options: TenantActivityLogAlertsListByTenantOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TenantActivityLogAlertResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByTenantSend(context, options),
    _listByTenantDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2023-04-01-preview",
    },
  );
}
