// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { randomUUID } from "crypto";
import {
  createDefaultHttpClient,
  createHttpHeaders,
  createPipelineRequest,
  PipelineResponse,
  HttpMethods,
  createPipelineFromOptions,
} from "@azure/core-rest-pipeline";
import { BackoffConstants } from "./constants";
import { reporterLogger } from "./logger";

export class HttpService {
  public async callAPI(
    method: HttpMethods,
    url: string,
    data: any | null,
    token: string,
    correlationId: string,
  ): Promise<PipelineResponse> {
    const pipeline = createPipelineFromOptions({
      loggingOptions: {
        logger: reporterLogger.info,
      },
      retryOptions: {
        maxRetries: BackoffConstants.MAX_RETRIES,
      },
    });

    const httpClient = createDefaultHttpClient();
    const request = createPipelineRequest({
      url,
      method,
      headers: createHttpHeaders({
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
        "x-ms-client-request-id": `${randomUUID()}`,
        "x-correlation-id": correlationId,
      }),
    });

    if (data) {
      request.body = data;
    }
    return pipeline.sendRequest(httpClient, request);
  }
}
