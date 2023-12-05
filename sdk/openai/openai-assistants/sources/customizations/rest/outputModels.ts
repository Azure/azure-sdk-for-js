// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  FunctionDefinitionOutput
} from "../../generated/src/rest/outputModels.js";

/** An abstract representation of an input tool definition that an assistant can use. */
export interface ToolDefinitionOutput {
  type: string;
  function?: FunctionDefinitionOutput;
}

/** The input definition information for a code interpreter tool as used to configure an assistant. */
export interface CodeInterpreterToolDefinitionOutput
  extends ToolDefinitionOutput {
  /** The object type, which is always 'code_interpreter'. */
  type: "code_interpreter";
}

/** The input definition information for a retrieval tool as used to configure an assistant. */
export interface RetrievalToolDefinitionOutput
  extends ToolDefinitionOutput {
  /** The object type, which is always 'retrieval'. */
  type: "retrieval";
}

/** The input definition information for a function tool as used to configure an assistant. */
export interface FunctionToolDefinitionOutput
  extends ToolDefinitionOutput {
  /** The object type, which is always 'function'. */
  type: "function";
  /** The definition of the concrete function that the function tool should call. */
  function: FunctionDefinitionOutput;
}
