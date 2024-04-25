// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import { KeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";
import { createAssistants } from "./api/AssistantsContext.js";
import {
  cancelRun,
  createAssistant,
  createAssistantFile,
  createMessage,
  createRun,
  createThread,
  createThreadAndRun,
  deleteAssistant,
  deleteAssistantFile,
  deleteFile,
  deleteThread,
  getAssistant,
  getAssistantFile,
  getFile,
  getMessage,
  getMessageFile,
  getRun,
  getRunStep,
  getThread,
  listAssistantFiles,
  listAssistants,
  listFiles,
  listMessageFiles,
  listMessages,
  listRunSteps,
  listRuns,
  submitToolOutputsToRun,
  updateAssistant,
  updateMessage,
  updateRun,
  updateThread,
  uploadFile,
} from "./api/index.js";
import { nonAzurePolicy } from "./api/policies/nonAzure.js";
import { AssistantsClientOptions } from "./index.js";
import {
  Assistant,
  AssistantCreationOptions,
  AssistantDeletionStatus,
  AssistantFile,
  AssistantFileDeletionStatus,
  AssistantThread,
  AssistantThreadCreationOptions,
  CreateAndRunThreadOptions,
  CreateRunOptions,
  FileDeletionStatus,
  FileListResponse,
  FilePurpose,
  InputFile,
  MessageFile,
  MessageRole,
  ListResponseOf,
  RunStep,
  ThreadDeletionStatus,
  ThreadMessage,
  ThreadRun,
  ToolOutput,
  UpdateAssistantOptions,
} from "./models/models.js";
import {
  CancelRunOptions,
  CreateAssistantFileOptions,
  CreateAssistantOptions,
  CreateMessageOptions,
  CreateRunRequestOptions,
  CreateThreadAndRunOptions,
  CreateThreadOptions,
  DeleteAssistantFileOptions,
  DeleteAssistantOptions,
  DeleteFileOptions,
  DeleteThreadOptions,
  GetAssistantFileOptions,
  GetAssistantOptions,
  GetFileOptions,
  GetMessageFileOptions,
  GetMessageOptions,
  GetRunOptions,
  GetRunStepOptions,
  GetThreadOptions,
  ListAssistantFilesOptions,
  ListAssistantsOptions,
  ListFilesOptions,
  ListMessageFilesOptions,
  ListMessagesOptions,
  ListRunStepsOptions,
  ListRunsOptions,
  SubmitToolOutputsToRunOptions,
  UpdateAssistantRequestOptions,
  UpdateMessageOptions,
  UpdateRunOptions,
  UpdateThreadOptions,
  UploadFileOptions,
} from "./models/options.js";
import { AssistantsContext } from "./rest/index.js";

export { AssistantsClientOptions } from "./api/AssistantsContext.js";

/** Client handling assistant-related operations. */
export class AssistantsClient {
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;
  private _client: AssistantsContext;
  private _isAzure = false;

  /**
   * Initializes an instance of AssistantsClient for use with an OpenAI resource.
   * @param endpoint - The URI for an Azure OpenAI resource, including protocol and hostname.
   *                 For example: https://my-resource.openai.azure.com.
   * @param credential - A key credential used to authenticate to an Azure OpenAI resource.
   * @param options - The options for configuring the client.
   * @remarks
   *   This constructor initializes an AssistantsClient object that can only be used with Azure OpenAI resources.
   *   To use AssistantsClient with a non-Azure OpenAI inference endpoint, use a constructor that accepts a non-Azure OpenAI API key instead.
   */
  constructor(endpoint: string, credential: KeyCredential, options?: AssistantsClientOptions);
  /**
   * Initializes an instance of AssistantsClient for use with an Azure OpenAI resource.
   * @param endpoint - The URI for an Azure OpenAI resource, including protocol and hostname.
   *                 For example: https://my-resource.openai.azure.com.
   * @param credential - A token credential used to authenticate with an Azure OpenAI resource.
   * @param options - The options for configuring the client.
   */
  constructor(endpoint: string, credential: TokenCredential, options?: AssistantsClientOptions);
  /**
   * Initializes an instance of AssistantsClient for use with the non-Azure OpenAI endpoint.
   * @param openAiApiKey - The API key to use when connecting to the non-Azure OpenAI endpoint.
   * @param options - The options for configuring the client.
   * @remarks
   *   AssistantsClient objects initialized with this constructor can only be used with the non-Azure OpenAI inference endpoint.
   *   To use AssistantsClient with an Azure OpenAI resource, use a constructor that accepts a resource URI and Azure authentication credential instead.
   */
  constructor(openAiApiKey: KeyCredential, options?: AssistantsClientOptions);
  constructor(
    endpointOrOpenAiKey: string | KeyCredential,
    credOrOptions: KeyCredential | TokenCredential | AssistantsClientOptions = {},
    options: AssistantsClientOptions = {},
  ) {
    let opts: AssistantsClientOptions;
    let endpoint: string;
    let cred: KeyCredential | TokenCredential;
    if (isCred(credOrOptions)) {
      endpoint = endpointOrOpenAiKey as string;
      cred = credOrOptions;
      opts = options;
      this._isAzure = true;
    } else {
      endpoint = createOpenAIEndpoint(1);
      cred = endpointOrOpenAiKey as KeyCredential;
      const { credentials, ...restOpts } = credOrOptions;
      opts = {
        baseUrl: endpoint,
        credentials: {
          apiKeyHeaderName: credentials?.apiKeyHeaderName ?? "Authorization",
          scopes: credentials?.scopes,
        },
        ...restOpts,
      };
    }

    this._client = createAssistants(endpoint, cred, {
      ...opts,
      ...(this._isAzure
        ? {}
        : {
            additionalPolicies: [
              ...(opts.additionalPolicies ?? []),
              {
                position: "perCall",
                policy: nonAzurePolicy(),
              },
            ],
          }),
    });
    this.pipeline = this._client.pipeline;
  }

  /** Creates a new assistant. */
  createAssistant(
    body: AssistantCreationOptions,
    options: CreateAssistantOptions = { requestOptions: {} },
  ): Promise<Assistant> {
    return createAssistant(this._client, body, options);
  }

  /** Gets a list of assistants that were previously created. */
  listAssistants(
    options: ListAssistantsOptions = { requestOptions: {} },
  ): Promise<ListResponseOf<Assistant>> {
    return listAssistants(this._client, options);
  }

  /** Retrieves an existing assistant. */
  getAssistant(
    assistantId: string,
    options: GetAssistantOptions = { requestOptions: {} },
  ): Promise<Assistant> {
    return getAssistant(this._client, assistantId, options);
  }

  /** Modifies an existing assistant. */
  updateAssistant(
    assistantId: string,
    body: UpdateAssistantOptions,
    options: UpdateAssistantRequestOptions = { requestOptions: {} },
  ): Promise<Assistant> {
    return updateAssistant(this._client, assistantId, body, options);
  }

  /** Deletes an assistant. */
  deleteAssistant(
    assistantId: string,
    options: DeleteAssistantOptions = { requestOptions: {} },
  ): Promise<AssistantDeletionStatus> {
    return deleteAssistant(this._client, assistantId, options);
  }

  /** Attaches a previously uploaded file to an assistant for use by tools that can read files. */
  createAssistantFile(
    assistantId: string,
    fileId: string,
    options: CreateAssistantFileOptions = { requestOptions: {} },
  ): Promise<AssistantFile> {
    return createAssistantFile(this._client, assistantId, fileId, options);
  }

  /** Gets a list of files attached to a specific assistant, as used by tools that can read files. */
  listAssistantFiles(
    assistantId: string,
    options: ListAssistantFilesOptions = { requestOptions: {} },
  ): Promise<ListResponseOf<AssistantFile>> {
    return listAssistantFiles(this._client, assistantId, options);
  }

  /** Retrieves a file attached to an assistant. */
  getAssistantFile(
    assistantId: string,
    fileId: string,
    options: GetAssistantFileOptions = { requestOptions: {} },
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
    options: DeleteAssistantFileOptions = { requestOptions: {} },
  ): Promise<AssistantFileDeletionStatus> {
    return deleteAssistantFile(this._client, assistantId, fileId, options);
  }

  /** Creates a new thread. Threads contain messages and can be run by assistants. */
  createThread(
    body: AssistantThreadCreationOptions = {},
    options: CreateThreadOptions = { requestOptions: {} },
  ): Promise<AssistantThread> {
    return createThread(this._client, body, options);
  }

  /** Gets information about an existing thread. */
  getThread(
    threadId: string,
    options: GetThreadOptions = { requestOptions: {} },
  ): Promise<AssistantThread> {
    return getThread(this._client, threadId, options);
  }

  /** Modifies an existing thread. */
  updateThread(
    threadId: string,
    options: UpdateThreadOptions = { requestOptions: {} },
  ): Promise<AssistantThread> {
    return updateThread(this._client, threadId, options);
  }

  /** Deletes an existing thread. */
  deleteThread(
    threadId: string,
    options: DeleteThreadOptions = { requestOptions: {} },
  ): Promise<ThreadDeletionStatus> {
    return deleteThread(this._client, threadId, options);
  }

  /** Creates a new message on a specified thread. */
  createMessage(
    threadId: string,
    role: MessageRole,
    content: string,
    options: CreateMessageOptions = { requestOptions: {} },
  ): Promise<ThreadMessage> {
    return createMessage(this._client, threadId, role, content, options);
  }

  /** Gets a list of messages that exist on a thread. */
  listMessages(
    threadId: string,
    options: ListMessagesOptions = { requestOptions: {} },
  ): Promise<ListResponseOf<ThreadMessage>> {
    return listMessages(this._client, threadId, options);
  }

  /** Gets an existing message from an existing thread. */
  getMessage(
    threadId: string,
    messageId: string,
    options: GetMessageOptions = { requestOptions: {} },
  ): Promise<ThreadMessage> {
    return getMessage(this._client, threadId, messageId, options);
  }

  /** Modifies an existing message on an existing thread. */
  updateMessage(
    threadId: string,
    messageId: string,
    options: UpdateMessageOptions = { requestOptions: {} },
  ): Promise<ThreadMessage> {
    return updateMessage(this._client, threadId, messageId, options);
  }

  /** Gets a list of previously uploaded files associated with a message from a thread. */
  listMessageFiles(
    threadId: string,
    messageId: string,
    options: ListMessageFilesOptions = { requestOptions: {} },
  ): Promise<ListResponseOf<MessageFile>> {
    return listMessageFiles(this._client, threadId, messageId, options);
  }

  /** Gets information about a file attachment to a message within a thread. */
  getMessageFile(
    threadId: string,
    messageId: string,
    fileId: string,
    options: GetMessageFileOptions = { requestOptions: {} },
  ): Promise<MessageFile> {
    return getMessageFile(this._client, threadId, messageId, fileId, options);
  }

  /** Creates a new run for an assistant thread. */
  createRun(
    threadId: string,
    createRunOptions: CreateRunOptions,
    options: CreateRunRequestOptions = { requestOptions: {} },
  ): Promise<ThreadRun> {
    return createRun(this._client, threadId, createRunOptions, options);
  }

  /** Gets a list of runs for a specified thread. */
  listRuns(
    threadId: string,
    options: ListRunsOptions = { requestOptions: {} },
  ): Promise<ListResponseOf<ThreadRun>> {
    return listRuns(this._client, threadId, options);
  }

  /** Gets an existing run from an existing thread. */
  getRun(
    threadId: string,
    runId: string,
    options: GetRunOptions = { requestOptions: {} },
  ): Promise<ThreadRun> {
    return getRun(this._client, threadId, runId, options);
  }

  /** Modifies an existing thread run. */
  updateRun(
    threadId: string,
    runId: string,
    options: UpdateRunOptions = { requestOptions: {} },
  ): Promise<ThreadRun> {
    return updateRun(this._client, threadId, runId, options);
  }

  /** Submits outputs from tools as requested by tool calls in a run. Runs that need submitted tool outputs will have a status of 'requires_action' with a required_action.type of 'submit_tool_outputs'. */
  submitToolOutputsToRun(
    threadId: string,
    runId: string,
    toolOutputs: ToolOutput[],
    options: SubmitToolOutputsToRunOptions = { requestOptions: {} },
  ): Promise<ThreadRun> {
    return submitToolOutputsToRun(this._client, threadId, runId, toolOutputs, options);
  }

  /** Cancels a run of an in progress thread. */
  cancelRun(
    threadId: string,
    runId: string,
    options: CancelRunOptions = { requestOptions: {} },
  ): Promise<ThreadRun> {
    return cancelRun(this._client, threadId, runId, options);
  }

  /** Creates a new assistant thread and immediately starts a run using that new thread. */
  createThreadAndRun(
    body: CreateAndRunThreadOptions,
    options: CreateThreadAndRunOptions = { requestOptions: {} },
  ): Promise<ThreadRun> {
    return createThreadAndRun(this._client, body, options);
  }

  /** Gets a single run step from a thread run. */
  getRunStep(
    threadId: string,
    runId: string,
    stepId: string,
    options: GetRunStepOptions = { requestOptions: {} },
  ): Promise<RunStep> {
    return getRunStep(this._client, threadId, runId, stepId, options);
  }

  /** Gets a list of run steps from a thread run. */
  listRunSteps(
    threadId: string,
    runId: string,
    options: ListRunStepsOptions = { requestOptions: {} },
  ): Promise<ListResponseOf<RunStep>> {
    return listRunSteps(this._client, threadId, runId, options);
  }

  /** Gets a list of previously uploaded files. */
  listFiles(options: ListFilesOptions = { requestOptions: {} }): Promise<FileListResponse> {
    return listFiles(this._client, options);
  }

  /** Uploads a file for use by other operations. */
  uploadFile(
    file: Uint8Array,
    purpose: FilePurpose,
    options: UploadFileOptions = { requestOptions: {} },
  ): Promise<InputFile> {
    return uploadFile(this._client, file, purpose, options);
  }

  /** Delete a previously uploaded file. */
  deleteFile(
    fileId: string,
    options: DeleteFileOptions = { requestOptions: {} },
  ): Promise<FileDeletionStatus> {
    return deleteFile(this._client, fileId, options);
  }

  /** Returns information about a specific file. Does not retrieve file content. */
  getFile(fileId: string, options: GetFileOptions = { requestOptions: {} }): Promise<InputFile> {
    return getFile(this._client, fileId, options);
  }
}

function createOpenAIEndpoint(version: number): string {
  return `https://api.openai.com/v${version}`;
}

function isCred(cred: Record<string, any>): cred is TokenCredential | KeyCredential {
  return isTokenCredential(cred) || cred.key !== undefined;
}
