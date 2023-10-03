// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  StreamingChatCompletionOptions,
  ChatCompletionOptions,
} from "./models.js";

export interface CreateStreamingBodyParam {
  body?: StreamingChatCompletionOptions;
}

export type CreateStreamingParameters = CreateStreamingBodyParam &
  RequestParameters;

export interface CreateBodyParam {
  body?: ChatCompletionOptions;
}

export type CreateParameters = CreateBodyParam & RequestParameters;
