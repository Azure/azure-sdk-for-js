// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PeeringManagementContext as Client } from "../index.js";
import type { PeeringRegisteredAsn, _PeeringRegisteredAsnListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  peeringRegisteredAsnSerializer,
  peeringRegisteredAsnDeserializer,
  _peeringRegisteredAsnListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RegisteredAsnsListByPeeringOptionalParams,
  RegisteredAsnsDeleteOptionalParams,
  RegisteredAsnsCreateOrUpdateOptionalParams,
  RegisteredAsnsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByPeeringSend(
  context: Client,
  resourceGroupName: string,
  peeringName: string,
  options: RegisteredAsnsListByPeeringOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peerings/{peeringName}/registeredAsns{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      peeringName: peeringName,
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

export async function _listByPeeringDeserialize(
  result: PathUncheckedResponse,
): Promise<_PeeringRegisteredAsnListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _peeringRegisteredAsnListResultDeserializer(result.body);
}

/** Lists all registered ASNs under the given subscription, resource group and peering. */
export function listByPeering(
  context: Client,
  resourceGroupName: string,
  peeringName: string,
  options: RegisteredAsnsListByPeeringOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PeeringRegisteredAsn> {
  return buildPagedAsyncIterator(
    context,
    () => _listByPeeringSend(context, resourceGroupName, peeringName, options),
    _listByPeeringDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  peeringName: string,
  registeredAsnName: string,
  options: RegisteredAsnsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peerings/{peeringName}/registeredAsns/{registeredAsnName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      peeringName: peeringName,
      registeredAsnName: registeredAsnName,
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

/** Deletes an existing registered ASN with the specified name under the given subscription, resource group and peering. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  peeringName: string,
  registeredAsnName: string,
  options: RegisteredAsnsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    peeringName,
    registeredAsnName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  peeringName: string,
  registeredAsnName: string,
  registeredAsn: PeeringRegisteredAsn,
  options: RegisteredAsnsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peerings/{peeringName}/registeredAsns/{registeredAsnName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      peeringName: peeringName,
      registeredAsnName: registeredAsnName,
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
    body: peeringRegisteredAsnSerializer(registeredAsn),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<PeeringRegisteredAsn> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return peeringRegisteredAsnDeserializer(result.body);
}

/** Creates a new registered ASN with the specified name under the given subscription, resource group and peering. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  peeringName: string,
  registeredAsnName: string,
  registeredAsn: PeeringRegisteredAsn,
  options: RegisteredAsnsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<PeeringRegisteredAsn> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    peeringName,
    registeredAsnName,
    registeredAsn,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  peeringName: string,
  registeredAsnName: string,
  options: RegisteredAsnsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peerings/{peeringName}/registeredAsns/{registeredAsnName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      peeringName: peeringName,
      registeredAsnName: registeredAsnName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<PeeringRegisteredAsn> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return peeringRegisteredAsnDeserializer(result.body);
}

/** Gets an existing registered ASN with the specified name under the given subscription, resource group and peering. */
export async function get(
  context: Client,
  resourceGroupName: string,
  peeringName: string,
  registeredAsnName: string,
  options: RegisteredAsnsGetOptionalParams = { requestOptions: {} },
): Promise<PeeringRegisteredAsn> {
  const result = await _getSend(
    context,
    resourceGroupName,
    peeringName,
    registeredAsnName,
    options,
  );
  return _getDeserialize(result);
}
