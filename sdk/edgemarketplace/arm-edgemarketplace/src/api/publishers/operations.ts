// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EdgeMarketplaceContext as Client } from "../index.js";
import type { Publisher, _PublisherListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  publisherDeserializer,
  _publisherListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PublishersListBySubscriptionOptionalParams,
  PublishersListOptionalParams,
  PublishersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listBySubscriptionSend(
  context: Client,
  options: PublishersListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.EdgeMarketplace/publishers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_PublisherListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _publisherListResultDeserializer(result.body);
}

/** List Publisher resources by subscription ID */
export function listBySubscription(
  context: Client,
  options: PublishersListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Publisher> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listSend(
  context: Client,
  resourceUri: string,
  options: PublishersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.EdgeMarketplace/publishers{?api%2Dversion,%24top,skip,maxpagesize,%24filter,%24skipToken}",
    {
      resourceUri: resourceUri,
      "api%2Dversion": context.apiVersion,
      "%24top": options?.top,
      skip: options?.skip,
      maxpagesize: options?.maxpagesize,
      "%24filter": options?.filter,
      "%24skipToken": options?.skipToken,
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
): Promise<_PublisherListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _publisherListResultDeserializer(result.body);
}

/** List Publisher resources by parent */
export function list(
  context: Client,
  resourceUri: string,
  options: PublishersListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Publisher> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceUri, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  resourceUri: string,
  publisherName: string,
  options: PublishersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.EdgeMarketplace/publishers/{publisherName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      publisherName: publisherName,
      "api%2Dversion": context.apiVersion,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Publisher> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return publisherDeserializer(result.body);
}

/** Get a Publisher */
export async function get(
  context: Client,
  resourceUri: string,
  publisherName: string,
  options: PublishersGetOptionalParams = { requestOptions: {} },
): Promise<Publisher> {
  const result = await _getSend(context, resourceUri, publisherName, options);
  return _getDeserialize(result);
}
