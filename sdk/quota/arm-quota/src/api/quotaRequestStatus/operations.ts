// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureQuotaExtensionAPIContext as Client } from "../index.js";
import type { QuotaRequestDetails, _QuotaRequestDetailsList } from "../../models/models.js";
import {
  exceptionResponseDeserializer,
  quotaRequestDetailsDeserializer,
  _quotaRequestDetailsListDeserializer,
} from "../../models/models.js";
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
  scope: string,
  options: QuotaRequestStatusListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Quota/quotaRequests{?api%2Dversion,%24filter,%24top,%24skiptoken}",
    {
      scope: scope,
      "api%2Dversion": context.apiVersion,
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
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_QuotaRequestDetailsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = exceptionResponseDeserializer(result.body);
    throw error;
  }

  return _quotaRequestDetailsListDeserializer(result.body);
}

/** For the specified scope, get the current quota requests for a one year period ending at the time is made. Use the **oData** filter to select quota requests. */
export function list(
  context: Client,
  scope: string,
  options: QuotaRequestStatusListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<QuotaRequestDetails> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, scope, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  id: string,
  scope: string,
  options: QuotaRequestStatusGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Quota/quotaRequests/{id}{?api%2Dversion}",
    {
      scope: scope,
      id: id,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<QuotaRequestDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = exceptionResponseDeserializer(result.body);
    throw error;
  }

  return quotaRequestDetailsDeserializer(result.body);
}

/** Get the quota request details and status by quota request ID for the resources of the resource provider at a specific location. The quota request ID **id** is returned in the response of the PUT operation. */
export async function get(
  context: Client,
  id: string,
  scope: string,
  options: QuotaRequestStatusGetOptionalParams = { requestOptions: {} },
): Promise<QuotaRequestDetails> {
  const result = await _getSend(context, id, scope, options);
  return _getDeserialize(result);
}
