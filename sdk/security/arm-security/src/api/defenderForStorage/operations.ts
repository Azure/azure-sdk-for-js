// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import type { SettingName } from "../../models/common/models.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type {
  DefenderForStorageSetting,
  _DefenderForStorageSettingList,
  MalwareScan,
} from "../../models/defenderForStorageAPI/models.js";
import {
  defenderForStorageSettingSerializer,
  defenderForStorageSettingDeserializer,
  _defenderForStorageSettingListDeserializer,
  malwareScanDeserializer,
} from "../../models/defenderForStorageAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DefenderForStorageGetMalwareScanOptionalParams,
  DefenderForStorageCancelMalwareScanOptionalParams,
  DefenderForStorageStartMalwareScanOptionalParams,
  DefenderForStorageListOptionalParams,
  DefenderForStorageCreateOptionalParams,
  DefenderForStorageGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getMalwareScanSend(
  context: Client,
  resourceId: string,
  settingName: SettingName,
  scanId: string,
  options: DefenderForStorageGetMalwareScanOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}/providers/Microsoft.Security/defenderForStorageSettings/{settingName}/malwareScans/{scanId}{?api%2Dversion}",
    {
      resourceId: resourceId,
      settingName: settingName,
      scanId: scanId,
      "api%2Dversion": "2025-09-01-preview",
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

export async function _getMalwareScanDeserialize(
  result: PathUncheckedResponse,
): Promise<MalwareScan> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return malwareScanDeserializer(result.body);
}

/** Gets the Defender for Storage malware scan for the specified storage resource. */
export async function getMalwareScan(
  context: Client,
  resourceId: string,
  settingName: SettingName,
  scanId: string,
  options: DefenderForStorageGetMalwareScanOptionalParams = { requestOptions: {} },
): Promise<MalwareScan> {
  const result = await _getMalwareScanSend(context, resourceId, settingName, scanId, options);
  return _getMalwareScanDeserialize(result);
}

export function _cancelMalwareScanSend(
  context: Client,
  resourceId: string,
  settingName: SettingName,
  scanId: string,
  options: DefenderForStorageCancelMalwareScanOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}/providers/Microsoft.Security/defenderForStorageSettings/{settingName}/malwareScans/{scanId}/cancelMalwareScan{?api%2Dversion}",
    {
      resourceId: resourceId,
      settingName: settingName,
      scanId: scanId,
      "api%2Dversion": "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _cancelMalwareScanDeserialize(
  result: PathUncheckedResponse,
): Promise<MalwareScan> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return malwareScanDeserializer(result.body);
}

/** Cancels a Defender for Storage malware scan for the specified storage account. */
export async function cancelMalwareScan(
  context: Client,
  resourceId: string,
  settingName: SettingName,
  scanId: string,
  options: DefenderForStorageCancelMalwareScanOptionalParams = { requestOptions: {} },
): Promise<MalwareScan> {
  const result = await _cancelMalwareScanSend(context, resourceId, settingName, scanId, options);
  return _cancelMalwareScanDeserialize(result);
}

export function _startMalwareScanSend(
  context: Client,
  resourceId: string,
  settingName: SettingName,
  options: DefenderForStorageStartMalwareScanOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}/providers/Microsoft.Security/defenderForStorageSettings/{settingName}/startMalwareScan{?api%2Dversion}",
    {
      resourceId: resourceId,
      settingName: settingName,
      "api%2Dversion": "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _startMalwareScanDeserialize(
  result: PathUncheckedResponse,
): Promise<MalwareScan> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return malwareScanDeserializer(result.body);
}

/** Initiate a Defender for Storage malware scan for the specified storage account. Blobs and Files will be scanned for malware. */
export async function startMalwareScan(
  context: Client,
  resourceId: string,
  settingName: SettingName,
  options: DefenderForStorageStartMalwareScanOptionalParams = { requestOptions: {} },
): Promise<MalwareScan> {
  const result = await _startMalwareScanSend(context, resourceId, settingName, options);
  return _startMalwareScanDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceId: string,
  options: DefenderForStorageListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}/providers/Microsoft.Security/defenderForStorageSettings{?api%2Dversion}",
    {
      resourceId: resourceId,
      "api%2Dversion": "2025-09-01-preview",
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
): Promise<_DefenderForStorageSettingList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _defenderForStorageSettingListDeserializer(result.body);
}

/** Lists the Defender for Storage settings for the specified storage account. */
export function list(
  context: Client,
  resourceId: string,
  options: DefenderForStorageListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DefenderForStorageSetting> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceId, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-09-01-preview" },
  );
}

export function _createSend(
  context: Client,
  resourceId: string,
  settingName: SettingName,
  defenderForStorageSetting: DefenderForStorageSetting,
  options: DefenderForStorageCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}/providers/Microsoft.Security/defenderForStorageSettings/{settingName}{?api%2Dversion}",
    {
      resourceId: resourceId,
      settingName: settingName,
      "api%2Dversion": "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: defenderForStorageSettingSerializer(defenderForStorageSetting),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<DefenderForStorageSetting> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return defenderForStorageSettingDeserializer(result.body);
}

/** Creates or updates the Defender for Storage settings on a specified storage account. */
export async function create(
  context: Client,
  resourceId: string,
  settingName: SettingName,
  defenderForStorageSetting: DefenderForStorageSetting,
  options: DefenderForStorageCreateOptionalParams = { requestOptions: {} },
): Promise<DefenderForStorageSetting> {
  const result = await _createSend(
    context,
    resourceId,
    settingName,
    defenderForStorageSetting,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceId: string,
  settingName: SettingName,
  options: DefenderForStorageGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}/providers/Microsoft.Security/defenderForStorageSettings/{settingName}{?api%2Dversion}",
    {
      resourceId: resourceId,
      settingName: settingName,
      "api%2Dversion": "2025-09-01-preview",
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
): Promise<DefenderForStorageSetting> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return defenderForStorageSettingDeserializer(result.body);
}

/** Gets the Defender for Storage settings for the specified storage account. */
export async function get(
  context: Client,
  resourceId: string,
  settingName: SettingName,
  options: DefenderForStorageGetOptionalParams = { requestOptions: {} },
): Promise<DefenderForStorageSetting> {
  const result = await _getSend(context, resourceId, settingName, options);
  return _getDeserialize(result);
}
