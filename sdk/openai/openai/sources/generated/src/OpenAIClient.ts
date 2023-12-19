// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, KeyCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";
import {
  getClientOperations,
  ClientOperations,
} from "./classic/client/index.js";
import {
  createOpenAI,
  OpenAIClientOptions,
  OpenAIContext,
} from "./api/index.js";

export { OpenAIClientOptions } from "./api/OpenAIContext.js";

export class OpenAIClient {
  private _client: OpenAIContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpoint: string,
    credential: KeyCredential | TokenCredential,
    options: OpenAIClientOptions = {}
  ) {
    this._client = createOpenAI(endpoint, credential, options);
    this.pipeline = this._client.pipeline;
    this.client = getClientOperations(this._client);
  }

  /** The operation groups for ClientOpenAIClient */
  public readonly client: ClientOperations;
}
