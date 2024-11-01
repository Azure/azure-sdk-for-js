// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Paged } from "@azure/core-paging";
import { ErrorResponse } from "@azure-rest/core-client";

/** The session code execution resource. */
export interface SessionCodeExecutionResourceOutput {
  /** Session code execution id. */
  readonly id: string;
  /** The identifier of the session. */
  identifier: string;
  /**
   * The execution type of the code execution request.
   *
   * Possible values: "Synchronous", "Asynchronous"
   */
  executionType: ExecutionTypeOutput;
  /**
   * The status of the code execution operation, indicates whether succeeded or not.
   *
   * Possible values: "NotStarted", "Running", "Succeeded", "Failed", "Canceled"
   */
  status: OperationStateOutput;
  /** The error of this code execution if failed. */
  error?: ErrorResponse;
  /** The result of this code execution operation. */
  result?: SessionCodeExecutionResultOutput;
}

/** The result of the code execution. */
export interface SessionCodeExecutionResultOutput {
  /** The standard output of the code execution. */
  stdout?: string;
  /** The standard error of the code execution. */
  stderr?: string;
  /** The result of the code execution. The type of this field is same as the type of actual result of the code execution after being Json serialized. */
  executionResult?: any;
  /** The execution time of the code in milliseconds. */
  executionTimeInMilliseconds?: number;
}

/** Code execution file resource. */
export interface SessionResourceFileOutput {
  /** The name of the file. */
  name: string;
  /** The type of the session resource file. */
  type: string;
  /** The type of the content of this file. */
  contentType?: string;
  /** The size of the file. */
  sizeInBytes?: number;
  /** The date time in RFC3339 format when the file was last modified. */
  lastModifiedAt: string;
}

/** Alias for ExecutionTypeOutput */
export type ExecutionTypeOutput = string;
/** Alias for OperationStateOutput */
export type OperationStateOutput = string;
/** Paged collection of SessionResourceFile items */
export type PagedSessionResourceFileOutput = Paged<SessionResourceFileOutput>;
