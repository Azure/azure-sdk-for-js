// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Client, HttpResponse } from "@azure-rest/core-client";
import {
  CreateHttpPollerOptions,
  LongRunningOperation,
  LroResponse,
  OperationState,
  SimplePollerLike,
  SimplePollerPromise,
  createHttpPoller,
  createHttpPollerPromise
} from "@azure/core-lro";
import {
  AnalyzeDocumentFromStream202Response,
  AnalyzeDocumentFromStreamDefaultResponse,
  AnalyzeDocumentFromStreamLogicalResponse,
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
} from "./responses";
/**
 * Helper function that builds a Poller object to help polling a long running operation.
 * @param client - Client to use for sending the request to get additional pages.
 * @param initialResponse - The initial response.
 * @param options - Options to set a resume state or custom polling interval.
 * @returns - A poller object to poll for operation state updates and eventually get the final response.
 */
export async function getLongRunningPoller<
  TResult extends BuildModelLogicalResponse | BuildModelDefaultResponse
>(
  client: Client,
  initialResponse: BuildModel202Response | BuildModelDefaultResponse,
  options?: CreateHttpPollerOptions<TResult, OperationState<TResult>>
): Promise<SimplePollerLike<OperationState<TResult>, TResult>>;
export async function getLongRunningPoller<
  TResult extends ComposeModelLogicalResponse | ComposeModelDefaultResponse
>(
  client: Client,
  initialResponse: ComposeModel202Response | ComposeModelDefaultResponse,
  options?: CreateHttpPollerOptions<TResult, OperationState<TResult>>
): Promise<SimplePollerLike<OperationState<TResult>, TResult>>;
export async function getLongRunningPoller<
  TResult extends CopyModelToLogicalResponse | CopyModelToDefaultResponse
>(
  client: Client,
  initialResponse: CopyModelTo202Response | CopyModelToDefaultResponse,
  options?: CreateHttpPollerOptions<TResult, OperationState<TResult>>
): Promise<SimplePollerLike<OperationState<TResult>, TResult>>;
export async function getLongRunningPoller<
  TResult extends BuildClassifierLogicalResponse | BuildClassifierDefaultResponse
>(
  client: Client,
  initialResponse: BuildClassifier202Response | BuildClassifierDefaultResponse,
  options?: CreateHttpPollerOptions<TResult, OperationState<TResult>>
): Promise<SimplePollerLike<OperationState<TResult>, TResult>>;
export async function getLongRunningPoller<
  TResult extends
  | AnalyzeDocumentFromStreamLogicalResponse
  | AnalyzeDocumentFromStreamDefaultResponse
>(
  client: Client,
  initialResponse: AnalyzeDocumentFromStream202Response | AnalyzeDocumentFromStreamDefaultResponse,
  options?: CreateHttpPollerOptions<TResult, OperationState<TResult>>
): Promise<SimplePollerLike<OperationState<TResult>, TResult>>;
export async function getLongRunningPoller<
  TResult extends
  | ClassifyDocumentFromStreamLogicalResponse
  | ClassifyDocumentFromStreamDefaultResponse
>(
  client: Client,
  initialResponse:
    | ClassifyDocumentFromStream202Response
    | ClassifyDocumentFromStreamDefaultResponse,
  options?: CreateHttpPollerOptions<TResult, OperationState<TResult>>
): Promise<SimplePollerLike<OperationState<TResult>, TResult>>;
export async function getLongRunningPoller<TResult extends HttpResponse>(
  client: Client,
  initialResponse: TResult,
  options: CreateHttpPollerOptions<TResult, OperationState<TResult>> = {}
): Promise<SimplePollerLike<OperationState<TResult>, TResult>> {
  const poller: LongRunningOperation<TResult> = {
    requestMethod: initialResponse.request.method,
    requestPath: initialResponse.request.url,
    sendInitialRequest: async () => {
      // In the case of Rest Clients we are building the LRO poller object from a response that's the reason
      // we are not triggering the initial request here, just extracting the information from the
      // response we were provided.
      return getLroResponse(initialResponse);
    },
    sendPollRequest: async (path) => {
      // This is the callback that is going to be called to poll the service
      // to get the latest status. We use the client provided and the polling path
      // which is an opaque URL provided by caller, the service sends this in one of the following headers: operation-location, azure-asyncoperation or location
      // depending on the lro pattern that the service implements. If non is provided we default to the initial path.
      const response = await client.pathUnchecked(path ?? initialResponse.request.url).get();
      const lroResponse = getLroResponse(response as TResult);
      lroResponse.rawResponse.headers["x-ms-original-url"] = initialResponse.request.url;
      return lroResponse;
    },
  };

  options.resolveOnUnsuccessful = options.resolveOnUnsuccessful ?? true;
  return createHttpPoller(poller, options);
}

export function getLongRunningPollerSync<TResult extends HttpResponse>(
  client: Client,
  initialResponse: TResult,
  options: CreateHttpPollerOptions<TResult, OperationState<TResult>> = {}
): SimplePollerPromise<OperationState<TResult>, TResult> {
  const poller: LongRunningOperation<TResult> = {
    requestMethod: initialResponse.request.method,
    requestPath: initialResponse.request.url,
    sendInitialRequest: async () => {
      // In the case of Rest Clients we are building the LRO poller object from a response that's the reason
      // we are not triggering the initial request here, just extracting the information from the
      // response we were provided.
      return getLroResponse(initialResponse);
    },
    sendPollRequest: async (path) => {
      // This is the callback that is going to be called to poll the service
      // to get the latest status. We use the client provided and the polling path
      // which is an opaque URL provided by caller, the service sends this in one of the following headers: operation-location, azure-asyncoperation or location
      // depending on the lro pattern that the service implements. If non is provided we default to the initial path.
      const response = await client.pathUnchecked(path ?? initialResponse.request.url).get();
      const lroResponse = getLroResponse(response as TResult);
      lroResponse.rawResponse.headers["x-ms-original-url"] = initialResponse.request.url;
      return lroResponse;
    },
  };

  options.resolveOnUnsuccessful = options.resolveOnUnsuccessful ?? true;
  return createHttpPollerPromise(poller, options);
}

/**
 * Converts a Rest Client response to a response that the LRO implementation understands
 * @param response - a rest client http response
 * @returns - An LRO response that the LRO implementation understands
 */
function getLroResponse<TResult extends HttpResponse>(response: TResult): LroResponse<TResult> {
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
