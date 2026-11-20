// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext as Client } from "../index.js";
import type { _AzureBackupJobResourceList, AzureBackupJobResource } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  _azureBackupJobResourceListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { BackupJobsFromDppCrossTenantVaultListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  mappingName: string,
  options: BackupJobsFromDppCrossTenantVaultListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/crossTenantVaultMappings/{mappingName}/backupJobs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      mappingName: mappingName,
      "api%2Dversion": context.apiVersion ?? "2026-08-31-preview",
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
): Promise<_AzureBackupJobResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _azureBackupJobResourceListDeserializer(result.body);
}

/** Lists the jobs of the mapped source vault in a different tenant. */
export function list(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  mappingName: string,
  options: BackupJobsFromDppCrossTenantVaultListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AzureBackupJobResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, vaultName, mappingName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-08-31-preview",
    },
  );
}
