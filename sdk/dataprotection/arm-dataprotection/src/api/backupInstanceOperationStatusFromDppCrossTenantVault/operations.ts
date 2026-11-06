// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext as Client } from "../index.js";
import type { OperationResource } from "../../models/models.js";
import { cloudErrorDeserializer, operationResourceDeserializer } from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { BackupInstanceOperationStatusFromDppCrossTenantVaultGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  mappingName: string,
  backupInstanceName: string,
  operationId: string,
  options: BackupInstanceOperationStatusFromDppCrossTenantVaultGetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/crossTenantVaultMappings/{mappingName}/backupInstances/{backupInstanceName}/operationStatus/{operationId}{?api%2Dversion}",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<OperationResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return operationResourceDeserializer(result.body);
}

/** Gets the status of a cross-tenant operation (e.g. a cross-tenant restore) for a backup instance of the mapped source vault. */
export async function get(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  mappingName: string,
  backupInstanceName: string,
  operationId: string,
  options: BackupInstanceOperationStatusFromDppCrossTenantVaultGetOptionalParams = {
    requestOptions: {},
  },
): Promise<OperationResource> {
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
