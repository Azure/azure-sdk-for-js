// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  HttpClient,
  PipelineRequest,
  PipelineResponse,
  createHttpHeaders,
} from "@azure/core-rest-pipeline";
import { baseUri, CALL_CONNECTION_ID, generateToken } from "../utils/connectionUtils";
import { CallMedia } from "../../src/callMedia";
import { CallRecording } from "../../src/callRecording";
import { CallAutomationEventProcessor } from "../../src/eventprocessor/callAutomationEventProcessor";

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
    new CallAutomationEventProcessor(),
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
