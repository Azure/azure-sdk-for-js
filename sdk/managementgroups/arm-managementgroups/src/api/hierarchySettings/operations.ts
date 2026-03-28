// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagementGroupsAPIContext as Client } from "../index.js";
import type {
  HierarchySettingsList,
  HierarchySettings,
  CreateOrUpdateSettingsRequest,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  hierarchySettingsListDeserializer,
  hierarchySettingsDeserializer,
  createOrUpdateSettingsRequestSerializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  HierarchySettingsDeleteOptionalParams,
  HierarchySettingsUpdateOptionalParams,
  HierarchySettingsCreateOrUpdateOptionalParams,
  HierarchySettingsGetOptionalParams,
  HierarchySettingsListOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _$deleteSend(
  context: Client,
  groupId: string,
  options: HierarchySettingsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{groupId}/settings/default{?api%2Dversion}",
    {
      groupId: groupId,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes the hierarchy settings defined at the Management Group level. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  groupId: string,
  options: HierarchySettingsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, groupId, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  groupId: string,
  createTenantSettingsRequest: CreateOrUpdateSettingsRequest,
  options: HierarchySettingsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{groupId}/settings/default{?api%2Dversion}",
    {
      groupId: groupId,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: createOrUpdateSettingsRequestSerializer(createTenantSettingsRequest),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<HierarchySettings> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return hierarchySettingsDeserializer(result.body);
}

/** Updates the hierarchy settings defined at the Management Group level. */
export async function update(
  context: Client,
  groupId: string,
  createTenantSettingsRequest: CreateOrUpdateSettingsRequest,
  options: HierarchySettingsUpdateOptionalParams = { requestOptions: {} },
): Promise<HierarchySettings> {
  const result = await _updateSend(context, groupId, createTenantSettingsRequest, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  groupId: string,
  createTenantSettingsRequest: CreateOrUpdateSettingsRequest,
  options: HierarchySettingsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{groupId}/settings/default{?api%2Dversion}",
    {
      groupId: groupId,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: createOrUpdateSettingsRequestSerializer(createTenantSettingsRequest),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<HierarchySettings> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return hierarchySettingsDeserializer(result.body);
}

/** Creates or updates the hierarchy settings defined at the Management Group level. */
export async function createOrUpdate(
  context: Client,
  groupId: string,
  createTenantSettingsRequest: CreateOrUpdateSettingsRequest,
  options: HierarchySettingsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<HierarchySettings> {
  const result = await _createOrUpdateSend(context, groupId, createTenantSettingsRequest, options);
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  groupId: string,
  options: HierarchySettingsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{groupId}/settings/default{?api%2Dversion}",
    {
      groupId: groupId,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<HierarchySettings> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return hierarchySettingsDeserializer(result.body);
}

/** Gets the hierarchy settings defined at the Management Group level. Settings can only be set on the root Management Group of the hierarchy. */
export async function get(
  context: Client,
  groupId: string,
  options: HierarchySettingsGetOptionalParams = { requestOptions: {} },
): Promise<HierarchySettings> {
  const result = await _getSend(context, groupId, options);
  return _getDeserialize(result);
}

export function _listSend(
  context: Client,
  groupId: string,
  options: HierarchySettingsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{groupId}/settings{?api%2Dversion}",
    {
      groupId: groupId,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<HierarchySettingsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return hierarchySettingsListDeserializer(result.body);
}

/** Gets all the hierarchy settings defined at the Management Group level. Settings can only be set on the root Management Group of the hierarchy. */
export async function list(
  context: Client,
  groupId: string,
  options: HierarchySettingsListOptionalParams = { requestOptions: {} },
): Promise<HierarchySettingsList> {
  const result = await _listSend(context, groupId, options);
  return _listDeserialize(result);
}
