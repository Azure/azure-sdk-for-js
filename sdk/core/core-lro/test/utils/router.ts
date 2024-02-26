// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  HttpClient,
  HttpMethods,
  PipelineRequest,
  PipelineResponse,
  RestError,
  createHttpHeaders,
} from "@azure/core-rest-pipeline";
import {
  ImplementationName,
  LroResponseSpec,
  Result,
  RouteProcessor,
  State,
  createProcessor,
  generate,
} from "./utils.js";
import { PollerLike, createHttpPoller } from "../../src/index.js";
import {
  OperationResponse,
  RawResponse,
  ResourceLocationConfig,
  ResponseBody,
} from "../../src/http/models.js";
import { AbortError } from "@azure/abort-controller";
import { createCoreRestPipelineLro } from "./coreRestPipelineLro.js";
import { getYieldedValue } from "../getYieldedValue.js";

/**
 * Dummy value for the path of the initial request
 */
const initialPath = "path";

/**
 * This helper creates an array of route processors where each processor is represented
 * as a generator. This generator representation is needed to handle a sequence of GET
 * requests to the same route. In particular, the first GET request may get
 * a response indicating that the LRO is still in progress but a subsequent
 * GET request may get a response indicating the LRO is in a terminal state.
 */
export function toLroProcessors(responses: LroResponseSpec[]): RouteProcessor[] {
  const routeCountMap = new Map<
    string,
    {
      method: HttpMethods;
      path: string;
      responseProcessors: ((req: PipelineRequest) => PipelineResponse)[];
    }
  >();
  for (const response of responses) {
    const { method, path = initialPath, status, body, headers } = response;
    const key = createRouteKey({ method, path });
    const routeProcessor = routeCountMap.get(key);
    if (routeProcessor !== undefined) {
      routeProcessor.responseProcessors.push(createProcessor({ status, body, headers }));
    } else {
      routeCountMap.set(key, {
        method,
        path,
        responseProcessors: [createProcessor({ status, body, headers })],
      });
    }
  }
  return [...routeCountMap.values()].map(({ responseProcessors, ...rest }) => ({
    process: generate(...responseProcessors),
    ...rest,
  }));
}

function createRouteKey({ method, path }: { path: string; method: string }): string {
  return method + ":" + path;
}
export function createClient(inputs: {
  routes: RouteProcessor[];
  throwOnNon2xxResponse?: boolean;
}): HttpClient {
  const { routes, throwOnNon2xxResponse = true } = inputs;
  const routesTable = new Map(routes.map((route) => [createRouteKey(route), route]));
  return {
    async sendRequest(request: PipelineRequest): Promise<PipelineResponse> {
      if (request.abortSignal?.aborted) {
        throw new AbortError("The operation was aborted.");
      }
      const path = request.url;
      const method = request.method;
      const route = routesTable.get(createRouteKey({ method, path }));
      if (route !== undefined) {
        const response = getYieldedValue(route.process.next())(request);
        if (response.status >= 400 && throwOnNon2xxResponse) {
          throw new RestError(
            `Received unexpected HTTP status code ${response.status} while polling. This may indicate a server issue.`,
            { statusCode: response.status },
          );
        }
        return response;
      }
      const message = `Route for ${method} request to ${path} was not found`;
      if (throwOnNon2xxResponse) {
        throw new RestError(message, {
          statusCode: 404,
        });
      }
      return {
        bodyAsText: JSON.stringify({ message }),
        status: 404,
        request,
        headers: createHttpHeaders(),
      };
    },
  };
}

function createSendOp(settings: {
  client: HttpClient;
}): (request: PipelineRequest) => Promise<OperationResponse<Result>> {
  const { client } = settings;
  return async function (request: PipelineRequest): Promise<OperationResponse<Result>> {
    const response = await client.sendRequest(request);
    const parsedBody: ResponseBody = response.bodyAsText
      ? JSON.parse(response.bodyAsText)
      : response.bodyAsText;
    const headers = response.headers.toJSON();
    return {
      flatResponse: { ...parsedBody, ...headers, statusCode: response.status },
      rawResponse: {
        headers: headers,
        statusCode: response.status,
        body: parsedBody,
        request,
      },
    };
  };
}

export function createTestPoller(settings: {
  routes: LroResponseSpec[];
  resourceLocationConfig?: ResourceLocationConfig;
  processResult?: (result: unknown, state: State) => Promise<Result> | Result;
  updateState?: (state: State, lastResponse: OperationResponse<Result>) => void;
  implName?: ImplementationName;
  throwOnNon2xxResponse?: boolean;
  restoreFrom?: string;
}): PollerLike<State, Result> {
  const {
    routes,
    resourceLocationConfig,
    processResult,
    updateState,
    implName = "createPoller",
    throwOnNon2xxResponse = true,
    restoreFrom = undefined,
  } = settings;
  const client = createClient({ routes: toLroProcessors(routes), throwOnNon2xxResponse });
  const { method: requestMethod, path = initialPath } = restoreFrom
    ? { method: "GET" as HttpMethods, path: "FAKE" }
    : routes[0];
  const lro = createCoreRestPipelineLro({
    sendOperationFn: createSendOp({ client }),
    request: {
      method: requestMethod,
      url: path,
      headers: createHttpHeaders(),
      requestId: "",
      timeout: 0,
      withCredentials: false,
    },
  });
  switch (implName) {
    case "createPoller": {
      return createHttpPoller(lro, {
        intervalInMs: 0,
        resourceLocationConfig: resourceLocationConfig,
        processResult,
        updateState: updateState as
          | ((state: any, lastResponse: OperationResponse<unknown>) => void)
          | undefined,
        resolveOnUnsuccessful: !throwOnNon2xxResponse,
        restoreFrom,
      });
    }
    default: {
      throw new Error("Unreachable");
    }
  }
}

async function runLro<TState>(settings: {
  routes: LroResponseSpec[];
  onProgress?: (state: TState) => void;
  resourceLocationConfig?: ResourceLocationConfig;
  processResult?: (result: unknown, state: TState) => Promise<Result> | Result;
  updateState?: (state: TState, lastResponse: RawResponse) => void;
  implName?: ImplementationName;
  throwOnNon2xxResponse?: boolean;
}): Promise<Result> {
  const {
    routes,
    onProgress,
    resourceLocationConfig,
    processResult,
    updateState,
    implName = "createPoller",
    throwOnNon2xxResponse = true,
  } = settings;
  const poller = createTestPoller({
    routes,
    resourceLocationConfig,
    processResult,
    updateState: (state, { rawResponse }) => updateState?.(state, rawResponse),
    implName,
    throwOnNon2xxResponse,
  });
  if (onProgress !== undefined) {
    poller.onProgress(onProgress);
  }
  return poller.pollUntilDone();
}

export const createRunLroWith =
  <TState>(variables: { implName: ImplementationName; throwOnNon2xxResponse?: boolean }) =>
  (settings: {
    routes: LroResponseSpec[];
    onProgress?: (state: TState) => void;
    resourceLocationConfig?: ResourceLocationConfig;
    processResult?: (result: unknown, state: TState) => Result | Promise<Result>;
    updateState?: (state: TState, lastResponse: RawResponse) => void;
  }): Promise<Result> =>
    runLro({ ...settings, ...variables });
