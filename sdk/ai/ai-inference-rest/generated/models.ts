// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * The configuration information for a chat completions request.
 * Completions support a wide variety of tasks and generate text that continues from or "completes"
 * provided prompt data.
 */
export interface ChatCompletionsOptions extends Record<string, unknown> {
  /**
   * The collection of context messages associated with this chat completions request.
   * Typical usage begins with a chat message for the System role that provides instructions for
   * the behavior of the assistant, followed by alternating messages between the User and
   * Assistant roles.
   */
  messages: Array<ChatRequestMessage>;
  /**
   * A value that influences the probability of generated tokens appearing based on their cumulative
   * frequency in generated text.
   * Positive values will make tokens less likely to appear as their frequency increases and
   * decrease the likelihood of the model repeating the same statements verbatim.
   * Supported range is [-2, 2].
   */
  frequency_penalty?: number;
  /** A value indicating whether chat completions should be streamed for this request. */
  stream?: boolean;
  /**
   * A value that influences the probability of generated tokens appearing based on their existing
   * presence in generated text.
   * Positive values will make tokens less likely to appear when they already exist and increase the
   * model's likelihood to output new topics.
   * Supported range is [-2, 2].
   */
  presence_penalty?: number;
  /**
   * The sampling temperature to use that controls the apparent creativity of generated completions.
   * Higher values will make output more random while lower values will make results more focused
   * and deterministic.
   * It is not recommended to modify temperature and top_p for the same completions request as the
   * interaction of these two settings is difficult to predict.
   * Supported range is [0, 1].
   */
  temperature?: number;
  /**
   * An alternative to sampling with temperature called nucleus sampling. This value causes the
   * model to consider the results of tokens with the provided probability mass. As an example, a
   * value of 0.15 will cause only the tokens comprising the top 15% of probability mass to be
   * considered.
   * It is not recommended to modify temperature and top_p for the same completions request as the
   * interaction of these two settings is difficult to predict.
   * Supported range is [0, 1].
   */
  top_p?: number;
  /** The maximum number of tokens to generate. */
  max_tokens?: number;
  /**
   * An object specifying the format that the model must output.
   *
   * Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema.
   *
   * Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.
   *
   * **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.
   */
  response_format?: ChatCompletionsResponseFormat;
  /** A collection of textual sequences that will end completions generation. */
  stop?: string[];
  /**
   * A list of tools the model may request to call. Currently, only functions are supported as a tool. The model
   * may response with a function call request and provide the input arguments in JSON format for that function.
   */
  tools?: Array<ChatCompletionsToolDefinition>;
  /** If specified, the model will configure which of the provided tools it can use for the chat completions response. */
  tool_choice?:
    | ChatCompletionsToolChoicePreset
    | ChatCompletionsNamedToolChoice;
  /**
   * If specified, the system will make a best effort to sample deterministically such that repeated requests with the
   * same seed and parameters should return the same result. Determinism is not guaranteed.
   */
  seed?: number;
  /** ID of the specific AI model to use, if more than one model is available on the endpoint. */
  model?: string;
}

/** An abstract representation of a chat message as provided in a request. */
export interface ChatRequestMessageParent {
  role: ChatRole;
}

/**
 * A request chat message containing system instructions that influence how the model will generate a chat completions
 * response.
 */
export interface ChatRequestSystemMessage extends ChatRequestMessageParent {
  /** The chat role associated with this message, which is always 'system' for system messages. */
  role: "system";
  /** The contents of the system message. */
  content: string;
}

/**
 * A request chat message containing developer instructions that influence how the model will generate a chat completions
 * response. Some AI models support a developer message instead of a system message.
 */
export interface ChatRequestDeveloperMessage extends ChatRequestMessageParent {
  /** The chat role associated with this message, which is always 'developer' for developer messages. */
  role: "developer";
  /** The contents of the developer message. */
  content: string;
}

/** A request chat message representing user input to the assistant. */
export interface ChatRequestUserMessage extends ChatRequestMessageParent {
  /** The chat role associated with this message, which is always 'user' for user messages. */
  role: "user";
  /** The contents of the user message, with available input types varying by selected model. */
  content: string | Array<ChatMessageContentItem>;
}

/** An abstract representation of a structured content item within a chat message. */
export interface ChatMessageContentItemParent {
  type: string;
}

/** A structured chat content item containing plain text. */
export interface ChatMessageTextContentItem
  extends ChatMessageContentItemParent {
  /** The discriminated object type: always 'text' for this type. */
  type: "text";
  /** The content of the message. */
  text: string;
}

/** A structured chat content item containing an image reference. */
export interface ChatMessageImageContentItem
  extends ChatMessageContentItemParent {
  /** The discriminated object type: always 'image_url' for this type. */
  type: "image_url";
  /** An internet location, which must be accessible to the model,from which the image may be retrieved. */
  image_url: ChatMessageImageUrl;
}

/** An internet location from which the model may retrieve an image. */
export interface ChatMessageImageUrl {
  /** The URL of the image. */
  url: string;
  /**
   * The evaluation quality setting to use, which controls relative prioritization of speed, token consumption, and
   * accuracy.
   *
   * Possible values: "auto", "low", "high"
   */
  detail?: ChatMessageImageDetailLevel;
}

/** A structured chat content item for audio content passed as a url. */
export interface ChatMessageAudioUrlContentItem
  extends ChatMessageContentItemParent {
  /** The discriminated object type: always 'audio_url' for this type. */
  type: "audio_url";
  /** The details of the audio url. */
  audio_url: ChatMessageInputAudioUrl;
}

/** The details of the audio url. */
export interface ChatMessageInputAudioUrl {
  /** The URL of the audio content. */
  url: string;
}

/** A structured chat content item for audio content passed as base64 encoded data. */
export interface ChatMessageAudioDataContentItem
  extends ChatMessageContentItemParent {
  /** The discriminated object type: always 'input_audio' for this type. */
  type: "input_audio";
  /** The details of the input audio data. */
  input_audio: ChatMessageInputAudio;
}

/** The details of the input audio data. */
export interface ChatMessageInputAudio {
  /** Base64 encoded audio data */
  data: string;
  /**
   * The audio format of the audio content.
   *
   * Possible values: "wav", "mp3"
   */
  format: AudioContentFormat;
}

/** A request chat message representing response or action from the assistant. */
export interface ChatRequestAssistantMessage extends ChatRequestMessageParent {
  /** The chat role associated with this message, which is always 'assistant' for assistant messages. */
  role: "assistant";
  /** The content of the message. */
  content?: string;
  /**
   * The tool calls that must be resolved and have their outputs appended to subsequent input messages for the chat
   * completions request to resolve as configured.
   */
  tool_calls?: Array<ChatCompletionsToolCall>;
}

/** A function tool call requested by the AI model. */
export interface ChatCompletionsToolCall {
  /** The ID of the tool call. */
  id: string;
  /** The type of tool call. Currently, only `function` is supported. */
  type: "function";
  /** The details of the function call requested by the AI model. */
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
export interface ChatRequestToolMessage extends ChatRequestMessageParent {
  /** The chat role associated with this message, which is always 'tool' for tool messages. */
  role: "tool";
  /** The content of the message. */
  content?: string;
  /** The ID of the tool call resolved by the provided content. */
  tool_call_id: string;
}

/**
 * Represents the format that the model must output. Use this to enable JSON mode instead of the default text mode.
 * Note that to enable JSON mode, some AI models may also require you to instruct the model to produce JSON
 * via a system or user message.
 */
export interface ChatCompletionsResponseFormatParent {
  type: string;
}

/** A response format for Chat Completions that emits text responses. This is the default response format. */
export interface ChatCompletionsResponseFormatText
  extends ChatCompletionsResponseFormatParent {
  /** Response format type: always 'text' for this object. */
  type: "text";
}

/**
 * A response format for Chat Completions that restricts responses to emitting valid JSON objects.
 * Note that to enable JSON mode, some AI models may also require you to instruct the model to produce JSON
 * via a system or user message.
 */
export interface ChatCompletionsResponseFormatJsonObject
  extends ChatCompletionsResponseFormatParent {
  /** Response format type: always 'json_object' for this object. */
  type: "json_object";
}

/**
 * A response format for Chat Completions that restricts responses to emitting valid JSON objects, with a
 * JSON schema specified by the caller.
 */
export interface ChatCompletionsResponseFormatJsonSchema
  extends ChatCompletionsResponseFormatParent {
  /** The type of response format being defined: `json_schema` */
  type: "json_schema";
  /** The definition of the required JSON schema in the response, and associated metadata. */
  json_schema: ChatCompletionsResponseFormatJsonSchemaDefinition;
}

/**
 * Defines the response format for chat completions as JSON with a given schema.
 * The AI model will need to adhere to this schema when generating completions.
 */
export interface ChatCompletionsResponseFormatJsonSchemaDefinition {
  /** A name that labels this JSON schema. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64. */
  name: string;
  /**
   * The definition of the JSON schema. See https://json-schema.org/overview/what-is-jsonschema.
   * Note that AI models usually only support a subset of the keywords defined by JSON schema.
   * Consult your AI model documentation to determine what is supported.
   */
  schema: Record<string, unknown>;
  /** A description of the response format, used by the AI model to determine how to generate responses in this format. */
  description?: string;
  /**
   * If set to true, the service will error out if the provided JSON schema contains keywords
   * not supported by the AI model. An example of such keyword may be `maxLength` for JSON type `string`.
   * If false, and the provided JSON schema contains keywords not supported by the AI model,
   * the AI model will not error out. Instead it will ignore the unsupported keywords.
   */
  strict?: boolean;
}

/** The definition of a chat completions tool that can call a function. */
export interface ChatCompletionsToolDefinition {
  /** The type of the tool. Currently, only `function` is supported. */
  type: "function";
  /** The function definition details for the function tool. */
  function: FunctionDefinition;
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
  /** The parameters the function accepts, described as a JSON Schema object. */
  parameters?: Record<string, unknown>;
}

/** A tool selection of a specific, named function tool that will limit chat completions to using the named function. */
export interface ChatCompletionsNamedToolChoice {
  /** The type of the tool. Currently, only `function` is supported. */
  type: "function";
  /** The function that should be called. */
  function: ChatCompletionsNamedToolChoiceFunction;
}

/** A tool selection of a specific, named function tool that will limit chat completions to using the named function. */
export interface ChatCompletionsNamedToolChoiceFunction {
  /** The name of the function that should be called. */
  name: string;
}

/** The configuration information for an embeddings request. */
export interface EmbeddingsOptions extends Record<string, unknown> {
  /**
   * Input text to embed, encoded as a string or array of tokens.
   * To embed multiple inputs in a single request, pass an array
   * of strings or array of token arrays.
   */
  input: string[];
  /**
   * Optional. The number of dimensions the resulting output embeddings should have.
   * Passing null causes the model to use its default value.
   * Returns a 422 error if the model doesn't support the value or parameter.
   */
  dimensions?: number;
  /**
   * Optional. The desired format for the returned embeddings.
   *
   * Possible values: "base64", "binary", "float", "int8", "ubinary", "uint8"
   */
  encoding_format?: EmbeddingEncodingFormat;
  /**
   * Optional. The type of the input.
   * Returns a 422 error if the model doesn't support the value or parameter.
   *
   * Possible values: "text", "query", "document"
   */
  input_type?: EmbeddingInputType;
  /** ID of the specific AI model to use, if more than one model is available on the endpoint. */
  model?: string;
}

/** The configuration information for an image embeddings request. */
export interface ImageEmbeddingsOptions extends Record<string, unknown> {
  /**
   * Input image to embed. To embed multiple inputs in a single request, pass an array.
   * The input must not exceed the max input tokens for the model.
   */
  input: Array<ImageEmbeddingInput>;
  /**
   * Optional. The number of dimensions the resulting output embeddings should have.
   * Passing null causes the model to use its default value.
   * Returns a 422 error if the model doesn't support the value or parameter.
   */
  dimensions?: number;
  /**
   * Optional. The number of dimensions the resulting output embeddings should have.
   * Passing null causes the model to use its default value.
   * Returns a 422 error if the model doesn't support the value or parameter.
   *
   * Possible values: "base64", "binary", "float", "int8", "ubinary", "uint8"
   */
  encoding_format?: EmbeddingEncodingFormat;
  /**
   * Optional. The type of the input.
   * Returns a 422 error if the model doesn't support the value or parameter.
   *
   * Possible values: "text", "query", "document"
   */
  input_type?: EmbeddingInputType;
  /** ID of the specific AI model to use, if more than one model is available on the endpoint. */
  model?: string;
}

/** Represents an image with optional text. */
export interface ImageEmbeddingInput {
  /** The input image encoded in base64 string as a data URL. Example: `data:image/{format};base64,{data}`. */
  image: string;
  /**
   * Optional. The text input to feed into the model (like DINO, CLIP).
   * Returns a 422 error if the model doesn't support the value or parameter.
   */
  text?: string;
}

/** An abstract representation of a chat message as provided in a request. */
export type ChatRequestMessage =
  | ChatRequestMessageParent
  | ChatRequestSystemMessage
  | ChatRequestDeveloperMessage
  | ChatRequestUserMessage
  | ChatRequestAssistantMessage
  | ChatRequestToolMessage;
/** An abstract representation of a structured content item within a chat message. */
export type ChatMessageContentItem =
  | ChatMessageContentItemParent
  | ChatMessageTextContentItem
  | ChatMessageImageContentItem
  | ChatMessageAudioUrlContentItem
  | ChatMessageAudioDataContentItem;
/**
 * Represents the format that the model must output. Use this to enable JSON mode instead of the default text mode.
 * Note that to enable JSON mode, some AI models may also require you to instruct the model to produce JSON
 * via a system or user message.
 */
export type ChatCompletionsResponseFormat =
  | ChatCompletionsResponseFormatParent
  | ChatCompletionsResponseFormatText
  | ChatCompletionsResponseFormatJsonObject
  | ChatCompletionsResponseFormatJsonSchema;
/** Alias for ExtraParameters */
export type ExtraParameters = string;
/** Alias for ChatRole */
export type ChatRole = string;
/** Alias for ChatMessageImageDetailLevel */
export type ChatMessageImageDetailLevel = string;
/** Alias for AudioContentFormat */
export type AudioContentFormat = string;
/** Alias for ChatCompletionsToolChoicePreset */
export type ChatCompletionsToolChoicePreset = string;
/** Alias for EmbeddingEncodingFormat */
export type EmbeddingEncodingFormat = string;
/** Alias for EmbeddingInputType */
export type EmbeddingInputType = string;
