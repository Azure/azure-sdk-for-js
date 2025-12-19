// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureStackHCIContext as Client } from "../index.js";
import type {
  ValidateOwnershipVouchersRequest,
  ValidateOwnershipVouchersResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  validateOwnershipVouchersRequestSerializer,
  validateOwnershipVouchersResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { OwnershipVouchersValidateOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _validateSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  validationRequest: ValidateOwnershipVouchersRequest,
  options: OwnershipVouchersValidateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/locations/{location}/validateOwnershipVouchers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: validateOwnershipVouchersRequestSerializer(validationRequest),
  });
}

export async function _validateDeserialize(
  result: PathUncheckedResponse,
): Promise<ValidateOwnershipVouchersResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return validateOwnershipVouchersResponseDeserializer(result.body);
}

/** Validates ownership vouchers. */
export async function validate(
  context: Client,
  resourceGroupName: string,
  location: string,
  validationRequest: ValidateOwnershipVouchersRequest,
  options: OwnershipVouchersValidateOptionalParams = { requestOptions: {} },
): Promise<ValidateOwnershipVouchersResponse> {
  const result = await _validateSend(
    context,
    resourceGroupName,
    location,
    validationRequest,
    options,
  );
  return _validateDeserialize(result);
}
