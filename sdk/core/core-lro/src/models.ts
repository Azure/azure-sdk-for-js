// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { PollOperationState } from "./pollOperation";

/**
 * Options for `createPoller`.
 */
export interface CreatePollerOptions<TResult, TState> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   */
  intervalInMs?: number;
  /**
   * A serialized poller which can be used to resume an existing paused Long-Running-Operation.
   */
  restoreFrom?: string;
  /**
   * The potential location of the result of the LRO if specified by the LRO extension in the swagger.
   */
  resourceLocationConfig?: LroResourceLocationConfig;
  /**
   * A function to process the result of the LRO.
   */
  processResult?: (result: unknown, state: TState) => TResult;
  /**
   * A function to process the state of the LRO.
   */
  updateState?: (state: TState, lastResponse: RawResponse) => void;
  /**
   * A function that takes the polling URL as input. This callback is useful to
   * implement operation requests such as operation cancellation or paging.
   */
  withPollingUrl?: (pollingUrl: string) => void;
}

// TODO: rename to ResourceLocationConfig
/**
 * The potential location of the result of the LRO if specified by the LRO extension in the swagger.
 */
export type LroResourceLocationConfig = "azure-async-operation" | "location" | "original-uri";

/**
 * The type of a LRO response body. This is just a convenience type for checking the status of the operation.
 */

export interface ResponseBody extends Record<string, unknown> {
  /** The status of the operation. */
  status?: string;
  /** The state of the provisioning process */
  provisioningState?: string;
  /** The properties of the provisioning process */
  properties?: { provisioningState?: string } & Record<string, unknown>;
}

/**
 * Simple type of the raw response.
 */
export interface RawResponse {
  /** The HTTP status code */
  statusCode: number;
  /** A HttpHeaders collection in the response represented as a simple JSON object where all header names have been normalized to be lower-case. */
  headers: {
    [headerName: string]: string;
  };
  /** The parsed response body */
  body?: unknown;
}

// TODO: rename to OperationResponse
/**
 * The type of the response of a LRO.
 */
export interface LroResponse<T> {
  /** The flattened response */
  flatResponse: T;
  /** The raw response */
  rawResponse: RawResponse;
}

export interface OperationConfig {
  /** The LRO mode */
  mode: "OperationLocation" | "ResourceLocation" | "Body";
  /** The polling URL */
  pollingUrl: string;
  /** The resource location URL */
  resourceLocation?: string;
}

/**
 * Type of a restorable long-running operation.
 */
export type RestorableOperationState<T> = T & {
  /** The LRO configuration */
  config: OperationConfig;
};

/**
 * The type of a long-running operation poll result.
 */
export interface OperationStatus<T> extends LroResponse<T> {
  /**
   * Whether the operation has finished.
   */
  done: boolean;
}

/**
 * Description of a long running operation.
 */
export interface LongRunningOperation<T = unknown> {
  /**
   * The request path. This should be set if the operation is a PUT and needs
   * to poll from the same request path.
   */
  requestPath?: string;
  /**
   * The HTTP request method. This should be set if the operation is a PUT or a
   * DELETE.
   */
  requestMethod?: string;
  /**
   * A function that can be used to send initial request to the service.
   */
  sendInitialRequest: () => Promise<LroResponse<unknown>>;
  /**
   * A function that can be used to poll for the current status of a long running operation.
   */
  sendPollRequest: (
    path: string,
    options?: { abortSignal?: AbortSignalLike }
  ) => Promise<LroResponse<T>>;
}

/**
 * CancelOnProgress is used as the return value of a Poller's onProgress method.
 * When a user invokes onProgress, they're required to pass in a function that will be
 * called as a callback with the new data received each time the poll operation is updated.
 * onProgress returns a function that will prevent any further update to reach the original callback.
 */
export type CancelOnProgress = () => void;

/**
 * Abstract representation of a poller, intended to expose just the minimal API that the user needs to work with.
 */
// eslint-disable-next-line no-use-before-define
export interface PollerLike<TState extends PollOperationState<TResult>, TResult> {
  /**
   * Returns a promise that will resolve once a single polling request finishes.
   * It does this by calling the update method of the Poller's operation.
   */
  poll(options?: { abortSignal?: AbortSignalLike }): Promise<void>;
  /**
   * Returns a promise that will resolve once the underlying operation is completed.
   */
  pollUntilDone(options: { abortSignal?: AbortSignalLike }): Promise<TResult>;
  /**
   * Invokes the provided callback after each polling is completed,
   * sending the current state of the poller's operation.
   *
   * It returns a method that can be used to stop receiving updates on the given callback function.
   */
  onProgress(callback: (state: TState) => void): CancelOnProgress;
  /**
   * Returns true if the poller has finished polling.
   */
  isDone(): boolean;
  /**
   * Stops the poller. After this, no manual or automated requests can be sent.
   */
  stopPolling(): void;
  /**
   * Returns true if the poller is stopped.
   */
  isStopped(): boolean;
  /**
   * Attempts to cancel the underlying operation.
   * @deprecated `cancelOperation` has been deprecated because it was not implemented.
   */
  cancelOperation(options?: { abortSignal?: AbortSignalLike }): Promise<void>;
  /**
   * Returns the state of the operation.
   * The TState defined in PollerLike can be a subset of the TState defined in
   * the Poller implementation.
   */
  getOperationState(): TState;
  /**
   * Returns the result value of the operation,
   * regardless of the state of the poller.
   * It can return undefined or an incomplete form of the final TResult value
   * depending on the implementation.
   */
  getResult(): TResult | undefined;
  /**
   * Returns a serialized version of the poller's operation
   * by invoking the operation's toString method.
   */
  toString(): string;
}

/**
 * While the poller works as the local control mechanism to start triggering and
 * wait for a long-running operation, OperationState documents the status of
 * the remote long-running operation. It gets updated after each poll.
 */
export interface OperationState<TResult> {
  /**
   * The current status of the operation.
   */
  status: "notStarted" | "running" | "succeeded" | "canceling" | "canceled" | "failed";
  /**
   * Will exist if the operation encountered any error.
   */
  error?: Error;
  /**
   * Will exist if the operation produced a result of the expected type.
   */
  result?: TResult;
}

/**
 * A simple poller interface.
 */
export interface SimplePollerLike<TState extends OperationState<TResult>, TResult> {
  /**
   * Returns a promise that will resolve once a single polling request finishes.
   * It does this by calling the update method of the Poller's operation.
   */
  poll(options?: { abortSignal?: AbortSignalLike }): Promise<void>;
  /**
   * Returns a promise that will resolve once the underlying operation is completed.
   */
  pollUntilDone(options?: { abortSignal?: AbortSignalLike }): Promise<TResult>;
  /**
   * Invokes the provided callback after each polling is completed,
   * sending the current state of the poller's operation.
   *
   * It returns a method that can be used to stop receiving updates on the given callback function.
   */
  onProgress(callback: (state: TState) => void): CancelOnProgress;
  /**
   * Returns true if the poller has finished polling.
   */
  isDone(): boolean;
  /**
   * Stops the poller. After this, no manual or automated requests can be sent.
   */
  stopPolling(): void;
  /**
   * Returns true if the poller is stopped.
   */
  isStopped(): boolean;
  /**
   * Returns the state of the operation.
   */
  getOperationState(): TState;
  /**
   * Returns the result value of the operation,
   * regardless of the state of the poller.
   * It can return undefined or an incomplete form of the final TResult value
   * depending on the implementation.
   */
  getResult(): TResult | undefined;
  /**
   * Returns a serialized version of the poller's operation
   * by invoking the operation's toString method.
   */
  toString(): string;
}

/**
 * A state proxy that allows poller implementation to abstract away the operation
 * state. This is useful to implement `lroEngine` and `createPoller` in a modular
 * way.
 */
export interface StateProxy<TState, TResult> {
  initState: (config?: OperationConfig) => RestorableOperationState<TState>;

  setRunning: (state: TState) => void;
  setCanceled: (state: TState) => void;
  setCanceling: (state: TState) => void;
  setResult: (state: TState, result: TResult) => void;
  setError: (state: TState, error: Error) => void;
  setFailed: (state: TState) => void;
  setSucceeded: (state: TState) => void;

  isRunning: (state: TState) => boolean;
  isCanceled: (state: TState) => boolean;
  isCanceling: (state: TState) => boolean;
  getResult: (state: TState) => TResult | undefined;
  getError: (state: TState) => Error | undefined;
  isFailed: (state: TState) => boolean;
  isSucceeded: (state: TState) => boolean;
}
