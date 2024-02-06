// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ErrorModel } from "@azure-rest/core-client";

/** A specific deployment */
export interface DeploymentOutput {
  /** Specifies either the model deployment name (when using Azure OpenAI) or model name (when using non-Azure OpenAI) to use for this request. */
  readonly deploymentId: string;
}

/** Result information for an operation that transcribed spoken audio into written text. */
export interface AudioTranscriptionOutput {
  /** The transcribed text for the provided audio data. */
  text: string;
  /**
   * The label that describes which operation type generated the accompanying response data.
   *
   * Possible values: transcribe, translate
   */
  task?: string;
  /**
   * The spoken language that was detected in the transcribed audio data.
   * This is expressed as a two-letter ISO-639-1 language code like 'en' or 'fr'.
   */
  language?: string;
  /** The total duration of the audio processed to produce accompanying transcription information. */
  duration?: number;
  /** A collection of information about the timing, probabilities, and other detail of each processed audio segment. */
  segments?: Array<AudioTranscriptionSegmentOutput>;
}

/**
 * Extended information about a single segment of transcribed audio data.
 * Segments generally represent roughly 5-10 seconds of speech. Segment boundaries typically occur between words but not
 * necessarily sentences.
 */
export interface AudioTranscriptionSegmentOutput {
  /** The 0-based index of this segment within a transcription. */
  id: number;
  /** The time at which this segment started relative to the beginning of the transcribed audio. */
  start: number;
  /** The time at which this segment ended relative to the beginning of the transcribed audio. */
  end: number;
  /** The transcribed text that was part of this audio segment. */
  text: string;
  /** The temperature score associated with this audio segment. */
  temperature: number;
  /** The average log probability associated with this audio segment. */
  avg_logprob: number;
  /** The compression ratio of this audio segment. */
  compression_ratio: number;
  /** The probability of no speech detection within this audio segment. */
  no_speech_prob: number;
  /** The token IDs matching the transcribed text in this audio segment. */
  tokens: number[];
  /**
   * The seek position associated with the processing of this audio segment.
   * Seek positions are expressed as hundredths of seconds.
   * The model may process several segments from a single seek position, so while the seek position will never represent
   * a later time than the segment's start, the segment's start may represent a significantly later time than the
   * segment's associated seek position.
   */
  seek: number;
}

/** Result information for an operation that translated spoken audio into written text. */
export interface AudioTranslationOutput {
  /** The translated text for the provided audio data. */
  text: string;
  /**
   * The label that describes which operation type generated the accompanying response data.
   *
   * Possible values: transcribe, translate
   */
  task?: string;
  /**
   * The spoken language that was detected in the translated audio data.
   * This is expressed as a two-letter ISO-639-1 language code like 'en' or 'fr'.
   */
  language?: string;
  /** The total duration of the audio processed to produce accompanying translation information. */
  duration?: number;
  /** A collection of information about the timing, probabilities, and other detail of each processed audio segment. */
  segments?: Array<AudioTranslationSegmentOutput>;
}

/**
 * Extended information about a single segment of translated audio data.
 * Segments generally represent roughly 5-10 seconds of speech. Segment boundaries typically occur between words but not
 * necessarily sentences.
 */
export interface AudioTranslationSegmentOutput {
  /** The 0-based index of this segment within a translation. */
  id: number;
  /** The time at which this segment started relative to the beginning of the translated audio. */
  start: number;
  /** The time at which this segment ended relative to the beginning of the translated audio. */
  end: number;
  /** The translated text that was part of this audio segment. */
  text: string;
  /** The temperature score associated with this audio segment. */
  temperature: number;
  /** The average log probability associated with this audio segment. */
  avg_logprob: number;
  /** The compression ratio of this audio segment. */
  compression_ratio: number;
  /** The probability of no speech detection within this audio segment. */
  no_speech_prob: number;
  /** The token IDs matching the translated text in this audio segment. */
  tokens: number[];
  /**
   * The seek position associated with the processing of this audio segment.
   * Seek positions are expressed as hundredths of seconds.
   * The model may process several segments from a single seek position, so while the seek position will never represent
   * a later time than the segment's start, the segment's start may represent a significantly later time than the
   * segment's associated seek position.
   */
  seek: number;
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
   * Content filtering results for zero or more prompts in the request. In a streaming request,
   * results for different prompts may arrive at different times or in different orders.
   */
  prompt_filter_results?: Array<PromptFilterResultOutput>;
  /**
   * The collection of completions choices associated with this completions response.
   * Generally, `n` choices are generated per provided prompt with a default value of 1.
   * Token limits and other settings may limit the number of choices generated.
   */
  choices: Array<ChoiceOutput>;
  /** Usage information for tokens processed and generated as part of this completions operation. */
  usage: CompletionsUsageOutput;
}

/** Content filtering results for a single prompt in the request. */
export interface PromptFilterResultOutput {
  /** The index of this prompt in the set of prompt results */
  prompt_index: number;
  /** Content filtering results for this prompt */
  content_filter_results?: ContentFilterResultsOutput;
}

/** Information about the content filtering category, if it has been detected. */
export interface ContentFilterResultsOutput {
  /**
   * Describes language related to anatomical organs and genitals, romantic relationships,
   *  acts portrayed in erotic or affectionate terms, physical sexual acts, including
   *  those portrayed as an assault or a forced sexual violent act against one’s will,
   *  prostitution, pornography, and abuse.
   */
  sexual?: ContentFilterResultOutput;
  /**
   * Describes language related to physical actions intended to hurt, injure, damage, or
   * kill someone or something; describes weapons, etc.
   */
  violence?: ContentFilterResultOutput;
  /**
   * Describes language attacks or uses that include pejorative or discriminatory language
   * with reference to a person or identity group on the basis of certain differentiating
   * attributes of these groups including but not limited to race, ethnicity, nationality,
   * gender identity and expression, sexual orientation, religion, immigration status, ability
   * status, personal appearance, and body size.
   */
  hate?: ContentFilterResultOutput;
  /**
   * Describes language related to physical actions intended to purposely hurt, injure,
   * or damage one’s body, or kill oneself.
   */
  self_harm?: ContentFilterResultOutput;
  /**
   * Describes an error returned if the content filtering system is
   * down or otherwise unable to complete the operation in time.
   */
  error?: ErrorModel;
}

/** Information about filtered content severity level and if it has been filtered or not. */
export interface ContentFilterResultOutput {
  /**
   * Ratings for the intensity and risk level of filtered content.
   *
   * Possible values: safe, low, medium, high
   */
  severity: string;
  /** A value indicating whether or not the content has been filtered. */
  filtered: boolean;
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
  /**
   * Information about the content filtering category (hate, sexual, violence, self_harm), if it
   * has been detected, as well as the severity level (very_low, low, medium, high-scale that
   * determines the intensity and risk level of harmful content) and if it has been filtered or not.
   */
  content_filter_results?: ContentFilterResultsOutput;
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
   * Possible values: system, assistant, user, function, tool
   */
  role: string;
  /** The text associated with this message payload. */
  content: string | null;
  /**
   * The name of the author of this message. `name` is required if role is `function`, and it should be the name of the
   * function whose response is in the `content`. May contain a-z, A-Z, 0-9, and underscores, with a maximum length of
   * 64 characters.
   */
  name?: string;
  /** The name and arguments of a function that should be called, as generated by the model. */
  function_call?: FunctionCallOutput;
  /**
   *   Additional context data associated with a chat message when requesting chat completions using compatible Azure
   *   OpenAI chat extensions. This includes information like the intermediate data source retrievals used to service a
   *   request.
   *   This context information is only populated when using Azure OpenAI with chat extensions capabilities configured.
   */
  context?: AzureChatExtensionsMessageContextOutput;
}

/** The name and arguments of a function that should be called, as generated by the model. */
export interface FunctionCallOutput {
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
export interface AzureChatExtensionsMessageContextOutput {
  /**
   *   The contextual message payload associated with the Azure chat extensions used for a chat completions request.
   *   These messages describe the data source retrievals, plugin invocations, and other intermediate steps taken in the
   *   course of generating a chat completions response that was augmented by capabilities from Azure OpenAI chat
   *   extensions.
   */
  messages?: Array<ChatMessageOutput>;
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
  /**
   * Content filtering results for zero or more prompts in the request. In a streaming request,
   * results for different prompts may arrive at different times or in different orders.
   */
  prompt_filter_results?: Array<PromptFilterResultOutput>;
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
  /**
   * Information about the content filtering category (hate, sexual, violence, self_harm), if it
   * has been detected, as well as the severity level (very_low, low, medium, high-scale that
   * determines the intensity and risk level of harmful content) and if it has been filtered or not.
   */
  content_filter_results?: ContentFilterResultsOutput;
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
