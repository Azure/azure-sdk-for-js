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
  CreateMessageOptions,
  ListMessagesOptions,
  RetrieveMessageOptions,
  ModifyMessageOptions,
  ListMessageFilesOptions,
  RetrieveMessageFileOptions,
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
  ): Promise<ThreadDeletionStatus> {
    return deleteThread(this._client, threadId, options);
  }

  /** Returns a list of messages from a thread. */
  createMessage(
    threadId: string,
    role: AssistantRole,
    content: string,
    options: CreateMessageOptions = { requestOptions: {} }
  ): Promise<AssistantMessage> {
    return createMessage(this._client, threadId, role, content, options);
  }

  /** Returns a list of messages from a thread. */
  listMessages(
    threadId: string,
    options: ListMessagesOptions = { requestOptions: {} }
  ): Promise<ListResponseOf> {
    return listMessages(this._client, threadId, options);
  }

  /** Retrieves a message associated with a thread. */
  retrieveMessage(
    threadId: string,
    messageId: string,
    options: RetrieveMessageOptions = { requestOptions: {} }
  ): Promise<AssistantMessage> {
    return retrieveMessage(this._client, threadId, messageId, options);
  }

  /** Modifies an existing message associated with a thread. */
  modifyMessage(
    threadId: string,
    messageId: string,
    options: ModifyMessageOptions = { requestOptions: {} }
  ): Promise<AssistantMessage> {
    return modifyMessage(this._client, threadId, messageId, options);
  }

  /** Returns a list of files associated with a message from a thread. */
  listMessageFiles(
    threadId: string,
    messageId: string,
    options: ListMessageFilesOptions = { requestOptions: {} }
  ): Promise<ListResponseOf> {
    return listMessageFiles(this._client, threadId, messageId, options);
  }

  /** Retrieves a file attached to a message within a thread. */
  retrieveMessageFile(
    threadId: string,
    messageId: string,
    fileId: string,
    options: RetrieveMessageFileOptions = { requestOptions: {} }
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
    toolOutputs: ToolOutputSubmission[],
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
    body: CreateAndRunThreadOptions,
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
