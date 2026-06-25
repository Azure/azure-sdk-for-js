// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupportContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ChatTranscriptDetails,
  chatTranscriptDetailsDeserializer,
  _ChatTranscriptsListResult,
  _chatTranscriptsListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ChatTranscriptsNoSubscriptionListOptionalParams,
  ChatTranscriptsNoSubscriptionGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  supportTicketName: string,
  options: ChatTranscriptsNoSubscriptionListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Support/supportTickets/{supportTicketName}/chatTranscripts{?api%2Dversion}",
    {
      supportTicketName: supportTicketName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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

/** Lists all chat transcripts for a support ticket */
export function list(
  context: Client,
  supportTicketName: string,
  options: ChatTranscriptsNoSubscriptionListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ChatTranscriptDetails> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, supportTicketName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-06-01" },
  );
}

export function _getSend(
  context: Client,
  supportTicketName: string,
  chatTranscriptName: string,
  options: ChatTranscriptsNoSubscriptionGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Support/supportTickets/{supportTicketName}/chatTranscripts/{chatTranscriptName}{?api%2Dversion}",
    {
      supportTicketName: supportTicketName,
      chatTranscriptName: chatTranscriptName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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

/** Returns chatTranscript details for a no subscription support ticket. */
export async function get(
  context: Client,
  supportTicketName: string,
  chatTranscriptName: string,
  options: ChatTranscriptsNoSubscriptionGetOptionalParams = { requestOptions: {} },
): Promise<ChatTranscriptDetails> {
  const result = await _getSend(context, supportTicketName, chatTranscriptName, options);
  return _getDeserialize(result);
}
