// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ChatMessage,
  ChatCompletion,
  ChatCompletionChunk,
} from "./models/models.js";
import { CreateOptions, CreateStreamingOptions } from "./models/options.js";
import {
  createChat,
  ChatClientOptions,
  ChatContext,
  create,
  createStreaming,
} from "./api/index.js";

export { ChatClientOptions } from "./api/ChatContext.js";

export class ChatClient {
  private _client: ChatContext;

  /** placeholder */
  constructor(endpoint: string, options: ChatClientOptions = {}) {
    this._client = createChat(endpoint, options);
  }

  /** placeholder */
  create(
    messages: ChatMessage[],
    stream: true,
    sessionState: any,
    extraArguments: Record<string, any>,
    options: CreateOptions = { requestOptions: {} }
  ): Promise<ChatCompletion> {
    return create(
      this._client,
      messages,
      stream,
      sessionState,
      extraArguments,
      options
    );
  }

  /** placeholder */
  createStreaming(
    messages: ChatMessage[],
    stream: false,
    sessionState: any,
    extraArguments: Record<string, any>,
    options: CreateStreamingOptions = { requestOptions: {} }
  ): Promise<ChatCompletionChunk> {
    return createStreaming(
      this._client,
      messages,
      stream,
      sessionState,
      extraArguments,
      options
    );
  }
}
