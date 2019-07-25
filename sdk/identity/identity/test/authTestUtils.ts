// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "assert";
import { IdentityClientOptions } from "../src";
import { AuthenticationError } from "../src";
import { HttpHeaders, HttpOperationResponse, WebResource, HttpClient, delay, RestError } from "@azure/core-http";

export interface MockAuthResponse {
  status: number;
  headers?: HttpHeaders;
  parsedBody?: any;
  bodyAsText?: string;
}

export interface MockAuthHttpClientOptions {
  authResponse?: MockAuthResponse | MockAuthResponse[],
  mockTimeout?: boolean
}

export class MockAuthHttpClient implements HttpClient {
  private authResponses: MockAuthResponse[] = [];
  private currentResponse: number = 0;
  private mockTimeout: boolean;

  public identityClientOptions: IdentityClientOptions;
  public requests: WebResource[] = [];

  constructor(options?: MockAuthHttpClientOptions) {
    options = options || {};

    if (Array.isArray(options.authResponse)) {
      if (options.authResponse.length === 0) {
        throw new Error("authResponse array must have at least one item");
      }
      this.authResponses = options.authResponse
    } else {
      this.authResponses = [options.authResponse || {
        status: 200,
        headers: new HttpHeaders(),
        parsedBody: {
          access_token: "token",
          expires_in: 120
        }
      }];
    }

    this.mockTimeout =
      options.mockTimeout !== undefined
        ? options.mockTimeout
        : false;

    this.identityClientOptions = {
      authorityHost: "https://authority",
      httpClient: this,
      noRetryPolicy: true
    };
  }

  async sendRequest(httpRequest: WebResource): Promise<HttpOperationResponse> {
    this.requests.push(httpRequest);

    if (this.mockTimeout) {
      await delay(httpRequest.timeout);
      throw new RestError("Request timed out", RestError.REQUEST_SEND_ERROR);
    }

    if (this.requests.length > this.authResponses.length) {
      throw new Error("The number of requests has exceeded the number of authResponses")
    }

    const response = {
      request: httpRequest,
      headers: this.authResponses[this.currentResponse].headers || new HttpHeaders(),
      ...this.authResponses[this.currentResponse]
    };

    this.currentResponse++;
    return response;
  }
}

export function assertClientCredentials(
  authRequest: WebResource,
  expectedTenantId: string,
  expectedClientId: string,
  expectedClientSecret: string
): void {
  if (!authRequest) {
    assert.fail("No authentication request was intercepted");
  } else {
    assert.strictEqual(
      authRequest.url.startsWith(`https://authority/${expectedTenantId}`),
      true,
      "Request body doesn't contain expected tenantId"
    );
    assert.strictEqual(
      authRequest.body.indexOf(`client_id=${expectedClientId}`) > -1,
      true,
      "Request body doesn't contain expected clientId"
    );
    assert.strictEqual(
      authRequest.body.indexOf(`client_secret=${expectedClientSecret}`) > -1,
      true,
      "Request body doesn't contain expected clientSecret"
    );
  }
}

// Node's `assert.rejects` doesn't appear until 8.13.0 so we'll
// use our own simple implementation here
export async function assertRejects(
  promise: Promise<any>,
  expected: (error: any) => boolean,
  message?: string
): Promise<any> {
  try {
    await promise;
  } catch (error) {
    assert.ok(expected(error), message || "The error didn't pass the assertion predicate.")
  }
}
