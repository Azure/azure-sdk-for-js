// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import type { Client, StreamableMethod } from "@azure-rest/core-client";
import type {
  GetChatCompletionsParameters,
  GetEmbeddingsParameters,
  GetImageEmbeddingsParameters,
  GetModelInfoParameters,
} from "./parameters.js";
import type {
  GetChatCompletions200Response,
  GetChatCompletionsDefaultResponse,
  GetEmbeddings200Response,
  GetEmbeddingsDefaultResponse,
  GetImageEmbeddings200Response,
  GetImageEmbeddingsDefaultResponse,
  GetModelInfo200Response,
  GetModelInfoDefaultResponse,
} from "./responses.js";

export interface GetChatCompletions {
  /**
   * Gets chat completions for the provided chat messages.
   * Completions support a wide variety of tasks and generate text that continues from or "completes"
   * provided prompt data. The method makes a REST API call to the `/chat/completions` route
   * on the given endpoint.
   */
  post(
    options: GetChatCompletionsParameters,
  ): StreamableMethod<GetChatCompletions200Response | GetChatCompletionsDefaultResponse>;
}

export interface GetModelInfo {
  /**
   * Returns information about the AI model.
   * The method makes a REST API call to the `/info` route on the given endpoint.
   * This method will only work when using Serverless API or Managed Compute endpoint.
   * It will not work for GitHub Models endpoint or Azure OpenAI endpoint.
   */
  get(
    options?: GetModelInfoParameters,
  ): StreamableMethod<GetModelInfo200Response | GetModelInfoDefaultResponse>;
}

export interface GetEmbeddings {
  /**
   * Return the embedding vectors for given text prompts.
   * The method makes a REST API call to the `/embeddings` route on the given endpoint.
   */
  post(
    options: GetEmbeddingsParameters,
  ): StreamableMethod<GetEmbeddings200Response | GetEmbeddingsDefaultResponse>;
}

export interface GetImageEmbeddings {
  /**
   * Return the embedding vectors for given images.
   * The method makes a REST API call to the `/images/embeddings` route on the given endpoint.
   */
  post(
    options: GetImageEmbeddingsParameters,
  ): StreamableMethod<GetImageEmbeddings200Response | GetImageEmbeddingsDefaultResponse>;
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

export type ModelClient = Client & {
  path: Routes;
};
