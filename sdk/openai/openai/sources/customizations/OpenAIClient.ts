// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, KeyCredential, isTokenCredential } from "@azure/core-auth";
import {
  ChatMessage,
  createOpenAI,
  OpenAIContext,
  getEmbeddings,
  getCompletions,
  getChatCompletions,
  GetEmbeddingsOptions,
  GetCompletionsOptions,
  GetChatCompletionsOptions,
  OpenAIClientOptions,
} from "../generated/api/index.js";
import { getChatCompletionsResult, getCompletionsResult } from "./api/operations.js";
import { getSSEs } from "./api/sse.js";
import { ChatCompletions, Completions, Embeddings } from "../generated/api/models.js";
import { _getChatCompletionsSend, _getCompletionsSend } from "../generated/api/operations.js";

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
 * import { OpenAIClient } from "@azure/openai";
 * import { AzureKeyCredential } from "@azure/core-auth";
 *
 * const endpoint = "<azure endpoint>";
 * const credential = new AzureKeyCredential("<api key>");
 *
 * const client = new OpenAIClient(endpoint, credential);
 * ```
 *
 * #### Azure Active Directory
 *
 * ```js
 * import { OpenAIClient } from "@azure/openai";
 * import { DefaultAzureCredential } from "@azure/identity";
 *
 * const endpoint = "<azure endpoint>";
 * const credential = new DefaultAzureCredential();
 *
 * const client = new OpenAIClient(endpoint, credential);
 * ```
 */
export class OpenAIClient {
  private _client: OpenAIContext;
  private _isAzure = false;

  /**
   * Initializes an instance of OpenAIClient for use with an Azure OpenAI resource.
   * @param endpoint - The URI for an Azure OpenAI resource, including protocol and hostname.
   *                 For example: https://my-resource.openai.azure.com.
   * @param credential - A key credential used to authenticate to an Azure OpenAI resource.
   * @param options - The options for configuring the client.
   * @remarks
   *   This constructor initializes an OpenAIClient object that can only be used with Azure OpenAI resources.
   *   To use OpenAIClient with a non-Azure OpenAI inference endpoint, use a constructor that accepts a non-Azure OpenAI API key instead.
   */
  constructor(endpoint: string, credential: KeyCredential, options?: OpenAIClientOptions);
  /**
   * Initializes an instance of OpenAIClient for use with an Azure OpenAI resource.
   * @param endpoint - The URI for an Azure OpenAI resource, including protocol and hostname.
   *                 For example: https://my-resource.openai.azure.com.
   * @param credential - A token credential used to authenticate with an Azure OpenAI resource.
   * @param options - The options for configuring the client.
   */
  constructor(endpoint: string, credential: TokenCredential, options?: OpenAIClientOptions);
  /**
   * Initializes an instance of OpenAIClient for use with the non-Azure OpenAI endpoint.
   * @param openAiApiKey - The API key to use when connecting to the non-Azure OpenAI endpoint.
   * @param options - The options for configuring the client.
   * @remarks
   *   OpenAIClient objects initialized with this constructor can only be used with the non-Azure OpenAI inference endpoint.
   *   To use OpenAIClient with an Azure OpenAI resource, use a constructor that accepts a resource URI and Azure authentication credential instead.
   */
  constructor(openAiApiKey: KeyCredential, options?: OpenAIClientOptions);
  constructor(
    endpointOrOpenAiKey: string | KeyCredential,
    credOrOptions: KeyCredential | TokenCredential | OpenAIClientOptions = {},
    options: OpenAIClientOptions = {}
  ) {
    let opts: OpenAIClientOptions;
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
        credentials: {
          apiKeyHeaderName: credentials?.apiKeyHeaderName ?? "Authorization",
          scopes: credentials?.scopes,
        },
        ...restOpts,
      };
    }
    this._client = createOpenAI(endpoint, cred, {
      ...opts,
      ...(this._isAzure
        ? {}
        : {
            additionalPolicies: [
              ...(opts.additionalPolicies ?? []),
              {
                position: "perCall",
                policy: {
                  name: "openAiEndpoint",
                  sendRequest: (request, next) => {
                    const obj = new URL(request.url);
                    const parts = obj.pathname.split("/");
                    obj.pathname = `/${parts[1]}/${parts.slice(5).join("/")}`;
                    obj.searchParams.delete("api-version");
                    request.url = obj.toString();
                    return next(request);
                  },
                },
              },
            ],
          }),
    });
  }

  private setModel(model: string, options: { model?: string }): void {
    if (!this._isAzure) {
      options.model = model;
    }
  }

  /**
   * Returns textual completions as configured for a given prompt.
   * @param deploymentOrModelName - Specifies either the model deployment name (when using Azure OpenAI) or model name (when using non-Azure OpenAI) to use for this request.
   * @param prompt - The prompt to use for this request.
   * @param options - The options for this completions request.
   * @returns The completions for the given prompt.
   */
  getCompletions(
    deploymentOrModelName: string,
    prompt: string[],
    options: GetCompletionsOptions = { requestOptions: {} }
  ): Promise<Completions> {
    this.setModel(deploymentOrModelName, options);
    return getCompletions(this._client, prompt, deploymentOrModelName, options);
  }

  /**
   * Lists the completions tokens as they become available for a given prompt.
   * @param deploymentOrModelName - The name of the model deployment (when using Azure OpenAI) or model name (when using non-Azure OpenAI) to use for this request.
   * @param prompt - The prompt to use for this request.
   * @param options - The completions options for this completions request.
   * @returns An asynchronous iterable of completions tokens.
   */
  listCompletions(
    deploymentOrModelName: string,
    prompt: string[],
    options: GetCompletionsOptions = {}
  ): Promise<AsyncIterable<Omit<Completions, "usage">>> {
    this.setModel(deploymentOrModelName, options);
    const response = _getCompletionsSend(this._client, prompt, deploymentOrModelName, {
      ...options,
      stream: true,
    });
    return getSSEs(response, getCompletionsResult);
  }

  /**
   * Return the computed embeddings for a given prompt.
   * @param deploymentOrModelName - The name of the model deployment (when using Azure OpenAI) or model name (when using non-Azure OpenAI) to use for this request.
   * @param input - The prompt to use for this request.
   * @param options - The embeddings options for this embeddings request.
   * @returns The embeddings for the given prompt.
   */
  getEmbeddings(
    deploymentOrModelName: string,
    input: string[],
    options: GetEmbeddingsOptions = { requestOptions: {} }
  ): Promise<Embeddings> {
    this.setModel(deploymentOrModelName, options);
    return getEmbeddings(this._client, input, deploymentOrModelName, options);
  }

  /**
   * Get chat completions for provided chat context messages.
   * @param deploymentOrModelName - The name of the model deployment (when using Azure OpenAI) or model name (when using non-Azure OpenAI) to use for this request.
   * @param messages - The chat context messages to use for this request.
   * @param options - The chat completions options for this completions request.
   * @returns The chat completions for the given chat context messages.
   */
  getChatCompletions(
    deploymentOrModelName: string,
    messages: ChatMessage[],
    options: GetChatCompletionsOptions = { requestOptions: {} }
  ): Promise<ChatCompletions> {
    this.setModel(deploymentOrModelName, options);
    return getChatCompletions(this._client, messages, deploymentOrModelName, options);
  }

  /**
   * Lists the chat completions tokens as they become available for a chat context.
   * @param deploymentOrModelName - The name of the model deployment (when using Azure OpenAI) or model name (when using non-Azure OpenAI) to use for this request.
   * @param messages - The chat context messages to use for this request.
   * @param options - The chat completions options for this chat completions request.
   * @returns An asynchronous iterable of chat completions tokens.
   */
  listChatCompletions(
    deploymentOrModelName: string,
    messages: ChatMessage[],
    options: GetChatCompletionsOptions = { requestOptions: {} }
  ): Promise<AsyncIterable<Omit<ChatCompletions, "usage">>> {
    this.setModel(deploymentOrModelName, options);
    const response = _getChatCompletionsSend(this._client, messages, deploymentOrModelName, {
      ...options,
      stream: true,
    });
    return getSSEs(response, getChatCompletionsResult);
  }
}
