// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgentsContext as Client } from "../index.js";
import {
  apiErrorDeserializer,
  ItemParamUnion,
  itemParamUnionArraySerializer,
  ConversationResource,
  conversationResourceDeserializer,
  DeletedConversationResource,
  deletedConversationResourceDeserializer,
  _AgentsPagedResultConversationResource,
  _agentsPagedResultConversationResourceDeserializer,
  ConversationItemList,
  conversationItemListDeserializer,
  itemResourceUnionDeserializer,
  ItemResourceUnion,
  _AgentsPagedResultItemResource,
  _agentsPagedResultItemResourceDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ConversationsListConversationItemsOptionalParams,
  ConversationsDeleteConversationItemOptionalParams,
  ConversationsGetConversationItemOptionalParams,
  ConversationsCreateConversationItemsOptionalParams,
  ConversationsListConversationsOptionalParams,
  ConversationsDeleteConversationOptionalParams,
  ConversationsGetConversationOptionalParams,
  ConversationsUpdateConversationOptionalParams,
  ConversationsCreateConversationOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listConversationItemsSend(
  context: Client,
  conversationId: string,
  options: ConversationsListConversationItemsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/openai/conversations/{conversation_id}/items{?api-version,limit,order,after,before,item_type}",
    {
      conversation_id: conversationId,
      "api-version": context.apiVersion,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      item_type: options?.itemType,
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
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listConversationItemsDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultItemResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorDeserializer(result.body);
    throw error;
  }

  return _agentsPagedResultItemResourceDeserializer(result.body);
}

/** List all items for a conversation with the given ID. */
export function listConversationItems(
  context: Client,
  conversationId: string,
  options: ConversationsListConversationItemsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ItemResourceUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listConversationItemsSend(context, conversationId, options),
    _listConversationItemsDeserialize,
    ["200"],
    { itemName: "data" },
  );
}

export function _deleteConversationItemSend(
  context: Client,
  conversationId: string,
  itemId: string,
  options: ConversationsDeleteConversationItemOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/openai/conversations/{conversation_id}/items/{item_id}{?api-version}",
    {
      conversation_id: conversationId,
      item_id: itemId,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _deleteConversationItemDeserialize(
  result: PathUncheckedResponse,
): Promise<ConversationResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorDeserializer(result.body);
    throw error;
  }

  return conversationResourceDeserializer(result.body);
}

/** Delete an item from a conversation with the given IDs. */
export async function deleteConversationItem(
  context: Client,
  conversationId: string,
  itemId: string,
  options: ConversationsDeleteConversationItemOptionalParams = {
    requestOptions: {},
  },
): Promise<ConversationResource> {
  const result = await _deleteConversationItemSend(
    context,
    conversationId,
    itemId,
    options,
  );
  return _deleteConversationItemDeserialize(result);
}

export function _getConversationItemSend(
  context: Client,
  conversationId: string,
  itemId: string,
  options: ConversationsGetConversationItemOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/openai/conversations/{conversation_id}/items/{item_id}{?api-version}",
    {
      conversation_id: conversationId,
      item_id: itemId,
      "api-version": context.apiVersion,
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
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getConversationItemDeserialize(
  result: PathUncheckedResponse,
): Promise<ItemResourceUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorDeserializer(result.body);
    throw error;
  }

  return itemResourceUnionDeserializer(result.body);
}

/** Get a single item from a conversation with the given IDs. */
export async function getConversationItem(
  context: Client,
  conversationId: string,
  itemId: string,
  options: ConversationsGetConversationItemOptionalParams = {
    requestOptions: {},
  },
): Promise<ItemResourceUnion> {
  const result = await _getConversationItemSend(
    context,
    conversationId,
    itemId,
    options,
  );
  return _getConversationItemDeserialize(result);
}

export function _createConversationItemsSend(
  context: Client,
  conversationId: string,
  items: ItemParamUnion[],
  options: ConversationsCreateConversationItemsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/openai/conversations/{conversation_id}/items{?api-version,include}",
    {
      conversation_id: conversationId,
      "api-version": context.apiVersion,
      include: !options?.include
        ? options?.include
        : options?.include.map((p: any) => {
            return p;
          }),
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
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: { items: itemParamUnionArraySerializer(items) },
    });
}

export async function _createConversationItemsDeserialize(
  result: PathUncheckedResponse,
): Promise<ConversationItemList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorDeserializer(result.body);
    throw error;
  }

  return conversationItemListDeserializer(result.body);
}

/** Create items in a conversation with the given ID. */
export async function createConversationItems(
  context: Client,
  conversationId: string,
  items: ItemParamUnion[],
  options: ConversationsCreateConversationItemsOptionalParams = {
    requestOptions: {},
  },
): Promise<ConversationItemList> {
  const result = await _createConversationItemsSend(
    context,
    conversationId,
    items,
    options,
  );
  return _createConversationItemsDeserialize(result);
}

export function _listConversationsSend(
  context: Client,
  options: ConversationsListConversationsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/openai/conversations{?api-version,limit,order,after,before,agent_name,agent_id}",
    {
      "api-version": context.apiVersion,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      agent_name: options?.agentName,
      agent_id: options?.agentId,
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
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listConversationsDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultConversationResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorDeserializer(result.body);
    throw error;
  }

  return _agentsPagedResultConversationResourceDeserializer(result.body);
}

/** Returns the list of all conversations. */
export function listConversations(
  context: Client,
  options: ConversationsListConversationsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ConversationResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listConversationsSend(context, options),
    _listConversationsDeserialize,
    ["200"],
    { itemName: "data" },
  );
}

export function _deleteConversationSend(
  context: Client,
  conversationId: string,
  options: ConversationsDeleteConversationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/openai/conversations/{conversation_id}{?api-version}",
    {
      conversation_id: conversationId,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _deleteConversationDeserialize(
  result: PathUncheckedResponse,
): Promise<DeletedConversationResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorDeserializer(result.body);
    throw error;
  }

  return deletedConversationResourceDeserializer(result.body);
}

/** Deletes a conversation. */
export async function deleteConversation(
  context: Client,
  conversationId: string,
  options: ConversationsDeleteConversationOptionalParams = {
    requestOptions: {},
  },
): Promise<DeletedConversationResource> {
  const result = await _deleteConversationSend(
    context,
    conversationId,
    options,
  );
  return _deleteConversationDeserialize(result);
}

export function _getConversationSend(
  context: Client,
  conversationId: string,
  options: ConversationsGetConversationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/openai/conversations/{conversation_id}{?api-version}",
    {
      conversation_id: conversationId,
      "api-version": context.apiVersion,
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
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getConversationDeserialize(
  result: PathUncheckedResponse,
): Promise<ConversationResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorDeserializer(result.body);
    throw error;
  }

  return conversationResourceDeserializer(result.body);
}

/** Retrieves a conversation. */
export async function getConversation(
  context: Client,
  conversationId: string,
  options: ConversationsGetConversationOptionalParams = { requestOptions: {} },
): Promise<ConversationResource> {
  const result = await _getConversationSend(context, conversationId, options);
  return _getConversationDeserialize(result);
}

export function _updateConversationSend(
  context: Client,
  conversationId: string,
  options: ConversationsUpdateConversationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/openai/conversations/{conversation_id}{?api-version}",
    {
      conversation_id: conversationId,
      "api-version": context.apiVersion,
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
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: { metadata: options?.metadata },
    });
}

export async function _updateConversationDeserialize(
  result: PathUncheckedResponse,
): Promise<ConversationResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorDeserializer(result.body);
    throw error;
  }

  return conversationResourceDeserializer(result.body);
}

/** Update a conversation. */
export async function updateConversation(
  context: Client,
  conversationId: string,
  options: ConversationsUpdateConversationOptionalParams = {
    requestOptions: {},
  },
): Promise<ConversationResource> {
  const result = await _updateConversationSend(
    context,
    conversationId,
    options,
  );
  return _updateConversationDeserialize(result);
}

export function _createConversationSend(
  context: Client,
  options: ConversationsCreateConversationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/openai/conversations{?api-version}",
    {
      "api-version": context.apiVersion,
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
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: {
        metadata: options?.metadata,
        items: !options?.items
          ? options?.items
          : itemParamUnionArraySerializer(options?.items),
      },
    });
}

export async function _createConversationDeserialize(
  result: PathUncheckedResponse,
): Promise<ConversationResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorDeserializer(result.body);
    throw error;
  }

  return conversationResourceDeserializer(result.body);
}

/** Create a conversation. */
export async function createConversation(
  context: Client,
  options: ConversationsCreateConversationOptionalParams = {
    requestOptions: {},
  },
): Promise<ConversationResource> {
  const result = await _createConversationSend(context, options);
  return _createConversationDeserialize(result);
}
