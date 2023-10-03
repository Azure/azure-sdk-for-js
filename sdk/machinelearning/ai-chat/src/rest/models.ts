// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface ChatCompletionOptions {
  messages: Array<ChatMessage>;
  stream: true;
  session_state: unknown;
  extra_args: Record<string, unknown>;
}

/** placeholder */
export interface ChatMessage {
  /** placeholder */
  content: string;
  /**
   * placeholder
   *
   * Possible values: user, system, assistant
   */
  role: string;
  /** placeholder */
  session_state: unknown;
}

/** placeholder */
export interface StreamingChatCompletionOptions {
  /** placeholder */
  messages: Array<ChatMessage>;
  /** placeholder */
  stream: false;
  /** placeholder */
  session_state: unknown;
  /** placeholder */
  extra_args: Record<string, unknown>;
}
