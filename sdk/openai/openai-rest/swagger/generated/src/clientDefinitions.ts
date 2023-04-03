// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CompletionsCreateParameters,
  EmbeddingsCreateParameters,
  ChatCompletionsCreateParameters
} from "./parameters";
import {
  CompletionsCreate200Response,
  CompletionsCreateDefaultResponse,
  EmbeddingsCreate200Response,
  ChatCompletionsCreate200Response
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface CompletionsCreate {
  /** Creates a completion for the provided prompt, parameters and chosen model. */
  post(
    options: CompletionsCreateParameters
  ): StreamableMethod<
    CompletionsCreate200Response | CompletionsCreateDefaultResponse
  >;
}

export interface EmbeddingsCreate {
  /** Get a vector representation of a given input that can be easily consumed by machine learning models and algorithms. */
  post(
    options: EmbeddingsCreateParameters
  ): StreamableMethod<EmbeddingsCreate200Response>;
}

export interface ChatCompletionsCreate {
  /** Creates a completion for the chat message */
  post(
    options: ChatCompletionsCreateParameters
  ): StreamableMethod<ChatCompletionsCreate200Response>;
}

export interface Routes {
  /** Resource for '/deployments/\{deployment-id\}/completions' has methods for the following verbs: post */
  (
    path: "/deployments/{deployment-id}/completions",
    deploymentId: string
  ): CompletionsCreate;
  /** Resource for '/deployments/\{deployment-id\}/embeddings' has methods for the following verbs: post */
  (
    path: "/deployments/{deployment-id}/embeddings",
    deploymentId: string
  ): EmbeddingsCreate;
  /** Resource for '/deployments/\{deployment-id\}/chat/completions' has methods for the following verbs: post */
  (
    path: "/deployments/{deployment-id}/chat/completions",
    deploymentId: string
  ): ChatCompletionsCreate;
}

export type AzureOpenAIServiceAPIClient = Client & {
  path: Routes;
};
