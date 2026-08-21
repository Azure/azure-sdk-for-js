// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftSupportContext } from "../../api/microsoftSupportContext.js";
import { list, get } from "../../api/chatTranscripts/operations.js";
import type {
  ChatTranscriptsListOptionalParams,
  ChatTranscriptsGetOptionalParams,
} from "../../api/chatTranscripts/options.js";
import type { ChatTranscriptDetails } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ChatTranscripts operations. */
export interface ChatTranscriptsOperations {
  /** Lists all chat transcripts for a support ticket under subscription */
  list: (
    supportTicketName: string,
    options?: ChatTranscriptsListOptionalParams,
  ) => PagedAsyncIterableIterator<ChatTranscriptDetails>;
  /** Returns chatTranscript details for a support ticket under a subscription. */
  get: (
    supportTicketName: string,
    chatTranscriptName: string,
    options?: ChatTranscriptsGetOptionalParams,
  ) => Promise<ChatTranscriptDetails>;
}

function _getChatTranscripts(context: MicrosoftSupportContext) {
  return {
    list: (supportTicketName: string, options?: ChatTranscriptsListOptionalParams) =>
      list(context, supportTicketName, options),
    get: (
      supportTicketName: string,
      chatTranscriptName: string,
      options?: ChatTranscriptsGetOptionalParams,
    ) => get(context, supportTicketName, chatTranscriptName, options),
  };
}

export function _getChatTranscriptsOperations(
  context: MicrosoftSupportContext,
): ChatTranscriptsOperations {
  return {
    ..._getChatTranscripts(context),
  };
}
