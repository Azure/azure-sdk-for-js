// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import type { RequestParameters } from "@azure-rest/core-client";
import type {
  ExtraParameters,
  ChatCompletionsOptions,
  EmbeddingsOptions,
  ImageEmbeddingsOptions,
} from "./models.js";

export interface GetChatCompletionsHeaders {
  /**
   * Controls what happens if extra parameters, undefined by the REST API,
   * are passed in the JSON request payload.
   * This sets the HTTP request header `extra-parameters`.
   *
   * Possible values: "error", "drop", "pass-through"
   */
  "extra-parameters"?: ExtraParameters;
}

export interface GetChatCompletionsBodyParam {
  /** The options for chat completions. */
  body: ChatCompletionsOptions;
}

export interface GetChatCompletionsHeaderParam {
  headers?: RawHttpHeadersInput & GetChatCompletionsHeaders;
}

export type GetChatCompletionsParameters = GetChatCompletionsHeaderParam &
  GetChatCompletionsBodyParam &
  RequestParameters;
export type GetModelInfoParameters = RequestParameters;

export interface GetEmbeddingsHeaders {
  /**
   * Controls what happens if extra parameters, undefined by the REST API,
   * are passed in the JSON request payload.
   * This sets the HTTP request header `extra-parameters`.
   *
   * Possible values: "error", "drop", "pass-through"
   */
  "extra-parameters"?: ExtraParameters;
}

export interface GetEmbeddingsBodyParam {
  /** The body of the request containing the options for generating embeddings. */
  body: EmbeddingsOptions;
}

export interface GetEmbeddingsHeaderParam {
  headers?: RawHttpHeadersInput & GetEmbeddingsHeaders;
}

export type GetEmbeddingsParameters = GetEmbeddingsHeaderParam &
  GetEmbeddingsBodyParam &
  RequestParameters;

export interface GetImageEmbeddingsHeaders {
  /**
   * Controls what happens if extra parameters, undefined by the REST API,
   * are passed in the JSON request payload.
   * This sets the HTTP request header `extra-parameters`.
   *
   * Possible values: "error", "drop", "pass-through"
   */
  "extra-parameters"?: ExtraParameters;
}

export interface GetImageEmbeddingsBodyParam {
  /** The body of the request containing options for image embeddings. */
  body: ImageEmbeddingsOptions;
}

export interface GetImageEmbeddingsHeaderParam {
  headers?: RawHttpHeadersInput & GetImageEmbeddingsHeaders;
}

export type GetImageEmbeddingsParameters = GetImageEmbeddingsHeaderParam &
  GetImageEmbeddingsBodyParam &
  RequestParameters;
