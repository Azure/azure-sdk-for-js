// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PollOperationState } from "../";

/**
 * Options for the LRO poller.
 */
export interface LROPollerOptions {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   */
  intervalInMs?: number;
  /**
   * A serialized poller which can be used to resume an existing paused Long-Running-Operation.
   */
  resumeFrom?: string;
}

/**
 * A HttpHeaders collection represented as a simple JSON object.
 */
export declare type RawHttpHeaders = {
  [headerName: string]: string;
};

export const successStates = ["succeeded"];
export const failureStates = ["failed", "canceled", "cancelled"];
/**
 * The LRO states that signal that the LRO has completed.
 */
export const terminalStates = successStates.concat(failureStates);

/**
 * The potential location of the result of the LRO if specified by the LRO extension in the swagger.
 */
export type FinalStateVia = "azure-async-operation" | "location" | "original-uri";

/**
 * The type of a LRO response body. This is just a convenience type for checking the status of the operation.
 */

export interface LROBody extends Record<string, unknown> {
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
  /** The response headers */
  headers: RawHttpHeaders;
  /** The parsed response body */
  body?: LROBody;
}

/**
 * The type of the response of a LRO.
 */
export interface LROResponse<T> {
  flatResponse: T;
  rawResponse: RawResponse;
}

/** The type of which LRO implementation being followed by a specific API. */
export type LROMode = "AzureAsync" | "Location" | "Body";

/**
 * The configuration of a LRO to determine how to perform polling and checking whether the operation has completed.
 */
export interface LROConfig {
  /** The LRO mode */
  mode?: LROMode;
  /** The path of a provisioned resource */
  resourceLocation?: string;
}

/**
 * Type of a polling operation state that can actually be resumed.
 */
export type ResumablePollOperationState<T> = PollOperationState<T> & {
  initialRawResponse?: RawResponse;
  config?: LROConfig;
  pollingURL?: string;
};

export interface PollerConfig {
  intervalInMs: number;
}

/**
 * The type of a terminal state of an LRO.
 */
export interface LROTerminalState<T> extends LROResponse<T> {
  /**
   * Whether the operation has finished.
   */
  done: true;
}

/**
 * The type of an in-progress state of an LRO.
 */
export interface LROInProgressState<T> extends LROResponse<T> {
  /**
   * Whether the operation has finished.
   */
  done: false;
  /**
   * The request to be sent next if it is different from the standard polling one.
   * Notice that it will disregard any polling URLs provided to it.
   */
  next?: () => Promise<LROStatus<T>>;
}

/**
 * The type of an LRO state which is a tagged union of terminal and in-progress states.
 */
export type LROStatus<T> = LROTerminalState<T> | LROInProgressState<T>;

/**
 * The type of the getLROStatusFromResponse method. It takes the response as input and returns along the response whether the operation has finished.
 */
export type GetLROStatusFromResponse<T> = (
  rawResponse: RawResponse,
  flatResponse: T
) => LROStatus<T>;

/**
 * Description of a long running operation.
 */
export interface LRO<T> {
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
  sendInitialRequest: (
    initializeState: (rawResponse: RawResponse, flatResponse: unknown) => boolean
  ) => Promise<LROResponse<T>>;
  /**
   * A function that can be used to poll for the current status of a long running operation.
   */
  sendPollRequest: (config: LROConfig, path: string) => Promise<LROStatus<T>>;
  /**
   * A function that can be used to retrieve the provisioned azure resource.
   */
  retrieveAzureAsyncResource: (path?: string) => Promise<LROStatus<T>>;
}
