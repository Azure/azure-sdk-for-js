// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import { RequestParameters } from "@azure-rest/core-client";
import { SessionCodeExecutionRequest } from "./models.js";

export interface CodeExecutionExecuteHeaders {
  /** The id of this execution operation. */
  "operation-id"?: string;
}

export interface CodeExecutionExecuteBodyParam {
  /** The request to execute code. */
  body: SessionCodeExecutionRequest;
}

export interface CodeExecutionExecuteQueryParamProperties {
  /** The user-assigned identifier of the session. */
  identifier: string;
}

export interface CodeExecutionExecuteQueryParam {
  queryParameters: CodeExecutionExecuteQueryParamProperties;
}

export interface CodeExecutionExecuteHeaderParam {
  headers?: RawHttpHeadersInput & CodeExecutionExecuteHeaders;
}

export type CodeExecutionExecuteParameters = CodeExecutionExecuteQueryParam &
  CodeExecutionExecuteHeaderParam &
  CodeExecutionExecuteBodyParam &
  RequestParameters;

export interface CodeExecutionGetQueryParamProperties {
  /** The user-assigned identifier of the session. */
  identifier: string;
}

export interface CodeExecutionGetQueryParam {
  queryParameters: CodeExecutionGetQueryParamProperties;
}

export type CodeExecutionGetParameters = CodeExecutionGetQueryParam &
  RequestParameters;

export interface SessionResourceFilesListQueryParamProperties {
  /** The user-assigned identifier of the session. */
  identifier: string;
  /** The path of the file after uploaded. */
  path?: string;
}

export interface SessionResourceFilesListQueryParam {
  queryParameters: SessionResourceFilesListQueryParamProperties;
}

export type SessionResourceFilesListParameters =
  SessionResourceFilesListQueryParam & RequestParameters;

export interface SessionResourceFilesGetQueryParamProperties {
  /** The user-assigned identifier of the session. */
  identifier: string;
  /** The path of the file after uploaded. */
  path?: string;
}

export interface SessionResourceFilesGetQueryParam {
  queryParameters: SessionResourceFilesGetQueryParamProperties;
}

export type SessionResourceFilesGetParameters =
  SessionResourceFilesGetQueryParam & RequestParameters;

export interface SessionResourceFilesDeleteQueryParamProperties {
  /** The user-assigned identifier of the session. */
  identifier: string;
  /** The path of the file after uploaded. */
  path?: string;
}

export interface SessionResourceFilesDeleteQueryParam {
  queryParameters: SessionResourceFilesDeleteQueryParamProperties;
}

export type SessionResourceFilesDeleteParameters =
  SessionResourceFilesDeleteQueryParam & RequestParameters;

export interface SessionResourceFilesUploadBodyParam {
  body:
    | FormData
    | Array<{
        name: "file";
        body:
          | string
          | Uint8Array
          | ReadableStream<Uint8Array>
          | NodeJS.ReadableStream
          | File;
        filename?: string;
        contentType?: string;
      }>;
}

export interface SessionResourceFilesUploadQueryParamProperties {
  /** The user-assigned identifier of the session. */
  identifier: string;
  /** The path of the file after uploaded. */
  path?: string;
}

export interface SessionResourceFilesUploadQueryParam {
  queryParameters: SessionResourceFilesUploadQueryParamProperties;
}

export interface SessionResourceFilesUploadMediaTypesParam {
  /** The content type for the operation. Always multipart/form-data for this operation. */
  contentType: "multipart/form-data";
}

export type SessionResourceFilesUploadParameters =
  SessionResourceFilesUploadQueryParam &
    SessionResourceFilesUploadMediaTypesParam &
    SessionResourceFilesUploadBodyParam &
    RequestParameters;

export interface SessionResourceFilesGetContentQueryParamProperties {
  /** The user-assigned identifier of the session. */
  identifier: string;
  /** The path of the file after uploaded. */
  path?: string;
}

export interface SessionResourceFilesGetContentQueryParam {
  queryParameters: SessionResourceFilesGetContentQueryParamProperties;
}

export type SessionResourceFilesGetContentParameters =
  SessionResourceFilesGetContentQueryParam & RequestParameters;
