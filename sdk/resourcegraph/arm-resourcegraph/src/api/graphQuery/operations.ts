// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ResourceGraphContext as Client } from "../index.js";
import type {
  GraphQueryResource,
  GraphQueryUpdateParameters,
  _GraphQueryListResult,
} from "../../models/graphQueryApi/models.js";
import {
  graphQueryResourceSerializer,
  graphQueryResourceDeserializer,
  graphQueryErrorDeserializer,
  graphQueryUpdateParametersSerializer,
  _graphQueryListResultDeserializer,
} from "../../models/graphQueryApi/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  GraphQueryListBySubscriptionOptionalParams,
  GraphQueryListOptionalParams,
  GraphQueryDeleteOptionalParams,
  GraphQueryUpdateOptionalParams,
  GraphQueryCreateOrUpdateOptionalParams,
  GraphQueryGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listBySubscriptionSend(
  context: Client,
  options: GraphQueryListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ResourceGraph/queries{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2024-04-01",
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
): Promise<_GraphQueryListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = graphQueryErrorDeserializer(result.body);
    }

    throw error;
  }

  return _graphQueryListResultDeserializer(result.body);
}

/** Get all graph queries defined within a specified subscription. */
export function listBySubscription(
  context: Client,
  options: GraphQueryListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GraphQueryResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-04-01" },
  );
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  options: GraphQueryListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ResourceGraph/queries{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2024-04-01",
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
): Promise<_GraphQueryListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = graphQueryErrorDeserializer(result.body);
    }

    throw error;
  }

  return _graphQueryListResultDeserializer(result.body);
}

/** Get all graph queries defined within a specified subscription and resource group. */
export function list(
  context: Client,
  resourceGroupName: string,
  options: GraphQueryListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GraphQueryResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-04-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: GraphQueryDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ResourceGraph/queries/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": "2024-04-01",
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
    if (result.body) {
      error.details = graphQueryErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a graph query. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: GraphQueryDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, resourceName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  body: GraphQueryUpdateParameters,
  options: GraphQueryUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ResourceGraph/queries/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: graphQueryUpdateParametersSerializer(body),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<GraphQueryResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = graphQueryErrorDeserializer(result.body);
    }

    throw error;
  }

  return graphQueryResourceDeserializer(result.body);
}

/** Updates a graph query that has already been added. */
export async function update(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  body: GraphQueryUpdateParameters,
  options: GraphQueryUpdateOptionalParams = { requestOptions: {} },
): Promise<GraphQueryResource> {
  const result = await _updateSend(context, resourceGroupName, resourceName, body, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  properties: GraphQueryResource,
  options: GraphQueryCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ResourceGraph/queries/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: graphQueryResourceSerializer(properties),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<GraphQueryResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = graphQueryErrorDeserializer(result.body);
    }

    throw error;
  }

  return graphQueryResourceDeserializer(result.body);
}

/** Create a new graph query. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  properties: GraphQueryResource,
  options: GraphQueryCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<GraphQueryResource> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    resourceName,
    properties,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: GraphQueryGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ResourceGraph/queries/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": "2024-04-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<GraphQueryResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = graphQueryErrorDeserializer(result.body);
    }

    throw error;
  }

  return graphQueryResourceDeserializer(result.body);
}

/** Get a single graph query by its resourceName. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: GraphQueryGetOptionalParams = { requestOptions: {} },
): Promise<GraphQueryResource> {
  const result = await _getSend(context, resourceGroupName, resourceName, options);
  return _getDeserialize(result);
}
