// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createPipelineRequest,
  createHttpHeaders,
  PipelineResponse,
} from "@azure/core-rest-pipeline";
import { prepareURL } from "../common";
import { Constants } from "../common/constants";
import { executePlugins, PluginOn } from "../plugins/Plugin";
import * as RetryUtility from "../retry/retryUtility";
import { defaultHttpAgent, defaultHttpsAgent } from "./defaultAgent";
import { ErrorResponse } from "./ErrorResponse";
import { bodyFromData } from "./request";
import { RequestContext } from "./RequestContext";
import { Response as CosmosResponse } from "./Response";
import { TimeoutError } from "./TimeoutError";
import { getCachedDefaultHttpClient } from "../utils/cachedClient";
import { AzureLogger, createClientLogger } from "@azure/logger";
import { DiagnosticNodeInternal, DiagnosticNodeType } from "../diagnostics/DiagnosticNodeInternal";
import { addDignosticChild } from "../utils/diagnostics";
import { getCurrentTimestampInMs } from "../utils/time";

const logger: AzureLogger = createClientLogger("RequestHandler");

async function executeRequest(
  diagnosticNode: DiagnosticNodeInternal,
  requestContext: RequestContext,
): Promise<CosmosResponse<any>> {
  return executePlugins(diagnosticNode, requestContext, httpRequest, PluginOn.request);
}

/**
 * @hidden
 */
async function httpRequest(
  requestContext: RequestContext,
  diagnosticNode: DiagnosticNodeInternal,
): Promise<{
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

  const httpsClient = requestContext.httpClient ?? getCachedDefaultHttpClient();
  const url = prepareURL(requestContext.endpoint, requestContext.path);
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

  const startTimeUTCInMs = getCurrentTimestampInMs();
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
        throw error;
      }
      // If the user didn't cancel, it must be an abort we called due to timeout
      throw new TimeoutError(
        `Timeout Error! Request took more than ${requestContext.connectionPolicy.requestTimeout} ms`,
      );
    }
    throw error;
  }

  clearTimeout(timeout);
  const result =
    response.status === 204 || response.status === 304 || response.bodyAsText === ""
      ? null
      : JSON.parse(response.bodyAsText);
  const responseHeaders = response.headers.toJSON();

  const substatus = responseHeaders[Constants.HttpHeaders.SubStatus]
    ? parseInt(responseHeaders[Constants.HttpHeaders.SubStatus], 10)
    : undefined;

  diagnosticNode.recordSuccessfulNetworkCall(
    startTimeUTCInMs,
    requestContext,
    response,
    substatus,
    url,
  );

  if (response.status >= 400) {
    const errorResponse: ErrorResponse = new ErrorResponse(result.message);
    logger.warning(
      response.status +
        " " +
        requestContext.endpoint +
        " " +
        requestContext.path +
        " " +
        result.message,
    );

    errorResponse.code = response.status;
    errorResponse.body = result;
    errorResponse.headers = responseHeaders;

    if (Constants.HttpHeaders.ActivityId in responseHeaders) {
      errorResponse.activityId = responseHeaders[Constants.HttpHeaders.ActivityId];
    }

    if (Constants.HttpHeaders.SubStatus in responseHeaders) {
      errorResponse.substatus = substatus;
    }

    if (Constants.HttpHeaders.RetryAfterInMs in responseHeaders) {
      errorResponse.retryAfterInMs = parseInt(
        responseHeaders[Constants.HttpHeaders.RetryAfterInMs],
        10,
      );
      Object.defineProperty(errorResponse, "retryAfterInMilliseconds", {
        get: () => {
          return errorResponse.retryAfterInMs;
        },
      });
    }

    throw errorResponse;
  }
  return {
    headers: responseHeaders,
    result,
    code: response.status,
    substatus,
  };
}

/**
 * @hidden
 */
async function request<T>(
  requestContext: RequestContext,
  diagnosticNode: DiagnosticNodeInternal,
): Promise<CosmosResponse<T>> {
  if (requestContext.body) {
    requestContext.body = bodyFromData(requestContext.body);
    if (!requestContext.body) {
      throw new Error("parameter data must be a javascript object, string, or Buffer");
    }
  }

  return addDignosticChild(
    async (childNode: DiagnosticNodeInternal) => {
      return RetryUtility.execute({
        diagnosticNode: childNode,
        requestContext,
        executeRequest,
      });
    },
    diagnosticNode,
    DiagnosticNodeType.REQUEST_ATTEMPTS,
  );
}

export const RequestHandler = {
  request,
};
