// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createHttpHeaders,
  HttpClient,
  HttpMethods,
  PipelineRequest,
  PipelineResponse,
  RestError
} from "@azure/core-rest-pipeline";
import { LroEngine, PollerLike, PollOperationState } from "../../src";
import {
  LroResourceLocationConfig,
  LroBody,
  LroResponse,
  RawResponse
} from "../../src/lroEngine/models";
import { CoreRestPipelineLro } from "./coreRestPipelineLro";
import { paramRoutes } from "./router/paramRoutes";
import { routes, routesTable } from "./router/routesTable";
import { applyScenarios } from "./router/utils";

/**
 * Re-implementation of the lro routes in Autorest test server located in https://github.com/Azure/autorest.testserver/blob/main/legacy/routes/lros.js
 */

const lroClient: HttpClient = {
  async sendRequest(request: PipelineRequest): Promise<PipelineResponse> {
    const reqPath = request.url;
    const reqMethod = request.method;
    if (routesTable.has(reqPath) === true) {
      const route = routesTable.get(reqPath)!;
      if (route.method === reqMethod) {
        return route.process(request);
      } else {
        for (const { method, path, process } of routes) {
          if (method === reqMethod && path === reqPath) {
            return process(request);
          }
        }
      }
    }
    const response = applyScenarios(request, paramRoutes);
    if (response) {
      return response;
    }
    throw new RestError(`Route for ${reqMethod} request to ${reqPath} was not found`, {
      statusCode: 404
    });
  }
};

export type Response = LroBody & { statusCode: number };

async function runRouter(request: PipelineRequest): Promise<LroResponse<Response>> {
  const response = await lroClient.sendRequest(request);
  const parsedBody: LroBody = response.bodyAsText
    ? JSON.parse(response.bodyAsText)
    : response.bodyAsText;
  const headers = response.headers.toJSON();
  return {
    flatResponse: { ...parsedBody, ...headers, statusCode: response.status },
    rawResponse: {
      headers: headers,
      statusCode: response.status,
      body: parsedBody
    }
  };
}

export function mockedPoller<TState>(
  method: HttpMethods,
  url: string,
  lroResourceLocationConfig?: LroResourceLocationConfig,
  processResult?: (result: unknown, state: TState) => Response,
  updateState?: (state: TState, lastResponse: RawResponse) => void
): PollerLike<PollOperationState<Response>, Response> {
  const lro = new CoreRestPipelineLro(runRouter, {
    method: method,
    url: url,
    headers: createHttpHeaders(),
    requestId: "",
    timeout: 0,
    withCredentials: false
  });
  return new LroEngine<Response, TState>(lro, {
    intervalInMs: 0,
    lroResourceLocationConfig: lroResourceLocationConfig,
    processResult: processResult,
    updateState: updateState
  });
}

export async function runMockedLro(
  method: HttpMethods,
  url: string,
  onProgress?: (state: PollOperationState<Response>) => void,
  lroResourceLocationConfig?: LroResourceLocationConfig
): Promise<Response> {
  const poller = mockedPoller(method, url, lroResourceLocationConfig);
  if (onProgress !== undefined) {
    poller.onProgress(onProgress);
  }
  return poller.pollUntilDone();
}
