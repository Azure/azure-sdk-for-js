// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext as Client } from "../index.js";
import type {
  ProtectionIntentResource,
  PreValidateEnableBackupRequest,
  PreValidateEnableBackupResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  protectionIntentResourceSerializer,
  protectionIntentResourceDeserializer,
  preValidateEnableBackupRequestSerializer,
  preValidateEnableBackupResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ProtectionIntentValidateOptionalParams,
  ProtectionIntentDeleteOptionalParams,
  ProtectionIntentCreateOrUpdateOptionalParams,
  ProtectionIntentGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _validateSend(
  context: Client,
  azureRegion: string,
  parameters: PreValidateEnableBackupRequest,
  options: ProtectionIntentValidateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.RecoveryServices/locations/{azureRegion}/backupPreValidateProtection{?api%2Dversion}",
    {
      azureRegion: azureRegion,
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: preValidateEnableBackupRequestSerializer(parameters),
  });
}

export async function _validateDeserialize(
  result: PathUncheckedResponse,
): Promise<PreValidateEnableBackupResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return preValidateEnableBackupResponseDeserializer(result.body);
}

/**
 * It will validate followings
 * 1. Vault capacity
 * 2. VM is already protected
 * 3. Any VM related configuration passed in properties.
 */
export async function validate(
  context: Client,
  azureRegion: string,
  parameters: PreValidateEnableBackupRequest,
  options: ProtectionIntentValidateOptionalParams = { requestOptions: {} },
): Promise<PreValidateEnableBackupResponse> {
  const result = await _validateSend(context, azureRegion, parameters, options);
  return _validateDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  fabricName: string,
  intentObjectName: string,
  options: ProtectionIntentDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupFabrics/{fabricName}/backupProtectionIntent/{intentObjectName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      fabricName: fabricName,
      intentObjectName: intentObjectName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Used to remove intent from an item */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  fabricName: string,
  intentObjectName: string,
  options: ProtectionIntentDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    vaultName,
    resourceGroupName,
    fabricName,
    intentObjectName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  fabricName: string,
  intentObjectName: string,
  parameters: ProtectionIntentResource,
  options: ProtectionIntentCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupFabrics/{fabricName}/backupProtectionIntent/{intentObjectName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      fabricName: fabricName,
      intentObjectName: intentObjectName,
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
    body: protectionIntentResourceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ProtectionIntentResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return protectionIntentResourceDeserializer(result.body);
}

/** Create Intent for Enabling backup of an item. This is a synchronous operation. */
export async function createOrUpdate(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  fabricName: string,
  intentObjectName: string,
  parameters: ProtectionIntentResource,
  options: ProtectionIntentCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<ProtectionIntentResource> {
  const result = await _createOrUpdateSend(
    context,
    vaultName,
    resourceGroupName,
    fabricName,
    intentObjectName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  fabricName: string,
  intentObjectName: string,
  options: ProtectionIntentGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupFabrics/{fabricName}/backupProtectionIntent/{intentObjectName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      fabricName: fabricName,
      intentObjectName: intentObjectName,
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
): Promise<ProtectionIntentResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return protectionIntentResourceDeserializer(result.body);
}

/**
 * Provides the details of the protection intent up item. This is an asynchronous operation. To know the status of the operation,
 * call the GetItemOperationResult API.
 */
export async function get(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  fabricName: string,
  intentObjectName: string,
  options: ProtectionIntentGetOptionalParams = { requestOptions: {} },
): Promise<ProtectionIntentResource> {
  const result = await _getSend(
    context,
    vaultName,
    resourceGroupName,
    fabricName,
    intentObjectName,
    options,
  );
  return _getDeserialize(result);
}
