// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { commonCloudErrorDeserializer } from "../../models/common/models.js";
import type {
  LocationsAPIAscLocation,
  _LocationsAPIAscLocationList,
} from "../../models/locationsAPI/models.js";
import {
  locationsAPIAscLocationDeserializer,
  _locationsAPIAscLocationListDeserializer,
} from "../../models/locationsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { LocationsListOptionalParams, LocationsGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: LocationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/locations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2015-06-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_LocationsAPIAscLocationList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return _locationsAPIAscLocationListDeserializer(result.body);
}

/** The location of the responsible ASC of the specific subscription (home region). For each subscription there is only one responsible location. The location in the response should be used to read or write other resources in ASC according to their ID. */
export function list(
  context: Client,
  options: LocationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LocationsAPIAscLocation> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2015-06-01-preview" },
  );
}

export function _getSend(
  context: Client,
  ascLocation: string,
  options: LocationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/locations/{ascLocation}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      ascLocation: ascLocation,
      "api%2Dversion": "2015-06-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<LocationsAPIAscLocation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return locationsAPIAscLocationDeserializer(result.body);
}

/** Details of a specific location */
export async function get(
  context: Client,
  ascLocation: string,
  options: LocationsGetOptionalParams = { requestOptions: {} },
): Promise<LocationsAPIAscLocation> {
  const result = await _getSend(context, ascLocation, options);
  return _getDeserialize(result);
}
