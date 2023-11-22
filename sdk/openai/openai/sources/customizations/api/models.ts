// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ErrorModel, OperationOptions } from "@azure-rest/core-client";
import {
  ContentFilterResult,
  FunctionCallPreset,
  FunctionName,
} from "../../generated/src/models/models.js";
import { AzureChatExtensionConfiguration, FunctionDefinition } from "../models/models.js";

/**
 * This module contains models that we want to live side-by-side with the
 * corresponding generated models. This is useful for providing customer-facing
 * models that has different names/types than the generated models.
 */

export interface GetChatCompletionsOptions extends OperationOptions {
  /** A list of functions the model may generate JSON inputs for. */
  functions?: FunctionDefinition[];
  /**
   * Controls how the model responds to function calls. "none" means the model does not call a function,
   * and responds to the end-user. "auto" means the model can pick between an end-user or calling a function.
   *  Specifying a particular function via `{"name": "my_function"}` forces the model to call that function.
   *  "none" is the default when no functions are present. "auto" is the default if functions are present.
   */
  functionCall?: FunctionCallPreset | FunctionName;
  /** The maximum number of tokens to generate. */
  maxTokens?: number;
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
  /**
   * A map between GPT token IDs and bias scores that influences the probability of specific tokens
   * appearing in a completions response. Token IDs are computed via external tokenizer tools, while
   * bias scores reside in the range of -100 to 100 with minimum and maximum values corresponding to
   * a full ban or exclusive selection of a token, respectively. The exact behavior of a given bias
   * score varies by model.
   */
  logitBias?: Record<string, number>;
  /**
   * An identifier for the caller or end user of the operation. This may be used for tracking
   * or rate-limiting purposes.
   */
  user?: string;
  /**
   * The number of chat completions choices that should be generated for a chat completions
   * response.
   * Because this setting can generate many completions, it may quickly consume your token quota.
   * Use carefully and ensure reasonable settings for max_tokens and stop.
   */
  n?: number;
  /** A collection of textual sequences that will end completions generation. */
  stop?: string[];
  /**
   * A value that influences the probability of generated tokens appearing based on their existing
   * presence in generated text.
   * Positive values will make tokens less likely to appear when they already exist and increase the
   * model's likelihood to output new topics.
   */
  presencePenalty?: number;
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
   * The model name to provide as part of this completions request.
   * Not applicable to Azure OpenAI, where deployment information should be included in the Azure
   * resource URI that's connected to.
   */
  model?: string;
  /**
   *   The configuration entries for Azure OpenAI chat extensions that use them.
   *   This additional specification is only compatible with Azure OpenAI.
   */
  azureExtensionOptions?: AzureExtensionsOptions;
}

/**
 * Options for Azure OpenAI chat extensions.
 */
export interface AzureExtensionsOptions {
  /**
   *   The configuration entries for Azure OpenAI chat extensions that use them.
   *   This additional specification is only compatible with Azure OpenAI.
   */
  extensions?: AzureChatExtensionConfiguration[];
}

/** Information about the content filtering category, if it has been detected. */
export type ContentFilterResults = ContentFilterSuccessResults | ContentFilterErrorResults;

/** Information about the content filtering success result. */
export interface ContentFilterSuccessResults {
  /**
   * Describes language related to anatomical organs and genitals, romantic relationships,
   *  acts portrayed in erotic or affectionate terms, physical sexual acts, including
   *  those portrayed as an assault or a forced sexual violent act against one’s will,
   *  prostitution, pornography, and abuse.
   */
  sexual?: ContentFilterResult;
  /**
   * Describes language related to physical actions intended to hurt, injure, damage, or
   * kill someone or something; describes weapons, etc.
   */
  violence?: ContentFilterResult;
  /**
   * Describes language attacks or uses that include pejorative or discriminatory language
   * with reference to a person or identity group on the basis of certain differentiating
   * attributes of these groups including but not limited to race, ethnicity, nationality,
   * gender identity and expression, sexual orientation, religion, immigration status, ability
   * status, personal appearance, and body size.
   */
  hate?: ContentFilterResult;
  /**
   * Describes language related to physical actions intended to purposely hurt, injure,
   * or damage one’s body, or kill oneself.
   */
  selfHarm?: ContentFilterResult;
  /**
   * Describes an error returned if the content filtering system is
   * down or otherwise unable to complete the operation in time.
   */
  error?: undefined;
}

/** Information about the content filtering error result. */
export interface ContentFilterErrorResults {
  /**
   * Describes an error returned if the content filtering system is
   * down or otherwise unable to complete the operation in time.
   */
  error: ErrorModel;
}

/**
 * Represents a stream that could potentially be created multiple times. It also provides the length of the stream, if known, and the name of the source of the stream, typically the file name.
 */
export interface StreamProducer {
  /**
   * A function that generates an identical stream each time it is invoked. It is useful when the request needs to be retried and the same stream needs to be resent again.
   * @returns A promise that resolves to a NodeJS.ReadableStream or ReadableStream<Uint8Array>.
   */
  stream(): Promise<NodeJS.ReadableStream | ReadableStream<Uint8Array>>;

  /**
   * The length of the stream in bytes, if known.
   */
  length?: number;

  /**
   * The name of the source of the stream, typically the file name.
   */
  name?: string;
}
