// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */
/** The configuration for a streaming chat completion request. */
export interface StreamingChatCompletionOptions {
  /** The collection of context messages associated with this completion request. */
  messages: ChatMessage[];
  /** Indicates whether the completion is a streaming or non-streaming completion. */
  stream: true;
  /**
   * Field that allows the chat app to store and retrieve data, the structure of such data is dependant on the backend
   * being used. The client must send back the data in this field unchanged in subsequent requests, until the chat app
   * sends a new one. The data in this field can be used to implement stateful services, such as remembering previous
   * conversations or user preferences.
   */
  sessionState?: unknown;
  /**
   * Context allows the chat app to receive extra parameters from the client, such as temperature, functions, or
   * customer_info. These parameters are specific to the chat app and not understood by the generic clients.
   */
  context?: Record<string, unknown>;
}

/** A single, role-attributed message within a chat completion interaction. */
export interface ChatMessageParent {
  /** the discriminator possible values text */
  kind: MessageKind;
  /** The role associated with the message. */
  role: ChatRole;
  /**
   * Field that allows the chat app to store and retrieve data, the structure of such data is dependant on the backend
   * being used. The client must send back the data in this field unchanged in subsequent requests, until the chat app
   * sends a new one. The data in this field can be used to implement stateful services, such as remembering previous
   * conversations or user preferences.
   */
  sessionState?: unknown;
}

/** A single response to a streaming completion request. */
export interface ChatCompletionDelta {
  /** The collection of choice deltas received in this chunk. */
  choices: ChoiceDelta[];
}

/** The representation of an incremental choice received in a streaming completion. */
export interface ChoiceDelta {
  /** The index of the of the chat choice, relative to the other choices in the same completion. */
  index: number;
  /** The partial message received for this choice. */
  delta: ChatMessageDelta;
  /**
   * Field that allows the chat app to store and retrieve data, the structure of such data is dependant on the backend
   * being used. The client must send back the data in this field unchanged in subsequent requests, until the chat app
   * sends a new one. The data in this field can be used to implement stateful services, such as remembering previous
   * conversations or user preferences.
   */
  sessionState?: unknown;
  /**
   * Context allows the chat app to receive extra parameters from the client, such as temperature, functions, or
   * customer_info. These parameters are specific to the chat app and not understood by the generic clients.
   */
  context?: Record<string, unknown>;
  /** The reason this chat completion completed its generation. */
  finishReason?: FinishReason;
}

/** The representation of a delta message received in a streaming completion. */
export interface ChatMessageDeltaParent {
  /** the discriminator possible values text */
  kind: MessageKind;
  /** The role associated with the message. */
  role?: ChatRole;
  /**
   * Field that allows the chat app to store and retrieve data, the structure of such data is dependant on the backend
   * being used. The client must send back the data in this field unchanged in subsequent requests, until the chat app
   * sends a new one. The data in this field can be used to implement stateful services, such as remembering previous
   * conversations or user preferences.
   */
  sessionState?: unknown;
}

/** The configuration for a chat completion request. */
export interface ChatCompletionOptions {
  /** The collection of context messages associated with this completion request. */
  messages: ChatMessage[];
  /** Indicates whether the completion is a streaming or non-streaming completion. */
  stream: false;
  /**
   * Field that allows the chat app to store and retrieve data, the structure of such data is dependant on the backend
   * being used. The client must send back the data in this field unchanged in subsequent requests, until the chat app
   * sends a new one. The data in this field can be used to implement stateful services, such as remembering previous
   * conversations or user preferences.
   */
  sessionState?: unknown;
  /**
   * Context allows the chat app to receive extra parameters from the client, such as temperature, functions, or
   * customer_info. These parameters are specific to the chat app and not understood by the generic clients.
   */
  context?: Record<string, unknown>;
}

/** Representation of the response to a chat completion request. */
export interface ChatCompletion {
  /** The collection of generated completions. */
  choices: ChatChoice[];
}

/** The representation of a single generated completion. */
export interface ChatChoice {
  /** The index of the of the chat choice, relative to the other choices in the same completion. */
  index: number;
  /** The chat message for a given chat completion. */
  message: ChatMessage;
  /**
   * Field that allows the chat app to store and retrieve data, the structure of such data is dependant on the backend
   * being used. The client must send back the data in this field unchanged in subsequent requests, until the chat app
   * sends a new one. The data in this field can be used to implement stateful services, such as remembering previous
   * conversations or user preferences.
   */
  sessionState?: unknown;
  /**
   * Context allows the chat app to receive extra parameters from the client, such as temperature, functions, or
   * customer_info. These parameters are specific to the chat app and not understood by the generic clients.
   */
  context?: Record<string, unknown>;
  /** The reason this chat completion completed its generation. */
  finishReason: FinishReason;
}

/** A single, role-attributed text message within a chat completion interaction. */
export interface TextChatMessage extends ChatMessageParent {
  /** The type of the message. */
  kind: "text";
  /** The message content. */
  content: string;
}

/** The representation of a delta text message received in a streaming completion. */
export interface TextChatMessageDelta extends ChatMessageDeltaParent {
  /** The type of the message. */
  kind: "text";
  /** The message content. */
  content?: string;
}

/** Identifies the type of a message. */
/** "text" */
export type MessageKind = string;
/** A representation of the intended purpose of a message. */
/** "user", "system", "assistant" */
export type ChatRole = string;
/** Representation of the reason why a chat session has finished processing. */
/** "stop", "length" */
export type FinishReason = string;
/** A single, role-attributed message within a chat completion interaction. */
export type ChatMessage = TextChatMessage;
/** The representation of a delta message received in a streaming completion. */
export type ChatMessageDelta = TextChatMessageDelta;
