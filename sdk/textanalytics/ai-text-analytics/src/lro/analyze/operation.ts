// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AbortSignalLike,
  OperationOptions,
  operationOptionsToRequestOptionsBase
} from "@azure/core-http";

import {
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
  PagedAnalyzeBatchActionsResult
} from "../../analyzeBatchActionsResult";
import { PageSettings } from "@azure/core-paging";
import { getOperationId, handleInvalidDocumentBatch, nextLinkToTopAndSkip } from "../../util";
import { AnalysisPollOperation, AnalysisPollOperationState, OperationMetadata } from "../poller";
import { GeneratedClient as Client } from "../../generated";
import { CanonicalCode } from "@opentelemetry/api";
import { createSpan } from "../../tracing";
import {
  makeRecognizeCategorizedEntitiesResultArray,
  RecognizeCategorizedEntitiesResultArray
} from "../../recognizeCategorizedEntitiesResultArray";
import {
  makeRecognizePiiEntitiesResultArray,
  RecognizePiiEntitiesResultArray
} from "../../recognizePiiEntitiesResultArray";
import {
  ExtractKeyPhrasesResultArray,
  makeExtractKeyPhrasesResultArray
} from "../../extractKeyPhrasesResultArray";
import { logger } from "../../logger";
export { State };

interface AnalyzeResultsWithPagination {
  result: AnalyzeBatchActionsResult;
  top?: number;
  skip?: number;
}

/**
 * The metadata for beginAnalyzeBatchActionsoperations.
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
   * Optional display name for the operation.
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
 * Class that represents a poller that waits for results of the analyze
 * operation.
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
      const response = await this.client.analyzeStatus(
        operationId,
        operationOptionsToRequestOptionsBase(finalOptions)
      );
      const result: AnalyzeBatchActionsResult = {
        recognizeEntitiesResults:
          response.tasks.entityRecognitionTasks?.map(
            ({ results }): RecognizeCategorizedEntitiesResultArray =>
              makeRecognizeCategorizedEntitiesResultArray(
                this.documents,
                results?.documents,
                results?.errors,
                results?.modelVersion,
                results?.statistics
              )
          ) ?? [],
        recognizePiiEntitiesResults:
          response.tasks.entityRecognitionPiiTasks?.map(
            ({ results }): RecognizePiiEntitiesResultArray =>
              makeRecognizePiiEntitiesResultArray(this.documents, results)
          ) ?? [],
        extractKeyPhrasesResults:
          response.tasks.keyPhraseExtractionTasks?.map(
            ({ results }): ExtractKeyPhrasesResultArray =>
              makeExtractKeyPhrasesResultArray(
                this.documents,
                results?.documents,
                results?.errors,
                results?.modelVersion,
                results?.statistics
              )
          ) ?? []
      };
      return response.nextLink
        ? { result, ...nextLinkToTopAndSkip(response.nextLink) }
        : { result };
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
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
      const response = await this.client.analyzeStatus(
        operationId,
        operationOptionsToRequestOptionsBase(finalOptions)
      );
      switch (response.status) {
        case "partiallySucceeded":
        case "succeeded": {
          return {
            done: true,
            statistics: response.statistics,
            operationMetdata: {
              createdOn: response.createdDateTime,
              lastModifiedOn: response.lastUpdateDateTime,
              expiresOn: response.expirationDateTime,
              status: response.status,
              actionsSucceededCount: response.tasks.completed,
              actionsFailedCount: response.tasks.failed,
              actionsInProgressCount: response.tasks.inProgress,
              displayName: response.displayName
            }
          };
        }
        case "failed": {
          const errors = response.errors
            ?.map((e) => `  code ${e.code}, message: '${e.message}'`)
            .join("\n");
          const message = `Analysis failed. Error(s): ${errors || ""}`;
          throw new Error(message);
        }
        case "notStarted":
        case "running":
          break;
        default: {
          throw new Error(
            `Unrecognized state of the analyze batch actions operation!: ${response.status}`
          );
        }
      }
      return { done: false };
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
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
        ...operationOptionsToRequestOptionsBase(finalOptions)
      });
    } catch (e) {
      const exception = handleInvalidDocumentBatch(e);
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
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
        tracingOptions: this.options.tracingOptions,
        requestOptions: this.options.requestOptions,
        abortSignal: updatedAbortSignal ? updatedAbortSignal : this.options.abortSignal,
        displayName: this.options.displayName
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
      if (typeof options.fireProgress === "function") {
        options.fireProgress(state);
      }
      const pagedIterator = this.listAnalyzeBatchActionsResults(state.operationId!, {
        abortSignal: this.options.abortSignal,
        tracingOptions: this.options.tracingOptions
      });
      state.result = Object.assign(pagedIterator, {
        statistics: operationStatus.statistics
      });
      state.isCompleted = true;
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
