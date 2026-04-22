// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeLimitContext as Client } from "../index.js";
import type { VmFamily, _VmFamilyListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  vmFamilyDeserializer,
  _vmFamilyListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VmFamiliesListBySubscriptionLocationResourceOptionalParams,
  VmFamiliesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listBySubscriptionLocationResourceSend(
  context: Client,
  location: string,
  options: VmFamiliesListBySubscriptionLocationResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeLimit/locations/{location}/vmFamilies{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-04-30",
      "%24filter": options?.filter,
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

export async function _listBySubscriptionLocationResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<_VmFamilyListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _vmFamilyListResultDeserializer(result.body);
}

/** Lists all VM families for the subscription at the specified location. */
export function listBySubscriptionLocationResource(
  context: Client,
  location: string,
  options: VmFamiliesListBySubscriptionLocationResourceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VmFamily> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionLocationResourceSend(context, location, options),
    _listBySubscriptionLocationResourceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-04-30" },
  );
}

export function _getSend(
  context: Client,
  location: string,
  vmFamilyName: string,
  options: VmFamiliesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeLimit/locations/{location}/vmFamilies/{vmFamilyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      vmFamilyName: vmFamilyName,
      "api%2Dversion": context.apiVersion ?? "2026-04-30",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<VmFamily> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return vmFamilyDeserializer(result.body);
}

/** Gets the properties of a VM family. */
export async function get(
  context: Client,
  location: string,
  vmFamilyName: string,
  options: VmFamiliesGetOptionalParams = { requestOptions: {} },
): Promise<VmFamily> {
  const result = await _getSend(context, location, vmFamilyName, options);
  return _getDeserialize(result);
}
