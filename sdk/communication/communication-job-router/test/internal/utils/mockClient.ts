// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpClient, HttpHeaders, WebResourceLike, HttpOperationResponse } from "@azure/core-http";
import { RouterClient, RouterWorker } from "../../../src";
import { env } from "@azure/test-utils-recorder";

export const mockWorker: RouterWorker = {
  id: "worker-id-123",
  queueAssignments: [
    {
      queueId: "queue-id-123"
    }
  ],
  state: "active",
  loadRatio: 0.5,
  totalCapacity: 100,
  labels: {
    name: "testworker"
  },
  channelConfigurations: [
    {
      channelId: "channel-id-123",
      capacityCostPerJob: 1
    }
  ]
};

export const mockRegisterWorkerResult = mockWorker;

export const generateHttpClient = (status: number, parsedBody?: unknown): HttpClient => {
  const mockHttpClient: HttpClient = {
    async sendRequest(httpRequest: WebResourceLike): Promise<HttpOperationResponse> {
      return {
        status: status,
        headers: new HttpHeaders(),
        request: httpRequest,
        parsedBody: parsedBody
      };
    }
  };
  return mockHttpClient;
};

export const createRouterClient = (mockHttpClient: HttpClient): RouterClient => {
  return new RouterClient(env.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING, {
    httpClient: mockHttpClient
  });
};
