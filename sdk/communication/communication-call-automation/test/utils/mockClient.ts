// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpClient, PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { baseUri, CALL_CONNECTION_ID, generateToken } from "../utils/connectionUtils.js";
import { CallMedia } from "../../src/callMedia.js";
import { CallRecording } from "../../src/callRecording.js";

export const generateHttpClient = (status: number, parsedBody?: unknown): HttpClient => {
  const mockHttpClient: HttpClient = {
    async sendRequest(httpRequest: PipelineRequest): Promise<PipelineResponse> {
      return {
        status: status,
        headers: createHttpHeaders(),
        request: httpRequest,
        bodyAsText: JSON.stringify(parsedBody),
      };
    },
  };
  return mockHttpClient;
};

export const createMediaClient = (mockHttpClient: HttpClient): CallMedia => {
  return new CallMedia(
    CALL_CONNECTION_ID,
    baseUri,
    { key: generateToken() },
    {
      httpClient: mockHttpClient,
    },
  );
};

export const createRecordingClient = (mockHttpClient: HttpClient): CallRecording => {
  return new CallRecording(
    baseUri,
    { key: generateToken() },
    {
      httpClient: mockHttpClient,
    },
  );
};
