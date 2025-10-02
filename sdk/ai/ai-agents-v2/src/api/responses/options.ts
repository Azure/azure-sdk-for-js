// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  Reasoning,
  ToolUnion,
  ResponseTextFormatConfigurationUnion,
  ItemParamUnion,
  ToolChoiceObjectUnion,
  Prompt,
  ImplicitUserMessage,
  AgentReference,
  ServiceTier,
  ToolChoiceOptions,
  Includable,
} from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ResponsesListResponsesOptionalParams extends OperationOptions {
  /**
   * A limit on the number of objects to be returned. Limit can range between 1 and 100, and the
   * default is 20.
   */
  limit?: number;
  /**
   * Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and`desc`
   * for descending order.
   */
  order?: "asc" | "desc";
  /**
   * A cursor for use in pagination. `after` is an object ID that defines your place in the list.
   * For instance, if you make a list request and receive 100 objects, ending with obj_foo, your
   * subsequent call can include after=obj_foo in order to fetch the next page of the list.
   */
  after?: string;
  /**
   * A cursor for use in pagination. `before` is an object ID that defines your place in the list.
   * For instance, if you make a list request and receive 100 objects, ending with obj_foo, your
   * subsequent call can include before=obj_foo in order to fetch the previous page of the list.
   */
  before?: string;
  /** Filter by agent name. If provided, only items associated with the specified agent will be returned. */
  agentName?: string;
  /** Filter by agent ID in the format `name:version`. If provided, only items associated with the specified agent ID will be returned. */
  agentId?: string;
  /** Filter by conversation ID. If provided, only responses associated with the specified conversation will be returned. */
  conversationId?: string;
}

/** Optional parameters. */
export interface ResponsesListInputItemsOptionalParams
  extends OperationOptions {
  /**
   * A limit on the number of objects to be returned. Limit can range between 1 and 100, and the
   * default is 20.
   */
  limit?: number;
  /**
   * Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and`desc`
   * for descending order.
   */
  order?: "asc" | "desc";
  /**
   * A cursor for use in pagination. `after` is an object ID that defines your place in the list.
   * For instance, if you make a list request and receive 100 objects, ending with obj_foo, your
   * subsequent call can include after=obj_foo in order to fetch the next page of the list.
   */
  after?: string;
  /**
   * A cursor for use in pagination. `before` is an object ID that defines your place in the list.
   * For instance, if you make a list request and receive 100 objects, ending with obj_foo, your
   * subsequent call can include before=obj_foo in order to fetch the previous page of the list.
   */
  before?: string;
}

/** Optional parameters. */
export interface ResponsesCancelResponseOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface ResponsesDeleteResponseOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface ResponsesGetResponseStreamOptionalParams
  extends OperationOptions {
  includables?: Includable[];
  /** The sequence number of the event after which to start streaming. */
  startingAfter?: number;
}

/** Optional parameters. */
export interface ResponsesGetResponseOptionalParams extends OperationOptions {
  includables?: Includable[];
  stream?: boolean;
  startingAfter?: number;
}

/** Optional parameters. */
export interface ResponsesCreateResponseStreamOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface ResponsesCreateResponseOptionalParams
  extends OperationOptions {
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata?: Record<string, string>;
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
   * We generally recommend altering this or `top_p` but not both.
   */
  temperature?: number | null;
  /**
   * An alternative to sampling with temperature, called nucleus sampling,
   * where the model considers the results of the tokens with top_p probability
   * mass. So 0.1 means only the tokens comprising the top 10% probability mass
   * are considered.
   *
   * We generally recommend altering this or `temperature` but not both.
   */
  topP?: number | null;
  /** A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices#end-user-ids). */
  user?: string;
  /** Note: service_tier is not applicable to Azure OpenAI. */
  serviceTier?: ServiceTier;
  /** An integer between 0 and 20 specifying the number of most likely tokens to return at each token position, each with an associated log probability. */
  topLogprobs?: number;
  /**
   * The unique ID of the previous response to the model. Use this to
   * create multi-turn conversations. Learn more about
   * [conversation state](/docs/guides/conversation-state).
   */
  previousResponseId?: string | null;
  /** The model deployment to use for the creation of this response. */
  model?: string;
  reasoning?: Reasoning | null;
  /**
   * Whether to run the model response in the background.
   * [Learn more](/docs/guides/background).
   */
  background?: boolean | null;
  /** An upper bound for the number of tokens that can be generated for a response, including visible output tokens and [reasoning tokens](/docs/guides/reasoning). */
  maxOutputTokens?: number | null;
  /** The maximum number of total calls to built-in tools that can be processed in a response. This maximum number applies across all built-in tool calls, not per individual tool. Any further attempts to call a tool by the model will be ignored. */
  maxToolCalls?: number | null;
  /**
   * Configuration options for a text response from the model. Can be plain
   * text or structured JSON data. Learn more:
   * - [Text inputs and outputs](/docs/guides/text)
   * - [Structured Outputs](/docs/guides/structured-outputs)
   */
  text?: {
    format?: ResponseTextFormatConfigurationUnion;
  };
  /**
   * An array of tools the model may call while generating a response. You
   * can specify which tool to use by setting the `tool_choice` parameter.
   *
   * The two categories of tools you can provide the model are:
   *
   * - **Built-in tools**: Tools that are provided by OpenAI that extend the
   *   model's capabilities, like file search.
   * - **Function calls (custom tools)**: Functions that are defined by you,
   *   enabling the model to call your own code.
   */
  tools?: ToolUnion[];
  /**
   * How the model should select which tool (or tools) to use when generating
   * a response. See the `tools` parameter to see how to specify which tools
   * the model can call.
   */
  toolChoice?: ToolChoiceOptions | ToolChoiceObjectUnion;
  prompt?: Prompt | null;
  /**
   * The truncation strategy to use for the model response.
   * - `auto`: If the context of this response and previous ones exceeds
   *   the model's context window size, the model will truncate the
   *   response to fit the context window by dropping input items in the
   *   middle of the conversation.
   * - `disabled` (default): If a model response will exceed the context window
   *   size for a model, the request will fail with a 400 error.
   */
  truncation?: ("auto" | "disabled") | null;
  /**
   * Text, image, or file inputs to the model, used to generate a response.
   *
   * Learn more:
   * - [Text inputs and outputs](/docs/guides/text)
   * - [Image inputs](/docs/guides/images)
   * - [File inputs](/docs/guides/pdf-files)
   * - [Conversation state](/docs/guides/conversation-state)
   * - [Function calling](/docs/guides/function-calling)
   */
  input?: string | (ImplicitUserMessage | ItemParamUnion)[];
  /**
   * Specify additional output data to include in the model response. Currently
   * supported values are:
   * - `code_interpreter_call.outputs`: Includes the outputs of python code execution
   *   in code interpreter tool call items.
   * - `computer_call_output.output.image_url`: Include image urls from the computer call output.
   * - `file_search_call.results`: Include the search results of
   *   the file search tool call.
   * - `message.input_image.image_url`: Include image urls from the input message.
   * - `message.output_text.logprobs`: Include logprobs with assistant messages.
   * - `reasoning.encrypted_content`: Includes an encrypted version of reasoning
   *   tokens in reasoning item outputs. This enables reasoning items to be used in
   *   multi-turn conversations when using the Responses API statelessly (like
   *   when the `store` parameter is set to `false`, or when an organization is
   *   enrolled in the zero data retention program).
   */
  include?: Includable[] | null;
  /** Whether to allow the model to run tool calls in parallel. */
  parallelToolCalls?: boolean | null;
  /**
   * Whether to store the generated model response for later retrieval via
   * API.
   */
  store?: boolean | null;
  /**
   * A system (or developer) message inserted into the model's context.
   *
   * When using along with `previous_response_id`, the instructions from a previous
   * response will not be carried over to the next response. This makes it simple
   * to swap out system (or developer) messages in new responses.
   */
  instructions?: string | null;
  /**
   * If set to true, the model response data will be streamed to the client
   * as it is generated using [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format).
   * See the [Streaming section below](/docs/api-reference/responses-streaming)
   * for more information.
   */
  stream?: boolean | null;
  conversation?:
    | string
    | {
        id: string;
      };
  /** The agent to use for generating the response. */
  agent?: AgentReference;
}
