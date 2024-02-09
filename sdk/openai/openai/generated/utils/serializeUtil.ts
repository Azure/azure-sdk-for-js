// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ChatRequestUserMessage as ChatRequestUserMessageRest,
  ChatRequestAssistantMessage as ChatRequestAssistantMessageRest,
  ChatRequestToolMessage as ChatRequestToolMessageRest,
  ChatRequestMessage as ChatRequestMessageRest,
  ChatMessageImageContentItem as ChatMessageImageContentItemRest,
  ChatMessageContentItem as ChatMessageContentItemRest,
} from "../rest/index.js";
import {
  ChatRequestUserMessage,
  ChatRequestAssistantMessage,
  ChatRequestToolMessage,
  ChatRequestMessageUnion,
  ChatMessageImageContentItem,
  ChatMessageContentItemUnion,
} from "../models/models.js";

/** serialize function for ChatRequestUserMessage */
function serializeChatRequestUserMessage(
  obj: ChatRequestUserMessage,
): ChatRequestUserMessageRest {
  return {
    role: obj["role"],
    content: obj["content"] as any,
    name: obj["name"],
  };
}

/** serialize function for ChatRequestAssistantMessage */
function serializeChatRequestAssistantMessage(
  obj: ChatRequestAssistantMessage,
): ChatRequestAssistantMessageRest {
  return {
    role: obj["role"],
    content: obj["content"],
    name: obj["name"],
    tool_calls: obj["toolCalls"],
    function_call: !obj.functionCall
      ? undefined
      : {
          name: obj.functionCall?.["name"],
          arguments: obj.functionCall?.["arguments"],
        },
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
    case "user":
      return serializeChatRequestUserMessage(obj as ChatRequestUserMessage);
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

/** serialize function for ChatMessageImageContentItem */
function serializeChatMessageImageContentItem(
  obj: ChatMessageImageContentItem,
): ChatMessageImageContentItemRest {
  return {
    type: obj["type"],
    image_url: { url: obj.imageUrl["url"], detail: obj.imageUrl["detail"] },
  };
}

/** serialize function for ChatMessageContentItemUnion */
export function serializeChatMessageContentItemUnion(
  obj: ChatMessageContentItemUnion,
): ChatMessageContentItemRest {
  switch (obj.type) {
    case "image_url":
      return serializeChatMessageImageContentItem(
        obj as ChatMessageImageContentItem,
      );
    default:
      return obj;
  }
}
