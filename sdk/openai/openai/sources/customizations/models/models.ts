// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BatchImageGenerationOperationResponse,
  ChatChoice,
  CompletionsUsage,
  PromptFilterResult,
} from "../../generated/src/models/models.js";

/** Convenience alias for BatchImageGenerationOperationResponse */
export type ImageGenerationResponse = BatchImageGenerationOperationResponse;

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
  created: Date;
  /**
   * The collection of completions choices associated with this completions response.
   * Generally, `n` choices are generated per provided prompt with a default value of 1.
   * Token limits and other settings may limit the number of choices generated.
   */
  choices: ChatChoice[];
  /**
   * Content filtering results for zero or more prompts in the request. In a streaming request,
   * results for different prompts may arrive at different times or in different orders.
   */
  promptFilterResults?: PromptFilterResult[];
  /** Usage information for tokens processed and generated as part of this completions operation. */
  usage?: CompletionsUsage;
}
