// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PollOperationState, Poller, PollOperation } from "@azure/core-lro";
import { WithResponse } from "../remoteRenderingClient";
import { RenderingSession, KnownRenderingSessionStatus } from "../generated/models/index";
import { getSessionInternal } from "../internal/commonQueries";
import { delay, AbortSignalLike } from "@azure/core-http";
import { RemoteRendering } from "../generated/operations";

export interface RenderingSessionOperationState
  extends PollOperationState<WithResponse<RenderingSession>> {
  /**
   * The latest response when querying the service. The session may or may not be ready.
   */
  latestResponse: WithResponse<RenderingSession>;
}

export class RenderingSessionOperationStateImpl implements RenderingSessionOperationState {
  latestResponse: WithResponse<RenderingSession>;

  constructor(conversionState: WithResponse<RenderingSession>) {
    this.latestResponse = conversionState;
  }

  get isStarted(): boolean {
    return true;
  }

  get isCompleted(): boolean {
    return this.latestResponse.status != KnownRenderingSessionStatus.Starting;
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

  get result(): WithResponse<RenderingSession> {
    return this.latestResponse;
  }
}

class RenderingSessionOperation
  implements PollOperation<RenderingSessionOperationStateImpl, RenderingSession> {
  private accountId: string;
  private operations: RemoteRendering;
  state: RenderingSessionOperationStateImpl;

  constructor(
    accountId: string,
    operations: RemoteRendering,
    state: RenderingSessionOperationStateImpl
  ) {
    this.accountId = accountId;
    this.operations = operations;
    this.state = state;
  }

  update(_options?: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (state: RenderingSessionOperationStateImpl) => void;
  }): Promise<RenderingSessionOperation> {
    return getSessionInternal(
      this.accountId,
      this.operations,
      this.state.latestResponse.sessionId,
      "RenderingSessionOperation-Update"
    ).then((res) => {
      this.state.latestResponse = res;
      return this;
    });
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
  cancel(_options?: { abortSignal?: AbortSignalLike }): Promise<RenderingSessionOperation> {
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

export class RenderingSessionPoller extends Poller<
  RenderingSessionOperationStateImpl,
  WithResponse<RenderingSession>
> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   */
  public intervalInMs: number = 10000;

  constructor(
    accountId: string,
    operations: RemoteRendering,
    RenderingSession: WithResponse<RenderingSession>
  ) {
    super(
      new RenderingSessionOperation(
        accountId,
        operations,
        new RenderingSessionOperationStateImpl(RenderingSession)
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
  public getOperationState(): RenderingSessionOperationStateImpl {
    return this.operation.state;
  }
}
