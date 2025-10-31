// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PaloAltoNetworksCloudngfwContext as Client } from "../index.js";
import type {
  FirewallStatusResource,
  _FirewallStatusResourceListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  firewallStatusResourceDeserializer,
  _firewallStatusResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  FirewallStatusListByFirewallsOptionalParams,
  FirewallStatusGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByFirewallsSend(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  options: FirewallStatusListByFirewallsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/firewalls/{firewallName}/statuses{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      firewallName: firewallName,
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

export async function _listByFirewallsDeserialize(
  result: PathUncheckedResponse,
): Promise<_FirewallStatusResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _firewallStatusResourceListResultDeserializer(result.body);
}

/** List FirewallStatusResource resources by Firewalls */
export function listByFirewalls(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  options: FirewallStatusListByFirewallsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FirewallStatusResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByFirewallsSend(context, resourceGroupName, firewallName, options),
    _listByFirewallsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  options: FirewallStatusGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/firewalls/{firewallName}/statuses/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      firewallName: firewallName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<FirewallStatusResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return firewallStatusResourceDeserializer(result.body);
}

/** Get a FirewallStatusResource */
export async function get(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  options: FirewallStatusGetOptionalParams = { requestOptions: {} },
): Promise<FirewallStatusResource> {
  const result = await _getSend(context, resourceGroupName, firewallName, options);
  return _getDeserialize(result);
}
