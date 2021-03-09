// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PollOperationState, Poller, PollOperation } from "@azure/core-lro";
import { RemoteRenderingClient } from "../remoteRenderingClient";
import { AssetConversion, KnownAssetConversionStatus } from "../generated/models/index";

import { AbortSignalLike } from "@azure/abort-controller";

export class AssetConversionOperationState implements PollOperationState<AssetConversion> {
  client: RemoteRenderingClient;
  conversionState: AssetConversion;

  constructor(client: RemoteRenderingClient, conversionState: AssetConversion) {
    this.client = client;
    this.conversionState = conversionState;
  }

  get isStarted(): boolean {
    return true;
  }

  get isCompleted(): boolean {
    return (
      this.conversionState.status != KnownAssetConversionStatus.NotStarted &&
      this.conversionState.status != KnownAssetConversionStatus.Running
    );
  }

  get isCancelled(): boolean {
    return false;
  }

  get error(): Error | undefined {
    if (this.conversionState.error != null) {
      //TODO Add details.
      return new Error(this.conversionState.error.message);
    }
    return undefined;
  }

  get result(): AssetConversion {
    return this.conversionState;
  }
}

class AssetConversionOperation
  implements PollOperation<AssetConversionOperationState, AssetConversion> {
  state: AssetConversionOperationState;

  constructor(state: AssetConversionOperationState) {
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

export class AssetConversionPoller extends Poller<AssetConversionOperationState, AssetConversion> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   */
  public intervalInMs: number = 10000;

  constructor(client: RemoteRenderingClient, assetConversion: AssetConversion) {
    super(new AssetConversionOperation(new AssetConversionOperationState(client, assetConversion)));
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
  public getOperationState(): AssetConversionOperationState {
    throw new Error("Not yet implemented.");
  }
}
