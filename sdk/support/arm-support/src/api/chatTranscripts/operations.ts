// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftSupportContext as Client } from "../index.js";
import type { ChatTranscriptDetails, _ChatTranscriptsListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  chatTranscriptDetailsDeserializer,
  _chatTranscriptsListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ChatTranscriptsListOptionalParams,
  ChatTranscriptsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  supportTicketName: string,
  options: ChatTranscriptsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Support/supportTickets/{supportTicketName}/chatTranscripts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      supportTicketName: supportTicketName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
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
): Promise<_ChatTranscriptsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _chatTranscriptsListResultDeserializer(result.body);
}

/** Lists all chat transcripts for a support ticket under subscription */
export function list(
  context: Client,
  supportTicketName: string,
  options: ChatTranscriptsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ChatTranscriptDetails> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, supportTicketName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-07-01" },
  );
}

export function _getSend(
  context: Client,
  supportTicketName: string,
  chatTranscriptName: string,
  options: ChatTranscriptsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Support/supportTickets/{supportTicketName}/chatTranscripts/{chatTranscriptName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      supportTicketName: supportTicketName,
      chatTranscriptName: chatTranscriptName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ChatTranscriptDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return chatTranscriptDetailsDeserializer(result.body);
}

/** Returns chatTranscript details for a support ticket under a subscription. */
export async function get(
  context: Client,
  supportTicketName: string,
  chatTranscriptName: string,
  options: ChatTranscriptsGetOptionalParams = { requestOptions: {} },
): Promise<ChatTranscriptDetails> {
  const result = await _getSend(context, supportTicketName, chatTranscriptName, options);
  return _getDeserialize(result);
}
