// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MarketplaceContext as Client } from "../index.js";
import type { Collection, CollectionsList, TransferOffersResponse } from "../../models/models.js";
import {
  errorResponseDeserializer,
  collectionSerializer,
  collectionDeserializer,
  collectionsListDeserializer,
  transferOffersPropertiesSerializer,
  transferOffersResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PrivateStoreCollectionPostOptionalParams,
  PrivateStoreCollectionDisableApproveAllItemsOptionalParams,
  PrivateStoreCollectionApproveAllItemsOptionalParams,
  PrivateStoreCollectionTransferOffersOptionalParams,
  PrivateStoreCollectionListOptionalParams,
  PrivateStoreCollectionDeleteOptionalParams,
  PrivateStoreCollectionCreateOrUpdateOptionalParams,
  PrivateStoreCollectionGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _postSend(
  context: Client,
  privateStoreId: string,
  collectionId: string,
  options: PrivateStoreCollectionPostOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/collections/{collectionId}{?api%2Dversion}",
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

/** Delete Private store collection. This is a workaround. */
export async function post(
  context: Client,
  privateStoreId: string,
  collectionId: string,
  options: PrivateStoreCollectionPostOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _postSend(context, privateStoreId, collectionId, options);
  return _postDeserialize(result);
}

export function _disableApproveAllItemsSend(
  context: Client,
  privateStoreId: string,
  collectionId: string,
  options: PrivateStoreCollectionDisableApproveAllItemsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/collections/{collectionId}/disableApproveAllItems{?api%2Dversion}",
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
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _disableApproveAllItemsDeserialize(
  result: PathUncheckedResponse,
): Promise<Collection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return collectionDeserializer(result.body);
}

/** Disable approve all items for the collection. */
export async function disableApproveAllItems(
  context: Client,
  privateStoreId: string,
  collectionId: string,
  options: PrivateStoreCollectionDisableApproveAllItemsOptionalParams = { requestOptions: {} },
): Promise<Collection> {
  const result = await _disableApproveAllItemsSend(context, privateStoreId, collectionId, options);
  return _disableApproveAllItemsDeserialize(result);
}

export function _approveAllItemsSend(
  context: Client,
  privateStoreId: string,
  collectionId: string,
  options: PrivateStoreCollectionApproveAllItemsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/collections/{collectionId}/approveAllItems{?api%2Dversion}",
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
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _approveAllItemsDeserialize(
  result: PathUncheckedResponse,
): Promise<Collection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return collectionDeserializer(result.body);
}

/** Delete all existing offers from the collection and enable approve all items. */
export async function approveAllItems(
  context: Client,
  privateStoreId: string,
  collectionId: string,
  options: PrivateStoreCollectionApproveAllItemsOptionalParams = { requestOptions: {} },
): Promise<Collection> {
  const result = await _approveAllItemsSend(context, privateStoreId, collectionId, options);
  return _approveAllItemsDeserialize(result);
}

export function _transferOffersSend(
  context: Client,
  privateStoreId: string,
  collectionId: string,
  options: PrivateStoreCollectionTransferOffersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/collections/{collectionId}/transferOffers{?api%2Dversion}",
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
      : transferOffersPropertiesSerializer(options["payload"]),
  });
}

export async function _transferOffersDeserialize(
  result: PathUncheckedResponse,
): Promise<TransferOffersResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return transferOffersResponseDeserializer(result.body);
}

/** transferring offers (copy or move) from source collection to target collection(s) */
export async function transferOffers(
  context: Client,
  privateStoreId: string,
  collectionId: string,
  options: PrivateStoreCollectionTransferOffersOptionalParams = { requestOptions: {} },
): Promise<TransferOffersResponse> {
  const result = await _transferOffersSend(context, privateStoreId, collectionId, options);
  return _transferOffersDeserialize(result);
}

export function _listSend(
  context: Client,
  privateStoreId: string,
  options: PrivateStoreCollectionListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/collections{?api%2Dversion}",
    {
      privateStoreId: privateStoreId,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<CollectionsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return collectionsListDeserializer(result.body);
}

/** Gets private store collections list */
export async function list(
  context: Client,
  privateStoreId: string,
  options: PrivateStoreCollectionListOptionalParams = { requestOptions: {} },
): Promise<CollectionsList> {
  const result = await _listSend(context, privateStoreId, options);
  return _listDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  privateStoreId: string,
  collectionId: string,
  options: PrivateStoreCollectionDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/collections/{collectionId}{?api%2Dversion}",
    {
      privateStoreId: privateStoreId,
      collectionId: collectionId,
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

/** Delete a collection from the given private store. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  privateStoreId: string,
  collectionId: string,
  options: PrivateStoreCollectionDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, privateStoreId, collectionId, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  privateStoreId: string,
  collectionId: string,
  options: PrivateStoreCollectionCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/collections/{collectionId}{?api%2Dversion}",
    {
      privateStoreId: privateStoreId,
      collectionId: collectionId,
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
    body: !options["payload"] ? options["payload"] : collectionSerializer(options["payload"]),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Collection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return collectionDeserializer(result.body);
}

/** Create or update private store collection */
export async function createOrUpdate(
  context: Client,
  privateStoreId: string,
  collectionId: string,
  options: PrivateStoreCollectionCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<Collection> {
  const result = await _createOrUpdateSend(context, privateStoreId, collectionId, options);
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  privateStoreId: string,
  collectionId: string,
  options: PrivateStoreCollectionGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/collections/{collectionId}{?api%2Dversion}",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Collection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return collectionDeserializer(result.body);
}

/** Gets private store collection */
export async function get(
  context: Client,
  privateStoreId: string,
  collectionId: string,
  options: PrivateStoreCollectionGetOptionalParams = { requestOptions: {} },
): Promise<Collection> {
  const result = await _getSend(context, privateStoreId, collectionId, options);
  return _getDeserialize(result);
}
