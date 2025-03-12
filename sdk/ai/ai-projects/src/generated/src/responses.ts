// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import type {
  AgentOutput,
  OpenAIPageableListOfAgentOutput,
  AgentDeletionStatusOutput,
  AgentThreadOutput,
  ThreadDeletionStatusOutput,
  ThreadMessageOutput,
  OpenAIPageableListOfThreadMessageOutput,
  ThreadRunOutput,
  OpenAIPageableListOfThreadRunOutput,
  RunStepOutput,
  OpenAIPageableListOfRunStepOutput,
  FileListResponseOutput,
  OpenAIFileOutput,
  FileDeletionStatusOutput,
  OpenAIPageableListOfVectorStoreOutput,
  VectorStoreOutput,
  VectorStoreDeletionStatusOutput,
  OpenAIPageableListOfVectorStoreFileOutput,
  VectorStoreFileOutput,
  VectorStoreFileDeletionStatusOutput,
  VectorStoreFileBatchOutput,
  GetWorkspaceResponseOutput,
  ListConnectionsResponseOutput,
  GetConnectionResponseOutput,
  GetAppInsightsResponseOutput,
  EvaluationOutput,
  PagedEvaluationOutput,
  EvaluationScheduleOutput,
  PagedEvaluationScheduleOutput,
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
  body: OpenAIPageableListOfAgentOutput;
}

export interface ListAgentsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListAgentsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListAgentsDefaultHeaders;
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
  body: OpenAIPageableListOfThreadMessageOutput;
}

export interface ListMessagesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListMessagesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListMessagesDefaultHeaders;
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
  body: OpenAIPageableListOfThreadRunOutput;
}

export interface ListRunsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListRunsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListRunsDefaultHeaders;
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

/** Information about the newly created thread. */
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

/** Information about the requested run step. */
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
  body: OpenAIPageableListOfRunStepOutput;
}

export interface ListRunStepsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListRunStepsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListRunStepsDefaultHeaders;
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
  body: OpenAIFileOutput;
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

/** The request has succeeded. */
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
  body: OpenAIFileOutput;
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
  body: string;
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
  body: OpenAIPageableListOfVectorStoreOutput;
}

export interface ListVectorStoresDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListVectorStoresDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListVectorStoresDefaultHeaders;
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
  body: OpenAIPageableListOfVectorStoreFileOutput;
}

export interface ListVectorStoreFilesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListVectorStoreFilesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListVectorStoreFilesDefaultHeaders;
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
  body: OpenAIPageableListOfVectorStoreFileOutput;
}

export interface ListVectorStoreFileBatchFilesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListVectorStoreFileBatchFilesDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListVectorStoreFileBatchFilesDefaultHeaders;
}

/** The request has succeeded. */
export interface GetWorkspace200Response extends HttpResponse {
  status: "200";
  body: GetWorkspaceResponseOutput;
}

export interface GetWorkspaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetWorkspaceDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetWorkspaceDefaultHeaders;
}

/** The request has succeeded. */
export interface ListConnections200Response extends HttpResponse {
  status: "200";
  body: ListConnectionsResponseOutput;
}

export interface ListConnectionsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListConnectionsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListConnectionsDefaultHeaders;
}

/** The request has succeeded. */
export interface GetConnection200Response extends HttpResponse {
  status: "200";
  body: GetConnectionResponseOutput;
}

export interface GetConnectionDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetConnectionDefaultHeaders;
}

/** The request has succeeded. */
export interface GetConnectionWithSecrets200Response extends HttpResponse {
  status: "200";
  body: GetConnectionResponseOutput;
}

export interface GetConnectionWithSecretsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetConnectionWithSecretsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetConnectionWithSecretsDefaultHeaders;
}

/** The request has succeeded. */
export interface GetAppInsights200Response extends HttpResponse {
  status: "200";
  body: GetAppInsightsResponseOutput;
}

export interface GetAppInsightsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetAppInsightsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetAppInsightsDefaultHeaders;
}

export interface Get200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface Get200Response extends HttpResponse {
  status: "200";
  body: EvaluationOutput;
  headers: RawHttpHeaders & Get200Headers;
}

export interface GetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetDefaultHeaders;
}

/** Response model for create evaluation */
export interface Create201Response extends HttpResponse {
  status: "201";
  body: EvaluationOutput;
}

export interface List200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface List200Response extends HttpResponse {
  status: "200";
  body: PagedEvaluationOutput;
  headers: RawHttpHeaders & List200Headers;
}

export interface ListDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListDefaultHeaders;
}

export interface Update200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface Update200Response extends HttpResponse {
  status: "200";
  body: EvaluationOutput;
  headers: RawHttpHeaders & Update200Headers;
}

export interface UpdateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface UpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & UpdateDefaultHeaders;
}

export interface GetSchedule200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface GetSchedule200Response extends HttpResponse {
  status: "200";
  body: EvaluationScheduleOutput;
  headers: RawHttpHeaders & GetSchedule200Headers;
}

export interface GetScheduleDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetScheduleDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetScheduleDefaultHeaders;
}

export interface CreateOrReplaceSchedule200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface CreateOrReplaceSchedule200Response extends HttpResponse {
  status: "200";
  body: EvaluationScheduleOutput;
  headers: RawHttpHeaders & CreateOrReplaceSchedule200Headers;
}

export interface CreateOrReplaceSchedule201Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface CreateOrReplaceSchedule201Response extends HttpResponse {
  status: "201";
  body: EvaluationScheduleOutput;
  headers: RawHttpHeaders & CreateOrReplaceSchedule201Headers;
}

export interface CreateOrReplaceScheduleDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreateOrReplaceScheduleDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CreateOrReplaceScheduleDefaultHeaders;
}

export interface ListSchedule200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface ListSchedule200Response extends HttpResponse {
  status: "200";
  body: PagedEvaluationScheduleOutput;
  headers: RawHttpHeaders & ListSchedule200Headers;
}

export interface ListScheduleDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListScheduleDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListScheduleDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DisableSchedule204Response extends HttpResponse {
  status: "204";
}

export interface DisableScheduleDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DisableScheduleDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DisableScheduleDefaultHeaders;
}
