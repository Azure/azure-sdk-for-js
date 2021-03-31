// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PollOperationState, Poller, PollOperation } from "@azure/core-lro";
import { RemoteRenderingClient, WithResponse } from "../remoteRenderingClient";
import { AssetConversion, KnownAssetConversionStatus } from "../generated/models/index";

import { AbortSignalLike } from "@azure/abort-controller";

export interface AssetConversionOperationState extends PollOperationState<WithResponse<AssetConversion>> {
  /**
   * The latest response when querying the service. The conversion may or may not be completed.
   */
  latestResponse: WithResponse<AssetConversion>;
}

export class AssetConversionOperationStateImpl
  implements AssetConversionOperationState {
  private client: RemoteRenderingClient;
  latestResponse: WithResponse<AssetConversion>;

  constructor(client: RemoteRenderingClient, conversionState: WithResponse<AssetConversion>) {
    this.client = client;
    this.latestResponse = conversionState;
  }

  get isStarted(): boolean {
    // TODO
    this.client = this.client;
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
  state: AssetConversionOperationStateImpl;

  constructor(state: AssetConversionOperationStateImpl) {
    this.state = state;
  }

  update(_options?: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (state: AssetConversionOperationState) => void;
  }): Promise<AssetConversionOperation> {
    throw new Error("Not yet implemented.");
  }

  /**
   * Attempts to cancel the underlying operation.
   *
   * It only optionally receives an object with an abortSignal property, from \@azure/abort-controller's AbortSignalLike.
   *
   * It returns a promise that should be resolved with an updated version of the poller's operation.
   *
   * @param options - Optional properties passed to the operation's update method.
   */
  cancel(_options?: { abortSignal?: AbortSignalLike }): Promise<AssetConversionOperation> {
    throw new Error("Not yet implemented.");
  }

  /**
   * Serializes the operation.
   * Useful when wanting to create a poller that monitors an existing operation.
   */
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
    super(new AssetConversionOperation(new AssetConversionOperationStateImpl(client, assetConversion)));
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
