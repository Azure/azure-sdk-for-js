// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BotServiceContext as Client } from "../index.js";
import {
  errorDeserializer,
  CreateEmailSignInUrlResponse,
  createEmailSignInUrlResponseDeserializer,
} from "../../models/models.js";
import { EmailCreateSignInUrlOptionalParams } from "./options.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _createSignInUrlSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: EmailCreateSignInUrlOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/createEmailSignInUrl{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _createSignInUrlDeserialize(
  result: PathUncheckedResponse,
): Promise<CreateEmailSignInUrlResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);
    throw error;
  }

  return createEmailSignInUrlResponseDeserializer(result.body);
}

/** Creates an email channel sign in url for a Bot Service */
export async function createSignInUrl(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: EmailCreateSignInUrlOptionalParams = { requestOptions: {} },
): Promise<CreateEmailSignInUrlResponse> {
  const result = await _createSignInUrlSend(context, resourceGroupName, resourceName, options);
  return _createSignInUrlDeserialize(result);
}
