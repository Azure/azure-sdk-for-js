// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LongRunningOperation, LroResponse, PollerLike, RawResponse } from "@azure/core-lro";
import { SpanStatusCode } from "@azure/core-tracing";
import { createSerializer, OperationOptions, OperationSpec } from "@azure/core-client";
import {
  AnalyzeHealthcareEntitiesResult,
  AnalyzeHealthcareEntitiesResultArray,
  makeHealthcareEntitiesErrorResult,
  makeHealthcareEntitiesResult,
  PagedAnalyzeHealthcareEntitiesResult,
} from "./analyzeHealthcareEntitiesResult";
import {
  GeneratedClient,
  GeneratedClientHealthStatusOptionalParams,
  GeneratedClientHealthStatusResponse,
  TextDocumentInput,
} from "./generated";
import { createSpan } from "./tracing";
import {
  addStrEncodingParam,
  getRawResponse,
  compileError,
  sendGetRequest,
  StringIndexType,
} from "./util";
import * as Mappers from "./generated/models/mappers";
import {
  accept,
  apiVersion,
  endpoint,
  includeStatistics,
  skip,
  top,
} from "./generated/models/parameters";
import { processAndCombineSuccessfulAndErroneousDocuments } from "./textAnalyticsResult";
import { getPagedAsyncIterator, PagedResult } from "@azure/core-paging";
import { AnalysisPollOperationState } from "./pollerModels";
import { TextAnalyticsOperationOptions } from "./textAnalyticsOperationOptions";

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
 * Result type of the Health Long-Running-Operation (LRO)
 */
export type AnalyzeHealthcareEntitiesPollerLike = PollerLike<
  AnalyzeHealthcareOperationState,
  PagedAnalyzeHealthcareEntitiesResult
>;

/**
 * The state of the begin analyze healthcare polling operation.
 */
export interface AnalyzeHealthcareOperationState
  extends AnalysisPollOperationState<PagedAnalyzeHealthcareEntitiesResult> {}

const serializer = createSerializer(Mappers, /* isXml */ false);

// Consider whether the spec can be exported by code gen
const healthStatusOperationSpec: OperationSpec = {
  path: "/entities/health/jobs/{jobId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.HealthcareJobState,
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
export class HealthLro implements LongRunningOperation<PagedAnalyzeHealthcareEntitiesResult> {
  public requestMethod = "POST";
  public requestPath = "/entities/health/jobs";
  constructor(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    private client: GeneratedClient,
    private baseOptions: OperationOptions,
    private initOptions: {
      modelVersion?: string;
      stringIndexType?: StringIndexType;
      loggingOptOut?: boolean;
    },
    private pollOptions: {
      includeStatistics?: boolean;
    },
    private documents: TextDocumentInput[]
  ) {}
  async sendInitialRequest(): Promise<LroResponse<PagedAnalyzeHealthcareEntitiesResult>> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "TextAnalyticsClient-beginAnalyzeHealthcare",
      {
        ...this.baseOptions,
        ...addStrEncodingParam(this.initOptions),
      }
    );
    try {
      const { flatResponse, rawResponse } = await getRawResponse(
        (paramOptions) => this.client.health({ documents: this.documents }, paramOptions),
        finalOptions
      );
      return {
        flatResponse: flatResponse as PagedAnalyzeHealthcareEntitiesResult,
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
  async sendPollRequest(path: string): Promise<LroResponse<PagedAnalyzeHealthcareEntitiesResult>> {
    return sendGetRequest(
      this.client,
      healthStatusOperationSpec,
      "HealthStatus",
      { ...this.baseOptions, ...this.pollOptions },
      path
    ) as Promise<LroResponse<PagedAnalyzeHealthcareEntitiesResult>>;
  }
}

/**
 * @internal
 */
export function isHealthDone(response: unknown): boolean {
  const castResponse = response as GeneratedClientHealthStatusResponse;
  switch (castResponse.status) {
    case "notStarted":
    case "running":
      return false;
    case "failed": {
      const errors = castResponse.errors
        ?.map((e) => ` code ${e.code}, message: '${e.message}'`)
        .join("\n");
      const message = `Healthcare analysis failed. Error(s): ${errors || ""}`;
      throw new Error(message);
    }
    default: {
      if (castResponse.results) {
        return true;
      } else {
        throw new Error("Healthcare action has finished but the there are no results!");
      }
    }
  }
}

/**
 * @internal
 */
export function processHealthResult(
  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  client: GeneratedClient,
  documents: TextDocumentInput[],
  options: GeneratedClientHealthStatusOptionalParams
): (
  result: unknown,
  state: AnalyzeHealthcareOperationState
) => PagedAnalyzeHealthcareEntitiesResult {
  return (
    result: unknown,
    state: AnalyzeHealthcareOperationState
  ): PagedAnalyzeHealthcareEntitiesResult => {
    const pollingURL = (state as any).pollingURL;
    const pagedResult: PagedResult<AnalyzeHealthcareEntitiesResultArray> = {
      firstPageLink: pollingURL,
      getPage: async (pageLink: string, maxPageSize?: number) => {
        const response = await sendGetRequest(
          client,
          healthStatusOperationSpec,
          "HealthStatus",
          // if `top` is set to `undefined`, the default value will not be sent
          // as part of the request.
          maxPageSize ? { ...options, top: maxPageSize } : options,
          pageLink
        );
        const flatResponse = response.flatResponse as GeneratedClientHealthStatusResponse;
        if (flatResponse.results) {
          return {
            page: processAndCombineSuccessfulAndErroneousDocuments(
              documents,
              flatResponse.results,
              makeHealthcareEntitiesResult,
              makeHealthcareEntitiesErrorResult
            ),
            nextPageLink: flatResponse.nextLink,
          };
        } else {
          throw new Error("Healthcare action has succeeded but there are no results!");
        }
      },
    };
    const pagedIterator = getPagedAsyncIterator<
      AnalyzeHealthcareEntitiesResult,
      AnalyzeHealthcareEntitiesResultArray
    >(pagedResult);
    return Object.assign(pagedIterator, {
      statistics: (result as any).results.statistics,
      modelVersion: (result as any).results.modelVersion!,
    });
  };
}

/**
 * @internal
 */
export function updateHealthState(
  state: AnalyzeHealthcareOperationState,
  lastResponse: RawResponse
): void {
  const response = lastResponse.body as any;
  state.createdOn = response.createdDateTime;
  state.lastModifiedOn = response.lastUpdateDateTime;
  state.expiresOn = response.expirationDateTime;
  state.status = response.status;
}
