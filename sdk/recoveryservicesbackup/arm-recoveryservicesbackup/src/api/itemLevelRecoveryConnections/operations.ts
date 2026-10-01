// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext as Client } from "../index.js";
import type {
  InstantItemRecoveryTarget,
  ILRRequestResource,
  InstantItemRecoveryOperationResultRequest,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  instantItemRecoveryTargetDeserializer,
  ilrRequestResourceSerializer,
  instantItemRecoveryOperationResultRequestSerializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ItemLevelRecoveryConnectionsListInstantItemRecoveryOperationResultOptionalParams,
  ItemLevelRecoveryConnectionsRevokeOptionalParams,
  ItemLevelRecoveryConnectionsProvisionOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listInstantItemRecoveryOperationResultSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  fabricName: string,
  containerName: string,
  protectedItemName: string,
  recoveryPointId: string,
  body: InstantItemRecoveryOperationResultRequest,
  options: ItemLevelRecoveryConnectionsListInstantItemRecoveryOperationResultOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupFabrics/{fabricName}/protectionContainers/{containerName}/protectedItems/{protectedItemName}/recoveryPoints/{recoveryPointId}/listInstantItemRecoveryOperationResult{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      fabricName: fabricName,
      containerName: containerName,
      protectedItemName: protectedItemName,
      recoveryPointId: recoveryPointId,
      "api%2Dversion": context.apiVersion ?? "2026-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: instantItemRecoveryOperationResultRequestSerializer(body),
  });
}

export async function _listInstantItemRecoveryOperationResultDeserialize(
  result: PathUncheckedResponse,
): Promise<InstantItemRecoveryTarget> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return instantItemRecoveryTargetDeserializer(result.body);
}

/** Fetches the mount scripts (iSCSI connection details) for an active Instant Item Recovery (ILR) session on the recovery point. Required from API version 2026-08-01 onwards; replaces the scripts previously returned inline in the operationsStatus (ILR provision) response. */
export async function listInstantItemRecoveryOperationResult(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  fabricName: string,
  containerName: string,
  protectedItemName: string,
  recoveryPointId: string,
  body: InstantItemRecoveryOperationResultRequest,
  options: ItemLevelRecoveryConnectionsListInstantItemRecoveryOperationResultOptionalParams = {
    requestOptions: {},
  },
): Promise<InstantItemRecoveryTarget> {
  const result = await _listInstantItemRecoveryOperationResultSend(
    context,
    resourceGroupName,
    vaultName,
    fabricName,
    containerName,
    protectedItemName,
    recoveryPointId,
    body,
    options,
  );
  return _listInstantItemRecoveryOperationResultDeserialize(result);
}

export function _revokeSend(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  fabricName: string,
  containerName: string,
  protectedItemName: string,
  recoveryPointId: string,
  options: ItemLevelRecoveryConnectionsRevokeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupFabrics/{fabricName}/protectionContainers/{containerName}/protectedItems/{protectedItemName}/recoveryPoints/{recoveryPointId}/revokeInstantItemRecovery{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      fabricName: fabricName,
      containerName: containerName,
      protectedItemName: protectedItemName,
      recoveryPointId: recoveryPointId,
      "api%2Dversion": context.apiVersion ?? "2026-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _revokeDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/**
 * Revokes an iSCSI connection which can be used to download a script. Executing this script opens a file explorer
 * displaying all recoverable files and folders. This is an asynchronous operation.
 */
export async function revoke(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  fabricName: string,
  containerName: string,
  protectedItemName: string,
  recoveryPointId: string,
  options: ItemLevelRecoveryConnectionsRevokeOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _revokeSend(
    context,
    vaultName,
    resourceGroupName,
    fabricName,
    containerName,
    protectedItemName,
    recoveryPointId,
    options,
  );
  return _revokeDeserialize(result);
}

export function _provisionSend(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  fabricName: string,
  containerName: string,
  protectedItemName: string,
  recoveryPointId: string,
  parameters: ILRRequestResource,
  options: ItemLevelRecoveryConnectionsProvisionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupFabrics/{fabricName}/protectionContainers/{containerName}/protectedItems/{protectedItemName}/recoveryPoints/{recoveryPointId}/provisionInstantItemRecovery{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      fabricName: fabricName,
      containerName: containerName,
      protectedItemName: protectedItemName,
      recoveryPointId: recoveryPointId,
      "api%2Dversion": context.apiVersion ?? "2026-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: ilrRequestResourceSerializer(parameters),
  });
}

export async function _provisionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/**
 * Provisions a script which invokes an iSCSI connection to the backup data. Executing this script opens a file
 * explorer displaying all the recoverable files and folders. This is an asynchronous operation. To know the status of
 * provisioning, call GetProtectedItemOperationResult API.
 */
export async function provision(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  fabricName: string,
  containerName: string,
  protectedItemName: string,
  recoveryPointId: string,
  parameters: ILRRequestResource,
  options: ItemLevelRecoveryConnectionsProvisionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _provisionSend(
    context,
    vaultName,
    resourceGroupName,
    fabricName,
    containerName,
    protectedItemName,
    recoveryPointId,
    parameters,
    options,
  );
  return _provisionDeserialize(result);
}
