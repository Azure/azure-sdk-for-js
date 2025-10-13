// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MySQLManagementFlexibleServerContext as Client } from "../index.js";
import type { NameAvailabilityRequest, NameAvailability } from "../../models/models.js";
import {
  errorResponseDeserializer,
  nameAvailabilityRequestSerializer,
  nameAvailabilityDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { CheckNameAvailabilityExecuteOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _executeSend(
  context: Client,
  locationName: string,
  nameAvailabilityRequest: NameAvailabilityRequest,
  options: CheckNameAvailabilityExecuteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DBforMySQL/locations/{locationName}/checkNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationName: locationName,
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
    body: nameAvailabilityRequestSerializer(nameAvailabilityRequest),
  });
}

export async function _executeDeserialize(
  result: PathUncheckedResponse,
): Promise<NameAvailability> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return nameAvailabilityDeserializer(result.body);
}

/** Check the availability of name for server */
export async function execute(
  context: Client,
  locationName: string,
  nameAvailabilityRequest: NameAvailabilityRequest,
  options: CheckNameAvailabilityExecuteOptionalParams = { requestOptions: {} },
): Promise<NameAvailability> {
  const result = await _executeSend(context, locationName, nameAvailabilityRequest, options);
  return _executeDeserialize(result);
}
