// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext as Client } from "../index.js";
import type { CrossTenantVaultMappingStatusResponse } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  crossTenantVaultMappingStatusResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { DppCrossTenantVaultMappingStatusCheckOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _checkSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  options: DppCrossTenantVaultMappingStatusCheckOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/crossTenantVaultMappingStatus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      "api%2Dversion": context.apiVersion ?? "2026-08-31-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _checkDeserialize(
  result: PathUncheckedResponse,
): Promise<CrossTenantVaultMappingStatusResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return crossTenantVaultMappingStatusResponseDeserializer(result.body);
}

/** Gets the status (Active/Inactive) of a cross-tenant vault mapping from the source vault side. */
export async function check(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  options: DppCrossTenantVaultMappingStatusCheckOptionalParams = { requestOptions: {} },
): Promise<CrossTenantVaultMappingStatusResponse> {
  const result = await _checkSend(context, resourceGroupName, vaultName, options);
  return _checkDeserialize(result);
}
