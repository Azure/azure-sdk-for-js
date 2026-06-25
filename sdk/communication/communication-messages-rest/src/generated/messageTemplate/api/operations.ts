// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MessageTemplateContext as Client } from "./index.js";
import {
  _PagedMessageTemplateItem,
  _pagedMessageTemplateItemDeserializer,
  MessageTemplateItemUnion,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { ListTemplatesOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listTemplatesSend(
  context: Client,
  channelId: string,
  options: ListTemplatesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/messages/channels/{channelId}/templates{?api%2Dversion,maxPageSize}",
    {
      channelId: channelId,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
      maxPageSize: options?.maxPageSize,
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
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listTemplatesDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedMessageTemplateItem> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedMessageTemplateItemDeserializer(result.body);
}

/** List all templates for given Azure Communication Services channel */
export function listTemplates(
  context: Client,
  channelId: string,
  options: ListTemplatesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MessageTemplateItemUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listTemplatesSend(context, channelId, options),
    _listTemplatesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-09-01-preview",
    },
  );
}
