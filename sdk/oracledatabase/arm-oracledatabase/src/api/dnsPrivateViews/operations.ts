// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext as Client } from "../index.js";
import type { DnsPrivateView, _DnsPrivateViewListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  dnsPrivateViewDeserializer,
  _dnsPrivateViewListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DnsPrivateViewsListByLocationOptionalParams,
  DnsPrivateViewsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByLocationSend(
  context: Client,
  location: string,
  options: DnsPrivateViewsListByLocationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Oracle.Database/locations/{location}/dnsPrivateViews{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
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

export async function _listByLocationDeserialize(
  result: PathUncheckedResponse,
): Promise<_DnsPrivateViewListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _dnsPrivateViewListResultDeserializer(result.body);
}

/** List DnsPrivateView resources by SubscriptionLocationResource */
export function listByLocation(
  context: Client,
  location: string,
  options: DnsPrivateViewsListByLocationOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DnsPrivateView> {
  return buildPagedAsyncIterator(
    context,
    () => _listByLocationSend(context, location, options),
    _listByLocationDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  location: string,
  dnsprivateviewocid: string,
  options: DnsPrivateViewsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Oracle.Database/locations/{location}/dnsPrivateViews/{dnsprivateviewocid}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      dnsprivateviewocid: dnsprivateviewocid,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DnsPrivateView> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return dnsPrivateViewDeserializer(result.body);
}

/** Get a DnsPrivateView */
export async function get(
  context: Client,
  location: string,
  dnsprivateviewocid: string,
  options: DnsPrivateViewsGetOptionalParams = { requestOptions: {} },
): Promise<DnsPrivateView> {
  const result = await _getSend(context, location, dnsprivateviewocid, options);
  return _getDeserialize(result);
}
