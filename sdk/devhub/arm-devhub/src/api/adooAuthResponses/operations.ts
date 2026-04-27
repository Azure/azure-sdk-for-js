// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeveloperHubServiceContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  adooAuthCallRequestSerializer,
  AdooAuthInfoResponse,
  adooAuthInfoResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { AdooAuthResponsesGetAdooAuthInfoOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getAdooAuthInfoSend(
  context: Client,
  location: string,
  options: AdooAuthResponsesGetAdooAuthInfoOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DevHub/locations/{location}/adooauth/default/getADOOAuthInfo{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["parameters"]
      ? options["parameters"]
      : adooAuthCallRequestSerializer(options["parameters"]),
  });
}

export async function _getAdooAuthInfoDeserialize(
  result: PathUncheckedResponse,
): Promise<AdooAuthInfoResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return adooAuthInfoResponseDeserializer(result.body);
}

/** Gets ADOOAuth info used to authenticate users with ADO. */
export async function getAdooAuthInfo(
  context: Client,
  location: string,
  options: AdooAuthResponsesGetAdooAuthInfoOptionalParams = { requestOptions: {} },
): Promise<AdooAuthInfoResponse> {
  const result = await _getAdooAuthInfoSend(context, location, options);
  return _getAdooAuthInfoDeserialize(result);
}
