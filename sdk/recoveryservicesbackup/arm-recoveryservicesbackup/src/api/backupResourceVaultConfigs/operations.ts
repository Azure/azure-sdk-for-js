// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext as Client } from "../index.js";
import type { BackupResourceVaultConfigResource } from "../../models/models.js";
import {
  errorResponseDeserializer,
  backupResourceVaultConfigResourceSerializer,
  backupResourceVaultConfigResourceDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  BackupResourceVaultConfigsUpdateOptionalParams,
  BackupResourceVaultConfigsPutOptionalParams,
  BackupResourceVaultConfigsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _updateSend(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  parameters: BackupResourceVaultConfigResource,
  options: BackupResourceVaultConfigsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupconfig/vaultconfig{?api%2Dversion}",
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
    headers: {
      ...(options?.xMsAuthorizationAuxiliary !== undefined
        ? { "x-ms-authorization-auxiliary": options?.xMsAuthorizationAuxiliary }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: backupResourceVaultConfigResourceSerializer(parameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<BackupResourceVaultConfigResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return backupResourceVaultConfigResourceDeserializer(result.body);
}

/** Updates vault security config. */
export async function update(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  parameters: BackupResourceVaultConfigResource,
  options: BackupResourceVaultConfigsUpdateOptionalParams = { requestOptions: {} },
): Promise<BackupResourceVaultConfigResource> {
  const result = await _updateSend(context, vaultName, resourceGroupName, parameters, options);
  return _updateDeserialize(result);
}

export function _putSend(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  parameters: BackupResourceVaultConfigResource,
  options: BackupResourceVaultConfigsPutOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupconfig/vaultconfig{?api%2Dversion}",
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
    headers: {
      ...(options?.xMsAuthorizationAuxiliary !== undefined
        ? { "x-ms-authorization-auxiliary": options?.xMsAuthorizationAuxiliary }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: backupResourceVaultConfigResourceSerializer(parameters),
  });
}

export async function _putDeserialize(
  result: PathUncheckedResponse,
): Promise<BackupResourceVaultConfigResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return backupResourceVaultConfigResourceDeserializer(result.body);
}

/** Updates vault security config. */
export async function put(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  parameters: BackupResourceVaultConfigResource,
  options: BackupResourceVaultConfigsPutOptionalParams = { requestOptions: {} },
): Promise<BackupResourceVaultConfigResource> {
  const result = await _putSend(context, vaultName, resourceGroupName, parameters, options);
  return _putDeserialize(result);
}

export function _getSend(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  options: BackupResourceVaultConfigsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupconfig/vaultconfig{?api%2Dversion}",
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
): Promise<BackupResourceVaultConfigResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return backupResourceVaultConfigResourceDeserializer(result.body);
}

/** Fetches resource vault config. */
export async function get(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  options: BackupResourceVaultConfigsGetOptionalParams = { requestOptions: {} },
): Promise<BackupResourceVaultConfigResource> {
  const result = await _getSend(context, vaultName, resourceGroupName, options);
  return _getDeserialize(result);
}
