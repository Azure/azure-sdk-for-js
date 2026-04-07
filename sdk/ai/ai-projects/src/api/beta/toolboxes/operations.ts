// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext as Client } from "../../index.js";
import type {
  ToolUnion,
  ToolboxVersionObject,
  ToolboxObject,
  _AgentsPagedResultToolboxObject,
  _AgentsPagedResultToolboxVersionObject,
} from "../../../models/models.js";
import {
  toolUnionArraySerializer,
  apiErrorResponseDeserializer,
  toolboxPoliciesSerializer,
  toolboxVersionObjectDeserializer,
  toolboxObjectDeserializer,
  _agentsPagedResultToolboxObjectDeserializer,
  _agentsPagedResultToolboxVersionObjectDeserializer,
} from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import { buildPagedAsyncIterator } from "../../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import type {
  DeleteVersionOptionalParams,
  BetaToolboxesDeleteOptionalParams,
  BetaToolboxesUpdateOptionalParams,
  GetVersionOptionalParams,
  ListVersionsOptionalParams,
  BetaToolboxesListOptionalParams,
  BetaToolboxesGetOptionalParams,
  CreateVersionOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _deleteVersionSend(
  context: Client,
  toolboxName: string,
  version: string,
  foundryFeatures: "Toolboxes=V1Preview",
  options: DeleteVersionOptionalParams = { requestOptions: {} },
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
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { "foundry-features": foundryFeatures, ...options.requestOptions?.headers },
  });
}

export async function _deleteVersionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete a specific version of a toolbox. */
export async function deleteVersion(
  context: Client,
  toolboxName: string,
  version: string,
  foundryFeatures: "Toolboxes=V1Preview",
  options: DeleteVersionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteVersionSend(context, toolboxName, version, foundryFeatures, options);
  return _deleteVersionDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  toolboxName: string,
  foundryFeatures: "Toolboxes=V1Preview",
  options: BetaToolboxesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/toolboxes/{toolbox_name}{?api-version}",
    {
      toolbox_name: toolboxName,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { "foundry-features": foundryFeatures, ...options.requestOptions?.headers },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete a toolbox and all its versions. */
export async function $delete(
  context: Client,
  toolboxName: string,
  foundryFeatures: "Toolboxes=V1Preview",
  options: BetaToolboxesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, toolboxName, foundryFeatures, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  toolboxName: string,
  defaultVersion: string,
  foundryFeatures: "Toolboxes=V1Preview",
  options: BetaToolboxesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/toolboxes/{toolbox_name}{?api-version}",
    {
      toolbox_name: toolboxName,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: { default_version: defaultVersion },
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

/** Update a toolbox to point to a specific version. */
export async function update(
  context: Client,
  toolboxName: string,
  defaultVersion: string,
  foundryFeatures: "Toolboxes=V1Preview",
  options: BetaToolboxesUpdateOptionalParams = { requestOptions: {} },
): Promise<ToolboxObject> {
  const result = await _updateSend(context, toolboxName, defaultVersion, foundryFeatures, options);
  return _updateDeserialize(result);
}

export function _getVersionSend(
  context: Client,
  toolboxName: string,
  version: string,
  foundryFeatures: "Toolboxes=V1Preview",
  options: GetVersionOptionalParams = { requestOptions: {} },
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
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getVersionDeserialize(
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
export async function getVersion(
  context: Client,
  toolboxName: string,
  version: string,
  foundryFeatures: "Toolboxes=V1Preview",
  options: GetVersionOptionalParams = { requestOptions: {} },
): Promise<ToolboxVersionObject> {
  const result = await _getVersionSend(context, toolboxName, version, foundryFeatures, options);
  return _getVersionDeserialize(result);
}

export function _listVersionsSend(
  context: Client,
  toolboxName: string,
  foundryFeatures: "Toolboxes=V1Preview",
  options: ListVersionsOptionalParams = { requestOptions: {} },
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
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listVersionsDeserialize(
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
export function listVersions(
  context: Client,
  toolboxName: string,
  foundryFeatures: "Toolboxes=V1Preview",
  options: ListVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ToolboxVersionObject> {
  return buildPagedAsyncIterator(
    context,
    () => _listVersionsSend(context, toolboxName, foundryFeatures, options),
    _listVersionsDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _listSend(
  context: Client,
  foundryFeatures: "Toolboxes=V1Preview",
  options: BetaToolboxesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/toolboxes{?limit,order,after,before,api-version}",
    {
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      "api-version": context.apiVersion ?? "v1",
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
  foundryFeatures: "Toolboxes=V1Preview",
  options: BetaToolboxesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ToolboxObject> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, foundryFeatures, options),
    _listDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _getSend(
  context: Client,
  toolboxName: string,
  foundryFeatures: "Toolboxes=V1Preview",
  options: BetaToolboxesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/toolboxes/{toolbox_name}{?api-version}",
    {
      toolbox_name: toolboxName,
      "api-version": context.apiVersion ?? "v1",
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
  foundryFeatures: "Toolboxes=V1Preview",
  options: BetaToolboxesGetOptionalParams = { requestOptions: {} },
): Promise<ToolboxObject> {
  const result = await _getSend(context, toolboxName, foundryFeatures, options);
  return _getDeserialize(result);
}

export function _createVersionSend(
  context: Client,
  toolboxName: string,
  tools: ToolUnion[],
  foundryFeatures: "Toolboxes=V1Preview",
  options: CreateVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/toolboxes/{toolbox_name}/versions{?api-version}",
    {
      toolbox_name: toolboxName,
      "api-version": context.apiVersion ?? "v1",
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
      policies: !options?.policies
        ? options?.policies
        : toolboxPoliciesSerializer(options?.policies),
    },
  });
}

export async function _createVersionDeserialize(
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

/** Create a new version of a toolbox. If the toolbox does not exist, it will be created. */
export async function createVersion(
  context: Client,
  toolboxName: string,
  tools: ToolUnion[],
  foundryFeatures: "Toolboxes=V1Preview",
  options: CreateVersionOptionalParams = { requestOptions: {} },
): Promise<ToolboxVersionObject> {
  const result = await _createVersionSend(context, toolboxName, tools, foundryFeatures, options);
  return _createVersionDeserialize(result);
}
