// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** The configuration for a streaming chat completion request. */
export interface StreamingChatCompletionOptions {
  /** The collection of context messages associated with this completion request. */
  messages: Array<ChatMessage>;
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
  /**
   * The role associated with the message.
   *
   * Possible values: user, system, assistant
   */
  role: string;
  /**
   * Field that allows the chat app to store and retrieve data, the structure of such data is dependant on the backend
   * being used. The client must send back the data in this field unchanged in subsequent requests, until the chat app
   * sends a new one. The data in this field can be used to implement stateful services, such as remembering previous
   * conversations or user preferences.
   */
  sessionState?: unknown;
  kind: string;
}

/** A single, role-attributed text message within a chat completion interaction. */
export interface TextChatMessage extends ChatMessageParent {
  /** The type of the message. */
  kind: "text";
  /** The text associated with the message. */
  content: string;
}

/** The configuration for a chat completion request. */
export interface ChatCompletionOptions {
  /** The collection of context messages associated with this completion request. */
  messages: Array<ChatMessage>;
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

/** A single, role-attributed message within a chat completion interaction. */
export type ChatMessage = TextChatMessage;
