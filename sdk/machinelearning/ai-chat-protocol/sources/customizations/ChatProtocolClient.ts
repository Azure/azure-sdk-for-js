// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { create } from "../generated/src/api/operations.js";
import {
  ChatCompletion,
  ChatCompletionOptions as GeneratedChatCompletionOptions,
  ChatCompletionChunk,
  ChatMessage,
} from "../generated/src/models/models.js";
import { ChatProtocolContext } from "./rest/clientDefinitions.js";
import { createStreaming } from "./api/operations.js";
import { CompletionOptions } from "./models/options.js";

export class ChatProtocolClient {
  private _client: ChatProtocolContext;
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
    return create(this._client, this._client.chatRoute, body, options);
  }
}
