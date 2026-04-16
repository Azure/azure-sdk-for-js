// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext as Client } from "../index.js";
import type {
  BackupInstanceResource,
  _BackupInstanceResourceList,
  ValidateForBackupRequest,
  OperationJobExtendedInfo,
  TriggerBackupRequest,
  ValidateForModifyBackupRequest,
  AzureBackupRehydrationRequest,
  AzureBackupRestoreRequestUnion,
  SyncBackupInstanceRequest,
  ValidateRestoreRequestObject,
  CrossRegionRestoreRequestObject,
  ValidateCrossRegionRestoreRequestObject,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  backupInstanceResourceSerializer,
  backupInstanceResourceDeserializer,
  cloudErrorDeserializer,
  _backupInstanceResourceListDeserializer,
  validateForBackupRequestSerializer,
  operationJobExtendedInfoDeserializer,
  triggerBackupRequestSerializer,
  validateForModifyBackupRequestSerializer,
  azureBackupRehydrationRequestSerializer,
  azureBackupRestoreRequestUnionSerializer,
  stopProtectionRequestSerializer,
  suspendBackupRequestSerializer,
  syncBackupInstanceRequestSerializer,
  validateRestoreRequestObjectSerializer,
  crossRegionRestoreRequestObjectSerializer,
  validateCrossRegionRestoreRequestObjectSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  BackupInstancesValidateCrossRegionRestoreOptionalParams,
  BackupInstancesTriggerCrossRegionRestoreOptionalParams,
  BackupInstancesValidateForRestoreOptionalParams,
  BackupInstancesSyncBackupInstanceOptionalParams,
  BackupInstancesSuspendBackupsOptionalParams,
  BackupInstancesStopProtectionOptionalParams,
  BackupInstancesResumeProtectionOptionalParams,
  BackupInstancesResumeBackupsOptionalParams,
  BackupInstancesTriggerRestoreOptionalParams,
  BackupInstancesTriggerRehydrateOptionalParams,
  BackupInstancesValidateForModifyBackupOptionalParams,
  BackupInstancesAdhocBackupOptionalParams,
  BackupInstancesDeleteOptionalParams,
  BackupInstancesCreateOrUpdateOptionalParams,
  BackupInstancesGetOptionalParams,
  BackupInstancesValidateForBackupOptionalParams,
  BackupInstancesListOptionalParams,
  BackupInstancesGetBackupInstanceOperationResultOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _validateCrossRegionRestoreSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  parameters: ValidateCrossRegionRestoreRequestObject,
  options: BackupInstancesValidateCrossRegionRestoreOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/locations/{location}/validateCrossRegionRestore{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: validateCrossRegionRestoreRequestObjectSerializer(parameters),
  });
}

export async function _validateCrossRegionRestoreDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationJobExtendedInfo> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return operationJobExtendedInfoDeserializer(result.body);
}

/** Validates whether Cross Region Restore can be triggered for DataSource. */
export function validateCrossRegionRestore(
  context: Client,
  resourceGroupName: string,
  location: string,
  parameters: ValidateCrossRegionRestoreRequestObject,
  options: BackupInstancesValidateCrossRegionRestoreOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<OperationJobExtendedInfo>, OperationJobExtendedInfo> {
  return getLongRunningPoller(context, _validateCrossRegionRestoreDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _validateCrossRegionRestoreSend(context, resourceGroupName, location, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OperationJobExtendedInfo>, OperationJobExtendedInfo>;
}

export function _triggerCrossRegionRestoreSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  parameters: CrossRegionRestoreRequestObject,
  options: BackupInstancesTriggerCrossRegionRestoreOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/locations/{location}/crossRegionRestore{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: crossRegionRestoreRequestObjectSerializer(parameters),
  });
}

export async function _triggerCrossRegionRestoreDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationJobExtendedInfo> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return operationJobExtendedInfoDeserializer(result.body);
}

/** Triggers Cross Region Restore for BackupInstance. */
export function triggerCrossRegionRestore(
  context: Client,
  resourceGroupName: string,
  location: string,
  parameters: CrossRegionRestoreRequestObject,
  options: BackupInstancesTriggerCrossRegionRestoreOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<OperationJobExtendedInfo>, OperationJobExtendedInfo> {
  return getLongRunningPoller(context, _triggerCrossRegionRestoreDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _triggerCrossRegionRestoreSend(context, resourceGroupName, location, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OperationJobExtendedInfo>, OperationJobExtendedInfo>;
}

export function _validateForRestoreSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  backupInstanceName: string,
  parameters: ValidateRestoreRequestObject,
  options: BackupInstancesValidateForRestoreOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupInstances/{backupInstanceName}/validateRestore{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      backupInstanceName: backupInstanceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: validateRestoreRequestObjectSerializer(parameters),
  });
}

export async function _validateForRestoreDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationJobExtendedInfo> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return operationJobExtendedInfoDeserializer(result.body);
}

/** Validates if Restore can be triggered for a DataSource */
export function validateForRestore(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  backupInstanceName: string,
  parameters: ValidateRestoreRequestObject,
  options: BackupInstancesValidateForRestoreOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<OperationJobExtendedInfo>, OperationJobExtendedInfo> {
  return getLongRunningPoller(context, _validateForRestoreDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _validateForRestoreSend(
        context,
        resourceGroupName,
        vaultName,
        backupInstanceName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OperationJobExtendedInfo>, OperationJobExtendedInfo>;
}

export function _syncBackupInstanceSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  backupInstanceName: string,
  parameters: SyncBackupInstanceRequest,
  options: BackupInstancesSyncBackupInstanceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupInstances/{backupInstanceName}/sync{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      backupInstanceName: backupInstanceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: syncBackupInstanceRequestSerializer(parameters),
  });
}

export async function _syncBackupInstanceDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/**
 * Sync backup instance again in case of failure
 * This action will retry last failed operation and will bring backup instance to valid state
 */
export function syncBackupInstance(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  backupInstanceName: string,
  parameters: SyncBackupInstanceRequest,
  options: BackupInstancesSyncBackupInstanceOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _syncBackupInstanceDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _syncBackupInstanceSend(
        context,
        resourceGroupName,
        vaultName,
        backupInstanceName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _suspendBackupsSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  backupInstanceName: string,
  options: BackupInstancesSuspendBackupsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupInstances/{backupInstanceName}/suspendBackups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      backupInstanceName: backupInstanceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.xMsAuthorizationAuxiliary !== undefined
        ? {
            "x-ms-authorization-auxiliary": options?.xMsAuthorizationAuxiliary,
          }
        : {}),
      ...options.requestOptions?.headers,
    },
    body: !options["parameters"]
      ? options["parameters"]
      : suspendBackupRequestSerializer(options["parameters"]),
  });
}

export async function _suspendBackupsDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** This operation will stop backup for a backup instance and retains the backup data as per the policy (except latest Recovery point, which will be retained forever) */
export function suspendBackups(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  backupInstanceName: string,
  options: BackupInstancesSuspendBackupsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _suspendBackupsDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _suspendBackupsSend(context, resourceGroupName, vaultName, backupInstanceName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _stopProtectionSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  backupInstanceName: string,
  options: BackupInstancesStopProtectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupInstances/{backupInstanceName}/stopProtection{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      backupInstanceName: backupInstanceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.xMsAuthorizationAuxiliary !== undefined
        ? {
            "x-ms-authorization-auxiliary": options?.xMsAuthorizationAuxiliary,
          }
        : {}),
      ...options.requestOptions?.headers,
    },
    body: !options["parameters"]
      ? options["parameters"]
      : stopProtectionRequestSerializer(options["parameters"]),
  });
}

export async function _stopProtectionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** This operation will stop protection of a backup instance and data will be held forever */
export function stopProtection(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  backupInstanceName: string,
  options: BackupInstancesStopProtectionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _stopProtectionDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _stopProtectionSend(context, resourceGroupName, vaultName, backupInstanceName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _resumeProtectionSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  backupInstanceName: string,
  options: BackupInstancesResumeProtectionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupInstances/{backupInstanceName}/resumeProtection{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      backupInstanceName: backupInstanceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _resumeProtectionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** This operation will resume protection for a stopped backup instance */
export function resumeProtection(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  backupInstanceName: string,
  options: BackupInstancesResumeProtectionOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _resumeProtectionDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _resumeProtectionSend(context, resourceGroupName, vaultName, backupInstanceName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _resumeBackupsSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  backupInstanceName: string,
  options: BackupInstancesResumeBackupsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupInstances/{backupInstanceName}/resumeBackups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      backupInstanceName: backupInstanceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _resumeBackupsDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** This operation will resume backups for backup instance */
export function resumeBackups(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  backupInstanceName: string,
  options: BackupInstancesResumeBackupsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _resumeBackupsDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _resumeBackupsSend(context, resourceGroupName, vaultName, backupInstanceName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _triggerRestoreSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  backupInstanceName: string,
  parameters: AzureBackupRestoreRequestUnion,
  options: BackupInstancesTriggerRestoreOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupInstances/{backupInstanceName}/restore{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      backupInstanceName: backupInstanceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.xMsAuthorizationAuxiliary !== undefined
        ? {
            "x-ms-authorization-auxiliary": options?.xMsAuthorizationAuxiliary,
          }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: azureBackupRestoreRequestUnionSerializer(parameters),
  });
}

export async function _triggerRestoreDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationJobExtendedInfo> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return operationJobExtendedInfoDeserializer(result.body);
}

/** Triggers restore for a BackupInstance */
export function triggerRestore(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  backupInstanceName: string,
  parameters: AzureBackupRestoreRequestUnion,
  options: BackupInstancesTriggerRestoreOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationJobExtendedInfo>, OperationJobExtendedInfo> {
  return getLongRunningPoller(context, _triggerRestoreDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _triggerRestoreSend(
        context,
        resourceGroupName,
        vaultName,
        backupInstanceName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OperationJobExtendedInfo>, OperationJobExtendedInfo>;
}

export function _triggerRehydrateSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  backupInstanceName: string,
  parameters: AzureBackupRehydrationRequest,
  options: BackupInstancesTriggerRehydrateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupInstances/{backupInstanceName}/rehydrate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      backupInstanceName: backupInstanceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: azureBackupRehydrationRequestSerializer(parameters),
  });
}

export async function _triggerRehydrateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** rehydrate recovery point for restore for a BackupInstance */
export function triggerRehydrate(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  backupInstanceName: string,
  parameters: AzureBackupRehydrationRequest,
  options: BackupInstancesTriggerRehydrateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _triggerRehydrateDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _triggerRehydrateSend(
        context,
        resourceGroupName,
        vaultName,
        backupInstanceName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _validateForModifyBackupSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  backupInstanceName: string,
  parameters: ValidateForModifyBackupRequest,
  options: BackupInstancesValidateForModifyBackupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupInstances/{backupInstanceName}/validateForModifyBackup{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      backupInstanceName: backupInstanceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: validateForModifyBackupRequestSerializer(parameters),
  });
}

export async function _validateForModifyBackupDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Validate whether update for backup instance will be successful or not */
export function validateForModifyBackup(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  backupInstanceName: string,
  parameters: ValidateForModifyBackupRequest,
  options: BackupInstancesValidateForModifyBackupOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _validateForModifyBackupDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _validateForModifyBackupSend(
        context,
        resourceGroupName,
        vaultName,
        backupInstanceName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _adhocBackupSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  backupInstanceName: string,
  parameters: TriggerBackupRequest,
  options: BackupInstancesAdhocBackupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupInstances/{backupInstanceName}/backup{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      backupInstanceName: backupInstanceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: triggerBackupRequestSerializer(parameters),
  });
}

export async function _adhocBackupDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationJobExtendedInfo> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return operationJobExtendedInfoDeserializer(result.body);
}

/** Trigger adhoc backup */
export function adhocBackup(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  backupInstanceName: string,
  parameters: TriggerBackupRequest,
  options: BackupInstancesAdhocBackupOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationJobExtendedInfo>, OperationJobExtendedInfo> {
  return getLongRunningPoller(context, _adhocBackupDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _adhocBackupSend(
        context,
        resourceGroupName,
        vaultName,
        backupInstanceName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OperationJobExtendedInfo>, OperationJobExtendedInfo>;
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  backupInstanceName: string,
  options: BackupInstancesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupInstances/{backupInstanceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      backupInstanceName: backupInstanceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.xMsAuthorizationAuxiliary !== undefined
        ? {
            "x-ms-authorization-auxiliary": options?.xMsAuthorizationAuxiliary,
          }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a backup instance in a backup vault */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  backupInstanceName: string,
  options: BackupInstancesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, vaultName, backupInstanceName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  backupInstanceName: string,
  parameters: BackupInstanceResource,
  options: BackupInstancesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupInstances/{backupInstanceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      backupInstanceName: backupInstanceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.xMsAuthorizationAuxiliary !== undefined
        ? {
            "x-ms-authorization-auxiliary": options?.xMsAuthorizationAuxiliary,
          }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: backupInstanceResourceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<BackupInstanceResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return backupInstanceResourceDeserializer(result.body);
}

/** Create or update a backup instance in a backup vault */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  backupInstanceName: string,
  parameters: BackupInstanceResource,
  options: BackupInstancesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<BackupInstanceResource>, BackupInstanceResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        vaultName,
        backupInstanceName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<BackupInstanceResource>, BackupInstanceResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  backupInstanceName: string,
  options: BackupInstancesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupInstances/{backupInstanceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      backupInstanceName: backupInstanceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<BackupInstanceResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return backupInstanceResourceDeserializer(result.body);
}

/** Gets a backup instance with name in a backup vault */
export async function get(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  backupInstanceName: string,
  options: BackupInstancesGetOptionalParams = { requestOptions: {} },
): Promise<BackupInstanceResource> {
  const result = await _getSend(context, resourceGroupName, vaultName, backupInstanceName, options);
  return _getDeserialize(result);
}

export function _validateForBackupSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  parameters: ValidateForBackupRequest,
  options: BackupInstancesValidateForBackupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/validateForBackup{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: validateForBackupRequestSerializer(parameters),
  });
}

export async function _validateForBackupDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationJobExtendedInfo> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return operationJobExtendedInfoDeserializer(result.body);
}

/** Validate whether adhoc backup will be successful or not */
export function validateForBackup(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  parameters: ValidateForBackupRequest,
  options: BackupInstancesValidateForBackupOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<OperationJobExtendedInfo>, OperationJobExtendedInfo> {
  return getLongRunningPoller(context, _validateForBackupDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _validateForBackupSend(context, resourceGroupName, vaultName, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OperationJobExtendedInfo>, OperationJobExtendedInfo>;
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  options: BackupInstancesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupInstances{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_BackupInstanceResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _backupInstanceResourceListDeserializer(result.body);
}

/** Gets a backup instances belonging to a backup vault */
export function list(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  options: BackupInstancesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BackupInstanceResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, vaultName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getBackupInstanceOperationResultSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  backupInstanceName: string,
  operationId: string,
  options: BackupInstancesGetBackupInstanceOperationResultOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupInstances/{backupInstanceName}/operationResults/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      backupInstanceName: backupInstanceName,
      operationId: operationId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getBackupInstanceOperationResultDeserialize(
  result: PathUncheckedResponse,
): Promise<BackupInstanceResource> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return backupInstanceResourceDeserializer(result.body);
}

/** Get result of backup instance creation operation */
export async function getBackupInstanceOperationResult(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  backupInstanceName: string,
  operationId: string,
  options: BackupInstancesGetBackupInstanceOperationResultOptionalParams = {
    requestOptions: {},
  },
): Promise<BackupInstanceResource | null> {
  const result = await _getBackupInstanceOperationResultSend(
    context,
    resourceGroupName,
    vaultName,
    backupInstanceName,
    operationId,
    options,
  );
  return _getBackupInstanceOperationResultDeserialize(result);
}
