// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PollOperationState, Poller, PollOperation } from "@azure/core-lro";
import { KnownRenderingSessionStatus, KnownRenderingServerSize } from "../generated/models/index";
import { getSessionInternal, endSessionInternal } from "../internal/commonQueries";
import { AbortSignalLike } from "@azure/abort-controller";
import { RemoteRendering } from "../generated/operationsInterfaces";
import { delay } from "@azure/core-util";
import { RenderingSession } from "../internal/renderingSession";

/**
 * Options to configure the poller for the beginSession operation.
 */
export interface RenderingSessionPollerOptions {
  /** The interval between calls to poll the service for the status of a session. */
  intervalInMs?: number;
}

/**
 * The state carried by the poller for the beginSession operation.
 */
export interface RenderingSessionOperationState extends PollOperationState<RenderingSession> {
  /**
   * The latest response when querying the service. The session may or may not be ready.
   */
  latestResponse: RenderingSession;
}

/**
 * @internal
 */
export class RenderingSessionOperationStateImpl implements RenderingSessionOperationState {
  latestResponse: RenderingSession;

  constructor(conversionState: RenderingSession) {
    this.latestResponse = conversionState;
  }

  get isStarted(): boolean {
    return true;
  }

  get isCompleted(): boolean {
    return this.latestResponse.status !== KnownRenderingSessionStatus.Starting;
  }

  get isCancelled(): boolean {
    return this.latestResponse.status === KnownRenderingSessionStatus.Stopped;
  }

  get error(): Error | undefined {
    if (this.latestResponse.status === "Error") {
      return this.latestResponse.error;
    }
    return undefined;
  }

  get result(): RenderingSession {
    return this.latestResponse;
  }
}

/**
 * @internal
 */
class RenderingSessionOperation
  implements PollOperation<RenderingSessionOperationState, RenderingSession>
{
  private accountId: string;
  private operations: RemoteRendering;
  state: RenderingSessionOperationState;

  constructor(
    accountId: string,
    operations: RemoteRendering,
    state: RenderingSessionOperationState
  ) {
    this.accountId = accountId;
    this.operations = operations;
    this.state = state;
  }

  async update(_options?: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (state: RenderingSessionOperationStateImpl) => void;
  }): Promise<RenderingSessionOperation> {
    this.state.latestResponse = await getSessionInternal(
      this.accountId,
      this.operations,
      this.state.latestResponse.sessionId,
      "RenderingSessionOperation-Update"
    );
    return this;
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
  async cancel(options?: { abortSignal?: AbortSignalLike }): Promise<RenderingSessionOperation> {
    await endSessionInternal(
      this.accountId,
      this.operations,
      this.state.latestResponse.sessionId,
      "RenderingSessionOperation-Cancel",
      options
    );
    return this;
  }

  /**
   * Serializes the operation.
   * Useful when wanting to create a poller that monitors an existing operation.
   */
  toString(): string {
    return this.state.latestResponse.sessionId;
  }
}

/**
 * @internal
 */
export class RenderingSessionPoller extends Poller<
  RenderingSessionOperationState,
  RenderingSession
> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   */
  public intervalInMs: number;

  constructor(
    accountId: string,
    operations: RemoteRendering,
    renderingSession: RenderingSession,
    options: RenderingSessionPollerOptions
  ) {
    super(
      new RenderingSessionOperation(
        accountId,
        operations,
        new RenderingSessionOperationStateImpl(renderingSession)
      )
    );
    if (options.intervalInMs) {
      this.intervalInMs = options.intervalInMs;
    } else if (renderingSession.size === KnownRenderingServerSize.Standard) {
      this.intervalInMs = 2000;
    } else {
      this.intervalInMs = 10000;
    }
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
  public getOperationState(): RenderingSessionOperationState {
    return this.operation.state;
  }
}
