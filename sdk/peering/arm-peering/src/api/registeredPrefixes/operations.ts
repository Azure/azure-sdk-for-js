// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PeeringManagementContext as Client } from "../index.js";
import type {
  PeeringRegisteredPrefix,
  _PeeringRegisteredPrefixListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  peeringRegisteredPrefixSerializer,
  peeringRegisteredPrefixDeserializer,
  _peeringRegisteredPrefixListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RegisteredPrefixesValidateOptionalParams,
  RegisteredPrefixesListByPeeringOptionalParams,
  RegisteredPrefixesDeleteOptionalParams,
  RegisteredPrefixesCreateOrUpdateOptionalParams,
  RegisteredPrefixesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _validateSend(
  context: Client,
  resourceGroupName: string,
  peeringName: string,
  registeredPrefixName: string,
  options: RegisteredPrefixesValidateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peerings/{peeringName}/registeredPrefixes/{registeredPrefixName}/validate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      peeringName: peeringName,
      registeredPrefixName: registeredPrefixName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _validateDeserialize(
  result: PathUncheckedResponse,
): Promise<PeeringRegisteredPrefix> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return peeringRegisteredPrefixDeserializer(result.body);
}

/** Validates an existing registered prefix with the specified name under the given subscription, resource group and peering. */
export async function validate(
  context: Client,
  resourceGroupName: string,
  peeringName: string,
  registeredPrefixName: string,
  options: RegisteredPrefixesValidateOptionalParams = { requestOptions: {} },
): Promise<PeeringRegisteredPrefix> {
  const result = await _validateSend(
    context,
    resourceGroupName,
    peeringName,
    registeredPrefixName,
    options,
  );
  return _validateDeserialize(result);
}

export function _listByPeeringSend(
  context: Client,
  resourceGroupName: string,
  peeringName: string,
  options: RegisteredPrefixesListByPeeringOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peerings/{peeringName}/registeredPrefixes{?api%2Dversion}",
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
): Promise<_PeeringRegisteredPrefixListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _peeringRegisteredPrefixListResultDeserializer(result.body);
}

/** Lists all registered prefixes under the given subscription, resource group and peering. */
export function listByPeering(
  context: Client,
  resourceGroupName: string,
  peeringName: string,
  options: RegisteredPrefixesListByPeeringOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PeeringRegisteredPrefix> {
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
  registeredPrefixName: string,
  options: RegisteredPrefixesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peerings/{peeringName}/registeredPrefixes/{registeredPrefixName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      peeringName: peeringName,
      registeredPrefixName: registeredPrefixName,
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

/** Deletes an existing registered prefix with the specified name under the given subscription, resource group and peering. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  peeringName: string,
  registeredPrefixName: string,
  options: RegisteredPrefixesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    peeringName,
    registeredPrefixName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  peeringName: string,
  registeredPrefixName: string,
  registeredPrefix: PeeringRegisteredPrefix,
  options: RegisteredPrefixesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peerings/{peeringName}/registeredPrefixes/{registeredPrefixName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      peeringName: peeringName,
      registeredPrefixName: registeredPrefixName,
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
    body: peeringRegisteredPrefixSerializer(registeredPrefix),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<PeeringRegisteredPrefix> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return peeringRegisteredPrefixDeserializer(result.body);
}

/** Creates a new registered prefix with the specified name under the given subscription, resource group and peering. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  peeringName: string,
  registeredPrefixName: string,
  registeredPrefix: PeeringRegisteredPrefix,
  options: RegisteredPrefixesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<PeeringRegisteredPrefix> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    peeringName,
    registeredPrefixName,
    registeredPrefix,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  peeringName: string,
  registeredPrefixName: string,
  options: RegisteredPrefixesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peerings/{peeringName}/registeredPrefixes/{registeredPrefixName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      peeringName: peeringName,
      registeredPrefixName: registeredPrefixName,
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
): Promise<PeeringRegisteredPrefix> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return peeringRegisteredPrefixDeserializer(result.body);
}

/** Gets an existing registered prefix with the specified name under the given subscription, resource group and peering. */
export async function get(
  context: Client,
  resourceGroupName: string,
  peeringName: string,
  registeredPrefixName: string,
  options: RegisteredPrefixesGetOptionalParams = { requestOptions: {} },
): Promise<PeeringRegisteredPrefix> {
  const result = await _getSend(
    context,
    resourceGroupName,
    peeringName,
    registeredPrefixName,
    options,
  );
  return _getDeserialize(result);
}
