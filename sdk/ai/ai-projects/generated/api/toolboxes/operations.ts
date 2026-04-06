// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../index.js";
import {
  apiErrorResponseDeserializer,
  _AgentsPagedResultToolboxVersionObject,
  _agentsPagedResultToolboxVersionObjectDeserializer,
  ToolboxVersionObject,
  toolboxVersionObjectDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ToolboxesDeleteToolboxVersionOptionalParams,
  ToolboxesGetToolboxVersionOptionalParams,
  ToolboxesListToolboxVersionsOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _deleteToolboxVersionSend(
  context: Client,
  toolboxName: string,
  version: string,
  foundryFeatures: "Toolboxes=V1Preview",
  options: ToolboxesDeleteToolboxVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/toolboxes/{toolbox_name}/versions/{version}{?api%2Dversion}",
    {
      toolbox_name: toolboxName,
      version: version,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: { "foundry-features": foundryFeatures, ...options.requestOptions?.headers },
    });
}

export async function _deleteToolboxVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete a specific version of a toolbox. */
export async function deleteToolboxVersion(
  context: Client,
  toolboxName: string,
  version: string,
  foundryFeatures: "Toolboxes=V1Preview",
  options: ToolboxesDeleteToolboxVersionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteToolboxVersionSend(
    context,
    toolboxName,
    version,
    foundryFeatures,
    options,
  );
  return _deleteToolboxVersionDeserialize(result);
}

export function _getToolboxVersionSend(
  context: Client,
  toolboxName: string,
  version: string,
  foundryFeatures: "Toolboxes=V1Preview",
  options: ToolboxesGetToolboxVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/toolboxes/{toolbox_name}/versions/{version}{?api%2Dversion}",
    {
      toolbox_name: toolboxName,
      version: version,
      "api%2Dversion": context.apiVersion ?? "v1",
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
        "foundry-features": foundryFeatures,
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getToolboxVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<ToolboxVersionObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return toolboxVersionObjectDeserializer(result.body);
}

/** Retrieve a specific version of a toolbox. */
export async function getToolboxVersion(
  context: Client,
  toolboxName: string,
  version: string,
  foundryFeatures: "Toolboxes=V1Preview",
  options: ToolboxesGetToolboxVersionOptionalParams = { requestOptions: {} },
): Promise<ToolboxVersionObject> {
  const result = await _getToolboxVersionSend(
    context,
    toolboxName,
    version,
    foundryFeatures,
    options,
  );
  return _getToolboxVersionDeserialize(result);
}

export function _listToolboxVersionsSend(
  context: Client,
  toolboxName: string,
  foundryFeatures: "Toolboxes=V1Preview",
  options: ToolboxesListToolboxVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/toolboxes/{toolbox_name}/versions{?limit,order,after,before,api%2Dversion}",
    {
      toolbox_name: toolboxName,
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
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        "foundry-features": foundryFeatures,
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listToolboxVersionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultToolboxVersionObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return _agentsPagedResultToolboxVersionObjectDeserializer(result.body);
}

/** List all versions of a toolbox. */
export function listToolboxVersions(
  context: Client,
  toolboxName: string,
  foundryFeatures: "Toolboxes=V1Preview",
  options: ToolboxesListToolboxVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ToolboxVersionObject> {
  return buildPagedAsyncIterator(
    context,
    () => _listToolboxVersionsSend(context, toolboxName, foundryFeatures, options),
    _listToolboxVersionsDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
  );
}
