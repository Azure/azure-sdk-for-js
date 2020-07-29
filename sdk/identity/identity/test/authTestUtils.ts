// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import assert from "assert";
import { TokenCredentialOptions } from "../src";
import { _setDelayTestFunction } from "../src/util/delay";
import {
  HttpHeaders,
  HttpOperationResponse,
  WebResource,
  HttpClient,
  RestError
} from "@azure/core-http";

export interface MockAuthResponse {
  status: number;
  headers?: HttpHeaders;
  parsedBody?: any;
  bodyAsText?: string;
}

export interface MockAuthHttpClientOptions {
  authResponse?: MockAuthResponse | MockAuthResponse[];
  mockTimeout?: boolean;
}

export class MockAuthHttpClient implements HttpClient {
  private authResponses: MockAuthResponse[] = [];
  private currentResponse: number = 0;
  private mockTimeout: boolean;

  public tokenCredentialOptions: TokenCredentialOptions;
  public requests: WebResource[] = [];

  constructor(options?: MockAuthHttpClientOptions) {
    options = options || {};

    if (Array.isArray(options.authResponse)) {
      if (options.authResponse.length === 0) {
        throw new Error("authResponse array must have at least one item");
      }
      this.authResponses = options.authResponse;
    } else {
      this.authResponses = [
        options.authResponse || {
          status: 200,
          headers: new HttpHeaders(),
          parsedBody: {
            access_token: "token",
            expires_in: 120
          }
        }
      ];
    }

    this.mockTimeout = options.mockTimeout !== undefined ? options.mockTimeout : false;

    this.tokenCredentialOptions = {
      authorityHost: "https://authority",
      httpClient: this,
      retryOptions: {
        maxRetries: 0
      }
    };
  }

  async sendRequest(httpRequest: WebResource): Promise<HttpOperationResponse> {
    this.requests.push(httpRequest);

    if (this.mockTimeout) {
      throw new RestError("Request timed out", RestError.REQUEST_SEND_ERROR);
    }

    if (this.requests.length > this.authResponses.length) {
      throw new Error("The number of requests has exceeded the number of authResponses");
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

export function assertClientUsernamePassword(
  authRequest: WebResource,
  expectedTenantId: string,
  expectedClientId: string,
  expectedUsername: string,
  expectedPassword: string
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
      authRequest.body.indexOf(`username=${expectedUsername}`) > -1,
      true,
      "Request body doesn't contain expected username"
    );
    assert.strictEqual(
      authRequest.body.indexOf(`password=${expectedPassword}`) > -1,
      true,
      "Request body doesn't contain expected password"
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
    assert.ok(expected(error), message || "The error didn't pass the assertion predicate.");
  }
}

export function setDelayInstantlyCompletes(): void {
  _setDelayTestFunction(() => Promise.resolve());
}

export interface DelayInfo {
  resolve: () => void;
  reject: (e: Error) => void;
  promise: Promise<void>;
  timeout: number;
}

export class DelayController {
  private _waitPromise?: Promise<DelayInfo>;
  private _resolve?: (info: DelayInfo) => void;
  private _pendingRequests: DelayInfo[] = [];

  private removeDelayInfo(info: DelayInfo): void {
    const index = this._pendingRequests.indexOf(info);
    if (index >= 0) {
      this._pendingRequests.splice(index, 1);
    }
  }

  delayRequested(timeout: number): Promise<void> {
    let resolveFunc: () => void;
    let rejectFunc: (e: Error) => void;
    const promise = new Promise<void>((resolve, reject) => {
      resolveFunc = resolve;
      rejectFunc = reject;
    });
    const info: DelayInfo = {
      resolve: resolveFunc!,
      reject: rejectFunc!,
      promise,
      timeout
    };
    this._pendingRequests.push(info);

    const removeThis = (): void => {
      this.removeDelayInfo(info);
    };

    promise.then(removeThis).catch(removeThis);

    if (this._resolve) {
      this._resolve(info);
      this._resolve = undefined;
      this._waitPromise = undefined;
    }

    return promise;
  }

  getPendingRequests(): DelayInfo[] {
    return this._pendingRequests;
  }

  waitForDelay(): Promise<DelayInfo> {
    if (!this._waitPromise) {
      this._waitPromise = new Promise<DelayInfo>((resolve) => {
        this._resolve = resolve;
      });
    }
    return this._waitPromise;
  }
}

export function createDelayController(): DelayController {
  const controller = new DelayController();
  _setDelayTestFunction((t) => {
    return controller.delayRequested(t);
  });
  return controller;
}

export function restoreDelayBehavior(): void {
  _setDelayTestFunction();
}
