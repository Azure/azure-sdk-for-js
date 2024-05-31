// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  GetChatCompletionsParameters,
  GetModelInfoParameters,
  GetEmbeddingsParameters,
  GetImageEmbeddingsParameters,
} from "./parameters.js";
import {
  GetChatCompletions200Response,
  GetChatCompletionsDefaultResponse,
  GetModelInfo200Response,
  GetModelInfoDefaultResponse,
  GetEmbeddings200Response,
  GetEmbeddingsDefaultResponse,
  GetImageEmbeddings200Response,
  GetImageEmbeddingsDefaultResponse,
} from "./responses.js";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface GetChatCompletions {
  /**
   * Gets chat completions for the provided chat messages.
   * Completions support a wide variety of tasks and generate text that continues from or "completes"
   * provided prompt data.
   */
  post(
    options?: GetChatCompletionsParameters,
  ): StreamableMethod<
    GetChatCompletions200Response | GetChatCompletionsDefaultResponse
  >;
}

export interface GetModelInfo {
  /** Returns information about the AI model. */
  get(
    options?: GetModelInfoParameters,
  ): StreamableMethod<GetModelInfo200Response | GetModelInfoDefaultResponse>;
}

export interface GetEmbeddings {
  /** Return the embeddings for a given text prompt. */
  post(
    options?: GetEmbeddingsParameters,
  ): StreamableMethod<GetEmbeddings200Response | GetEmbeddingsDefaultResponse>;
}

export interface GetImageEmbeddings {
  /** Return the embeddings for given images. */
  post(
    options?: GetImageEmbeddingsParameters,
  ): StreamableMethod<
    GetImageEmbeddings200Response | GetImageEmbeddingsDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/chat/completions' has methods for the following verbs: post */
  (path: "/chat/completions"): GetChatCompletions;
  /** Resource for '/info' has methods for the following verbs: get */
  (path: "/info"): GetModelInfo;
  /** Resource for '/embeddings' has methods for the following verbs: post */
  (path: "/embeddings"): GetEmbeddings;
  /** Resource for '/images/embeddings' has methods for the following verbs: post */
  (path: "/images/embeddings"): GetImageEmbeddings;
}

export type ModelClientContext = Client & {
  path: Routes;
};
