// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CreateParameters, CreateStreamingParameters } from "./parameters.js";
import { Create200Response, CreateStreaming200Response } from "./responses.js";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface Create {
  /** placeholder */
  post(options?: CreateParameters): StreamableMethod<Create200Response>;
  /** placeholder */
  post(
    options?: CreateStreamingParameters
  ): StreamableMethod<CreateStreaming200Response>;
}

export interface Routes {
  /** Resource for '/chat' has methods for the following verbs: post */
  (path: "/chat"): Create;
}

export type ChatContext = Client & {
  path: Routes;
};
