// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import { RequestParameters } from "@azure-rest/core-client";
import {
  UnknownParams,
  ChatRequestMessage,
  ChatCompletionsResponseFormat,
  ChatCompletionsToolDefinition,
  ChatCompletionsToolSelectionPreset,
  ChatCompletionsNamedToolSelection,
} from "./models.js";

export interface GetChatCompletionsHeaders {
  /**
   * Controls what happens if unknown parameters are passed in the JSON request payload.
   * This sets the HTTP request header `unknown-parameters`.
   */
  "unknown-parameters"?: UnknownParams;
}

export interface GetChatCompletionsBodyParam {
  body?: {
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
    tool_choice?:
      | ChatCompletionsToolSelectionPreset
      | ChatCompletionsNamedToolSelection;
    seed?: number;
    model?: string;
  };
}

export interface GetChatCompletionsHeaderParam {
  headers?: RawHttpHeadersInput & GetChatCompletionsHeaders;
}

export type GetChatCompletionsParameters = GetChatCompletionsHeaderParam &
  GetChatCompletionsBodyParam &
  RequestParameters;
export type GetModelInfoParameters = RequestParameters;
