// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PollOperationState, Poller, PollOperation } from "@azure/core-lro";
import { WithResponse } from "../remoteRenderingClient";
import { AssetConversion, KnownAssetConversionStatus } from "../generated/models/index";
import { RemoteRendering } from "../generated/operations";
import { getConversionInternal } from "../internal/commonQueries";
import { delay, AbortSignalLike } from "@azure/core-http";

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
  private accountId: string;
  private operations: RemoteRendering;
  state: AssetConversionOperationStateImpl;

  constructor(
    accountId: string,
    operations: RemoteRendering,
    state: AssetConversionOperationStateImpl
  ) {
    this.operations = operations;
    this.accountId = accountId;
    this.state = state;
  }

  update(_options?: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (state: AssetConversionOperationState) => void;
  }): Promise<AssetConversionOperation> {
    return getConversionInternal(
      this.accountId,
      this.operations,
      this.state.latestResponse.conversionId,
      "AssetConversionOperation-Update"
    ).then((res) => {
      this.state.latestResponse = res;
      return this;
    });
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

  constructor(
    accountId: string,
    operations: RemoteRendering,
    assetConversion: WithResponse<AssetConversion>
  ) {
    super(
      new AssetConversionOperation(
        accountId,
        operations,
        new AssetConversionOperationStateImpl(assetConversion)
      )
    );
  }

  /**
   * The method used by the poller to wait before attempting to update its operation.
   */
  async delay(): Promise<void> {
    return delay(this.intervalInMs);
  }

  /**
   * Gets the public state of the polling operation
   */
  public getOperationState(): AssetConversionOperationStateImpl {
    return this.operation.state;
  }
}
