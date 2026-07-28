// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkspaceContext as Client } from "../index.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../../static-helpers/pagingHelpers.js";
import {
  Conversation,
  conversationSerializer,
  conversationDeserializer,
} from "../../../models/microsoft/discovery/workspace/models.js";
import { PagedConversation, pagedConversationDeserializer } from "../../../models/models.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import {
  ConversationsListOptionalParams,
  ConversationsDeleteOptionalParams,
  ConversationsStableUpdateOptionalParams,
  ConversationsCreateOptionalParams,
  ConversationsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: ConversationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/conversations{?api%2Dversion,investigationName,projectName,createdSince,top,skip,maxpagesize}",
    {
      "api%2Dversion": "2026-06-01",
      investigationName: options?.investigationName,
      projectName: options?.projectName,
      createdSince: !options?.createdSince
        ? options?.createdSince
        : options?.createdSince.toISOString(),
      top: options?.top,
      skip: options?.skip,
      maxpagesize: options?.maxpagesize,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<PagedConversation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return pagedConversationDeserializer(result.body);
}
/** List Conversation resources */
export function list(
  context: Client,
  options: ConversationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Conversation> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2026-06-01" },
  );
}

export function _$deleteSend(
  context: Client,
  conversationName: string,
  options: ConversationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/conversations/{conversationName}{?api%2Dversion}",
    {
      conversationName: conversationName,
      "api%2Dversion": "2026-06-01",
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
/** Deletes a Conversation. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  conversationName: string,
  options: ConversationsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, conversationName, options);
  return _$deleteDeserialize(result);
}

export function _stableUpdateSend(
  context: Client,
  conversationName: string,
  resource: Conversation,
  options: ConversationsStableUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/conversations/{conversationName}{?api%2Dversion}",
    {
      conversationName: conversationName,
      "api%2Dversion": "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/merge-patch+json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: conversationSerializer(resource),
  });
}

export async function _stableUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Conversation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return conversationDeserializer(result.body);
}
/** Updates a Conversation. */
export async function stableUpdate(
  context: Client,
  conversationName: string,
  resource: Conversation,
  options: ConversationsStableUpdateOptionalParams = { requestOptions: {} },
): Promise<Conversation> {
  const result = await _stableUpdateSend(context, conversationName, resource, options);
  return _stableUpdateDeserialize(result);
}

export function _createSend(
  context: Client,
  projectName: string,
  options: ConversationsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/conversations{?api%2Dversion}",
    {
      "api%2Dversion": "2026-06-01",
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
      projectName: projectName,
      investigationName: options?.investigationName,
      displayName: options?.displayName,
    },
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<Conversation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return conversationDeserializer(result.body);
}
/** Creates a Conversation. */
export async function create(
  context: Client,
  projectName: string,
  options: ConversationsCreateOptionalParams = { requestOptions: {} },
): Promise<Conversation> {
  const result = await _createSend(context, projectName, options);
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  conversationName: string,
  options: ConversationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/conversations/{conversationName}{?api%2Dversion}",
    {
      conversationName: conversationName,
      "api%2Dversion": "2026-06-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Conversation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return conversationDeserializer(result.body);
}
/** Fetch a Conversation by name. */
export async function get(
  context: Client,
  conversationName: string,
  options: ConversationsGetOptionalParams = { requestOptions: {} },
): Promise<Conversation> {
  const result = await _getSend(context, conversationName, options);
  return _getDeserialize(result);
}
