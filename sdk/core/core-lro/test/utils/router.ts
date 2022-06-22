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
  LroBody,
  LroResourceLocationConfig,
  LroResponse,
  RawResponse,
} from "../../src/lroEngine/models";
import { LroEngine, PollOperationState, PollerLike } from "../../src";
import { LroResponseSpec, RouteProcessor, createProcessor, generate } from "./utils";
import { CoreRestPipelineLro } from "./coreRestPipelineLro";
import { getYieldedValue } from "@azure/test-utils";

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
    const key = createRouteKey(response);
    const routeProcessor = routeCountMap.get(key);
    if (routeProcessor !== undefined) {
      routeProcessor.responseProcessors.push(createProcessor(response));
    } else {
      const { method, path } = response;
      routeCountMap.set(key, { method, path, responseProcessors: [createProcessor(response)] });
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
      const path = request.url;
      const method = request.method;
      const route = routesTable.get(createRouteKey({ method, path }));
      if (route !== undefined) {
        return getYieldedValue(route.process.next())(request);
      }
      throw new RestError(`Route for ${method} request to ${path} was not found`, {
        statusCode: 404,
      });
    },
  };
}

export type Response = LroBody & { statusCode: number };

function createSendOp(settings: {
  client: HttpClient;
}): (request: PipelineRequest) => Promise<LroResponse<Response>> {
  const { client } = settings;
  return async function (request: PipelineRequest): Promise<LroResponse<Response>> {
    const response = await client.sendRequest(request);
    const parsedBody: LroBody = response.bodyAsText
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

function throwIfUndefined<T>(input: T | undefined): T {
  if (!input) {
    throw new Error("input is undefined");
  }
  return input;
}

export function createPoller<TState>(settings: {
  routes: LroResponseSpec[];
  lroResourceLocationConfig?: LroResourceLocationConfig;
  processResult?: (result: unknown, state: TState) => Response;
  updateState?: (state: TState, lastResponse: RawResponse) => void;
  cancel?: (state: TState) => Promise<void>;
}): PollerLike<PollOperationState<Response>, Response> {
  const { routes, lroResourceLocationConfig, processResult, updateState, cancel } = settings;
  const client = createClient(toLroProcessors(routes));
  const { method: requestMethod, path } = routes[0];
  const lro = new CoreRestPipelineLro(createSendOp({ client }), {
    method: throwIfUndefined(requestMethod),
    url: throwIfUndefined(path),
    headers: createHttpHeaders(),
    requestId: "",
    timeout: 0,
    withCredentials: false,
  });
  return new LroEngine<Response, TState>(lro, {
    intervalInMs: 0,
    lroResourceLocationConfig,
    processResult,
    updateState,
    cancel,
  });
}

export async function runLro(settings: {
  routes: LroResponseSpec[];
  onProgress?: (state: PollOperationState<Response>) => void;
  lroResourceLocationConfig?: LroResourceLocationConfig;
}): Promise<Response> {
  const { routes, onProgress, lroResourceLocationConfig } = settings;
  const poller = createPoller({
    routes,
    lroResourceLocationConfig,
  });
  if (onProgress !== undefined) {
    poller.onProgress(onProgress);
  }
  return poller.pollUntilDone();
}
