// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { LroError } from "../poller/models.js";

/**
 * The potential location of the result of the LRO if specified by the LRO extension in the swagger.
 */
export type ResourceLocationConfig = "azure-async-operation" | "location" | "original-uri";

/**
 * The type of a LRO response body. This is just a convenience type for checking the status of the operation.
 */

export interface ResponseBody extends Record<string, unknown> {
  /** The status of the operation. */
  status?: unknown;
  /** The state of the provisioning process */
  provisioningState?: unknown;
  /** The properties of the provisioning process */
  properties?: { provisioningState?: unknown } & Record<string, unknown>;
  /** The error if the operation failed */
  error?: Partial<LroError>;
  /** The location of the created resource */
  resourceLocation?: string;
}

/**
 * Simple type of the raw request.
 */
export interface RawRequest {
  /** The HTTP request method */
  method: string;
  /** The request path */
  url: string;
  /** The request body */
  body?: unknown;
}

/**
 * Simple type of the raw response.
 */
export interface RawResponse<TRequest extends RawRequest = RawRequest> {
  /** The HTTP status code */
  statusCode: number;
  /** The raw request that was sent to the server */
  request: TRequest;
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
export interface OperationResponse<T = unknown, TRequest extends RawRequest = RawRequest> {
  /** The flattened response */
  flatResponse: T;
  /** The raw response */
  rawResponse: RawResponse<TRequest>;
}

/**
 * Description of a long running operation.
 */
export interface LongRunningOperation<T = unknown> {
  /**
   * A function that can be used to send initial request to the service.
   */
  sendInitialRequest: () => Promise<OperationResponse<unknown>>;
  /**
   * A function that can be used to poll for the current status of a long running operation.
   */
  sendPollRequest: (
    path: string,
    options?: { abortSignal?: AbortSignalLike },
  ) => Promise<OperationResponse<T>>;
}

export type HttpOperationMode = "OperationLocation" | "ResourceLocation" | "Body";

/**
 * Options for `createPoller`.
 */
export interface CreateHttpPollerOptions<TResult, TState> {
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
  resourceLocationConfig?: ResourceLocationConfig;
  /**
   * A function to process the result of the LRO.
   */
  processResult?: (result: unknown, state: TState) => TResult | Promise<TResult>;
  /**
   * A function to process the state of the LRO.
   */
  updateState?: (state: TState, response: OperationResponse) => void;
  /**
   * A function to be called each time the operation location is updated by the
   * service.
   */
  withOperationLocation?: (operationLocation: string) => void;
  /**
   * Control whether to throw an exception if the operation failed or was canceled.
   */
  resolveOnUnsuccessful?: boolean;
}
