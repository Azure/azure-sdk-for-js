// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MySQLManagementFlexibleServerContext as Client } from "../index.js";
import type { Capability, _CapabilitySetsList } from "../../models/models.js";
import {
  errorResponseDeserializer,
  capabilityDeserializer,
  _capabilitySetsListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  LocationBasedCapabilitySetListOptionalParams,
  LocationBasedCapabilitySetGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  locationName: string,
  options: LocationBasedCapabilitySetListOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DBforMySQL/locations/{locationName}/capabilitySets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationName: locationName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_CapabilitySetsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _capabilitySetsListDeserializer(result.body);
}

/** Get capabilities at specified location in a given subscription. */
export function list(
  context: Client,
  locationName: string,
  options: LocationBasedCapabilitySetListOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<Capability> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, locationName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  locationName: string,
  capabilitySetName: string,
  options: LocationBasedCapabilitySetGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DBforMySQL/locations/{locationName}/capabilitySets/{capabilitySetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationName: locationName,
      capabilitySetName: capabilitySetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Capability> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return capabilityDeserializer(result.body);
}

/** Get capabilities at specified location in a given subscription. */
export async function get(
  context: Client,
  locationName: string,
  capabilitySetName: string,
  options: LocationBasedCapabilitySetGetOptionalParams = { requestOptions: {} },
): Promise<Capability> {
  const result = await _getSend(context, locationName, capabilitySetName, options);
  return _getDeserialize(result);
}
