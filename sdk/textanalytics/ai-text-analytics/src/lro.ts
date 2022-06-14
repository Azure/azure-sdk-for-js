// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as Mappers from "./generated/models/mappers";
import * as Parameters from "./generated/models/parameters";
import {
  AnalyzeBatchActionUnion,
  AnalyzeTextJobStatusOptionalParams,
  AnalyzeTextJobStatusResponse,
  GeneratedClient,
  TextDocumentInput,
} from "./generated";
import { AnalyzeBatchOperationState, AnalyzeBatchResult, PagedAnalyzeBatchResult } from "./models";
import {
  FullOperationResponse,
  OperationOptions,
  OperationSpec,
  createSerializer,
} from "@azure/core-client";
import { LongRunningOperation, LroResponse, RawResponse } from "@azure/core-lro";
import { PagedResult, getPagedAsyncIterator } from "@azure/core-paging";
import { throwError, transformAnalyzeBatchResults } from "./transforms";
import { HttpMethods } from "@azure/core-rest-pipeline";
import { TracingClient } from "@azure/core-tracing";
import { clientName } from "./constants";
import { logger } from "./logger";

const serializer = createSerializer(Mappers, /* isXml */ false);

const jobStatusOperationSpec: OperationSpec = {
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AnalyzeTextJobState,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  headerParameters: [Parameters.accept],
  queryParameters: [Parameters.top, Parameters.skip, Parameters.includeStatistics],
  serializer,
};

async function getRawResponse<TOptions extends OperationOptions, TResponse>(
  getResponse: (options: TOptions) => Promise<TResponse>,
  options: TOptions
): Promise<LroResponse<TResponse>> {
  const { onResponse } = options || {};
  let rawResponse: FullOperationResponse | undefined = undefined;
  const flatResponse = await getResponse({
    ...options,
    onResponse: (response: FullOperationResponse, flatResponseParam: unknown) => {
      rawResponse = response;
      onResponse?.(response, flatResponseParam);
    },
  });
  return {
    flatResponse,
    rawResponse: {
      statusCode: rawResponse!.status,
      headers: rawResponse!.headers.toJSON(),
      body: rawResponse!.parsedBody,
    },
  };
}

async function sendRequest<TOptions extends OperationOptions>(settings: {
  client: GeneratedClient;
  tracing: TracingClient;
  spec: OperationSpec;
  spanStr: string;
  opOptions: TOptions;
  path: string;
  httpMethod?: HttpMethods;
}): Promise<LroResponse<unknown>> {
  const { client, opOptions, path, spanStr, spec, tracing, httpMethod = "GET" } = settings;
  return tracing.withSpan(spanStr, opOptions, async (finalOptions: TOptions) =>
    throwError(
      getRawResponse(
        (options) =>
          client.sendOperationRequest(
            { options },
            {
              ...spec,
              path,
              httpMethod,
            }
          ),
        finalOptions
      )
    )
  );
}

/**
 * @internal
 */
export function createSendPollRequest<TOptions extends OperationOptions>(settings: {
  client: GeneratedClient;
  tracing: TracingClient;
  options: TOptions;
  spanStr: string;
}): (path: string) => Promise<LroResponse<unknown>> {
  const { client, options, tracing, spanStr } = settings;
  return async (path: string): Promise<LroResponse<unknown>> => {
    return throwError(
      sendRequest({
        client,
        opOptions: options,
        path,
        spanStr,
        spec: jobStatusOperationSpec,
        tracing,
      })
    );
  };
}

/**
 * @internal
 */
export function createAnalyzeBatchLro(settings: {
  client: GeneratedClient;
  tracing: TracingClient;
  commonOptions: OperationOptions;
  initialRequestOptions: {
    displayName?: string;
  };
  pollRequestOptions: {
    includeStatistics?: boolean;
  };
  documents: TextDocumentInput[];
  tasks: AnalyzeBatchActionUnion[];
}): LongRunningOperation<unknown> {
  const {
    client,
    commonOptions,
    documents,
    initialRequestOptions,
    pollRequestOptions,
    tasks,
    tracing,
  } = settings;
  return {
    requestMethod: "POST",
    requestPath: "/analyze-text/jobs",
    async sendInitialRequest(): Promise<LroResponse<unknown>> {
      return tracing.withSpan(
        `${clientName}.beginAnalyzeBatch`,
        {
          ...commonOptions,
          ...initialRequestOptions,
        },
        async (finalOptions) =>
          throwError(
            getRawResponse(
              (paramOptions) =>
                client.analyzeText.submitJob(
                  {
                    tasks,
                    analysisInput: {
                      documents,
                    },
                    displayName: initialRequestOptions.displayName,
                  },
                  paramOptions
                ),
              finalOptions
            )
          )
      );
    },
    sendPollRequest: createSendPollRequest({
      client,
      options: { ...commonOptions, ...pollRequestOptions },
      spanStr: `${clientName}.beginAnalyzeBatch`,
      tracing,
    }),
  };
}

/**
 * @internal
 */
export function getDocsFromState(serializedState: string): TextDocumentInput[] {
  try {
    const { documents } = JSON.parse(serializedState).state;
    return documents;
  } catch (e) {
    logger.error(
      `Documents are not found in the LRO's state. The results may not be ordered correctly.`
    );
    return [];
  }
}

/**
 * @internal
 */
export function createCreateAnalyzeBatchPollerLro<OptionsT extends OperationOptions>(settings: {
  client: GeneratedClient;
  tracing: TracingClient;
  options: OptionsT;
}): LongRunningOperation<unknown> {
  const { client, options, tracing } = settings;
  return {
    requestMethod: "POST",
    requestPath: "/analyze-text/jobs",
    async sendInitialRequest(): Promise<LroResponse<unknown>> {
      throw new Error(`The operation has already started`);
    },
    sendPollRequest: createSendPollRequest({
      client,
      options,
      spanStr: `${clientName}.beginAnalyzeBatch`,
      tracing,
    }),
  };
}

/**
 * @internal
 */
export function processAnalyzeResult(options: {
  client: GeneratedClient;
  tracing: TracingClient;
  documents: TextDocumentInput[];
  opOptions: AnalyzeTextJobStatusOptionalParams;
  continuationToken?: string;
}): (result: unknown, state: AnalyzeBatchOperationState) => PagedAnalyzeBatchResult {
  return (_result: unknown, state: AnalyzeBatchOperationState): PagedAnalyzeBatchResult => {
    const { client, documents, opOptions, tracing, continuationToken } = options;
    const pageURL = continuationToken ?? (state as any).pollingURL;
    const pagedResult: PagedResult<AnalyzeBatchResult[]> = {
      firstPageLink: pageURL,
      getPage: async (pageLink: string, maxPageSize?: number) => {
        const response = await sendRequest({
          client,
          spec: jobStatusOperationSpec,
          spanStr: `${clientName}.beginAnalyzeBatch`,
          // if `top` is set to `undefined`, the default value will not be sent
          // as part of the request.
          opOptions: maxPageSize ? { ...opOptions, top: maxPageSize } : opOptions,
          path: pageLink,
          tracing,
        });
        const flatResponse = response.flatResponse as AnalyzeTextJobStatusResponse;
        return {
          page: transformAnalyzeBatchResults(documents, flatResponse.tasks.items),
          nextPageLink: flatResponse.nextLink,
        };
      },
    };
    return getPagedAsyncIterator(pagedResult);
  };
}

type Writable<T> = {
  -readonly [P in keyof T]: T[P];
};

/**
 * @internal
 */
export function createUpdateAnalyzeState(documents?: TextDocumentInput[]) {
  return (state: AnalyzeBatchOperationState, lastResponse: RawResponse): void => {
    const { createdOn, lastModifiedOn, operationId, status, displayName, expiresOn, tasks } =
      lastResponse.body as AnalyzeTextJobStatusResponse;
    const mutableState = state as Writable<AnalyzeBatchOperationState> & {
      documents?: TextDocumentInput[];
    };
    mutableState.createdOn = createdOn;
    mutableState.lastModifiedOn = lastModifiedOn;
    mutableState.expiresOn = expiresOn;
    mutableState.displayName = displayName;
    mutableState.operationId = operationId;
    mutableState.status = status;
    mutableState.actionSucceededCount = tasks.completed;
    mutableState.actionFailedCount = tasks.failed;
    mutableState.actionInProgressCount = tasks.inProgress;
    if (mutableState.documents === undefined && documents !== undefined) {
      mutableState.documents = documents;
    }
  };
}

/**
 * @internal
 */
export function createCancelOperation(settings: {
  client: GeneratedClient;
  tracing: TracingClient;
  options: AnalyzeTextJobStatusOptionalParams;
}): (state: AnalyzeBatchOperationState) => Promise<void> {
  return async ({ operationId }): Promise<void> => {
    const { client, options, tracing } = settings;
    await tracing.withSpan(`${clientName}.beginAnalyzeBatch`, options, async (finalOptions) =>
      throwError(
        getRawResponse(
          (paramOptions) => client.analyzeText.cancelJob(operationId, paramOptions),
          finalOptions
        )
      )
    );
  };
}
