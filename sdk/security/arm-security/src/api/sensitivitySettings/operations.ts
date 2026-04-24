// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type {
  GetSensitivitySettingsResponse,
  UpdateSensitivitySettingsRequest,
  _GetSensitivitySettingsListResponse,
} from "../../models/sensitivitySettingsAPI/models.js";
import {
  getSensitivitySettingsResponseDeserializer,
  updateSensitivitySettingsRequestSerializer,
  _getSensitivitySettingsListResponseDeserializer,
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
): Promise<_GetSensitivitySettingsListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _getSensitivitySettingsListResponseDeserializer(result.body);
}

/** Gets a list with a single sensitivity settings resource */
export function list(
  context: Client,
  options: SensitivitySettingsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GetSensitivitySettingsResponse> {
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
  sensitivitySettings: UpdateSensitivitySettingsRequest,
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
    body: updateSensitivitySettingsRequestSerializer(sensitivitySettings),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<GetSensitivitySettingsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return getSensitivitySettingsResponseDeserializer(result.body);
}

/** Create or update data sensitivity settings for sensitive data discovery */
export async function createOrUpdate(
  context: Client,
  sensitivitySettings: UpdateSensitivitySettingsRequest,
  options: SensitivitySettingsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<GetSensitivitySettingsResponse> {
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
): Promise<GetSensitivitySettingsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return getSensitivitySettingsResponseDeserializer(result.body);
}

/** Gets data sensitivity settings for sensitive data discovery */
export async function get(
  context: Client,
  options: SensitivitySettingsGetOptionalParams = { requestOptions: {} },
): Promise<GetSensitivitySettingsResponse> {
  const result = await _getSend(context, options);
  return _getDeserialize(result);
}
