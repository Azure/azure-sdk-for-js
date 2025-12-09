// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure/core-client";

import type { AbortSignalLike } from "@azure/abort-controller";

import type {
  AnalyzeStatusOptionalParams as AnalyzeActionsOperationStatusOptions,
  AnalyzeJobState,
  AnalyzeResponse as BeginAnalyzeResponse,
  JobManifestTasks as GeneratedActions,
  TextDocumentBatchStatistics,
  TextDocumentInput,
} from "../../generated/models/index.js";
import type {
  AnalyzeActionsResult,
  PagedAnalyzeActionsResult,
  PagedAsyncIterableAnalyzeActionsResult,
} from "../../analyzeActionsResult.js";
import { createAnalyzeActionsResult } from "../../analyzeActionsResult.js";
import type { PageSettings } from "@azure/core-paging";
import { getOperationId, nextLinkToTopAndSkip, throwError } from "../../util.js";
import type { AnalysisPollOperationState, OperationMetadata } from "../poller.js";
import { AnalysisPollOperation } from "../poller.js";
import type { GeneratedClient as Client } from "../../generated/index.js";
import { logger } from "../../logger.js";
import type { TracingClient } from "@azure/core-tracing";

/**
 * @internal
 */
interface AnalyzeResultsWithPagination {
  result: AnalyzeActionsResult;
  top?: number;
  skip?: number;
}

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
 * @internal
 */
interface AnalyzeActionsOperationStatus {
  done: boolean;
  /**
   * Statistics about the input document batch and how it was processed
   * by the service. This property will have a value when includeStatistics is set to true
   * in the client call.
   */
  statistics?: TextDocumentBatchStatistics;
  operationMetdata: Omit<AnalyzeActionsOperationMetadata, "operationId">;
}

/**
 * @internal
 */
interface BeginAnalyzeInternalOptions extends OperationOptions {
  displayName?: string;
}

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
 * The state of the begin analyze polling operation.
 */
export interface AnalyzeActionsOperationState
  extends AnalysisPollOperationState<PagedAnalyzeActionsResult>, AnalyzeActionsOperationMetadata {}

/**
 * @internal
 */
function getMetaInfoFromResponse(
  response: AnalyzeJobState,
): Omit<AnalyzeActionsOperationMetadata, "operationId"> {
  return {
    createdOn: response.createdDateTime,
    lastModifiedOn: response.lastUpdateDateTime,
    expiresOn: response.expirationDateTime,
    status: response.status,
    actionsSucceededCount: response.tasks.completed,
    actionsFailedCount: response.tasks.failed,
    actionsInProgressCount: response.tasks.inProgress,
    displayName: response.displayName,
  };
}

/**
 * Class that represents a poller that waits for results of the analyze
 * operation.
 * @internal
 */
export class BeginAnalyzeActionsPollerOperation extends AnalysisPollOperation<
  AnalyzeActionsOperationState,
  PagedAnalyzeActionsResult
> {
  constructor(
    public state: AnalyzeActionsOperationState,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    private client: Client,
    private tracing: TracingClient,
    private documents: TextDocumentInput[],
    private actions: GeneratedActions,
    private options: BeginAnalyzeActionsOptions = {},
  ) {
    super(state);
  }

  /**
   * should be called only after all the status of the analyze actions operations became
   * "succeeded" and it returns an iterator for the results and provides a
   * byPage method to return the results paged.
   */
  private listAnalyzeActionsResults(
    operationId: string,
    options: AnalyzeActionsOperationStatusOptions = {},
  ): PagedAsyncIterableAnalyzeActionsResult {
    const iter = this._listAnalyzeActionsResultsPaged(operationId, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        const pageOptions = { ...options, top: settings?.maxPageSize };
        return this._listAnalyzeActionsResultsPaged(operationId, pageOptions);
      },
    };
  }

  /**
   * returns an iterator to arrays of the results of an analyze actions operation.
   */
  private async *_listAnalyzeActionsResultsPaged(
    operationId: string,
    options?: AnalyzeActionsOperationStatusOptions,
  ): AsyncIterableIterator<AnalyzeActionsResult> {
    let response = await this._listAnalyzeActionsResultsSinglePage(operationId, options);
    yield response.result;
    while (response.skip) {
      const optionsWithContinuation: AnalyzeActionsOperationStatusOptions = {
        ...options,
        top: response.top,
        skip: response.skip,
      };
      response = await this._listAnalyzeActionsResultsSinglePage(
        operationId,
        optionsWithContinuation,
      );
      yield response.result;
    }
  }

  /**
   * returns an iterator to arrays of the sorted results of an analyze actions operation.
   */
  private async _listAnalyzeActionsResultsSinglePage(
    operationId: string,
    options?: AnalyzeActionsOperationStatusOptions,
  ): Promise<AnalyzeResultsWithPagination> {
    const response = await this.tracing.withSpan(
      "TextAnalyticsClient-_listAnalyzeActionsResultsSinglePage",
      options || {},
      (finalOptions) => this.client.analyzeStatus(operationId, finalOptions),
    );
    const result = createAnalyzeActionsResult(response, this.documents);
    return response.nextLink ? { result, ...nextLinkToTopAndSkip(response.nextLink) } : { result };
  }

  /**
   * returns whether the analyze actions operation is done and if so returns also
   * statistics.
   */
  private async getAnalyzeActionsOperationStatus(
    operationId: string,
    options?: AnalyzeActionsOperationStatusOptions,
  ): Promise<AnalyzeActionsOperationStatus> {
    const response = await this.tracing.withSpan(
      "TextAnalyticsClient-getAnalyzeActionsOperationStatus",
      options || {},
      (finalOptions) => this.client.analyzeStatus(operationId, finalOptions),
    );
    switch (response.status) {
      case "notStarted":
      case "running":
        break;
      default: {
        return {
          done: true,
          statistics: response.statistics,
          operationMetdata: getMetaInfoFromResponse(response),
        };
      }
    }
    return { done: false, operationMetdata: getMetaInfoFromResponse(response) };
  }

  private async beginAnalyzeActions(
    documents: TextDocumentInput[],
    actions: GeneratedActions,
    options?: BeginAnalyzeInternalOptions,
  ): Promise<BeginAnalyzeResponse> {
    return this.tracing.withSpan(
      "TextAnalyticsClient-beginAnalyze",
      options || {},
      (finalOptions) =>
        throwError(
          this.client.analyze({
            body: {
              analysisInput: { documents: documents },
              tasks: actions,
              displayName: options?.displayName,
            },
            ...finalOptions,
          }),
        ),
    );
  }

  async update(
    options: {
      abortSignal?: AbortSignalLike;
      fireProgress?: (state: AnalyzeActionsOperationState) => void;
    } = {},
  ): Promise<BeginAnalyzeActionsPollerOperation> {
    const state = this.state;
    const updatedAbortSignal = options.abortSignal;
    if (!state.isStarted) {
      state.isStarted = true;
      const response = await this.beginAnalyzeActions(this.documents, this.actions, {
        displayName: this.options.displayName,
        tracingOptions: this.options.tracingOptions,
        requestOptions: this.options.requestOptions,
        abortSignal: updatedAbortSignal ? updatedAbortSignal : this.options.abortSignal,
      });
      if (!response.operationLocation) {
        throw new Error(
          "Expects a valid 'operationLocation' to retrieve analyze results but did not find any",
        );
      }
      state.operationId = getOperationId(response.operationLocation);
    }

    const operationStatus = await this.getAnalyzeActionsOperationStatus(state.operationId!, {
      abortSignal: updatedAbortSignal ? updatedAbortSignal : options.abortSignal,
      includeStatistics: this.options.includeStatistics,
      tracingOptions: this.options.tracingOptions,
    });

    state.createdOn = operationStatus.operationMetdata.createdOn;
    state.expiresOn = operationStatus.operationMetdata.expiresOn;
    state.lastModifiedOn = operationStatus.operationMetdata.lastModifiedOn;
    state.status = operationStatus.operationMetdata.status;
    state.actionsSucceededCount = operationStatus.operationMetdata.actionsSucceededCount;
    state.actionsFailedCount = operationStatus.operationMetdata.actionsFailedCount;
    state.actionsInProgressCount = operationStatus.operationMetdata.actionsInProgressCount;
    state.displayName = operationStatus.operationMetdata?.displayName;

    if (!state.isCompleted && operationStatus.done) {
      const pagedIterator = this.listAnalyzeActionsResults(state.operationId!, {
        abortSignal: this.options.abortSignal,
        tracingOptions: this.options.tracingOptions,
        includeStatistics: this.options.includeStatistics,
        onResponse: this.options.onResponse,
        serializerOptions: this.options.serializerOptions,
      });
      // Attach stats if the service starts to return them
      // https://github.com/Azure/azure-sdk-for-js/issues/14139
      // state.result = Object.assign(pagedIterator, {
      //   statistics: operationStatus.statistics
      // });
      state.result = pagedIterator;
      state.isCompleted = true;
    }

    if (typeof options.fireProgress === "function") {
      options.fireProgress(state);
    }
    return this;
  }

  async cancel(): Promise<BeginAnalyzeActionsPollerOperation> {
    const state = this.state;
    logger.warning(`The service does not yet support cancellation for beginAnalyze.`);
    state.isCancelled = true;
    return this;
  }
}
