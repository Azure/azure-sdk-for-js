// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureDedicatedHSMResourceProviderContext as Client } from "../index.js";
import type {
  PaymentHsmClusterPrivateEndpointConnection,
  _PaymentHsmClusterPrivateEndpointConnectionListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  paymentHsmClusterPrivateEndpointConnectionSerializer,
  paymentHsmClusterPrivateEndpointConnectionDeserializer,
  _paymentHsmClusterPrivateEndpointConnectionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PaymentHsmClusterPrivateEndpointConnectionsListByPaymentHsmClusterOptionalParams,
  PaymentHsmClusterPrivateEndpointConnectionsDeleteOptionalParams,
  PaymentHsmClusterPrivateEndpointConnectionsCreateOptionalParams,
  PaymentHsmClusterPrivateEndpointConnectionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByPaymentHsmClusterSend(
  context: Client,
  resourceGroupName: string,
  paymentHsmClusterName: string,
  options: PaymentHsmClusterPrivateEndpointConnectionsListByPaymentHsmClusterOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/paymentHsmClusters/{paymentHsmClusterName}/privateEndpointConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      paymentHsmClusterName: paymentHsmClusterName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
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

export async function _listByPaymentHsmClusterDeserialize(
  result: PathUncheckedResponse,
): Promise<_PaymentHsmClusterPrivateEndpointConnectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _paymentHsmClusterPrivateEndpointConnectionListResultDeserializer(result.body);
}
/** The List operation gets information about the private endpoint connections associated with the Payment HSM Cluster */
export function listByPaymentHsmCluster(
  context: Client,
  resourceGroupName: string,
  paymentHsmClusterName: string,
  options: PaymentHsmClusterPrivateEndpointConnectionsListByPaymentHsmClusterOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<PaymentHsmClusterPrivateEndpointConnection> {
  return buildPagedAsyncIterator(
    context,
    () => _listByPaymentHsmClusterSend(context, resourceGroupName, paymentHsmClusterName, options),
    _listByPaymentHsmClusterDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-12-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  paymentHsmClusterName: string,
  peConnectionName: string,
  options: PaymentHsmClusterPrivateEndpointConnectionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/paymentHsmClusters/{paymentHsmClusterName}/privateEndpointConnections/{peConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      paymentHsmClusterName: paymentHsmClusterName,
      peConnectionName: peConnectionName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}
/** Deletes the private endpoint connection for the Payment Hsm Cluster. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  paymentHsmClusterName: string,
  peConnectionName: string,
  options: PaymentHsmClusterPrivateEndpointConnectionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, paymentHsmClusterName, peConnectionName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  paymentHsmClusterName: string,
  peConnectionName: string,
  properties: PaymentHsmClusterPrivateEndpointConnection,
  options: PaymentHsmClusterPrivateEndpointConnectionsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/paymentHsmClusters/{paymentHsmClusterName}/privateEndpointConnections/{peConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      paymentHsmClusterName: paymentHsmClusterName,
      peConnectionName: peConnectionName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: paymentHsmClusterPrivateEndpointConnectionSerializer(properties),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<PaymentHsmClusterPrivateEndpointConnection> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return paymentHsmClusterPrivateEndpointConnectionDeserializer(result.body);
}
/** Creates or updates the private endpoint connection for the Payment Hsm Cluster. */
export async function create(
  context: Client,
  resourceGroupName: string,
  paymentHsmClusterName: string,
  peConnectionName: string,
  properties: PaymentHsmClusterPrivateEndpointConnection,
  options: PaymentHsmClusterPrivateEndpointConnectionsCreateOptionalParams = { requestOptions: {} },
): Promise<PaymentHsmClusterPrivateEndpointConnection> {
  const result = await _createSend(
    context,
    resourceGroupName,
    paymentHsmClusterName,
    peConnectionName,
    properties,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  paymentHsmClusterName: string,
  peConnectionName: string,
  options: PaymentHsmClusterPrivateEndpointConnectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/paymentHsmClusters/{paymentHsmClusterName}/privateEndpointConnections/{peConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      paymentHsmClusterName: paymentHsmClusterName,
      peConnectionName: peConnectionName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
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
): Promise<PaymentHsmClusterPrivateEndpointConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return paymentHsmClusterPrivateEndpointConnectionDeserializer(result.body);
}
/** Gets the private endpoint connection for the Payment Hsm Cluster. */
export async function get(
  context: Client,
  resourceGroupName: string,
  paymentHsmClusterName: string,
  peConnectionName: string,
  options: PaymentHsmClusterPrivateEndpointConnectionsGetOptionalParams = { requestOptions: {} },
): Promise<PaymentHsmClusterPrivateEndpointConnection> {
  const result = await _getSend(
    context,
    resourceGroupName,
    paymentHsmClusterName,
    peConnectionName,
    options,
  );
  return _getDeserialize(result);
}
