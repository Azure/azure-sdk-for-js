// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MarketplaceContext as Client } from "../index.js";
import type {
  _CollectionOffersByContextList,
  CollectionOffersByContext,
  Offer,
  _OfferListResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  collectionOffersByAllContextsPayloadSerializer,
  _collectionOffersByContextListDeserializer,
  offerSerializer,
  offerDeserializer,
  _offerListResponseDeserializer,
  multiContextAndPlansPayloadSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PrivateStoreCollectionOfferPostOptionalParams,
  PrivateStoreCollectionOfferUpsertOfferWithMultiContextOptionalParams,
  PrivateStoreCollectionOfferContextsViewOptionalParams,
  PrivateStoreCollectionOfferListOptionalParams,
  PrivateStoreCollectionOfferDeleteOptionalParams,
  PrivateStoreCollectionOfferCreateOrUpdateOptionalParams,
  PrivateStoreCollectionOfferGetOptionalParams,
  PrivateStoreCollectionOfferListByContextsOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _postSend(
  context: Client,
  privateStoreId: string,
  collectionId: string,
  offerId: string,
  options: PrivateStoreCollectionOfferPostOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/collections/{collectionId}/offers/{offerId}{?api%2Dversion}",
    {
      privateStoreId: privateStoreId,
      collectionId: collectionId,
      offerId: offerId,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "text/plain",
    body: !options["payload"] ? options["payload"] : options["payload"],
  });
}

export async function _postDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete Private store offer. This is a workaround. */
export async function post(
  context: Client,
  privateStoreId: string,
  collectionId: string,
  offerId: string,
  options: PrivateStoreCollectionOfferPostOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _postSend(context, privateStoreId, collectionId, offerId, options);
  return _postDeserialize(result);
}

export function _upsertOfferWithMultiContextSend(
  context: Client,
  privateStoreId: string,
  collectionId: string,
  offerId: string,
  options: PrivateStoreCollectionOfferUpsertOfferWithMultiContextOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/collections/{collectionId}/offers/{offerId}/upsertOfferWithMultiContext{?api%2Dversion}",
    {
      privateStoreId: privateStoreId,
      collectionId: collectionId,
      offerId: offerId,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["payload"]
      ? options["payload"]
      : multiContextAndPlansPayloadSerializer(options["payload"]),
  });
}

export async function _upsertOfferWithMultiContextDeserialize(
  result: PathUncheckedResponse,
): Promise<Offer> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return offerDeserializer(result.body);
}

/** Upsert an offer with multiple context details. */
export async function upsertOfferWithMultiContext(
  context: Client,
  privateStoreId: string,
  collectionId: string,
  offerId: string,
  options: PrivateStoreCollectionOfferUpsertOfferWithMultiContextOptionalParams = {
    requestOptions: {},
  },
): Promise<Offer> {
  const result = await _upsertOfferWithMultiContextSend(
    context,
    privateStoreId,
    collectionId,
    offerId,
    options,
  );
  return _upsertOfferWithMultiContextDeserialize(result);
}

export function _contextsViewSend(
  context: Client,
  privateStoreId: string,
  collectionId: string,
  offerId: string,
  options: PrivateStoreCollectionOfferContextsViewOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/collections/{collectionId}/offers/{offerId}/contextsView{?api%2Dversion}",
    {
      privateStoreId: privateStoreId,
      collectionId: collectionId,
      offerId: offerId,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["payload"]
      ? options["payload"]
      : collectionOffersByAllContextsPayloadSerializer(options["payload"]),
  });
}

export async function _contextsViewDeserialize(result: PathUncheckedResponse): Promise<Offer> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return offerDeserializer(result.body);
}

/** Retrieve offer information with plans under required contexts restrictions. */
export async function contextsView(
  context: Client,
  privateStoreId: string,
  collectionId: string,
  offerId: string,
  options: PrivateStoreCollectionOfferContextsViewOptionalParams = { requestOptions: {} },
): Promise<Offer> {
  const result = await _contextsViewSend(context, privateStoreId, collectionId, offerId, options);
  return _contextsViewDeserialize(result);
}

export function _listSend(
  context: Client,
  privateStoreId: string,
  collectionId: string,
  options: PrivateStoreCollectionOfferListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/collections/{collectionId}/offers{?api%2Dversion}",
    {
      privateStoreId: privateStoreId,
      collectionId: collectionId,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_OfferListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _offerListResponseDeserializer(result.body);
}

/** Get a list of all private offers in the given private store and collection */
export function list(
  context: Client,
  privateStoreId: string,
  collectionId: string,
  options: PrivateStoreCollectionOfferListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Offer> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, privateStoreId, collectionId, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-01-01" },
  );
}

export function _$deleteSend(
  context: Client,
  privateStoreId: string,
  collectionId: string,
  offerId: string,
  options: PrivateStoreCollectionOfferDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/collections/{collectionId}/offers/{offerId}{?api%2Dversion}",
    {
      privateStoreId: privateStoreId,
      collectionId: collectionId,
      offerId: offerId,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes an offer from the given collection of private store. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  privateStoreId: string,
  collectionId: string,
  offerId: string,
  options: PrivateStoreCollectionOfferDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, privateStoreId, collectionId, offerId, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  privateStoreId: string,
  collectionId: string,
  offerId: string,
  payload: Offer,
  options: PrivateStoreCollectionOfferCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/collections/{collectionId}/offers/{offerId}{?api%2Dversion}",
    {
      privateStoreId: privateStoreId,
      collectionId: collectionId,
      offerId: offerId,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: offerSerializer(payload),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Offer> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return offerDeserializer(result.body);
}

/** Update or add an offer to a specific collection of the private store. */
export async function createOrUpdate(
  context: Client,
  privateStoreId: string,
  collectionId: string,
  offerId: string,
  payload: Offer,
  options: PrivateStoreCollectionOfferCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<Offer> {
  const result = await _createOrUpdateSend(
    context,
    privateStoreId,
    collectionId,
    offerId,
    payload,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  privateStoreId: string,
  collectionId: string,
  offerId: string,
  options: PrivateStoreCollectionOfferGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/collections/{collectionId}/offers/{offerId}{?api%2Dversion}",
    {
      privateStoreId: privateStoreId,
      collectionId: collectionId,
      offerId: offerId,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
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

/** Gets information about a specific offer. */
export async function get(
  context: Client,
  privateStoreId: string,
  collectionId: string,
  offerId: string,
  options: PrivateStoreCollectionOfferGetOptionalParams = { requestOptions: {} },
): Promise<Offer> {
  const result = await _getSend(context, privateStoreId, collectionId, offerId, options);
  return _getDeserialize(result);
}

export function _listByContextsSend(
  context: Client,
  privateStoreId: string,
  collectionId: string,
  options: PrivateStoreCollectionOfferListByContextsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/collections/{collectionId}/mapOffersToContexts{?api%2Dversion}",
    {
      privateStoreId: privateStoreId,
      collectionId: collectionId,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["payload"]
      ? options["payload"]
      : collectionOffersByAllContextsPayloadSerializer(options["payload"]),
  });
}

export async function _listByContextsDeserialize(
  result: PathUncheckedResponse,
): Promise<_CollectionOffersByContextList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _collectionOffersByContextListDeserializer(result.body);
}

/** Get a list of all offers in the given collection according to the required contexts. */
export function listByContexts(
  context: Client,
  privateStoreId: string,
  collectionId: string,
  options: PrivateStoreCollectionOfferListByContextsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CollectionOffersByContext> {
  return buildPagedAsyncIterator(
    context,
    () => _listByContextsSend(context, privateStoreId, collectionId, options),
    _listByContextsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-01-01" },
  );
}
