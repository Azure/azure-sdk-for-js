// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  ChatCompletionOptions,
  StreamingChatCompletionOptions,
} from "./models.js";

export interface CreateBodyParam {
  body?: ChatCompletionOptions;
}

export type CreateParameters = CreateBodyParam & RequestParameters;

export interface CreateStreamingBodyParam {
  body?: StreamingChatCompletionOptions;
}

export type CreateStreamingParameters = CreateStreamingBodyParam &
  RequestParameters;
