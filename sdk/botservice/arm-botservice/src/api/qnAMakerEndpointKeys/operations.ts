// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BotServiceContext as Client } from "../index.js";
import {
  errorDeserializer,
  QnAMakerEndpointKeysRequestBody,
  qnAMakerEndpointKeysRequestBodySerializer,
  QnAMakerEndpointKeysResponse,
  qnAMakerEndpointKeysResponseDeserializer,
} from "../../models/models.js";
import { QnAMakerEndpointKeysGetOptionalParams } from "./options.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  parameters: QnAMakerEndpointKeysRequestBody,
  options: QnAMakerEndpointKeysGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.BotService/listQnAMakerEndpointKeys{?api%2Dversion}",
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
    body: qnAMakerEndpointKeysRequestBodySerializer(parameters),
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<QnAMakerEndpointKeysResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);
    throw error;
  }

  return qnAMakerEndpointKeysResponseDeserializer(result.body);
}

/** Lists the QnA Maker endpoint keys */
export async function get(
  context: Client,
  parameters: QnAMakerEndpointKeysRequestBody,
  options: QnAMakerEndpointKeysGetOptionalParams = { requestOptions: {} },
): Promise<QnAMakerEndpointKeysResponse> {
  const result = await _getSend(context, parameters, options);
  return _getDeserialize(result);
}
