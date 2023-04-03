// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  Paths1Vtxb06DeploymentsDeploymentIdCompletionsPostRequestbodyContentApplicationJsonSchema,
  Paths13PiqocDeploymentsDeploymentIdEmbeddingsPostRequestbodyContentApplicationJsonSchema,
  Paths1L1E8YpDeploymentsDeploymentIdChatCompletionsPostRequestbodyContentApplicationJsonSchema
} from "./models";

export interface CompletionsCreatePathParameters {
  /** endpoint - server parameter */
  endpoint: string;
}

export interface CompletionsCreateBodyParam {
  body: Paths1Vtxb06DeploymentsDeploymentIdCompletionsPostRequestbodyContentApplicationJsonSchema;
}

export interface CompletionsCreatePathParam {
  pathParameters: CompletionsCreatePathParameters;
}

export interface CompletionsCreateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CompletionsCreateParameters = CompletionsCreatePathParam &
  CompletionsCreateMediaTypesParam &
  CompletionsCreateBodyParam &
  RequestParameters;

export interface EmbeddingsCreatePathParameters {
  /** endpoint - server parameter */
  endpoint: string;
}

export interface EmbeddingsCreateBodyParam {
  body: Paths13PiqocDeploymentsDeploymentIdEmbeddingsPostRequestbodyContentApplicationJsonSchema;
}

export interface EmbeddingsCreatePathParam {
  pathParameters: EmbeddingsCreatePathParameters;
}

export interface EmbeddingsCreateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type EmbeddingsCreateParameters = EmbeddingsCreatePathParam &
  EmbeddingsCreateMediaTypesParam &
  EmbeddingsCreateBodyParam &
  RequestParameters;

export interface ChatCompletionsCreatePathParameters {
  /** endpoint - server parameter */
  endpoint: string;
}

export interface ChatCompletionsCreateBodyParam {
  body: Paths1L1E8YpDeploymentsDeploymentIdChatCompletionsPostRequestbodyContentApplicationJsonSchema;
}

export interface ChatCompletionsCreatePathParam {
  pathParameters: ChatCompletionsCreatePathParameters;
}

export interface ChatCompletionsCreateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ChatCompletionsCreateParameters = ChatCompletionsCreatePathParam &
  ChatCompletionsCreateMediaTypesParam &
  ChatCompletionsCreateBodyParam &
  RequestParameters;
