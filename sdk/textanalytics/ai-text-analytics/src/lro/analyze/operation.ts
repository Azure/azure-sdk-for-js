// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";

import { AbortSignalLike } from "@azure/abort-controller";

import {
  AnalyzeJobState,
  GeneratedClientAnalyzeResponse as BeginAnalyzeResponse,
  GeneratedClientAnalyzeStatusOptionalParams as AnalyzeBatchActionsOperationStatusOptions,
  JobManifestTasks as GeneratedActions,
  State,
  TextDocumentBatchStatistics,
  TextDocumentInput
} from "../../generated/models";
import {
  AnalyzeBatchActionsResult,
  PagedAsyncIterableAnalyzeBatchActionsResult,
  PagedAnalyzeBatchActionsResult,
  createAnalyzeBatchActionsResult
} from "../../analyzeBatchActionsResult";
import { PageSettings } from "@azure/core-paging";
import { getOperationId, handleInvalidDocumentBatch, nextLinkToTopAndSkip } from "../../util";
import { AnalysisPollOperation, AnalysisPollOperationState, OperationMetadata } from "../poller";
import { GeneratedClient as Client } from "../../generated";
import { SpanStatusCode } from "@azure/core-tracing";
import { createSpan } from "../../tracing";
import { logger } from "../../logger";
export { State };

/**
 * @internal
 */
interface AnalyzeResultsWithPagination {
  result: AnalyzeBatchActionsResult;
  top?: number;
  skip?: number;
}

/**
 * The metadata for beginAnalyzeBatchActions operations.
 */
export interface AnalyzeBatchActionsOperationMetadata extends OperationMetadata {
  /**
   * Number of successfully completed actions.
   */
  actionsSucceededCount?: number;
  /**
   * Number of failed actions.
   */
  actionsFailedCount?: number;
  /**
   * Number of actions still in progress.
   */
  actionsInProgressCount?: number;
  /**
   * The operation's display name.
   */
  displayName?: string;
}

/**
 * @internal
 */
interface AnalyzeBatchActionsOperationStatus {
  done: boolean;
  /**
   * Statistics about the input document batch and how it was processed
   * by the service. This property will have a value when includeStatistics is set to true
   * in the client call.
   */
  statistics?: TextDocumentBatchStatistics;
  operationMetdata?: AnalyzeBatchActionsOperationMetadata;
}

/**
 * @internal
 */
interface BeginAnalyzeInternalOptions extends OperationOptions {
  displayName?: string;
}

/**
 * Options for the begin analyze batch actions operation.
 */
export interface BeginAnalyzeBatchActionsOptions extends OperationOptions {
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
export interface AnalyzeBatchActionsOperationState
  extends AnalysisPollOperationState<PagedAnalyzeBatchActionsResult>,
    AnalyzeBatchActionsOperationMetadata {}

/**
 * @internal
 */
function getMetaInfoFromResponse(response: AnalyzeJobState): AnalyzeBatchActionsOperationMetadata {
  return {
    createdOn: response.createdDateTime,
    lastModifiedOn: response.lastUpdateDateTime,
    expiresOn: response.expirationDateTime,
    status: response.status,
    actionsSucceededCount: response.tasks.completed,
    actionsFailedCount: response.tasks.failed,
    actionsInProgressCount: response.tasks.inProgress,
    displayName: response.displayName
  };
}

/**
 * Class that represents a poller that waits for results of the analyze
 * operation.
 * @internal
 */
export class BeginAnalyzeBatchActionsPollerOperation extends AnalysisPollOperation<
  AnalyzeBatchActionsOperationState,
  PagedAnalyzeBatchActionsResult
> {
  constructor(
    public state: AnalyzeBatchActionsOperationState,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    private client: Client,
    private documents: TextDocumentInput[],
    private actions: GeneratedActions,
    private options: BeginAnalyzeBatchActionsOptions = {}
  ) {
    super(state);
  }

  /**
   * should be called only after all the status of the analyze batch actions operations became
   * "succeeded" and it returns an iterator for the results and provides a
   * byPage method to return the results paged.
   */
  private listAnalyzeBatchActionsResults(
    operationId: string,
    options: AnalyzeBatchActionsOperationStatusOptions = {}
  ): PagedAsyncIterableAnalyzeBatchActionsResult {
    const iter = this._listAnalyzeBatchActionsResultsPaged(operationId, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        const pageOptions = { ...options, top: settings?.maxPageSize };
        return this._listAnalyzeBatchActionsResultsPaged(operationId, pageOptions);
      }
    };
  }

  /**
   * returns an iterator to arrays of the results of an analyze batch actions operation.
   */
  private async *_listAnalyzeBatchActionsResultsPaged(
    operationId: string,
    options?: AnalyzeBatchActionsOperationStatusOptions
  ): AsyncIterableIterator<AnalyzeBatchActionsResult> {
    let response = await this._listAnalyzeBatchActionsResultsSinglePage(operationId, options);
    yield response.result;
    while (response.skip) {
      const optionsWithContinuation: AnalyzeBatchActionsOperationStatusOptions = {
        ...options,
        top: response.top,
        skip: response.skip
      };
      response = await this._listAnalyzeBatchActionsResultsSinglePage(
        operationId,
        optionsWithContinuation
      );
      yield response.result;
    }
  }

  /**
   * returns an iterator to arrays of the sorted results of an analyze batch actions operation.
   */
  private async _listAnalyzeBatchActionsResultsSinglePage(
    operationId: string,
    options?: AnalyzeBatchActionsOperationStatusOptions
  ): Promise<AnalyzeResultsWithPagination> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "TextAnalyticsClient-_listAnalyzeBatchActionsResultsSinglePage",
      options || {}
    );
    try {
      const response = await this.client.analyzeStatus(operationId, finalOptions);
      const result = createAnalyzeBatchActionsResult(response, this.documents);
      return response.nextLink
        ? { result, ...nextLinkToTopAndSkip(response.nextLink) }
        : { result };
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * returns whether the analyze batch actions operation is done and if so returns also
   * statistics.
   */
  private async getAnalyzeBatchActionsOperationStatus(
    operationId: string,
    options?: AnalyzeBatchActionsOperationStatusOptions
  ): Promise<AnalyzeBatchActionsOperationStatus> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "TextAnalyticsClient-getAnalyzeBatchActionsOperationStatus",
      options || {}
    );
    try {
      const response = await this.client.analyzeStatus(operationId, finalOptions);
      switch (response.status) {
        case "notStarted":
        case "running":
          break;
        default: {
          return {
            done: true,
            statistics: response.statistics,
            operationMetdata: getMetaInfoFromResponse(response)
          };
        }
      }
      return { done: false, operationMetdata: getMetaInfoFromResponse(response) };
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  private async beginAnalyzeBatchActions(
    documents: TextDocumentInput[],
    actions: GeneratedActions,
    options?: BeginAnalyzeInternalOptions
  ): Promise<BeginAnalyzeResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "TextAnalyticsClient-beginAnalyze",
      options || {}
    );

    try {
      return await this.client.analyze({
        body: {
          analysisInput: { documents: documents },
          tasks: actions,
          displayName: options?.displayName
        },
        ...finalOptions
      });
    } catch (e) {
      const exception = handleInvalidDocumentBatch(e);
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: exception.message
      });
      throw exception;
    } finally {
      span.end();
    }
  }

  async update(
    options: {
      abortSignal?: AbortSignalLike;
      fireProgress?: (state: AnalyzeBatchActionsOperationState) => void;
    } = {}
  ): Promise<BeginAnalyzeBatchActionsPollerOperation> {
    const state = this.state;
    const updatedAbortSignal = options.abortSignal;
    if (!state.isStarted) {
      state.isStarted = true;
      const response = await this.beginAnalyzeBatchActions(this.documents, this.actions, {
        displayName: this.options.displayName,
        tracingOptions: this.options.tracingOptions,
        requestOptions: this.options.requestOptions,
        abortSignal: updatedAbortSignal ? updatedAbortSignal : this.options.abortSignal
      });
      if (!response.operationLocation) {
        throw new Error(
          "Expects a valid 'operationLocation' to retrieve analyze results but did not find any"
        );
      }
      state.operationId = getOperationId(response.operationLocation);
    }

    const operationStatus = await this.getAnalyzeBatchActionsOperationStatus(state.operationId!, {
      abortSignal: updatedAbortSignal ? updatedAbortSignal : options.abortSignal,
      includeStatistics: this.options.includeStatistics,
      tracingOptions: this.options.tracingOptions
    });

    state.createdOn = operationStatus.operationMetdata?.createdOn;
    state.expiresOn = operationStatus.operationMetdata?.expiresOn;
    state.lastModifiedOn = operationStatus.operationMetdata?.lastModifiedOn;
    state.status = operationStatus.operationMetdata?.status;
    state.actionsSucceededCount = operationStatus.operationMetdata?.actionsSucceededCount;
    state.actionsFailedCount = operationStatus.operationMetdata?.actionsFailedCount;
    state.actionsInProgressCount = operationStatus.operationMetdata?.actionsInProgressCount;
    state.displayName = operationStatus.operationMetdata?.displayName;

    if (!state.isCompleted && operationStatus.done) {
      const pagedIterator = this.listAnalyzeBatchActionsResults(state.operationId!, {
        abortSignal: this.options.abortSignal,
        tracingOptions: this.options.tracingOptions,
        includeStatistics: this.options.includeStatistics,
        onResponse: this.options.onResponse,
        serializerOptions: this.options.serializerOptions
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

  async cancel(): Promise<BeginAnalyzeBatchActionsPollerOperation> {
    const state = this.state;
    logger.warning(`The service does not yet support cancellation for beginAnalyze.`);
    state.isCancelled = true;
    return this;
  }
}
