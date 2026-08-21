// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftSupportContext } from "../../api/microsoftSupportContext.js";
import { list, get } from "../../api/chatTranscriptsNoSubscription/operations.js";
import type {
  ChatTranscriptsNoSubscriptionListOptionalParams,
  ChatTranscriptsNoSubscriptionGetOptionalParams,
} from "../../api/chatTranscriptsNoSubscription/options.js";
import type { ChatTranscriptDetails } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ChatTranscriptsNoSubscription operations. */
export interface ChatTranscriptsNoSubscriptionOperations {
  /** Lists all chat transcripts for a support ticket */
  list: (
    supportTicketName: string,
    options?: ChatTranscriptsNoSubscriptionListOptionalParams,
  ) => PagedAsyncIterableIterator<ChatTranscriptDetails>;
  /** Returns chatTranscript details for a no subscription support ticket. */
  get: (
    supportTicketName: string,
    chatTranscriptName: string,
    options?: ChatTranscriptsNoSubscriptionGetOptionalParams,
  ) => Promise<ChatTranscriptDetails>;
}

function _getChatTranscriptsNoSubscription(context: MicrosoftSupportContext) {
  return {
    list: (supportTicketName: string, options?: ChatTranscriptsNoSubscriptionListOptionalParams) =>
      list(context, supportTicketName, options),
    get: (
      supportTicketName: string,
      chatTranscriptName: string,
      options?: ChatTranscriptsNoSubscriptionGetOptionalParams,
    ) => get(context, supportTicketName, chatTranscriptName, options),
  };
}

export function _getChatTranscriptsNoSubscriptionOperations(
  context: MicrosoftSupportContext,
): ChatTranscriptsNoSubscriptionOperations {
  return {
    ..._getChatTranscriptsNoSubscription(context),
  };
}
