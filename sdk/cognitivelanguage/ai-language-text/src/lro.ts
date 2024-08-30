// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as Mappers from "./generated/models/mappers";
import * as Parameters from "./generated/models/parameters";
import {
  AnalyzeBatchActionUnion,
  AnalyzeTextJobStatusOptionalParams,
  AnalyzeTextJobStatusResponse,
  GeneratedClient,
  TextDocumentInput,
} from "./generated";
import {
  AnalyzeBatchOperationState,
  AnalyzeBatchResult,
  PagedAnalyzeBatchResult,
  PollerLike,
} from "./models";
import {
  FullOperationResponse,
  OperationOptions,
  OperationSpec,
  createSerializer,
} from "@azure/core-client";
import { LongRunningOperation, LroResponse, SimplePollerLike } from "@azure/core-lro";
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

function addOnResponse<TOptions extends OperationOptions>(
  options: TOptions,
  cb: (rawResponse: FullOperationResponse, response: unknown, error: unknown) => void,
): TOptions {
  return {
    ...options,
    onResponse: (rawResponse, response, error) => {
      cb(rawResponse, response, error);
      options.onResponse?.(rawResponse, response, error);
    },
  };
}

function logWarnHeader(rawResponse: FullOperationResponse) {
  const warnHeader = rawResponse.headers.get("warn-text");
  if (warnHeader) {
    warnHeader.split(";").map((x) => logger.warning(x));
  }
}

async function getRawResponse<TOptions extends OperationOptions, TResponse>(
  getResponse: (options: TOptions) => Promise<TResponse>,
  options: TOptions,
): Promise<LroResponse<TResponse>> {
  let rawResponse: FullOperationResponse;
  const flatResponse = await getResponse(
    addOnResponse(options, (response) => {
      rawResponse = response;
    }),
  );
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
            },
          ),
        finalOptions,
      ),
    ),
  );
}

/**
 * @internal
 */
function createSendPollRequest<TOptions extends OperationOptions>(settings: {
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
        opOptions: addOnResponse(options, (_, response) => {
          const castResponse = response as AnalyzeTextJobStatusResponse;
          if (castResponse.status.toLowerCase() === "partiallysucceeded") {
            castResponse.status = "succeeded";
          }
        }),
        path,
        spanStr,
        spec: jobStatusOperationSpec,
        tracing,
      }),
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
}): LongRunningOperation {
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
    async sendInitialRequest(): Promise<LroResponse<unknown>> {
      return tracing.withSpan(
        `${clientName}.beginAnalyzeBatch`,
        addOnResponse(
          {
            ...commonOptions,
            ...initialRequestOptions,
          },
          logWarnHeader,
        ),
        async (finalOptions) =>
          throwError(
            getRawResponse(
              (paramOptions) =>
                client.analyzeBatch(
                  {
                    tasks,
                    analysisInput: {
                      documents,
                    },
                    displayName: initialRequestOptions.displayName,
                  },
                  paramOptions,
                ),
              finalOptions,
            ),
          ),
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
export function getDocIDsFromState(serializedState: string): string[] {
  try {
    const { docIds } = JSON.parse(serializedState).state;
    return docIds;
  } catch (e) {
    logger.error(
      `Document IDs are not found in the LRO's state. The results may not be ordered correctly.`,
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
}): LongRunningOperation {
  const { client, options, tracing } = settings;
  return {
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
  docIds: string[];
  opOptions: AnalyzeTextJobStatusOptionalParams;
  state: { continuationToken: string };
}): (result: unknown, state: AnalyzeBatchOperationState) => PagedAnalyzeBatchResult {
  return (): PagedAnalyzeBatchResult => {
    const { client, docIds, opOptions, tracing, state } = options;
    const pageURL = state.continuationToken;
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
          page: transformAnalyzeBatchResults(docIds, flatResponse.tasks.items, flatResponse.errors),
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
export function createUpdateAnalyzeState(docIds?: string[]) {
  return (state: AnalyzeBatchOperationState, lastResponse: LroResponse): void => {
    const { createdOn, modifiedOn, id, displayName, expiresOn, tasks, lastUpdateDateTime } =
      lastResponse.flatResponse as AnalyzeTextJobStatusResponse & { lastUpdateDateTime: string };
    const mutableState = state as Writable<AnalyzeBatchOperationState> & {
      docIds?: string[];
    };
    mutableState.createdOn = createdOn;
    // FIXME: remove this mitigation when the service API is fixed
    mutableState.modifiedOn = modifiedOn ? modifiedOn : new Date(lastUpdateDateTime);
    mutableState.expiresOn = expiresOn;
    mutableState.displayName = displayName;
    mutableState.id = id;
    mutableState.actionSucceededCount = tasks.completed;
    mutableState.actionFailedCount = tasks.failed;
    mutableState.actionInProgressCount = tasks.inProgress;
    if (mutableState.docIds === undefined && docIds !== undefined) {
      mutableState.docIds = docIds;
    }
  };
}

/**
 * @internal
 */
export function createPollerWithCancellation(settings: {
  poller: SimplePollerLike<AnalyzeBatchOperationState, PagedAnalyzeBatchResult>;
  client: GeneratedClient;
  tracing: TracingClient;
  options: AnalyzeTextJobStatusOptionalParams;
  id: string;
}): PollerLike<AnalyzeBatchOperationState, PagedAnalyzeBatchResult> {
  const { client, options, poller, id, tracing } = settings;
  return {
    ...poller,
    sendCancellationRequest: async () => {
      await tracing.withSpan(`${clientName}.beginAnalyzeBatch`, options, async (finalOptions) =>
        throwError(
          getRawResponse(
            (paramOptions) => client.analyzeText.cancelJob(id, paramOptions),
            finalOptions,
          ),
        ),
      );
    },
  };
}
