// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  AzureBackupRecoveryPointResource,
  azureBackupRecoveryPointResourceDeserializer,
  _AzureBackupRecoveryPointResourceList,
  _azureBackupRecoveryPointResourceListDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { RecoveryPointsListOptionalParams, RecoveryPointsGetOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  backupInstanceName: string,
  options: RecoveryPointsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupInstances/{backupInstanceName}/recoveryPoints{?api%2Dversion,%24filter,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      backupInstanceName: backupInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01",
      "%24filter": options?.filter,
      "%24skipToken": options?.skipToken,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_AzureBackupRecoveryPointResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _azureBackupRecoveryPointResourceListDeserializer(result.body);
}

/** Returns a list of Recovery Points for a DataSource in a vault. */
export function list(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  backupInstanceName: string,
  options: RecoveryPointsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AzureBackupRecoveryPointResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, vaultName, backupInstanceName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-03-01" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  backupInstanceName: string,
  recoveryPointId: string,
  options: RecoveryPointsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupInstances/{backupInstanceName}/recoveryPoints/{recoveryPointId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      backupInstanceName: backupInstanceName,
      recoveryPointId: recoveryPointId,
      "api%2Dversion": context.apiVersion ?? "2026-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<AzureBackupRecoveryPointResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return azureBackupRecoveryPointResourceDeserializer(result.body);
}

/** Gets a Recovery Point using recoveryPointId for a Datasource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  backupInstanceName: string,
  recoveryPointId: string,
  options: RecoveryPointsGetOptionalParams = { requestOptions: {} },
): Promise<AzureBackupRecoveryPointResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    vaultName,
    backupInstanceName,
    recoveryPointId,
    options,
  );
  return _getDeserialize(result);
}
