// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext as Client } from "../index.js";
import type { ProtectionPolicyResource } from "../../models/models.js";
import {
  errorResponseDeserializer,
  protectionPolicyResourceDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ProtectionPolicyOperationResultsGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  policyName: string,
  operationId: string,
  options: ProtectionPolicyOperationResultsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupPolicies/{policyName}/operationResults/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      policyName: policyName,
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
): Promise<ProtectionPolicyResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return protectionPolicyResourceDeserializer(result.body);
}

/** Provides the result of an operation. */
export async function get(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  policyName: string,
  operationId: string,
  options: ProtectionPolicyOperationResultsGetOptionalParams = { requestOptions: {} },
): Promise<ProtectionPolicyResource> {
  const result = await _getSend(
    context,
    vaultName,
    resourceGroupName,
    policyName,
    operationId,
    options,
  );
  return _getDeserialize(result);
}
