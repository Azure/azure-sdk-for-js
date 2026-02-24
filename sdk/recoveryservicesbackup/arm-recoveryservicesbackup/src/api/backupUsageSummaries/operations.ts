// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext as Client } from "../index.js";
import type { _BackupManagementUsageList, BackupManagementUsage } from "../../models/models.js";
import {
  errorResponseDeserializer,
  _backupManagementUsageListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { BackupUsageSummariesListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  options: BackupUsageSummariesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupUsageSummaries{?api%2Dversion,%24filter,%24skipToken}",
    {
      vaultName: vaultName,
      resourceGroupName: resourceGroupName,
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
      "%24filter": options?.filter,
      "%24skipToken": options?.skipToken,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_BackupManagementUsageList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _backupManagementUsageListDeserializer(result.body);
}

/** Fetches the backup management usage summaries of the vault. */
export function list(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  options: BackupUsageSummariesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BackupManagementUsage> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, vaultName, resourceGroupName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-01-preview",
    },
  );
}
