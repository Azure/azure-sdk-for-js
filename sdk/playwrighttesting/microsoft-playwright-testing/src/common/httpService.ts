// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { randomUUID } from "node:crypto";
import type { PipelineResponse, HttpMethods } from "@azure/core-rest-pipeline";
import {
  createDefaultHttpClient,
  createHttpHeaders,
  createPipelineRequest,
  createPipelineFromOptions,
} from "@azure/core-rest-pipeline";
import { reporterLogger } from "./logger.js";

const HTTP_CALL_TIMEOUT = 70000;

export class HttpService {
  public async callAPI(
    method: HttpMethods,
    url: string,
    data: any | null,
    token: string,
    contentType: string,
    correlationId: string,
  ): Promise<PipelineResponse> {
    const pipeline = createPipelineFromOptions({
      loggingOptions: {
        logger: reporterLogger.info,
      },
    });

    const httpClient = createDefaultHttpClient();
    const request = createPipelineRequest({
      url,
      method,
      headers: createHttpHeaders({
        "Content-Type": contentType,
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
        "x-ms-client-request-id": `${randomUUID()}`,
        "x-correlation-id": correlationId,
      }),
      timeout: HTTP_CALL_TIMEOUT,
    });

    if (data) {
      request.body = data;
    }
    return pipeline.sendRequest(httpClient, request);
  }
}
