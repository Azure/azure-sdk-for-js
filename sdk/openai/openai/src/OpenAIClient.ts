// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, KeyCredential, isTokenCredential } from "@azure/core-auth";
import {
  Completions,
  ChatCompletions,
  ImageGenerations,
  Embeddings,
  ChatRequestMessageUnion,
  EventStream,
} from "./models/models.js";
import {
  GetCompletionsOptions,
  GetChatCompletionsOptions,
  GetEmbeddingsOptions,
  GetImagesOptions,
} from "./models/options.js";
import { createOpenAI, OpenAIClientOptions, OpenAIContext } from "./api/index.js";
import {
  getCompletions,
  getChatCompletions,
  getImageGenerations,
  getEmbeddings,
  getAudioTranscription,
  getAudioTranslation,
} from "./api/operations.js";
import { nonAzurePolicy } from "./api/policies/nonAzure.js";
import { streamChatCompletions, streamCompletions } from "./api/operations.js";
import {
  GetAudioTranscriptionOptions,
  AudioResultSimpleJson,
  AudioResultFormat,
  AudioResult,
  GetAudioTranslationOptions,
} from "./models/audio.js";

function createOpenAIEndpoint(version: number): string {
  return `https://api.openai.com/v${version}`;
}

function isCred(cred: Record<string, any>): cred is TokenCredential | KeyCredential {
  return isTokenCredential(cred) || cred.key !== undefined;
}

export { OpenAIClientOptions } from "./api/OpenAIContext.js";
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
    options: OpenAIClientOptions = {},
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
                policy: nonAzurePolicy(),
              },
            ],
          }),
    });
  }

  private setModel(model: string, options: Record<string, any>): void {
    if (!this._isAzure) {
      options.model = model;
    }
  }

  /**
   * Returns the translation of an audio file.
   * @param deploymentName - The name of the model deployment (when using Azure OpenAI) or model name (when using non-Azure OpenAI) to use for this request.
   * @param fileContent - The content of the audio file to translate.
   * @param options - The options for this audio translation request.
   * @returns The audio translation result.
   */
  async getAudioTranslation(
    deploymentName: string,
    fileContent: Uint8Array,
    options?: GetAudioTranslationOptions,
  ): Promise<AudioResultSimpleJson>;
  /**
   * Returns the translation of an audio file.
   * @param deploymentName - The name of the model deployment (when using Azure OpenAI) or model name (when using non-Azure OpenAI) to use for this request.
   * @param fileContent - The content of the audio file to translate.
   * @param format - The format of the result object. See {@link AudioResultFormat} for possible values.
   * @param options - The options for this audio translation request.
   * @returns The audio translation result.
   */
  async getAudioTranslation<Format extends AudioResultFormat>(
    deploymentName: string,
    fileContent: Uint8Array,
    format: Format,
    options?: GetAudioTranslationOptions,
  ): Promise<AudioResult<Format>>;
  // implementation
  async getAudioTranslation<Format extends AudioResultFormat>(
    deploymentName: string,
    fileContent: Uint8Array,
    formatOrOptions?: Format | GetAudioTranslationOptions,
    inputOptions?: GetAudioTranslationOptions,
  ): Promise<AudioResult<Format>> {
    const options =
      inputOptions ?? (typeof formatOrOptions === "string" ? {} : formatOrOptions ?? {});
    const response_format = typeof formatOrOptions === "string" ? formatOrOptions : undefined;
    this.setModel(deploymentName, options);
    if (response_format === undefined) {
      return getAudioTranslation(this._client, deploymentName, fileContent, options) as Promise<
        AudioResult<Format>
      >;
    }
    return getAudioTranslation(this._client, deploymentName, fileContent, response_format, options);
  }

  /**
   * Returns the transcription of an audio file in a simple JSON format.
   * @param deploymentName - The name of the model deployment (when using Azure OpenAI) or model name (when using non-Azure OpenAI) to use for this request.
   * @param fileContent - The content of the audio file to transcribe.
   * @param options - The options for this audio transcription request.
   * @returns The audio transcription result in a simple JSON format.
   */
  async getAudioTranscription(
    deploymentName: string,
    fileContent: Uint8Array,
    options?: GetAudioTranscriptionOptions,
  ): Promise<AudioResultSimpleJson>;
  /**
   * Returns the transcription of an audio file.
   * @param deploymentName - The name of the model deployment (when using Azure OpenAI) or model name (when using non-Azure OpenAI) to use for this request.
   * @param fileContent - The content of the audio file to transcribe.
   * @param format - The format of the result object. See {@link AudioResultFormat} for possible values.
   * @param options - The options for this audio transcription request.
   * @returns The audio transcription result in a format of your choice.
   */
  async getAudioTranscription<Format extends AudioResultFormat>(
    deploymentName: string,
    fileContent: Uint8Array,
    format: Format,
    options?: GetAudioTranscriptionOptions,
  ): Promise<AudioResult<Format>>;
  // implementation
  async getAudioTranscription<Format extends AudioResultFormat>(
    deploymentName: string,
    fileContent: Uint8Array,
    formatOrOptions?: Format | GetAudioTranscriptionOptions,
    inputOptions?: GetAudioTranscriptionOptions,
  ): Promise<AudioResult<Format>> {
    const options =
      inputOptions ?? (typeof formatOrOptions === "string" ? {} : formatOrOptions ?? {});
    const response_format = typeof formatOrOptions === "string" ? formatOrOptions : undefined;
    this.setModel(deploymentName, options);
    if (response_format === undefined) {
      return getAudioTranscription(this._client, deploymentName, fileContent, options) as Promise<
        AudioResult<Format>
      >;
    }
    return getAudioTranscription(
      this._client,
      deploymentName,
      fileContent,
      response_format,
      options,
    );
  }

  /**
   * Gets completions for the provided input prompts.
   * Completions support a wide variety of tasks and generate text that continues from or "completes"
   * provided prompt data.
   */
  getCompletions(
    deploymentName: string,
    prompt: string[],
    options: GetCompletionsOptions = { requestOptions: {} },
  ): Promise<Completions> {
    this.setModel(deploymentName, options);
    return getCompletions(this._client, deploymentName, prompt, options);
  }

  /**
   * Lists the completions tokens as they become available for a given prompt.
   * @param deploymentName - The name of the model deployment (when using Azure OpenAI) or model name (when using non-Azure OpenAI) to use for this request.
   * @param prompt - The prompt to use for this request.
   * @param options - The completions options for this completions request.
   * @returns An asynchronous iterable of completions tokens.
   */
  streamCompletions(
    deploymentName: string,
    prompt: string[],
    options: GetCompletionsOptions = {},
  ): Promise<EventStream<Omit<Completions, "usage">>> {
    this.setModel(deploymentName, options);
    return streamCompletions(this._client, deploymentName, prompt, options);
  }

  /**
   * Gets chat completions for the provided chat messages.
   * Completions support a wide variety of tasks and generate text that continues from or "completes"
   * provided prompt data.
   */
  getChatCompletions(
    deploymentName: string,
    messages: ChatRequestMessageUnion[],
    options: GetChatCompletionsOptions = { requestOptions: {} },
  ): Promise<ChatCompletions> {
    this.setModel(deploymentName, options);
    return getChatCompletions(this._client, deploymentName, messages, options);
  }

  /**
   * Lists the chat completions tokens as they become available for a chat context.
   * @param deploymentName - The name of the model deployment (when using Azure OpenAI) or model name (when using non-Azure OpenAI) to use for this request.
   * @param messages - The chat context messages to use for this request.
   * @param options - The chat completions options for this chat completions request.
   * @returns An asynchronous iterable of chat completions tokens.
   */
  streamChatCompletions(
    deploymentName: string,
    messages: ChatRequestMessageUnion[],
    options: GetChatCompletionsOptions = { requestOptions: {} },
  ): Promise<EventStream<ChatCompletions>> {
    this.setModel(deploymentName, options);
    return streamChatCompletions(this._client, deploymentName, messages, options);
  }

  /** Creates an image given a prompt. */
  getImages(
    deploymentName: string,
    prompt: string,
    options: GetImagesOptions = { requestOptions: {} },
  ): Promise<ImageGenerations> {
    this.setModel(deploymentName, options);
    const { abortSignal, onResponse, requestOptions, tracingOptions, ...rest } = options;
    return getImageGenerations(this._client, deploymentName, prompt, rest);
  }

  /** Return the embeddings for a given prompt. */
  getEmbeddings(
    deploymentName: string,
    input: string[],
    options: GetEmbeddingsOptions = { requestOptions: {} },
  ): Promise<Embeddings> {
    this.setModel(deploymentName, options);
    return getEmbeddings(this._client, deploymentName, input, options);
  }
}
