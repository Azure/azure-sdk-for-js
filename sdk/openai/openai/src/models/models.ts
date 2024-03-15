// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ErrorModel } from "@azure-rest/core-client";

/** The configuration information for an audio transcription request. */
export interface AudioTranscriptionOptions {
  /**
   * The audio data to transcribe. This must be the binary content of a file in one of the supported media formats:
   *  flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, webm.
   */
  file: Uint8Array;
  /** The optional filename or descriptive identifier to associate with with the audio data. */
  filename?: string;
  /** The requested format of the transcription response data, which will influence the content and detail of the result. */
  responseFormat?: AudioTranscriptionFormat;
  /**
   * The primary spoken language of the audio data to be transcribed, supplied as a two-letter ISO-639-1 language code
   * such as 'en' or 'fr'.
   * Providing this known input language is optional but may improve the accuracy and/or latency of transcription.
   */
  language?: string;
  /**
   * An optional hint to guide the model's style or continue from a prior audio segment. The written language of the
   * prompt should match the primary spoken language of the audio data.
   */
  prompt?: string;
  /**
   * The sampling temperature, between 0 and 1.
   * Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
   * If set to 0, the model will use log probability to automatically increase the temperature until certain thresholds are hit.
   */
  temperature?: number;
  /** The model to use for this transcription request. */
  model?: string;
}

/** Defines available options for the underlying response format of output transcription information. */
/** "json", "verbose_json", "text", "srt", "vtt" */
export type AudioTranscriptionFormat = string;

/** Result information for an operation that transcribed spoken audio into written text. */
export interface AudioTranscription {
  /** The transcribed text for the provided audio data. */
  text: string;
  /** The label that describes which operation type generated the accompanying response data. */
  task?: AudioTaskLabel;
  /**
   * The spoken language that was detected in the transcribed audio data.
   * This is expressed as a two-letter ISO-639-1 language code like 'en' or 'fr'.
   */
  language?: string;
  /** The total duration of the audio processed to produce accompanying transcription information. */
  duration?: number;
  /** A collection of information about the timing, probabilities, and other detail of each processed audio segment. */
  segments?: AudioTranscriptionSegment[];
}

/** Defines the possible descriptors for available audio operation responses. */
/** "transcribe", "translate" */
export type AudioTaskLabel = string;

/**
 * Extended information about a single segment of transcribed audio data.
 * Segments generally represent roughly 5-10 seconds of speech. Segment boundaries typically occur between words but not
 * necessarily sentences.
 */
export interface AudioTranscriptionSegment {
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
  avgLogprob: number;
  /** The compression ratio of this audio segment. */
  compressionRatio: number;
  /** The probability of no speech detection within this audio segment. */
  noSpeechProb: number;
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

/** The configuration information for an audio translation request. */
export interface AudioTranslationOptions {
  /**
   * The audio data to translate. This must be the binary content of a file in one of the supported media formats:
   *  flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, webm.
   */
  file: Uint8Array;
  /** The optional filename or descriptive identifier to associate with with the audio data. */
  filename?: string;
  /** The requested format of the translation response data, which will influence the content and detail of the result. */
  responseFormat?: AudioTranslationFormat;
  /**
   * An optional hint to guide the model's style or continue from a prior audio segment. The written language of the
   * prompt should match the primary spoken language of the audio data.
   */
  prompt?: string;
  /**
   * The sampling temperature, between 0 and 1.
   * Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
   * If set to 0, the model will use log probability to automatically increase the temperature until certain thresholds are hit.
   */
  temperature?: number;
  /** The model to use for this translation request. */
  model?: string;
}

/** Defines available options for the underlying response format of output translation information. */
/** "json", "verbose_json", "text", "srt", "vtt" */
export type AudioTranslationFormat = string;

/** Result information for an operation that translated spoken audio into written text. */
export interface AudioTranslation {
  /** The translated text for the provided audio data. */
  text: string;
  /** The label that describes which operation type generated the accompanying response data. */
  task?: AudioTaskLabel;
  /**
   * The spoken language that was detected in the translated audio data.
   * This is expressed as a two-letter ISO-639-1 language code like 'en' or 'fr'.
   */
  language?: string;
  /** The total duration of the audio processed to produce accompanying translation information. */
  duration?: number;
  /** A collection of information about the timing, probabilities, and other detail of each processed audio segment. */
  segments?: AudioTranslationSegment[];
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
  /** If provided, the configuration options for available Azure OpenAI chat enhancements. */
  enhancements?: AzureChatEnhancementConfiguration;
}

/**
 * Extended information about a single segment of translated audio data.
 * Segments generally represent roughly 5-10 seconds of speech. Segment boundaries typically occur between words but not
 * necessarily sentences.
 */
export interface AudioTranslationSegment {
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
  avgLogprob: number;
  /** The compression ratio of this audio segment. */
  compressionRatio: number;
  /** The probability of no speech detection within this audio segment. */
  noSpeechProb: number;
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
 * The configuration information for a completions request.
 * Completions support a wide variety of tasks and generate text that continues from or "completes"
 * provided prompt data.
 */
export interface CompletionsOptions {
  /** The prompts to generate completions from. */
  prompt: string[];
  /** The maximum number of tokens to generate. */
  maxTokens?: number;
  /**
   * The sampling temperature to use that controls the apparent creativity of generated completions.
   * Higher values will make output more random while lower values will make results more focused
   * and deterministic.
   * It is not recommended to modify temperature and topP for the same completions request as the
   * interaction of these two settings is difficult to predict.
   */
  temperature?: number;
  /**
   * An alternative to sampling with temperature called nucleus sampling. This value causes the
   * model to consider the results of tokens with the provided probability mass. As an example, a
   * value of 0.15 will cause only the tokens comprising the top 15% of probability mass to be
   * considered.
   * It is not recommended to modify temperature and topP for the same completions request as the
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
   * The number of completions choices that should be generated per provided prompt as part of an
   * overall completions response.
   * Because this setting can generate many completions, it may quickly consume your token quota.
   * Use carefully and ensure reasonable settings for maxTokens and stop.
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
  presencePenalty?: number;
  /**
   * A value that influences the probability of generated tokens appearing based on their cumulative
   * frequency in generated text.
   * Positive values will make tokens less likely to appear as their frequency increases and
   * decrease the likelihood of the model repeating the same statements verbatim.
   */
  frequencyPenalty?: number;
  /**
   * A value that controls how many completions will be internally generated prior to response
   * formulation.
   * When used together with n, bestOf controls the number of candidate completions and must be
   * greater than n.
   * Because this setting can generate many completions, it may quickly consume your token quota.
   * Use carefully and ensure reasonable settings for max_tokens and stop.
   */
  bestOf?: number;
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
  promptFilterResults: ContentFilterResultsForPrompt[];
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
export interface ContentFilterResultsForPrompt {
  /** The index of this prompt in the set of prompt results */
  promptIndex: number;
  /** Content filtering results for this prompt */
  contentFilterResults: ContentFilterResultDetailsForPrompt;
}

/** Information about the content filtering category, if it has been detected. */
export type ContentFilterResultDetailsForPrompt =
  | ContentFilterSuccessResultDetailsForPrompt
  | ContentFilterErrorResults;
/** Information about the content filtering success result. */
export interface ContentFilterSuccessResultDetailsForPrompt {
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
  /** Describes whether profanity was detected. */
  profanity?: ContentFilterDetectionResult;
  /** Describes detection results against configured custom blocklists. */
  customBlocklists?: ContentFilterBlocklistIdResult[];
  /** Whether a jailbreak attempt was detected in the prompt. */
  jailbreak?: ContentFilterDetectionResult;
}

/** Information about the content filtering error result. */
export interface ContentFilterErrorResults {
  /**
   * Describes an error returned if the content filtering system is
   * down or otherwise unable to complete the operation in time.
   */
  error: ErrorModel;
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

/** Represents the outcome of a detection operation performed by content filtering. */
export interface ContentFilterDetectionResult {
  /** A value indicating whether or not the content has been filtered. */
  filtered: boolean;
  /** A value indicating whether detection occurred, irrespective of severity or whether the content was filtered. */
  detected: boolean;
}

/** Represents the outcome of an evaluation against a custom blocklist as performed by content filtering. */
export interface ContentFilterBlocklistIdResult {
  /** The ID of the custom blocklist evaluated. */
  id: string;
  /** A value indicating whether or not the content has been filtered. */
  filtered: boolean;
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
  /**
   * Information about the content filtering category (hate, sexual, violence, self_harm), if it
   * has been detected, as well as the severity level (very_low, low, medium, high-scale that
   * determines the intensity and risk level of harmful content) and if it has been filtered or not.
   */
  contentFilterResults?: ContentFilterResultsForChoice;
  /** The log probabilities model for tokens associated with this completions choice. */
  logprobs: CompletionsLogProbabilityModel | null;
  /** Reason for finishing */
  finishReason: CompletionsFinishReason | null;
}

/** Information about the content filtering results, if it has been detected. */
export type ContentFilterResultsForChoice =
  | ContentFilterSuccessResultsForChoice
  | ContentFilterErrorResults;

/** Information about content filtering evaluated against generated model output. */
export interface ContentFilterSuccessResultsForChoice {
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
  /** Describes whether profanity was detected. */
  profanity?: ContentFilterDetectionResult;
  /** Describes detection results against configured custom blocklists. */
  customBlocklists?: ContentFilterBlocklistIdResult[];
  /**
   * Describes an error returned if the content filtering system is
   * down or otherwise unable to complete the operation in time.
   */
  error?: undefined;
  /** Information about detection of protected text material. */
  protectedMaterialText?: ContentFilterDetectionResult;
  /** Information about detection of protected code material. */
  protectedMaterialCode?: ContentFilterCitedDetectionResult;
}

/** Represents the outcome of a detection operation against protected resources as performed by content filtering. */
export interface ContentFilterCitedDetectionResult {
  /** A value indicating whether or not the content has been filtered. */
  filtered: boolean;
  /** A value indicating whether detection occurred, irrespective of severity or whether the content was filtered. */
  detected: boolean;
  /** The internet location associated with the detection. */
  url?: string;
  /** The license description associated with the detection. */
  license: string;
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
/** "stop", "length", "content_filter", "function_call", "tool_calls" */
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
  messages: ChatRequestMessageUnion[];
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
  dataSources?: AzureChatExtensionConfiguration[];
  /** If provided, the configuration options for available Azure OpenAI chat enhancements. */
  enhancements?: AzureChatEnhancementConfiguration;
  /**
   * If specified, the system will make a best effort to sample deterministically such that repeated requests with the
   * same seed and parameters should return the same result. Determinism is not guaranteed, and you should refer to the
   * system_fingerprint response parameter to monitor changes in the backend."
   */
  seed?: number;
  /** An object specifying the format that the model must output. Used to enable JSON mode. */
  responseFormat?: ChatCompletionsResponseFormatUnion;
  /** The available tool definitions that the chat completions request can use, including caller-defined functions. */
  tools?: ChatCompletionsToolDefinitionUnion[];
  /** If specified, the model will configure which of the provided tools it can use for the chat completions response. */
  toolChoice?: ChatCompletionsToolSelectionPreset | ChatCompletionsNamedToolSelectionUnion;
}

/** An abstract representation of a chat message as provided in a request. */
export interface ChatRequestMessage {
  /** the discriminator possible values: system, user, assistant, tool, function */
  role: ChatRole;
}

/**
 * A request chat message containing system instructions that influence how the model will generate a chat completions
 * response.
 */
export interface ChatRequestSystemMessage extends ChatRequestMessage {
  /** The chat role associated with this message, which is always 'system' for system messages. */
  role: "system";
  /** The contents of the system message. */
  content: string;
  /** An optional name for the participant. */
  name?: string;
}

/** A request chat message representing user input to the assistant. */
export interface ChatRequestUserMessage extends ChatRequestMessage {
  /** The chat role associated with this message, which is always 'user' for user messages. */
  role: "user";
  /** The contents of the user message, with available input types varying by selected model. */
  content: string | ChatMessageContentItemUnion[];
  /** An optional name for the participant. */
  name?: string;
}

/** An abstract representation of a structured content item within a chat message. */
export interface ChatMessageContentItem {
  /** the discriminator possible values: text, image_url */
  type: string;
}

/** A structured chat content item containing plain text. */
export interface ChatMessageTextContentItem extends ChatMessageContentItem {
  /** The discriminated object type: always 'text' for this type. */
  type: "text";
  /** The content of the message. */
  text: string;
}

/** A structured chat content item containing an image reference. */
export interface ChatMessageImageContentItem extends ChatMessageContentItem {
  /** The discriminated object type: always 'image_url' for this type. */
  type: "image_url";
  /** An internet location, which must be accessible to the model,from which the image may be retrieved. */
  imageUrl: ChatMessageImageUrl;
}

/** An internet location from which the model may retrieve an image. */
export interface ChatMessageImageUrl {
  /** The URL of the image. */
  url: string;
  /**
   * The evaluation quality setting to use, which controls relative prioritization of speed, token consumption, and
   * accuracy.
   */
  detail?: ChatMessageImageDetailLevel;
}

/** A representation of the possible image detail levels for image-based chat completions message content. */
/** "auto", "low", "high" */
export type ChatMessageImageDetailLevel = string;

/** A request chat message representing response or action from the assistant. */
export interface ChatRequestAssistantMessage extends ChatRequestMessage {
  /** The chat role associated with this message, which is always 'assistant' for assistant messages. */
  role: "assistant";
  /** The content of the message. */
  content: string | null;
  /** An optional name for the participant. */
  name?: string;
  /**
   * The tool calls that must be resolved and have their outputs appended to subsequent input messages for the chat
   * completions request to resolve as configured.
   */
  toolCalls?: ChatCompletionsToolCallUnion[];
  /**
   * The function call that must be resolved and have its output appended to subsequent input messages for the chat
   * completions request to resolve as configured.
   */
  functionCall?: FunctionCall;
}

/**
 * An abstract representation of a tool call that must be resolved in a subsequent request to perform the requested
 * chat completion.
 */
export interface ChatCompletionsToolCall {
  /** the discriminator possible values: function */
  type: string;
  /** The ID of the tool call. */
  id: string;
  /** The index of the tool call. */
  index?: number;
}

/**
 * A tool call to a function tool, issued by the model in evaluation of a configured function tool, that represents
 * a function invocation needed for a subsequent chat completions request to resolve.
 */
export interface ChatCompletionsFunctionToolCall extends ChatCompletionsToolCall {
  /** The type of tool call, in this case always 'function'. */
  type: "function";
  /** The details of the function invocation requested by the tool call. */
  function: FunctionCall;
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

/** A request chat message representing requested output from a configured tool. */
export interface ChatRequestToolMessage extends ChatRequestMessage {
  /** The chat role associated with this message, which is always 'tool' for tool messages. */
  role: "tool";
  /** The content of the message. */
  content: string | null;
  /** The ID of the tool call resolved by the provided content. */
  toolCallId: string;
}

/** A request chat message representing requested output from a configured function. */
export interface ChatRequestFunctionMessage extends ChatRequestMessage {
  /** The chat role associated with this message, which is always 'function' for function messages. */
  role: "function";
  /** The name of the function that was called to produce output. */
  name: string;
  /** The output of the function as requested by the function call. */
  content: string | null;
}

/** A description of the intended purpose of a message within a chat completions interaction. */
/** "system", "assistant", "user", "function", "tool" */
export type ChatRole = string;

/** The definition of a caller-specified function that chat completions may invoke in response to matching user input. */
export interface FunctionDefinition {
  /** The name of the function to be called. */
  name: string;
  /**
   * A description of what the function does. The model will use this description when selecting the function and
   * interpreting its parameters.
   */
  description?: string;
  /** The parameters the function accepts, described as a JSON Schema object. */
  parameters?: Record<string, any>;
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
 * A specific representation of configurable options for Azure Cognitive Search when using it as an Azure OpenAI chat
 * extension.
 */
export interface AzureCognitiveSearchChatExtensionConfiguration {
  /**
   * The type label to use when configuring Azure OpenAI chat extensions. This should typically not be changed from its
   * default value for Azure Cognitive Search.
   */
  type: "AzureCognitiveSearch";
  /**
   * The authentication method to use when accessing the defined data source.
   * Each data source type supports a specific set of available authentication methods; please see the documentation of
   * the data source for supported mechanisms.
   * If not otherwise provided, On Your Data will attempt to use System Managed Identity (default credential)
   * authentication.
   */
  authentication?: OnYourDataAuthenticationOptionsUnion;
  /** The configured top number of documents to feature for the configured query. */
  topNDocuments?: number;
  /** Whether queries should be restricted to use of indexed data. */
  inScope?: boolean;
  /** The configured strictness of the search relevance filtering. The higher of strictness, the higher of the precision but lower recall of the answer. */
  strictness?: number;
  /** Give the model instructions about how it should behave and any context it should reference when generating a response. You can describe the assistant's personality and tell it how to format responses. There's a 100 token limit for it, and it counts against the overall token limit. */
  roleInformation?: string;
  /** The absolute endpoint path for the Azure Cognitive Search resource to use. */
  endpoint: string;
  /** The name of the index to use as available in the referenced Azure Cognitive Search resource. */
  indexName: string;
  /** The API key to use when interacting with the Azure Cognitive Search resource. */
  key?: string;
  /** Customized field mapping behavior to use when interacting with the search index. */
  fieldsMapping?: AzureCognitiveSearchIndexFieldMappingOptions;
  /** The query type to use with Azure Cognitive Search. */
  queryType?: AzureCognitiveSearchQueryType;
  /** The additional semantic configuration for the query. */
  semanticConfiguration?: string;
  /** Search filter. */
  filter?: string;
  /** When using embeddings for search, specifies the resource endpoint URL from which embeddings should be retrieved. It should be in the format of format `https://YOUR_RESOURCE_NAME.openai.azure.com/openai/deployments/YOUR_DEPLOYMENT_NAME/embeddings?api-version={api-version}`. */
  embeddingEndpoint?: string;
  /** When using embeddings, specifies the API key to use with the provided embeddings endpoint. */
  embeddingKey?: string;
  /** The embedding dependency for vector search. */
  embeddingDependency?: OnYourDataVectorizationSourceUnion;
}

/** The authentication options for Azure OpenAI On Your Data. */
export interface OnYourDataAuthenticationOptions {
  /** the discriminator possible values: APIKey, ConnectionString, KeyAndKeyId, SystemAssignedManagedIdentity, UserAssignedManagedIdentity */
  type: OnYourDataAuthenticationType;
}

/** The authentication options for Azure OpenAI On Your Data when using an API key. */
export interface OnYourDataApiKeyAuthenticationOptions extends OnYourDataAuthenticationOptions {
  /** The authentication type of API key. */
  type: "APIKey";
  /** The API key to use for authentication. */
  key: string;
}

/** The authentication options for Azure OpenAI On Your Data when using a connection string. */
export interface OnYourDataConnectionStringAuthenticationOptions
  extends OnYourDataAuthenticationOptions {
  /** The authentication type of connection string. */
  type: "ConnectionString";
  /** The connection string to use for authentication. */
  connectionString: string;
}

/** The authentication options for Azure OpenAI On Your Data when using an Elasticsearch key and key ID pair. */
export interface OnYourDataKeyAndKeyIdAuthenticationOptions
  extends OnYourDataAuthenticationOptions {
  /** The authentication type of Elasticsearch key and key ID pair. */
  type: "KeyAndKeyId";
  /** The key to use for authentication. */
  key: string;
  /** The key ID to use for authentication. */
  keyId: string;
}

/** The authentication options for Azure OpenAI On Your Data when using a system-assigned managed identity. */
export interface OnYourDataSystemAssignedManagedIdentityAuthenticationOptions
  extends OnYourDataAuthenticationOptions {
  /** The authentication type of system-assigned managed identity. */
  type: "SystemAssignedManagedIdentity";
}

/** The authentication options for Azure OpenAI On Your Data when using a user-assigned managed identity. */
export interface OnYourDataUserAssignedManagedIdentityAuthenticationOptions
  extends OnYourDataAuthenticationOptions {
  /** The authentication type of user-assigned managed identity. */
  type: "UserAssignedManagedIdentity";
  /** The resource ID of the user-assigned managed identity to use for authentication. */
  managedIdentityResourceId: string;
}

/** The authentication types supported with Azure OpenAI On Your Data. */
/** "APIKey", "ConnectionString", "KeyAndKeyId", "SystemAssignedManagedIdentity", "UserAssignedManagedIdentity" */
export type OnYourDataAuthenticationType = string;

/** Optional settings to control how fields are processed when using a configured Azure Cognitive Search resource. */
export interface AzureCognitiveSearchIndexFieldMappingOptions {
  /** The name of the index field to use as a title. */
  titleField?: string;
  /** The name of the index field to use as a URL. */
  urlField?: string;
  /** The name of the index field to use as a filepath. */
  filepathField?: string;
  /** The names of index fields that should be treated as content. */
  contentFields?: string[];
  /** The separator pattern that content fields should use. */
  contentFieldsSeparator?: string;
  /** The names of fields that represent vector data. */
  vectorFields?: string[];
  /** The names of fields that represent image vector data. */
  imageVectorFields?: string[];
}

/** The type of Azure Cognitive Search retrieval query that should be executed when using it as an Azure OpenAI chat extension. */
/** "simple", "semantic", "vector", "vectorSimpleHybrid", "vectorSemanticHybrid" */
export type AzureCognitiveSearchQueryType = string;

/** An abstract representation of a vectorization source for Azure OpenAI On Your Data with vector search. */
export interface OnYourDataVectorizationSource {
  /** the discriminator possible values: Endpoint, DeploymentName, ModelId */
  type: OnYourDataVectorizationSourceType;
}

/**
 * The details of a a vectorization source, used by Azure OpenAI On Your Data when applying vector search, that is based
 * on a public Azure OpenAI endpoint call for embeddings.
 */
export interface OnYourDataEndpointVectorizationSource extends OnYourDataVectorizationSource {
  /** The type of vectorization source to use. Always 'Endpoint' for this type. */
  type: "Endpoint";
  /** Specifies the resource endpoint URL from which embeddings should be retrieved. It should be in the format of https://YOUR_RESOURCE_NAME.openai.azure.com/openai/deployments/YOUR_DEPLOYMENT_NAME/embeddings. The api-version query parameter is not allowed. */
  endpoint: string;
  /** Specifies the authentication options to use when retrieving embeddings from the specified endpoint. */
  authentication: OnYourDataAuthenticationOptionsUnion;
}

/**
 * The details of a a vectorization source, used by Azure OpenAI On Your Data when applying vector search, that is based
 * on an internal embeddings model deployment name in the same Azure OpenAI resource.
 */
export interface OnYourDataDeploymentNameVectorizationSource extends OnYourDataVectorizationSource {
  /** The type of vectorization source to use. Always 'DeploymentName' for this type. */
  type: "DeploymentName";
  /** The embedding model deployment name within the same Azure OpenAI resource. This enables you to use vector search without Azure OpenAI api-key and without Azure OpenAI public network access. */
  deploymentName: string;
}

/**
 * The details of a a vectorization source, used by Azure OpenAI On Your Data when applying vector search, that is based
 * on a search service model ID. Currently only supported by Elasticsearch®.
 */
export interface OnYourDataModelIdVectorizationSource extends OnYourDataVectorizationSource {
  /** The type of vectorization source to use. Always 'ModelId' for this type. */
  type: "ModelId";
  /** The embedding model ID build inside the search service. Currently only supported by Elasticsearch®. */
  modelId: string;
}

/**
 * Represents the available sources Azure OpenAI On Your Data can use to configure vectorization of data for use with
 * vector search.
 */
/** "Endpoint", "DeploymentName", "ModelId" */
export type OnYourDataVectorizationSourceType = string;

/**
 * A specific representation of configurable options for Azure Machine Learning vector index when using it as an Azure
 * OpenAI chat extension.
 */
export interface AzureMachineLearningIndexChatExtensionConfiguration {
  /**
   * The type label to use when configuring Azure OpenAI chat extensions. This should typically not be changed from its
   * default value for Azure Machine Learning vector index.
   */
  type: "AzureMLIndex";
  /**
   * The authentication method to use when accessing the defined data source.
   * Each data source type supports a specific set of available authentication methods; please see the documentation of
   * the data source for supported mechanisms.
   * If not otherwise provided, On Your Data will attempt to use System Managed Identity (default credential)
   * authentication.
   */
  authentication?: OnYourDataAuthenticationOptionsUnion;
  /** The configured top number of documents to feature for the configured query. */
  topNDocuments?: number;
  /** Whether queries should be restricted to use of indexed data. */
  inScope?: boolean;
  /** The configured strictness of the search relevance filtering. The higher of strictness, the higher of the precision but lower recall of the answer. */
  strictness?: number;
  /** Give the model instructions about how it should behave and any context it should reference when generating a response. You can describe the assistant's personality and tell it how to format responses. There's a 100 token limit for it, and it counts against the overall token limit. */
  roleInformation?: string;
  /** The resource ID of the Azure Machine Learning project. */
  projectResourceId: string;
  /** The Azure Machine Learning vector index name. */
  name: string;
  /** The version of the Azure Machine Learning vector index. */
  version: string;
  /** Search filter. Only supported if the Azure Machine Learning vector index is of type AzureSearch. */
  filter?: string;
}

/**
 * A specific representation of configurable options for Elasticsearch when using it as an Azure OpenAI chat
 * extension.
 */
export interface AzureCosmosDBChatExtensionConfiguration {
  /**
   * The type label to use when configuring Azure OpenAI chat extensions. This should typically not be changed from its
   * default value for Azure Cosmos DB.
   */
  type: "AzureCosmosDB";
  /**
   * The authentication method to use when accessing the defined data source.
   * Each data source type supports a specific set of available authentication methods; please see the documentation of
   * the data source for supported mechanisms.
   * If not otherwise provided, On Your Data will attempt to use System Managed Identity (default credential)
   * authentication.
   */
  authentication?: OnYourDataAuthenticationOptionsUnion;
  /** The configured top number of documents to feature for the configured query. */
  topNDocuments?: number;
  /** Whether queries should be restricted to use of indexed data. */
  inScope?: boolean;
  /** The configured strictness of the search relevance filtering. The higher of strictness, the higher of the precision but lower recall of the answer. */
  strictness?: number;
  /** Give the model instructions about how it should behave and any context it should reference when generating a response. You can describe the assistant's personality and tell it how to format responses. There's a 100 token limit for it, and it counts against the overall token limit. */
  roleInformation?: string;
  /** The MongoDB vCore database name to use with Azure Cosmos DB. */
  databaseName: string;
  /** The name of the Azure Cosmos DB resource container. */
  containerName: string;
  /** The MongoDB vCore index name to use with Azure Cosmos DB. */
  indexName: string;
  /** Customized field mapping behavior to use when interacting with the search index. */
  fieldsMapping: AzureCosmosDBFieldMappingOptions;
  /** The embedding dependency for vector search. */
  embeddingDependency?: OnYourDataVectorizationSourceUnion;
}
/** Optional settings to control how fields are processed when using a configured Azure Cosmos DB resource. */
export interface AzureCosmosDBFieldMappingOptions {
  /** The names of fields that represent vector data. */
  vectorFields: string[];
}

/**
 * A specific representation of configurable options for Elasticsearch when using it as an Azure OpenAI chat
 * extension.
 */
export interface ElasticsearchChatExtensionConfiguration {
  /**
   * The type label to use when configuring Azure OpenAI chat extensions. This should typically not be changed from its
   * default value for Elasticsearch®.
   */
  type: "Elasticsearch";
  /**
   * The authentication method to use when accessing the defined data source.
   * Each data source type supports a specific set of available authentication methods; please see the documentation of
   * the data source for supported mechanisms.
   * If not otherwise provided, On Your Data will attempt to use System Managed Identity (default credential)
   * authentication.
   */
  authentication?: OnYourDataAuthenticationOptionsUnion;
  /** The configured top number of documents to feature for the configured query. */
  topNDocuments?: number;
  /** Whether queries should be restricted to use of indexed data. */
  inScope?: boolean;
  /** The configured strictness of the search relevance filtering. The higher of strictness, the higher of the precision but lower recall of the answer. */
  strictness?: number;
  /** Give the model instructions about how it should behave and any context it should reference when generating a response. You can describe the assistant's personality and tell it how to format responses. There's a 100 token limit for it, and it counts against the overall token limit. */
  roleInformation?: string;
  /** The endpoint of Elasticsearch®. */
  endpoint: string;
  /** The index name of Elasticsearch®. */
  indexName: string;
  /** The index field mapping options of Elasticsearch®. */
  fieldsMapping?: ElasticsearchIndexFieldMappingOptions;
  /** The query type of Elasticsearch®. */
  queryType?: ElasticsearchQueryType;
  /** The embedding dependency for vector search. */
  embeddingDependency?: OnYourDataVectorizationSourceUnion;
}

/** Optional settings to control how fields are processed when using a configured Elasticsearch® resource. */
export interface ElasticsearchIndexFieldMappingOptions {
  /** The name of the index field to use as a title. */
  titleField?: string;
  /** The name of the index field to use as a URL. */
  urlField?: string;
  /** The name of the index field to use as a filepath. */
  filepathField?: string;
  /** The names of index fields that should be treated as content. */
  contentFields?: string[];
  /** The separator pattern that content fields should use. */
  contentFieldsSeparator?: string;
  /** The names of fields that represent vector data. */
  vectorFields?: string[];
}

/** The type of Elasticsearch® retrieval query that should be executed when using it as an Azure OpenAI chat extension. */
/** "simple", "vector" */
export type ElasticsearchQueryType = string;

/**
 * A specific representation of configurable options for Elasticsearch when using it as an Azure OpenAI chat
 * extension.
 */
export interface PineconeChatExtensionConfiguration {
  /**
   * The type label to use when configuring Azure OpenAI chat extensions. This should typically not be changed from its
   * default value for Pinecone.
   */
  type: "Pinecone";
  /**
   * The authentication method to use when accessing the defined data source.
   * Each data source type supports a specific set of available authentication methods; please see the documentation of
   * the data source for supported mechanisms.
   * If not otherwise provided, On Your Data will attempt to use System Managed Identity (default credential)
   * authentication.
   */
  authentication?: OnYourDataAuthenticationOptions;
  /** The configured top number of documents to feature for the configured query. */
  topNDocuments?: number;
  /** Whether queries should be restricted to use of indexed data. */
  inScope?: boolean;
  /** The configured strictness of the search relevance filtering. The higher of strictness, the higher of the precision but lower recall of the answer. */
  strictness?: number;
  /** Give the model instructions about how it should behave and any context it should reference when generating a response. You can describe the assistant's personality and tell it how to format responses. There's a 100 token limit for it, and it counts against the overall token limit. */
  roleInformation?: string;
  /** The environment name of Pinecone. */
  environment: string;
  /** The name of the Pinecone database index. */
  indexName: string;
  /** Customized field mapping behavior to use when interacting with the search index. */
  fieldsMapping: PineconeFieldMappingOptions;
  /** The embedding dependency for vector search. */
  embeddingDependency?: OnYourDataVectorizationSource;
}

/**
 *
 *   A representation of configuration data for a single Azure OpenAI chat extension. This will be used by a chat
 *   completions request that should use Azure OpenAI chat extensions to augment the response behavior.
 *   The use of this configuration is compatible only with Azure OpenAI.
 */
export type AzureChatExtensionConfiguration =
  | AzureCognitiveSearchChatExtensionConfiguration
  | AzureMachineLearningIndexChatExtensionConfiguration
  | AzureCosmosDBChatExtensionConfiguration
  | ElasticsearchChatExtensionConfiguration
  | PineconeChatExtensionConfiguration;

/** Optional settings to control how fields are processed when using a configured Pinecone resource. */
export interface PineconeFieldMappingOptions {
  /** The name of the index field to use as a title. */
  titleField?: string;
  /** The name of the index field to use as a URL. */
  urlField?: string;
  /** The name of the index field to use as a filepath. */
  filepathField?: string;
  /** The names of index fields that should be treated as content. */
  contentFields?: string[];
  /** The separator pattern that content fields should use. */
  contentFieldsSeparator?: string;
  /** The names of fields that represent vector data. */
  vectorFields?: string[];
  /** The names of fields that represent image vector data. */
  imageVectorFields?: string[];
}

/**
 *   A representation of configuration data for a single Azure OpenAI chat extension. This will be used by a chat
 *   completions request that should use Azure OpenAI chat extensions to augment the response behavior.
 *   The use of this configuration is compatible only with Azure OpenAI.
 */
/** "AzureCognitiveSearch", "AzureMLIndex", "AzureCosmosDB", "Elasticsearch", "Pinecone" */
export type AzureChatExtensionType = string;

/** A representation of the available Azure OpenAI enhancement configurations. */
export interface AzureChatEnhancementConfiguration {
  /** A representation of the available options for the Azure OpenAI grounding enhancement. */
  grounding?: AzureChatGroundingEnhancementConfiguration;
  /** A representation of the available options for the Azure OpenAI optical character recognition (OCR) enhancement. */
  ocr?: AzureChatOCREnhancementConfiguration;
}

/** A representation of the available options for the Azure OpenAI grounding enhancement. */
export interface AzureChatGroundingEnhancementConfiguration {
  /** Specifies whether the enhancement is enabled. */
  enabled: boolean;
}

/** A representation of the available options for the Azure OpenAI optical character recognition (OCR) enhancement. */
export interface AzureChatOCREnhancementConfiguration {
  /** Specifies whether the enhancement is enabled. */
  enabled: boolean;
}

/**
 * An abstract representation of a response format configuration usable by Chat Completions. Can be used to enable JSON
 * mode.
 */
export interface ChatCompletionsResponseFormat {
  /** the discriminator possible values: text, json_object */
  type: string;
}

/**
 * The standard Chat Completions response format that can freely generate text and is not guaranteed to produce response
 * content that adheres to a specific schema.
 */
export interface ChatCompletionsTextResponseFormat extends ChatCompletionsResponseFormat {
  /** The discriminated object type, which is always 'text' for this format. */
  type: "text";
}

/** A response format for Chat Completions that restricts responses to emitting valid JSON objects. */
export interface ChatCompletionsJsonResponseFormat extends ChatCompletionsResponseFormat {
  /** The discriminated object type, which is always 'json_object' for this format. */
  type: "json_object";
}

/** An abstract representation of a tool that can be used by the model to improve a chat completions response. */
export interface ChatCompletionsToolDefinition {
  /** the discriminator possible values: function */
  type: string;
}

/** The definition information for a chat completions function tool that can call a function in response to a tool call. */
export interface ChatCompletionsFunctionToolDefinition extends ChatCompletionsToolDefinition {
  /** The object name, which is always 'function'. */
  type: "function";
  /** The function definition details for the function tool. */
  function: FunctionDefinition;
}

/** Represents a generic policy for how a chat completions tool may be selected. */
/** "auto", "none" */
export type ChatCompletionsToolSelectionPreset = string;

/** An abstract representation of an explicit, named tool selection to use for a chat completions request. */
export interface ChatCompletionsNamedToolSelection {
  /** the discriminator possible values: function */
  type: string;
}

/** A tool selection of a specific, named function tool that will limit chat completions to using the named function. */
export interface ChatCompletionsNamedFunctionToolSelection
  extends ChatCompletionsNamedToolSelection {
  /** The object type, which is always 'function'. */
  type: "function";
  /** The name of the function that should be called. */
  name: string;
}

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
  promptFilterResults: ContentFilterResultsForPrompt[];
  /**
   * Can be used in conjunction with the `seed` request parameter to understand when backend changes have been made that
   * might impact determinism.
   */
  systemFingerprint?: string;
  /** Usage information for tokens processed and generated as part of this completions operation. */
  usage?: CompletionsUsage;
}

/**
 * The representation of a single prompt completion as part of an overall chat completions request.
 * Generally, `n` choices are generated per provided prompt with a default value of 1.
 * Token limits and other settings may limit the number of choices generated.
 */
export interface ChatChoice {
  /** The chat message for a given chat completions prompt. */
  message?: ChatResponseMessage;
  /** The ordered index associated with this chat completions choice. */
  index: number;
  /** The reason that this chat completions choice completed its generated. */
  finishReason: CompletionsFinishReason | null;
  /**
   * The reason the model stopped generating tokens, together with any applicable details.
   * This structured representation replaces 'finish_reason' for some models.
   */
  finishDetails?: ChatFinishDetailsUnion;
  /** The delta message content for a streaming response. */
  delta?: ChatResponseMessage;
  /**
   * Information about the content filtering category (hate, sexual, violence, self_harm), if it
   * has been detected, as well as the severity level (very_low, low, medium, high-scale that
   * determines the intensity and risk level of harmful content) and if it has been filtered or not.
   */
  contentFilterResults?: ContentFilterResultsForChoice;
  /**
   * Represents the output results of Azure OpenAI enhancements to chat completions, as configured via the matching input
   * provided in the request. This supplementary information is only available when using Azure OpenAI and only when the
   * request is configured to use enhancements.
   */
  enhancements?: AzureChatEnhancements;
}

/** A representation of a chat message as received in a response. */
export interface ChatResponseMessage {
  /** The chat role associated with the message. */
  role: ChatRole;
  /** The content of the message. */
  content: string | null;
  /**
   * The tool calls that must be resolved and have their outputs appended to subsequent input messages for the chat
   * completions request to resolve as configured.
   */
  toolCalls: ChatCompletionsToolCallUnion[];
  /**
   * The function call that must be resolved and have its output appended to subsequent input messages for the chat
   * completions request to resolve as configured.
   */
  functionCall?: FunctionCall;
  /**
   * If Azure OpenAI chat extensions are configured, this array represents the incremental steps performed by those
   * extensions while processing the chat completions request.
   */
  context?: AzureChatExtensionsMessageContext;
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
  messages?: ChatResponseMessage[];
}

/** An abstract representation of structured information about why a chat completions response terminated. */
export interface ChatFinishDetails {
  /** the discriminator possible values: stop, max_tokens */
  type: string;
}

/** A structured representation of a stop reason that signifies natural termination by the model. */
export interface StopFinishDetails extends ChatFinishDetails {
  /** The object type, which is always 'stop' for this object. */
  type: "stop";
  /** The token sequence that the model terminated with. */
  stop: string;
}

/**
 * A structured representation of a stop reason that signifies a token limit was reached before the model could naturally
 * complete.
 */
export interface MaxTokensFinishDetails extends ChatFinishDetails {
  /** The object type, which is always 'max_tokens' for this object. */
  type: "max_tokens";
}

/**
 * Represents the output results of Azure enhancements to chat completions, as configured via the matching input provided
 * in the request.
 */
export interface AzureChatEnhancements {
  /** The grounding enhancement that returns the bounding box of the objects detected in the image. */
  grounding?: AzureGroundingEnhancement;
}

/** The grounding enhancement that returns the bounding box of the objects detected in the image. */
export interface AzureGroundingEnhancement {
  /** The lines of text detected by the grounding enhancement. */
  lines: AzureGroundingEnhancementLine[];
}

/** A content line object consisting of an adjacent sequence of content elements, such as words and selection marks. */
export interface AzureGroundingEnhancementLine {
  /** The text within the line. */
  text: string;
  /** An array of spans that represent detected objects and its bounding box information. */
  spans: AzureGroundingEnhancementLineSpan[];
}

/** A span object that represents a detected object and its bounding box information. */
export interface AzureGroundingEnhancementLineSpan {
  /** The text content of the span that represents the detected object. */
  text: string;
  /**
   * The character offset within the text where the span begins. This offset is defined as the position of the first
   * character of the span, counting from the start of the text as Unicode codepoints.
   */
  offset: number;
  /** The length of the span in characters, measured in Unicode codepoints. */
  length: number;
  /** An array of objects representing points in the polygon that encloses the detected object. */
  polygon: AzureGroundingEnhancementCoordinatePoint[];
}

/** A representation of a single polygon point as used by the Azure grounding enhancement. */
export interface AzureGroundingEnhancementCoordinatePoint {
  /** The x-coordinate (horizontal axis) of the point. */
  x: number;
  /** The y-coordinate (vertical axis) of the point. */
  y: number;
}

/** Represents the request data used to generate images. */
export interface ImageGenerationOptions {
  /**
   * The model name or Azure OpenAI model deployment name to use for image generation. If not specified, dall-e-2 will be
   * inferred as a default.
   */
  model?: string;
  /** A description of the desired images. */
  prompt: string;
  /**
   * The number of images to generate.
   * Dall-e-2 models support values between 1 and 10.
   * Dall-e-3 models only support a value of 1.
   */
  n?: number;
  /**
   * The desired dimensions for generated images.
   * Dall-e-2 models support 256x256, 512x512, or 1024x1024.
   * Dall-e-3 models support 1024x1024, 1792x1024, or 1024x1792.
   */
  size?: ImageSize;
  /** The format in which image generation response items should be presented. */
  responseFormat?: ImageGenerationResponseFormat;
  /**
   * The desired image generation quality level to use.
   * Only configurable with dall-e-3 models.
   */
  quality?: ImageGenerationQuality;
  /**
   * The desired image generation style to use.
   * Only configurable with dall-e-3 models.
   */
  style?: ImageGenerationStyle;
  /** A unique identifier representing your end-user, which can help to monitor and detect abuse. */
  user?: string;
}

/** The desired size of generated images. */
/** "256x256", "512x512", "1024x1024", "1792x1024", "1024x1792" */
export type ImageSize = string;
/** The format in which the generated images are returned. */
/** "url", "b64_json" */
export type ImageGenerationResponseFormat = string;
/**
 * An image generation configuration that specifies how the model should prioritize quality, cost, and speed.
 * Only configurable with dall-e-3 models.
 */
/** "standard", "hd" */
export type ImageGenerationQuality = string;
/**
 * An image generation configuration that specifies how the model should incorporate realism and other visual characteristics.
 * Only configurable with dall-e-3 models.
 */
/** "natural", "vivid" */
export type ImageGenerationStyle = string;

/** The result of a successful image generation operation. */
export interface ImageGenerations {
  /**
   * A timestamp representing when this operation was started.
   * Expressed in seconds since the Unix epoch of 1970-01-01T00:00:00+0000.
   */
  created: Date;
  /** The images generated by the operation. */
  data: ImageGenerationData[];
}

/**
 * A representation of a single generated image, provided as either base64-encoded data or as a URL from which the image
 * may be retrieved.
 */
export interface ImageGenerationData {
  /** The URL that provides temporary access to download the generated image. */
  url?: string;
  /** The complete data for an image, represented as a base64-encoded string. */
  base64Data?: string;
  /**
   * The final prompt used by the model to generate the image.
   * Only provided with dall-3-models and only when revisions were made to the prompt.
   */
  revisedPrompt?: string;
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
   * Unless you are embedding code, we suggest replacing newlines (\\n) in your input with a single space,
   * as we have observed inferior results when newlines are present.
   */
  input: string[];
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

/** Alias for ChatRequestMessageUnion */
export type ChatRequestMessageUnion =
  | ChatRequestSystemMessage
  | ChatRequestUserMessage
  | ChatRequestAssistantMessage
  | ChatRequestToolMessage
  | ChatRequestFunctionMessage
  | ChatRequestMessage;
/** Alias for ChatMessageContentItemUnion */
export type ChatMessageContentItemUnion =
  | ChatMessageTextContentItem
  | ChatMessageImageContentItem
  | ChatMessageContentItem;
/** Alias for ChatCompletionsToolCallUnion */
export type ChatCompletionsToolCallUnion =
  | ChatCompletionsFunctionToolCall
  | ChatCompletionsToolCall;
/** Alias for OnYourDataAuthenticationOptionsUnion */
export type OnYourDataAuthenticationOptionsUnion =
  | OnYourDataApiKeyAuthenticationOptions
  | OnYourDataConnectionStringAuthenticationOptions
  | OnYourDataKeyAndKeyIdAuthenticationOptions
  | OnYourDataSystemAssignedManagedIdentityAuthenticationOptions
  | OnYourDataUserAssignedManagedIdentityAuthenticationOptions
  | OnYourDataAuthenticationOptions;
/** Alias for OnYourDataVectorizationSourceUnion */
export type OnYourDataVectorizationSourceUnion =
  | OnYourDataEndpointVectorizationSource
  | OnYourDataDeploymentNameVectorizationSource
  | OnYourDataModelIdVectorizationSource
  | OnYourDataVectorizationSource;
/** Alias for ChatCompletionsResponseFormatUnion */
export type ChatCompletionsResponseFormatUnion =
  | ChatCompletionsTextResponseFormat
  | ChatCompletionsJsonResponseFormat
  | ChatCompletionsResponseFormat;
/** Alias for ChatCompletionsToolDefinitionUnion */
export type ChatCompletionsToolDefinitionUnion =
  | ChatCompletionsFunctionToolDefinition
  | ChatCompletionsToolDefinition;
/** Alias for ChatCompletionsNamedToolSelectionUnion */
export type ChatCompletionsNamedToolSelectionUnion =
  | ChatCompletionsNamedFunctionToolSelection
  | ChatCompletionsToolSelectionPreset
  | ChatCompletionsNamedToolSelection;
/** Alias for ChatFinishDetailsUnion */
export type ChatFinishDetailsUnion = StopFinishDetails | MaxTokensFinishDetails | ChatFinishDetails;
/** A readable stream that is iterable and disposable. */
export interface EventStream<T> extends ReadableStream<T>, AsyncIterable<T> {}
