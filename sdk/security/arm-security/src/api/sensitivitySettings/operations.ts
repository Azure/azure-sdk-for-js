// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { commonCloudErrorDeserializer } from "../../models/common/models.js";
import type {
  SensitivitySettingsAPIGetSensitivitySettingsResponse,
  SensitivitySettingsAPIUpdateSensitivitySettingsRequest,
  _SensitivitySettingsAPIGetSensitivitySettingsListResponse,
} from "../../models/sensitivitySettingsAPI/models.js";
import {
  sensitivitySettingsAPIGetSensitivitySettingsResponseDeserializer,
  sensitivitySettingsAPIUpdateSensitivitySettingsRequestSerializer,
  _sensitivitySettingsAPIGetSensitivitySettingsListResponseDeserializer,
} from "../../models/sensitivitySettingsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SensitivitySettingsListOptionalParams,
  SensitivitySettingsCreateOrUpdateOptionalParams,
  SensitivitySettingsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: SensitivitySettingsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Security/sensitivitySettings{?api%2Dversion}",
    {
      "api%2Dversion": "2023-02-15-preview",
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
): Promise<_SensitivitySettingsAPIGetSensitivitySettingsListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return _sensitivitySettingsAPIGetSensitivitySettingsListResponseDeserializer(result.body);
}

/** Gets a list with a single sensitivity settings resource */
export function list(
  context: Client,
  options: SensitivitySettingsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SensitivitySettingsAPIGetSensitivitySettingsResponse> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", apiVersion: "2023-02-15-preview" },
  );
}

export function _createOrUpdateSend(
  context: Client,
  sensitivitySettings: SensitivitySettingsAPIUpdateSensitivitySettingsRequest,
  options: SensitivitySettingsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Security/sensitivitySettings/current{?api%2Dversion}",
    {
      "api%2Dversion": "2023-02-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: sensitivitySettingsAPIUpdateSensitivitySettingsRequestSerializer(sensitivitySettings),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SensitivitySettingsAPIGetSensitivitySettingsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return sensitivitySettingsAPIGetSensitivitySettingsResponseDeserializer(result.body);
}

/** Create or update data sensitivity settings for sensitive data discovery */
export async function createOrUpdate(
  context: Client,
  sensitivitySettings: SensitivitySettingsAPIUpdateSensitivitySettingsRequest,
  options: SensitivitySettingsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<SensitivitySettingsAPIGetSensitivitySettingsResponse> {
  const result = await _createOrUpdateSend(context, sensitivitySettings, options);
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  options: SensitivitySettingsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Security/sensitivitySettings/current{?api%2Dversion}",
    {
      "api%2Dversion": "2023-02-15-preview",
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
): Promise<SensitivitySettingsAPIGetSensitivitySettingsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return sensitivitySettingsAPIGetSensitivitySettingsResponseDeserializer(result.body);
}

/** Gets data sensitivity settings for sensitive data discovery */
export async function get(
  context: Client,
  options: SensitivitySettingsGetOptionalParams = { requestOptions: {} },
): Promise<SensitivitySettingsAPIGetSensitivitySettingsResponse> {
  const result = await _getSend(context, options);
  return _getDeserialize(result);
}
