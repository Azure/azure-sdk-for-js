// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PollOperationState, Poller, PollOperation } from "@azure/core-lro";
import { RemoteRenderingClient, WithResponse } from "../remoteRenderingClient";
import { AssetConversion, KnownAssetConversionStatus } from "../generated/models/index";

import { AbortSignalLike } from "@azure/abort-controller";

export interface AssetConversionOperationState
  extends PollOperationState<WithResponse<AssetConversion>> {
  /**
   * The latest response when querying the service. The conversion may or may not be completed.
   */
  latestResponse: WithResponse<AssetConversion>;
}

export class AssetConversionOperationStateImpl implements AssetConversionOperationState {
  latestResponse: WithResponse<AssetConversion>;

  constructor(conversionState: WithResponse<AssetConversion>) {
    this.latestResponse = conversionState;
  }

  get isStarted(): boolean {
    // We do not take the KnownAssetConversionStatus.NotStarted status into account here.
    return true;
  }

  get isCompleted(): boolean {
    return (
      this.latestResponse.status != KnownAssetConversionStatus.NotStarted &&
      this.latestResponse.status != KnownAssetConversionStatus.Running
    );
  }

  get isCancelled(): boolean {
    return false;
  }

  get error(): Error | undefined {
    if (this.latestResponse.error != null) {
      //TODO Add details.
      return new Error(this.latestResponse.error.message);
    }
    return undefined;
  }

  get result(): WithResponse<AssetConversion> {
    return this.latestResponse;
  }
}

class AssetConversionOperation
  implements PollOperation<AssetConversionOperationStateImpl, AssetConversion> {
  private client: RemoteRenderingClient;
  state: AssetConversionOperationStateImpl;

  constructor(client: RemoteRenderingClient, state: AssetConversionOperationStateImpl) {
    this.state = state;
    this.client = client;
  }

  update(_options?: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (state: AssetConversionOperationState) => void;
  }): Promise<AssetConversionOperation> {
    return this.client.getConversion(this.state.latestResponse.conversionId).then((res) => { this.state.latestResponse = res; return this; });
  }

  cancel(_options?: { abortSignal?: AbortSignalLike }): Promise<AssetConversionOperation> {
    throw new Error("Not yet implemented.");
  }

  toString(): string {
    throw new Error("Not yet implemented.");
  }
}

export class AssetConversionPoller extends Poller<
  AssetConversionOperationStateImpl,
  WithResponse<AssetConversion>
> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   */
  public intervalInMs: number = 10000;

  constructor(client: RemoteRenderingClient, assetConversion: WithResponse<AssetConversion>) {
    super(
      new AssetConversionOperation(client, new AssetConversionOperationStateImpl(assetConversion))
    );
  }

  /**
   * The method used by the poller to wait before attempting to update its operation.
   */
  async delay(): Promise<void> {
    throw new Error("Not yet implemented.");
  }

  /**
   * Gets the public state of the polling operation
   */
  public getOperationState(): AssetConversionOperationStateImpl {
    throw new Error("Not yet implemented.");
  }
}
