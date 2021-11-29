// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpClient, HttpHeaders, WebResourceLike, HttpOperationResponse } from "@azure/core-http";
import { RouterWorker } from "../../../src";

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
