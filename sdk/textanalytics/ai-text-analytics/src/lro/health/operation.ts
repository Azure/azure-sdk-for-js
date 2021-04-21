// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { OperationOptions } from "@azure/core-client";

import {
  GeneratedClientHealthResponse as BeginAnalyzeHealthcareResponse,
  GeneratedClientHealthStatusOptionalParams as HealthcareJobStatusOptions,
  HealthcareJobState,
  State,
  TextDocumentBatchStatistics,
  TextDocumentInput
} from "../../generated/models";
import {
  AnalyzeHealthcareEntitiesResult,
  AnalyzeHealthcareEntitiesResultArray,
  PagedAsyncIterableAnalyzeHealthcareEntitiesResult,
  PagedAnalyzeHealthcareEntitiesResult,
  makeHealthcareEntitiesResult,
  makeHealthcareEntitiesErrorResult
} from "../../analyzeHealthcareEntitiesResult";
import { PageSettings } from "@azure/core-paging";
import {
  addStrEncodingParam,
  getOperationId,
  handleInvalidDocumentBatch,
  nextLinkToTopAndSkip,
  StringIndexType
} from "../../util";
import {
  AnalysisPollOperation,
  AnalysisPollOperationState,
  OperationMetadata as AnalyzeHealthcareEntitiesOperationMetadata
} from "../poller";
import { GeneratedClient as Client } from "../../generated";
import { processAndCombineSuccessfulAndErroneousDocuments } from "../../textAnalyticsResult";
import { SpanStatusCode } from "@azure/core-tracing";
import { createSpan } from "../../tracing";
import { TextAnalyticsOperationOptions } from "../../textAnalyticsOperationOptions";
export { State };

/**
 * @internal
 */
interface AnalyzeHealthcareEntitiesResultWithPagination {
  result: AnalyzeHealthcareEntitiesResultArray;
  top?: number;
  skip?: number;
}

/**
 * @internal
 */
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
  operationMetdata?: AnalyzeHealthcareEntitiesOperationMetadata;
}

/**
 * @internal
 */
interface BeginAnalyzeHealthcareInternalOptions extends OperationOptions {
  /**
   * This value indicates which model will be used for scoring. If a model-version is
   * not specified, the API should default to the latest, non-preview version.
   * For supported model versions, see operation-specific documentation, for example:
   * https://docs.microsoft.com/azure/cognitive-services/text-analytics/how-tos/text-analytics-how-to-sentiment-analysis#model-versioning
   */
  modelVersion?: string;
  /**
   * Specifies the measurement unit used to calculate the offset and length properties.
   * Possible units are "TextElements_v8", "UnicodeCodePoint", and "Utf16CodeUnit".
   * The default is the JavaScript's default which is "Utf16CodeUnit".
   */
  stringIndexType?: StringIndexType;
}

/**
 * Options for the begin analyze healthcare entities operation.
 */
export interface BeginAnalyzeHealthcareEntitiesOptions extends TextAnalyticsOperationOptions {
  /**
   * Delay to wait until next poll, in milliseconds.
   */
  stringIndexType?: StringIndexType;
  /**
   * Delay to wait until next poll, in milliseconds.
   */
  updateIntervalInMs?: number;
  /**
   * A serialized poller which can be used to resume an existing paused Long-Running-Operation.
   */
  resumeFrom?: string;
}

/**
 * The state of the begin analyze healthcare polling operation.
 */
export interface AnalyzeHealthcareOperationState
  extends AnalysisPollOperationState<PagedAnalyzeHealthcareEntitiesResult> {}

/**
 * @internal
 */
function getMetaInfoFromResponse(
  response: HealthcareJobState
): AnalyzeHealthcareEntitiesOperationMetadata {
  return {
    createdOn: response.createdDateTime,
    lastModifiedOn: response.lastUpdateDateTime,
    expiresOn: response.expirationDateTime,
    status: response.status
  };
}

/**
 * Class that represents a poller that waits for the healthcare results.
 * @internal
 */
export class BeginAnalyzeHealthcarePollerOperation extends AnalysisPollOperation<
  AnalyzeHealthcareOperationState,
  PagedAnalyzeHealthcareEntitiesResult
> {
  constructor(
    public state: AnalyzeHealthcareOperationState,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    private client: Client,
    private documents: TextDocumentInput[],
    private options: BeginAnalyzeHealthcareEntitiesOptions = {}
  ) {
    super(state);
  }

  /**
   * should be called only after all the status of the healthcare operations became
   * "succeeded" and it returns an iterator for the results and provides a
   * byPage method to return the results paged.
   */
  private listHealthcareEntitiesByPage(
    operationId: string,
    options: HealthcareJobStatusOptions = {}
  ): PagedAsyncIterableAnalyzeHealthcareEntitiesResult {
    const iter = this._listHealthcareEntities(operationId, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        const pageOptions = { ...options, top: settings?.maxPageSize };
        return this._listHealthcareEntitiesPaged(operationId, pageOptions);
      }
    };
  }

  /**
   * returns an iterator to the results of a healthcare operation.
   */
  private async *_listHealthcareEntities(
    operationId: string,
    options?: HealthcareJobStatusOptions
  ): AsyncIterableIterator<AnalyzeHealthcareEntitiesResult> {
    for await (const page of this._listHealthcareEntitiesPaged(operationId, options)) {
      yield* page;
    }
  }

  /**
   * returns an iterator to arrays of the results of a healthcare operation.
   */
  private async *_listHealthcareEntitiesPaged(
    operationId: string,
    options?: HealthcareJobStatusOptions
  ): AsyncIterableIterator<AnalyzeHealthcareEntitiesResultArray> {
    let response = await this._listHealthcareEntitiesSinglePage(operationId, options);
    yield response.result;
    while (response.skip) {
      const optionsWithContinuation: HealthcareJobStatusOptions = {
        ...options,
        top: response.top,
        skip: response.skip
      };
      response = await this._listHealthcareEntitiesSinglePage(operationId, optionsWithContinuation);
      yield response.result;
    }
  }

  /**
   * returns an iterator to arrays of the sorted results of a healthcare operation.
   */
  private async _listHealthcareEntitiesSinglePage(
    operationId: string,
    options?: HealthcareJobStatusOptions
  ): Promise<AnalyzeHealthcareEntitiesResultWithPagination> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "TextAnalyticsClient-_listHealthcareEntitiesSinglePage",
      options || {}
    );
    try {
      const response = await this.client.healthStatus(operationId, finalOptions);
      if (response.results) {
        const result = processAndCombineSuccessfulAndErroneousDocuments(
          this.documents,
          response.results,
          makeHealthcareEntitiesResult,
          makeHealthcareEntitiesErrorResult
        );
        return response.nextLink
          ? { result, ...nextLinkToTopAndSkip(response.nextLink) }
          : { result };
      } else {
        throw new Error("Healthcare action has succeeded but the there are no results!");
      }
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
   * returns whether the healthcare operation is done and if so returns also
   * statistics and the model version used.
   */
  private async getHealthStatus(
    operationId: string,
    options?: HealthcareJobStatusOptions
  ): Promise<HealthcareJobStatus> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "TextAnalyticsClient-getHealthStatus",
      options || {}
    );
    try {
      const response = await this.client.healthStatus(operationId, finalOptions);
      switch (response.status) {
        case "notStarted":
        case "running":
          break;
        case "failed": {
          const errors = response.errors
            ?.map((e) => `  code ${e.code}, message: '${e.message}'`)
            .join("\n");
          const message = `Healthcare analysis failed. Error(s): ${errors || ""}`;
          throw new Error(message);
        }
        default: {
          if (response.results) {
            return {
              done: true,
              statistics: response.results.statistics,
              modelVersion: response.results.modelVersion,
              operationMetdata: getMetaInfoFromResponse(response)
            };
          } else {
            throw new Error("Healthcare action has finished but the there are no results!");
          }
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

  private async beginAnalyzeHealthcare(
    documents: TextDocumentInput[],
    options?: BeginAnalyzeHealthcareInternalOptions
  ): Promise<BeginAnalyzeHealthcareResponse> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "TextAnalyticsClient-beginAnalyzeHealthcare",
      addStrEncodingParam(options || {})
    );

    try {
      return await this.client.health({ documents: documents }, finalOptions);
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
      fireProgress?: (state: AnalyzeHealthcareOperationState) => void;
    } = {}
  ): Promise<BeginAnalyzeHealthcarePollerOperation> {
    const state = this.state;
    const updatedAbortSignal = options.abortSignal;
    if (!state.isStarted) {
      state.isStarted = true;
      const response = await this.beginAnalyzeHealthcare(this.documents, {
        requestOptions: this.options.requestOptions,
        tracingOptions: this.options.tracingOptions,
        abortSignal: updatedAbortSignal ? updatedAbortSignal : options.abortSignal,
        modelVersion: this.options.modelVersion,
        stringIndexType: this.options.stringIndexType
      });
      if (!response.operationLocation) {
        throw new Error(
          "Expects a valid 'operationLocation' to retrieve health results but did not find any"
        );
      }
      state.operationId = getOperationId(response.operationLocation);
    }
    const operationStatus = await this.getHealthStatus(state.operationId!, {
      abortSignal: updatedAbortSignal ? updatedAbortSignal : options.abortSignal,
      includeStatistics: this.options.includeStatistics,
      tracingOptions: this.options.tracingOptions,
      onResponse: this.options.onResponse,
      serializerOptions: this.options.serializerOptions
    });

    state.createdOn = operationStatus.operationMetdata?.createdOn;
    state.expiresOn = operationStatus.operationMetdata?.expiresOn;
    state.lastModifiedOn = operationStatus.operationMetdata?.lastModifiedOn;
    state.status = operationStatus.operationMetdata?.status;

    if (!state.isCompleted && operationStatus.done) {
      const pagedIterator = this.listHealthcareEntitiesByPage(state.operationId!, {
        abortSignal: this.options.abortSignal,
        tracingOptions: this.options.tracingOptions
      });
      state.result = Object.assign(pagedIterator, {
        statistics: operationStatus.statistics,
        modelVersion: operationStatus.modelVersion!
      });
      state.isCompleted = true;
    }
    if (typeof options.fireProgress === "function") {
      options.fireProgress(state);
    }
    return this;
  }

  async cancel(): Promise<BeginAnalyzeHealthcarePollerOperation> {
    const state = this.state;
    if (state.operationId) {
      await this.client.cancelHealthJob(state.operationId, {
        abortSignal: this.options.abortSignal,
        tracingOptions: this.options.tracingOptions
      });
    }
    state.isCancelled = true;
    return this;
  }
}
