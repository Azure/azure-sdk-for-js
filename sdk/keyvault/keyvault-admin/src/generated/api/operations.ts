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
  SelectiveKeyRestoreStatusOptionalParams,
  UpdateSettingOptionalParams,
} from "./index.js";
import {
  FullBackupOperation,
  fullBackupOperationDeserializer,
  keyVaultErrorDeserializer,
  SASTokenParameter,
  sASTokenParameterSerializer,
  PreBackupOperationParameters,
  preBackupOperationParametersSerializer,
  RestoreOperation,
  restoreOperationDeserializer,
  PreRestoreOperationParameters,
  preRestoreOperationParametersSerializer,
  RestoreOperationParameters,
  restoreOperationParametersSerializer,
  SelectiveKeyRestoreOperation,
  selectiveKeyRestoreOperationDeserializer,
  SelectiveKeyRestoreOperationParameters,
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

export function _getSettingsSend(
  context: Client,
  options: GetSettingsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/settings")
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _getSettingsDeserialize(
  result: PathUncheckedResponse,
): Promise<SettingsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = keyVaultErrorDeserializer(result.body);
    throw error;
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

export function _getSettingSend(
  context: Client,
  settingName: string,
  options: GetSettingOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/settings/{setting-name}", settingName)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _getSettingDeserialize(
  result: PathUncheckedResponse,
): Promise<Setting> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = keyVaultErrorDeserializer(result.body);
    throw error;
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
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
      body: updateSettingRequestSerializer(parameters),
    });
}

export async function _updateSettingDeserialize(
  result: PathUncheckedResponse,
): Promise<Setting> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = keyVaultErrorDeserializer(result.body);
    throw error;
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

export function _selectiveKeyRestoreOperationSend(
  context: Client,
  keyName: string,
  restoreBlobDetails: SelectiveKeyRestoreOperationParameters,
  options: SelectiveKeyRestoreOperationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/keys/{keyName}/restore", keyName)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
      body: selectiveKeyRestoreOperationParametersSerializer(
        restoreBlobDetails,
      ),
    });
}

export async function _selectiveKeyRestoreOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<SelectiveKeyRestoreOperation> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = keyVaultErrorDeserializer(result.body);
    throw error;
  }

  return selectiveKeyRestoreOperationDeserializer(result.body);
}

/** Restores all key versions of a given key using user supplied SAS token pointing to a previously stored Azure Blob storage backup folder */
export function selectiveKeyRestoreOperation(
  context: Client,
  keyName: string,
  restoreBlobDetails: SelectiveKeyRestoreOperationParameters,
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
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<
    OperationState<SelectiveKeyRestoreOperation>,
    SelectiveKeyRestoreOperation
  >;
}

export function _selectiveKeyRestoreStatusSend(
  context: Client,
  jobId: string,
  options: SelectiveKeyRestoreStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/restore/{jobId}/pending", jobId)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _selectiveKeyRestoreStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<SelectiveKeyRestoreOperation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = keyVaultErrorDeserializer(result.body);
    throw error;
  }

  return selectiveKeyRestoreOperationDeserializer(result.body);
}

/** Returns the status of the selective key restore operation */
export async function selectiveKeyRestoreStatus(
  context: Client,
  jobId: string,
  options: SelectiveKeyRestoreStatusOptionalParams = { requestOptions: {} },
): Promise<SelectiveKeyRestoreOperation> {
  const result = await _selectiveKeyRestoreStatusSend(context, jobId, options);
  return _selectiveKeyRestoreStatusDeserialize(result);
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
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
      body: restoreOperationParametersSerializer(restoreBlobDetails),
    });
}

export async function _fullRestoreOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<RestoreOperation> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = keyVaultErrorDeserializer(result.body);
    throw error;
  }

  return restoreOperationDeserializer(result.body);
}

/** Restores all key materials using the SAS token pointing to a previously stored Azure Blob storage backup folder */
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
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<OperationState<RestoreOperation>, RestoreOperation>;
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
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
      body: preRestoreOperationParametersSerializer(
        preRestoreOperationParameters,
      ),
    });
}

export async function _preFullRestoreOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<RestoreOperation> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = keyVaultErrorDeserializer(result.body);
    throw error;
  }

  return restoreOperationDeserializer(result.body);
}

/** Pre-restore operation for checking whether the customer can perform a full restore operation. */
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
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<OperationState<RestoreOperation>, RestoreOperation>;
}

export function _restoreStatusSend(
  context: Client,
  jobId: string,
  options: RestoreStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/restore/{jobId}/pending", jobId)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _restoreStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<RestoreOperation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = keyVaultErrorDeserializer(result.body);
    throw error;
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

export function _preFullBackupSend(
  context: Client,
  preBackupOperationParameters: PreBackupOperationParameters,
  options: PreFullBackupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/prebackup")
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
      body: preBackupOperationParametersSerializer(
        preBackupOperationParameters,
      ),
    });
}

export async function _preFullBackupDeserialize(
  result: PathUncheckedResponse,
): Promise<FullBackupOperation> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = keyVaultErrorDeserializer(result.body);
    throw error;
  }

  return fullBackupOperationDeserializer(result.body);
}

/** Pre-backup operation for checking whether the customer can perform a full backup operation. */
export function preFullBackup(
  context: Client,
  preBackupOperationParameters: PreBackupOperationParameters,
  options: PreFullBackupOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FullBackupOperation>, FullBackupOperation> {
  return getLongRunningPoller(
    context,
    _preFullBackupDeserialize,
    ["202", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _preFullBackupSend(context, preBackupOperationParameters, options),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<OperationState<FullBackupOperation>, FullBackupOperation>;
}

export function _fullBackupSend(
  context: Client,
  azureStorageBlobContainerUri: SASTokenParameter,
  options: FullBackupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/backup")
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
      body: sASTokenParameterSerializer(azureStorageBlobContainerUri),
    });
}

export async function _fullBackupDeserialize(
  result: PathUncheckedResponse,
): Promise<FullBackupOperation> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = keyVaultErrorDeserializer(result.body);
    throw error;
  }

  return fullBackupOperationDeserializer(result.body);
}

/** Creates a full backup using a user-provided SAS token to an Azure blob storage container. */
export function fullBackup(
  context: Client,
  azureStorageBlobContainerUri: SASTokenParameter,
  options: FullBackupOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FullBackupOperation>, FullBackupOperation> {
  return getLongRunningPoller(context, _fullBackupDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _fullBackupSend(context, azureStorageBlobContainerUri, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<FullBackupOperation>, FullBackupOperation>;
}

export function _fullBackupStatusSend(
  context: Client,
  jobId: string,
  options: FullBackupStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/backup/{jobId}/pending", jobId)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _fullBackupStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<FullBackupOperation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = keyVaultErrorDeserializer(result.body);
    throw error;
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
