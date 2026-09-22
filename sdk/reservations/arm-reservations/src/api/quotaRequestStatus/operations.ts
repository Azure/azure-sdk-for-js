// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureReservationAPIContext as Client } from "../index.js";
import type { QuotaRequestDetails, _QuotaRequestDetailsList } from "../../models/quota/models.js";
import {
  quotaRequestDetailsDeserializer,
  exceptionResponseDeserializer,
  _quotaRequestDetailsListDeserializer,
} from "../../models/quota/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  QuotaRequestStatusListOptionalParams,
  QuotaRequestStatusGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  subscriptionId: string,
  providerId: string,
  location: string,
  options: QuotaRequestStatusListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Capacity/resourceProviders/{providerId}/locations/{location}/serviceLimitsRequests{?api%2Dversion,%24filter,%24top,%24skiptoken}",
    {
      subscriptionId: subscriptionId,
      providerId: providerId,
      location: location,
      "api%2Dversion": "2020-10-25",
      "%24filter": options?.filter,
      "%24top": options?.top,
      "%24skiptoken": options?.skiptoken,
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
): Promise<_QuotaRequestDetailsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = exceptionResponseDeserializer(result.body);
    }

    throw error;
  }

  return _quotaRequestDetailsListDeserializer(result.body);
}

/** For the specified Azure region (location), subscription, and resource provider, get the history of the quota requests for the past year. To select specific quota requests, use the oData filter. */
export function list(
  context: Client,
  subscriptionId: string,
  providerId: string,
  location: string,
  options: QuotaRequestStatusListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<QuotaRequestDetails> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, subscriptionId, providerId, location, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2020-10-25" },
  );
}

export function _getSend(
  context: Client,
  subscriptionId: string,
  providerId: string,
  location: string,
  id: string,
  options: QuotaRequestStatusGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Capacity/resourceProviders/{providerId}/locations/{location}/serviceLimitsRequests/{id}{?api%2Dversion}",
    {
      subscriptionId: subscriptionId,
      providerId: providerId,
      location: location,
      id: id,
      "api%2Dversion": "2020-10-25",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<QuotaRequestDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = exceptionResponseDeserializer(result.body);
    }

    throw error;
  }

  return quotaRequestDetailsDeserializer(result.body);
}

/** For the specified Azure region (location), get the details and status of the quota request by the quota request ID for the resources of the resource provider. The PUT request for the quota (service limit) returns a response with the requestId parameter. */
export async function get(
  context: Client,
  subscriptionId: string,
  providerId: string,
  location: string,
  id: string,
  options: QuotaRequestStatusGetOptionalParams = { requestOptions: {} },
): Promise<QuotaRequestDetails> {
  const result = await _getSend(context, subscriptionId, providerId, location, id, options);
  return _getDeserialize(result);
}
