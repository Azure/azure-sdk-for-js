// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import { ErrorModel } from "@azure-rest/core-client";

/**
 * Representation of the response data from an embeddings request.
 * Embeddings measure the relatedness of text strings and are commonly used for search, clustering,
 * recommendations, and other similar scenarios.
 */
export interface Embeddings {
  /** Embedding values for the prompts submitted in the request. */
  data: EmbeddingItem[];
  /** Usage counts for tokens input using the embeddings API. */
  usage: EmbeddingsUsage;
}

/** Representation of a single embeddings relatedness comparison. */
export interface EmbeddingItem {
  /**
   * List of embeddings value for the input prompt. These represent a measurement of the
   * vector-based relatedness of the provided input.
   */
  embedding: number[];
  /** Index of the prompt to which the EmbeddingItem corresponds. */
  index: number;
}

/** Measurement of the amount of tokens used in this request and response. */
export interface EmbeddingsUsage {
  /** Number of tokens sent in the original request. */
  promptTokens: number;
  /** Total number of tokens transacted in this request/response. */
  totalTokens: number;
}

/**
 * Representation of the response data from a completions request.
 * Completions support a wide variety of tasks and generate text that continues from or "completes"
 * provided prompt data.
 */
export interface Completions {
  /** A unique identifier associated with this completions response. */
  id: string;
  /**
   * The first timestamp associated with generation activity for this completions response,
   * represented as seconds since the beginning of the Unix epoch of 00:00 on 1 Jan 1970.
   */
  created: number;
  /**
   * The collection of completions choices associated with this completions response.
   * Generally, `n` choices are generated per provided prompt with a default value of 1.
   * Token limits and other settings may limit the number of choices generated.
   */
  choices: Choice[];
  /** Usage information for tokens processed and generated as part of this completions operation. */
  usage: CompletionsUsage;
}

/**
 * The representation of a single prompt completion as part of an overall completions request.
 * Generally, `n` choices are generated per provided prompt with a default value of 1.
 * Token limits and other settings may limit the number of choices generated.
 */
export interface Choice {
  /** The generated text for a given completions prompt. */
  text: string;
  /** The ordered index associated with this completions choice. */
  index: number;
  /** The log probabilities model for tokens associated with this completions choice. */
  logprobs: CompletionsLogProbabilityModel | null;
  /** Reason for finishing */
  finishReason: CompletionsFinishReason | null;
}

/** Representation of a log probabilities model for a completions generation. */
export interface CompletionsLogProbabilityModel {
  /** The textual forms of tokens evaluated in this probability model. */
  tokens: string[];
  /** A collection of log probability values for the tokens in this completions data. */
  tokenLogprobs: (number | null)[];
  /** A mapping of tokens to maximum log probability values in this completions data. */
  topLogprobs: Record<string, number | null>[];
  /** The text offsets associated with tokens in this completions data. */
  textOffset: number[];
}

/** Representation of a log probabilities model for a completions generation. */
export interface CompletionsLogProbabilityModel {
  /** The textual forms of tokens evaluated in this probability model. */
  tokens: string[];
  /** A collection of log probability values for the tokens in this completions data. */
  tokenLogprobs: (number | null)[];
  /** A mapping of tokens to maximum log probability values in this completions data. */
  topLogprobs: Record<string, number | null>[];
  /** The text offsets associated with tokens in this completions data. */
  textOffset: number[];
}

/** Representation of the manner in which a completions response concluded. */
/** "stop", "length", "content_filter" */
export type CompletionsFinishReason = string;

/**
 * Representation of the token counts processed for a completions request.
 * Counts consider all tokens across prompts, choices, choice alternates, best_of generations, and
 * other consumers.
 */
export interface CompletionsUsage {
  /** The number of tokens generated across all completions emissions. */
  completionTokens: number;
  /** The number of tokens in the provided prompts for the completions request. */
  promptTokens: number;
  /** The total number of tokens processed for the completions request and response. */
  totalTokens: number;
}

/** A single, role-attributed message within a chat completion interaction. */
export interface ChatMessage {
  /** The role associated with this message payload. */
  role: ChatRole;
  /** The text associated with this message payload. */
  content?: string;
}

/** A description of the intended purpose of a message within a chat completions interaction. */
/** "system", "assistant", "user" */
export type ChatRole = string;

/**
 * Representation of the response data from a chat completions request.
 * Completions support a wide variety of tasks and generate text that continues from or "completes"
 * provided prompt data.
 */
export interface ChatCompletions {
  /** A unique identifier associated with this chat completions response. */
  id: string;
  /**
   * The first timestamp associated with generation activity for this completions response,
   * represented as seconds since the beginning of the Unix epoch of 00:00 on 1 Jan 1970.
   */
  created: number;
  /**
   * The collection of completions choices associated with this completions response.
   * Generally, `n` choices are generated per provided prompt with a default value of 1.
   * Token limits and other settings may limit the number of choices generated.
   */
  choices: ChatChoice[];
  /** Usage information for tokens processed and generated as part of this completions operation. */
  usage: CompletionsUsage;
}

/**
 * The representation of a single prompt completion as part of an overall chat completions request.
 * Generally, `n` choices are generated per provided prompt with a default value of 1.
 * Token limits and other settings may limit the number of choices generated.
 */
export interface ChatChoice {
  /** The chat message for a given chat completions prompt. */
  message?: ChatMessage;
  /** The ordered index associated with this chat completions choice. */
  index: number;
  /** The reason that this chat completions choice completed its generated. */
  finishReason: CompletionsFinishReason | null;
  /** The delta message content for a streaming response. */
  delta?: ChatMessage;
}

/** A polling status update or final response payload for an image operation. */
export interface BatchImageGenerationOperationResponse {
  /** The ID of the operation. */
  id: string;
  /** A timestamp when this job or item was created (in unix epochs). */
  created: number;
  /** A timestamp when this operation and its associated images expire and will be deleted (in unix epochs). */
  expires?: number;
  /** The result of the operation if the operation succeeded. */
  result?: ImageGenerations;
  /** The status of the operation */
  status: AzureOpenAIOperationState;
  /** The error if the operation failed. */
  error?: ErrorModel;
}

/** Convenience alias for BatchImageGenerationOperationResponse */
export type ImageGenerationResponse = BatchImageGenerationOperationResponse;

/** The result of the operation if the operation succeeded. */
export interface ImageGenerations {
  /** A timestamp when this job or item was created (in unix epochs). */
  created: number;
  /** The images generated by the operator. */
  data: ImageLocation[] | ImagePayload[];
}

/** An image response item that provides a URL from which an image may be accessed. */
export interface ImageLocation {
  /** The URL that provides temporary access to download the generated image. */
  url: string;
}

/** An image response item that directly represents the image data as a base64-encoded string. */
export interface ImagePayload {
  /** The complete data for an image represented as a base64-encoded string. */
  base64Data: string;
}

/** The state of a job or item. */
/** "notRunning", "running", "succeeded", "canceled", "failed" */
export type AzureOpenAIOperationState = string;
/** The desired size of the generated images. Must be one of 256x256, 512x512, or 1024x1024. */
/** "256x256", "512x512", "1024x1024" */
export type ImageSize = string;
/** The format in which the generated images are returned. */
/** "url", "b64_json" */
export type ImageGenerationResponseFormat = string;
