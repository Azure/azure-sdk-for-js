// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext as Client } from "../index.js";
import type { TimeZone, _TimeZoneListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  timeZoneDeserializer,
  _timeZoneListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  TimeZonesListByLocationOptionalParams,
  TimeZonesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByLocationSend(
  context: Client,
  locationName: string,
  options: TimeZonesListByLocationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/timeZones{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationName: locationName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _listByLocationDeserialize(
  result: PathUncheckedResponse,
): Promise<_TimeZoneListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _timeZoneListResultDeserializer(result.body);
}

/** Gets a list of managed instance time zones by location. */
export function listByLocation(
  context: Client,
  locationName: string,
  options: TimeZonesListByLocationOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TimeZone> {
  return buildPagedAsyncIterator(
    context,
    () => _listByLocationSend(context, locationName, options),
    _listByLocationDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  locationName: string,
  timeZoneId: string,
  options: TimeZonesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/timeZones/{timeZoneId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationName: locationName,
      timeZoneId: timeZoneId,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<TimeZone> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return timeZoneDeserializer(result.body);
}

/** Gets a managed instance time zone. */
export async function get(
  context: Client,
  locationName: string,
  timeZoneId: string,
  options: TimeZonesGetOptionalParams = { requestOptions: {} },
): Promise<TimeZone> {
  const result = await _getSend(context, locationName, timeZoneId, options);
  return _getDeserialize(result);
}
