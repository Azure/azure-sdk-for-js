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
import { routes, routesTable } from "./router/routesTable";
import { CoreRestPipelineLro } from "./coreRestPipelineLro";
import { applyScenarios } from "./router/utils";
import { paramRoutes } from "./router/paramRoutes";

/**
 * Re-implementation of the lro routes in Autorest test server located in https://github.com/Azure/autorest.testserver/blob/main/legacy/routes/lros.js
 */

const lroClient: HttpClient = {
  async sendRequest(request: PipelineRequest): Promise<PipelineResponse> {
    const reqPath = request.url;
    const reqMethod = request.method;
    const route = routesTable.get(reqPath);
    if (route !== undefined) {
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
      statusCode: 404,
    });
  },
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
      body: parsedBody,
    },
  };
}

export function mockedPoller<TState>(settings: {
  method: HttpMethods;
  url: string;
  lroResourceLocationConfig?: LroResourceLocationConfig;
  processResult?: (result: unknown, state: TState) => Response;
  updateState?: (state: TState, lastResponse: RawResponse) => void;
  cancel?: (state: TState) => Promise<void>;
}): PollerLike<PollOperationState<Response>, Response> {
  const { method, url, lroResourceLocationConfig, processResult, updateState, cancel } = settings;
  const lro = new CoreRestPipelineLro(runRouter, {
    method: method,
    url: url,
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

export async function runMockedLro(
  method: HttpMethods,
  url: string,
  onProgress?: (state: PollOperationState<Response>) => void,
  lroResourceLocationConfig?: LroResourceLocationConfig
): Promise<Response> {
  const poller = mockedPoller({ method, url, lroResourceLocationConfig });
  if (onProgress !== undefined) {
    poller.onProgress(onProgress);
  }
  return poller.pollUntilDone();
}
