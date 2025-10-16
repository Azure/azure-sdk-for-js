// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext as Client } from "../index.js";
import type { BackupVaultResource } from "../../models/models.js";
import { cloudErrorDeserializer, backupVaultResourceDeserializer } from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { BackupVaultOperationResultsGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  operationId: string,
  options: BackupVaultOperationResultsGetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/operationResults/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      operationId: operationId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<BackupVaultResource> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return backupVaultResourceDeserializer(result.body);
}

/** Get a BackupVaultResource */
export async function get(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  operationId: string,
  options: BackupVaultOperationResultsGetOptionalParams = {
    requestOptions: {},
  },
): Promise<BackupVaultResource | null> {
  const result = await _getSend(context, resourceGroupName, vaultName, operationId, options);
  return _getDeserialize(result);
}
