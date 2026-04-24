// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import type { AdvancedThreatProtectionSetting } from "../../models/atpSettingsAPI/models.js";
import {
  advancedThreatProtectionSettingSerializer,
  advancedThreatProtectionSettingDeserializer,
} from "../../models/atpSettingsAPI/models.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AdvancedThreatProtectionCreateOptionalParams,
  AdvancedThreatProtectionGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _createSend(
  context: Client,
  resourceId: string,
  advancedThreatProtectionSetting: AdvancedThreatProtectionSetting,
  options: AdvancedThreatProtectionCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}/providers/Microsoft.Security/advancedThreatProtectionSettings/{settingName}{?api%2Dversion}",
    {
      resourceId: resourceId,
      settingName: "current",
      "api%2Dversion": "2019-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: advancedThreatProtectionSettingSerializer(advancedThreatProtectionSetting),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<AdvancedThreatProtectionSetting> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return advancedThreatProtectionSettingDeserializer(result.body);
}

/** Creates or updates the Advanced Threat Protection settings on a specified resource. */
export async function create(
  context: Client,
  resourceId: string,
  advancedThreatProtectionSetting: AdvancedThreatProtectionSetting,
  options: AdvancedThreatProtectionCreateOptionalParams = { requestOptions: {} },
): Promise<AdvancedThreatProtectionSetting> {
  const result = await _createSend(context, resourceId, advancedThreatProtectionSetting, options);
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceId: string,
  options: AdvancedThreatProtectionGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}/providers/Microsoft.Security/advancedThreatProtectionSettings/{settingName}{?api%2Dversion}",
    {
      resourceId: resourceId,
      settingName: "current",
      "api%2Dversion": "2019-01-01",
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
): Promise<AdvancedThreatProtectionSetting> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return advancedThreatProtectionSettingDeserializer(result.body);
}

/** Gets the Advanced Threat Protection settings for the specified resource. */
export async function get(
  context: Client,
  resourceId: string,
  options: AdvancedThreatProtectionGetOptionalParams = { requestOptions: {} },
): Promise<AdvancedThreatProtectionSetting> {
  const result = await _getSend(context, resourceId, options);
  return _getDeserialize(result);
}
