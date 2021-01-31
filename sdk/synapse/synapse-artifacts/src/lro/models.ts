// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import {
  OperationArguments,
  OperationSpec,
  RestResponse,
  HttpMethods,
  HttpOperationResponse
} from "@azure/core-http";
import { PollOperationState, PollOperation } from "@azure/core-lro";
export const LROSYM = Symbol("LROData");

export type FinalStateVia = "azure-async-operation" | "location" | "original-uri";

export interface LROResponseInfo {
  requestMethod: HttpMethods;
  statusCode: number;
  isInitialRequest?: boolean;
  azureAsyncOperation?: string;
  operationLocation?: string;
  location?: string;
  provisioningState?: string;
  status?: string;
}

/**
 * Extended operation response for LROs
 */
export type LROOperationResponse = HttpOperationResponse & {
  /**
   * Symbol that contains LRO details
   */
  [LROSYM]?: LROResponseInfo;
};

export interface BaseResult extends RestResponse {
  /**
   * The underlying HTTP response containing both raw and deserialized response data.
   */
  _response: LROOperationResponse;
}

export interface LROOperationStep<TResult extends BaseResult> {
  args: OperationArguments;
  spec: OperationSpec;
  result: TResult;
}

export interface LROOperationState<TResult extends BaseResult> extends PollOperationState<TResult> {
  lastOperation: LROOperationStep<TResult>;
  initialOperation: LROOperationStep<TResult>;
  pollingStrategy: LROStrategy<TResult>;
  finalStateVia?: FinalStateVia;
}

export interface LROStrategy<TResult extends BaseResult> {
  isTerminal: () => boolean;
  sendFinalRequest: () => Promise<LROOperationStep<TResult>>;
  poll: () => Promise<LROOperationStep<TResult>>;
}

export type LROOperation<TResult extends BaseResult> = PollOperation<
  LROOperationState<TResult>,
  TResult
>;
