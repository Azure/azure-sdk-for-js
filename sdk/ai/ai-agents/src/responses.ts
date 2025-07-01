// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpResponse } from "@azure-rest/core-client";
import type {
  AgentOutput,
  AgentV1ErrorOutput,
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

export interface CreateAgentDefaultResponse extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
}

/** The requested list of agents. */
export interface ListAgents200Response extends HttpResponse {
  status: "200";
  body: AgentsPagedResultAgentOutput;
}

export interface ListAgentsDefaultResponse extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
}

/** The requested agent instance. */
export interface GetAgent200Response extends HttpResponse {
  status: "200";
  body: AgentOutput;
}

export interface GetAgentDefaultResponse extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
}

/** The updated agent instance. */
export interface UpdateAgent200Response extends HttpResponse {
  status: "200";
  body: AgentOutput;
}

export interface UpdateAgentDefaultResponse extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
}

/** Status information about the requested deletion operation. */
export interface DeleteAgent200Response extends HttpResponse {
  status: "200";
  body: AgentDeletionStatusOutput;
}

export interface DeleteAgentDefaultResponse extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
}

/** Information about the newly created thread run. */
export interface CreateThreadAndRun200Response extends HttpResponse {
  status: "200";
  body: ThreadRunOutput;
}

export interface CreateThreadAndRunDefaultResponse extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
}

/** Information about the newly created thread. */
export interface CreateThread200Response extends HttpResponse {
  status: "200";
  body: AgentThreadOutput;
}

export interface CreateThreadDefaultResponse extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
}

/** The requested list of threads. */
export interface ListThreads200Response extends HttpResponse {
  status: "200";
  body: AgentsPagedResultAgentThreadOutput;
}

export interface ListThreadsDefaultResponse extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
}

/** Information about the requested thread. */
export interface GetThread200Response extends HttpResponse {
  status: "200";
  body: AgentThreadOutput;
}

export interface GetThreadDefaultResponse extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
}

/** Information about the modified thread. */
export interface UpdateThread200Response extends HttpResponse {
  status: "200";
  body: AgentThreadOutput;
}

export interface UpdateThreadDefaultResponse extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
}

/** Status information about the requested thread deletion operation. */
export interface DeleteThread200Response extends HttpResponse {
  status: "200";
  body: ThreadDeletionStatusOutput;
}

export interface DeleteThreadDefaultResponse extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
}

/** A representation of the new message. */
export interface CreateMessage200Response extends HttpResponse {
  status: "200";
  body: ThreadMessageOutput;
}

export interface CreateMessageDefaultResponse extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
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

export interface GetMessageDefaultResponse extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
}

/** A representation of the modified message. */
export interface UpdateMessage200Response extends HttpResponse {
  status: "200";
  body: ThreadMessageOutput;
}

export interface UpdateMessageDefaultResponse extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
}

/** Information about the new thread run. */
export interface CreateRun200Response extends HttpResponse {
  status: "200";
  body: ThreadRunOutput;
}

export interface CreateRunDefaultResponse extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
}

/** The requested list of thread runs. */
export interface ListRuns200Response extends HttpResponse {
  status: "200";
  body: AgentsPagedResultThreadRunOutput;
}

export interface ListRunsDefaultResponse extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
}

/** The requested information about the specified thread run. */
export interface GetRun200Response extends HttpResponse {
  status: "200";
  body: ThreadRunOutput;
}

export interface GetRunDefaultResponse extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
}

/** Information about the modified run. */
export interface UpdateRun200Response extends HttpResponse {
  status: "200";
  body: ThreadRunOutput;
}

export interface UpdateRunDefaultResponse extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
}

/** Updated information about the run. */
export interface SubmitToolOutputsToRun200Response extends HttpResponse {
  status: "200";
  body: ThreadRunOutput;
}

export interface SubmitToolOutputsToRunDefaultResponse extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
}

/** Updated information about the cancelled run. */
export interface CancelRun200Response extends HttpResponse {
  status: "200";
  body: ThreadRunOutput;
}

export interface CancelRunDefaultResponse extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
}

/** The request has succeeded. */
export interface GetRunStep200Response extends HttpResponse {
  status: "200";
  body: RunStepOutput;
}

export interface GetRunStepDefaultResponse extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
}

/** The requested list of run steps. */
export interface ListRunSteps200Response extends HttpResponse {
  status: "200";
  body: AgentsPagedResultRunStepOutput;
}

export interface ListRunStepsDefaultResponse extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
}

/** The requested list of files. */
export interface ListFiles200Response extends HttpResponse {
  status: "200";
  body: FileListResponseOutput;
}

export interface ListFilesDefaultResponse extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
}

/** A representation of the uploaded file. */
export interface UploadFile200Response extends HttpResponse {
  status: "200";
  body: FileInfoOutput;
}

export interface UploadFileDefaultResponse extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
}

/** Status of the deletion operation. */
export interface DeleteFile200Response extends HttpResponse {
  status: "200";
  body: FileDeletionStatusOutput;
}

export interface DeleteFileDefaultResponse extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
}

/** The request has succeeded. */
export interface GetFile200Response extends HttpResponse {
  status: "200";
  body: FileInfoOutput;
}

export interface GetFileDefaultResponse extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
}

/** The request has succeeded. */
export interface GetFileContent200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
}

export interface GetFileContentDefaultResponse extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
}

/** The request has succeeded. */
export interface ListVectorStores200Response extends HttpResponse {
  status: "200";
  body: AgentsPagedResultVectorStoreOutput;
}

export interface ListVectorStoresDefaultResponse extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
}

/** The request has succeeded. */
export interface CreateVectorStore200Response extends HttpResponse {
  status: "200";
  body: VectorStoreOutput;
}

export interface CreateVectorStoreDefaultResponse extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
}

/** The request has succeeded. */
export interface GetVectorStore200Response extends HttpResponse {
  status: "200";
  body: VectorStoreOutput;
}

export interface GetVectorStoreDefaultResponse extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
}

/** The request has succeeded. */
export interface ModifyVectorStore200Response extends HttpResponse {
  status: "200";
  body: VectorStoreOutput;
}

export interface ModifyVectorStoreDefaultResponse extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
}

/** The request has succeeded. */
export interface DeleteVectorStore200Response extends HttpResponse {
  status: "200";
  body: VectorStoreDeletionStatusOutput;
}

export interface DeleteVectorStoreDefaultResponse extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
}

/** The request has succeeded. */
export interface ListVectorStoreFiles200Response extends HttpResponse {
  status: "200";
  body: AgentsPagedResultVectorStoreFileOutput;
}

export interface ListVectorStoreFilesDefaultResponse extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
}

/** The request has succeeded. */
export interface CreateVectorStoreFile200Response extends HttpResponse {
  status: "200";
  body: VectorStoreFileOutput;
}

export interface CreateVectorStoreFileDefaultResponse extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
}

/** The request has succeeded. */
export interface GetVectorStoreFile200Response extends HttpResponse {
  status: "200";
  body: VectorStoreFileOutput;
}

export interface GetVectorStoreFileDefaultResponse extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
}

/** The request has succeeded. */
export interface DeleteVectorStoreFile200Response extends HttpResponse {
  status: "200";
  body: VectorStoreFileDeletionStatusOutput;
}

export interface DeleteVectorStoreFileDefaultResponse extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
}

/** The request has succeeded. */
export interface CreateVectorStoreFileBatch200Response extends HttpResponse {
  status: "200";
  body: VectorStoreFileBatchOutput;
}

export interface CreateVectorStoreFileBatchDefaultResponse
  extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
}

/** The request has succeeded. */
export interface GetVectorStoreFileBatch200Response extends HttpResponse {
  status: "200";
  body: VectorStoreFileBatchOutput;
}

export interface GetVectorStoreFileBatchDefaultResponse extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
}

/** The request has succeeded. */
export interface CancelVectorStoreFileBatch200Response extends HttpResponse {
  status: "200";
  body: VectorStoreFileBatchOutput;
}

export interface CancelVectorStoreFileBatchDefaultResponse
  extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
}

/** The request has succeeded. */
export interface ListVectorStoreFileBatchFiles200Response extends HttpResponse {
  status: "200";
  body: AgentsPagedResultVectorStoreFileOutput;
}

export interface ListVectorStoreFileBatchFilesDefaultResponse
  extends HttpResponse {
  status: string;
  body: AgentV1ErrorOutput;
}
