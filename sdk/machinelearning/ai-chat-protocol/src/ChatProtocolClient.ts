// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, KeyCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";
import {
  StreamingChatCompletionOptions,
  ChatCompletionChunk,
  ChatCompletionOptions,
  ChatCompletion,
} from "./models/models.js";
import { CreateStreamingOptions, CreateOptions } from "./models/options.js";
import {
  createChatProtocol,
  ChatProtocolClientOptions,
  ChatProtocolContext,
  createStreaming,
  create,
} from "./api/index.js";

export { ChatProtocolClientOptions } from "./api/ChatProtocolContext.js";

export class ChatProtocolClient {
  private _client: ChatProtocolContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Azure APIs for the Azure Chat protocol. */
  constructor(
    endpoint: string,
    credential: KeyCredential | TokenCredential,
    options: ChatProtocolClientOptions = {}
  ) {
    this._client = createChatProtocol(endpoint, credential, options);
    this.pipeline = this._client.pipeline;
  }

  /** Creates a new streaming chat completion. */
  createStreaming(
    operationRoute: string,
    body: StreamingChatCompletionOptions,
    options: CreateStreamingOptions = { requestOptions: {} }
  ): Promise<ChatCompletionChunk> {
    return createStreaming(this._client, operationRoute, body, options);
  }

  /** Creates a new chat completion. */
  create(
    operationRoute: string,
    body: ChatCompletionOptions,
    options: CreateOptions = { requestOptions: {} }
  ): Promise<ChatCompletion> {
    return create(this._client, operationRoute, body, options);
  }
}
