// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  CodeExecutionExecuteParameters,
  CodeExecutionGetParameters,
  SessionResourceFilesListParameters,
  SessionResourceFilesUploadParameters,
  SessionResourceFilesGetParameters,
  SessionResourceFilesDeleteParameters,
  SessionResourceFilesGetContentParameters,
} from "./parameters.js";
import {
  CodeExecutionExecute202Response,
  CodeExecutionExecuteDefaultResponse,
  CodeExecutionGet200Response,
  CodeExecutionGetDefaultResponse,
  SessionResourceFilesList200Response,
  SessionResourceFilesListDefaultResponse,
  SessionResourceFilesUpload200Response,
  SessionResourceFilesUploadDefaultResponse,
  SessionResourceFilesGet200Response,
  SessionResourceFilesGetDefaultResponse,
  SessionResourceFilesDelete204Response,
  SessionResourceFilesDeleteDefaultResponse,
  SessionResourceFilesGetContent200Response,
  SessionResourceFilesGetContentDefaultResponse,
} from "./responses.js";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface CodeExecutionExecute {
  /** Execute code in a session. */
  post(
    options: CodeExecutionExecuteParameters,
  ): StreamableMethod<
    CodeExecutionExecute202Response | CodeExecutionExecuteDefaultResponse
  >;
}

export interface CodeExecutionGet {
  /** Get the code execution result. */
  get(
    options: CodeExecutionGetParameters,
  ): StreamableMethod<
    CodeExecutionGet200Response | CodeExecutionGetDefaultResponse
  >;
}

export interface SessionResourceFilesList {
  /** List the file resources. */
  get(
    options: SessionResourceFilesListParameters,
  ): StreamableMethod<
    | SessionResourceFilesList200Response
    | SessionResourceFilesListDefaultResponse
  >;
  /** Upload a file to a session. */
  post(
    options: SessionResourceFilesUploadParameters,
  ): StreamableMethod<
    | SessionResourceFilesUpload200Response
    | SessionResourceFilesUploadDefaultResponse
  >;
}

export interface SessionResourceFilesGet {
  /** Get the file resource. */
  get(
    options: SessionResourceFilesGetParameters,
  ): StreamableMethod<
    SessionResourceFilesGet200Response | SessionResourceFilesGetDefaultResponse
  >;
  /** Delete the file. */
  delete(
    options: SessionResourceFilesDeleteParameters,
  ): StreamableMethod<
    | SessionResourceFilesDelete204Response
    | SessionResourceFilesDeleteDefaultResponse
  >;
}

export interface SessionResourceFilesGetContent {
  /** Get the content of the file. */
  get(
    options: SessionResourceFilesGetContentParameters,
  ): StreamableMethod<
    | SessionResourceFilesGetContent200Response
    | SessionResourceFilesGetContentDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/executions' has methods for the following verbs: post */
  (path: "/executions"): CodeExecutionExecute;
  /** Resource for '/executions/\{executionId\}' has methods for the following verbs: get */
  (path: "/executions/{executionId}", executionId: string): CodeExecutionGet;
  /** Resource for '/files' has methods for the following verbs: get, post */
  (path: "/files"): SessionResourceFilesList;
  /** Resource for '/files/\{name\}' has methods for the following verbs: get, delete */
  (path: "/files/{name}", name: string): SessionResourceFilesGet;
  /** Resource for '/files/\{name\}/content' has methods for the following verbs: get */
  (path: "/files/{name}/content", name: string): SessionResourceFilesGetContent;
}

export type DynamicSessionsClient = Client & {
  path: Routes;
};
