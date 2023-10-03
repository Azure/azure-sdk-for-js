// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** placeholder */
export interface ChatMessage {
  /** placeholder */
  content: string;
  /** placeholder */
  role: ChatRole;
  /** placeholder */
  sessionState: any;
}

/** placeholder */
/** "user", "system", "assistant" */
export type ChatRole = string;

/** placeholder */
export interface ChatCompletion {
  /** placeholder */
  choices: ChatChoice[];
}

/** placeholder */
export interface ChatChoice {
  /** placeholder */
  index: number;
  /** placeholder */
  message: ChatMessage;
  /** placeholder */
  extraArguments: Record<string, any>;
  /** placeholder */
  sessionState: any;
  /** placeholder */
  finishReason: FinishReason;
}

/** placeholder */
/** "stop", "length", "content_filter", "function_call" */
export type FinishReason = string;

/** placeholder */
export interface ChatCompletionChunk {
  /** placeholder */
  choices: ChoiceDelta[];
}

/** placeholder */
export interface ChoiceDelta {
  /** placeholder */
  index: number;
  /** placeholder */
  delta: ChatMessageDelta;
  /** placeholder */
  extraArguments?: Record<string, any>;
  /** placeholder */
  sessionState?: any;
  /** placeholder */
  finishReason?: FinishReason;
}

/** placeholder */
export interface ChatMessageDelta {
  /** placeholder */
  content?: string;
  /** placeholder */
  role?: ChatRole;
  /** placeholder */
  sessionState?: any;
}
