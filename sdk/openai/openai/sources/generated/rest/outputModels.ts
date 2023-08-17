// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ErrorModel } from "@azure-rest/core-client";

/** A specific deployment */
export interface DeploymentOutput {
  /** deployment id of the deployed model */
  readonly deploymentId: string;
}

/**
 * Representation of the response data from an embeddings request.
 * Embeddings measure the relatedness of text strings and are commonly used for search, clustering,
 * recommendations, and other similar scenarios.
 */
export interface EmbeddingsOutput {
  /** Embedding values for the prompts submitted in the request. */
  data: Array<EmbeddingItemOutput>;
  /** Usage counts for tokens input using the embeddings API. */
  usage: EmbeddingsUsageOutput;
}

/** Representation of a single embeddings relatedness comparison. */
export interface EmbeddingItemOutput {
  /**
   * List of embeddings value for the input prompt. These represent a measurement of the
   * vector-based relatedness of the provided input.
   */
  embedding: number[];
  /** Index of the prompt to which the EmbeddingItem corresponds. */
  index: number;
}

/** Measurement of the amount of tokens used in this request and response. */
export interface EmbeddingsUsageOutput {
  /** Number of tokens sent in the original request. */
  prompt_tokens: number;
  /** Total number of tokens transacted in this request/response. */
  total_tokens: number;
}

/**
 * Representation of the response data from a completions request.
 * Completions support a wide variety of tasks and generate text that continues from or "completes"
 * provided prompt data.
 */
export interface CompletionsOutput {
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
  choices: Array<ChoiceOutput>;
  /** Usage information for tokens processed and generated as part of this completions operation. */
  usage: CompletionsUsageOutput;
}

/**
 * The representation of a single prompt completion as part of an overall completions request.
 * Generally, `n` choices are generated per provided prompt with a default value of 1.
 * Token limits and other settings may limit the number of choices generated.
 */
export interface ChoiceOutput {
  /** The generated text for a given completions prompt. */
  text: string;
  /** The ordered index associated with this completions choice. */
  index: number;
  /** The log probabilities model for tokens associated with this completions choice. */
  logprobs: CompletionsLogProbabilityModelOutput | null;
  /** Reason for finishing */
  finish_reason: string | null;
}

/** Representation of a log probabilities model for a completions generation. */
export interface CompletionsLogProbabilityModelOutput {
  /** The textual forms of tokens evaluated in this probability model. */
  tokens: string[];
  /** A collection of log probability values for the tokens in this completions data. */
  token_logprobs: (number | null)[];
  /** A mapping of tokens to maximum log probability values in this completions data. */
  top_logprobs: Record<string, number | null>[];
  /** The text offsets associated with tokens in this completions data. */
  text_offset: number[];
}

/**
 * Representation of the token counts processed for a completions request.
 * Counts consider all tokens across prompts, choices, choice alternates, best_of generations, and
 * other consumers.
 */
export interface CompletionsUsageOutput {
  /** The number of tokens generated across all completions emissions. */
  completion_tokens: number;
  /** The number of tokens in the provided prompts for the completions request. */
  prompt_tokens: number;
  /** The total number of tokens processed for the completions request and response. */
  total_tokens: number;
}

/** A single, role-attributed message within a chat completion interaction. */
export interface ChatMessageOutput {
  /**
   * The role associated with this message payload.
   *
   * Possible values: system, assistant, user
   */
  role: string;
  /** The text associated with this message payload. */
  content?: string;
}

/**
 * Representation of the response data from a chat completions request.
 * Completions support a wide variety of tasks and generate text that continues from or "completes"
 * provided prompt data.
 */
export interface ChatCompletionsOutput {
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
  choices: Array<ChatChoiceOutput>;
  /** Usage information for tokens processed and generated as part of this completions operation. */
  usage: CompletionsUsageOutput;
}

/**
 * The representation of a single prompt completion as part of an overall chat completions request.
 * Generally, `n` choices are generated per provided prompt with a default value of 1.
 * Token limits and other settings may limit the number of choices generated.
 */
export interface ChatChoiceOutput {
  /** The chat message for a given chat completions prompt. */
  message?: ChatMessageOutput;
  /** The ordered index associated with this chat completions choice. */
  index: number;
  /** The reason that this chat completions choice completed its generated. */
  finish_reason: string | null;
  /** The delta message content for a streaming response. */
  delta?: ChatMessageOutput;
}

/** A polling status update or final response payload for an image operation. */
export interface BatchImageGenerationOperationResponseOutput {
  /** The ID of the operation. */
  id: string;
  /** A timestamp when this job or item was created (in unix epochs). */
  created: number;
  /** A timestamp when this operation and its associated images expire and will be deleted (in unix epochs). */
  expires?: number;
  /** The result of the operation if the operation succeeded. */
  result?: ImageGenerationsOutput;
  /**
   * The status of the operation
   *
   * Possible values: notRunning, running, succeeded, canceled, failed
   */
  status: string;
  /** The error if the operation failed. */
  error?: ErrorModel;
}

/** The result of the operation if the operation succeeded. */
export interface ImageGenerationsOutput {
  /** A timestamp when this job or item was created (in unix epochs). */
  created: number;
  /** The images generated by the operator. */
  data: Array<ImageLocationOutput> | Array<ImagePayloadOutput>;
}

/** An image response item that provides a URL from which an image may be accessed. */
export interface ImageLocationOutput {
  /** The URL that provides temporary access to download the generated image. */
  url: string;
}

/** An image response item that directly represents the image data as a base64-encoded string. */
export interface ImagePayloadOutput {
  /** The complete data for an image represented as a base64-encoded string. */
  b64_json: string;
}

/** Represents the request data used to generate images. */
export interface ImageGenerationOptionsOutput {
  /** A description of the desired images. */
  prompt: string;
  /** The number of images to generate (defaults to 1). */
  n?: number;
  /**
   * The desired size of the generated images. Must be one of 256x256, 512x512, or 1024x1024 (defaults to 1024x1024).
   *
   * Possible values: 256x256, 512x512, 1024x1024
   */
  size?: string;
  /**
   *   The format in which image generation response items should be presented.
   *   Azure OpenAI only supports URL response items.
   *
   * Possible values: url, b64_json
   */
  response_format?: string;
  /** A unique identifier representing your end-user, which can help to monitor and detect abuse. */
  user?: string;
}
