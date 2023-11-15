// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, KeyCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";
import {
  AssistantCreationOptions,
  Assistant,
  ListResponseOf,
  AssistantModificationOptions,
  AssistantDeletionStatus,
  AssistantFile,
  AssistantFileDeletionStatus,
  AssistantThreadCreationOptions,
  AssistantMessage,
  AssistantRole,
  AssistantThread,
  AssistantThreadDeletionStatus,
  AssistantMessageFile,
  AssistantRun,
  RunToolOutput,
  AssistantThreadCreateAndRunOptions,
  RunStep,
  FilePurpose,
  FileListResponse,
  File,
  FileDeletionStatus,
} from "./models/models.js";
import {
  CreateAssistantOptions,
  ListAssistantsOptions,
  RetrieveAssistantOptions,
  ModifyAssistantOptions,
  DeleteAssistantOptions,
  CreateAssistantFileOptions,
  ListAssistantFilesOptions,
  RetrieveAssistantFileOptions,
  DeleteAssistantFileOptions,
  CreateThreadOptions,
  RetrieveThreadOptions,
  ModifyThreadOptions,
  DeleteThreadOptions,
  CreateThreadMessageOptions,
  ListThreadMessagesOptions,
  RetrieveThreadMessageOptions,
  ModifyThreadMessageOptions,
  ListThreadMessageFilesOptions,
  RetrieveThreadMessageFileOptions,
  CreateRunOptions,
  ListRunsOptions,
  RetrieveRunOptions,
  ModifyRunOptions,
  SubmitRunToolOutputsOptions,
  CancelRunOptions,
  CreateThreadAndRunOptions,
  RetrieveRunStepOptions,
  ListRunStepsOptions,
  ListFilesOptions,
  UploadFileOptions,
  DeleteFileOptions,
  RetrieveFileOptions,
  RetrieveFileContentOptions,
} from "./models/options.js";
import {
  createAssistants,
  AssistantsClientOptions,
  AssistantsContext,
  createAssistant,
  listAssistants,
  retrieveAssistant,
  modifyAssistant,
  deleteAssistant,
  createAssistantFile,
  listAssistantFiles,
  retrieveAssistantFile,
  deleteAssistantFile,
  createThread,
  retrieveThread,
  modifyThread,
  deleteThread,
  createThreadMessage,
  listThreadMessages,
  retrieveThreadMessage,
  modifyThreadMessage,
  listThreadMessageFiles,
  retrieveThreadMessageFile,
  createRun,
  listRuns,
  retrieveRun,
  modifyRun,
  submitRunToolOutputs,
  cancelRun,
  createThreadAndRun,
  retrieveRunStep,
  listRunSteps,
  listFiles,
  uploadFile,
  deleteFile,
  retrieveFile,
  retrieveFileContent,
} from "./api/index.js";

export { AssistantsClientOptions } from "./api/AssistantsContext.js";

export class AssistantsClient {
  private _client: AssistantsContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Azure OpenAI APIs for Assistants. */
  constructor(
    endpoint: string,
    credential: KeyCredential | TokenCredential,
    options: AssistantsClientOptions = {}
  ) {
    this._client = createAssistants(endpoint, credential, options);
    this.pipeline = this._client.pipeline;
  }

  /** Creates an assistant with a model and instructions. */
  createAssistant(
    body: AssistantCreationOptions,
    options: CreateAssistantOptions = { requestOptions: {} }
  ): Promise<Assistant> {
    return createAssistant(this._client, body, options);
  }

  /** Returns a list of assistants. */
  listAssistants(
    options: ListAssistantsOptions = { requestOptions: {} }
  ): Promise<ListResponseOf> {
    return listAssistants(this._client, options);
  }

  /** Retrieves an assistant. */
  retrieveAssistant(
    assistantId: string,
    options: RetrieveAssistantOptions = { requestOptions: {} }
  ): Promise<Assistant> {
    return retrieveAssistant(this._client, assistantId, options);
  }

  /** Modifies an assistant. */
  modifyAssistant(
    assistantId: string,
    modificationOptions: AssistantModificationOptions,
    options: ModifyAssistantOptions = { requestOptions: {} }
  ): Promise<Assistant> {
    return modifyAssistant(
      this._client,
      assistantId,
      modificationOptions,
      options
    );
  }

  /** Deletes an assistant. */
  deleteAssistant(
    assistantId: string,
    options: DeleteAssistantOptions = { requestOptions: {} }
  ): Promise<AssistantDeletionStatus> {
    return deleteAssistant(this._client, assistantId, options);
  }

  /** Attaches a file to an assistant for use by tools that can read files. */
  createAssistantFile(
    assistantId: string,
    fileId: string,
    options: CreateAssistantFileOptions = { requestOptions: {} }
  ): Promise<AssistantFile> {
    return createAssistantFile(this._client, assistantId, fileId, options);
  }

  /** Returns a list of assistant files. */
  listAssistantFiles(
    assistantId: string,
    options: ListAssistantFilesOptions = { requestOptions: {} }
  ): Promise<ListResponseOf> {
    return listAssistantFiles(this._client, assistantId, options);
  }

  /** Retrieves a file attached to an assistant. */
  retrieveAssistantFile(
    assistantId: string,
    fileId: string,
    options: RetrieveAssistantFileOptions = { requestOptions: {} }
  ): Promise<AssistantFile> {
    return retrieveAssistantFile(this._client, assistantId, fileId, options);
  }

  /** Deletes an assistant file. */
  deleteAssistantFile(
    assistantId: string,
    fileId: string,
    options: DeleteAssistantFileOptions = { requestOptions: {} }
  ): Promise<AssistantFileDeletionStatus> {
    return deleteAssistantFile(this._client, assistantId, fileId, options);
  }

  /** Creates a new thread for an assistant. */
  createThread(
    body: AssistantThreadCreationOptions,
    options: CreateThreadOptions = { requestOptions: {} }
  ): Promise<AssistantThread> {
    return createThread(this._client, body, options);
  }

  /** Retrieves an existing thread for an assistant. */
  retrieveThread(
    threadId: string,
    options: RetrieveThreadOptions = { requestOptions: {} }
  ): Promise<AssistantThread> {
    return retrieveThread(this._client, threadId, options);
  }

  /** Modifies an existing thread for an assistant. */
  modifyThread(
    threadId: string,
    options: ModifyThreadOptions = { requestOptions: {} }
  ): Promise<AssistantThread> {
    return modifyThread(this._client, threadId, options);
  }

  /** Deletes a thread. */
  deleteThread(
    threadId: string,
    options: DeleteThreadOptions = { requestOptions: {} }
  ): Promise<AssistantThreadDeletionStatus> {
    return deleteThread(this._client, threadId, options);
  }

  /** Returns a list of messages from a thread. */
  createThreadMessage(
    threadId: string,
    role: AssistantRole,
    content: string,
    options: CreateThreadMessageOptions = { requestOptions: {} }
  ): Promise<AssistantMessage> {
    return createThreadMessage(this._client, threadId, role, content, options);
  }

  /** Returns a list of messages from a thread. */
  listThreadMessages(
    threadId: string,
    options: ListThreadMessagesOptions = { requestOptions: {} }
  ): Promise<ListResponseOf> {
    return listThreadMessages(this._client, threadId, options);
  }

  /** Retrieves a message associated with a thread. */
  retrieveThreadMessage(
    threadId: string,
    messageId: string,
    options: RetrieveThreadMessageOptions = { requestOptions: {} }
  ): Promise<AssistantMessage> {
    return retrieveThreadMessage(this._client, threadId, messageId, options);
  }

  /** Modifies an existing message associated with a thread. */
  modifyThreadMessage(
    threadId: string,
    messageId: string,
    options: ModifyThreadMessageOptions = { requestOptions: {} }
  ): Promise<AssistantMessage> {
    return modifyThreadMessage(this._client, threadId, messageId, options);
  }

  /** Returns a list of files associated with a message from a thread. */
  listThreadMessageFiles(
    threadId: string,
    messageId: string,
    options: ListThreadMessageFilesOptions = { requestOptions: {} }
  ): Promise<ListResponseOf> {
    return listThreadMessageFiles(this._client, threadId, messageId, options);
  }

  /** Retrieves a file attached to a message within a thread. */
  retrieveThreadMessageFile(
    threadId: string,
    messageId: string,
    fileId: string,
    options: RetrieveThreadMessageFileOptions = { requestOptions: {} }
  ): Promise<AssistantMessageFile> {
    return retrieveThreadMessageFile(
      this._client,
      threadId,
      messageId,
      fileId,
      options
    );
  }

  /** Creates a new run for an assistant thread. */
  createRun(
    threadId: string,
    assistantId: string,
    options: CreateRunOptions = { requestOptions: {} }
  ): Promise<AssistantRun> {
    return createRun(this._client, threadId, assistantId, options);
  }

  /** Returns a list of runs associated with an assistant thread. */
  listRuns(
    threadId: string,
    options: ListRunsOptions = { requestOptions: {} }
  ): Promise<ListResponseOf> {
    return listRuns(this._client, threadId, options);
  }

  /** Retrieves an existing run associated with an assistant thread. */
  retrieveRun(
    threadId: string,
    runId: string,
    options: RetrieveRunOptions = { requestOptions: {} }
  ): Promise<AssistantRun> {
    return retrieveRun(this._client, threadId, runId, options);
  }

  /** Modifies an existing run associated with an assistant thread. */
  modifyRun(
    threadId: string,
    runId: string,
    options: ModifyRunOptions = { requestOptions: {} }
  ): Promise<AssistantRun> {
    return modifyRun(this._client, threadId, runId, options);
  }

  /** Submits outputs from tool calls as requested by a run with a status of 'requires_action' with required_action.type of 'submit_tool_outputs'. */
  submitRunToolOutputs(
    threadId: string,
    runId: string,
    toolOutputs: RunToolOutput[],
    options: SubmitRunToolOutputsOptions = { requestOptions: {} }
  ): Promise<AssistantRun> {
    return submitRunToolOutputs(
      this._client,
      threadId,
      runId,
      toolOutputs,
      options
    );
  }

  /** Cancels a run associated with an assistant thread. */
  cancelRun(
    threadId: string,
    runId: string,
    options: CancelRunOptions = { requestOptions: {} }
  ): Promise<AssistantRun> {
    return cancelRun(this._client, threadId, runId, options);
  }

  /** Creates a new assistant thread and immediately starts a run using that new thread. */
  createThreadAndRun(
    body: AssistantThreadCreateAndRunOptions,
    options: CreateThreadAndRunOptions = { requestOptions: {} }
  ): Promise<AssistantRun> {
    return createThreadAndRun(this._client, body, options);
  }

  /** Retrieves a single run step associated with an assistant thread run. */
  retrieveRunStep(
    threadId: string,
    runId: string,
    stepId: string,
    options: RetrieveRunStepOptions = { requestOptions: {} }
  ): Promise<RunStep> {
    return retrieveRunStep(this._client, threadId, runId, stepId, options);
  }

  /** Returns a list of run steps associated an assistant thread run. */
  listRunSteps(
    threadId: string,
    runId: string,
    options: ListRunStepsOptions = { requestOptions: {} }
  ): Promise<ListResponseOf> {
    return listRunSteps(this._client, threadId, runId, options);
  }

  /** Returns a list of files that belong to the user's organization. */
  listFiles(
    options: ListFilesOptions = { requestOptions: {} }
  ): Promise<FileListResponse> {
    return listFiles(this._client, options);
  }

  /** Upload a file that can be used across various endpoints. */
  uploadFile(
    file: Uint8Array,
    purpose: FilePurpose,
    options: UploadFileOptions = { requestOptions: {} }
  ): Promise<File> {
    return uploadFile(this._client, file, purpose, options);
  }

  /** Delete a previously uploaded file. */
  deleteFile(
    fileId: string,
    options: DeleteFileOptions = { requestOptions: {} }
  ): Promise<FileDeletionStatus> {
    return deleteFile(this._client, fileId, options);
  }

  /** Returns information about a specific file. Does not retrieve file content. */
  retrieveFile(
    fileId: string,
    options: RetrieveFileOptions = { requestOptions: {} }
  ): Promise<File> {
    return retrieveFile(this._client, fileId, options);
  }

  /** Returns the contents of a specified file. */
  retrieveFileContent(
    fileId: string,
    options: RetrieveFileContentOptions = { requestOptions: {} }
  ): Promise<Uint8Array> {
    return retrieveFileContent(this._client, fileId, options);
  }
}
