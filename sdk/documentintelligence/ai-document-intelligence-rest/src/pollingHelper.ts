// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Client, HttpResponse } from "@azure-rest/core-client";
import type { AbortSignalLike } from "@azure/abort-controller";
import type {
  RunningOperation,
  OperationResponse,
  OperationState,
  PollerLike,
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

/**
 * Options for `getLongRunningPoller`.
 */
export interface GetLongRunningPollerOptions {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   */
  intervalInMs?: number;
  /**
   * A serialized poller which can be used to resume an existing paused Long-Running-Operation.
   */
  restoreFrom?: string;
}

/**
 * Helper function that builds a Poller object to help polling a long running operation.
 * @param client - Client to use for sending the request to get additional pages.
 * @param initialResponse - The initial response.
 * @param options - Options to set a resume state or custom polling interval.
 * @returns - A poller object to poll for operation state updates and eventually get the final response.
 */
export function getLongRunningPoller<
  TResult extends AnalyzeBatchDocumentsLogicalResponse | AnalyzeBatchDocumentsDefaultResponse,
>(
  client: Client,
  initialResponse: AnalyzeBatchDocuments202Response | AnalyzeBatchDocumentsDefaultResponse,
  options?: GetLongRunningPollerOptions,
): PollerLike<OperationState<TResult>, TResult>;
export function getLongRunningPoller<
  TResult extends BuildModelLogicalResponse | BuildModelDefaultResponse,
>(
  client: Client,
  initialResponse: BuildModel202Response | BuildModelDefaultResponse,
  options?: GetLongRunningPollerOptions,
): PollerLike<OperationState<TResult>, TResult>;
export function getLongRunningPoller<
  TResult extends ComposeModelLogicalResponse | ComposeModelDefaultResponse,
>(
  client: Client,
  initialResponse: ComposeModel202Response | ComposeModelDefaultResponse,
  options?: GetLongRunningPollerOptions,
): PollerLike<OperationState<TResult>, TResult>;
export function getLongRunningPoller<
  TResult extends CopyModelToLogicalResponse | CopyModelToDefaultResponse,
>(
  client: Client,
  initialResponse: CopyModelTo202Response | CopyModelToDefaultResponse,
  options?: GetLongRunningPollerOptions,
): PollerLike<OperationState<TResult>, TResult>;
export function getLongRunningPoller<
  TResult extends BuildClassifierLogicalResponse | BuildClassifierDefaultResponse,
>(
  client: Client,
  initialResponse: BuildClassifier202Response | BuildClassifierDefaultResponse,
  options?: GetLongRunningPollerOptions,
): PollerLike<OperationState<TResult>, TResult>;
export function getLongRunningPoller<
  TResult extends CopyClassifierToLogicalResponse | CopyClassifierToDefaultResponse,
>(
  client: Client,
  initialResponse: CopyClassifierTo202Response | CopyClassifierToDefaultResponse,
  options?: GetLongRunningPollerOptions,
): PollerLike<OperationState<TResult>, TResult>;
export function getLongRunningPoller<
  TResult extends
    | AnalyzeDocumentFromStreamLogicalResponse
    | AnalyzeDocumentFromStreamDefaultResponse,
>(
  client: Client,
  initialResponse: AnalyzeDocumentFromStream202Response | AnalyzeDocumentFromStreamDefaultResponse,
  options?: GetLongRunningPollerOptions,
): PollerLike<OperationState<TResult>, TResult>;
export function getLongRunningPoller<
  TResult extends
    | ClassifyDocumentFromStreamLogicalResponse
    | ClassifyDocumentFromStreamDefaultResponse,
>(
  client: Client,
  initialResponse:
    | ClassifyDocumentFromStream202Response
    | ClassifyDocumentFromStreamDefaultResponse,
  options?: GetLongRunningPollerOptions,
): PollerLike<OperationState<TResult>, TResult>;
export function getLongRunningPoller<TResult extends HttpResponse>(
  client: Client,
  initialResponse: TResult,
  options: GetLongRunningPollerOptions = {},
): PollerLike<OperationState<TResult>, TResult> {
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

  return createHttpPoller(poller, options);
}

/**
 * Returns the operation-id from the operation-location header
 */
function parseResultId(operationLocationHeader: string): string {
  // regex to extract the operation id from the operation-location header with the regex "[^:]+://[^/]+/documentintelligence/.+/([^?/]+)"
  const regex = /[^:]+:\/\/[^/]+\/documentintelligence\/.+\/([^?/]+)/;
  const match = operationLocationHeader.match(regex);
  if (!match) {
    throw new Error(
      `Failed to parse result id from the operation-location header: ${operationLocationHeader}`,
    );
  }
  return match[1];
}

/**
 * Returns the operation-id from the initialResponse header
 */
export function parseResultIdFromResponse(initialResponse: {
  headers: { "operation-location": string };
}): string {
  const operationLocationHeader = initialResponse.headers["operation-location"];
  return parseResultId(operationLocationHeader);
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
