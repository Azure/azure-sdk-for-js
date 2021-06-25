// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PollOperationState, Poller, PollOperation } from "@azure/core-lro";
import { KnownAssetConversionStatus } from "../generated/models/index";
import { RemoteRendering } from "../generated/operations";
import { getConversionInternal } from "../internal/commonQueries";
import { AbortSignalLike } from "@azure/abort-controller";
import { delay } from "@azure/core-util";
import { AssetConversion } from "../internal/assetConversion";

export interface AssetConversionPollerOptions {
  intervalInMs?: number;
}

export interface AssetConversionOperationState extends PollOperationState<AssetConversion> {
  /**
   * The latest response when querying the service. The conversion may or may not be completed.
   */
  latestResponse: AssetConversion;
}

export class AssetConversionOperationStateImpl implements AssetConversionOperationState {
  latestResponse: AssetConversion;

  constructor(conversionState: AssetConversion) {
    this.latestResponse = conversionState;
  }

  get isStarted(): boolean {
    // The poller is always treated as started.
    return true;
  }

  get isCompleted(): boolean {
    return (
      this.latestResponse.status !== KnownAssetConversionStatus.NotStarted &&
      this.latestResponse.status !== KnownAssetConversionStatus.Running
    );
  }

  get isCancelled(): boolean {
    // We don't support cancellation, so the poller is never treated as cancelled. 
    return false;
  }

  get error(): Error | undefined {
    if (this.latestResponse.status === "Failed") {
      return new Error(this.latestResponse.error.message);
    }
    return undefined;
  }

  get result(): AssetConversion {
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

  async update(_options?: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (state: AssetConversionOperationState) => void;
  }): Promise<AssetConversionOperation> {
    this.state.latestResponse = await getConversionInternal(
      this.accountId,
      this.operations,
      this.state.latestResponse.conversionId,
      "AssetConversionOperation-Update"
    );
    return this;
  }

  cancel(_options?: { abortSignal?: AbortSignalLike }): Promise<AssetConversionOperation> {
    return Promise.reject(new Error("Cancel operation is not supported."));
  }

  toString(): string {
    return this.state.latestResponse.conversionId;
  }
}

export class AssetConversionPoller extends Poller<
  AssetConversionOperationStateImpl,
  AssetConversion
> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   */
  public intervalInMs: number;

  constructor(
    accountId: string,
    operations: RemoteRendering,
    assetConversion: AssetConversion,
    options: AssetConversionPollerOptions
  ) {
    super(
      new AssetConversionOperation(
        accountId,
        operations,
        new AssetConversionOperationStateImpl(assetConversion)
      )
    );
    this.intervalInMs = options.intervalInMs ? options.intervalInMs : 10000;
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
