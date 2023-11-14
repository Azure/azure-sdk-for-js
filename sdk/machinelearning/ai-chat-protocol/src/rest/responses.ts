// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpResponse } from "@azure-rest/core-client";
import {
  ChatCompletionChunkOutput,
  ChatCompletionOutput,
} from "./outputModels.js";

/** The request has succeeded. */
export interface CreateStreaming200Response extends HttpResponse {
  status: "200";
  body: ChatCompletionChunkOutput;
}

/** The request has succeeded. */
export interface Create200Response extends HttpResponse {
  status: "200";
  body: ChatCompletionOutput;
}
