// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EmbeddingsParameters, CompletionsParameters } from "./parameters";
import {
  Embeddings200Response,
  EmbeddingsDefaultResponse,
  Completions200Response,
  CompletionsDefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface Embeddings {
  /** Return the embeddings for a given prompt. */
  post(
    options?: EmbeddingsParameters
  ): StreamableMethod<Embeddings200Response | EmbeddingsDefaultResponse>;
}

export interface Completions {
  /** Return the completions for a given prompt. */
  post(
    options?: CompletionsParameters
  ): StreamableMethod<Completions200Response | CompletionsDefaultResponse>;
}

export interface Routes {
  /** Resource for '/deployments/\{deploymentId\}/embeddings' has methods for the following verbs: post */
  (
    path: "/deployments/{deploymentId}/embeddings",
    deploymentId: string
  ): Embeddings;
  /** Resource for '/deployments/\{deploymentId\}/completions' has methods for the following verbs: post */
  (
    path: "/deployments/{deploymentId}/completions",
    deploymentId: string
  ): Completions;
}

export type OpenAIInferenceClient = Client & {
  path: Routes;
};
