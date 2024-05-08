// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, KeyCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";
import {
  AssistantCreationOptions,
  Assistant,
  OpenAIPageableListOfAssistant,
  UpdateAssistantOptions,
  AssistantDeletionStatus,
  AssistantFile,
  OpenAIPageableListOfAssistantFile,
  AssistantFileDeletionStatus,
  MessageRole,
  AssistantThreadCreationOptions,
  AssistantThread,
  ThreadDeletionStatus,
  ThreadMessage,
  OpenAIPageableListOfThreadMessage,
  OpenAIPageableListOfMessageFile,
  MessageFile,
  CreateRunOptions,
  ThreadRun,
  OpenAIPageableListOfThreadRun,
  ToolOutput,
  CreateAndRunThreadOptions,
  RunStep,
  OpenAIPageableListOfRunStep,
  FilePurpose,
  FileListResponse,
  InputFile,
  FileDeletionStatus,
} from "./models/models.js";
import {
  CreateAssistantOptionalParams,
  ListAssistantsOptionalParams,
  GetAssistantOptionalParams,
  UpdateAssistantOptionalParams,
  DeleteAssistantOptionalParams,
  CreateAssistantFileOptionalParams,
  ListAssistantFilesOptionalParams,
  GetAssistantFileOptionalParams,
  DeleteAssistantFileOptionalParams,
  CreateThreadOptionalParams,
  GetThreadOptionalParams,
  UpdateThreadOptionalParams,
  DeleteThreadOptionalParams,
  CreateMessageOptionalParams,
  ListMessagesOptionalParams,
  GetMessageOptionalParams,
  UpdateMessageOptionalParams,
  ListMessageFilesOptionalParams,
  GetMessageFileOptionalParams,
  CreateRunOptionalParams,
  ListRunsOptionalParams,
  GetRunOptionalParams,
  UpdateRunOptionalParams,
  SubmitToolOutputsToRunOptionalParams,
  CancelRunOptionalParams,
  CreateThreadAndRunOptionalParams,
  GetRunStepOptionalParams,
  ListRunStepsOptionalParams,
  ListFilesOptionalParams,
  UploadFileOptionalParams,
  DeleteFileOptionalParams,
  GetFileOptionalParams,
} from "./models/options.js";
import {
  createAssistants,
  AssistantsClientOptions,
  AssistantsContext,
  createAssistant,
  listAssistants,
  getAssistant,
  updateAssistant,
  deleteAssistant,
  createAssistantFile,
  listAssistantFiles,
  getAssistantFile,
  deleteAssistantFile,
  createThread,
  getThread,
  updateThread,
  deleteThread,
  createMessage,
  listMessages,
  getMessage,
  updateMessage,
  listMessageFiles,
  getMessageFile,
  createRun,
  listRuns,
  getRun,
  updateRun,
  submitToolOutputsToRun,
  cancelRun,
  createThreadAndRun,
  getRunStep,
  listRunSteps,
  listFiles,
  uploadFile,
  deleteFile,
  getFile,
} from "./api/index.js";

export { AssistantsClientOptions } from "./api/assistantsContext.js";

export class AssistantsClient {
  private _client: AssistantsContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Azure OpenAI APIs for Assistants. */
  constructor(
    endpointParam: string,
    credential: KeyCredential | TokenCredential,
    options: AssistantsClientOptions = {},
  ) {
    this._client = createAssistants(endpointParam, credential, options);
    this.pipeline = this._client.pipeline;
  }

  /** Creates a new assistant. */
  createAssistant(
    body: AssistantCreationOptions,
    options: CreateAssistantOptionalParams = { requestOptions: {} },
  ): Promise<Assistant> {
    return createAssistant(this._client, body, options);
  }

  /** Gets a list of assistants that were previously created. */
  listAssistants(
    options: ListAssistantsOptionalParams = { requestOptions: {} },
  ): Promise<OpenAIPageableListOfAssistant> {
    return listAssistants(this._client, options);
  }

  /** Retrieves an existing assistant. */
  getAssistant(
    assistantId: string,
    options: GetAssistantOptionalParams = { requestOptions: {} },
  ): Promise<Assistant> {
    return getAssistant(this._client, assistantId, options);
  }

  /** Modifies an existing assistant. */
  updateAssistant(
    assistantId: string,
    body: UpdateAssistantOptions,
    options: UpdateAssistantOptionalParams = { requestOptions: {} },
  ): Promise<Assistant> {
    return updateAssistant(this._client, assistantId, body, options);
  }

  /** Deletes an assistant. */
  deleteAssistant(
    assistantId: string,
    options: DeleteAssistantOptionalParams = { requestOptions: {} },
  ): Promise<AssistantDeletionStatus> {
    return deleteAssistant(this._client, assistantId, options);
  }

  /** Attaches a previously uploaded file to an assistant for use by tools that can read files. */
  createAssistantFile(
    assistantId: string,
    fileId: string,
    options: CreateAssistantFileOptionalParams = { requestOptions: {} },
  ): Promise<AssistantFile> {
    return createAssistantFile(this._client, assistantId, fileId, options);
  }

  /** Gets a list of files attached to a specific assistant, as used by tools that can read files. */
  listAssistantFiles(
    assistantId: string,
    options: ListAssistantFilesOptionalParams = { requestOptions: {} },
  ): Promise<OpenAIPageableListOfAssistantFile> {
    return listAssistantFiles(this._client, assistantId, options);
  }

  /** Retrieves a file attached to an assistant. */
  getAssistantFile(
    assistantId: string,
    fileId: string,
    options: GetAssistantFileOptionalParams = { requestOptions: {} },
  ): Promise<AssistantFile> {
    return getAssistantFile(this._client, assistantId, fileId, options);
  }

  /**
   * Unlinks a previously attached file from an assistant, rendering it unavailable for use by tools that can read
   * files.
   */
  deleteAssistantFile(
    assistantId: string,
    fileId: string,
    options: DeleteAssistantFileOptionalParams = { requestOptions: {} },
  ): Promise<AssistantFileDeletionStatus> {
    return deleteAssistantFile(this._client, assistantId, fileId, options);
  }

  /** Creates a new thread. Threads contain messages and can be run by assistants. */
  createThread(
    body: AssistantThreadCreationOptions,
    options: CreateThreadOptionalParams = { requestOptions: {} },
  ): Promise<AssistantThread> {
    return createThread(this._client, body, options);
  }

  /** Gets information about an existing thread. */
  getThread(
    threadId: string,
    options: GetThreadOptionalParams = { requestOptions: {} },
  ): Promise<AssistantThread> {
    return getThread(this._client, threadId, options);
  }

  /** Modifies an existing thread. */
  updateThread(
    threadId: string,
    options: UpdateThreadOptionalParams = { requestOptions: {} },
  ): Promise<AssistantThread> {
    return updateThread(this._client, threadId, options);
  }

  /** Deletes an existing thread. */
  deleteThread(
    threadId: string,
    options: DeleteThreadOptionalParams = { requestOptions: {} },
  ): Promise<ThreadDeletionStatus> {
    return deleteThread(this._client, threadId, options);
  }

  /** Creates a new message on a specified thread. */
  createMessage(
    threadId: string,
    role: MessageRole,
    content: string,
    options: CreateMessageOptionalParams = { requestOptions: {} },
  ): Promise<ThreadMessage> {
    return createMessage(this._client, threadId, role, content, options);
  }

  /** Gets a list of messages that exist on a thread. */
  listMessages(
    threadId: string,
    options: ListMessagesOptionalParams = { requestOptions: {} },
  ): Promise<OpenAIPageableListOfThreadMessage> {
    return listMessages(this._client, threadId, options);
  }

  /** Gets an existing message from an existing thread. */
  getMessage(
    threadId: string,
    messageId: string,
    options: GetMessageOptionalParams = { requestOptions: {} },
  ): Promise<ThreadMessage> {
    return getMessage(this._client, threadId, messageId, options);
  }

  /** Modifies an existing message on an existing thread. */
  updateMessage(
    threadId: string,
    messageId: string,
    options: UpdateMessageOptionalParams = { requestOptions: {} },
  ): Promise<ThreadMessage> {
    return updateMessage(this._client, threadId, messageId, options);
  }

  /** Gets a list of previously uploaded files associated with a message from a thread. */
  listMessageFiles(
    threadId: string,
    messageId: string,
    options: ListMessageFilesOptionalParams = { requestOptions: {} },
  ): Promise<OpenAIPageableListOfMessageFile> {
    return listMessageFiles(this._client, threadId, messageId, options);
  }

  /** Gets information about a file attachment to a message within a thread. */
  getMessageFile(
    threadId: string,
    messageId: string,
    fileId: string,
    options: GetMessageFileOptionalParams = { requestOptions: {} },
  ): Promise<MessageFile> {
    return getMessageFile(this._client, threadId, messageId, fileId, options);
  }

  /** Creates a new run for an assistant thread. */
  createRun(
    threadId: string,
    createRunOptions: CreateRunOptions,
    options: CreateRunOptionalParams = { requestOptions: {} },
  ): Promise<ThreadRun> {
    return createRun(this._client, threadId, createRunOptions, options);
  }

  /** Gets a list of runs for a specified thread. */
  listRuns(
    threadId: string,
    options: ListRunsOptionalParams = { requestOptions: {} },
  ): Promise<OpenAIPageableListOfThreadRun> {
    return listRuns(this._client, threadId, options);
  }

  /** Gets an existing run from an existing thread. */
  getRun(
    threadId: string,
    runId: string,
    options: GetRunOptionalParams = { requestOptions: {} },
  ): Promise<ThreadRun> {
    return getRun(this._client, threadId, runId, options);
  }

  /** Modifies an existing thread run. */
  updateRun(
    threadId: string,
    runId: string,
    options: UpdateRunOptionalParams = { requestOptions: {} },
  ): Promise<ThreadRun> {
    return updateRun(this._client, threadId, runId, options);
  }

  /** Submits outputs from tools as requested by tool calls in a run. Runs that need submitted tool outputs will have a status of 'requires_action' with a required_action.type of 'submit_tool_outputs'. */
  submitToolOutputsToRun(
    threadId: string,
    runId: string,
    toolOutputs: ToolOutput[],
    options: SubmitToolOutputsToRunOptionalParams = { requestOptions: {} },
  ): Promise<ThreadRun> {
    return submitToolOutputsToRun(
      this._client,
      threadId,
      runId,
      toolOutputs,
      options,
    );
  }

  /** Cancels a run of an in progress thread. */
  cancelRun(
    threadId: string,
    runId: string,
    options: CancelRunOptionalParams = { requestOptions: {} },
  ): Promise<ThreadRun> {
    return cancelRun(this._client, threadId, runId, options);
  }

  /** Creates a new assistant thread and immediately starts a run using that new thread. */
  createThreadAndRun(
    body: CreateAndRunThreadOptions,
    options: CreateThreadAndRunOptionalParams = { requestOptions: {} },
  ): Promise<ThreadRun> {
    return createThreadAndRun(this._client, body, options);
  }

  /** Gets a single run step from a thread run. */
  getRunStep(
    threadId: string,
    runId: string,
    stepId: string,
    options: GetRunStepOptionalParams = { requestOptions: {} },
  ): Promise<RunStep> {
    return getRunStep(this._client, threadId, runId, stepId, options);
  }

  /** Gets a list of run steps from a thread run. */
  listRunSteps(
    threadId: string,
    runId: string,
    options: ListRunStepsOptionalParams = { requestOptions: {} },
  ): Promise<OpenAIPageableListOfRunStep> {
    return listRunSteps(this._client, threadId, runId, options);
  }

  /** Gets a list of previously uploaded files. */
  listFiles(
    options: ListFilesOptionalParams = { requestOptions: {} },
  ): Promise<FileListResponse> {
    return listFiles(this._client, options);
  }

  /** Uploads a file for use by other operations. */
  uploadFile(
    file: Uint8Array,
    purpose: FilePurpose,
    options: UploadFileOptionalParams = { requestOptions: {} },
  ): Promise<InputFile> {
    return uploadFile(this._client, file, purpose, options);
  }

  /** Delete a previously uploaded file. */
  deleteFile(
    fileId: string,
    options: DeleteFileOptionalParams = { requestOptions: {} },
  ): Promise<FileDeletionStatus> {
    return deleteFile(this._client, fileId, options);
  }

  /** Returns information about a specific file. Does not retrieve file content. */
  getFile(
    fileId: string,
    options: GetFileOptionalParams = { requestOptions: {} },
  ): Promise<InputFile> {
    return getFile(this._client, fileId, options);
  }
}
