// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRPContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  BenefitValidateRequest,
  benefitValidateRequestSerializer,
  BenefitValidateResponse,
  benefitValidateResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { BenefitValidateOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _validateSend(
  context: Client,
  body: BenefitValidateRequest,
  options: BenefitValidateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.BillingBenefits/validate{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: benefitValidateRequestSerializer(body),
  });
}

export async function _validateDeserialize(
  result: PathUncheckedResponse,
): Promise<BenefitValidateResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return benefitValidateResponseDeserializer(result.body);
}

/** Validate savings plan purchase. */
export async function validate(
  context: Client,
  body: BenefitValidateRequest,
  options: BenefitValidateOptionalParams = { requestOptions: {} },
): Promise<BenefitValidateResponse> {
  const result = await _validateSend(context, body, options);
  return _validateDeserialize(result);
}
