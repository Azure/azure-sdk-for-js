// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext as Client } from "../../index.js";
import type {
  ToolUnion,
  ToolsetObject,
  _AgentsPagedResultToolsetObject,
  DeleteToolsetResponse,
} from "../../../models/models.js";
import {
  toolUnionArraySerializer,
  apiErrorResponseDeserializer,
  toolsetObjectDeserializer,
  _agentsPagedResultToolsetObjectDeserializer,
  deleteToolsetResponseDeserializer,
} from "../../../models/models.js";
import { buildPagedAsyncIterator } from "../../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import type {
  BetaToolsetsDeleteOptionalParams,
  BetaToolsetsListOptionalParams,
  BetaToolsetsGetOptionalParams,
  BetaToolsetsUpdateOptionalParams,
  BetaToolsetsCreateOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";

export function _$deleteSend(
  context: Client,
  toolSetName: string,
  options: BetaToolsetsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Toolsets=V1Preview";
  const path = expandUrlTemplate(
    "/toolsets/{tool_set_name}{?api%2Dversion}",
    {
      tool_set_name: toolSetName,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(
  result: PathUncheckedResponse,
): Promise<DeleteToolsetResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return deleteToolsetResponseDeserializer(result.body);
}

/** Delete a toolset. */
export async function $delete(
  context: Client,
  toolSetName: string,
  options: BetaToolsetsDeleteOptionalParams = { requestOptions: {} },
): Promise<DeleteToolsetResponse> {
  const result = await _$deleteSend(context, toolSetName, options);
  return _$deleteDeserialize(result);
}

export function _listSend(
  context: Client,
  options: BetaToolsetsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Toolsets=V1Preview";
  const path = expandUrlTemplate(
    "/toolsets{?limit,order,after,before,api%2Dversion}",
    {
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultToolsetObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return _agentsPagedResultToolsetObjectDeserializer(result.body);
}

/** List all toolsets. */
export function list(
  context: Client,
  options: BetaToolsetsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ToolsetObject> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _getSend(
  context: Client,
  toolSetName: string,
  options: BetaToolsetsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Toolsets=V1Preview";
  const path = expandUrlTemplate(
    "/toolsets/{tool_set_name}{?api%2Dversion}",
    {
      tool_set_name: toolSetName,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ToolsetObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return toolsetObjectDeserializer(result.body);
}

/** Retrieve a toolset. */
export async function get(
  context: Client,
  toolSetName: string,
  options: BetaToolsetsGetOptionalParams = { requestOptions: {} },
): Promise<ToolsetObject> {
  const result = await _getSend(context, toolSetName, options);
  return _getDeserialize(result);
}

export function _updateSend(
  context: Client,
  toolSetName: string,
  tools: ToolUnion[],
  options: BetaToolsetsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Toolsets=V1Preview";
  const path = expandUrlTemplate(
    "/toolsets/{tool_set_name}{?api%2Dversion}",
    {
      tool_set_name: toolSetName,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: {
      description: options?.description,
      metadata: options?.metadata,
      tools: toolUnionArraySerializer(tools),
    },
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ToolsetObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return toolsetObjectDeserializer(result.body);
}

/** Update a toolset. */
export async function update(
  context: Client,
  toolSetName: string,
  tools: ToolUnion[],
  options: BetaToolsetsUpdateOptionalParams = { requestOptions: {} },
): Promise<ToolsetObject> {
  const result = await _updateSend(context, toolSetName, tools, options);
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  name: string,
  tools: ToolUnion[],
  options: BetaToolsetsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Toolsets=V1Preview";
  const path = expandUrlTemplate(
    "/toolsets{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: {
      name: name,
      description: options?.description,
      metadata: options?.metadata,
      tools: toolUnionArraySerializer(tools),
    },
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<ToolsetObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return toolsetObjectDeserializer(result.body);
}

/** Create a toolset. */
export async function create(
  context: Client,
  name: string,
  tools: ToolUnion[],
  options: BetaToolsetsCreateOptionalParams = { requestOptions: {} },
): Promise<ToolsetObject> {
  const result = await _createSend(context, name, tools, options);
  return _createDeserialize(result);
}
