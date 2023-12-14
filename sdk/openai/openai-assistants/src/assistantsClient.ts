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
import { nonAzurePolicy } from "./api/policies/nonAzure.js";
import { getAssistantThreadsOperations, AssistantThreadsOperations } from "./classic/assistantThreads/index.js";
import { getAssistantsOperations, AssistantsOperations } from "./classic/assistants/index.js";
import { getFilesOperations, FilesOperations } from "./classic/files/index.js";
import { getRunStepsOperations, RunStepsOperations } from "./classic/runSteps/index.js";
import { getThreadMessagesOperations, ThreadMessagesOperations } from "./classic/threadMessages/index.js";
import { getThreadRunsOperations, ThreadRunsOperations } from "./classic/threadRuns/index.js";
import {
  AssistantsClientOptions,
} from "./index.js";
import { AssistantsContext } from "./rest/index.js";

export { AssistantsClientOptions } from "./api/AssistantsContext.js";

export class AssistantsClient {
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;
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
    this.pipeline = this._client.pipeline;
    this.assistants = getAssistantsOperations(this._client);
    this.assistantThreads = getAssistantThreadsOperations(this._client);
    this.threadMessages = getThreadMessagesOperations(this._client);
    this.threadRuns = getThreadRunsOperations(this._client);
    this.runSteps = getRunStepsOperations(this._client);
    this.files = getFilesOperations(this._client);
  }
}


function createOpenAIEndpoint(version: number): string {
  return `https://api.openai.com/v${version}`;
}

function isCred(cred: Record<string, any>): cred is TokenCredential | KeyCredential {
  return isTokenCredential(cred) || cred.key !== undefined;
}
