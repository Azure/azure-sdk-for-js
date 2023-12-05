// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, KeyCredential, isTokenCredential } from "@azure/core-auth";
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
  ThreadDeletionStatus,
  AssistantMessageFile,
  AssistantRun,
  ToolOutputSubmission,
  CreateAndRunThreadOptions,
  RunStep,
  FilePurpose,
  FileListResponse,
  File,
  FileDeletionStatus,
} from "./models/models.js";
import {
  AssistantsCreateAssistantOptions,
  AssistantsListAssistantsOptions,
  AssistantsRetrieveAssistantOptions,
  AssistantsModifyAssistantOptions,
  AssistantsDeleteAssistantOptions,
  AssistantsCreateAssistantFileOptions,
  AssistantsListAssistantFilesOptions,
  AssistantsRetrieveAssistantFileOptions,
  AssistantsDeleteAssistantFileOptions,
  AssistantThreadsCreateThreadOptions,
  AssistantThreadsRetrieveThreadOptions,
  AssistantThreadsModifyThreadOptions,
  AssistantThreadsDeleteThreadOptions,
  AssistantMessagesCreateMessageOptions,
  AssistantMessagesListMessagesOptions,
  AssistantMessagesRetrieveMessageOptions,
  AssistantMessagesModifyMessageOptions,
  AssistantMessagesListMessageFilesOptions,
  AssistantMessagesRetrieveMessageFileOptions,
  AssistantRunsCreateRunOptions,
  AssistantRunsListRunsOptions,
  AssistantRunsRetrieveRunOptions,
  AssistantRunsModifyRunOptions,
  AssistantRunsSubmitRunToolOutputsOptions,
  AssistantRunsCancelRunOptions,
  AssistantRunsCreateThreadAndRunOptions,
  RunStepsRetrieveRunStepOptions,
  RunStepsListRunStepsOptions,
  FilesListFilesOptions,
  FilesUploadFileOptions,
  FilesDeleteFileOptions,
  FilesRetrieveFileOptions,
  FilesRetrieveFileContentOptions,
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
  createMessage,
  listMessages,
  retrieveMessage,
  modifyMessage,
  listMessageFiles,
  retrieveMessageFile,
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
import { nonAzurePolicy } from "./api/policies/nonAzure.js";

function createOpenAIEndpoint(version: number): string {
  return `https://api.openai.com/v${version}`;
}

function isCred(cred: Record<string, any>): cred is TokenCredential | KeyCredential {
  return isTokenCredential(cred) || cred.key !== undefined;
}

export { AssistantsClientOptions } from "./api/AssistantsContext.js";

export class AssistantsClient {
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
    options: AssistantsClientOptions = {}
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
  }

  /** Creates an assistant with a model and instructions. */
  createAssistant(
    body: AssistantCreationOptions,
    options: AssistantsCreateAssistantOptions = { requestOptions: {} }
  ): Promise<Assistant> {
    return createAssistant(this._client, body, options);
  }

  /** Returns a list of assistants. */
  listAssistants(
    options: AssistantsListAssistantsOptions = { requestOptions: {} }
  ): Promise<ListResponseOf<Assistant>> {
    return listAssistants(this._client, options);
  }

  /** Retrieves an assistant. */
  retrieveAssistant(
    assistantId: string,
    options: AssistantsRetrieveAssistantOptions = { requestOptions: {} }
  ): Promise<Assistant> {
    return retrieveAssistant(this._client, assistantId, options);
  }

  /** Modifies an assistant. */
  modifyAssistant(
    assistantId: string,
    modificationOptions: AssistantModificationOptions,
    options: AssistantsModifyAssistantOptions = { requestOptions: {} }
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
    options: AssistantsDeleteAssistantOptions = { requestOptions: {} }
  ): Promise<AssistantDeletionStatus> {
    return deleteAssistant(this._client, assistantId, options);
  }

  /** Attaches a file to an assistant for use by tools that can read files. */
  createAssistantFile(
    assistantId: string,
    fileId: string,
    options: AssistantsCreateAssistantFileOptions = { requestOptions: {} }
  ): Promise<AssistantFile> {
    return createAssistantFile(this._client, assistantId, fileId, options);
  }

  /** Returns a list of assistant files. */
  listAssistantFiles(
    assistantId: string,
    options: AssistantsListAssistantFilesOptions = { requestOptions: {} }
  ): Promise<ListResponseOf<AssistantFile>> {
    return listAssistantFiles(this._client, assistantId, options);
  }

  /** Retrieves a file attached to an assistant. */
  retrieveAssistantFile(
    assistantId: string,
    fileId: string,
    options: AssistantsRetrieveAssistantFileOptions = { requestOptions: {} }
  ): Promise<AssistantFile> {
    return retrieveAssistantFile(this._client, assistantId, fileId, options);
  }

  /** Deletes an assistant file. */
  deleteAssistantFile(
    assistantId: string,
    fileId: string,
    options: AssistantsDeleteAssistantFileOptions = { requestOptions: {} }
  ): Promise<AssistantFileDeletionStatus> {
    return deleteAssistantFile(this._client, assistantId, fileId, options);
  }

  /** Creates a new thread for an assistant. */
  createThread(
    body: AssistantThreadCreationOptions = {},
    options: AssistantThreadsCreateThreadOptions = { requestOptions: {} }
  ): Promise<AssistantThread> {
    return createThread(this._client, body, options);
  }

  /** Retrieves an existing thread for an assistant. */
  retrieveThread(
    threadId: string,
    options: AssistantThreadsRetrieveThreadOptions = { requestOptions: {} }
  ): Promise<AssistantThread> {
    return retrieveThread(this._client, threadId, options);
  }

  /** Modifies an existing thread for an assistant. */
  modifyThread(
    threadId: string,
    options: AssistantThreadsModifyThreadOptions = { requestOptions: {} }
  ): Promise<AssistantThread> {
    return modifyThread(this._client, threadId, options);
  }

  /** Deletes a thread. */
  deleteThread(
    threadId: string,
    options: AssistantThreadsDeleteThreadOptions = { requestOptions: {} }
  ): Promise<ThreadDeletionStatus> {
    return deleteThread(this._client, threadId, options);
  }

  /** Returns a list of messages from a thread. */
  createMessage(
    threadId: string,
    role: AssistantRole,
    content: string,
    options: AssistantMessagesCreateMessageOptions = { requestOptions: {} }
  ): Promise<AssistantMessage> {
    return createMessage(this._client, threadId, role, content, options);
  }

  /** Returns a list of messages from a thread. */
  listMessages(
    threadId: string,
    options: AssistantMessagesListMessagesOptions = { requestOptions: {} }
  ): Promise<ListResponseOf<AssistantMessage>> {
    return listMessages(this._client, threadId, options);
  }

  /** Retrieves a message associated with a thread. */
  retrieveMessage(
    threadId: string,
    messageId: string,
    options: AssistantMessagesRetrieveMessageOptions = { requestOptions: {} }
  ): Promise<AssistantMessage> {
    return retrieveMessage(this._client, threadId, messageId, options);
  }

  /** Modifies an existing message associated with a thread. */
  modifyMessage(
    threadId: string,
    messageId: string,
    options: AssistantMessagesModifyMessageOptions = { requestOptions: {} }
  ): Promise<AssistantMessage> {
    return modifyMessage(this._client, threadId, messageId, options);
  }

  /** Returns a list of files associated with a message from a thread. */
  listMessageFiles(
    threadId: string,
    messageId: string,
    options: AssistantMessagesListMessageFilesOptions = { requestOptions: {} }
  ): Promise<ListResponseOf<AssistantMessageFile>> {
    return listMessageFiles(this._client, threadId, messageId, options);
  }

  /** Retrieves a file attached to a message within a thread. */
  retrieveMessageFile(
    threadId: string,
    messageId: string,
    fileId: string,
    options: AssistantMessagesRetrieveMessageFileOptions = { requestOptions: {} }
  ): Promise<AssistantMessageFile> {
    return retrieveMessageFile(
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
    options: AssistantRunsCreateRunOptions = { requestOptions: {} }
  ): Promise<AssistantRun> {
    return createRun(this._client, threadId, assistantId, options);
  }

  /** Returns a list of runs associated with an assistant thread. */
  listRuns(
    threadId: string,
    options: AssistantRunsListRunsOptions = { requestOptions: {} }
  ): Promise<ListResponseOf<AssistantRun>> {
    return listRuns(this._client, threadId, options);
  }

  /** Retrieves an existing run associated with an assistant thread. */
  retrieveRun(
    threadId: string,
    runId: string,
    options: AssistantRunsRetrieveRunOptions = { requestOptions: {} }
  ): Promise<AssistantRun> {
    return retrieveRun(this._client, threadId, runId, options);
  }

  /** Modifies an existing run associated with an assistant thread. */
  modifyRun(
    threadId: string,
    runId: string,
    options: AssistantRunsModifyRunOptions = { requestOptions: {} }
  ): Promise<AssistantRun> {
    return modifyRun(this._client, threadId, runId, options);
  }

  /** Submits outputs from tool calls as requested by a run with a status of 'requires_action' with required_action.type of 'submit_tool_outputs'. */
  submitRunToolOutputs(
    threadId: string,
    runId: string,
    toolOutputs: ToolOutputSubmission[],
    options: AssistantRunsSubmitRunToolOutputsOptions = { requestOptions: {} }
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
    options: AssistantRunsCancelRunOptions = { requestOptions: {} }
  ): Promise<AssistantRun> {
    return cancelRun(this._client, threadId, runId, options);
  }

  /** Creates a new assistant thread and immediately starts a run using that new thread. */
  createThreadAndRun(
    body: CreateAndRunThreadOptions,
    options: AssistantRunsCreateThreadAndRunOptions = { requestOptions: {} }
  ): Promise<AssistantRun> {
    return createThreadAndRun(this._client, body, options);
  }

  /** Retrieves a single run step associated with an assistant thread run. */
  retrieveRunStep(
    threadId: string,
    runId: string,
    stepId: string,
    options: RunStepsRetrieveRunStepOptions = { requestOptions: {} }
  ): Promise<RunStep> {
    return retrieveRunStep(this._client, threadId, runId, stepId, options);
  }

  /** Returns a list of run steps associated an assistant thread run. */
  listRunSteps(
    threadId: string,
    runId: string,
    options:RunStepsListRunStepsOptions = { requestOptions: {} }
  ): Promise<ListResponseOf<RunStep>> {
    return listRunSteps(this._client, threadId, runId, options);
  }

  /** Returns a list of files that belong to the user's organization. */
  listFiles(
    options: FilesListFilesOptions = { requestOptions: {} }
  ): Promise<FileListResponse> {
    return listFiles(this._client, options);
  }

  /** Upload a file that can be used across various endpoints. */
  uploadFile(
    file: Uint8Array,
    purpose: FilePurpose,
    options: FilesUploadFileOptions = { requestOptions: {} }
  ): Promise<File> {
    return uploadFile(this._client, file, purpose, options);
  }

  /** Delete a previously uploaded file. */
  deleteFile(
    fileId: string,
    options: FilesDeleteFileOptions = { requestOptions: {} }
  ): Promise<FileDeletionStatus> {
    return deleteFile(this._client, fileId, options);
  }

  /** Returns information about a specific file. Does not retrieve file content. */
  retrieveFile(
    fileId: string,
    options: FilesRetrieveFileOptions = { requestOptions: {} }
  ): Promise<File> {
    return retrieveFile(this._client, fileId, options);
  }

  /** Returns the contents of a specified file. */
  retrieveFileContent(
    fileId: string,
    options: FilesRetrieveFileContentOptions = { requestOptions: {} }
  ): Promise<Uint8Array> {
    return retrieveFileContent(this._client, fileId, options);
  }
}
