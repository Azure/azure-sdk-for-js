// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface EmbeddingsOutput {
  object: "list";
  data: Array<EmbeddingItemOutput>;
}

export interface EmbeddingItemOutput {
  object: "embedding";
  embedding: number[];
  index: number;
}

/** A response containing error details. */
export interface ErrorResponseOutput {
  /** The error object. */
  error: ErrorModelOutput;
}

/** The error object. */
export interface ErrorModelOutput {
  /** One of a server-defined set of error codes. */
  code: string;
  /** A human-readable representation of the error. */
  message: string;
  /** The target of the error. */
  target?: string;
  /** An array of details about specific errors that led to this reported error. */
  details: Array<ErrorModelOutput>;
  /** An object containing more specific information than the current object about the error. */
  innererror?: InnerErrorOutput;
}

/** An object containing more specific information about the error. As per Microsoft One API guidelines - https://github.com/Microsoft/api-guidelines/blob/vNext/Guidelines.md#7102-error-condition-responses. */
export interface InnerErrorOutput {
  /** One of a server-defined set of error codes. */
  code: string;
  /** Inner error. */
  innererror?: InnerErrorOutput;
}

/** Expected response schema to completion request */
export interface CompletionOutput {
  /** Id for completion response */
  id?: string;
  /** Object for completion response */
  object: "text_completion";
  /** Created time for completion response */
  created?: number;
  /** Model used for completion response */
  model?: string;
  /** Array of choices returned containing text completions to prompts sent */
  choices?: Array<ChoiceOutput>;
}

/** Choice model within completion response */
export interface ChoiceOutput {
  /** Generated text for given completion prompt */
  text?: string;
  /** Index */
  index?: number;
  /** Log Prob Model */
  logprobs?: CompletionsLogProbsModelOutput;
  /** Reason for finishing */
  finish_reason?: string;
}

/** LogProbs model within completion choice */
export interface CompletionsLogProbsModelOutput {
  /** Tokens */
  tokens?: string[];
  /** LogProbs of Tokens */
  token_logprobs?: number[];
  /** Top LogProbs */
  top_logprobs?: Record<string, number>[];
  /** Text offset */
  text_offset?: number[];
}
