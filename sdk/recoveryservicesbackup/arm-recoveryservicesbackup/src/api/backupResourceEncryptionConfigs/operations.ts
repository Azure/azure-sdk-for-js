// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext as Client } from "../index.js";
import type {
  BackupResourceEncryptionConfigExtendedResource,
  BackupResourceEncryptionConfigResource,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  backupResourceEncryptionConfigExtendedResourceDeserializer,
  backupResourceEncryptionConfigResourceSerializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  BackupResourceEncryptionConfigsUpdateOptionalParams,
  BackupResourceEncryptionConfigsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _updateSend(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  parameters: BackupResourceEncryptionConfigResource,
  options: BackupResourceEncryptionConfigsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupEncryptionConfigs/backupResourceEncryptionConfig{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: backupResourceEncryptionConfigResourceSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Updates Vault encryption config. */
export async function update(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  parameters: BackupResourceEncryptionConfigResource,
  options: BackupResourceEncryptionConfigsUpdateOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _updateSend(context, vaultName, resourceGroupName, parameters, options);
  return _updateDeserialize(result);
}

export function _getSend(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  options: BackupResourceEncryptionConfigsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupEncryptionConfigs/backupResourceEncryptionConfig{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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
): Promise<BackupResourceEncryptionConfigExtendedResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return backupResourceEncryptionConfigExtendedResourceDeserializer(result.body);
}

/** Fetches Vault Encryption config. */
export async function get(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  options: BackupResourceEncryptionConfigsGetOptionalParams = { requestOptions: {} },
): Promise<BackupResourceEncryptionConfigExtendedResource> {
  const result = await _getSend(context, vaultName, resourceGroupName, options);
  return _getDeserialize(result);
}
