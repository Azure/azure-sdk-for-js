// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, KeyCredential } from "@azure/core-auth";
import { ClientOptions } from "./common/interfaces.js";
import {
  Embeddings,
  Completions,
  ChatMessage,
  ChatCompletions,
  createOpenAI,
  OpenAIContext,
  getEmbeddings,
  getCompletions,
  getChatCompletions,
  GetEmbeddingsOptions,
  GetCompletionsOptions,
  GetChatCompletionsOptions,
} from "./api/index.js";

export class OpenAIClient {
  private _client: OpenAIContext;

  /** Azure OpenAI APIs for completions and search */
  constructor(
    endpoint: string,
    credential: KeyCredential | TokenCredential,
    options: ClientOptions = {}
  ) {
    this._client = createOpenAI(endpoint, credential, options);
  }

  getEmbeddings(
    input: string | string[],
    deploymentId: string,
    options: GetEmbeddingsOptions = { requestOptions: {} }
  ): Promise<Embeddings> {
    return getEmbeddings(this._client, input, deploymentId, options);
  }

  getCompletions(
    prompt: string[],
    deploymentId: string,
    options: GetCompletionsOptions = { requestOptions: {} }
  ): Promise<Completions> {
    return getCompletions(this._client, prompt, deploymentId, options);
  }

  getChatCompletions(
    messages: ChatMessage[],
    deploymentId: string,
    options: GetChatCompletionsOptions = { requestOptions: {} }
  ): Promise<ChatCompletions> {
    return getChatCompletions(this._client, messages, deploymentId, options);
  }
}
