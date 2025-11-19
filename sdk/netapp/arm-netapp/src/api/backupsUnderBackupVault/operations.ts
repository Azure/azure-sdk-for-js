// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  BackupRestoreFiles,
  backupRestoreFilesSerializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { BackupsUnderBackupVaultRestoreFilesOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _restoreFilesSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  backupVaultName: string,
  backupName: string,
  body: BackupRestoreFiles,
  options: BackupsUnderBackupVaultRestoreFilesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupVaults/{backupVaultName}/backups/{backupName}/restoreFiles{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      backupVaultName: backupVaultName,
      backupName: backupName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      body: backupRestoreFilesSerializer(body),
    });
}

export async function _restoreFilesDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Restore the specified files from the specified backup to the active filesystem */
export function restoreFiles(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  backupVaultName: string,
  backupName: string,
  body: BackupRestoreFiles,
  options: BackupsUnderBackupVaultRestoreFilesOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _restoreFilesDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _restoreFilesSend(
          context,
          resourceGroupName,
          accountName,
          backupVaultName,
          backupName,
          body,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}
