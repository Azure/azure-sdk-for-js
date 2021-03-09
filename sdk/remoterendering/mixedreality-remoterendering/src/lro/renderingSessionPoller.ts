// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PollOperationState, Poller, PollOperation } from "@azure/core-lro";
import { RemoteRenderingClient } from "../remoteRenderingClient";
import { RenderingSession, KnownRenderingSessionStatus } from "../generated/models/index";

import { AbortSignalLike } from "@azure/abort-controller";

export class RenderingSessionOperationState implements PollOperationState<RenderingSession> {
  client: RemoteRenderingClient;
  conversionState: RenderingSession;

  constructor(client: RemoteRenderingClient, conversionState: RenderingSession) {
    this.client = client;
    this.conversionState = conversionState;
  }

  get isStarted(): boolean {
    return true;
  }

  get isCompleted(): boolean {
    return this.conversionState.status != KnownRenderingSessionStatus.Starting;
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

  get result(): RenderingSession {
    return this.conversionState;
  }
}

class RenderingSessionOperation
  implements PollOperation<RenderingSessionOperationState, RenderingSession> {
  state: RenderingSessionOperationState;

  constructor(state: RenderingSessionOperationState) {
    this.state = state;
  }

  update(_options?: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (state: RenderingSessionOperationState) => void;
  }): Promise<RenderingSessionOperation> {
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
  RenderingSessionOperationState,
  RenderingSession
> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   */
  public intervalInMs: number = 10000;

  constructor(
    client: RemoteRenderingClient,
    RenderingSession: RenderingSession
  ) {
    super(
      new RenderingSessionOperation(
        new RenderingSessionOperationState(client, RenderingSession)
      )
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
  public getOperationState(): RenderingSessionOperationState {
    throw new Error("Not yet implemented.");
  }
}
