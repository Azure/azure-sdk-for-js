// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** placeholder */
export interface ChatMessageOutput {
  /** placeholder */
  content: string;
  /**
   * placeholder
   *
   * Possible values: user, system, assistant
   */
  role: string;
  /** placeholder */
  session_state: any;
}

/** placeholder */
export interface ChatCompletionOutput {
  /** placeholder */
  choices: Array<ChatChoiceOutput>;
}

/** placeholder */
export interface ChatChoiceOutput {
  /** placeholder */
  index: number;
  /** placeholder */
  message: ChatMessageOutput;
  /** placeholder */
  extra_args: Record<string, any>;
  /** placeholder */
  session_state: any;
  /**
   * placeholder
   *
   * Possible values: stop, length, content_filter, function_call
   */
  finishReason: string;
}

/** placeholder */
export interface ChatCompletionChunkOutput {
  /** placeholder */
  choices: Array<ChoiceDeltaOutput>;
}

/** placeholder */
export interface ChoiceDeltaOutput {
  /** placeholder */
  index: number;
  /** placeholder */
  delta: ChatMessageDeltaOutput;
  /** placeholder */
  extra_args?: Record<string, any>;
  /** placeholder */
  session_state?: any;
  /**
   * placeholder
   *
   * Possible values: stop, length, content_filter, function_call
   */
  finishReason?: string;
}

/** placeholder */
export interface ChatMessageDeltaOutput {
  /** placeholder */
  content?: string;
  /**
   * placeholder
   *
   * Possible values: user, system, assistant
   */
  role?: string;
  /** placeholder */
  session_state?: any;
}
