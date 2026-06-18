// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext as Client } from "../index.js";
import type {
  ToolUnion,
  ToolboxVersionObject,
  ToolboxObject,
  _AgentsPagedResultToolboxObject,
  _AgentsPagedResultToolboxVersionObject,
} from "../../models/models.js";
import {
  toolUnionArraySerializer,
  apiErrorResponseDeserializer,
  toolboxSkillUnionArraySerializer,
  toolboxPoliciesSerializer,
  toolboxVersionObjectDeserializer,
  toolboxObjectDeserializer,
  _agentsPagedResultToolboxObjectDeserializer,
  _agentsPagedResultToolboxVersionObjectDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DeleteVersionOptionalParams,
  ToolboxesDeleteOptionalParams,
  ToolboxesUpdateOptionalParams,
  GetVersionOptionalParams,
  ListVersionsOptionalParams,
  ToolboxesListOptionalParams,
  ToolboxesGetOptionalParams,
  CreateVersionOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _deleteVersionSend(
  context: Client,
  name: string,
  version: string,
  options: DeleteVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/toolboxes/{name}/versions/{version}{?api-version}",
    {
      name: name,
      version: version,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { ...options.requestOptions?.headers },
  });
}

export async function _deleteVersionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Removes the specified version of a toolbox. */
export async function deleteVersion(
  context: Client,
  name: string,
  version: string,
  options: DeleteVersionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteVersionSend(context, name, version, options);
  return _deleteVersionDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  name: string,
  options: ToolboxesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/toolboxes/{name}{?api-version}",
    {
      name: name,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { ...options.requestOptions?.headers },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Removes the specified toolbox along with all of its versions. */
export async function $delete(
  context: Client,
  name: string,
  options: ToolboxesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, name, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  name: string,
  defaultVersion: string,
  options: ToolboxesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/toolboxes/{name}{?api-version}",
    {
      name: name,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: { default_version: defaultVersion },
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ToolboxObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return toolboxObjectDeserializer(result.body);
}

/** Updates the toolbox's default version pointer to the specified version. */
export async function update(
  context: Client,
  name: string,
  defaultVersion: string,
  options: ToolboxesUpdateOptionalParams = { requestOptions: {} },
): Promise<ToolboxObject> {
  const result = await _updateSend(context, name, defaultVersion, options);
  return _updateDeserialize(result);
}

export function _getVersionSend(
  context: Client,
  name: string,
  version: string,
  options: GetVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/toolboxes/{name}/versions/{version}{?api-version}",
    {
      name: name,
      version: version,
      "api-version": context.apiVersion,
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

export async function _getVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<ToolboxVersionObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return toolboxVersionObjectDeserializer(result.body);
}

/** Retrieves the specified version of a toolbox by name and version identifier. */
export async function getVersion(
  context: Client,
  name: string,
  version: string,
  options: GetVersionOptionalParams = { requestOptions: {} },
): Promise<ToolboxVersionObject> {
  const result = await _getVersionSend(context, name, version, options);
  return _getVersionDeserialize(result);
}

export function _listVersionsSend(
  context: Client,
  name: string,
  options: ListVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/toolboxes/{name}/versions{?limit,order,after,before,api-version}",
    {
      name: name,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      "api-version": context.apiVersion,
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

export async function _listVersionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultToolboxVersionObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _agentsPagedResultToolboxVersionObjectDeserializer(result.body);
}

/** Returns the available versions for the specified toolbox. */
export function listVersions(
  context: Client,
  name: string,
  options: ListVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ToolboxVersionObject> {
  return buildPagedAsyncIterator(
    context,
    () => _listVersionsSend(context, name, options),
    _listVersionsDeserialize,
    ["200"],
    {
      itemName: "data",
      apiVersion: context.apiVersion,
      cursorFieldName: "last_id",
      hasMoreFieldName: "has_more",
    },
  );
}

export function _listSend(
  context: Client,
  options: ToolboxesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/toolboxes{?limit,order,after,before,api-version}",
    {
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      "api-version": context.apiVersion,
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
): Promise<_AgentsPagedResultToolboxObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _agentsPagedResultToolboxObjectDeserializer(result.body);
}

/** Returns the toolboxes available in the current project. */
export function list(
  context: Client,
  options: ToolboxesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ToolboxObject> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "data",
      apiVersion: context.apiVersion,
      cursorFieldName: "last_id",
      hasMoreFieldName: "has_more",
    },
  );
}

export function _getSend(
  context: Client,
  name: string,
  options: ToolboxesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/toolboxes/{name}{?api-version}",
    {
      name: name,
      "api-version": context.apiVersion,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ToolboxObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return toolboxObjectDeserializer(result.body);
}

/** Retrieves the specified toolbox and its current configuration. */
export async function get(
  context: Client,
  name: string,
  options: ToolboxesGetOptionalParams = { requestOptions: {} },
): Promise<ToolboxObject> {
  const result = await _getSend(context, name, options);
  return _getDeserialize(result);
}

export function _createVersionSend(
  context: Client,
  name: string,
  tools: ToolUnion[],
  options: CreateVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/toolboxes/{name}/versions{?api-version}",
    {
      name: name,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: {
      description: options?.description,
      metadata: options?.metadata,
      tools: toolUnionArraySerializer(tools),
      skills: !options?.skills
        ? options?.skills
        : toolboxSkillUnionArraySerializer(options?.skills),
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
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return toolboxVersionObjectDeserializer(result.body);
}

/** Creates a new toolbox version, provisioning the toolbox itself if it does not already exist. */
export async function createVersion(
  context: Client,
  name: string,
  tools: ToolUnion[],
  options: CreateVersionOptionalParams = { requestOptions: {} },
): Promise<ToolboxVersionObject> {
  const result = await _createVersionSend(context, name, tools, options);
  return _createVersionDeserialize(result);
}
