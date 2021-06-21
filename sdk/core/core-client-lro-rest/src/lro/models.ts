// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PollOperationState } from "@azure/core-lro";

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
export const terminalStates = successStates.concat(failureStates);

export type FinalStateVia =
  | "azure-async-operation"
  | "location"
  | "original-uri";

export interface LROBody extends Record<string, unknown> {
  status?: string;
  provisioningState?: string;
  properties?: { provisioningState?: string } & Record<string, unknown>;
}

export interface RawResponse {
  statusCode: number;
  headers: RawHttpHeaders;
  body?: LROBody;
}

export interface LROResult<T> {
  flatResponse: T;
  rawResponse: RawResponse;
}

export type LROMode = "AzureAsync" | "Location" | "Body";

export interface LROConfig {
  mode?: LROMode;
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
interface LROTerminalState<T> extends LROResult<T> {
  /**
   * Whether the operation has finished.
   */
  done: true;
}

/**
 * The type of an in-progress state of an LRO.
 */
interface LROInProgressState<T> extends LROResult<T> {
  /**
   * Whether the operation has finished.
   */
  done: false;
  /**
   * The request to be sent next if it is different from the standard polling one.
   * Notice that it will disregard any polling URLs provided to it.
   */
  next?: () => Promise<LROState<T>>;
}

/**
 * The type of an LRO state which is a tagged union of terminal and in-progress states.
 */
export type LROState<T> = LROTerminalState<T> | LROInProgressState<T>;

export type GetLROState<T> = (
  rawResponse: RawResponse,
  flatResponse: T
) => LROState<T>;

/**
 * Description of a long running operation
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
    initializeState: (
      rawResponse: RawResponse,
      flatResponse: unknown
    ) => boolean
  ) => Promise<LROResult<T>>;
  /**
   * A function that can be used to poll for the current state of a long running operation.
   */
  sendPollRequest: (config: LROConfig, path?: string) => Promise<LROState<T>>;
  /**
   * A function that can be used to retrieve the provisioned azure resource.
   */
  retrieveAzureAsyncResource: (path?: string) => Promise<LROState<T>>;
}
