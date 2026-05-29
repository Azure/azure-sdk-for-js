// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  settingUnionSerializer,
  settingUnionDeserializer,
  SettingUnion,
  SettingType,
  SettingsListResult,
  settingsListResultDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  SettingsListOptionalParams,
  SettingsDeleteByScopeOptionalParams,
  SettingsCreateOrUpdateByScopeOptionalParams,
  SettingsGetByScopeOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  scope: string,
  options: SettingsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{scope}/providers/Microsoft.CostManagement/settings{?api%2Dversion}",
    {
      scope: scope,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<SettingsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return settingsListResultDeserializer(result.body);
}

/** List all cost management settings in the requested scope. */
export async function list(
  context: Client,
  scope: string,
  options: SettingsListOptionalParams = { requestOptions: {} },
): Promise<SettingsListResult> {
  const result = await _listSend(context, scope, options);
  return _listDeserialize(result);
}

export function _deleteByScopeSend(
  context: Client,
  scope: string,
  typeParam: SettingType,
  options: SettingsDeleteByScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{scope}/providers/Microsoft.CostManagement/settings/{type}{?api%2Dversion}",
    {
      scope: scope,
      type: typeParam,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteByScopeDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete a setting within the given scope. */
export async function deleteByScope(
  context: Client,
  scope: string,
  typeParam: SettingType,
  options: SettingsDeleteByScopeOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteByScopeSend(context, scope, typeParam, options);
  return _deleteByScopeDeserialize(result);
}

export function _createOrUpdateByScopeSend(
  context: Client,
  scope: string,
  typeParam: SettingType,
  setting: SettingUnion,
  options: SettingsCreateOrUpdateByScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{scope}/providers/Microsoft.CostManagement/settings/{type}{?api%2Dversion}",
    {
      scope: scope,
      type: typeParam,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: settingUnionSerializer(setting),
  });
}

export async function _createOrUpdateByScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<SettingUnion> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return settingUnionDeserializer(result.body);
}

/** Create or update a setting within the given scope. */
export async function createOrUpdateByScope(
  context: Client,
  scope: string,
  typeParam: SettingType,
  setting: SettingUnion,
  options: SettingsCreateOrUpdateByScopeOptionalParams = { requestOptions: {} },
): Promise<SettingUnion> {
  const result = await _createOrUpdateByScopeSend(context, scope, typeParam, setting, options);
  return _createOrUpdateByScopeDeserialize(result);
}

export function _getByScopeSend(
  context: Client,
  scope: string,
  typeParam: SettingType,
  options: SettingsGetByScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{scope}/providers/Microsoft.CostManagement/settings/{type}{?api%2Dversion}",
    {
      scope: scope,
      type: typeParam,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
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

export async function _getByScopeDeserialize(result: PathUncheckedResponse): Promise<SettingUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return settingUnionDeserializer(result.body);
}

/** Get the setting from the given scope by name. */
export async function getByScope(
  context: Client,
  scope: string,
  typeParam: SettingType,
  options: SettingsGetByScopeOptionalParams = { requestOptions: {} },
): Promise<SettingUnion> {
  const result = await _getByScopeSend(context, scope, typeParam, options);
  return _getByScopeDeserialize(result);
}
