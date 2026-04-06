// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext as Client } from "../../index.js";
import type {
  ToolUnion,
  ToolboxObject,
  _AgentsPagedResultToolboxObject,
  DeleteToolboxResponse,
} from "../../../models/models.js";
import {
  toolUnionArraySerializer,
  apiErrorResponseDeserializer,
  toolboxObjectDeserializer,
  _agentsPagedResultToolboxObjectDeserializer,
  deleteToolboxResponseDeserializer,
} from "../../../models/models.js";
import { buildPagedAsyncIterator } from "../../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import type {
  BetaToolboxesDeleteOptionalParams,
  BetaToolboxesListOptionalParams,
  BetaToolboxesGetOptionalParams,
  BetaToolboxesUpdateOptionalParams,
  BetaToolboxesCreateOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";

export function _$deleteSend(
  context: Client,
  toolboxName: string,
  options: BetaToolboxesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "toolboxes=V1Preview";
  const path = expandUrlTemplate(
    "/toolboxes/{tool_set_name}{?api%2Dversion}",
    {
      tool_set_name: toolboxName,
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
): Promise<DeleteToolboxResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return deleteToolboxResponseDeserializer(result.body);
}

/** Delete a toolbox. */
export async function $delete(
  context: Client,
  toolboxName: string,
  options: BetaToolboxesDeleteOptionalParams = { requestOptions: {} },
): Promise<DeleteToolboxResponse> {
  const result = await _$deleteSend(context, toolboxName, options);
  return _$deleteDeserialize(result);
}

export function _listSend(
  context: Client,
  options: BetaToolboxesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "toolboxes=V1Preview";
  const path = expandUrlTemplate(
    "/toolboxes{?limit,order,after,before,api%2Dversion}",
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
): Promise<_AgentsPagedResultToolboxObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return _agentsPagedResultToolboxObjectDeserializer(result.body);
}

/** List all toolboxes. */
export function list(
  context: Client,
  options: BetaToolboxesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ToolboxObject> {
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
  toolboxName: string,
  options: BetaToolboxesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "toolboxes=V1Preview";
  const path = expandUrlTemplate(
    "/toolboxes/{tool_set_name}{?api%2Dversion}",
    {
      tool_set_name: toolboxName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ToolboxObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return toolboxObjectDeserializer(result.body);
}

/** Retrieve a toolbox. */
export async function get(
  context: Client,
  toolboxName: string,
  options: BetaToolboxesGetOptionalParams = { requestOptions: {} },
): Promise<ToolboxObject> {
  const result = await _getSend(context, toolboxName, options);
  return _getDeserialize(result);
}

export function _updateSend(
  context: Client,
  toolboxName: string,
  tools: ToolUnion[],
  options: BetaToolboxesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "toolboxes=V1Preview";
  const path = expandUrlTemplate(
    "/toolboxes/{tool_set_name}{?api%2Dversion}",
    {
      tool_set_name: toolboxName,
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

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ToolboxObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return toolboxObjectDeserializer(result.body);
}

/** Update a toolbox. */
export async function update(
  context: Client,
  toolboxName: string,
  tools: ToolUnion[],
  options: BetaToolboxesUpdateOptionalParams = { requestOptions: {} },
): Promise<ToolboxObject> {
  const result = await _updateSend(context, toolboxName, tools, options);
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  name: string,
  tools: ToolUnion[],
  options: BetaToolboxesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "toolboxes=V1Preview";
  const path = expandUrlTemplate(
    "/toolboxes{?api%2Dversion}",
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

export async function _createDeserialize(result: PathUncheckedResponse): Promise<ToolboxObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return toolboxObjectDeserializer(result.body);
}

/** Create a toolbox. */
export async function create(
  context: Client,
  name: string,
  tools: ToolUnion[],
  options: BetaToolboxesCreateOptionalParams = { requestOptions: {} },
): Promise<ToolboxObject> {
  const result = await _createSend(context, name, tools, options);
  return _createDeserialize(result);
}
