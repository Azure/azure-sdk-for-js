// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BicepContext as Client } from "../index.js";
import {
  DecompileOperationRequest,
  decompileOperationRequestSerializer,
  DecompileOperationSuccessResponse,
  decompileOperationSuccessResponseDeserializer,
  errorResponseDeserializer,
} from "../../models/models.js";
import { DecompileOperationGroupBicepOptionalParams } from "./options.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _bicepSend(
  context: Client,
  decompileOperationRequest: DecompileOperationRequest,
  options: DecompileOperationGroupBicepOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Resources/decompileBicep{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: decompileOperationRequestSerializer(decompileOperationRequest),
  });
}

export async function _bicepDeserialize(
  result: PathUncheckedResponse,
): Promise<DecompileOperationSuccessResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return decompileOperationSuccessResponseDeserializer(result.body);
}

/** Decompiles an ARM json template into a Bicep template */
export async function bicep(
  context: Client,
  decompileOperationRequest: DecompileOperationRequest,
  options: DecompileOperationGroupBicepOptionalParams = { requestOptions: {} },
): Promise<DecompileOperationSuccessResponse> {
  const result = await _bicepSend(context, decompileOperationRequest, options);
  return _bicepDeserialize(result);
}
