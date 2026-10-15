// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext as Client } from "../index.js";
import type {
  AzureBackupFindRestorableTimeRangesRequest,
  AzureBackupFindRestorableTimeRangesResponseResource,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  azureBackupFindRestorableTimeRangesRequestSerializer,
  azureBackupFindRestorableTimeRangesResponseResourceDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { RestorableTimeRangesFromDppCrossTenantVaultFindOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _findSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  mappingName: string,
  backupInstanceName: string,
  body: AzureBackupFindRestorableTimeRangesRequest,
  options: RestorableTimeRangesFromDppCrossTenantVaultFindOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/crossTenantVaultMappings/{mappingName}/backupInstances/{backupInstanceName}/findRestorableTimeRanges{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      mappingName: mappingName,
      backupInstanceName: backupInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-08-31-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: azureBackupFindRestorableTimeRangesRequestSerializer(body),
  });
}

export async function _findDeserialize(
  result: PathUncheckedResponse,
): Promise<AzureBackupFindRestorableTimeRangesResponseResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return azureBackupFindRestorableTimeRangesResponseResourceDeserializer(result.body);
}

/** Finds the restorable time ranges for a backup instance of the mapped source vault in a different tenant. */
export async function find(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  mappingName: string,
  backupInstanceName: string,
  body: AzureBackupFindRestorableTimeRangesRequest,
  options: RestorableTimeRangesFromDppCrossTenantVaultFindOptionalParams = { requestOptions: {} },
): Promise<AzureBackupFindRestorableTimeRangesResponseResource> {
  const result = await _findSend(
    context,
    resourceGroupName,
    vaultName,
    mappingName,
    backupInstanceName,
    body,
    options,
  );
  return _findDeserialize(result);
}
