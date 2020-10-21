// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions, PipelineOptions, TokenCredential } from "@azure/core-http";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import { ComputeOperationState, OperationStatus, GeneratedClient } from "./generated";

export interface ComputeNodeClientOptions extends PipelineOptions {}

export interface BeginComputePiOptions extends OperationOptions {
  precision?: number;
  pollInterval?: number;
  onProgress?: (state: ComputePiPollOperationState) => void;
  resumeFrom?: string;
}

export interface Pi {
  value: number;
  precision: number;
}

export type ComputePiPollOperationState = PollOperationState<Pi> & ComputeOperationState;
export type ComputePiPoller = PollerLike<ComputePiPollOperationState, Pi>;

// todo rename to ComputeOperationStatus
export { ComputeOperationState, OperationStatus };

export class ComputeNodeClient {
  private readonly _client: GeneratedClient;

  constructor(
    private readonly nodeName: string,
    endpointUrl: string,
    credential: TokenCredential,
    options: ComputeNodeClientOptions = {}
  ) {
    // silence warnings
    console.dir(credential);
    this._client = new GeneratedClient(endpointUrl, options);
  }

  public async beginComputePi(options?: BeginComputePiOptions): Promise<ComputePiPoller> {
    const result = await this._client.computations.computePi(this.nodeName, options);
    return result as any;
  }
}
