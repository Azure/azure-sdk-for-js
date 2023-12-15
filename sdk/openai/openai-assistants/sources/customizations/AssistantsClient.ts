// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, KeyCredential, isTokenCredential } from "@azure/core-auth";
import { InputFile, ListResponseOf } from "./models/models.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { AssistantsOperations } from "./classic/assistants/index.js";
import { getAssistantsOperations } from "../generated/src/classic/assistants/index.js";
import {
  getAssistantThreadsOperations,
  AssistantThreadsOperations,
} from "../generated/src/classic/assistantThreads/index.js";
import { ThreadMessagesOperations } from "./classic/threadMessages/index.js";
import { getThreadMessagesOperations } from "../generated/src/classic/threadMessages/index.js";
import { ThreadRunsOperations } from "./classic/threadRuns/index.js";
import { getThreadRunsOperations } from "../generated/src/classic/threadRuns/index.js";
import { getRunStepsOperations } from "../generated/src/classic/runSteps/index.js";
import { RunStepsOperations } from "./classic/runSteps/index.js";
import { FilesOperations } from "./classic/files/index.js";
import { getFilesOperations } from "../generated/src/classic/files/index.js";
import {
  Assistant,
  AssistantsClientOptions,
  AssistantsListAssistantsOptions,
  AssistantThread,
  AssistantThreadsCreateThreadOptions,
  AssistantThreadCreationOptions,
  FilePurpose,
  FilesRetrieveFileOptions,
  FilesUploadFileOptions,
} from "../generated/src/index.js";
import { AssistantsContext } from "../generated/src/rest/index.js";
import { createAssistants } from "../generated/src/api/AssistantsContext.js";
import { listAssistants } from "./api/operations.js";
import { createThread } from "../generated/src/api/assistantThreads/index.js";
import { retrieveFile, uploadFile } from "../generated/src/api/files/index.js";
import { nonAzurePolicy } from "./api/policies/nonAzure.js";

function createOpenAIEndpoint(version: number): string {
  return `https://api.openai.com/v${version}`;
}

function isCred(cred: Record<string, any>): cred is TokenCredential | KeyCredential {
  return isTokenCredential(cred) || cred.key !== undefined;
}

/**
 * A client for interacting with Azure OpenAI.
 *
 * The client needs the endpoint of an OpenAI resource and an authentication
 * method such as an API key or token. The API key and endpoint can be found in
 * the OpenAI resource page. They will be located in the resource's Keys and Endpoint page.
 *
 * ### Examples for authentication:
 *
 * #### API Key
 *
 * ```js
 * import { AssistantsClient } from "@azure/openai-assistants";
 * import { AzureKeyCredential } from "@azure/core-auth";
 *
 * const endpoint = "<azure endpoint>";
 * const credential = new AzureKeyCredential("<api key>");
 *
 * const client = new AssistantsClient(endpoint, credential);
 * ```
 *
 * #### Azure Active Directory
 *
 * ```js
 * import { AssistantsClient } from "@azure/openai";
 * import { DefaultAzureCredential } from "@azure/identity";
 *
 * const endpoint = "<azure endpoint>";
 * const credential = new DefaultAzureCredential();
 *
 * const client = new AssistantsClient(endpoint, credential);
 * ```
 */
export class AssistantsClient {
  private _client: AssistantsContext;
  private _isAzure = false;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

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
    this.pipeline = this._client.pipeline;
    this.assistants = getAssistantsOperations(this._client);
    this.assistantThreads = getAssistantThreadsOperations(this._client);
    this.threadMessages = getThreadMessagesOperations(this._client);
    this.threadRuns = getThreadRunsOperations(this._client);
    this.runSteps = getRunStepsOperations(this._client);
    this.files = getFilesOperations(this._client);
  }

  /** Creates a new thread for an assistant. */
  createThread(
    body: AssistantThreadCreationOptions = {},
    options: AssistantThreadsCreateThreadOptions = { requestOptions: {} }
  ): Promise<AssistantThread> {
    return createThread(this._client, body, options);
  }

  /** Returns a list of assistants. */
  listAssistants(
    options: AssistantsListAssistantsOptions = { requestOptions: {} }
  ): Promise<ListResponseOf<Assistant>> {
    return listAssistants(this._client, options);
  }

  /** Upload a file that can be used across various endpoints. */
  uploadFile(
    file: Uint8Array,
    purpose: FilePurpose,
    options: FilesUploadFileOptions = { requestOptions: {} }
  ): Promise<InputFile> {
    return uploadFile(this._client, file, purpose, options);
  }

  /** Returns information about a specific file. Does not retrieve file content. */
  retrieveFile(
    fileId: string,
    options: FilesRetrieveFileOptions = { requestOptions: {} }
  ): Promise<InputFile> {
    return retrieveFile(this._client, fileId, options);
  }

  /** The operation groups for Assistants */
  public readonly assistants: AssistantsOperations;
  /** The operation groups for AssistantThreads */
  public readonly assistantThreads: AssistantThreadsOperations;
  /** The operation groups for ThreadMessages */
  public readonly threadMessages: ThreadMessagesOperations;
  /** The operation groups for ThreadRuns */
  public readonly threadRuns: ThreadRunsOperations;
  /** The operation groups for RunSteps */
  public readonly runSteps: RunStepsOperations;
  /** The operation groups for Files */
  public readonly files: FilesOperations;
}
