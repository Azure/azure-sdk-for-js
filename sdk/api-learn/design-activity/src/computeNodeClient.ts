// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions, PipelineOptions, TokenCredential } from "@azure/core-http";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import { GeneratedClient, OperationStatus } from "./generated";

export interface ComputeNodeClientOptions extends PipelineOptions {}

export interface BeginComputePiOptions extends OperationOptions {
  precision: number;
  // todo: onProgress, resumeFrom...
}

export interface Pi {
  value: number;
  precision: number;
}

export type ComputePiPollOperationState = PollOperationState<Pi> & {
  status: OperationStatus;
};

export type ComputePiPoller = PollerLike<ComputePiPollOperationState, Pi>;

export { OperationStatus };

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

  public async beginComputePi(options?: BeginComputePiOptions): Promise<ComputePiPoller> {
    const result = await this._client.computations.computePi(options);
    return result as any;
  }
}
