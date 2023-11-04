// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** A single, role-attributed message within a chat completion interaction. */
export interface ChatMessageOutput {
  /** The text associated with the message. */
  content: string;
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
  sessionState?: any;
}

/** A single response to a streaming completion request. */
export interface ChatCompletionChunkOutput {
  /** The collection of choice deltas received in this chunk. */
  choices: Array<ChoiceDeltaOutput>;
}

/** The representation of an incremental choice received in a streaming completion. */
export interface ChoiceDeltaOutput {
  /** The index of the of the chat choice, relative to the other choices in the same completion. */
  index: number;
  /** The partial message received for this choice. */
  delta: ChatMessageDeltaOutput;
  /**
   * Field that allows the chat app to store and retrieve data, the structure of such data is dependant on the backend
   * being used. The client must send back the data in this field unchanged in subsequent requests, until the chat app
   * sends a new one. The data in this field can be used to implement stateful services, such as remembering previous
   * conversations or user preferences.
   */
  sessionState?: any;
  /**
   * Context allows the chat app to receive extra parameters from the client, such as temperature, functions, or
   * customer_info. These parameters are specific to the chat app and not understood by the generic clients.
   */
  context?: Record<string, any>;
  /**
   * The reason this chat completion completed its generation.
   *
   * Possible values: stop, length
   */
  finishReason?: string;
}

/** The representation of a delta message received in a streaming completion. */
export interface ChatMessageDeltaOutput {
  /** An incremental part of the text associated with the message. */
  content?: string;
  /**
   * The role associated with the message.
   *
   * Possible values: user, system, assistant
   */
  role?: string;
  /**
   * Field that allows the chat app to store and retrieve data, the structure of such data is dependant on the backend
   * being used. The client must send back the data in this field unchanged in subsequent requests, until the chat app
   * sends a new one. The data in this field can be used to implement stateful services, such as remembering previous
   * conversations or user preferences.
   */
  sessionState?: any;
}

/** Representation of the response to a chat completion request. */
export interface ChatCompletionOutput {
  /** The collection of generated completions. */
  choices: Array<ChatChoiceOutput>;
}

/** The representation of a single generated completion. */
export interface ChatChoiceOutput {
  /** The index of the of the chat choice, relative to the other choices in the same completion. */
  index: number;
  /** The chat message for a given chat completion. */
  message: ChatMessageOutput;
  /**
   * Field that allows the chat app to store and retrieve data, the structure of such data is dependant on the backend
   * being used. The client must send back the data in this field unchanged in subsequent requests, until the chat app
   * sends a new one. The data in this field can be used to implement stateful services, such as remembering previous
   * conversations or user preferences.
   */
  sessionState?: any;
  /**
   * Context allows the chat app to receive extra parameters from the client, such as temperature, functions, or
   * customer_info. These parameters are specific to the chat app and not understood by the generic clients.
   */
  context?: Record<string, any>;
  /**
   * The reason this chat completion completed its generation.
   *
   * Possible values: stop, length
   */
  finishReason: string;
}
