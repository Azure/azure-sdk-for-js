// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createPipelineRequest, HttpMethods, PipelineResponse } from "@azure/core-rest-pipeline";
import { expect } from "vitest";
import { isLiveMode, TestMode } from "../../src/utils/utils.js";
import { ServiceClient } from "@azure/core-client";
import { env } from "../../src/utils/env.js";

export const setTestMode = (mode: TestMode): TestMode => {
  env.TEST_MODE = mode;
  console.log(`==== setting TEST_MODE = ${mode} ====`);
  return mode;
};

/**
 * The test server url.
 * This server acts as the endpoint [ Works as a substitute to the actual Azure Services ]
 */
export const TEST_SERVER_URL = "http://127.0.0.1:8080";

export async function makeRequestAndVerifyResponse(
  client: ServiceClient,
  request: {
    url?: string;
    path: string;
    body?: string;
    headers?: { headerName: string; value: string }[];
    method: HttpMethods;
  },
  expectedResponse: { [key: string]: unknown } | undefined,
  expectedHeaders?: { [key: string]: string },
): Promise<PipelineResponse> {
  const req = createPipelineRequest({
    url: request.url ?? TEST_SERVER_URL + request.path,
    body: request.body,
    method: request.method,
    allowInsecureConnection: isLiveMode(),
  });
  request.headers?.forEach(({ headerName, value }) => {
    req.headers.set(headerName, value);
  });
  const response = await client.sendRequest(req);
  if (expectedResponse) {
    if (!response.bodyAsText) {
      throw new Error("Expected response.bodyAsText to be defined");
    }

    expect(JSON.parse(response.bodyAsText)).to.deep.equal(expectedResponse);
  }

  if (expectedHeaders) {
    for (const [headerName, headerValue] of Object.entries(expectedHeaders)) {
      expect(response.headers.get(headerName)).to.equal(headerValue);
    }
  }

  return response;
}
