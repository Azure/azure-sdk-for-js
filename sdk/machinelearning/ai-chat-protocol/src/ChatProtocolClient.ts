// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";
import {
  ChatProtocolClientOptions,
  ChatProtocolContext,
  create,
  createChatProtocol,
  createStreaming,
} from "./api/index.js";
import {
  ChatCompletion,
  ChatCompletionChunk,
  ChatMessage,
  ChatCompletionOptions as GeneratedChatCompletionOptions,
} from "./models/models.js";
import { CompletionOptions } from "./models/options.js";

export { ChatProtocolClientOptions } from "./api/ChatProtocolContext.js";

export class ChatProtocolClient {
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;
  private _client: ChatProtocolContext;

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
    messages: ChatMessage[],
    options: CompletionOptions = { requestOptions: {} }
  ): AsyncIterable<ChatCompletionChunk> {
    return createStreaming(this._client, messages, options);
  }

  /** Creates a new chat completion. */
  create(
    messages: ChatMessage[],
    options: CompletionOptions = { requestOptions: {} }
  ): Promise<ChatCompletion> {
    let body: GeneratedChatCompletionOptions = {
      messages: messages,
      stream: false,
      sessionState: options.sessionState,
      context: options.context,
    };
    return create(this._client, body, options);
  }
}
