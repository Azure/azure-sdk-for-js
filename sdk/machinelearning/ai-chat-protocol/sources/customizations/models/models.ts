// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// @azsdk-rename(ChatMessage)
export interface ChatMessageParent {}

/** A single, role-attributed text message within a chat completion interaction. */
export interface TextChatMessage extends ChatMessageParent {
  /** The type of the message. */
  kind: "text";

  /** The message content. */
  content: string;
}

/// @azsdk-rename(ChatMessageDelta)
export interface ChatMessageDeltaParent {}

/** The representation of a delta text message received in a streaming completion. */
export interface TextChatMessageDelta extends ChatMessageDeltaParent {
  /** The type of the message. */
  kind: "text";

  /** The message content. */
  content?: string;
}

/** A single, role-attributed message within a chat completion interaction. */
export type ChatMessage = TextChatMessage;

/** The representation of a delta message received in a streaming completion. */
export type ChatMessageDelta = TextChatMessageDelta;

export interface StreamingChatCompletionOptions {
  /** The collection of context messages associated with this completion request. */
  messages: ChatMessage[];
}

export interface ChatCompletionOptions {
  /** The collection of context messages associated with this completion request. */
  messages: ChatMessage[];
}

export interface ChatChoice {
  /** The chat message for a given chat completion. */
  message: ChatMessage;
}

export interface ChoiceDelta {
  /** The partial message received for this choice. */
  delta: ChatMessageDelta;
}
