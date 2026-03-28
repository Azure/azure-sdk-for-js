// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  ExpressRouteLink,
  _ExpressRouteLinkListResult,
} from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  expressRouteLinkDeserializer,
  _expressRouteLinkListResultDeserializer,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ExpressRouteLinksListOptionalParams,
  ExpressRouteLinksGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  expressRoutePortName: string,
  options: ExpressRouteLinksListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/ExpressRoutePorts/{expressRoutePortName}/links{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      expressRoutePortName: expressRoutePortName,
      "api%2Dversion": "2025-05-01",
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
): Promise<_ExpressRouteLinkListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _expressRouteLinkListResultDeserializer(result.body);
}

/** Retrieve the ExpressRouteLink sub-resources of the specified ExpressRoutePort resource. */
export function list(
  context: Client,
  resourceGroupName: string,
  expressRoutePortName: string,
  options: ExpressRouteLinksListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ExpressRouteLink> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, expressRoutePortName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  expressRoutePortName: string,
  linkName: string,
  options: ExpressRouteLinksGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/ExpressRoutePorts/{expressRoutePortName}/links/{linkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      expressRoutePortName: expressRoutePortName,
      linkName: linkName,
      "api%2Dversion": "2025-05-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ExpressRouteLink> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return expressRouteLinkDeserializer(result.body);
}

/** Retrieves the specified ExpressRouteLink resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  expressRoutePortName: string,
  linkName: string,
  options: ExpressRouteLinksGetOptionalParams = { requestOptions: {} },
): Promise<ExpressRouteLink> {
  const result = await _getSend(
    context,
    resourceGroupName,
    expressRoutePortName,
    linkName,
    options,
  );
  return _getDeserialize(result);
}
