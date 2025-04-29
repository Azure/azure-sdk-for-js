// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import type { RequestParameters } from "@azure-rest/core-client";
import type { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import type {
  ChatCompletionsNamedToolChoice,
  ChatCompletionsResponseFormat,
  ChatCompletionsToolChoicePreset,
  ChatCompletionsToolDefinition,
  ChatRequestMessage,
  EmbeddingEncodingFormat,
  EmbeddingInputType,
  ExtraParameters,
  ImageEmbeddingInput,
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
  body: {
    messages: Array<ChatRequestMessage>;
    frequency_penalty?: number;
    stream?: boolean;
    presence_penalty?: number;
    temperature?: number;
    top_p?: number;
    max_tokens?: number;
    response_format?: ChatCompletionsResponseFormat;
    stop?: string[];
    tools?: Array<ChatCompletionsToolDefinition>;
    tool_choice?: ChatCompletionsToolChoicePreset | ChatCompletionsNamedToolChoice;
    seed?: number;
    model?: string;
  };
}

export interface GetChatCompletionsHeaderParam {
  headers?: RawHttpHeadersInput & GetChatCompletionsHeaders;
}

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
  body?: {
    input: string[];
    dimensions?: number;
    encoding_format?: EmbeddingEncodingFormat;
    input_type?: EmbeddingInputType;
    model?: string;
  };
}

export interface GetEmbeddingsHeaderParam {
  headers?: RawHttpHeadersInput & GetEmbeddingsHeaders;
}

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
  body: {
    input: Array<ImageEmbeddingInput>;
    dimensions?: number;
    encoding_format?: EmbeddingEncodingFormat;
    input_type?: EmbeddingInputType;
    model?: string;
  };
}

export interface GetImageEmbeddingsHeaderParam {
  headers?: RawHttpHeadersInput & GetImageEmbeddingsHeaders;
}

export type GetChatCompletionsParameters = GetChatCompletionsHeaderParam &
  GetChatCompletionsBodyParam &
  RequestParameters;
export type GetModelInfoParameters = RequestParameters;
export type GetEmbeddingsParameters = GetEmbeddingsHeaderParam &
  GetEmbeddingsBodyParam &
  RequestParameters;
export type GetImageEmbeddingsParameters = GetImageEmbeddingsHeaderParam &
  GetImageEmbeddingsBodyParam &
  RequestParameters;
