// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import {
  EmbeddingsOutput,
  ErrorResponseOutput,
  CompletionOutput,
} from "./outputModels";

/** The request has succeeded. */
export interface Embeddings200Response extends HttpResponse {
  status: "200";
  body: EmbeddingsOutput;
}

export interface EmbeddingsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface Completions200Headers {
  /** Request ID for troubleshooting purposes */
  "apim-request-id": string;
}

/** The request has succeeded. */
export interface Completions200Response extends HttpResponse {
  status: "200";
  body: CompletionOutput;
  headers: RawHttpHeaders & Completions200Headers;
}

export interface CompletionsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}
