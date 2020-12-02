// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AbortSignalLike,
  OperationOptions,
  operationOptionsToRequestOptionsBase
} from "@azure/core-http";

import {
  GeneratedClientHealthResponse as BeginAnalyzeHealthcareResponse,
  GeneratedClientHealthStatusOptionalParams as HealthcareJobStatusOptions,
  State,
  TextDocumentBatchStatistics,
  TextDocumentInput
} from "../../generated/models";
import {
  HealthcareResult,
  HealthcareEntitiesArray,
  PagedAsyncIterableHealthEntities,
  PaginatedHealthcareEntities
} from "../../healthResult";
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
import { combineSuccessfulAndErroneousDocuments } from "../../textAnalyticsResult";
import { CanonicalCode } from "@opentelemetry/api";
import { createSpan } from "../../tracing";
import { TextAnalyticsOperationOptions } from "../../textAnalyticsOperationOptions";
export { State };

interface HealthcareResultWithPagination {
  result: HealthcareEntitiesArray;
  top?: number;
  skip?: number;
}

interface HealthcareJobStatus {
  done: boolean;
  /**
   * Statistics about the input document batch and how it was processed
   * by the service. This property will have a value when includeStatistics is set to true
   * in the client call.
   */
  statistics?: TextDocumentBatchStatistics;
  /**
   * The version of the text analytics model used by this operation on this
   * batch of input documents.
   */
  modelVersion?: string;
}

interface BeginAnalyzeHealthcareInternalOptions extends OperationOptions {
  /**
   * This value indicates which model will be used for scoring. If a model-version is
   * not specified, the API should default to the latest, non-preview version.
   * For supported model versions, see operation-specific documentation, for example:
   * https://docs.microsoft.com/azure/cognitive-services/text-analytics/how-tos/text-analytics-how-to-sentiment-analysis#model-versioning
   */
  modelVersion?: string;
}

/**
 * Options for configuring analyze healthcare jobs.
 */
export interface HealthcareJobOptions extends TextAnalyticsOperationOptions {}

/**
 * Options for the begin analyze healthcare operation.
 */
export interface BeginAnalyzeHealthcareOptions {
  /**
   * Options related to polling from the service.
   */
  polling?: PollingOptions;
  /**
   * Options related to the healthcare job.
   */
  health?: HealthcareJobOptions;
}

/**
 * The state of the begin analyze healthcare polling operation.
 */
export interface BeginAnalyzeHealthcarePollState
  extends AnalysisPollOperationState<PaginatedHealthcareEntities> {}

/**
 * Class that represents a poller that waits for the healthcare results.
 */
export class BeginAnalyzeHealthcarePollerOperation extends AnalysisPollOperation<
  BeginAnalyzeHealthcarePollState,
  PaginatedHealthcareEntities
> {
  constructor(
    public state: BeginAnalyzeHealthcarePollState,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    private client: Client,
    private documents: TextDocumentInput[],
    private options: BeginAnalyzeHealthcareOptions = {},
    private statusOptions: TextAnalyticsStatusOperationOptions
  ) {
    super(state);
  }

  /**
   * should be called only after all the status of the healthcare jobs became
   * "succeeded" and it returns an iterator for the results and provides a
   * byPage method to return the results paginated.
   */
  private listHealthcareEntitiesByPage(
    jobId: string,
    options: HealthcareJobStatusOptions = {}
  ): PagedAsyncIterableHealthEntities {
    const iter = this._listHealthcareEntities(jobId, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        const pageOptions = { ...options, top: settings?.maxPageSize };
        return this._listHealthcareEntitiesPaginated(jobId, pageOptions);
      }
    };
  }

  /**
   * returns an iterator to the results of a healthcare job.
   */
  private async *_listHealthcareEntities(
    jobId: string,
    options?: HealthcareJobStatusOptions
  ): AsyncIterableIterator<HealthcareResult> {
    for await (const page of this._listHealthcareEntitiesPaginated(jobId, options)) {
      yield* page;
    }
  }

  /**
   * returns an iterator to arrays of the results of a healthcare job.
   */
  private async *_listHealthcareEntitiesPaginated(
    jobId: string,
    options?: HealthcareJobStatusOptions
  ): AsyncIterableIterator<HealthcareEntitiesArray> {
    let response = await this._listHealthcareEntitiesSinglePage(jobId, options);
    yield response.result;
    while (response.skip) {
      const optionsWithContinuation: HealthcareJobStatusOptions = {
        ...options,
        top: response.top,
        skip: response.skip
      };
      response = await this._listHealthcareEntitiesSinglePage(jobId, optionsWithContinuation);
      yield response.result;
    }
  }

  /**
   * returns an iterator to arrays of the sorted results of a healthcare job.
   */
  private async _listHealthcareEntitiesSinglePage(
    jobId: string,
    options?: HealthcareJobStatusOptions
  ): Promise<HealthcareResultWithPagination> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "TextAnalyticsClient-_listHealthcareEntitiesSinglePage",
      options || {}
    );
    try {
      const response = await this.client.healthStatus(
        jobId,
        operationOptionsToRequestOptionsBase(finalOptions)
      );
      if (response.results) {
        const result = combineSuccessfulAndErroneousDocuments(this.documents, response.results);
        return response.nextLink
          ? { result, ...nextLinkToTopAndSkip(response.nextLink) }
          : { result };
      } else {
        throw new Error("Healthcare task has succeeded but the there are no results!");
      }
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
   * returns whether the healthcare job is done and if so returns also
   * statistics and the model version used.
   */
  private async getHealthStatus(
    jobId: string,
    options?: HealthcareJobStatusOptions
  ): Promise<HealthcareJobStatus> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "TextAnalyticsClient-getHealthStatus",
      options || {}
    );
    try {
      const response = await this.client.healthStatus(
        jobId,
        operationOptionsToRequestOptionsBase(finalOptions)
      );
      switch (response.status) {
        case "succeeded": {
          if (response.results) {
            return {
              done: true,
              statistics: response.results.statistics,
              modelVersion: response.results.modelVersion
            };
          } else {
            throw new Error("Healthcare task has succeeded but the there are no results!");
          }
        }
        case "failed": {
          const errors = response.errors
            ?.map((e) => `  code ${e.code}, message: '${e.message}'`)
            .join("\n");
          const message = `Healthcare analysis failed. Error(s): ${errors || ""}`;
          throw new Error(message);
        }
        case "notStarted":
        case "running":
          break;
        default: {
          throw new Error("Unrecognized state of healthcare job!");
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

  private async beginAnalyzeHealthcare(
    documents: TextDocumentInput[],
    options?: BeginAnalyzeHealthcareInternalOptions
  ): Promise<BeginAnalyzeHealthcareResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "TextAnalyticsClient-beginAnalyzeHealthcare",
      addStrEncodingParam(options)
    );

    try {
      return await this.client.health(
        { documents: documents },
        operationOptionsToRequestOptionsBase(finalOptions)
      );
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
      fireProgress?: (state: BeginAnalyzeHealthcarePollState) => void;
    } = {}
  ): Promise<BeginAnalyzeHealthcarePollerOperation> {
    const state = this.state;
    const updatedAbortSignal = options.abortSignal;
    if (!state.isStarted) {
      state.isStarted = true;
      const response = await this.beginAnalyzeHealthcare(this.documents, {
        ...this.options.health,
        abortSignal: updatedAbortSignal ? updatedAbortSignal : options.abortSignal
      });
      if (!response.operationLocation) {
        throw new Error(
          "Expects a valid 'operationLocation' to retrieve health results but did not find any"
        );
      }
      state.jobId = getJobID(response.operationLocation);
    }
    const status = await this.getHealthStatus(state.jobId!, {
      ...this.statusOptions,
      abortSignal: updatedAbortSignal ? updatedAbortSignal : options.abortSignal
    });

    if (!state.isCompleted && status.done) {
      if (typeof options.fireProgress === "function") {
        options.fireProgress(state);
      }
      const pagedIterator = this.listHealthcareEntitiesByPage(
        state.jobId!,
        this.options.health || {}
      );
      state.result = Object.assign(pagedIterator, {
        statistics: status.statistics,
        modelVersion: status.modelVersion!
      });
      state.isCompleted = true;
    }
    return this;
  }

  async cancel(): Promise<BeginAnalyzeHealthcarePollerOperation> {
    const state = this.state;
    if (state.jobId) {
      await this.client.cancelHealthJob(state.jobId, this.options.health);
    }
    state.isCancelled = true;
    return this;
  }
}
