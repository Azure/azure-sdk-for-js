// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  FunctionDefinitionOutput,
  RequiredActionOutputParent,
  SubmitToolOutputsDetailsOutput,
} from "../../generated/src/rest/outputModels.js";

/** The details for required tool calls that must be submitted for an assistant thread run to continue. */
export interface SubmitToolOutputsActionOutput extends RequiredActionOutputParent {
  /** The object type, which is always 'submit_tool_outputs'. */
  type: "submit_tool_outputs";
  /** The details describing tools that should be called to submit tool outputs. */
  submit_tool_outputs: SubmitToolOutputsDetailsOutput;
}

/** An abstract representation of an input tool definition that an assistant can use. */
export interface ToolDefinitionOutput {
  type: string;
  function?: FunctionDefinitionOutput;
}

/** The input definition information for a code interpreter tool as used to configure an assistant. */
export interface CodeInterpreterToolDefinitionOutput extends ToolDefinitionOutput {
  /** The object type, which is always 'code_interpreter'. */
  type: "code_interpreter";
}

/** The input definition information for a retrieval tool as used to configure an assistant. */
export interface RetrievalToolDefinitionOutput extends ToolDefinitionOutput {
  /** The object type, which is always 'retrieval'. */
  type: "retrieval";
}

/** The input definition information for a function tool as used to configure an assistant. */
export interface FunctionToolDefinitionOutput extends ToolDefinitionOutput {
  /** The object type, which is always 'function'. */
  type: "function";
  /** The definition of the concrete function that the function tool should call. */
  function: FunctionDefinitionOutput;
}

/** The response data for a requested list of items. */
export interface ListResponseOfOutput<T> {
  /** The requested list of items. */
  data: T[];
  /** The first ID represented in this list. */
  first_id: string;
  /** The last ID represented in this list. */
  last_id: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

export interface OpenAIPageableListOfOutput {}
