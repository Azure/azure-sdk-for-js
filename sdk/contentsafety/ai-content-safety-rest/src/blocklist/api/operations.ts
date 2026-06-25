// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlocklistContext as Client } from "./index.js";
import {
  AddOrUpdateTextBlocklistItemsOptions,
  addOrUpdateTextBlocklistItemsOptionsSerializer,
  TextBlocklistItem,
  textBlocklistItemDeserializer,
  AddOrUpdateTextBlocklistItemsResult,
  addOrUpdateTextBlocklistItemsResultDeserializer,
  TextBlocklist,
  textBlocklistSerializer,
  textBlocklistDeserializer,
  _PagedTextBlocklistItem,
  _pagedTextBlocklistItemDeserializer,
  _PagedTextBlocklist,
  _pagedTextBlocklistDeserializer,
  RemoveTextBlocklistItemsOptions,
  removeTextBlocklistItemsOptionsSerializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  RemoveBlocklistItemsOptionalParams,
  ListTextBlocklistsOptionalParams,
  ListTextBlocklistItemsOptionalParams,
  GetTextBlocklistItemOptionalParams,
  GetTextBlocklistOptionalParams,
  DeleteTextBlocklistOptionalParams,
  CreateOrUpdateTextBlocklistOptionalParams,
  AddOrUpdateBlocklistItemsOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _removeBlocklistItemsSend(
  context: Client,
  blocklistName: string,
  body: RemoveTextBlocklistItemsOptions,
  options: RemoveBlocklistItemsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/text/blocklists/{blocklistName}:removeBlocklistItems{?api%2Dversion}",
    {
      blocklistName: blocklistName,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      body: removeTextBlocklistItemsOptionsSerializer(body),
    });
}

export async function _removeBlocklistItemsDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Remove blocklistItems from a text blocklist. You can remove at most 100 BlocklistItems in one request. */
export async function removeBlocklistItems(
  context: Client,
  blocklistName: string,
  body: RemoveTextBlocklistItemsOptions,
  options: RemoveBlocklistItemsOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _removeBlocklistItemsSend(context, blocklistName, body, options);
  return _removeBlocklistItemsDeserialize(result);
}

export function _listTextBlocklistsSend(
  context: Client,
  options: ListTextBlocklistsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/text/blocklists{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listTextBlocklistsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedTextBlocklist> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedTextBlocklistDeserializer(result.body);
}

/** Get all text blocklists details. */
export function listTextBlocklists(
  context: Client,
  options: ListTextBlocklistsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TextBlocklist> {
  return buildPagedAsyncIterator(
    context,
    () => _listTextBlocklistsSend(context, options),
    _listTextBlocklistsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-09-01" },
  );
}

export function _listTextBlocklistItemsSend(
  context: Client,
  blocklistName: string,
  options: ListTextBlocklistItemsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/text/blocklists/{blocklistName}/blocklistItems{?api%2Dversion,top,skip,maxpagesize}",
    {
      blocklistName: blocklistName,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
      top: options?.top,
      skip: options?.skip,
      maxpagesize: options?.maxpagesize,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listTextBlocklistItemsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedTextBlocklistItem> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedTextBlocklistItemDeserializer(result.body);
}

/** Get all blocklistItems in a text blocklist. */
export function listTextBlocklistItems(
  context: Client,
  blocklistName: string,
  options: ListTextBlocklistItemsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TextBlocklistItem> {
  return buildPagedAsyncIterator(
    context,
    () => _listTextBlocklistItemsSend(context, blocklistName, options),
    _listTextBlocklistItemsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-09-01" },
  );
}

export function _getTextBlocklistItemSend(
  context: Client,
  blocklistName: string,
  blocklistItemId: string,
  options: GetTextBlocklistItemOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/text/blocklists/{blocklistName}/blocklistItems/{blocklistItemId}{?api%2Dversion}",
    {
      blocklistName: blocklistName,
      blocklistItemId: blocklistItemId,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getTextBlocklistItemDeserialize(
  result: PathUncheckedResponse,
): Promise<TextBlocklistItem> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return textBlocklistItemDeserializer(result.body);
}

/** Get blocklistItem by blocklistName and blocklistItemId from a text blocklist. */
export async function getTextBlocklistItem(
  context: Client,
  blocklistName: string,
  blocklistItemId: string,
  options: GetTextBlocklistItemOptionalParams = { requestOptions: {} },
): Promise<TextBlocklistItem> {
  const result = await _getTextBlocklistItemSend(context, blocklistName, blocklistItemId, options);
  return _getTextBlocklistItemDeserialize(result);
}

export function _getTextBlocklistSend(
  context: Client,
  blocklistName: string,
  options: GetTextBlocklistOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/text/blocklists/{blocklistName}{?api%2Dversion}",
    {
      blocklistName: blocklistName,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getTextBlocklistDeserialize(
  result: PathUncheckedResponse,
): Promise<TextBlocklist> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return textBlocklistDeserializer(result.body);
}

/** Returns text blocklist details. */
export async function getTextBlocklist(
  context: Client,
  blocklistName: string,
  options: GetTextBlocklistOptionalParams = { requestOptions: {} },
): Promise<TextBlocklist> {
  const result = await _getTextBlocklistSend(context, blocklistName, options);
  return _getTextBlocklistDeserialize(result);
}

export function _deleteTextBlocklistSend(
  context: Client,
  blocklistName: string,
  options: DeleteTextBlocklistOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/text/blocklists/{blocklistName}{?api%2Dversion}",
    {
      blocklistName: blocklistName,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteTextBlocklistDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Deletes a text blocklist. */
export async function deleteTextBlocklist(
  context: Client,
  blocklistName: string,
  options: DeleteTextBlocklistOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteTextBlocklistSend(context, blocklistName, options);
  return _deleteTextBlocklistDeserialize(result);
}

export function _createOrUpdateTextBlocklistSend(
  context: Client,
  blocklistName: string,
  options: TextBlocklist,
  optionalParams: CreateOrUpdateTextBlocklistOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/text/blocklists/{blocklistName}{?api%2Dversion}",
    {
      blocklistName: blocklistName,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
    },
    {
      allowReserved: optionalParams?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(optionalParams),
      contentType: "application/merge-patch+json",
      headers: { accept: "application/json", ...optionalParams.requestOptions?.headers },
      body: textBlocklistSerializer(options),
    });
}

export async function _createOrUpdateTextBlocklistDeserialize(
  result: PathUncheckedResponse,
): Promise<TextBlocklist> {
  const expectedStatuses = ["201", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return textBlocklistDeserializer(result.body);
}

/** Updates a text blocklist. If the blocklistName does not exist, a new blocklist will be created. */
export async function createOrUpdateTextBlocklist(
  context: Client,
  blocklistName: string,
  options: TextBlocklist,
  optionalParams: CreateOrUpdateTextBlocklistOptionalParams = { requestOptions: {} },
): Promise<TextBlocklist> {
  const result = await _createOrUpdateTextBlocklistSend(
    context,
    blocklistName,
    options,
    optionalParams,
  );
  return _createOrUpdateTextBlocklistDeserialize(result);
}

export function _addOrUpdateBlocklistItemsSend(
  context: Client,
  blocklistName: string,
  body: AddOrUpdateTextBlocklistItemsOptions,
  options: AddOrUpdateBlocklistItemsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/text/blocklists/{blocklistName}:addOrUpdateBlocklistItems{?api%2Dversion}",
    {
      blocklistName: blocklistName,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: addOrUpdateTextBlocklistItemsOptionsSerializer(body),
    });
}

export async function _addOrUpdateBlocklistItemsDeserialize(
  result: PathUncheckedResponse,
): Promise<AddOrUpdateTextBlocklistItemsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return addOrUpdateTextBlocklistItemsResultDeserializer(result.body);
}

/** Add or update blocklistItems to a text blocklist. You can add or update at most 100 blocklistItems in one request. */
export async function addOrUpdateBlocklistItems(
  context: Client,
  blocklistName: string,
  body: AddOrUpdateTextBlocklistItemsOptions,
  options: AddOrUpdateBlocklistItemsOptionalParams = { requestOptions: {} },
): Promise<AddOrUpdateTextBlocklistItemsResult> {
  const result = await _addOrUpdateBlocklistItemsSend(context, blocklistName, body, options);
  return _addOrUpdateBlocklistItemsDeserialize(result);
}
