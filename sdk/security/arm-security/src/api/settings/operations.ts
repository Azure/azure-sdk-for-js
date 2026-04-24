// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import type { CommonSettingName } from "../../models/common/models.js";
import { commonCloudErrorDeserializer } from "../../models/common/models.js";
import type {
  SettingsAPISettingUnion,
  _SettingsAPISettingsList,
} from "../../models/settingsAPI/models.js";
import {
  settingsAPISettingUnionSerializer,
  settingsAPISettingUnionDeserializer,
  _settingsAPISettingsListDeserializer,
} from "../../models/settingsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SettingsListOptionalParams,
  SettingsUpdateOptionalParams,
  SettingsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: SettingsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/settings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2022-05-01",
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
): Promise<_SettingsAPISettingsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return _settingsAPISettingsListDeserializer(result.body);
}

/** Settings about different configurations in Microsoft Defender for Cloud */
export function list(
  context: Client,
  options: SettingsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SettingsAPISettingUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2022-05-01" },
  );
}

export function _updateSend(
  context: Client,
  settingName: CommonSettingName,
  setting: SettingsAPISettingUnion,
  options: SettingsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/settings/{settingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      settingName: settingName,
      "api%2Dversion": "2022-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: settingsAPISettingUnionSerializer(setting),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<SettingsAPISettingUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return settingsAPISettingUnionDeserializer(result.body);
}

/** updating settings about different configurations in Microsoft Defender for Cloud */
export async function update(
  context: Client,
  settingName: CommonSettingName,
  setting: SettingsAPISettingUnion,
  options: SettingsUpdateOptionalParams = { requestOptions: {} },
): Promise<SettingsAPISettingUnion> {
  const result = await _updateSend(context, settingName, setting, options);
  return _updateDeserialize(result);
}

export function _getSend(
  context: Client,
  settingName: CommonSettingName,
  options: SettingsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/settings/{settingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      settingName: settingName,
      "api%2Dversion": "2022-05-01",
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
): Promise<SettingsAPISettingUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return settingsAPISettingUnionDeserializer(result.body);
}

/** Settings of different configurations in Microsoft Defender for Cloud */
export async function get(
  context: Client,
  settingName: CommonSettingName,
  options: SettingsGetOptionalParams = { requestOptions: {} },
): Promise<SettingsAPISettingUnion> {
  const result = await _getSend(context, settingName, options);
  return _getDeserialize(result);
}
