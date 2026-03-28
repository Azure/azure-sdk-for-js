// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PeeringManagementContext as Client } from "../index.js";
import type { PeerAsn, _PeerAsnListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  peerAsnSerializer,
  peerAsnDeserializer,
  _peerAsnListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PeerAsnsListBySubscriptionOptionalParams,
  PeerAsnsDeleteOptionalParams,
  PeerAsnsCreateOrUpdateOptionalParams,
  PeerAsnsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listBySubscriptionSend(
  context: Client,
  options: PeerAsnsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Peering/peerAsns{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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
): Promise<_PeerAsnListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _peerAsnListResultDeserializer(result.body);
}

/** Lists all of the peer ASNs under the given subscription. */
export function listBySubscription(
  context: Client,
  options: PeerAsnsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PeerAsn> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  peerAsnName: string,
  options: PeerAsnsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Peering/peerAsns/{peerAsnName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      peerAsnName: peerAsnName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

/** Deletes an existing peer ASN with the specified name under the given subscription. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  peerAsnName: string,
  options: PeerAsnsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, peerAsnName, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  peerAsnName: string,
  peerAsn: PeerAsn,
  options: PeerAsnsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Peering/peerAsns/{peerAsnName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      peerAsnName: peerAsnName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: peerAsnSerializer(peerAsn),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<PeerAsn> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return peerAsnDeserializer(result.body);
}

/** Creates a new peer ASN or updates an existing peer ASN with the specified name under the given subscription. */
export async function createOrUpdate(
  context: Client,
  peerAsnName: string,
  peerAsn: PeerAsn,
  options: PeerAsnsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<PeerAsn> {
  const result = await _createOrUpdateSend(context, peerAsnName, peerAsn, options);
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  peerAsnName: string,
  options: PeerAsnsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Peering/peerAsns/{peerAsnName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      peerAsnName: peerAsnName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<PeerAsn> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return peerAsnDeserializer(result.body);
}

/** Gets the peer ASN with the specified name under the given subscription. */
export async function get(
  context: Client,
  peerAsnName: string,
  options: PeerAsnsGetOptionalParams = { requestOptions: {} },
): Promise<PeerAsn> {
  const result = await _getSend(context, peerAsnName, options);
  return _getDeserialize(result);
}
