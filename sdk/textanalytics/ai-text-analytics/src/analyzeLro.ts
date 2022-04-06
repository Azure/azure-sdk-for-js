// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LongRunningOperation, LroResponse, PollerLike, RawResponse } from "@azure/core-lro";
import { SpanStatusCode } from "@azure/core-tracing";
import { createSerializer, OperationOptions, OperationSpec } from "@azure/core-client";
import {
  GeneratedClient,
  GeneratedClientAnalyzeStatusOptionalParams,
  GeneratedClientAnalyzeStatusResponse,
  JobManifestTasks,
  TextDocumentInput,
} from "./generated";
import { createSpan } from "./tracing";
import { compileError, getRawResponse, sendGetRequest } from "./util";
import * as Mappers from "./generated/models/mappers";
import {
  accept,
  apiVersion,
  endpoint,
  includeStatistics,
  skip,
  top,
} from "./generated/models/parameters";
import { getPagedAsyncIterator, PagedResult } from "@azure/core-paging";
import { AnalysisPollOperationState, OperationMetadata } from "./pollerModels";
import {
  AnalyzeActionsResult,
  createAnalyzeActionsResult,
  PagedAnalyzeActionsResult,
} from "./analyzeActionsResult";

/**
 * Options for the begin analyze actions operation.
 */
export interface BeginAnalyzeActionsOptions extends OperationOptions {
  /**
   * Delay to wait until next poll, in milliseconds.
   */
  updateIntervalInMs?: number;
  /**
   * A serialized poller which can be used to resume an existing paused Long-Running-Operation.
   */
  resumeFrom?: string;
  /**
   * If set to true, response will contain input and document level statistics.
   */
  includeStatistics?: boolean;
  /**
   * The operation's display name.
   */
  displayName?: string;
}

/**
 * Result type of the Begin Analyze Actions Long-Running-Operation (LRO).
 */
export type AnalyzeActionsPollerLike = PollerLike<
  AnalyzeActionsOperationState,
  PagedAnalyzeActionsResult
>;

/**
 * The metadata for beginAnalyzeActions operations.
 */
export interface AnalyzeActionsOperationMetadata extends OperationMetadata {
  /**
   * Number of successfully completed actions.
   */
  actionsSucceededCount: number;
  /**
   * Number of failed actions.
   */
  actionsFailedCount: number;
  /**
   * Number of actions still in progress.
   */
  actionsInProgressCount: number;
  /**
   * The operation's display name.
   */
  displayName?: string;
}

/**
 * The state of the begin analyze polling operation.
 */
export interface AnalyzeActionsOperationState
  extends AnalysisPollOperationState<PagedAnalyzeActionsResult>,
    AnalyzeActionsOperationMetadata {}

const serializer = createSerializer(Mappers, /* isXml */ false);

// Consider whether the spec can be exported by code gen
const analyzeStatusOperationSpec: OperationSpec = {
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AnalyzeJobState,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [includeStatistics, top, skip],
  urlParameters: [endpoint, apiVersion],
  headerParameters: [accept],
  serializer,
};

/**
 * @internal
 */
export class AnalyzeLro implements LongRunningOperation<PagedAnalyzeActionsResult> {
  public requestMethod = "POST";
  public requestPath = "/analyze";
  constructor(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    private client: GeneratedClient,
    private baseOptions: OperationOptions,
    private initOptions: {
      displayName?: string;
    },
    private pollOptions: {
      includeStatistics?: boolean;
    },
    private documents: TextDocumentInput[],
    private tasks: JobManifestTasks
  ) {}
  async sendInitialRequest(): Promise<LroResponse<PagedAnalyzeActionsResult>> {
    const { span, updatedOptions: finalOptions } = createSpan("TextAnalyticsClient-beginAnalyze", {
      ...this.baseOptions,
      ...this.initOptions,
    });
    try {
      const { flatResponse, rawResponse } = await getRawResponse(
        (paramOptions) =>
          this.client.analyze({
            body: {
              analysisInput: { documents: this.documents },
              tasks: this.tasks,
              displayName: this.initOptions.displayName,
            },
            ...paramOptions,
          }),
        finalOptions
      );
      return {
        flatResponse: flatResponse as PagedAnalyzeActionsResult,
        rawResponse,
      };
    } catch (e) {
      const exception = compileError(e);
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: exception.message,
      });
      throw exception;
    } finally {
      span.end();
    }
  }
  async sendPollRequest(path: string): Promise<LroResponse<PagedAnalyzeActionsResult>> {
    return sendGetRequest(
      this.client,
      analyzeStatusOperationSpec,
      "AnalyzeStatus",
      { ...this.baseOptions, ...this.pollOptions },
      path
    ) as Promise<LroResponse<PagedAnalyzeActionsResult>>;
  }
}

/**
 * @internal
 */
export function processAnalyzeResult(
  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  client: GeneratedClient,
  documents: TextDocumentInput[],
  options: GeneratedClientAnalyzeStatusOptionalParams
): (result: unknown, state: AnalyzeActionsOperationState) => PagedAnalyzeActionsResult {
  return (_result: unknown, state: AnalyzeActionsOperationState): PagedAnalyzeActionsResult => {
    const pollingURL = (state as any).pollingURL;
    const pagedResult: PagedResult<AnalyzeActionsResult> = {
      firstPageLink: pollingURL,
      getPage: async (pageLink: string, maxPageSize?: number) => {
        const response = await sendGetRequest(
          client,
          analyzeStatusOperationSpec,
          "AnalyzeStatus",
          // if `top` is set to `undefined`, the default value will not be sent
          // as part of the request.
          maxPageSize ? { ...options, top: maxPageSize } : options,
          pageLink
        );
        const flatResponse = response.flatResponse as GeneratedClientAnalyzeStatusResponse;
        return {
          page: createAnalyzeActionsResult(flatResponse, documents),
          nextPageLink: flatResponse.nextLink,
        };
      },
    };
    const pagedIterator = getPagedAsyncIterator<AnalyzeActionsResult, AnalyzeActionsResult>(
      pagedResult
    );
    // Attach stats if the service starts to return them
    // https://github.com/Azure/azure-sdk-for-js/issues/14139
    // state.result = Object.assign(pagedIterator, {
    //   statistics: operationStatus.statistics
    // });
    return pagedIterator;
  };
}

/**
 * @internal
 */
export function updateAnalyzeState(
  state: AnalyzeActionsOperationState,
  lastResponse: RawResponse
): void {
  const response = lastResponse.body as GeneratedClientAnalyzeStatusResponse;
  state.createdOn = response.createdDateTime;
  state.lastModifiedOn = response.lastUpdateDateTime;
  state.expiresOn = response.expirationDateTime;
  state.status = response.status;
  state.actionsSucceededCount = response.tasks.completed;
  state.actionsFailedCount = response.tasks.failed;
  state.actionsInProgressCount = response.tasks.inProgress;
  state.displayName = response.displayName;
}
