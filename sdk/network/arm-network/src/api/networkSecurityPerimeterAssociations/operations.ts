// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  NspAssociation,
  _NspAssociationsListResult,
} from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  nspAssociationSerializer,
  nspAssociationDeserializer,
  _nspAssociationsListResultDeserializer,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NetworkSecurityPerimeterAssociationsReconcileOptionalParams,
  NetworkSecurityPerimeterAssociationsListOptionalParams,
  NetworkSecurityPerimeterAssociationsDeleteOptionalParams,
  NetworkSecurityPerimeterAssociationsCreateOrUpdateOptionalParams,
  NetworkSecurityPerimeterAssociationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _reconcileSend(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  associationName: string,
  parameters: Record<string, unknown>,
  options: NetworkSecurityPerimeterAssociationsReconcileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityPerimeters/{networkSecurityPerimeterName}/resourceAssociations/{associationName}/reconcile{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkSecurityPerimeterName: networkSecurityPerimeterName,
      associationName: associationName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: parameters,
  });
}

export async function _reconcileDeserialize(
  result: PathUncheckedResponse,
): Promise<Record<string, unknown>> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return result.body;
}

/** Reconcile NSP association */
export async function reconcile(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  associationName: string,
  parameters: Record<string, unknown>,
  options: NetworkSecurityPerimeterAssociationsReconcileOptionalParams = { requestOptions: {} },
): Promise<Record<string, unknown>> {
  const result = await _reconcileSend(
    context,
    resourceGroupName,
    networkSecurityPerimeterName,
    associationName,
    parameters,
    options,
  );
  return _reconcileDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  options: NetworkSecurityPerimeterAssociationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityPerimeters/{networkSecurityPerimeterName}/resourceAssociations{?api%2Dversion,%24top,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkSecurityPerimeterName: networkSecurityPerimeterName,
      "api%2Dversion": "2025-05-01",
      "%24top": options?.top,
      "%24skipToken": options?.skipToken,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_NspAssociationsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _nspAssociationsListResultDeserializer(result.body);
}

/** Lists the NSP resource associations. */
export function list(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  options: NetworkSecurityPerimeterAssociationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NspAssociation> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, networkSecurityPerimeterName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  associationName: string,
  options: NetworkSecurityPerimeterAssociationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityPerimeters/{networkSecurityPerimeterName}/resourceAssociations/{associationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkSecurityPerimeterName: networkSecurityPerimeterName,
      associationName: associationName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes an NSP association resource. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  associationName: string,
  options: NetworkSecurityPerimeterAssociationsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        networkSecurityPerimeterName,
        associationName,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  associationName: string,
  parameters: NspAssociation,
  options: NetworkSecurityPerimeterAssociationsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityPerimeters/{networkSecurityPerimeterName}/resourceAssociations/{associationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkSecurityPerimeterName: networkSecurityPerimeterName,
      associationName: associationName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: nspAssociationSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<NspAssociation> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return nspAssociationDeserializer(result.body);
}

/** Creates or updates a NSP resource association. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  associationName: string,
  parameters: NspAssociation,
  options: NetworkSecurityPerimeterAssociationsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<NspAssociation>, NspAssociation> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        networkSecurityPerimeterName,
        associationName,
        parameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<NspAssociation>, NspAssociation>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  associationName: string,
  options: NetworkSecurityPerimeterAssociationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityPerimeters/{networkSecurityPerimeterName}/resourceAssociations/{associationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkSecurityPerimeterName: networkSecurityPerimeterName,
      associationName: associationName,
      "api%2Dversion": "2025-05-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<NspAssociation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return nspAssociationDeserializer(result.body);
}

/** Gets the specified NSP association by name. */
export async function get(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  associationName: string,
  options: NetworkSecurityPerimeterAssociationsGetOptionalParams = { requestOptions: {} },
): Promise<NspAssociation> {
  const result = await _getSend(
    context,
    resourceGroupName,
    networkSecurityPerimeterName,
    associationName,
    options,
  );
  return _getDeserialize(result);
}
