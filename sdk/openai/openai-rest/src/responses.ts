// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import {
  PathsMaorw9DeploymentsDeploymentIdCompletionsPostResponses200ContentApplicationJsonSchemaOutput,
  ErrorResponseOutput,
  Paths15Cw454DeploymentsDeploymentIdEmbeddingsPostResponses200ContentApplicationJsonSchemaOutput,
  Paths1H0F83DeploymentsDeploymentIdChatCompletionsPostResponses200ContentApplicationJsonSchemaOutput
} from "./outputModels";

export interface CompletionsCreate200Headers {
  /** Request ID for troubleshooting purposes */
  "apim-request-id"?: string;
}

/** Creates a completion for the provided prompt, parameters and chosen model. */
export interface CompletionsCreate200Response extends HttpResponse {
  status: "200";
  body: PathsMaorw9DeploymentsDeploymentIdCompletionsPostResponses200ContentApplicationJsonSchemaOutput;
  headers: RawHttpHeaders & CompletionsCreate200Headers;
}

export interface CompletionsCreateDefaultHeaders {
  /** Request ID for troubleshooting purposes */
  "apim-request-id"?: string;
}

/** Creates a completion for the provided prompt, parameters and chosen model. */
export interface CompletionsCreateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & CompletionsCreateDefaultHeaders;
}

/** Get a vector representation of a given input that can be easily consumed by machine learning models and algorithms. */
export interface EmbeddingsCreate200Response extends HttpResponse {
  status: "200";
  body: Paths15Cw454DeploymentsDeploymentIdEmbeddingsPostResponses200ContentApplicationJsonSchemaOutput;
}

/** Creates a completion for the chat message */
export interface ChatCompletionsCreate200Response extends HttpResponse {
  status: "200";
  body: Paths1H0F83DeploymentsDeploymentIdChatCompletionsPostResponses200ContentApplicationJsonSchemaOutput;
}
