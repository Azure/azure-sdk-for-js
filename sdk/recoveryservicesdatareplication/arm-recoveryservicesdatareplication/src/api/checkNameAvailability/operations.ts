// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  checkNameAvailabilityModelSerializer,
  CheckNameAvailabilityResponseModel,
  checkNameAvailabilityResponseModelDeserializer,
} from "../../models/models.js";
import { CheckNameAvailabilityPostOptionalParams } from "./options.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _postSend(
  context: Client,
  location: string,
  options: CheckNameAvailabilityPostOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DataReplication/locations/{location}/checkNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: !options["body"]
      ? options["body"]
      : checkNameAvailabilityModelSerializer(options["body"]),
  });
}

export async function _postDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckNameAvailabilityResponseModel> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return checkNameAvailabilityResponseModelDeserializer(result.body);
}

/** Checks the resource name availability. */
export async function post(
  context: Client,
  location: string,
  options: CheckNameAvailabilityPostOptionalParams = { requestOptions: {} },
): Promise<CheckNameAvailabilityResponseModel> {
  const result = await _postSend(context, location, options);
  return _postDeserialize(result);
}
