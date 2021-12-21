// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpClient, HttpHeaders, WebResourceLike, HttpOperationResponse } from "@azure/core-http";

export class MockHttpClient implements HttpClient {
  constructor(private _phoneNumber: string) {}

  async sendRequest(httpRequest: WebResourceLike): Promise<HttpOperationResponse> {
    return {
      status: 202,
      headers: new HttpHeaders(),
      request: httpRequest,
      parsedBody: {
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
      },
    };
  }
}
