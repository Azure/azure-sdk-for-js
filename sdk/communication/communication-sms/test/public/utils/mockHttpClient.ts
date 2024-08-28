// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  HttpClient,
  PipelineRequest,
  PipelineResponse,
  createHttpHeaders,
} from "@azure/core-rest-pipeline";

export class MockHttpClient implements HttpClient {
  constructor(private _phoneNumber: string) {}

  async sendRequest(httpRequest: PipelineRequest): Promise<PipelineResponse> {
    return {
      status: 202,
      headers: createHttpHeaders(),
      request: httpRequest,
      bodyAsText: JSON.stringify({
        value: [
          {
            to: this._phoneNumber,
            messageId: "id",
            httpStatusCode: 202,
            errorMessage: null,
            repeatabilityResult: "accepted",
            successful: true,
          },
        ],
      }),
    };
  }
}
