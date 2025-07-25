// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ToolDefinitionUnion,
  ToolResources,
  AgentsResponseFormatOption,
  ThreadMessageOptions,
  TruncationObject,
  AgentsToolChoiceOption,
  ToolOutput,
  ToolApproval,
  ListSortOrder,
  RunAdditionalFieldList,
} from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";
import type { PollingOptionsParams } from "../options.js";

/** Optional parameters. */
export interface RunsCancelRunOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RunsSubmitToolOutputsToRunOptionalParams extends OperationOptions {
  /** A list of tools for which the outputs are being submitted */
  toolOutputs?: ToolOutput[];
  /** A list of tool approvals allowing data to be sent to tools. */
  toolApprovals?: ToolApproval[];
  /** If true, returns a stream of events that happen during the Run as SSE, terminating at `[DONE]`. */
  stream?: boolean | null;
}

/** Optional parameters. */
export interface RunsUpdateRunOptionalParams extends OperationOptions {
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: Record<string, string> | null;
}

/** Optional parameters. */
export interface RunsGetRunOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RunsListRunsOptionalParams extends OperationOptions {
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
export interface RunsCreateRunOptionalParams extends OperationOptions, PollingOptionsParams {
  /**
   * A list of additional fields to include in the response.
   * Currently the only supported value is `step_details.tool_calls[*].file_search.results[*].content`
   * to fetch the file search result content.
   */
  include?: RunAdditionalFieldList[];
  /** The overridden model name that the agent should use to run the thread. */
  model?: string | null;
  /** The overridden system instructions that the agent should use to run the thread. */
  instructions?: string | null;
  /**
   * Additional instructions to append at the end of the instructions for the run. This is useful for modifying the behavior
   * on a per-run basis without overriding other instructions.
   */
  additionalInstructions?: string | null;
  /** Adds additional messages to the thread before creating the run. */
  additionalMessages?: ThreadMessageOptions[] | null;
  /** The overridden list of enabled tools that the agent should use to run the thread. */
  tools?: ToolDefinitionUnion[] | null;
  /** The overridden enabled tool resources that the agent should use to run the thread. */
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
   * The maximum number of completion tokens that may be used over the course of the run. The run will make a best effort
   * to use only the number of completion tokens specified, across multiple turns of the run. If the run exceeds the number of
   * completion tokens specified, the run will end with status `incomplete`. See `incomplete_details` for more info.
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
