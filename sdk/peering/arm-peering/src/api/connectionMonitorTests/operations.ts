// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PeeringManagementContext as Client } from "../index.js";
import type {
  ConnectionMonitorTest,
  _ConnectionMonitorTestListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  connectionMonitorTestSerializer,
  connectionMonitorTestDeserializer,
  _connectionMonitorTestListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ConnectionMonitorTestsListByPeeringServiceOptionalParams,
  ConnectionMonitorTestsDeleteOptionalParams,
  ConnectionMonitorTestsCreateOrUpdateOptionalParams,
  ConnectionMonitorTestsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByPeeringServiceSend(
  context: Client,
  resourceGroupName: string,
  peeringServiceName: string,
  options: ConnectionMonitorTestsListByPeeringServiceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peeringServices/{peeringServiceName}/connectionMonitorTests{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      peeringServiceName: peeringServiceName,
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

export async function _listByPeeringServiceDeserialize(
  result: PathUncheckedResponse,
): Promise<_ConnectionMonitorTestListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _connectionMonitorTestListResultDeserializer(result.body);
}

/** Lists all connection monitor tests under the given subscription, resource group and peering service. */
export function listByPeeringService(
  context: Client,
  resourceGroupName: string,
  peeringServiceName: string,
  options: ConnectionMonitorTestsListByPeeringServiceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ConnectionMonitorTest> {
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
  connectionMonitorTestName: string,
  options: ConnectionMonitorTestsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peeringServices/{peeringServiceName}/connectionMonitorTests/{connectionMonitorTestName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      peeringServiceName: peeringServiceName,
      connectionMonitorTestName: connectionMonitorTestName,
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

/** Deletes an existing connection monitor test with the specified name under the given subscription, resource group and peering service. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  peeringServiceName: string,
  connectionMonitorTestName: string,
  options: ConnectionMonitorTestsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    peeringServiceName,
    connectionMonitorTestName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  peeringServiceName: string,
  connectionMonitorTestName: string,
  connectionMonitorTest: ConnectionMonitorTest,
  options: ConnectionMonitorTestsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peeringServices/{peeringServiceName}/connectionMonitorTests/{connectionMonitorTestName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      peeringServiceName: peeringServiceName,
      connectionMonitorTestName: connectionMonitorTestName,
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
    body: connectionMonitorTestSerializer(connectionMonitorTest),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectionMonitorTest> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return connectionMonitorTestDeserializer(result.body);
}

/** Creates or updates a connection monitor test with the specified name under the given subscription, resource group and peering service. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  peeringServiceName: string,
  connectionMonitorTestName: string,
  connectionMonitorTest: ConnectionMonitorTest,
  options: ConnectionMonitorTestsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<ConnectionMonitorTest> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    peeringServiceName,
    connectionMonitorTestName,
    connectionMonitorTest,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  peeringServiceName: string,
  connectionMonitorTestName: string,
  options: ConnectionMonitorTestsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peeringServices/{peeringServiceName}/connectionMonitorTests/{connectionMonitorTestName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      peeringServiceName: peeringServiceName,
      connectionMonitorTestName: connectionMonitorTestName,
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
): Promise<ConnectionMonitorTest> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return connectionMonitorTestDeserializer(result.body);
}

/** Gets an existing connection monitor test with the specified name under the given subscription, resource group and peering service. */
export async function get(
  context: Client,
  resourceGroupName: string,
  peeringServiceName: string,
  connectionMonitorTestName: string,
  options: ConnectionMonitorTestsGetOptionalParams = { requestOptions: {} },
): Promise<ConnectionMonitorTest> {
  const result = await _getSend(
    context,
    resourceGroupName,
    peeringServiceName,
    connectionMonitorTestName,
    options,
  );
  return _getDeserialize(result);
}
