// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure-rest/core-client";
import {
  UnknownParams,
  ChatCompletionsResponseFormat,
  ChatCompletionsToolDefinitionUnion,
  ChatCompletionsToolSelectionPreset,
  ChatCompletionsNamedToolSelectionUnion,
} from "./models.js";

export interface CompleteOptionalParams extends OperationOptions {
  /**
   * Controls what happens if unknown parameters are passed in the JSON request payload.
   * This sets the HTTP request header `unknown-parameters`.
   */
  unknownParams?: UnknownParams;
  /**
   * A value that influences the probability of generated tokens appearing based on their cumulative
   * frequency in generated text.
   * Positive values will make tokens less likely to appear as their frequency increases and
   * decrease the likelihood of the model repeating the same statements verbatim.
   */
  frequencyPenalty?: number;
  /** A value indicating whether chat completions should be streamed for this request. */
  stream?: boolean;
  /**
   * A value that influences the probability of generated tokens appearing based on their existing
   * presence in generated text.
   * Positive values will make tokens less likely to appear when they already exist and increase the
   * model's likelihood to output new topics.
   */
  presencePenalty?: number;
  /**
   * The sampling temperature to use that controls the apparent creativity of generated completions.
   * Higher values will make output more random while lower values will make results more focused
   * and deterministic.
   * It is not recommended to modify temperature and top_p for the same completions request as the
   * interaction of these two settings is difficult to predict.
   */
  temperature?: number;
  /**
   * An alternative to sampling with temperature called nucleus sampling. This value causes the
   * model to consider the results of tokens with the provided probability mass. As an example, a
   * value of 0.15 will cause only the tokens comprising the top 15% of probability mass to be
   * considered.
   * It is not recommended to modify temperature and top_p for the same completions request as the
   * interaction of these two settings is difficult to predict.
   */
  topP?: number;
  /** The maximum number of tokens to generate. */
  maxTokens?: number;
  /** An object specifying the format that the model must output. Used to enable JSON mode. */
  responseFormat?: ChatCompletionsResponseFormat;
  /** A collection of textual sequences that will end completions generation. */
  stop?: string[];
  /** The available tool definitions that the chat completions request can use, including caller-defined functions. */
  tools?: ChatCompletionsToolDefinitionUnion[];
  /** If specified, the model will configure which of the provided tools it can use for the chat completions response. */
  toolChoice?:
    | ChatCompletionsToolSelectionPreset
    | ChatCompletionsNamedToolSelectionUnion;
  /**
   * If specified, the system will make a best effort to sample deterministically such that repeated requests with the
   * same seed and parameters should return the same result. Determinism is not guaranteed."
   */
  seed?: number;
}

export interface GetModelInfoOptionalParams extends OperationOptions {}
