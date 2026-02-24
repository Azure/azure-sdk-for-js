// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext as Client } from "../index.js";
import type { VaultStorageConfigOperationResultResponseUnion } from "../../models/models.js";
import {
  errorResponseDeserializer,
  vaultStorageConfigOperationResultResponseUnionDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { BMSPrepareDataMoveOperationResultGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  operationId: string,
  options: BMSPrepareDataMoveOperationResultGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupstorageconfig/vaultstorageconfig/operationResults/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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
): Promise<VaultStorageConfigOperationResultResponseUnion> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return vaultStorageConfigOperationResultResponseUnionDeserializer(result.body);
}

/** Fetches operation status for data move operation on vault */
export async function get(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  operationId: string,
  options: BMSPrepareDataMoveOperationResultGetOptionalParams = { requestOptions: {} },
): Promise<VaultStorageConfigOperationResultResponseUnion> {
  const result = await _getSend(context, vaultName, resourceGroupName, operationId, options);
  return _getDeserialize(result);
}
