// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** The request to execute code. */
export interface SessionCodeExecutionRequest {
  /**
   * The code input type of the code execution request.
   *
   * Possible values: "Inline", "InlineBase64", "InlineText"
   */
  codeInputType: CodeInputType;
  /**
   * The execution type of the code execution request.
   *
   * Possible values: "Synchronous", "Asynchronous"
   */
  executionType: ExecutionType;
  /** The string of the code to execute, based on CodeInputType. */
  code: string;
  /** Code execution timeout in seconds. */
  timeoutInSeconds: number;
}

/** Alias for CodeInputType */
export type CodeInputType = string;
/** Alias for ExecutionType */
export type ExecutionType = string;
