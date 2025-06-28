// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import type {
  AgentOutput,
  AgentsPagedResultAgentOutput,
  AgentDeletionStatusOutput,
  ThreadRunOutput,
  AgentThreadOutput,
  AgentsPagedResultAgentThreadOutput,
  ThreadDeletionStatusOutput,
  ThreadMessageOutput,
  AgentsPagedResultThreadMessageOutput,
  AgentsPagedResultThreadRunOutput,
  RunStepOutput,
  AgentsPagedResultRunStepOutput,
  FileListResponseOutput,
  FileInfoOutput,
  FileDeletionStatusOutput,
  AgentsPagedResultVectorStoreOutput,
  VectorStoreOutput,
  VectorStoreDeletionStatusOutput,
  AgentsPagedResultVectorStoreFileOutput,
  VectorStoreFileOutput,
  VectorStoreFileDeletionStatusOutput,
  VectorStoreFileBatchOutput,
} from "./outputModels.js";

/** The new agent instance. */
export interface CreateAgent200Response extends HttpResponse {
  status: "200";
  body: AgentOutput;
}

export interface CreateAgentDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreateAgentDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CreateAgentDefaultHeaders;
}

/** The requested list of agents. */
export interface ListAgents200Response extends HttpResponse {
  status: "200";
  body: AgentsPagedResultAgentOutput;
}

/** The requested agent instance. */
export interface GetAgent200Response extends HttpResponse {
  status: "200";
  body: AgentOutput;
}

export interface GetAgentDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetAgentDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetAgentDefaultHeaders;
}

/** The updated agent instance. */
export interface UpdateAgent200Response extends HttpResponse {
  status: "200";
  body: AgentOutput;
}

export interface UpdateAgentDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface UpdateAgentDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & UpdateAgentDefaultHeaders;
}

/** Status information about the requested deletion operation. */
export interface DeleteAgent200Response extends HttpResponse {
  status: "200";
  body: AgentDeletionStatusOutput;
}

export interface DeleteAgentDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteAgentDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeleteAgentDefaultHeaders;
}

/** Information about the newly created thread run. */
export interface CreateThreadAndRun200Response extends HttpResponse {
  status: "200";
  body: ThreadRunOutput;
}

export interface CreateThreadAndRunDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreateThreadAndRunDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CreateThreadAndRunDefaultHeaders;
}

/** Information about the newly created thread. */
export interface CreateThread200Response extends HttpResponse {
  status: "200";
  body: AgentThreadOutput;
}

export interface CreateThreadDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreateThreadDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CreateThreadDefaultHeaders;
}

/** The requested list of threads. */
export interface ListThreads200Response extends HttpResponse {
  status: "200";
  body: AgentsPagedResultAgentThreadOutput;
}

/** Information about the requested thread. */
export interface GetThread200Response extends HttpResponse {
  status: "200";
  body: AgentThreadOutput;
}

export interface GetThreadDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetThreadDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetThreadDefaultHeaders;
}

/** Information about the modified thread. */
export interface UpdateThread200Response extends HttpResponse {
  status: "200";
  body: AgentThreadOutput;
}

export interface UpdateThreadDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface UpdateThreadDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & UpdateThreadDefaultHeaders;
}

/** Status information about the requested thread deletion operation. */
export interface DeleteThread200Response extends HttpResponse {
  status: "200";
  body: ThreadDeletionStatusOutput;
}

export interface DeleteThreadDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteThreadDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeleteThreadDefaultHeaders;
}

/** A representation of the new message. */
export interface CreateMessage200Response extends HttpResponse {
  status: "200";
  body: ThreadMessageOutput;
}

export interface CreateMessageDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreateMessageDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CreateMessageDefaultHeaders;
}

/** The requested list of messages. */
export interface ListMessages200Response extends HttpResponse {
  status: "200";
  body: AgentsPagedResultThreadMessageOutput;
}

/** A representation of the requested message. */
export interface GetMessage200Response extends HttpResponse {
  status: "200";
  body: ThreadMessageOutput;
}

export interface GetMessageDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetMessageDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetMessageDefaultHeaders;
}

/** A representation of the modified message. */
export interface UpdateMessage200Response extends HttpResponse {
  status: "200";
  body: ThreadMessageOutput;
}

export interface UpdateMessageDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface UpdateMessageDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & UpdateMessageDefaultHeaders;
}

/** Information about the new thread run. */
export interface CreateRun200Response extends HttpResponse {
  status: "200";
  body: ThreadRunOutput;
}

export interface CreateRunDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreateRunDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CreateRunDefaultHeaders;
}

/** The requested list of thread runs. */
export interface ListRuns200Response extends HttpResponse {
  status: "200";
  body: AgentsPagedResultThreadRunOutput;
}

/** The requested information about the specified thread run. */
export interface GetRun200Response extends HttpResponse {
  status: "200";
  body: ThreadRunOutput;
}

export interface GetRunDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetRunDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetRunDefaultHeaders;
}

/** Information about the modified run. */
export interface UpdateRun200Response extends HttpResponse {
  status: "200";
  body: ThreadRunOutput;
}

export interface UpdateRunDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface UpdateRunDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & UpdateRunDefaultHeaders;
}

/** Updated information about the run. */
export interface SubmitToolOutputsToRun200Response extends HttpResponse {
  status: "200";
  body: ThreadRunOutput;
}

export interface SubmitToolOutputsToRunDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface SubmitToolOutputsToRunDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & SubmitToolOutputsToRunDefaultHeaders;
}

/** Updated information about the cancelled run. */
export interface CancelRun200Response extends HttpResponse {
  status: "200";
  body: ThreadRunOutput;
}

export interface CancelRunDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CancelRunDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CancelRunDefaultHeaders;
}

/** The request has succeeded. */
export interface GetRunStep200Response extends HttpResponse {
  status: "200";
  body: RunStepOutput;
}

export interface GetRunStepDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetRunStepDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetRunStepDefaultHeaders;
}

/** The requested list of run steps. */
export interface ListRunSteps200Response extends HttpResponse {
  status: "200";
  body: AgentsPagedResultRunStepOutput;
}

/** The requested list of files. */
export interface ListFiles200Response extends HttpResponse {
  status: "200";
  body: FileListResponseOutput;
}

export interface ListFilesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListFilesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListFilesDefaultHeaders;
}

/** A representation of the uploaded file. */
export interface UploadFile200Response extends HttpResponse {
  status: "200";
  body: FileInfoOutput;
}

export interface UploadFileDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface UploadFileDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & UploadFileDefaultHeaders;
}

/** Status of the deletion operation. */
export interface DeleteFile200Response extends HttpResponse {
  status: "200";
  body: FileDeletionStatusOutput;
}

export interface DeleteFileDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteFileDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeleteFileDefaultHeaders;
}

/** The request has succeeded. */
export interface GetFile200Response extends HttpResponse {
  status: "200";
  body: FileInfoOutput;
}

export interface GetFileDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetFileDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetFileDefaultHeaders;
}

/** The request has succeeded. */
export interface GetFileContent200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
}

export interface GetFileContentDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetFileContentDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetFileContentDefaultHeaders;
}

/** The request has succeeded. */
export interface ListVectorStores200Response extends HttpResponse {
  status: "200";
  body: AgentsPagedResultVectorStoreOutput;
}

/** The request has succeeded. */
export interface CreateVectorStore200Response extends HttpResponse {
  status: "200";
  body: VectorStoreOutput;
}

export interface CreateVectorStoreDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreateVectorStoreDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CreateVectorStoreDefaultHeaders;
}

/** The request has succeeded. */
export interface GetVectorStore200Response extends HttpResponse {
  status: "200";
  body: VectorStoreOutput;
}

export interface GetVectorStoreDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetVectorStoreDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetVectorStoreDefaultHeaders;
}

/** The request has succeeded. */
export interface ModifyVectorStore200Response extends HttpResponse {
  status: "200";
  body: VectorStoreOutput;
}

export interface ModifyVectorStoreDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ModifyVectorStoreDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ModifyVectorStoreDefaultHeaders;
}

/** The request has succeeded. */
export interface DeleteVectorStore200Response extends HttpResponse {
  status: "200";
  body: VectorStoreDeletionStatusOutput;
}

export interface DeleteVectorStoreDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteVectorStoreDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeleteVectorStoreDefaultHeaders;
}

/** The request has succeeded. */
export interface ListVectorStoreFiles200Response extends HttpResponse {
  status: "200";
  body: AgentsPagedResultVectorStoreFileOutput;
}

/** The request has succeeded. */
export interface CreateVectorStoreFile200Response extends HttpResponse {
  status: "200";
  body: VectorStoreFileOutput;
}

export interface CreateVectorStoreFileDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreateVectorStoreFileDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CreateVectorStoreFileDefaultHeaders;
}

/** The request has succeeded. */
export interface GetVectorStoreFile200Response extends HttpResponse {
  status: "200";
  body: VectorStoreFileOutput;
}

export interface GetVectorStoreFileDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetVectorStoreFileDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetVectorStoreFileDefaultHeaders;
}

/** The request has succeeded. */
export interface DeleteVectorStoreFile200Response extends HttpResponse {
  status: "200";
  body: VectorStoreFileDeletionStatusOutput;
}

export interface DeleteVectorStoreFileDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteVectorStoreFileDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeleteVectorStoreFileDefaultHeaders;
}

/** The request has succeeded. */
export interface CreateVectorStoreFileBatch200Response extends HttpResponse {
  status: "200";
  body: VectorStoreFileBatchOutput;
}

export interface CreateVectorStoreFileBatchDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreateVectorStoreFileBatchDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CreateVectorStoreFileBatchDefaultHeaders;
}

/** The request has succeeded. */
export interface GetVectorStoreFileBatch200Response extends HttpResponse {
  status: "200";
  body: VectorStoreFileBatchOutput;
}

export interface GetVectorStoreFileBatchDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetVectorStoreFileBatchDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetVectorStoreFileBatchDefaultHeaders;
}

/** The request has succeeded. */
export interface CancelVectorStoreFileBatch200Response extends HttpResponse {
  status: "200";
  body: VectorStoreFileBatchOutput;
}

export interface CancelVectorStoreFileBatchDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CancelVectorStoreFileBatchDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CancelVectorStoreFileBatchDefaultHeaders;
}

/** The request has succeeded. */
export interface ListVectorStoreFileBatchFiles200Response extends HttpResponse {
  status: "200";
  body: AgentsPagedResultVectorStoreFileOutput;
}
