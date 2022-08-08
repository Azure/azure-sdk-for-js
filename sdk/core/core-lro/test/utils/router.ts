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
} from "./utils";
import { LroEngine, createPoller } from "../../src";
import {
  LroResourceLocationConfig,
  LroResponse,
  RawResponse,
  ResponseBody,
  SimplePollerLike,
} from "../../src/models";
import { AbortError } from "@azure/abort-controller";
import { createCoreRestPipelineLro } from "./coreRestPipelineLro";
import { getYieldedValue } from "@azure/test-utils";

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
function toLroProcessors(responses: LroResponseSpec[]): RouteProcessor[] {
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
function createClient(routes: RouteProcessor[]): HttpClient {
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
        if (response.status >= 400) {
          const error = new RestError(
            `Received unexpected HTTP status code ${response.status} while polling. This may indicate a server issue.`,
            { statusCode: response.status }
          );
          throw error;
        }
        return response;
      }
      throw new RestError(`Route for ${method} request to ${path} was not found`, {
        statusCode: 404,
      });
    },
  };
}

function createSendOp(settings: {
  client: HttpClient;
}): (request: PipelineRequest) => Promise<LroResponse<Result>> {
  const { client } = settings;
  return async function (request: PipelineRequest): Promise<LroResponse<Result>> {
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
      },
    };
  };
}

export function createTestPoller(settings: {
  routes: LroResponseSpec[];
  resourceLocationConfig?: LroResourceLocationConfig;
  processResult?: (result: unknown, state: State) => Result;
  updateState?: (state: State, lastResponse: RawResponse) => void;
  implName?: ImplementationName;
}): Promise<SimplePollerLike<State, Result>> {
  const {
    routes,
    resourceLocationConfig,
    processResult,
    updateState,
    implName = "createPoller",
  } = settings;
  const client = createClient(toLroProcessors(routes));
  const { method: requestMethod, path = initialPath } = routes[0];
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
      return createPoller(lro, {
        intervalInMs: 0,
        resourceLocationConfig: resourceLocationConfig,
        processResult,
        updateState,
      });
    }
    case "LroEngine": {
      return Promise.resolve(
        new LroEngine(lro, {
          intervalInMs: 0,
          lroResourceLocationConfig: resourceLocationConfig,
          processResult,
          updateState,
        })
      );
    }
    default: {
      throw new Error("Unreachable");
    }
  }
}

async function runLro<TState>(settings: {
  routes: LroResponseSpec[];
  onProgress?: (state: TState) => void;
  resourceLocationConfig?: LroResourceLocationConfig;
  processResult?: (result: unknown, state: TState) => Result;
  updateState?: (state: TState, lastResponse: RawResponse) => void;
  implName?: ImplementationName;
}): Promise<Result> {
  const {
    routes,
    onProgress,
    resourceLocationConfig,
    processResult,
    updateState,
    implName = "createPoller",
  } = settings;
  const poller = await createTestPoller({
    routes,
    resourceLocationConfig,
    processResult,
    updateState,
    implName,
  });
  if (onProgress !== undefined) {
    poller.onProgress(onProgress);
  }
  return poller.pollUntilDone();
}

export const createRunLroWithImpl =
  <TState>(implName: ImplementationName) =>
  (settings: {
    routes: LroResponseSpec[];
    onProgress?: (state: TState) => void;
    resourceLocationConfig?: LroResourceLocationConfig;
    processResult?: (result: unknown, state: TState) => Result;
    updateState?: (state: TState, lastResponse: RawResponse) => void;
  }): Promise<Result> =>
    runLro({ ...settings, implName });
