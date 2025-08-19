// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ToolDefinitionUnion,
  ToolResources,
  AgentsResponseFormatOption,
  AgentThreadCreationOptions,
  TruncationObject,
  AgentsToolChoiceOption,
  ListSortOrder,
} from "../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CreateThreadAndRunOptionalParams extends OperationOptions {
  /** The details used to create the new thread. If no thread is provided, an empty one will be created. */
  thread?: AgentThreadCreationOptions;
  /** The overridden model that the agent should use to run the thread. */
  model?: string | null;
  /** The overridden system instructions the agent should use to run the thread. */
  instructions?: string | null;
  /** The overridden list of enabled tools the agent should use to run the thread. */
  tools?: ToolDefinitionUnion[] | null;
  /** Override the tools the agent can use for this run. This is useful for modifying the behavior on a per-run basis */
  toolResources?: ToolResources | null;
  /**
   * If `true`, returns a stream of events that happen during the Run as server-sent events,
   * terminating when the Run enters a terminal state with a `data: [DONE]` message.
   */
  stream?: boolean;
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output
   * more random, while lower values like 0.2 will make it more focused and deterministic.
   */
  temperature?: number | null;
  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the model
   * considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens
   * comprising the top 10% probability mass are considered.
   *
   * We generally recommend altering this or temperature but not both.
   */
  topP?: number | null;
  /**
   * The maximum number of prompt tokens that may be used over the course of the run. The run will make a best effort to use only
   * the number of prompt tokens specified, across multiple turns of the run. If the run exceeds the number of prompt tokens specified,
   * the run will end with status `incomplete`. See `incomplete_details` for more info.
   */
  maxPromptTokens?: number | null;
  /**
   * The maximum number of completion tokens that may be used over the course of the run. The run will make a best effort to use only
   * the number of completion tokens specified, across multiple turns of the run. If the run exceeds the number of completion tokens
   * specified, the run will end with status `incomplete`. See `incomplete_details` for more info.
   */
  maxCompletionTokens?: number | null;
  /** The strategy to use for dropping messages as the context windows moves forward. */
  truncationStrategy?: TruncationObject | null;
  /** Controls whether or not and which tool is called by the model. */
  toolChoice?: AgentsToolChoiceOption | null;
  /** Specifies the format that the model must output. */
  responseFormat?: AgentsResponseFormatOption | null;
  /** If `true` functions will run in parallel during tool use. */
  parallelToolCalls?: boolean;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: Record<string, string> | null;
}

/** Optional parameters. */
export interface DeleteAgentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface UpdateAgentOptionalParams extends OperationOptions {
  /** The ID of the model to use. */
  model?: string;
  /** The modified name for the agent to use. */
  name?: string | null;
  /** The modified description for the agent to use. */
  description?: string | null;
  /** The modified system instructions for the new agent to use. */
  instructions?: string | null;
  /** The modified collection of tools to enable for the agent. */
  tools?: ToolDefinitionUnion[];
  /**
   * A set of resources that are used by the agent's tools. The resources are specific to the type of tool. For example,
   * the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.
   */
  toolResources?: ToolResources;
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random,
   * while lower values like 0.2 will make it more focused and deterministic.
   */
  temperature?: number | null;
  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass.
   * So 0.1 means only the tokens comprising the top 10% probability mass are considered.
   *
   * We generally recommend altering this or temperature but not both.
   */
  topP?: number | null;
  /** The response format of the tool calls used by this agent. */
  responseFormat?: AgentsResponseFormatOption | null;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: Record<string, string> | null;
}

/** Optional parameters. */
export interface GetAgentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ListAgentsOptionalParams extends OperationOptions {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /** Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order. */
  order?: ListSortOrder;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}

/** Optional parameters. */
export interface CreateAgentOptionalParams extends OperationOptions {
  /** The name of the new agent. */
  name?: string | null;
  /** The description of the new agent. */
  description?: string | null;
  /** The system instructions for the new agent to use. */
  instructions?: string | null;
  /** The collection of tools to enable for the new agent. */
  tools?: ToolDefinitionUnion[];
  /**
   * A set of resources that are used by the agent's tools. The resources are specific to the type of tool. For example, the `code_interpreter`
   * tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.
   */
  toolResources?: ToolResources | null;
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random,
   * while lower values like 0.2 will make it more focused and deterministic.
   */
  temperature?: number | null;
  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass.
   * So 0.1 means only the tokens comprising the top 10% probability mass are considered.
   *
   * We generally recommend altering this or temperature but not both.
   */
  topP?: number | null;
  /** The response format of the tool calls used by this agent. */
  responseFormat?: AgentsResponseFormatOption | null;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: Record<string, string> | null;
}

/**
 * Optional parameters configuring polling behavior.
 */
export interface PollingOptionsParams {
  /** Options for configuring polling behavior. */
  pollingOptions?: PollingOptions;
}
/**
 * Options for configuring polling behavior.
 */
export interface PollingOptions {
  /**
   * The interval, in milliseconds, to wait between polling attempts. If not specified, a default interval of 1000ms will be used.
   */
  intervalInMs?: number;
  /**
   * A serialized poller which can be used to resume an existing paused Long-Running-Operation.
   */
  restoreFrom?: string;
}
