// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  Capability,
  capabilityDeserializer,
  _CapabilitySetsList,
  _capabilitySetsListDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  LocationBasedCapabilitySetListOptionalParams,
  LocationBasedCapabilitySetGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  locationName: string,
  options: LocationBasedCapabilitySetListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DBforMySQL/locations/{locationName}/capabilitySets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationName: locationName,
      "api%2Dversion": context.apiVersion ?? "2025-06-01-preview",
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
  options: LocationBasedCapabilitySetListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Capability> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, locationName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-06-01-preview",
    },
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
      "api%2Dversion": context.apiVersion ?? "2025-06-01-preview",
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
