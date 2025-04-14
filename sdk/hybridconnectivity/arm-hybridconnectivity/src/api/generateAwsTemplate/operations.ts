// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  GenerateAwsTemplateRequest,
  generateAwsTemplateRequestSerializer,
  _postResponseDeserializer,
} from "../../models/models.js";
import { GenerateAwsTemplatePostOptionalParams } from "./options.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _postSend(
  context: Client,
  generateAwsTemplateRequest: GenerateAwsTemplateRequest,
  options: GenerateAwsTemplatePostOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.HybridConnectivity/generateAwsTemplate{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      "api-version": context.apiVersion,
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
    body: generateAwsTemplateRequestSerializer(generateAwsTemplateRequest),
  });
}

export async function _postDeserialize(
  result: PathUncheckedResponse,
): Promise<Record<string, any>> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _postResponseDeserializer(result.body);
}

/** Retrieve AWS Cloud Formation template */
export async function post(
  context: Client,
  generateAwsTemplateRequest: GenerateAwsTemplateRequest,
  options: GenerateAwsTemplatePostOptionalParams = { requestOptions: {} },
): Promise<Record<string, any>> {
  const result = await _postSend(context, generateAwsTemplateRequest, options);
  return _postDeserialize(result);
}
