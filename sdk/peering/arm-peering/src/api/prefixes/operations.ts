// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PeeringManagementContext as Client } from "../index.js";
import type { PeeringServicePrefix, _PeeringServicePrefixListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  peeringServicePrefixSerializer,
  peeringServicePrefixDeserializer,
  _peeringServicePrefixListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PrefixesListByPeeringServiceOptionalParams,
  PrefixesDeleteOptionalParams,
  PrefixesCreateOrUpdateOptionalParams,
  PrefixesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByPeeringServiceSend(
  context: Client,
  resourceGroupName: string,
  peeringServiceName: string,
  options: PrefixesListByPeeringServiceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peeringServices/{peeringServiceName}/prefixes{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      peeringServiceName: peeringServiceName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listByPeeringServiceDeserialize(
  result: PathUncheckedResponse,
): Promise<_PeeringServicePrefixListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _peeringServicePrefixListResultDeserializer(result.body);
}

/** Lists all prefixes under the given subscription, resource group and peering service. */
export function listByPeeringService(
  context: Client,
  resourceGroupName: string,
  peeringServiceName: string,
  options: PrefixesListByPeeringServiceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PeeringServicePrefix> {
  return buildPagedAsyncIterator(
    context,
    () => _listByPeeringServiceSend(context, resourceGroupName, peeringServiceName, options),
    _listByPeeringServiceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  peeringServiceName: string,
  prefixName: string,
  options: PrefixesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peeringServices/{peeringServiceName}/prefixes/{prefixName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      peeringServiceName: peeringServiceName,
      prefixName: prefixName,
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

/** Deletes an existing prefix with the specified name under the given subscription, resource group and peering service. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  peeringServiceName: string,
  prefixName: string,
  options: PrefixesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    peeringServiceName,
    prefixName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  peeringServiceName: string,
  prefixName: string,
  peeringServicePrefix: PeeringServicePrefix,
  options: PrefixesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peeringServices/{peeringServiceName}/prefixes/{prefixName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      peeringServiceName: peeringServiceName,
      prefixName: prefixName,
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
    body: peeringServicePrefixSerializer(peeringServicePrefix),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<PeeringServicePrefix> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return peeringServicePrefixDeserializer(result.body);
}

/** Creates a new prefix with the specified name under the given subscription, resource group and peering service. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  peeringServiceName: string,
  prefixName: string,
  peeringServicePrefix: PeeringServicePrefix,
  options: PrefixesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<PeeringServicePrefix> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    peeringServiceName,
    prefixName,
    peeringServicePrefix,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  peeringServiceName: string,
  prefixName: string,
  options: PrefixesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peeringServices/{peeringServiceName}/prefixes/{prefixName}{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      peeringServiceName: peeringServiceName,
      prefixName: prefixName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<PeeringServicePrefix> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return peeringServicePrefixDeserializer(result.body);
}

/** Gets an existing prefix with the specified name under the given subscription, resource group and peering service. */
export async function get(
  context: Client,
  resourceGroupName: string,
  peeringServiceName: string,
  prefixName: string,
  options: PrefixesGetOptionalParams = { requestOptions: {} },
): Promise<PeeringServicePrefix> {
  const result = await _getSend(
    context,
    resourceGroupName,
    peeringServiceName,
    prefixName,
    options,
  );
  return _getDeserialize(result);
}
