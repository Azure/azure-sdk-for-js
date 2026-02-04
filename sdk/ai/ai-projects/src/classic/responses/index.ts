// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../api/aiProjectContext.js";
import { compactResponseConversation } from "../../api/responses/operations.js";
import { ResponsesCompactResponseConversationOptionalParams } from "../../api/responses/options.js";
import { ModelIdsCompaction, CompactResource } from "../../models/models.js";

/** Interface representing a Responses operations. */
export interface ResponsesOperations {
  /** Produces a compaction of a responses conversation. */
  compactResponseConversation: (
    model: ModelIdsCompaction,
    options?: ResponsesCompactResponseConversationOptionalParams,
  ) => Promise<CompactResource>;
}

function _getResponses(context: AIProjectContext) {
  return {
    compactResponseConversation: (
      model: ModelIdsCompaction,
      options?: ResponsesCompactResponseConversationOptionalParams,
    ) => compactResponseConversation(context, model, options),
  };
}

export function _getResponsesOperations(context: AIProjectContext): ResponsesOperations {
  return {
    ..._getResponses(context),
  };
}
