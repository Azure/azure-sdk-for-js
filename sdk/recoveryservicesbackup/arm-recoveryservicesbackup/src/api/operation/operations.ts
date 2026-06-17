// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ValidateOperationRequestResource,
  validateOperationRequestResourceSerializer,
  ValidateOperationsResponse,
  validateOperationsResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { OperationValidateOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _validateSend(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  parameters: ValidateOperationRequestResource,
  options: OperationValidateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupValidateOperation{?api%2Dversion}",
    {
      vaultName: vaultName,
      resourceGroupName: resourceGroupName,
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-01-31-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: validateOperationRequestResourceSerializer(parameters),
    });
}

export async function _validateDeserialize(
  result: PathUncheckedResponse,
): Promise<ValidateOperationsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return validateOperationsResponseDeserializer(result.body);
}

/** Validate operation for specified backed up item. This is a synchronous operation. */
export async function validate(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  parameters: ValidateOperationRequestResource,
  options: OperationValidateOptionalParams = { requestOptions: {} },
): Promise<ValidateOperationsResponse> {
  const result = await _validateSend(context, vaultName, resourceGroupName, parameters, options);
  return _validateDeserialize(result);
}
