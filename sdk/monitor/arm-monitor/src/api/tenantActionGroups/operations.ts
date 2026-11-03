// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext as Client } from "../index.js";
import { errorResponseDeserializer } from "../../models/microsoft/common/models.js";
import type {
  TenantActionGroupResource,
  TenantActionGroupPatchBody,
  _TenantActionGroupList,
} from "../../models/tenantActionGroups/models.js";
import {
  tenantActionGroupResourceSerializer,
  tenantActionGroupResourceDeserializer,
  tenantActionGroupPatchBodySerializer,
  _tenantActionGroupListDeserializer,
} from "../../models/tenantActionGroups/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  TenantActionGroupsListByManagementGroupIdOptionalParams,
  TenantActionGroupsDeleteOptionalParams,
  TenantActionGroupsUpdateOptionalParams,
  TenantActionGroupsCreateOrUpdateOptionalParams,
  TenantActionGroupsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByManagementGroupIdSend(
  context: Client,
  managementGroupId: string,
  xMsClientTenantId: string,
  options: TenantActionGroupsListByManagementGroupIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Insights/tenantActionGroups{?api%2Dversion}",
    {
      managementGroupId: managementGroupId,
      "api%2Dversion": "2023-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "x-ms-client-tenant-id": xMsClientTenantId,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listByManagementGroupIdDeserialize(
  result: PathUncheckedResponse,
): Promise<_TenantActionGroupList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _tenantActionGroupListDeserializer(result.body);
}

/** Get a list of all tenant action groups in a management group. */
export function listByManagementGroupId(
  context: Client,
  managementGroupId: string,
  xMsClientTenantId: string,
  options: TenantActionGroupsListByManagementGroupIdOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TenantActionGroupResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByManagementGroupIdSend(context, managementGroupId, xMsClientTenantId, options),
    _listByManagementGroupIdDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2023-05-01-preview" },
  );
}

export function _$deleteSend(
  context: Client,
  managementGroupId: string,
  tenantActionGroupName: string,
  xMsClientTenantId: string,
  options: TenantActionGroupsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Insights/tenantActionGroups/{tenantActionGroupName}{?api%2Dversion}",
    {
      managementGroupId: managementGroupId,
      tenantActionGroupName: tenantActionGroupName,
      "api%2Dversion": "2023-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { "x-ms-client-tenant-id": xMsClientTenantId, ...options.requestOptions?.headers },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a tenant action group. */
export async function $delete(
  context: Client,
  managementGroupId: string,
  tenantActionGroupName: string,
  xMsClientTenantId: string,
  options: TenantActionGroupsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    managementGroupId,
    tenantActionGroupName,
    xMsClientTenantId,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  managementGroupId: string,
  tenantActionGroupName: string,
  xMsClientTenantId: string,
  tenantActionGroupPatch: TenantActionGroupPatchBody,
  options: TenantActionGroupsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Insights/tenantActionGroups/{tenantActionGroupName}{?api%2Dversion}",
    {
      managementGroupId: managementGroupId,
      tenantActionGroupName: tenantActionGroupName,
      "api%2Dversion": "2023-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "x-ms-client-tenant-id": xMsClientTenantId,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: tenantActionGroupPatchBodySerializer(tenantActionGroupPatch),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<TenantActionGroupResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return tenantActionGroupResourceDeserializer(result.body);
}

/** Updates an existing tenant action group's tags. To update other fields use the CreateOrUpdate method. */
export async function update(
  context: Client,
  managementGroupId: string,
  tenantActionGroupName: string,
  xMsClientTenantId: string,
  tenantActionGroupPatch: TenantActionGroupPatchBody,
  options: TenantActionGroupsUpdateOptionalParams = { requestOptions: {} },
): Promise<TenantActionGroupResource> {
  const result = await _updateSend(
    context,
    managementGroupId,
    tenantActionGroupName,
    xMsClientTenantId,
    tenantActionGroupPatch,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  managementGroupId: string,
  tenantActionGroupName: string,
  xMsClientTenantId: string,
  actionGroup: TenantActionGroupResource,
  options: TenantActionGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Insights/tenantActionGroups/{tenantActionGroupName}{?api%2Dversion}",
    {
      managementGroupId: managementGroupId,
      tenantActionGroupName: tenantActionGroupName,
      "api%2Dversion": "2023-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "x-ms-client-tenant-id": xMsClientTenantId,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: tenantActionGroupResourceSerializer(actionGroup),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<TenantActionGroupResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return tenantActionGroupResourceDeserializer(result.body);
}

/** Create a new tenant action group or update an existing one. */
export async function createOrUpdate(
  context: Client,
  managementGroupId: string,
  tenantActionGroupName: string,
  xMsClientTenantId: string,
  actionGroup: TenantActionGroupResource,
  options: TenantActionGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<TenantActionGroupResource> {
  const result = await _createOrUpdateSend(
    context,
    managementGroupId,
    tenantActionGroupName,
    xMsClientTenantId,
    actionGroup,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  managementGroupId: string,
  tenantActionGroupName: string,
  xMsClientTenantId: string,
  options: TenantActionGroupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Insights/tenantActionGroups/{tenantActionGroupName}{?api%2Dversion}",
    {
      managementGroupId: managementGroupId,
      tenantActionGroupName: tenantActionGroupName,
      "api%2Dversion": "2023-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "x-ms-client-tenant-id": xMsClientTenantId,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<TenantActionGroupResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return tenantActionGroupResourceDeserializer(result.body);
}

/** Get a tenant action group. */
export async function get(
  context: Client,
  managementGroupId: string,
  tenantActionGroupName: string,
  xMsClientTenantId: string,
  options: TenantActionGroupsGetOptionalParams = { requestOptions: {} },
): Promise<TenantActionGroupResource> {
  const result = await _getSend(
    context,
    managementGroupId,
    tenantActionGroupName,
    xMsClientTenantId,
    options,
  );
  return _getDeserialize(result);
}
