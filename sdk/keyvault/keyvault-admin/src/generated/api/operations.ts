// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  KeyVaultContext as Client,
  FullBackupOptionalParams,
  FullBackupStatusOptionalParams,
  FullRestoreOperationOptionalParams,
  GetSettingOptionalParams,
  GetSettingsOptionalParams,
  PreFullBackupOptionalParams,
  PreFullRestoreOperationOptionalParams,
  RestoreStatusOptionalParams,
  SelectiveKeyRestoreOperationOptionalParams,
  UpdateSettingOptionalParams,
} from "./index.js";
import {
  FullBackupOperation,
  fullBackupOperationDeserializer,
  sASTokenParameterSerializer,
  preBackupOperationParametersSerializer,
  RestoreOperation,
  restoreOperationDeserializer,
  preRestoreOperationParametersSerializer,
  restoreOperationParametersSerializer,
  selectiveKeyRestoreOperationParametersSerializer,
  UpdateSettingRequest,
  updateSettingRequestSerializer,
  Setting,
  settingDeserializer,
  SettingsListResult,
  settingsListResultDeserializer,
} from "../models/models.js";
import { getLongRunningPoller } from "../static-helpers/pollingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _fullBackupStatusSend(
  context: Client,
  jobId: string,
  options: FullBackupStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/backup/{jobId}/pending", jobId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _fullBackupStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<FullBackupOperation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return fullBackupOperationDeserializer(result.body);
}

/** Returns the status of full backup operation */
export async function fullBackupStatus(
  context: Client,
  jobId: string,
  options: FullBackupStatusOptionalParams = { requestOptions: {} },
): Promise<FullBackupOperation> {
  const result = await _fullBackupStatusSend(context, jobId, options);
  return _fullBackupStatusDeserialize(result);
}

export function _fullBackupSend(
  context: Client,
  options: FullBackupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/backup")
    .post({
      ...operationOptionsToRequestParameters(options),
      body: !options["azureStorageBlobContainerUri"]
        ? options["azureStorageBlobContainerUri"]
        : sASTokenParameterSerializer(options["azureStorageBlobContainerUri"]),
    });
}

export async function _fullBackupDeserialize(
  result: PathUncheckedResponse,
): Promise<FullBackupOperation> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return fullBackupOperationDeserializer(result.body);
}

/** Creates a full backup using a user-provided SAS token to an Azure blob storage container. */
export function fullBackup(
  context: Client,
  options: FullBackupOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FullBackupOperation>, FullBackupOperation> {
  return getLongRunningPoller(context, _fullBackupDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _fullBackupSend(context, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<FullBackupOperation>, FullBackupOperation>;
}

export function _preFullBackupSend(
  context: Client,
  options: PreFullBackupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/prebackup")
    .post({
      ...operationOptionsToRequestParameters(options),
      body: !options["preBackupOperationParameters"]
        ? options["preBackupOperationParameters"]
        : preBackupOperationParametersSerializer(
            options["preBackupOperationParameters"],
          ),
    });
}

export async function _preFullBackupDeserialize(
  result: PathUncheckedResponse,
): Promise<FullBackupOperation> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return fullBackupOperationDeserializer(result.body);
}

/** Pre-backup operation for checking whether the customer can perform a full backup operation. */
export function preFullBackup(
  context: Client,
  options: PreFullBackupOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FullBackupOperation>, FullBackupOperation> {
  return getLongRunningPoller(
    context,
    _preFullBackupDeserialize,
    ["202", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () => _preFullBackupSend(context, options),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<OperationState<FullBackupOperation>, FullBackupOperation>;
}

export function _restoreStatusSend(
  context: Client,
  jobId: string,
  options: RestoreStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/restore/{jobId}/pending", jobId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _restoreStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<RestoreOperation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return restoreOperationDeserializer(result.body);
}

/** Returns the status of restore operation */
export async function restoreStatus(
  context: Client,
  jobId: string,
  options: RestoreStatusOptionalParams = { requestOptions: {} },
): Promise<RestoreOperation> {
  const result = await _restoreStatusSend(context, jobId, options);
  return _restoreStatusDeserialize(result);
}

export function _preFullRestoreOperationSend(
  context: Client,
  options: PreFullRestoreOperationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/prerestore")
    .put({
      ...operationOptionsToRequestParameters(options),
      body: !options["preRestoreOperationParameters"]
        ? options["preRestoreOperationParameters"]
        : preRestoreOperationParametersSerializer(
            options["preRestoreOperationParameters"],
          ),
    });
}

export async function _preFullRestoreOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<RestoreOperation> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return restoreOperationDeserializer(result.body);
}

/** Pre-restore operation for checking whether the customer can perform a full restore operation. */
export function preFullRestoreOperation(
  context: Client,
  options: PreFullRestoreOperationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RestoreOperation>, RestoreOperation> {
  return getLongRunningPoller(
    context,
    _preFullRestoreOperationDeserialize,
    ["202", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () => _preFullRestoreOperationSend(context, options),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<OperationState<RestoreOperation>, RestoreOperation>;
}

export function _fullRestoreOperationSend(
  context: Client,
  options: FullRestoreOperationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/restore")
    .put({
      ...operationOptionsToRequestParameters(options),
      body: !options["restoreBlobDetails"]
        ? options["restoreBlobDetails"]
        : restoreOperationParametersSerializer(options["restoreBlobDetails"]),
    });
}

export async function _fullRestoreOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<RestoreOperation> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return restoreOperationDeserializer(result.body);
}

/** Restores all key materials using the SAS token pointing to a previously stored Azure Blob storage backup folder */
export function fullRestoreOperation(
  context: Client,
  options: FullRestoreOperationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RestoreOperation>, RestoreOperation> {
  return getLongRunningPoller(
    context,
    _fullRestoreOperationDeserialize,
    ["202", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () => _fullRestoreOperationSend(context, options),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<OperationState<RestoreOperation>, RestoreOperation>;
}

export function _selectiveKeyRestoreOperationSend(
  context: Client,
  keyName: string,
  options: SelectiveKeyRestoreOperationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/keys/{keyName}/restore", keyName)
    .put({
      ...operationOptionsToRequestParameters(options),
      body: !options["restoreBlobDetails"]
        ? options["restoreBlobDetails"]
        : selectiveKeyRestoreOperationParametersSerializer(
            options["restoreBlobDetails"],
          ),
    });
}

export async function _selectiveKeyRestoreOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<RestoreOperation> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return restoreOperationDeserializer(result.body);
}

/** Restores all key versions of a given key using user supplied SAS token pointing to a previously stored Azure Blob storage backup folder */
export function selectiveKeyRestoreOperation(
  context: Client,
  keyName: string,
  options: SelectiveKeyRestoreOperationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RestoreOperation>, RestoreOperation> {
  return getLongRunningPoller(
    context,
    _selectiveKeyRestoreOperationDeserialize,
    ["202", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _selectiveKeyRestoreOperationSend(context, keyName, options),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<OperationState<RestoreOperation>, RestoreOperation>;
}

export function _updateSettingSend(
  context: Client,
  settingName: string,
  parameters: UpdateSettingRequest,
  options: UpdateSettingOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/settings/{setting-name}", settingName)
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: updateSettingRequestSerializer(parameters),
    });
}

export async function _updateSettingDeserialize(
  result: PathUncheckedResponse,
): Promise<Setting> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return settingDeserializer(result.body);
}

/** Description of the pool setting to be updated */
export async function updateSetting(
  context: Client,
  settingName: string,
  parameters: UpdateSettingRequest,
  options: UpdateSettingOptionalParams = { requestOptions: {} },
): Promise<Setting> {
  const result = await _updateSettingSend(
    context,
    settingName,
    parameters,
    options,
  );
  return _updateSettingDeserialize(result);
}

export function _getSettingSend(
  context: Client,
  settingName: string,
  options: GetSettingOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/settings/{setting-name}", settingName)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getSettingDeserialize(
  result: PathUncheckedResponse,
): Promise<Setting> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return settingDeserializer(result.body);
}

/** Retrieves the setting object of a specified setting name. */
export async function getSetting(
  context: Client,
  settingName: string,
  options: GetSettingOptionalParams = { requestOptions: {} },
): Promise<Setting> {
  const result = await _getSettingSend(context, settingName, options);
  return _getSettingDeserialize(result);
}

export function _getSettingsSend(
  context: Client,
  options: GetSettingsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/settings")
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getSettingsDeserialize(
  result: PathUncheckedResponse,
): Promise<SettingsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return settingsListResultDeserializer(result.body);
}

/** Retrieves a list of all the available account settings that can be configured. */
export async function getSettings(
  context: Client,
  options: GetSettingsOptionalParams = { requestOptions: {} },
): Promise<SettingsListResult> {
  const result = await _getSettingsSend(context, options);
  return _getSettingsDeserialize(result);
}
