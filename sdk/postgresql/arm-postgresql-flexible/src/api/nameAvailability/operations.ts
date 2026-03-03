// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PostgreSQLManagementFlexibleServerContext as Client } from "../index.js";
import type { CheckNameAvailabilityRequest, NameAvailabilityModel } from "../../models/models.js";
import {
  errorResponseDeserializer,
  checkNameAvailabilityRequestSerializer,
  nameAvailabilityModelDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NameAvailabilityCheckWithLocationOptionalParams,
  NameAvailabilityCheckGloballyOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _checkWithLocationSend(
  context: Client,
  locationName: string,
  parameters: CheckNameAvailabilityRequest,
  options: NameAvailabilityCheckWithLocationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DBforPostgreSQL/locations/{locationName}/checkNameAvailability{?api%2Dversion}",
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
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: checkNameAvailabilityRequestSerializer(parameters),
  });
}

export async function _checkWithLocationDeserialize(
  result: PathUncheckedResponse,
): Promise<NameAvailabilityModel> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return nameAvailabilityModelDeserializer(result.body);
}

/** Check the availability of name for resource */
export async function checkWithLocation(
  context: Client,
  locationName: string,
  parameters: CheckNameAvailabilityRequest,
  options: NameAvailabilityCheckWithLocationOptionalParams = { requestOptions: {} },
): Promise<NameAvailabilityModel> {
  const result = await _checkWithLocationSend(context, locationName, parameters, options);
  return _checkWithLocationDeserialize(result);
}

export function _checkGloballySend(
  context: Client,
  parameters: CheckNameAvailabilityRequest,
  options: NameAvailabilityCheckGloballyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DBforPostgreSQL/checkNameAvailability{?api%2Dversion}",
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
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: checkNameAvailabilityRequestSerializer(parameters),
  });
}

export async function _checkGloballyDeserialize(
  result: PathUncheckedResponse,
): Promise<NameAvailabilityModel> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return nameAvailabilityModelDeserializer(result.body);
}

/** Checks the validity and availability of the given name, to assign it to a new server or to use it as the base name of a new pair of virtual endpoints. */
export async function checkGlobally(
  context: Client,
  parameters: CheckNameAvailabilityRequest,
  options: NameAvailabilityCheckGloballyOptionalParams = { requestOptions: {} },
): Promise<NameAvailabilityModel> {
  const result = await _checkGloballySend(context, parameters, options);
  return _checkGloballyDeserialize(result);
}
