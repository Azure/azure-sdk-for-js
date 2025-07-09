// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  PublicCloudConnector,
  publicCloudConnectorSerializer,
  publicCloudConnectorDeserializer,
  PublicCloudConnectorUpdate,
  publicCloudConnectorUpdateSerializer,
  _PublicCloudConnectorListResult,
  _publicCloudConnectorListResultDeserializer,
  OperationStatusResult,
  operationStatusResultDeserializer,
} from "../../models/models.js";
import {
  PublicCloudConnectorsTestPermissionsOptionalParams,
  PublicCloudConnectorsListBySubscriptionOptionalParams,
  PublicCloudConnectorsListByResourceGroupOptionalParams,
  PublicCloudConnectorsDeleteOptionalParams,
  PublicCloudConnectorsUpdateOptionalParams,
  PublicCloudConnectorsCreateOrUpdateOptionalParams,
  PublicCloudConnectorsGetOptionalParams,
} from "./options.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _publicCloudConnectorsTestPermissionsSend(
  context: Client,
  resourceGroupName: string,
  publicCloudConnector: string,
  options: PublicCloudConnectorsTestPermissionsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridConnectivity/publicCloudConnectors/{publicCloudConnector}/testPermissions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      publicCloudConnector: publicCloudConnector,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _publicCloudConnectorsTestPermissionsDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** A long-running resource action. */
export function publicCloudConnectorsTestPermissions(
  context: Client,
  resourceGroupName: string,
  publicCloudConnector: string,
  options: PublicCloudConnectorsTestPermissionsOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(
    context,
    _publicCloudConnectorsTestPermissionsDeserialize,
    ["202", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _publicCloudConnectorsTestPermissionsSend(
          context,
          resourceGroupName,
          publicCloudConnector,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _publicCloudConnectorsListBySubscriptionSend(
  context: Client,
  options: PublicCloudConnectorsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.HybridConnectivity/publicCloudConnectors{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _publicCloudConnectorsListBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_PublicCloudConnectorListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _publicCloudConnectorListResultDeserializer(result.body);
}

/** List PublicCloudConnector resources by subscription ID */
export function publicCloudConnectorsListBySubscription(
  context: Client,
  options: PublicCloudConnectorsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<PublicCloudConnector> {
  return buildPagedAsyncIterator(
    context,
    () => _publicCloudConnectorsListBySubscriptionSend(context, options),
    _publicCloudConnectorsListBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _publicCloudConnectorsListByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: PublicCloudConnectorsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridConnectivity/publicCloudConnectors{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _publicCloudConnectorsListByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_PublicCloudConnectorListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _publicCloudConnectorListResultDeserializer(result.body);
}

/** List PublicCloudConnector resources by resource group */
export function publicCloudConnectorsListByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: PublicCloudConnectorsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<PublicCloudConnector> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _publicCloudConnectorsListByResourceGroupSend(
        context,
        resourceGroupName,
        options,
      ),
    _publicCloudConnectorsListByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _publicCloudConnectorsDeleteSend(
  context: Client,
  resourceGroupName: string,
  publicCloudConnector: string,
  options: PublicCloudConnectorsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridConnectivity/publicCloudConnectors/{publicCloudConnector}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      publicCloudConnector: publicCloudConnector,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _publicCloudConnectorsDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a PublicCloudConnector */
export async function publicCloudConnectorsDelete(
  context: Client,
  resourceGroupName: string,
  publicCloudConnector: string,
  options: PublicCloudConnectorsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _publicCloudConnectorsDeleteSend(
    context,
    resourceGroupName,
    publicCloudConnector,
    options,
  );
  return _publicCloudConnectorsDeleteDeserialize(result);
}

export function _publicCloudConnectorsUpdateSend(
  context: Client,
  resourceGroupName: string,
  publicCloudConnector: string,
  properties: PublicCloudConnectorUpdate,
  options: PublicCloudConnectorsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridConnectivity/publicCloudConnectors/{publicCloudConnector}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      publicCloudConnector: publicCloudConnector,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: publicCloudConnectorUpdateSerializer(properties),
    });
}

export async function _publicCloudConnectorsUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<PublicCloudConnector> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return publicCloudConnectorDeserializer(result.body);
}

/** Update a PublicCloudConnector */
export async function publicCloudConnectorsUpdate(
  context: Client,
  resourceGroupName: string,
  publicCloudConnector: string,
  properties: PublicCloudConnectorUpdate,
  options: PublicCloudConnectorsUpdateOptionalParams = { requestOptions: {} },
): Promise<PublicCloudConnector> {
  const result = await _publicCloudConnectorsUpdateSend(
    context,
    resourceGroupName,
    publicCloudConnector,
    properties,
    options,
  );
  return _publicCloudConnectorsUpdateDeserialize(result);
}

export function _publicCloudConnectorsCreateOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  publicCloudConnector: string,
  resource: PublicCloudConnector,
  options: PublicCloudConnectorsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridConnectivity/publicCloudConnectors/{publicCloudConnector}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      publicCloudConnector: publicCloudConnector,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: publicCloudConnectorSerializer(resource),
    });
}

export async function _publicCloudConnectorsCreateOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<PublicCloudConnector> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return publicCloudConnectorDeserializer(result.body);
}

/** Create a PublicCloudConnector */
export function publicCloudConnectorsCreateOrUpdate(
  context: Client,
  resourceGroupName: string,
  publicCloudConnector: string,
  resource: PublicCloudConnector,
  options: PublicCloudConnectorsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<PublicCloudConnector>, PublicCloudConnector> {
  return getLongRunningPoller(
    context,
    _publicCloudConnectorsCreateOrUpdateDeserialize,
    ["200", "201", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _publicCloudConnectorsCreateOrUpdateSend(
          context,
          resourceGroupName,
          publicCloudConnector,
          resource,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<OperationState<PublicCloudConnector>, PublicCloudConnector>;
}

export function _publicCloudConnectorsGetSend(
  context: Client,
  resourceGroupName: string,
  publicCloudConnector: string,
  options: PublicCloudConnectorsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridConnectivity/publicCloudConnectors/{publicCloudConnector}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      publicCloudConnector: publicCloudConnector,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _publicCloudConnectorsGetDeserialize(
  result: PathUncheckedResponse,
): Promise<PublicCloudConnector> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return publicCloudConnectorDeserializer(result.body);
}

/** Get a PublicCloudConnector */
export async function publicCloudConnectorsGet(
  context: Client,
  resourceGroupName: string,
  publicCloudConnector: string,
  options: PublicCloudConnectorsGetOptionalParams = { requestOptions: {} },
): Promise<PublicCloudConnector> {
  const result = await _publicCloudConnectorsGetSend(
    context,
    resourceGroupName,
    publicCloudConnector,
    options,
  );
  return _publicCloudConnectorsGetDeserialize(result);
}
