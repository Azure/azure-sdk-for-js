// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  Sku,
  skuDeserializer,
  _SkuList,
  _skuListDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { SkusListByOfferOptionalParams, SkusGetOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByOfferSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  publisherName: string,
  offerName: string,
  options: SkusListByOfferOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/publishers/{publisherName}/offers/{offerName}/skus{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      publisherName: publisherName,
      offerName: offerName,
      "api%2Dversion": context.apiVersion,
      "%24expand": options?.expand,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listByOfferDeserialize(result: PathUncheckedResponse): Promise<_SkuList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _skuListDeserializer(result.body);
}

/** List Skus available for a offer within the HCI Cluster. */
export function listByOffer(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  publisherName: string,
  offerName: string,
  options: SkusListByOfferOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Sku> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByOfferSend(context, resourceGroupName, clusterName, publisherName, offerName, options),
    _listByOfferDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  publisherName: string,
  offerName: string,
  skuName: string,
  options: SkusGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/publishers/{publisherName}/offers/{offerName}/skus/{skuName}{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      publisherName: publisherName,
      offerName: offerName,
      skuName: skuName,
      "api%2Dversion": context.apiVersion,
      "%24expand": options?.expand,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Sku> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return skuDeserializer(result.body);
}

/** Get SKU resource details within a offer of HCI Cluster. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  publisherName: string,
  offerName: string,
  skuName: string,
  options: SkusGetOptionalParams = { requestOptions: {} },
): Promise<Sku> {
  const result = await _getSend(
    context,
    resourceGroupName,
    clusterName,
    publisherName,
    offerName,
    skuName,
    options,
  );
  return _getDeserialize(result);
}
