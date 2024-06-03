// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ChatRequestAssistantMessage as ChatRequestAssistantMessageRest,
  ChatRequestToolMessage as ChatRequestToolMessageRest,
  ChatRequestMessage as ChatRequestMessageRest,
} from "../rest/index.js";
import {
  ChatRequestAssistantMessage,
  ChatRequestToolMessage,
  ChatRequestMessageUnion,
} from "../models/models.js";

/** serialize function for ChatRequestAssistantMessage */
function serializeChatRequestAssistantMessage(
  obj: ChatRequestAssistantMessage,
): ChatRequestAssistantMessageRest {
  return {
    role: obj["role"],
    content: obj["content"],
    tool_calls: obj["toolCalls"],
  };
}

/** serialize function for ChatRequestToolMessage */
function serializeChatRequestToolMessage(
  obj: ChatRequestToolMessage,
): ChatRequestToolMessageRest {
  return {
    role: obj["role"],
    content: obj["content"],
    tool_call_id: obj["toolCallId"],
  };
}

/** serialize function for ChatRequestMessageUnion */
export function serializeChatRequestMessageUnion(
  obj: ChatRequestMessageUnion,
): ChatRequestMessageRest {
  switch (obj.role) {
    case "assistant":
      return serializeChatRequestAssistantMessage(
        obj as ChatRequestAssistantMessage,
      );
    case "tool":
      return serializeChatRequestToolMessage(obj as ChatRequestToolMessage);
    default:
      return obj;
  }
}
