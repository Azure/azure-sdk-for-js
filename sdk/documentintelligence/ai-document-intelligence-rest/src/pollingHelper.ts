// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Client, HttpResponse } from "@azure-rest/core-client";
import type { AbortSignalLike } from "@azure/abort-controller";
import type {
  CancelOnProgress,
  CreateHttpPollerOptions,
  RunningOperation,
  OperationResponse,
  OperationState,
} from "@azure/core-lro";
import { createHttpPoller } from "@azure/core-lro";
import type {
  AnalyzeDocumentFromStream202Response,
  AnalyzeDocumentFromStreamDefaultResponse,
  AnalyzeDocumentFromStreamLogicalResponse,
  AnalyzeBatchDocuments202Response,
  AnalyzeBatchDocumentsDefaultResponse,
  AnalyzeBatchDocumentsLogicalResponse,
  BuildModel202Response,
  BuildModelDefaultResponse,
  BuildModelLogicalResponse,
  ComposeModel202Response,
  ComposeModelDefaultResponse,
  ComposeModelLogicalResponse,
  CopyModelTo202Response,
  CopyModelToDefaultResponse,
  CopyModelToLogicalResponse,
  BuildClassifier202Response,
  BuildClassifierDefaultResponse,
  BuildClassifierLogicalResponse,
  ClassifyDocumentFromStream202Response,
  ClassifyDocumentFromStreamDefaultResponse,
  ClassifyDocumentFromStreamLogicalResponse,
  CopyClassifierTo202Response,
  CopyClassifierToDefaultResponse,
  CopyClassifierToLogicalResponse,
} from "./responses.js";
import type { AnalyzeBatchResultOperationOutput } from "./outputModels.js";

/**
 * A simple poller that can be used to poll a long running operation.
 */
export interface SimplePollerLike<TState extends OperationState<TResult>, TResult> {
  /**
   * Returns true if the poller has finished polling.
   */
  isDone(): boolean;
  /**
   * Returns the state of the operation.
   */
  getOperationState(): TState;
  /**
   * Returns the id of the operation.
   */
  getOperationId(): string;
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
  pollUntilDone(pollOptions?: { abortSignal?: AbortSignalLike }): Promise<TResult>;
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
  TResult extends AnalyzeBatchDocumentsLogicalResponse | AnalyzeBatchDocumentsDefaultResponse,
>(
  client: Client,
  initialResponse: AnalyzeBatchDocuments202Response | AnalyzeBatchDocumentsDefaultResponse,
  options?: CreateHttpPollerOptions<TResult, OperationState<TResult>>,
): Promise<SimplePollerLike<OperationState<TResult>, TResult>>;
export async function getLongRunningPoller<
  TResult extends BuildModelLogicalResponse | BuildModelDefaultResponse,
>(
  client: Client,
  initialResponse: BuildModel202Response | BuildModelDefaultResponse,
  options?: CreateHttpPollerOptions<TResult, OperationState<TResult>>,
): Promise<SimplePollerLike<OperationState<TResult>, TResult>>;
export async function getLongRunningPoller<
  TResult extends ComposeModelLogicalResponse | ComposeModelDefaultResponse,
>(
  client: Client,
  initialResponse: ComposeModel202Response | ComposeModelDefaultResponse,
  options?: CreateHttpPollerOptions<TResult, OperationState<TResult>>,
): Promise<SimplePollerLike<OperationState<TResult>, TResult>>;
export async function getLongRunningPoller<
  TResult extends CopyModelToLogicalResponse | CopyModelToDefaultResponse,
>(
  client: Client,
  initialResponse: CopyModelTo202Response | CopyModelToDefaultResponse,
  options?: CreateHttpPollerOptions<TResult, OperationState<TResult>>,
): Promise<SimplePollerLike<OperationState<TResult>, TResult>>;
export async function getLongRunningPoller<
  TResult extends BuildClassifierLogicalResponse | BuildClassifierDefaultResponse,
>(
  client: Client,
  initialResponse: BuildClassifier202Response | BuildClassifierDefaultResponse,
  options?: CreateHttpPollerOptions<TResult, OperationState<TResult>>,
): Promise<SimplePollerLike<OperationState<TResult>, TResult>>;
export async function getLongRunningPoller<
  TResult extends CopyClassifierToLogicalResponse | CopyClassifierToDefaultResponse,
>(
  client: Client,
  initialResponse: CopyClassifierTo202Response | CopyClassifierToDefaultResponse,
  options?: CreateHttpPollerOptions<TResult, OperationState<TResult>>,
): Promise<SimplePollerLike<OperationState<TResult>, TResult>>;
export async function getLongRunningPoller<
  TResult extends
    | AnalyzeDocumentFromStreamLogicalResponse
    | AnalyzeDocumentFromStreamDefaultResponse,
>(
  client: Client,
  initialResponse: AnalyzeDocumentFromStream202Response | AnalyzeDocumentFromStreamDefaultResponse,
  options?: CreateHttpPollerOptions<TResult, OperationState<TResult>>,
): Promise<SimplePollerLike<OperationState<TResult>, TResult>>;
export async function getLongRunningPoller<
  TResult extends
    | ClassifyDocumentFromStreamLogicalResponse
    | ClassifyDocumentFromStreamDefaultResponse,
>(
  client: Client,
  initialResponse:
    | ClassifyDocumentFromStream202Response
    | ClassifyDocumentFromStreamDefaultResponse,
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
    sendPollRequest: async (path: string, pollOptions?: { abortSignal?: AbortSignalLike }) => {
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
      lroResponse.rawResponse.headers["x-ms-original-url"] = initialResponse.request.url;
      return lroResponse;
    },
  };

  options.resolveOnUnsuccessful = options.resolveOnUnsuccessful ?? true;

  const httpPoller = createHttpPoller(poller, {
    ...options,
    updateState: (state, response) => {
      const flatResponse = <HttpResponse>response.flatResponse;
      if (!("body" in flatResponse)) return;
      const flatResponseBody = <AnalyzeBatchResultOperationOutput>flatResponse.body;
      if (!("status" in flatResponseBody && flatResponseBody.status === "completed")) return;
      state.status = "succeeded";
    },
  });
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
    getOperationId: () => parseOperationId(initialResponse.headers["operation-location"]),
  };
  return simplePoller;
}

/**
 * Returns the operation-id from the operation-location header
 */
function parseOperationId(operationLocationHeader: string): string {
  // regex to extract the operation id from the operation-location header with the regex "[^:]+://[^/]+/documentintelligence/.+/([^?/]+)"
  const regex = /[^:]+:\/\/[^/]+\/documentintelligence\/.+\/([^?/]+)/;
  const match = operationLocationHeader.match(regex);
  if (!match) {
    throw new Error(
      `Failed to parse operation id from the operation-location header: ${operationLocationHeader}`,
    );
  }
  return match[1];
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
    throw new TypeError(`Status code of the response is not a number. Value: ${response.status}`);
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
