// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftResourceHealthContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  AvailabilityStatus,
  availabilityStatusDeserializer,
  _AvailabilityStatusListResult,
  _availabilityStatusListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ChildAvailabilityStatusesListOptionalParams,
  ChildAvailabilityStatusesGetByResourceOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceUri: string,
  options: ChildAvailabilityStatusesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.ResourceHealth/childAvailabilityStatuses{?api%2Dversion,%24filter,%24expand}",
    {
      resourceUri: resourceUri,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      "%24filter": options?.filter,
      "%24expand": options?.expand,
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
): Promise<_AvailabilityStatusListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _availabilityStatusListResultDeserializer(result.body);
}

/** Lists the historical availability statuses for a single child resource. Use the nextLink property in the response to get the next page of availability status */
export function list(
  context: Client,
  resourceUri: string,
  options: ChildAvailabilityStatusesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AvailabilityStatus> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceUri, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getByResourceSend(
  context: Client,
  resourceUri: string,
  options: ChildAvailabilityStatusesGetByResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.ResourceHealth/childAvailabilityStatuses/current{?api%2Dversion,%24filter,%24expand}",
    {
      resourceUri: resourceUri,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      "%24filter": options?.filter,
      "%24expand": options?.expand,
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

export async function _getByResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<AvailabilityStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return availabilityStatusDeserializer(result.body);
}

/** Gets current availability status for a single resource */
export async function getByResource(
  context: Client,
  resourceUri: string,
  options: ChildAvailabilityStatusesGetByResourceOptionalParams = { requestOptions: {} },
): Promise<AvailabilityStatus> {
  const result = await _getByResourceSend(context, resourceUri, options);
  return _getByResourceDeserialize(result);
}
