// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HelpContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  checkNameAvailabilityRequestSerializer,
  CheckNameAvailabilityResponse,
  checkNameAvailabilityResponseDeserializer,
} from "../../models/models.js";
import { CheckNameAvailabilityCheckAvailabilityOptionalParams } from "./options.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _checkAvailabilitySend(
  context: Client,
  scope: string,
  options: CheckNameAvailabilityCheckAvailabilityOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Help/checkNameAvailability{?api%2Dversion}",
    {
      scope: scope,
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
    body: !options["checkNameAvailabilityRequest"]
      ? options["checkNameAvailabilityRequest"]
      : checkNameAvailabilityRequestSerializer(options["checkNameAvailabilityRequest"]),
  });
}

export async function _checkAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckNameAvailabilityResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return checkNameAvailabilityResponseDeserializer(result.body);
}

/** This API is used to check the uniqueness of a resource name used for a diagnostic, troubleshooter or solutions */
export async function checkAvailability(
  context: Client,
  scope: string,
  options: CheckNameAvailabilityCheckAvailabilityOptionalParams = {
    requestOptions: {},
  },
): Promise<CheckNameAvailabilityResponse> {
  const result = await _checkAvailabilitySend(context, scope, options);
  return _checkAvailabilityDeserialize(result);
}
