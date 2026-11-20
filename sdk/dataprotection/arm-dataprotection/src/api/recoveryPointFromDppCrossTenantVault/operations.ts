// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext as Client } from "../index.js";
import type { AzureBackupRecoveryPointResource } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  azureBackupRecoveryPointResourceDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { RecoveryPointFromDppCrossTenantVaultGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  mappingName: string,
  backupInstanceName: string,
  recoveryPointId: string,
  options: RecoveryPointFromDppCrossTenantVaultGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/crossTenantVaultMappings/{mappingName}/backupInstances/{backupInstanceName}/recoveryPoints/{recoveryPointId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      mappingName: mappingName,
      backupInstanceName: backupInstanceName,
      recoveryPointId: recoveryPointId,
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

/** Gets a vault-tier recovery point for a backup instance of the mapped source vault in a different tenant. */
export async function get(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  mappingName: string,
  backupInstanceName: string,
  recoveryPointId: string,
  options: RecoveryPointFromDppCrossTenantVaultGetOptionalParams = { requestOptions: {} },
): Promise<AzureBackupRecoveryPointResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    vaultName,
    mappingName,
    backupInstanceName,
    recoveryPointId,
    options,
  );
  return _getDeserialize(result);
}
