// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import AbortController from "node-abort-controller";
import fetch, { RequestInit, Response } from "node-fetch";
import { trimSlashes } from "../common";
import { Constants } from "../common/constants";
import { logger } from "../common/logger";
import { executePlugins, PluginOn } from "../plugins/Plugin";
import * as RetryUtility from "../retry/retryUtility";
import { defaultHttpAgent, defaultHttpsAgent } from "./defaultAgent";
import { ErrorResponse } from "./ErrorResponse";
import { bodyFromData } from "./request";
import { RequestContext } from "./RequestContext";
import { Response as CosmosResponse } from "./Response";
import { TimeoutError } from "./TimeoutError";

/** @hidden */
const log = logger("RequestHandler");

async function executeRequest(requestContext: RequestContext) {
  return executePlugins(requestContext, httpRequest, PluginOn.request);
}

/**
 * @ignore
 * @param requestContext
 */
async function httpRequest(requestContext: RequestContext) {
  const controller = new AbortController();
  const signal = controller.signal;

  // Wrap users passed abort events and call our own internal abort()
  const userSignal = requestContext.options && requestContext.options.abortSignal;
  if (userSignal) {
    if (userSignal) {
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

  let response: Response;

  if (requestContext.body) {
    requestContext.body = bodyFromData(requestContext.body);
  }

  try {
    response = await fetch(trimSlashes(requestContext.endpoint) + requestContext.path, {
      method: requestContext.method,
      headers: requestContext.headers as any,
      agent: (parsedUrl: URL) => {
        if (requestContext.requestAgent) {
          return requestContext.requestAgent;
        }
        return parsedUrl.protocol === "http" ? defaultHttpAgent : defaultHttpsAgent;
      },
      signal,
      body: requestContext.body
    } as RequestInit);
  } catch (error) {
    if (error.name === "AbortError") {
      // If the user passed signal caused the abort, cancel the timeout and rethrow the error
      if (userSignal && userSignal.aborted === true) {
        clearTimeout(timeout);
        throw error;
      }
      // If the user didn't cancel, it must be an abort we called due to timeout
      throw new TimeoutError();
    }
    throw error;
  }

  clearTimeout(timeout);

  const result = response.status === 204 || response.status === 304 ? null : await response.json();
  const headers = {} as any;
  response.headers.forEach((value: string, key: string) => {
    headers[key] = value;
  });

  const substatus = headers[Constants.HttpHeaders.SubStatus]
    ? parseInt(headers[Constants.HttpHeaders.SubStatus], 10)
    : undefined;

  if (response.status >= 400) {
    const errorResponse: ErrorResponse = new Error(result.message);

    log.warn(
      response.status +
        " " +
        requestContext.endpoint +
        " " +
        requestContext.path +
        " " +
        result.message
    );

    errorResponse.code = response.status;
    errorResponse.body = result;
    errorResponse.headers = headers;

    if (Constants.HttpHeaders.ActivityId in headers) {
      errorResponse.activityId = headers[Constants.HttpHeaders.ActivityId];
    }

    if (Constants.HttpHeaders.SubStatus in headers) {
      errorResponse.substatus = substatus;
    }

    if (Constants.HttpHeaders.RetryAfterInMs in headers) {
      errorResponse.retryAfterInMs = parseInt(headers[Constants.HttpHeaders.RetryAfterInMs], 10);
      Object.defineProperty(errorResponse, "retryAfterInMilliseconds", {
        get: () => {
          return errorResponse.retryAfterInMs;
        }
      });
    }

    throw errorResponse;
  }
  return {
    headers,
    result,
    code: response.status,
    substatus
  };
}

/**
 * @ignore
 * @param requestContext
 */
export async function request<T>(requestContext: RequestContext): Promise<CosmosResponse<T>> {
  if (requestContext.body) {
    requestContext.body = bodyFromData(requestContext.body);
    if (!requestContext.body) {
      throw new Error("parameter data must be a javascript object, string, or Buffer");
    }
  }

  return RetryUtility.execute({
    requestContext,
    executeRequest
  });
}
