// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext as Client } from "../index.js";
import type { AzureBackupJobResource } from "../../models/models.js";
import { cloudErrorDeserializer, azureBackupJobResourceDeserializer } from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { JobFromDppCrossTenantVaultGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  mappingName: string,
  jobId: string,
  options: JobFromDppCrossTenantVaultGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/crossTenantVaultMappings/{mappingName}/backupJobs/{jobId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      mappingName: mappingName,
      jobId: jobId,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<AzureBackupJobResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return azureBackupJobResourceDeserializer(result.body);
}

/** Gets a job of the mapped source vault in a different tenant. */
export async function get(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  mappingName: string,
  jobId: string,
  options: JobFromDppCrossTenantVaultGetOptionalParams = { requestOptions: {} },
): Promise<AzureBackupJobResource> {
  const result = await _getSend(context, resourceGroupName, vaultName, mappingName, jobId, options);
  return _getDeserialize(result);
}
