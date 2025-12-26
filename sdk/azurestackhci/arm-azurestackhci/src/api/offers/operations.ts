// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureStackHCIContext as Client } from "../index.js";
import type { Offer, _OfferList } from "../../models/models.js";
import {
  errorResponseDeserializer,
  offerDeserializer,
  _offerListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  OffersListByClusterOptionalParams,
  OffersListByPublisherOptionalParams,
  OffersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByClusterSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: OffersListByClusterOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/offers{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion,
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

export async function _listByClusterDeserialize(
  result: PathUncheckedResponse,
): Promise<_OfferList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _offerListDeserializer(result.body);
}

/** List Offers available across publishers for the HCI Cluster. */
export function listByCluster(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: OffersListByClusterOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Offer> {
  return buildPagedAsyncIterator(
    context,
    () => _listByClusterSend(context, resourceGroupName, clusterName, options),
    _listByClusterDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByPublisherSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  publisherName: string,
  options: OffersListByPublisherOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/publishers/{publisherName}/offers{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      publisherName: publisherName,
      "api%2Dversion": context.apiVersion,
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

export async function _listByPublisherDeserialize(
  result: PathUncheckedResponse,
): Promise<_OfferList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _offerListDeserializer(result.body);
}

/** List Offers available for a publisher within the HCI Cluster. */
export function listByPublisher(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  publisherName: string,
  options: OffersListByPublisherOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Offer> {
  return buildPagedAsyncIterator(
    context,
    () => _listByPublisherSend(context, resourceGroupName, clusterName, publisherName, options),
    _listByPublisherDeserialize,
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
  options: OffersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/publishers/{publisherName}/offers/{offerName}{?api%2Dversion,%24expand}",
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

/** Get Offer resource details within a publisher of HCI Cluster. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  publisherName: string,
  offerName: string,
  options: OffersGetOptionalParams = { requestOptions: {} },
): Promise<Offer> {
  const result = await _getSend(
    context,
    resourceGroupName,
    clusterName,
    publisherName,
    offerName,
    options,
  );
  return _getDeserialize(result);
}
