// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  GetChatCompletionsParameters,
  GetModelInfoParameters,
} from "./parameters.js";
import {
  GetChatCompletions200Response,
  GetChatCompletionsDefaultResponse,
  GetModelInfo200Response,
  GetModelInfoDefaultResponse,
} from "./responses.js";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface GetChatCompletions {
  /**
   * Gets chat completions for the provided chat messages.
   * Completions support a wide variety of tasks and generate text that continues from or "completes"
   * provided prompt data. The method makes a REST API call to the `/chat/completions` route
   * on the given endpoint.
   */
  post(
    options?: GetChatCompletionsParameters,
  ): StreamableMethod<
    GetChatCompletions200Response | GetChatCompletionsDefaultResponse
  >;
}

export interface GetModelInfo {
  /**
   * Returns information about the AI model.
   * The method makes a REST API call to the `/info` route on the given endpoint.
   */
  get(
    options?: GetModelInfoParameters,
  ): StreamableMethod<GetModelInfo200Response | GetModelInfoDefaultResponse>;
}

export interface Routes {
  /** Resource for '/chat/completions' has methods for the following verbs: post */
  (path: "/chat/completions"): GetChatCompletions;
  /** Resource for '/info' has methods for the following verbs: get */
  (path: "/info"): GetModelInfo;
}

export type ModelClient = Client & {
  path: Routes;
};
