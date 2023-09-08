// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** This format will return an JSON structure containing a single "text" with the transcription. */
export interface AudioTranscriptionOptionsSimpleJson {
  /** The audio file object to transcribe. */
  file: string;
  /** An optional text to guide the model's style or continue a previous audio segment. The prompt should match the audio language. */
  prompt?: string;
  /**
   * The sampling temperature, between 0 and 1.
   * Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
   * If set to 0, the model will use log probability to automatically increase the temperature until certain thresholds are hit.
   */
  temperature?: number;
  /**
   * The model name to provide as part of this transcription request.
   * Not applicable to Azure OpenAI, where deployment information should be included in the Azure
   * resource URI that's connected to.
   */
  model?: string;
  /** The language of the input audio. Supplying the input language in ISO-639-1 format will improve accuracy and latency. */
  language?: string;
  /**
   * The format of the transcription output, in one of these options: json, text, srt, verbose_json, or vtt.
   *
   * Possible values: json, verbose_json, text, srt, vtt
   */
  response_format?: string;
}

/** This format will return an JSON structure containing an enriched structure with the transcription. */
export interface AudioTranscriptionOptionsVerboseJson {
  /** The audio file object to transcribe. */
  file: string;
  /** An optional text to guide the model's style or continue a previous audio segment. The prompt should match the audio language. */
  prompt?: string;
  /**
   * The sampling temperature, between 0 and 1.
   * Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
   * If set to 0, the model will use log probability to automatically increase the temperature until certain thresholds are hit.
   */
  temperature?: number;
  /**
   * The model name to provide as part of this transcription request.
   * Not applicable to Azure OpenAI, where deployment information should be included in the Azure
   * resource URI that's connected to.
   */
  model?: string;
  /** The language of the input audio. Supplying the input language in ISO-639-1 format will improve accuracy and latency. */
  language?: string;
  /**
   * The format of the transcription output, in one of these options: json, text, srt, verbose_json, or vtt.
   *
   * Possible values: json, verbose_json, text, srt, vtt
   */
  response_format?: string;
}

/** This will make the response return the transcription as plain/text. */
export interface AudioTranscriptionOptionsPlainText {
  /** The audio file object to transcribe. */
  file: string;
  /** An optional text to guide the model's style or continue a previous audio segment. The prompt should match the audio language. */
  prompt?: string;
  /**
   * The sampling temperature, between 0 and 1.
   * Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
   * If set to 0, the model will use log probability to automatically increase the temperature until certain thresholds are hit.
   */
  temperature?: number;
  /**
   * The model name to provide as part of this transcription request.
   * Not applicable to Azure OpenAI, where deployment information should be included in the Azure
   * resource URI that's connected to.
   */
  model?: string;
  /** The language of the input audio. Supplying the input language in ISO-639-1 format will improve accuracy and latency. */
  language?: string;
  /**
   * The format of the transcription output, in one of these options: json, text, srt, verbose_json, or vtt.
   *
   * Possible values: json, verbose_json, text, srt, vtt
   */
  response_format?: string;
}

/** The transcription will be provided in SRT format (SubRip Text) in the form of plain/text. */
export interface AudioTranscriptionOptionsSrt {
  /** The audio file object to transcribe. */
  file: string;
  /** An optional text to guide the model's style or continue a previous audio segment. The prompt should match the audio language. */
  prompt?: string;
  /**
   * The sampling temperature, between 0 and 1.
   * Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
   * If set to 0, the model will use log probability to automatically increase the temperature until certain thresholds are hit.
   */
  temperature?: number;
  /**
   * The model name to provide as part of this transcription request.
   * Not applicable to Azure OpenAI, where deployment information should be included in the Azure
   * resource URI that's connected to.
   */
  model?: string;
  /** The language of the input audio. Supplying the input language in ISO-639-1 format will improve accuracy and latency. */
  language?: string;
  /**
   * The format of the transcription output, in one of these options: json, text, srt, verbose_json, or vtt.
   *
   * Possible values: json, verbose_json, text, srt, vtt
   */
  response_format?: string;
}

/** The transcription will be provided in VTT format (Web Video Text Tracks) in the form of plain/text. */
export interface AudioTranscriptionOptionsVtt {
  /** The audio file object to transcribe. */
  file: string;
  /** An optional text to guide the model's style or continue a previous audio segment. The prompt should match the audio language. */
  prompt?: string;
  /**
   * The sampling temperature, between 0 and 1.
   * Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
   * If set to 0, the model will use log probability to automatically increase the temperature until certain thresholds are hit.
   */
  temperature?: number;
  /**
   * The model name to provide as part of this transcription request.
   * Not applicable to Azure OpenAI, where deployment information should be included in the Azure
   * resource URI that's connected to.
   */
  model?: string;
  /** The language of the input audio. Supplying the input language in ISO-639-1 format will improve accuracy and latency. */
  language?: string;
  /**
   * The format of the transcription output, in one of these options: json, text, srt, verbose_json, or vtt.
   *
   * Possible values: json, verbose_json, text, srt, vtt
   */
  response_format?: string;
}

/** This format will return an JSON structure containing a single "text" with the translation. */
export interface AudioTranslationOptionsSimpleJson {
  /** The audio file object to transcribe. */
  file: string;
  /** An optional text to guide the model's style or continue a previous audio segment. The prompt should match the audio language. */
  prompt?: string;
  /**
   * The sampling temperature, between 0 and 1.
   * Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
   * If set to 0, the model will use log probability to automatically increase the temperature until certain thresholds are hit.
   */
  temperature?: number;
  /**
   * The model name to provide as part of this transcription request.
   * Not applicable to Azure OpenAI, where deployment information should be included in the Azure
   * resource URI that's connected to.
   */
  model?: string;
  /**
   * The format of the transcription output, in one of these options: json, text, srt, verbose_json, or vtt.
   *
   * Possible values: json, verbose_json, text, srt, vtt
   */
  response_format?: string;
}

/** This format will return an JSON structure containing an enriched structure with the translation. */
export interface AudioTranslationOptionsVerboseJson {
  /** The audio file object to transcribe. */
  file: string;
  /** An optional text to guide the model's style or continue a previous audio segment. The prompt should match the audio language. */
  prompt?: string;
  /**
   * The sampling temperature, between 0 and 1.
   * Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
   * If set to 0, the model will use log probability to automatically increase the temperature until certain thresholds are hit.
   */
  temperature?: number;
  /**
   * The model name to provide as part of this transcription request.
   * Not applicable to Azure OpenAI, where deployment information should be included in the Azure
   * resource URI that's connected to.
   */
  model?: string;
  /**
   * The format of the transcription output, in one of these options: json, text, srt, verbose_json, or vtt.
   *
   * Possible values: json, verbose_json, text, srt, vtt
   */
  response_format?: string;
}

/** This will make the response return the translation as plain/text. */
export interface AudioTranslationOptionsPlainText {
  /** The audio file object to transcribe. */
  file: string;
  /** An optional text to guide the model's style or continue a previous audio segment. The prompt should match the audio language. */
  prompt?: string;
  /**
   * The sampling temperature, between 0 and 1.
   * Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
   * If set to 0, the model will use log probability to automatically increase the temperature until certain thresholds are hit.
   */
  temperature?: number;
  /**
   * The model name to provide as part of this transcription request.
   * Not applicable to Azure OpenAI, where deployment information should be included in the Azure
   * resource URI that's connected to.
   */
  model?: string;
  /**
   * The format of the transcription output, in one of these options: json, text, srt, verbose_json, or vtt.
   *
   * Possible values: json, verbose_json, text, srt, vtt
   */
  response_format?: string;
}

/** The translation will be provided in SRT format (SubRip Text) in the form of plain/text. */
export interface AudioTranslationOptionsSrt {
  /** The audio file object to transcribe. */
  file: string;
  /** An optional text to guide the model's style or continue a previous audio segment. The prompt should match the audio language. */
  prompt?: string;
  /**
   * The sampling temperature, between 0 and 1.
   * Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
   * If set to 0, the model will use log probability to automatically increase the temperature until certain thresholds are hit.
   */
  temperature?: number;
  /**
   * The model name to provide as part of this transcription request.
   * Not applicable to Azure OpenAI, where deployment information should be included in the Azure
   * resource URI that's connected to.
   */
  model?: string;
  /**
   * The format of the transcription output, in one of these options: json, text, srt, verbose_json, or vtt.
   *
   * Possible values: json, verbose_json, text, srt, vtt
   */
  response_format?: string;
}

/** The translation will be provided in VTT format (Web Video Text Tracks) in the form of plain/text. */
export interface AudioTranslationOptionsVtt {
  /** The audio file object to transcribe. */
  file: string;
  /** An optional text to guide the model's style or continue a previous audio segment. The prompt should match the audio language. */
  prompt?: string;
  /**
   * The sampling temperature, between 0 and 1.
   * Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
   * If set to 0, the model will use log probability to automatically increase the temperature until certain thresholds are hit.
   */
  temperature?: number;
  /**
   * The model name to provide as part of this transcription request.
   * Not applicable to Azure OpenAI, where deployment information should be included in the Azure
   * resource URI that's connected to.
   */
  model?: string;
  /**
   * The format of the transcription output, in one of these options: json, text, srt, verbose_json, or vtt.
   *
   * Possible values: json, verbose_json, text, srt, vtt
   */
  response_format?: string;
}

/**
 * The configuration information for a completions request.
 * Completions support a wide variety of tasks and generate text that continues from or "completes"
 * provided prompt data.
 */
export interface CompletionsOptions {
  /** The prompts to generate completions from. */
  prompt: string[];
  /** The maximum number of tokens to generate. */
  max_tokens?: number;
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
  top_p?: number;
  /**
   * A map between GPT token IDs and bias scores that influences the probability of specific tokens
   * appearing in a completions response. Token IDs are computed via external tokenizer tools, while
   * bias scores reside in the range of -100 to 100 with minimum and maximum values corresponding to
   * a full ban or exclusive selection of a token, respectively. The exact behavior of a given bias
   * score varies by model.
   */
  logit_bias?: Record<string, number>;
  /**
   * An identifier for the caller or end user of the operation. This may be used for tracking
   * or rate-limiting purposes.
   */
  user?: string;
  /**
   * The number of completions choices that should be generated per provided prompt as part of an
   * overall completions response.
   * Because this setting can generate many completions, it may quickly consume your token quota.
   * Use carefully and ensure reasonable settings for max_tokens and stop.
   */
  n?: number;
  /**
   * A value that controls the emission of log probabilities for the provided number of most likely
   * tokens within a completions response.
   */
  logprobs?: number;
  /**
   * A value specifying whether completions responses should include input prompts as prefixes to
   * their generated output.
   */
  echo?: boolean;
  /** A collection of textual sequences that will end completions generation. */
  stop?: string[];
  /**
   * A value that influences the probability of generated tokens appearing based on their existing
   * presence in generated text.
   * Positive values will make tokens less likely to appear when they already exist and increase the
   * model's likelihood to output new topics.
   */
  presence_penalty?: number;
  /**
   * A value that influences the probability of generated tokens appearing based on their cumulative
   * frequency in generated text.
   * Positive values will make tokens less likely to appear as their frequency increases and
   * decrease the likelihood of the model repeating the same statements verbatim.
   */
  frequency_penalty?: number;
  /**
   * A value that controls how many completions will be internally generated prior to response
   * formulation.
   * When used together with n, best_of controls the number of candidate completions and must be
   * greater than n.
   * Because this setting can generate many completions, it may quickly consume your token quota.
   * Use carefully and ensure reasonable settings for max_tokens and stop.
   */
  best_of?: number;
  /** A value indicating whether chat completions should be streamed for this request. */
  stream?: boolean;
  /**
   * The model name to provide as part of this completions request.
   * Not applicable to Azure OpenAI, where deployment information should be included in the Azure
   * resource URI that's connected to.
   */
  model?: string;
}

/**
 * The configuration information for a chat completions request.
 * Completions support a wide variety of tasks and generate text that continues from or "completes"
 * provided prompt data.
 */
export interface ChatCompletionsOptions {
  /**
   * The collection of context messages associated with this chat completions request.
   * Typical usage begins with a chat message for the System role that provides instructions for
   * the behavior of the assistant, followed by alternating messages between the User and
   * Assistant roles.
   */
  messages: Array<ChatMessage>;
  /** A list of functions the model may generate JSON inputs for. */
  functions?: Array<FunctionDefinition>;
  /**
   * Controls how the model responds to function calls. "none" means the model does not call a function,
   * and responds to the end-user. "auto" means the model can pick between an end-user or calling a function.
   *  Specifying a particular function via `{"name": "my_function"}` forces the model to call that function.
   *  "none" is the default when no functions are present. "auto" is the default if functions are present.
   */
  function_call?: string | FunctionName;
  /** The maximum number of tokens to generate. */
  max_tokens?: number;
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
  top_p?: number;
  /**
   * A map between GPT token IDs and bias scores that influences the probability of specific tokens
   * appearing in a completions response. Token IDs are computed via external tokenizer tools, while
   * bias scores reside in the range of -100 to 100 with minimum and maximum values corresponding to
   * a full ban or exclusive selection of a token, respectively. The exact behavior of a given bias
   * score varies by model.
   */
  logit_bias?: Record<string, number>;
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
  presence_penalty?: number;
  /**
   * A value that influences the probability of generated tokens appearing based on their cumulative
   * frequency in generated text.
   * Positive values will make tokens less likely to appear as their frequency increases and
   * decrease the likelihood of the model repeating the same statements verbatim.
   */
  frequency_penalty?: number;
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
  dataSources?: Array<AzureChatExtensionConfiguration>;
}

/** A single, role-attributed message within a chat completion interaction. */
export interface ChatMessage {
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
  function_call?: FunctionCall;
  /**
   *   Additional context data associated with a chat message when requesting chat completions using compatible Azure
   *   OpenAI chat extensions. This includes information like the intermediate data source retrievals used to service a
   *   request.
   *   This context information is only populated when using Azure OpenAI with chat extensions capabilities configured.
   */
  context?: AzureChatExtensionsMessageContext;
}

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
  messages?: Array<ChatMessage>;
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
  parameters?: unknown;
}

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
   *
   * Possible values: AzureCognitiveSearch
   */
  type: string;
  /**
   *   The configuration payload used for the Azure chat extension. The structure payload details are specific to the
   *   extension being configured.
   *   Azure chat extensions are only compatible with Azure OpenAI.
   */
  parameters: unknown;
}

/**
 * The configuration information for an embeddings request.
 * Embeddings measure the relatedness of text strings and are commonly used for search, clustering,
 * recommendations, and other similar scenarios.
 */
export interface EmbeddingsOptions {
  /**
   * An identifier for the caller or end user of the operation. This may be used for tracking
   * or rate-limiting purposes.
   */
  user?: string;
  /**
   * The model name to provide as part of this embeddings request.
   * Not applicable to Azure OpenAI, where deployment information should be included in the Azure
   * resource URI that's connected to.
   */
  model?: string;
  /**
   * Input texts to get embeddings for, encoded as a an array of strings.
   * Each input must not exceed 2048 tokens in length.
   *
   * Unless you are embedding code, we suggest replacing newlines (\n) in your input with a single space,
   * as we have observed inferior results when newlines are present.
   */
  input: string[];
}

/** Represents the request data used to generate images. */
export interface ImageGenerationOptions {
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
