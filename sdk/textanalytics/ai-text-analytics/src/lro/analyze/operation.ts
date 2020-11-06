// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import {
  AbortSignalLike,
  OperationOptions,
  operationOptionsToRequestOptionsBase
} from "@azure/core-http";

import {
  GeneratedClientAnalyzeResponse as BeginAnalyzeResponse,
  GeneratedClientAnalyzeStatusOptionalParams as AnalyzeJobStatusOptions,
  JobManifestTasks,
  State,
  TasksStateTasksEntityRecognitionPiiTasksItem,
  TasksStateTasksEntityRecognitionTasksItem,
  TasksStateTasksKeyPhraseExtractionTasksItem,
  TextDocumentBatchStatistics,
  TextDocumentInput
} from "../../generated/models";
import {
  AnalyzeResult,
  AnalyzeResultsArray,
  PagedAsyncIterableAnalyzeResults,
  PaginatedAnalyzeResults
} from "../../analyzeResult";
import { PageSettings } from "@azure/core-paging";
import {
  addStrEncodingParam,
  getJobID,
  handleInvalidDocumentBatch,
  nextLinkToTopAndSkip
} from "../../util";
import {
  AnalysisPollOperation,
  AnalysisPollOperationState,
  PollingOptions,
  TextAnalyticsStatusOperationOptions
} from "../poller";
import { GeneratedClient as Client } from "../../generated";
import { CanonicalCode } from "@opentelemetry/api";
import { createSpan } from "../../tracing";
import { TextAnalyticsOperationOptions } from "../../textAnalyticsOperationOptions";
import { makeRecognizeCategorizedEntitiesResult } from "../../recognizeCategorizedEntitiesResult";
import { makeRecognizePiiEntitiesResult } from "../../recognizePiiEntitiesResult";
import { makeExtractKeyPhrasesResult } from "../../extractKeyPhrasesResult";
import { processAndcombineSuccessfulErroneousDocuments } from "../../textAnalyticsResult";
export { State };

interface AnalyzeResultsWithPagination {
  result: AnalyzeResultsArray;
  top?: number;
  skip?: number;
}

interface AnalyzeJobStatus {
  done: boolean;
  /**
   * Statistics about the input document batch and how it was processed
   * by the service. This property will have a value when includeStatistics is set to true
   * in the client call.
   */
  statistics?: TextDocumentBatchStatistics;
}

interface BeginAnalyzeInternalOptions extends OperationOptions {}

/**
 * Options for configuring analyze jobs.
 */
export interface AnalyzeJobOptions extends TextAnalyticsOperationOptions {}

/**
 * Options for the begin analyze operation.
 */
export interface BeginAnalyzeOptions {
  polling?: PollingOptions;
  analyze?: AnalyzeJobOptions;
}

/**
 * The state of the begin analyze polling operation.
 */
export interface BeginAnalyzePollState
  extends AnalysisPollOperationState<PaginatedAnalyzeResults> {}

/**
 * Class that represents a poller that waits for results of the analyze
 * operation.
 */
export class BeginAnalyzePollerOperation extends AnalysisPollOperation<
  BeginAnalyzePollState,
  PaginatedAnalyzeResults
> {
  constructor(
    public state: BeginAnalyzePollState,
    private client: Client,
    private documents: TextDocumentInput[],
    private tasks: JobManifestTasks,
    private options: BeginAnalyzeOptions = {},
    private statusOptions: TextAnalyticsStatusOperationOptions
  ) {
    super(state);
  }

  /**
   * should be called only after all the status of the analyze jobs became
   * "succeeded" and it returns an iterator for the results and provides a
   * byPage method to return the results paginated.
   */
  private listAnalyzeResultsByPage(
    jobId: string,
    options: AnalyzeJobStatusOptions = {}
  ): PagedAsyncIterableAnalyzeResults {
    const iter = this._listAnalyzeResults(jobId, options);
    const pagedIterator = {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        const pageOptions = { ...options, top: settings?.maxPageSize };
        return this._listAnalyzeResultsPaginated(jobId, pageOptions);
      }
    };
    return pagedIterator;
  }

  /**
   * returns an iterator to the results of an analyze job.
   */
  private async *_listAnalyzeResults(
    jobId: string,
    options?: AnalyzeJobStatusOptions
  ): AsyncIterableIterator<AnalyzeResult> {
    for await (const page of this._listAnalyzeResultsPaginated(jobId, options)) {
      yield* page;
    }
  }

  /**
   * returns an iterator to arrays of the results of an analyze job.
   */
  private async *_listAnalyzeResultsPaginated(
    jobId: string,
    options?: AnalyzeJobStatusOptions
  ): AsyncIterableIterator<AnalyzeResultsArray> {
    let response = await this._listAnalyzeResultsSinglePage(jobId, options);
    yield response.result;
    while (response.skip) {
      const optionsWithContinuation: AnalyzeJobStatusOptions = {
        ...options,
        top: response.top,
        skip: response.skip
      };
      response = await this._listAnalyzeResultsSinglePage(jobId, optionsWithContinuation);
      yield response.result;
    }
  }

  /**
   * returns an iterator to arrays of the sorted results of an analyze job.
   */
  private async _listAnalyzeResultsSinglePage(
    jobId: string,
    options?: AnalyzeJobStatusOptions
  ): Promise<AnalyzeResultsWithPagination> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "TextAnalyticsClient-_listAnalyzeResultsSinglePage",
      options || {}
    );
    try {
      const response = await this.client.analyzeStatus(
        jobId,
        operationOptionsToRequestOptionsBase(finalOptions)
      );
      const result: AnalyzeResultsArray = [
        ...makeAnalyzeEntitiesResultArray(this.documents, response.tasks.entityRecognitionTasks),
        ...makeAnalyzePiiEntitiesResultArray(
          this.documents,
          response.tasks.entityRecognitionPiiTasks
        ),
        ...makeAnalyzeKeyPhrasesResultArray(this.documents, response.tasks.keyPhraseExtractionTasks)
      ];
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
   * returns whether the analyze job is done and if so returns also
   * statistics.
   */
  private async getAnalyzeStatus(
    jobId: string,
    options?: AnalyzeJobStatusOptions
  ): Promise<AnalyzeJobStatus> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "TextAnalyticsClient-getAnalyzeStatus",
      options || {}
    );
    try {
      const response = await this.client.analyzeStatus(
        jobId,
        operationOptionsToRequestOptionsBase(finalOptions)
      );
      switch (response.status) {
        case "succeeded": {
          return {
            done: true,
            statistics: response.statistics
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
          throw new Error("Unrecognized state of the analyze job!");
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

  private async beginAnalyze(
    documents: TextDocumentInput[],
    tasks: JobManifestTasks,
    options?: BeginAnalyzeInternalOptions
  ): Promise<BeginAnalyzeResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "TextAnalyticsClient-beginAnalyze",
      addStrEncodingParam(options)
    );

    try {
      return await this.client.analyze({
        body: { analysisInput: { documents: documents }, tasks: tasks },
        ...operationOptionsToRequestOptionsBase(finalOptions)
      });
    } catch (e) {
      let exception = handleInvalidDocumentBatch(e);
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
      fireProgress?: (state: BeginAnalyzePollState) => void;
    } = {}
  ): Promise<BeginAnalyzePollerOperation> {
    const state = this.state;
    const updatedAbortSignal = options.abortSignal;
    if (!state.isStarted) {
      state.isStarted = true;
      const response = await this.beginAnalyze(this.documents, this.tasks, {
        ...this.options.analyze,
        abortSignal: updatedAbortSignal ? updatedAbortSignal : this.options.analyze?.abortSignal
      });
      if (!response.operationLocation) {
        throw new Error(
          "Expects a valid 'operationLocation' to retrieve analyze results but did not find any"
        );
      }
      state.jobId = getJobID(response.operationLocation);
    }
    const status = await this.getAnalyzeStatus(state.jobId!, {
      ...this.statusOptions,
      abortSignal: updatedAbortSignal ? updatedAbortSignal : options.abortSignal
    });

    if (!state.isCompleted && status.done) {
      if (typeof options.fireProgress === "function") {
        options.fireProgress(state);
      }
      const pagedIterator = this.listAnalyzeResultsByPage(state.jobId!, this.options.analyze || {});
      state.result = Object.assign(pagedIterator, {
        statistics: status.statistics
      });
      state.isCompleted = true;
    }
    return this;
  }
}

function makeAnalyzeEntitiesResultArray(
  documents: TextDocumentInput[],
  tasksResults?: TasksStateTasksEntityRecognitionTasksItem[]
): AnalyzeResultsArray {
  let result: AnalyzeResultsArray = [];
  if (tasksResults) {
    for (const task of tasksResults) {
      if (task.results) {
        const analyzeEntitiesResult: AnalyzeResultsArray = processAndcombineSuccessfulErroneousDocuments(
          documents,
          task.results,
          (doc) =>
            makeRecognizeCategorizedEntitiesResult(
              doc.id,
              doc.entities,
              doc.warnings,
              doc.statistics
            )
        ).map((doc) => (doc.error ? { type: "Error", ...doc } : { type: "Entities", ...doc }));
        result.push(...analyzeEntitiesResult);
      }
    }
  }
  return result;
}

function makeAnalyzePiiEntitiesResultArray(
  documents: TextDocumentInput[],
  tasksResults?: TasksStateTasksEntityRecognitionPiiTasksItem[]
): AnalyzeResultsArray {
  let result: AnalyzeResultsArray = [];
  if (tasksResults) {
    for (const task of tasksResults) {
      if (task.results) {
        const analyzeEntitiesResult: AnalyzeResultsArray = processAndcombineSuccessfulErroneousDocuments(
          documents,
          task.results,
          makeRecognizePiiEntitiesResult
        ).map((doc) => (doc.error ? { type: "Error", ...doc } : { type: "PiiEntities", ...doc }));
        result.push(...analyzeEntitiesResult);
      }
    }
  }
  return result;
}

function makeAnalyzeKeyPhrasesResultArray(
  documents: TextDocumentInput[],
  tasksResults?: TasksStateTasksKeyPhraseExtractionTasksItem[]
): AnalyzeResultsArray {
  let result: AnalyzeResultsArray = [];
  if (tasksResults) {
    for (const task of tasksResults) {
      if (task.results) {
        const analyzeKeyPhrasesResult: AnalyzeResultsArray = processAndcombineSuccessfulErroneousDocuments(
          documents,
          task.results,
          (doc) => makeExtractKeyPhrasesResult(doc.id, doc.keyPhrases, doc.warnings, doc.statistics)
        ).map((doc) => (doc.error ? { type: "Error", ...doc } : { type: "KeyPhrases", ...doc }));
        result.push(...analyzeKeyPhrasesResult);
      }
    }
  }
  return result;
}
