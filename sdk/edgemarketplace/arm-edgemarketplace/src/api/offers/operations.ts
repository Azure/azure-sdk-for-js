// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EdgeMarketplaceContext as Client } from "../index.js";
import type {
  Offer,
  _OfferListResult,
  AccessTokenRequest,
  DiskAccessToken,
  AccessTokenReadRequest,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  offerDeserializer,
  _offerListResultDeserializer,
  accessTokenRequestSerializer,
  diskAccessTokenDeserializer,
  accessTokenReadRequestSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  OffersListBySubscriptionOptionalParams,
  OffersGetAccessTokenOptionalParams,
  OffersGenerateAccessTokenOptionalParams,
  OffersListOptionalParams,
  OffersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySubscriptionSend(
  context: Client,
  options: OffersListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.EdgeMarketplace/offers{?api%2Dversion}",
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
): Promise<_OfferListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _offerListResultDeserializer(result.body);
}

/** List Offer resources by subscription ID */
export function listBySubscription(
  context: Client,
  options: OffersListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Offer> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getAccessTokenSend(
  context: Client,
  resourceUri: string,
  offerId: string,
  body: AccessTokenReadRequest,
  options: OffersGetAccessTokenOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.EdgeMarketplace/offers/{offerId}/getAccessToken{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      offerId: offerId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: accessTokenReadRequestSerializer(body),
  });
}

export async function _getAccessTokenDeserialize(
  result: PathUncheckedResponse,
): Promise<DiskAccessToken> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return diskAccessTokenDeserializer(result.body);
}

/** get access token. */
export async function getAccessToken(
  context: Client,
  resourceUri: string,
  offerId: string,
  body: AccessTokenReadRequest,
  options: OffersGetAccessTokenOptionalParams = { requestOptions: {} },
): Promise<DiskAccessToken> {
  const result = await _getAccessTokenSend(context, resourceUri, offerId, body, options);
  return _getAccessTokenDeserialize(result);
}

export function _generateAccessTokenSend(
  context: Client,
  resourceUri: string,
  offerId: string,
  body: AccessTokenRequest,
  options: OffersGenerateAccessTokenOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.EdgeMarketplace/offers/{offerId}/generateAccessToken{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      offerId: offerId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: accessTokenRequestSerializer(body),
  });
}

export async function _generateAccessTokenDeserialize(
  result: PathUncheckedResponse,
): Promise<DiskAccessToken> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return diskAccessTokenDeserializer(result.body);
}

/** A long-running resource action. */
export function generateAccessToken(
  context: Client,
  resourceUri: string,
  offerId: string,
  body: AccessTokenRequest,
  options: OffersGenerateAccessTokenOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DiskAccessToken>, DiskAccessToken> {
  return getLongRunningPoller(context, _generateAccessTokenDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _generateAccessTokenSend(context, resourceUri, offerId, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<DiskAccessToken>, DiskAccessToken>;
}

export function _listSend(
  context: Client,
  resourceUri: string,
  options: OffersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.EdgeMarketplace/offers{?api%2Dversion,%24top,skip,maxpagesize,%24filter,%24skipToken}",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_OfferListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _offerListResultDeserializer(result.body);
}

/** List Offer resources by parent */
export function list(
  context: Client,
  resourceUri: string,
  options: OffersListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Offer> {
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
  offerId: string,
  options: OffersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.EdgeMarketplace/offers/{offerId}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      offerId: offerId,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Offer> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return offerDeserializer(result.body);
}

/** Get a Offer */
export async function get(
  context: Client,
  resourceUri: string,
  offerId: string,
  options: OffersGetOptionalParams = { requestOptions: {} },
): Promise<Offer> {
  const result = await _getSend(context, resourceUri, offerId, options);
  return _getDeserialize(result);
}
