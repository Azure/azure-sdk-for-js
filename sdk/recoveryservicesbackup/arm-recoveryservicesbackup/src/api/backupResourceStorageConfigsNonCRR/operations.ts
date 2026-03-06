// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext as Client } from "../index.js";
import type { BackupResourceConfigResource } from "../../models/models.js";
import {
  errorResponseDeserializer,
  backupResourceConfigResourceSerializer,
  backupResourceConfigResourceDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  BackupResourceStorageConfigsNonCRRPatchOptionalParams,
  BackupResourceStorageConfigsNonCRRUpdateOptionalParams,
  BackupResourceStorageConfigsNonCRRGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _patchSend(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  parameters: BackupResourceConfigResource,
  options: BackupResourceStorageConfigsNonCRRPatchOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupstorageconfig/vaultstorageconfig{?api%2Dversion}",
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
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: backupResourceConfigResourceSerializer(parameters),
  });
}

export async function _patchDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Updates vault storage model type. */
export async function patch(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  parameters: BackupResourceConfigResource,
  options: BackupResourceStorageConfigsNonCRRPatchOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _patchSend(context, vaultName, resourceGroupName, parameters, options);
  return _patchDeserialize(result);
}

export function _updateSend(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  parameters: BackupResourceConfigResource,
  options: BackupResourceStorageConfigsNonCRRUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupstorageconfig/vaultstorageconfig{?api%2Dversion}",
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
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: backupResourceConfigResourceSerializer(parameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<BackupResourceConfigResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return backupResourceConfigResourceDeserializer(result.body);
}

/** Updates vault storage model type. */
export async function update(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  parameters: BackupResourceConfigResource,
  options: BackupResourceStorageConfigsNonCRRUpdateOptionalParams = { requestOptions: {} },
): Promise<BackupResourceConfigResource> {
  const result = await _updateSend(context, vaultName, resourceGroupName, parameters, options);
  return _updateDeserialize(result);
}

export function _getSend(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  options: BackupResourceStorageConfigsNonCRRGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupstorageconfig/vaultstorageconfig{?api%2Dversion}",
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
): Promise<BackupResourceConfigResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return backupResourceConfigResourceDeserializer(result.body);
}

/** Fetches resource storage config. */
export async function get(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  options: BackupResourceStorageConfigsNonCRRGetOptionalParams = { requestOptions: {} },
): Promise<BackupResourceConfigResource> {
  const result = await _getSend(context, vaultName, resourceGroupName, options);
  return _getDeserialize(result);
}
