// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext as Client } from "../index.js";
import type { _WorkloadItemResourceList, WorkloadItemResource } from "../../models/models.js";
import {
  errorResponseDeserializer,
  _workloadItemResourceListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { BackupWorkloadItemsListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  fabricName: string,
  containerName: string,
  options: BackupWorkloadItemsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupFabrics/{fabricName}/protectionContainers/{containerName}/items{?api%2Dversion,%24filter,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      fabricName: fabricName,
      containerName: containerName,
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
): Promise<_WorkloadItemResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _workloadItemResourceListDeserializer(result.body);
}

/**
 * Provides a pageable list of workload item of a specific container according to the query filter and the pagination
 * parameters.
 */
export function list(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  fabricName: string,
  containerName: string,
  options: BackupWorkloadItemsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<WorkloadItemResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, vaultName, resourceGroupName, fabricName, containerName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-01-preview",
    },
  );
}
