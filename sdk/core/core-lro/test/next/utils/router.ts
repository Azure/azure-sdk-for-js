// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  HttpClient,
  HttpMethods,
  PipelineRequest,
  createHttpHeaders,
} from "@azure/core-rest-pipeline";
import { ImplementationName, Result } from "./models";
import { PollerLike, OperationResponse, createHttpPoller } from "../../../src/next";
import { ResourceLocationConfig, RawResponse, ResponseBody } from "../../../src/next/http/models";
import { createCoreRestPipelineLro } from "./coreRestPipelineLro";
import { createClient, toLroProcessors } from "../../utils/router";
import { LroResponseSpec, State } from "../../utils/utils";

/**
 * Dummy value for the path of the initial request
 */
const initialPath = "path";

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
    implName = "createPollerSync",
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
    case "createPollerSync": {
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
    implName = "createPollerSync",
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
    processResult?: (result: unknown, state: TState) => Result;
    updateState?: (state: TState, lastResponse: RawResponse) => void;
  }): Promise<Result> =>
    runLro({ ...settings, ...variables });
