// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CreateStreamingParameters, CreateParameters } from "./parameters.js";
import { CreateStreaming200Response, Create200Response } from "./responses.js";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface CreateStreaming {
  /** Creates a new streaming chat completion. */
  post(options?: CreateStreamingParameters): StreamableMethod<CreateStreaming200Response>;
  /** Creates a new chat completion. */
  post(options?: CreateParameters): StreamableMethod<Create200Response>;
}

export interface Routes {
  /** Resource for '/chat' has methods for the following verbs: post */
  (path: "/chat"): CreateStreaming;
}

export type ChatProtocolContext = Client & {
  path: Routes;
};
