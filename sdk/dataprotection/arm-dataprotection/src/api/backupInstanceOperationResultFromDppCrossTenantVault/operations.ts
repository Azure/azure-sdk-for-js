// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext as Client } from "../index.js";
import type { OperationJobExtendedInfo } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  operationJobExtendedInfoDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { BackupInstanceOperationResultFromDppCrossTenantVaultGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  mappingName: string,
  backupInstanceName: string,
  operationId: string,
  options: BackupInstanceOperationResultFromDppCrossTenantVaultGetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/crossTenantVaultMappings/{mappingName}/backupInstances/{backupInstanceName}/operationResults/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      mappingName: mappingName,
      backupInstanceName: backupInstanceName,
      operationId: operationId,
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
): Promise<OperationJobExtendedInfo | void> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  if (!result.body) {
    return;
  }

  return operationJobExtendedInfoDeserializer(result.body);
}

/**
 * Fetches the result of a cross-tenant operation (e.g. a cross-tenant restore) for a backup instance of the
 * mapped source vault - the leg the restore's Location header points at. Returns 202 with Location/Retry-After
 * while pending, and 200 with the operation result body when complete.
 */
export async function get(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  mappingName: string,
  backupInstanceName: string,
  operationId: string,
  options: BackupInstanceOperationResultFromDppCrossTenantVaultGetOptionalParams = {
    requestOptions: {},
  },
): Promise<OperationJobExtendedInfo | void> {
  const result = await _getSend(
    context,
    resourceGroupName,
    vaultName,
    mappingName,
    backupInstanceName,
    operationId,
    options,
  );
  return _getDeserialize(result);
}
