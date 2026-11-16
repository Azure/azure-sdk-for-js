// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HybridConnectivityManagementAPIContext as Client } from "../index.js";
import type {
  GenerateGcpTemplateRequest,
  GenerateGcpTemplateResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  generateGcpTemplateRequestSerializer,
  generateGcpTemplateResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { GenerateGcpTemplatePostOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _postSend(
  context: Client,
  generateGcpTemplateRequest: GenerateGcpTemplateRequest,
  options: GenerateGcpTemplatePostOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.HybridConnectivity/generateGcpTemplate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2027-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: generateGcpTemplateRequestSerializer(generateGcpTemplateRequest),
  });
}

export async function _postDeserialize(
  result: PathUncheckedResponse,
): Promise<GenerateGcpTemplateResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return generateGcpTemplateResponseDeserializer(result.body);
}

/** Retrieve GCP Access Control template */
export async function post(
  context: Client,
  generateGcpTemplateRequest: GenerateGcpTemplateRequest,
  options: GenerateGcpTemplatePostOptionalParams = { requestOptions: {} },
): Promise<GenerateGcpTemplateResponse> {
  const result = await _postSend(context, generateGcpTemplateRequest, options);
  return _postDeserialize(result);
}
