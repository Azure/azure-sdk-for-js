// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpClient, HttpHeaders, WebResourceLike, HttpOperationResponse } from "@azure/core-http";

export class MockHttpClient implements HttpClient {
  constructor(private _number: string) {}

  async sendRequest(httpRequest: WebResourceLike): Promise<HttpOperationResponse> {
    return {
      status: 202,
      headers: new HttpHeaders(),
      request: httpRequest,
      parsedBody: {
        value: [
          {
            to: this._number,
            messageId: "id",
            httpStatusCode: 202,
            errorMessage: null,
            repeatabilityResult: "accepted",
            successful: true
          }
        ]
      }
    };
  }
}
