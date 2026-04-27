// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type {
  AutoProvisioningSetting,
  _AutoProvisioningSettingList,
} from "../../models/legacySettingsAPI/models.js";
import {
  autoProvisioningSettingSerializer,
  autoProvisioningSettingDeserializer,
  _autoProvisioningSettingListDeserializer,
} from "../../models/legacySettingsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AutoProvisioningSettingsListOptionalParams,
  AutoProvisioningSettingsCreateOptionalParams,
  AutoProvisioningSettingsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: AutoProvisioningSettingsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/autoProvisioningSettings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2017-08-01-preview",
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
): Promise<_AutoProvisioningSettingList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _autoProvisioningSettingListDeserializer(result.body);
}

/** Exposes the auto provisioning settings of the subscriptions */
export function list(
  context: Client,
  options: AutoProvisioningSettingsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AutoProvisioningSetting> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2017-08-01-preview" },
  );
}

export function _createSend(
  context: Client,
  settingName: string,
  setting: AutoProvisioningSetting,
  options: AutoProvisioningSettingsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/autoProvisioningSettings/{settingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      settingName: settingName,
      "api%2Dversion": "2017-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: autoProvisioningSettingSerializer(setting),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<AutoProvisioningSetting> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return autoProvisioningSettingDeserializer(result.body);
}

/** Details of a specific setting */
export async function create(
  context: Client,
  settingName: string,
  setting: AutoProvisioningSetting,
  options: AutoProvisioningSettingsCreateOptionalParams = { requestOptions: {} },
): Promise<AutoProvisioningSetting> {
  const result = await _createSend(context, settingName, setting, options);
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  settingName: string,
  options: AutoProvisioningSettingsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/autoProvisioningSettings/{settingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      settingName: settingName,
      "api%2Dversion": "2017-08-01-preview",
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
): Promise<AutoProvisioningSetting> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return autoProvisioningSettingDeserializer(result.body);
}

/** Details of a specific setting */
export async function get(
  context: Client,
  settingName: string,
  options: AutoProvisioningSettingsGetOptionalParams = { requestOptions: {} },
): Promise<AutoProvisioningSetting> {
  const result = await _getSend(context, settingName, options);
  return _getDeserialize(result);
}
