// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../index.js";
import {
  _PagedIndex,
  _pagedIndexDeserializer,
  indexUnionSerializer,
  indexUnionDeserializer,
  IndexUnion,
} from "../../models/models.js";
import {
  IndexesCreateVersionOptionalParams,
  IndexesDeleteVersionOptionalParams,
  IndexesGetVersionOptionalParams,
  IndexesListLatestOptionalParams,
  IndexesListVersionsOptionalParams,
} from "./options.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _createVersionSend(
  context: Client,
  name: string,
  version: string,
  body: IndexUnion,
  options: IndexesCreateVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/indexes/{name}/versions/{version}{?api-version}",
    {
      name: name,
      version: version,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: indexUnionSerializer(body),
  });
}

export async function _createVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<IndexUnion> {
  const expectedStatuses = ["201", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return indexUnionDeserializer(result.body);
}

/** Create a new or replace an existing Index with the given version id */
export async function createVersion(
  context: Client,
  name: string,
  version: string,
  body: IndexUnion,
  options: IndexesCreateVersionOptionalParams = { requestOptions: {} },
): Promise<IndexUnion> {
  const result = await _createVersionSend(context, name, version, body, options);
  return _createVersionDeserialize(result);
}

export function _deleteVersionSend(
  context: Client,
  name: string,
  version: string,
  options: IndexesDeleteVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/indexes/{name}/versions/{version}{?api-version}",
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
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deleteVersionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete the specific version of the Index */
export async function deleteVersion(
  context: Client,
  name: string,
  version: string,
  options: IndexesDeleteVersionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteVersionSend(context, name, version, options);
  return _deleteVersionDeserialize(result);
}

export function _getVersionSend(
  context: Client,
  name: string,
  version: string,
  options: IndexesGetVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/indexes/{name}/versions/{version}{?api-version}",
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
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getVersionDeserialize(result: PathUncheckedResponse): Promise<IndexUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return indexUnionDeserializer(result.body);
}

/** Get the specific version of the Index */
export async function getVersion(
  context: Client,
  name: string,
  version: string,
  options: IndexesGetVersionOptionalParams = { requestOptions: {} },
): Promise<IndexUnion> {
  const result = await _getVersionSend(context, name, version, options);
  return _getVersionDeserialize(result);
}

export function _listLatestSend(
  context: Client,
  options: IndexesListLatestOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/indexes{?api-version,top,skip,tags,listViewType}",
    {
      "api-version": context.apiVersion,
      top: options?.top,
      skip: options?.skip,
      tags: options?.tags,
      listViewType: options?.listViewType,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listLatestDeserialize(result: PathUncheckedResponse): Promise<_PagedIndex> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedIndexDeserializer(result.body);
}

/** List the latest version of each Index */
export function listLatest(
  context: Client,
  options: IndexesListLatestOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<IndexUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listLatestSend(context, options),
    _listLatestDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listVersionsSend(
  context: Client,
  name: string,
  options: IndexesListVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/indexes/{name}/versions{?api-version,top,skip,tags,listViewType}",
    {
      name: name,
      "api-version": context.apiVersion,
      top: options?.top,
      skip: options?.skip,
      tags: options?.tags,
      listViewType: options?.listViewType,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listVersionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedIndex> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedIndexDeserializer(result.body);
}

/** List all versions of the given Index */
export function listVersions(
  context: Client,
  name: string,
  options: IndexesListVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<IndexUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listVersionsSend(context, name, options),
    _listVersionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
