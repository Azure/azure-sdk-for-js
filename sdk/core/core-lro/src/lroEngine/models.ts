// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PollOperationState } from "../pollOperation";

/**
 * Options for the LRO poller.
 */
export interface LroEngineOptions<TResult, TState> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   */
  intervalInMs?: number;
  /**
   * A serialized poller which can be used to resume an existing paused Long-Running-Operation.
   */
  resumeFrom?: string;
  /**
   * The potential location of the result of the LRO if specified by the LRO extension in the swagger.
   */
  lroResourceLocationConfig?: LroResourceLocationConfig;
  /**
   * A function to process the result of the LRO.
   */
  processResult?: (result: unknown, state: TState) => TResult;
  /**
   * A function to process the state of the LRO.
   */
  updateState?: (state: TState, lastResponse: RawResponse) => void;
  /**
   * A predicate to determine whether the LRO finished processing.
   */
  isDone?: (lastResponse: unknown, state: TState) => boolean;
}

export const successStates = ["succeeded"];
export const failureStates = ["failed", "canceled", "cancelled"];
/**
 * The LRO states that signal that the LRO has completed.
 */
export const terminalStates = successStates.concat(failureStates);

/**
 * The potential location of the result of the LRO if specified by the LRO extension in the swagger.
 */
export type LroResourceLocationConfig = "azure-async-operation" | "location" | "original-uri";

/**
 * The type of a LRO response body. This is just a convenience type for checking the status of the operation.
 */

export interface LroBody extends Record<string, unknown> {
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

/**
 * The type of the response of a LRO.
 */
export interface LroResponse<T> {
  /** The flattened response */
  flatResponse: T;
  /** The raw response */
  rawResponse: RawResponse;
}

/** The type of which LRO implementation being followed by a specific API. */
export type LroMode = "Location" | "Body";

/**
 * The configuration of a LRO to determine how to perform polling and checking whether the operation has completed.
 */
export interface LroConfig {
  /** The LRO mode */
  mode?: LroMode;
  /** The path of a provisioned resource */
  resourceLocation?: string;
}

/**
 * Type of a polling operation state that can actually be resumed.
 */
export type ResumablePollOperationState<T> = PollOperationState<T> & {
  initialRawResponse?: RawResponse;
  config?: LroConfig;
  pollingURL?: string;
};

export interface PollerConfig {
  intervalInMs: number;
}

/**
 * The type of a terminal state of an LRO.
 */
export interface LroTerminalState<T> extends LroResponse<T> {
  /**
   * Whether the operation has finished.
   */
  done: true;
}

/**
 * The type of an in-progress state of an LRO.
 */
export interface LroInProgressState<T> extends LroResponse<T> {
  /**
   * Whether the operation has finished.
   */
  done: false;
  /**
   * The request to be sent next if it is different from the standard polling one.
   * Notice that it will disregard any polling URLs provided to it.
   */
  next?: () => Promise<LroStatus<T>>;
}

/**
 * The type of an LRO state which is a tagged union of terminal and in-progress states.
 */
export type LroStatus<T> = LroTerminalState<T> | LroInProgressState<T>;

/**
 * The type of the getLROStatusFromResponse method. It takes the response as input and returns along the response whether the operation has finished.
 */
export type GetLroStatusFromResponse<T> = (response: LroResponse<T>) => LroStatus<T>;

/**
 * Description of a long running operation.
 */
export interface LongRunningOperation<T> {
  /**
   * The request path.
   */
  requestPath: string;
  /**
   * The HTTP request method.
   */
  requestMethod: string;
  /**
   * A function that can be used to send initial request to the service.
   */
  sendInitialRequest: () => Promise<LroResponse<T>>;
  /**
   * A function that can be used to poll for the current status of a long running operation.
   */
  sendPollRequest: (path: string) => Promise<LroResponse<T>>;
}
