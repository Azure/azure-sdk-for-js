// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { AbortController } from "node-abort-controller";
import {
  createPipelineRequest,
  createHttpHeaders,
  PipelineResponse,
} from "@azure/core-rest-pipeline";
import { trimSlashes } from "../common";
import { Constants } from "../common/constants";
import { executePlugins, PluginOn } from "../plugins/Plugin";
import * as RetryUtility from "../retry/retryUtility";
import { defaultHttpAgent, defaultHttpsAgent } from "./defaultAgent";
import { bodyFromData } from "./request";
import { RequestContext } from "./RequestContext";
import { Response as CosmosResponse } from "./Response";
import { TimeoutError } from "./TimeoutError";
import { getCachedDefaultHttpClient } from "../utils/cachedClient";
import { AzureLogger, createClientLogger } from "@azure/logger";
import { CosmosException } from "../diagnostics/CosmosException";
import { setDiagnostics } from "../diagnostics/Diagnostics";

const logger: AzureLogger = createClientLogger("RequestHandler");

async function executeRequest(requestContext: RequestContext): Promise<CosmosResponse<any>> {
  return executePlugins(requestContext, httpRequest, PluginOn.request);
}

/**
 * @hidden
 */
async function httpRequest(requestContext: RequestContext): Promise<{
  headers: any;
  result: any;
  code: number;
  substatus: number;
}> {
  const controller = new AbortController();
  const signal = controller.signal;

  // Wrap users passed abort events and call our own internal abort()
  const userSignal = requestContext.options && requestContext.options.abortSignal;
  if (userSignal) {
    if (userSignal.aborted) {
      controller.abort();
    } else {
      userSignal.addEventListener("abort", () => {
        controller.abort();
      });
    }
  }

  const timeout = setTimeout(() => {
    controller.abort();
  }, requestContext.connectionPolicy.requestTimeout);

  let response: PipelineResponse;

  if (requestContext.body) {
    requestContext.body = bodyFromData(requestContext.body);
  }

  const httpsClient = getCachedDefaultHttpClient();
  const url = trimSlashes(requestContext.endpoint) + requestContext.path;
  const reqHeaders = createHttpHeaders(requestContext.headers as any);
  const pipelineRequest = createPipelineRequest({
    url,
    headers: reqHeaders,
    method: requestContext.method,
    abortSignal: signal,
    body: requestContext.body,
  });
  if (requestContext.requestAgent) {
    pipelineRequest.agent = requestContext.requestAgent;
  } else {
    const parsedUrl = new URL(url);
    pipelineRequest.agent = parsedUrl.protocol === "http" ? defaultHttpAgent : defaultHttpsAgent;
  }

  try {
    if (requestContext.pipeline) {
      response = await requestContext.pipeline.sendRequest(httpsClient, pipelineRequest);
    } else {
      response = await httpsClient.sendRequest(pipelineRequest);
    }
  } catch (error: any) {
    if (error.name === "AbortError") {
      // If the user passed signal caused the abort, cancel the timeout and rethrow the error
      if (userSignal && userSignal.aborted === true) {
        clearTimeout(timeout);
        setDiagnostics(`${error}`);
        throw error;
      }
      // If the user didn't cancel, it must be an abort we called due to timeout
      throw new CosmosException(new TimeoutError());
    }
    setDiagnostics(`${error}`);
    throw error;
  }

  clearTimeout(timeout);

  const result =
    response.status === 204 || response.status === 304 ? null : JSON.parse(response.bodyAsText);
  const headers = response.headers.toJSON();

  const substatus = headers[Constants.HttpHeaders.SubStatus]
    ? parseInt(headers[Constants.HttpHeaders.SubStatus], 10)
    : undefined;

  if (response.status >= 400) {
    const error = new CosmosException(result.message);
    logger.warning(error.getDiagnostics());
    error.response = response;

    error.response.code = response.status;
    error.response.body = result;
    error.response.headers = headers;

    if (Constants.HttpHeaders.ActivityId in headers) {
      error.response.activityId = headers[Constants.HttpHeaders.ActivityId];
    }

    if (Constants.HttpHeaders.SubStatus in headers) {
      error.response.substatus = substatus;
    }

    if (Constants.HttpHeaders.RetryAfterInMs in headers) {
      error.response.retryAfterInMs = parseInt(headers[Constants.HttpHeaders.RetryAfterInMs], 10);
      Object.defineProperty(error, "retryAfterInMilliseconds", {
        get: () => {
          return error.response.retryAfterInMs;
        },
      });
    }

    throw error;
  }
  return {
    headers,
    result,
    code: response.status,
    substatus,
  };
}

/**
 * @hidden
 */
export async function request<T>(requestContext: RequestContext): Promise<CosmosResponse<T>> {
  if (requestContext.body) {
    requestContext.body = bodyFromData(requestContext.body);
    if (!requestContext.body) {
      throw new CosmosException("parameter data must be a javascript object, string, or Buffer");
    }
  }

  return RetryUtility.execute({
    requestContext,
    executeRequest,
  });
}
