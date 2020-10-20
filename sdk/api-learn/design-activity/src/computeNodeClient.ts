// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineOptions, TokenCredential } from "@azure/core-http";
import { GeneratedClient } from "./generated";

export interface ComputeNodeClientOptions extends PipelineOptions {}

// Todo LRO
export interface ComputeOperation {
  operationId: string;
}

export class ComputeNodeClient {
  private readonly _client: GeneratedClient;

  constructor(
    nodeName: string,
    endpointUrl: string,
    credential: TokenCredential,
    options: ComputeNodeClientOptions = {}
  ) {
    // silence warnings
    console.dir(credential);
    this._client = new GeneratedClient(endpointUrl, nodeName, options);
  }

  public async computePi(): Promise<ComputeOperation> {
    const result = await this._client.computations.computePi();
    if (result.operationLocation) {
      return { operationId: result.operationLocation };
    }
    throw new Error("Couldn't create new compute operation.");
  }
}
