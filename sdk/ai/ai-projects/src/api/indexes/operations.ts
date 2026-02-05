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
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  IndexesCreateOrUpdateOptionalParams,
  IndexesDeleteOptionalParams,
  IndexesGetOptionalParams,
  IndexesListOptionalParams,
  IndexesListVersionsOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _createOrUpdateSend(
  context: Client,
  name: string,
  version: string,
  index: IndexUnion,
  options: IndexesCreateOrUpdateOptionalParams = { requestOptions: {} },
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
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/merge-patch+json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: indexUnionSerializer(index),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<IndexUnion> {
  const expectedStatuses = ["201", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return indexUnionDeserializer(result.body);
}

/** Create a new or update an existing Index with the given version id */
export async function createOrUpdate(
  context: Client,
  name: string,
  index: IndexUnion,
  version: string,
  options: IndexesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<IndexUnion> {
  const result = await _createOrUpdateSend(context, name, version, index, options);
  return _createOrUpdateDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  name: string,
  version: string,
  options: IndexesDeleteOptionalParams = { requestOptions: {} },
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
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete the specific version of the Index. The service returns 204 No Content if the Index was deleted successfully or if the Index does not exist. */
export async function $delete(
  context: Client,
  name: string,
  version: string,
  options: IndexesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, name, version, options);
  return _$deleteDeserialize(result);
}

export function _getSend(
  context: Client,
  name: string,
  version: string,
  options: IndexesGetOptionalParams = { requestOptions: {} },
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<IndexUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return indexUnionDeserializer(result.body);
}

/** Get the specific version of the Index. The service returns 404 Not Found error if the Index does not exist. */
export async function get(
  context: Client,
  name: string,
  version: string,
  options: IndexesGetOptionalParams = { requestOptions: {} },
): Promise<IndexUnion> {
  const result = await _getSend(context, name, version, options);
  return _getDeserialize(result);
}

export function _listSend(
  context: Client,
  options: IndexesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/indexes{?api-version}",
    {
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_PagedIndex> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedIndexDeserializer(result.body);
}

/** List the latest version of each Index */
export function list(
  context: Client,
  options: IndexesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<IndexUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion },
  );
}

export function _listVersionsSend(
  context: Client,
  name: string,
  options: IndexesListVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/indexes/{name}/versions{?api-version}",
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
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion },
  );
}
