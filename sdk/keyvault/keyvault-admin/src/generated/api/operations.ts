// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  sASTokenParameterSerializer,
  FullBackupOperation,
  OperationStatus,
  SASTokenParameter,
  PreBackupOperationParameters,
  RestoreOperation,
  PreRestoreOperationParameters,
  RestoreOperationParameters,
  SelectiveKeyRestoreOperationParameters,
  SelectiveKeyRestoreOperation,
  UpdateSettingRequest,
  Setting,
  SettingTypeEnum,
  SettingsListResult,
} from "../models/models.js";
import { KeyVaultContext as Client } from "./index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  PathUncheckedResponse,
  createRestError,
} from "@azure-rest/core-client";
import { getLongRunningPoller } from "../static-helpers/pollingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  FullBackupStatusOptionalParams,
  FullBackupOptionalParams,
  PreFullBackupOptionalParams,
  RestoreStatusOptionalParams,
  PreFullRestoreOperationOptionalParams,
  FullRestoreOperationOptionalParams,
  SelectiveKeyRestoreOperationOptionalParams,
  UpdateSettingOptionalParams,
  GetSettingOptionalParams,
  GetSettingsOptionalParams,
} from "../models/options.js";

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

  return {
    status: result.body["status"] as OperationStatus,
    statusDetails: result.body["statusDetails"],
    error: !result.body.error
      ? undefined
      : {
          code: result.body.error?.["code"],
          message: result.body.error?.["message"],
          innerError: !result.body.error?.innererror
            ? undefined
            : result.body.error?.innererror,
        },
    startTime:
      result.body["startTime"] !== undefined
        ? new Date(result.body["startTime"])
        : undefined,
    endTime:
      result.body["endTime"] !== undefined
        ? new Date(result.body["endTime"])
        : undefined,
    jobId: result.body["jobId"],
    azureStorageBlobContainerUri: result.body["azureStorageBlobContainerUri"],
  };
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
  azureStorageBlobContainerUri?: SASTokenParameter,
  options: FullBackupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/backup")
    .post({
      ...operationOptionsToRequestParameters(options),
      body:
        azureStorageBlobContainerUri === undefined
          ? azureStorageBlobContainerUri
          : {
              storageResourceUri:
                azureStorageBlobContainerUri["storageResourceUri"],
              token: azureStorageBlobContainerUri["token"],
              useManagedIdentity:
                azureStorageBlobContainerUri["useManagedIdentity"],
            },
    });
}

export async function _fullBackupDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/**
 * Creates a full backup using a user-provided SAS token to an Azure blob storage
 * container.
 */
export function fullBackup(
  context: Client,
  azureStorageBlobContainerUri?: SASTokenParameter,
  options: FullBackupOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _fullBackupDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _fullBackupSend(context, azureStorageBlobContainerUri, options),
  }) as PollerLike<OperationState<void>, void>;
}

export function _preFullBackupSend(
  context: Client,
  preBackupOperationParameters?: PreBackupOperationParameters,
  options: PreFullBackupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/prebackup")
    .post({
      ...operationOptionsToRequestParameters(options),
      body:
        preBackupOperationParameters === undefined
          ? preBackupOperationParameters
          : {
              storageResourceUri:
                preBackupOperationParameters["storageResourceUri"],
              token: preBackupOperationParameters["token"],
              useManagedIdentity:
                preBackupOperationParameters["useManagedIdentity"],
            },
    });
}

export async function _preFullBackupDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/**
 * Pre-backup operation for checking whether the customer can perform a full
 * backup operation.
 */
export function preFullBackup(
  context: Client,
  preBackupOperationParameters?: PreBackupOperationParameters,
  options: PreFullBackupOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _preFullBackupDeserialize,
    ["202", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _preFullBackupSend(context, preBackupOperationParameters, options),
    },
  ) as PollerLike<OperationState<void>, void>;
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

  return {
    status: result.body["status"] as OperationStatus,
    statusDetails: result.body["statusDetails"],
    error: !result.body.error
      ? undefined
      : {
          code: result.body.error?.["code"],
          message: result.body.error?.["message"],
          innerError: !result.body.error?.innererror
            ? undefined
            : result.body.error?.innererror,
        },
    jobId: result.body["jobId"],
    startTime:
      result.body["startTime"] !== undefined
        ? new Date(result.body["startTime"])
        : undefined,
    endTime:
      result.body["endTime"] !== undefined
        ? new Date(result.body["endTime"])
        : undefined,
  };
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
  preRestoreOperationParameters: PreRestoreOperationParameters,
  options: PreFullRestoreOperationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/prerestore")
    .put({
      ...operationOptionsToRequestParameters(options),
      body: {
        sasTokenParameters: !preRestoreOperationParameters.sasTokenParameters
          ? preRestoreOperationParameters.sasTokenParameters
          : sASTokenParameterSerializer(
              preRestoreOperationParameters.sasTokenParameters,
            ),
        folderToRestore: preRestoreOperationParameters["folderToRestore"],
      },
    });
}

export async function _preFullRestoreOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<RestoreOperation> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    status: result.body["status"] as OperationStatus,
    statusDetails: result.body["statusDetails"],
    error: !result.body.error
      ? undefined
      : {
          code: result.body.error?.["code"],
          message: result.body.error?.["message"],
          innerError: !result.body.error?.innererror
            ? undefined
            : result.body.error?.innererror,
        },
    jobId: result.body["jobId"],
    startTime:
      result.body["startTime"] !== undefined
        ? new Date(result.body["startTime"])
        : undefined,
    endTime:
      result.body["endTime"] !== undefined
        ? new Date(result.body["endTime"])
        : undefined,
  };
}

/**
 * Pre-restore operation for checking whether the customer can perform a full
 * restore operation.
 */
export function preFullRestoreOperation(
  context: Client,
  preRestoreOperationParameters: PreRestoreOperationParameters,
  options: PreFullRestoreOperationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RestoreOperation>, RestoreOperation> {
  return getLongRunningPoller(
    context,
    _preFullRestoreOperationDeserialize,
    ["202", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _preFullRestoreOperationSend(
          context,
          preRestoreOperationParameters,
          options,
        ),
    },
  ) as PollerLike<OperationState<RestoreOperation>, RestoreOperation>;
}

export function _fullRestoreOperationSend(
  context: Client,
  restoreBlobDetails: RestoreOperationParameters,
  options: FullRestoreOperationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/restore")
    .put({
      ...operationOptionsToRequestParameters(options),
      body: {
        sasTokenParameters: sASTokenParameterSerializer(
          restoreBlobDetails.sasTokenParameters,
        ),
        folderToRestore: restoreBlobDetails["folderToRestore"],
      },
    });
}

export async function _fullRestoreOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<RestoreOperation> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    status: result.body["status"] as OperationStatus,
    statusDetails: result.body["statusDetails"],
    error: !result.body.error
      ? undefined
      : {
          code: result.body.error?.["code"],
          message: result.body.error?.["message"],
          innerError: !result.body.error?.innererror
            ? undefined
            : result.body.error?.innererror,
        },
    jobId: result.body["jobId"],
    startTime:
      result.body["startTime"] !== undefined
        ? new Date(result.body["startTime"])
        : undefined,
    endTime:
      result.body["endTime"] !== undefined
        ? new Date(result.body["endTime"])
        : undefined,
  };
}

/**
 * Restores all key materials using the SAS token pointing to a previously stored
 * Azure Blob storage backup folder
 */
export function fullRestoreOperation(
  context: Client,
  restoreBlobDetails: RestoreOperationParameters,
  options: FullRestoreOperationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RestoreOperation>, RestoreOperation> {
  return getLongRunningPoller(
    context,
    _fullRestoreOperationDeserialize,
    ["202", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _fullRestoreOperationSend(context, restoreBlobDetails, options),
    },
  ) as PollerLike<OperationState<RestoreOperation>, RestoreOperation>;
}

export function _selectiveKeyRestoreOperationSend(
  context: Client,
  keyName: string,
  restoreBlobDetails?: SelectiveKeyRestoreOperationParameters,
  options: SelectiveKeyRestoreOperationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/keys/{keyName}/restore", keyName)
    .put({
      ...operationOptionsToRequestParameters(options),
      body:
        restoreBlobDetails === undefined
          ? restoreBlobDetails
          : {
              sasTokenParameters: sASTokenParameterSerializer(
                restoreBlobDetails.sasTokenParameters,
              ),
              folder: restoreBlobDetails["folder"],
            },
    });
}

export async function _selectiveKeyRestoreOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<SelectiveKeyRestoreOperation> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    status: result.body["status"] as OperationStatus,
    statusDetails: result.body["statusDetails"],
    error: !result.body.error
      ? undefined
      : {
          code: result.body.error?.["code"],
          message: result.body.error?.["message"],
          innerError: !result.body.error?.innererror
            ? undefined
            : result.body.error?.innererror,
        },
    jobId: result.body["jobId"],
    startTime:
      result.body["startTime"] !== undefined
        ? new Date(result.body["startTime"])
        : undefined,
    endTime:
      result.body["endTime"] !== undefined
        ? new Date(result.body["endTime"])
        : undefined,
  };
}

/**
 * Restores all key versions of a given key using user supplied SAS token pointing
 * to a previously stored Azure Blob storage backup folder
 */
export function selectiveKeyRestoreOperation(
  context: Client,
  keyName: string,
  restoreBlobDetails?: SelectiveKeyRestoreOperationParameters,
  options: SelectiveKeyRestoreOperationOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<SelectiveKeyRestoreOperation>,
  SelectiveKeyRestoreOperation
> {
  return getLongRunningPoller(
    context,
    _selectiveKeyRestoreOperationDeserialize,
    ["202", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _selectiveKeyRestoreOperationSend(
          context,
          keyName,
          restoreBlobDetails,
          options,
        ),
    },
  ) as PollerLike<
    OperationState<SelectiveKeyRestoreOperation>,
    SelectiveKeyRestoreOperation
  >;
}

export function _updateSettingSend(
  context: Client,
  settingName: string,
  parameters: UpdateSettingRequest,
  options: UpdateSettingOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/settings/{settingName}", settingName)
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: { value: parameters["value"] },
    });
}

export async function _updateSettingDeserialize(
  result: PathUncheckedResponse,
): Promise<Setting> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    name: result.body["name"],
    value: result.body["value"],
    type: result.body["type"] as SettingTypeEnum,
  };
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
    .path("/settings/{settingName}", settingName)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getSettingDeserialize(
  result: PathUncheckedResponse,
): Promise<Setting> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    name: result.body["name"],
    value: result.body["value"],
    type: result.body["type"] as SettingTypeEnum,
  };
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

  return {
    settings:
      result.body["settings"] === undefined
        ? result.body["settings"]
        : result.body["settings"].map((p: any) => {
            return {
              name: p["name"],
              value: p["value"],
              type: p["type"] as SettingTypeEnum,
            };
          }),
  };
}

/** Retrieves a list of all the available account settings that can be configured. */
export async function getSettings(
  context: Client,
  options: GetSettingsOptionalParams = { requestOptions: {} },
): Promise<SettingsListResult> {
  const result = await _getSettingsSend(context, options);
  return _getSettingsDeserialize(result);
}
