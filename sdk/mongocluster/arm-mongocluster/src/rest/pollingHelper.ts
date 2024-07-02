// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Client, HttpResponse } from "@azure-rest/core-client";
import { AbortSignalLike } from "@azure/abort-controller";
import {
  CancelOnProgress,
  CreateHttpPollerOptions,
  RunningOperation,
  OperationResponse,
  OperationState,
  createHttpPoller,
} from "@azure/core-lro";
import {
  MongoClustersCreateOrUpdate200Response,
  MongoClustersCreateOrUpdate201Response,
  MongoClustersCreateOrUpdateDefaultResponse,
  MongoClustersCreateOrUpdateLogicalResponse,
  MongoClustersUpdate200Response,
  MongoClustersUpdate202Response,
  MongoClustersUpdateDefaultResponse,
  MongoClustersUpdateLogicalResponse,
  MongoClustersDelete202Response,
  MongoClustersDelete204Response,
  MongoClustersDeleteDefaultResponse,
  MongoClustersDeleteLogicalResponse,
  FirewallRulesCreateOrUpdate200Response,
  FirewallRulesCreateOrUpdate201Response,
  FirewallRulesCreateOrUpdate202Response,
  FirewallRulesCreateOrUpdateDefaultResponse,
  FirewallRulesCreateOrUpdateLogicalResponse,
  FirewallRulesDelete202Response,
  FirewallRulesDelete204Response,
  FirewallRulesDeleteDefaultResponse,
  FirewallRulesDeleteLogicalResponse,
  PrivateEndpointConnectionsCreate200Response,
  PrivateEndpointConnectionsCreate201Response,
  PrivateEndpointConnectionsCreate202Response,
  PrivateEndpointConnectionsCreateDefaultResponse,
  PrivateEndpointConnectionsCreateLogicalResponse,
  PrivateEndpointConnectionsDelete202Response,
  PrivateEndpointConnectionsDelete204Response,
  PrivateEndpointConnectionsDeleteDefaultResponse,
  PrivateEndpointConnectionsDeleteLogicalResponse,
} from "./responses.js";

/**
 * A simple poller that can be used to poll a long running operation.
 */
export interface SimplePollerLike<
  TState extends OperationState<TResult>,
  TResult,
> {
  /**
   * Returns true if the poller has finished polling.
   */
  isDone(): boolean;
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
   * Returns a promise that will resolve once a single polling request finishes.
   * It does this by calling the update method of the Poller's operation.
   */
  poll(options?: { abortSignal?: AbortSignalLike }): Promise<TState>;
  /**
   * Returns a promise that will resolve once the underlying operation is completed.
   */
  pollUntilDone(pollOptions?: {
    abortSignal?: AbortSignalLike;
  }): Promise<TResult>;
  /**
   * Invokes the provided callback after each polling is completed,
   * sending the current state of the poller's operation.
   *
   * It returns a method that can be used to stop receiving updates on the given callback function.
   */
  onProgress(callback: (state: TState) => void): CancelOnProgress;

  /**
   * Returns a promise that could be used for serialized version of the poller's operation
   * by invoking the operation's serialize method.
   */
  serialize(): Promise<string>;

  /**
   * Wait the poller to be submitted.
   */
  submitted(): Promise<void>;

  /**
   * Returns a string representation of the poller's operation. Similar to serialize but returns a string.
   * @deprecated Use serialize() instead.
   */
  toString(): string;

  /**
   * Stops the poller from continuing to poll. Please note this will only stop the client-side polling
   * @deprecated Use abortSignal to stop polling instead.
   */
  stopPolling(): void;

  /**
   * Returns true if the poller is stopped.
   * @deprecated Use abortSignal status to track this instead.
   */
  isStopped(): boolean;
}

/**
 * Helper function that builds a Poller object to help polling a long running operation.
 * @param client - Client to use for sending the request to get additional pages.
 * @param initialResponse - The initial response.
 * @param options - Options to set a resume state or custom polling interval.
 * @returns - A poller object to poll for operation state updates and eventually get the final response.
 */
export async function getLongRunningPoller<
  TResult extends
    | MongoClustersCreateOrUpdateLogicalResponse
    | MongoClustersCreateOrUpdateDefaultResponse,
>(
  client: Client,
  initialResponse:
    | MongoClustersCreateOrUpdate200Response
    | MongoClustersCreateOrUpdate201Response
    | MongoClustersCreateOrUpdateDefaultResponse,
  options?: CreateHttpPollerOptions<TResult, OperationState<TResult>>,
): Promise<SimplePollerLike<OperationState<TResult>, TResult>>;
export async function getLongRunningPoller<
  TResult extends
    | MongoClustersUpdateLogicalResponse
    | MongoClustersUpdateDefaultResponse,
>(
  client: Client,
  initialResponse:
    | MongoClustersUpdate200Response
    | MongoClustersUpdate202Response
    | MongoClustersUpdateDefaultResponse,
  options?: CreateHttpPollerOptions<TResult, OperationState<TResult>>,
): Promise<SimplePollerLike<OperationState<TResult>, TResult>>;
export async function getLongRunningPoller<
  TResult extends
    | MongoClustersDeleteLogicalResponse
    | MongoClustersDeleteDefaultResponse,
>(
  client: Client,
  initialResponse:
    | MongoClustersDelete202Response
    | MongoClustersDelete204Response
    | MongoClustersDeleteDefaultResponse,
  options?: CreateHttpPollerOptions<TResult, OperationState<TResult>>,
): Promise<SimplePollerLike<OperationState<TResult>, TResult>>;
export async function getLongRunningPoller<
  TResult extends
    | FirewallRulesCreateOrUpdateLogicalResponse
    | FirewallRulesCreateOrUpdateDefaultResponse,
>(
  client: Client,
  initialResponse:
    | FirewallRulesCreateOrUpdate200Response
    | FirewallRulesCreateOrUpdate201Response
    | FirewallRulesCreateOrUpdate202Response
    | FirewallRulesCreateOrUpdateDefaultResponse,
  options?: CreateHttpPollerOptions<TResult, OperationState<TResult>>,
): Promise<SimplePollerLike<OperationState<TResult>, TResult>>;
export async function getLongRunningPoller<
  TResult extends
    | FirewallRulesDeleteLogicalResponse
    | FirewallRulesDeleteDefaultResponse,
>(
  client: Client,
  initialResponse:
    | FirewallRulesDelete202Response
    | FirewallRulesDelete204Response
    | FirewallRulesDeleteDefaultResponse,
  options?: CreateHttpPollerOptions<TResult, OperationState<TResult>>,
): Promise<SimplePollerLike<OperationState<TResult>, TResult>>;
export async function getLongRunningPoller<
  TResult extends
    | PrivateEndpointConnectionsCreateLogicalResponse
    | PrivateEndpointConnectionsCreateDefaultResponse,
>(
  client: Client,
  initialResponse:
    | PrivateEndpointConnectionsCreate200Response
    | PrivateEndpointConnectionsCreate201Response
    | PrivateEndpointConnectionsCreate202Response
    | PrivateEndpointConnectionsCreateDefaultResponse,
  options?: CreateHttpPollerOptions<TResult, OperationState<TResult>>,
): Promise<SimplePollerLike<OperationState<TResult>, TResult>>;
export async function getLongRunningPoller<
  TResult extends
    | PrivateEndpointConnectionsDeleteLogicalResponse
    | PrivateEndpointConnectionsDeleteDefaultResponse,
>(
  client: Client,
  initialResponse:
    | PrivateEndpointConnectionsDelete202Response
    | PrivateEndpointConnectionsDelete204Response
    | PrivateEndpointConnectionsDeleteDefaultResponse,
  options?: CreateHttpPollerOptions<TResult, OperationState<TResult>>,
): Promise<SimplePollerLike<OperationState<TResult>, TResult>>;
export async function getLongRunningPoller<TResult extends HttpResponse>(
  client: Client,
  initialResponse: TResult,
  options: CreateHttpPollerOptions<TResult, OperationState<TResult>> = {},
): Promise<SimplePollerLike<OperationState<TResult>, TResult>> {
  const abortController = new AbortController();
  const poller: RunningOperation<TResult> = {
    sendInitialRequest: async () => {
      // In the case of Rest Clients we are building the LRO poller object from a response that's the reason
      // we are not triggering the initial request here, just extracting the information from the
      // response we were provided.
      return getLroResponse(initialResponse);
    },
    sendPollRequest: async (
      path: string,
      pollOptions?: { abortSignal?: AbortSignalLike },
    ) => {
      // This is the callback that is going to be called to poll the service
      // to get the latest status. We use the client provided and the polling path
      // which is an opaque URL provided by caller, the service sends this in one of the following headers: operation-location, azure-asyncoperation or location
      // depending on the lro pattern that the service implements. If non is provided we default to the initial path.
      function abortListener(): void {
        abortController.abort();
      }
      const inputAbortSignal = pollOptions?.abortSignal;
      const abortSignal = abortController.signal;
      if (inputAbortSignal?.aborted) {
        abortController.abort();
      } else if (!abortSignal.aborted) {
        inputAbortSignal?.addEventListener("abort", abortListener, {
          once: true,
        });
      }
      let response;
      try {
        response = await client
          .pathUnchecked(path ?? initialResponse.request.url)
          .get({ abortSignal });
      } finally {
        inputAbortSignal?.removeEventListener("abort", abortListener);
      }
      const lroResponse = getLroResponse(response as TResult);
      lroResponse.rawResponse.headers["x-ms-original-url"] =
        initialResponse.request.url;
      return lroResponse;
    },
  };

  options.resolveOnUnsuccessful = options.resolveOnUnsuccessful ?? true;
  const httpPoller = createHttpPoller(poller, options);
  const simplePoller: SimplePollerLike<OperationState<TResult>, TResult> = {
    isDone() {
      return httpPoller.isDone;
    },
    isStopped() {
      return abortController.signal.aborted;
    },
    getOperationState() {
      if (!httpPoller.operationState) {
        throw new Error(
          "Operation state is not available. The poller may not have been started and you could await submitted() before calling getOperationState().",
        );
      }
      return httpPoller.operationState;
    },
    getResult() {
      return httpPoller.result;
    },
    toString() {
      if (!httpPoller.operationState) {
        throw new Error(
          "Operation state is not available. The poller may not have been started and you could await submitted() before calling getOperationState().",
        );
      }
      return JSON.stringify({
        state: httpPoller.operationState,
      });
    },
    stopPolling() {
      abortController.abort();
    },
    onProgress: httpPoller.onProgress,
    poll: httpPoller.poll,
    pollUntilDone: httpPoller.pollUntilDone,
    serialize: httpPoller.serialize,
    submitted: httpPoller.submitted,
  };
  return simplePoller;
}

/**
 * Converts a Rest Client response to a response that the LRO implementation understands
 * @param response - a rest client http response
 * @returns - An LRO response that the LRO implementation understands
 */
function getLroResponse<TResult extends HttpResponse>(
  response: TResult,
): OperationResponse<TResult> {
  if (Number.isNaN(response.status)) {
    throw new TypeError(
      `Status code of the response is not a number. Value: ${response.status}`,
    );
  }

  return {
    flatResponse: response,
    rawResponse: {
      ...response,
      statusCode: Number.parseInt(response.status),
      body: response.body,
    },
  };
}
