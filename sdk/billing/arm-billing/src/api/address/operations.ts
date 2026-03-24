// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext as Client } from "../index.js";
import type { AddressDetails, AddressValidationResponse } from "../../models/models.js";
import {
  errorResponseDeserializer,
  addressDetailsSerializer,
  addressValidationResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { AddressValidateOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _validateSend(
  context: Client,
  parameters: AddressDetails,
  options: AddressValidateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/validateAddress{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: addressDetailsSerializer(parameters),
  });
}

export async function _validateDeserialize(
  result: PathUncheckedResponse,
): Promise<AddressValidationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return addressValidationResponseDeserializer(result.body);
}

/** Validates an address. Use the operation to validate an address before using it as soldTo or a billTo address. */
export async function validate(
  context: Client,
  parameters: AddressDetails,
  options: AddressValidateOptionalParams = { requestOptions: {} },
): Promise<AddressValidationResponse> {
  const result = await _validateSend(context, parameters, options);
  return _validateDeserialize(result);
}
