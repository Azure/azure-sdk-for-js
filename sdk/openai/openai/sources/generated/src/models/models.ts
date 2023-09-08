// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ErrorModel } from "@azure-rest/core-client";
/** Defines the format of the output. */
/** "json", "verbose_json", "text", "srt", "vtt" */
export type AudioTranscriptionFormat = string;

/** Transcription response containing only the transcribed text. */
export interface AudioTranscriptionSimpleJson {
  /** Transcribed text. */
  text: string;
}

/** Transcription response. */
export interface AudioTranscriptionVerboseJson
  extends AudioTranscriptionSimpleJson {
  /** Audio transcription task. */
  task: AudioTranscriptionTask;
  /** Language detected in the source audio file. */
  language: string;
  /** Duration. */
  duration: string;
  /** Segments. */
  segments: AudioTranscriptionSegment[];
}

/** Audio transcription task type */
/** "transcribe", "translate" */
export type AudioTranscriptionTask = string;

/** Transcription segment. */
export interface AudioTranscriptionSegment {
  /** Segment identifier. */
  id: number;
  /** Segment start offset. */
  start: number;
  /** Segment end offset. */
  end: number;
  /** Segment text. */
  text: string;
  /** Temperature. */
  temperature: number;
  /** Average log probability. */
  averageLogProb: number;
  /** Compression ratio. */
  compressionRatio: number;
  /** Probability of 'no speech'. */
  noSpeechProb: number;
  /** Tokens in this segment */
  tokens: number[];
  /** TODO */
  seek: number;
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
  created: Date;
  /**
   * Content filtering results for zero or more prompts in the request. In a streaming request,
   * results for different prompts may arrive at different times or in different orders.
   */
  promptFilterResults?: PromptFilterResult[];
  /**
   * The collection of completions choices associated with this completions response.
   * Generally, `n` choices are generated per provided prompt with a default value of 1.
   * Token limits and other settings may limit the number of choices generated.
   */
  choices: Choice[];
  /** Usage information for tokens processed and generated as part of this completions operation. */
  usage: CompletionsUsage;
}

/** Content filtering results for a single prompt in the request. */
export interface PromptFilterResult {
  /** The index of this prompt in the set of prompt results */
  promptIndex: number;
  /** Content filtering results for this prompt */
  contentFilterResults?: ContentFilterResults;
}

/** Information about the content filtering category, if it has been detected. */
export interface ContentFilterResults {
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
  error?: ErrorModel;
}

/** Information about filtered content severity level and if it has been filtered or not. */
export interface ContentFilterResult {
  /** Ratings for the intensity and risk level of filtered content. */
  severity: ContentFilterSeverity;
  /** A value indicating whether or not the content has been filtered. */
  filtered: boolean;
}

/** Ratings for the intensity and risk level of harmful content. */
/** "safe", "low", "medium", "high" */
export type ContentFilterSeverity = string;

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
  /**
   * Information about the content filtering category (hate, sexual, violence, self_harm), if it
   * has been detected, as well as the severity level (very_low, low, medium, high-scale that
   * determines the intensity and risk level of harmful content) and if it has been filtered or not.
   */
  contentFilterResults?: ContentFilterResults;
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
/** "stop", "length", "content_filter", "function_call" */
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
  content: string | null;
  /**
   * The name of the author of this message. `name` is required if role is `function`, and it should be the name of the
   * function whose response is in the `content`. May contain a-z, A-Z, 0-9, and underscores, with a maximum length of
   * 64 characters.
   */
  name?: string;
  /** The name and arguments of a function that should be called, as generated by the model. */
  functionCall?: FunctionCall;
  /**
   *   Additional context data associated with a chat message when requesting chat completions using compatible Azure
   *   OpenAI chat extensions. This includes information like the intermediate data source retrievals used to service a
   *   request.
   *   This context information is only populated when using Azure OpenAI with chat extensions capabilities configured.
   */
  context?: AzureChatExtensionsMessageContext;
}

/** A description of the intended purpose of a message within a chat completions interaction. */
/** "system", "assistant", "user", "function", "tool" */
export type ChatRole = string;

/** The name and arguments of a function that should be called, as generated by the model. */
export interface FunctionCall {
  /** The name of the function to call. */
  name: string;
  /**
   * The arguments to call the function with, as generated by the model in JSON format.
   * Note that the model does not always generate valid JSON, and may hallucinate parameters
   * not defined by your function schema. Validate the arguments in your code before calling
   * your function.
   */
  arguments: string;
}

/**
 *   A representation of the additional context information available when Azure OpenAI chat extensions are involved
 *   in the generation of a corresponding chat completions response. This context information is only populated when
 *   using an Azure OpenAI request configured to use a matching extension.
 */
export interface AzureChatExtensionsMessageContext {
  /**
   *   The contextual message payload associated with the Azure chat extensions used for a chat completions request.
   *   These messages describe the data source retrievals, plugin invocations, and other intermediate steps taken in the
   *   course of generating a chat completions response that was augmented by capabilities from Azure OpenAI chat
   *   extensions.
   */
  messages?: ChatMessage[];
}

/** The definition of a caller-specified function that chat completions may invoke in response to matching user input. */
export interface FunctionDefinition {
  /** The name of the function to be called. */
  name: string;
  /**
   * A description of what the function does. The model will use this description when selecting the function and
   * interpreting its parameters.
   */
  description?: string;
  /** The parameters the functions accepts, described as a JSON Schema object. */
  parameters?: any;
}

/**
 * The collection of predefined behaviors for handling request-provided function information in a chat completions
 * operation.
 */
/** "auto", "none" */
export type FunctionCallPreset = string;

/**
 * A structure that specifies the exact name of a specific, request-provided function to use when processing a chat
 * completions operation.
 */
export interface FunctionName {
  /** The name of the function to call. */
  name: string;
}

/**
 *   A representation of configuration data for a single Azure OpenAI chat extension. This will be used by a chat
 *   completions request that should use Azure OpenAI chat extensions to augment the response behavior.
 *   The use of this configuration is compatible only with Azure OpenAI.
 */
export interface AzureChatExtensionConfiguration {
  /**
   *   The label for the type of an Azure chat extension. This typically corresponds to a matching Azure resource.
   *   Azure chat extensions are only compatible with Azure OpenAI.
   */
  type: AzureChatExtensionType;
  /**
   *   The configuration payload used for the Azure chat extension. The structure payload details are specific to the
   *   extension being configured.
   *   Azure chat extensions are only compatible with Azure OpenAI.
   */
  parameters: any;
}

/**
 *   A representation of configuration data for a single Azure OpenAI chat extension. This will be used by a chat
 *   completions request that should use Azure OpenAI chat extensions to augment the response behavior.
 *   The use of this configuration is compatible only with Azure OpenAI.
 */
/** "AzureCognitiveSearch" */
export type AzureChatExtensionType = string;

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
  /**
   * Information about the content filtering category (hate, sexual, violence, self_harm), if it
   * has been detected, as well as the severity level (very_low, low, medium, high-scale that
   * determines the intensity and risk level of harmful content) and if it has been filtered or not.
   */
  contentFilterResults?: ContentFilterResults;
}

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

/** A polling status update or final response payload for an image operation. */
export interface BatchImageGenerationOperationResponse {
  /** The ID of the operation. */
  id: string;
  /** A timestamp when this job or item was created (in unix epochs). */
  created: Date;
  /** A timestamp when this operation and its associated images expire and will be deleted (in unix epochs). */
  expires?: number;
  /** The result of the operation if the operation succeeded. */
  result?: ImageGenerations;
  /** The status of the operation */
  status: AzureOpenAIOperationState;
  /** The error if the operation failed. */
  error?: ErrorModel;
}

/** The result of the operation if the operation succeeded. */
export interface ImageGenerations {
  /** A timestamp when this job or item was created (in unix epochs). */
  created: Date;
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
