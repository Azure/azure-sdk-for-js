// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext as Client } from "../index.js";
import { errorResponseDeserializer } from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ProtectionContainerRefreshOperationResultsGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  fabricName: string,
  operationId: string,
  options: ProtectionContainerRefreshOperationResultsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupFabrics/{fabricName}/operationResults/{operationId}{?api%2Dversion}",
    {
      vaultName: vaultName,
      resourceGroupName: resourceGroupName,
      subscriptionId: context.subscriptionId,
      fabricName: fabricName,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Provides the result of the refresh operation triggered by the BeginRefresh operation. */
export async function get(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  fabricName: string,
  operationId: string,
  options: ProtectionContainerRefreshOperationResultsGetOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _getSend(
    context,
    vaultName,
    resourceGroupName,
    fabricName,
    operationId,
    options,
  );
  return _getDeserialize(result);
}
