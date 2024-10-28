// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import {
  AgentOutput,
  OpenAIPageableListOfAgentOutput,
  OpenAIPageableListOfVectorStoreOutput,
  AgentDeletionStatusOutput,
  AgentThreadOutput,
  ThreadDeletionStatusOutput,
  ThreadMessageOutput,
  ThreadRunOutput,
  RunStepOutput,
  FileListResponseOutput,
  OpenAIFileOutput,
  FileDeletionStatusOutput,
  FileContentResponseOutput,
  VectorStoreOutput,
  VectorStoreDeletionStatusOutput,
  VectorStoreFileOutput,
  VectorStoreFileDeletionStatusOutput,
  VectorStoreFileBatchOutput,
  ConnectionsListResponseOutput,
  ConnectionsListSecretsResponseOutput,
  EvaluationOutput,
  PagedEvaluationOutput,
  EvaluationScheduleOutput,
  PagedEvaluationScheduleOutput,
  OpenAIPageableListOfVectorStoreFileOutput,
  OpenAIPageableListOfRunStepOutput,
  OpenAIPageableListOfThreadRunOutput,
  OpenAIPageableListOfThreadMessageOutput,
} from "./outputModels.js";

/** The new agent instance. */
export interface AgentsCreateAgent200Response extends HttpResponse {
  status: "200";
  body: AgentOutput;
}

export interface AgentsCreateAgentDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsCreateAgentDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsCreateAgentDefaultHeaders;
}

/** The requested list of agents. */
export interface AgentsListAgents200Response extends HttpResponse {
  status: "200";
  body: OpenAIPageableListOfAgentOutput;
}

export interface AgentsListAgentsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsListAgentsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsListAgentsDefaultHeaders;
}

/** The requested agent instance. */
export interface AgentsGetAgent200Response extends HttpResponse {
  status: "200";
  body: AgentOutput;
}

export interface AgentsGetAgentDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsGetAgentDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsGetAgentDefaultHeaders;
}

/** The updated agent instance. */
export interface AgentsUpdateAgent200Response extends HttpResponse {
  status: "200";
  body: AgentOutput;
}

export interface AgentsUpdateAgentDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsUpdateAgentDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsUpdateAgentDefaultHeaders;
}

/** Status information about the requested deletion operation. */
export interface AgentsDeleteAgent200Response extends HttpResponse {
  status: "200";
  body: AgentDeletionStatusOutput;
}

export interface AgentsDeleteAgentDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsDeleteAgentDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsDeleteAgentDefaultHeaders;
}

/** Information about the newly created thread. */
export interface AgentsCreateThread200Response extends HttpResponse {
  status: "200";
  body: AgentThreadOutput;
}

export interface AgentsCreateThreadDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsCreateThreadDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsCreateThreadDefaultHeaders;
}

/** Information about the requested thread. */
export interface AgentsGetThread200Response extends HttpResponse {
  status: "200";
  body: AgentThreadOutput;
}

export interface AgentsGetThreadDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsGetThreadDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsGetThreadDefaultHeaders;
}

/** Information about the modified thread. */
export interface AgentsUpdateThread200Response extends HttpResponse {
  status: "200";
  body: AgentThreadOutput;
}

export interface AgentsUpdateThreadDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsUpdateThreadDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsUpdateThreadDefaultHeaders;
}

/** Status information about the requested thread deletion operation. */
export interface AgentsDeleteThread200Response extends HttpResponse {
  status: "200";
  body: ThreadDeletionStatusOutput;
}

export interface AgentsDeleteThreadDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsDeleteThreadDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsDeleteThreadDefaultHeaders;
}

/** A representation of the new message. */
export interface AgentsCreateMessage200Response extends HttpResponse {
  status: "200";
  body: ThreadMessageOutput;
}

export interface AgentsCreateMessageDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsCreateMessageDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsCreateMessageDefaultHeaders;
}

/** The requested list of messages. */
export interface AgentsListMessages200Response extends HttpResponse {
  status: "200";
  body: OpenAIPageableListOfThreadMessageOutput;
}

export interface AgentsListMessagesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsListMessagesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsListMessagesDefaultHeaders;
}

/** A representation of the requested message. */
export interface AgentsGetMessage200Response extends HttpResponse {
  status: "200";
  body: ThreadMessageOutput;
}

export interface AgentsGetMessageDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsGetMessageDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsGetMessageDefaultHeaders;
}

/** A representation of the modified message. */
export interface AgentsUpdateMessage200Response extends HttpResponse {
  status: "200";
  body: ThreadMessageOutput;
}

export interface AgentsUpdateMessageDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsUpdateMessageDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsUpdateMessageDefaultHeaders;
}

/** Information about the new thread run. */
export interface AgentsCreateRun200Response extends HttpResponse {
  status: "200";
  body: ThreadRunOutput;
}

export interface AgentsCreateRunDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsCreateRunDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsCreateRunDefaultHeaders;
}

/** The requested list of thread runs. */
export interface AgentsListRuns200Response extends HttpResponse {
  status: "200";
  body: OpenAIPageableListOfThreadRunOutput;
}

export interface AgentsListRunsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsListRunsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsListRunsDefaultHeaders;
}

/** The requested information about the specified thread run. */
export interface AgentsGetRun200Response extends HttpResponse {
  status: "200";
  body: ThreadRunOutput;
}

export interface AgentsGetRunDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsGetRunDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsGetRunDefaultHeaders;
}

/** Information about the modified run. */
export interface AgentsUpdateRun200Response extends HttpResponse {
  status: "200";
  body: ThreadRunOutput;
}

export interface AgentsUpdateRunDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsUpdateRunDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsUpdateRunDefaultHeaders;
}

/** Updated information about the run. */
export interface AgentsSubmitToolOutputsToRun200Response extends HttpResponse {
  status: "200";
  body: ThreadRunOutput;
}

export interface AgentsSubmitToolOutputsToRunDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsSubmitToolOutputsToRunDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsSubmitToolOutputsToRunDefaultHeaders;
}

/** Updated information about the cancelled run. */
export interface AgentsCancelRun200Response extends HttpResponse {
  status: "200";
  body: ThreadRunOutput;
}

export interface AgentsCancelRunDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsCancelRunDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsCancelRunDefaultHeaders;
}

/** Information about the newly created thread. */
export interface AgentsCreateThreadAndRun200Response extends HttpResponse {
  status: "200";
  body: ThreadRunOutput;
}

export interface AgentsCreateThreadAndRunDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsCreateThreadAndRunDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsCreateThreadAndRunDefaultHeaders;
}

/** Information about the requested run step. */
export interface AgentsGetRunStep200Response extends HttpResponse {
  status: "200";
  body: RunStepOutput;
}

export interface AgentsGetRunStepDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsGetRunStepDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsGetRunStepDefaultHeaders;
}

/** The requested list of run steps. */
export interface AgentsListRunSteps200Response extends HttpResponse {
  status: "200";
  body: OpenAIPageableListOfRunStepOutput;
}

export interface AgentsListRunStepsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsListRunStepsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsListRunStepsDefaultHeaders;
}

/** The requested list of files. */
export interface AgentsListFiles200Response extends HttpResponse {
  status: "200";
  body: FileListResponseOutput;
}

export interface AgentsListFilesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsListFilesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsListFilesDefaultHeaders;
}

/** A representation of the uploaded file. */
export interface AgentsUploadFile200Response extends HttpResponse {
  status: "200";
  body: OpenAIFileOutput;
}

export interface AgentsUploadFileDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsUploadFileDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsUploadFileDefaultHeaders;
}

/** The request has succeeded. */
export interface AgentsDeleteFile200Response extends HttpResponse {
  status: "200";
  body: FileDeletionStatusOutput;
}

export interface AgentsDeleteFileDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsDeleteFileDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsDeleteFileDefaultHeaders;
}

/** The request has succeeded. */
export interface AgentsGetFile200Response extends HttpResponse {
  status: "200";
  body: OpenAIFileOutput;
}

export interface AgentsGetFileDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsGetFileDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsGetFileDefaultHeaders;
}

/** The request has succeeded. */
export interface AgentsGetFileContent200Response extends HttpResponse {
  status: "200";
  body: FileContentResponseOutput;
}

export interface AgentsGetFileContentDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsGetFileContentDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsGetFileContentDefaultHeaders;
}

/** The request has succeeded. */
export interface AgentsListVectorStores200Response extends HttpResponse {
  status: "200";
  body: OpenAIPageableListOfVectorStoreOutput;
}

export interface AgentsListVectorStoresDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsListVectorStoresDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsListVectorStoresDefaultHeaders;
}

/** The request has succeeded. */
export interface AgentsCreateVectorStore200Response extends HttpResponse {
  status: "200";
  body: VectorStoreOutput;
}

export interface AgentsCreateVectorStoreDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsCreateVectorStoreDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsCreateVectorStoreDefaultHeaders;
}

/** The request has succeeded. */
export interface AgentsGetVectorStore200Response extends HttpResponse {
  status: "200";
  body: VectorStoreOutput;
}

export interface AgentsGetVectorStoreDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsGetVectorStoreDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsGetVectorStoreDefaultHeaders;
}

/** The request has succeeded. */
export interface AgentsModifyVectorStore200Response extends HttpResponse {
  status: "200";
  body: VectorStoreOutput;
}

export interface AgentsModifyVectorStoreDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsModifyVectorStoreDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsModifyVectorStoreDefaultHeaders;
}

/** The request has succeeded. */
export interface AgentsDeleteVectorStore200Response extends HttpResponse {
  status: "200";
  body: VectorStoreDeletionStatusOutput;
}

export interface AgentsDeleteVectorStoreDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsDeleteVectorStoreDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsDeleteVectorStoreDefaultHeaders;
}

/** The request has succeeded. */
export interface AgentsListVectorStoreFiles200Response extends HttpResponse {
  status: "200";
  body: OpenAIPageableListOfVectorStoreFileOutput;
}

export interface AgentsListVectorStoreFilesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsListVectorStoreFilesDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsListVectorStoreFilesDefaultHeaders;
}

/** The request has succeeded. */
export interface AgentsCreateVectorStoreFile200Response extends HttpResponse {
  status: "200";
  body: VectorStoreFileOutput;
}

export interface AgentsCreateVectorStoreFileDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsCreateVectorStoreFileDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsCreateVectorStoreFileDefaultHeaders;
}

/** The request has succeeded. */
export interface AgentsGetVectorStoreFile200Response extends HttpResponse {
  status: "200";
  body: VectorStoreFileOutput;
}

export interface AgentsGetVectorStoreFileDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsGetVectorStoreFileDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsGetVectorStoreFileDefaultHeaders;
}

/** The request has succeeded. */
export interface AgentsDeleteVectorStoreFile200Response extends HttpResponse {
  status: "200";
  body: VectorStoreFileDeletionStatusOutput;
}

export interface AgentsDeleteVectorStoreFileDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsDeleteVectorStoreFileDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsDeleteVectorStoreFileDefaultHeaders;
}

/** The request has succeeded. */
export interface AgentsCreateVectorStoreFileBatch200Response
  extends HttpResponse {
  status: "200";
  body: VectorStoreFileBatchOutput;
}

export interface AgentsCreateVectorStoreFileBatchDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsCreateVectorStoreFileBatchDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsCreateVectorStoreFileBatchDefaultHeaders;
}

/** The request has succeeded. */
export interface AgentsGetVectorStoreFileBatch200Response extends HttpResponse {
  status: "200";
  body: VectorStoreFileBatchOutput;
}

export interface AgentsGetVectorStoreFileBatchDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsGetVectorStoreFileBatchDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsGetVectorStoreFileBatchDefaultHeaders;
}

/** The request has succeeded. */
export interface AgentsCancelVectorStoreFileBatch200Response
  extends HttpResponse {
  status: "200";
  body: VectorStoreFileBatchOutput;
}

export interface AgentsCancelVectorStoreFileBatchDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsCancelVectorStoreFileBatchDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsCancelVectorStoreFileBatchDefaultHeaders;
}

/** The request has succeeded. */
export interface AgentsListVectorStoreFileBatchFiles200Response
  extends HttpResponse {
  status: "200";
  body: OpenAIPageableListOfVectorStoreFileOutput;
}

export interface AgentsListVectorStoreFileBatchFilesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AgentsListVectorStoreFileBatchFilesDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AgentsListVectorStoreFileBatchFilesDefaultHeaders;
}

/** The request has succeeded. */
export interface ConnectionsList200Response extends HttpResponse {
  status: "200";
  body: ConnectionsListResponseOutput;
}

export interface ConnectionsListDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ConnectionsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ConnectionsListDefaultHeaders;
}

/** The request has succeeded. */
export interface ConnectionsGet200Response extends HttpResponse {
  status: "200";
  body: ConnectionsListSecretsResponseOutput;
}

export interface ConnectionsGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ConnectionsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ConnectionsGetDefaultHeaders;
}

/** The request has succeeded. */
export interface ConnectionsListSecrets200Response extends HttpResponse {
  status: "200";
  body: ConnectionsListSecretsResponseOutput;
}

export interface ConnectionsListSecretsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ConnectionsListSecretsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ConnectionsListSecretsDefaultHeaders;
}

export interface EvaluationsGet200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface EvaluationsGet200Response extends HttpResponse {
  status: "200";
  body: EvaluationOutput;
  headers: RawHttpHeaders & EvaluationsGet200Headers;
}

export interface EvaluationsGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface EvaluationsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & EvaluationsGetDefaultHeaders;
}

/** Response model for create evaluation */
export interface EvaluationsCreate201Response extends HttpResponse {
  status: "201";
  body: EvaluationOutput;
}

export interface EvaluationsList200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface EvaluationsList200Response extends HttpResponse {
  status: "200";
  body: PagedEvaluationOutput;
  headers: RawHttpHeaders & EvaluationsList200Headers;
}

export interface EvaluationsListDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface EvaluationsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & EvaluationsListDefaultHeaders;
}

export interface EvaluationsUpdate200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface EvaluationsUpdate200Response extends HttpResponse {
  status: "200";
  body: EvaluationOutput;
  headers: RawHttpHeaders & EvaluationsUpdate200Headers;
}

export interface EvaluationsUpdateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface EvaluationsUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & EvaluationsUpdateDefaultHeaders;
}

export interface EvaluationsGetSchedule200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface EvaluationsGetSchedule200Response extends HttpResponse {
  status: "200";
  body: EvaluationScheduleOutput;
  headers: RawHttpHeaders & EvaluationsGetSchedule200Headers;
}

export interface EvaluationsGetScheduleDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface EvaluationsGetScheduleDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & EvaluationsGetScheduleDefaultHeaders;
}

export interface EvaluationsCreateOrReplaceSchedule200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface EvaluationsCreateOrReplaceSchedule200Response
  extends HttpResponse {
  status: "200";
  body: EvaluationScheduleOutput;
  headers: RawHttpHeaders & EvaluationsCreateOrReplaceSchedule200Headers;
}

export interface EvaluationsCreateOrReplaceSchedule201Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface EvaluationsCreateOrReplaceSchedule201Response
  extends HttpResponse {
  status: "201";
  body: EvaluationScheduleOutput;
  headers: RawHttpHeaders & EvaluationsCreateOrReplaceSchedule201Headers;
}

export interface EvaluationsCreateOrReplaceScheduleDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface EvaluationsCreateOrReplaceScheduleDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & EvaluationsCreateOrReplaceScheduleDefaultHeaders;
}

export interface EvaluationsListSchedule200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface EvaluationsListSchedule200Response extends HttpResponse {
  status: "200";
  body: PagedEvaluationScheduleOutput;
  headers: RawHttpHeaders & EvaluationsListSchedule200Headers;
}

export interface EvaluationsListScheduleDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface EvaluationsListScheduleDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & EvaluationsListScheduleDefaultHeaders;
}

export interface EvaluationsDeleteSchedule204Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface EvaluationsDeleteSchedule204Response extends HttpResponse {
  status: "204";
  headers: RawHttpHeaders & EvaluationsDeleteSchedule204Headers;
}

export interface EvaluationsDeleteScheduleDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface EvaluationsDeleteScheduleDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & EvaluationsDeleteScheduleDefaultHeaders;
}
