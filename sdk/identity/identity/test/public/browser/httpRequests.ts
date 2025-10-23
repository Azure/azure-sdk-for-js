// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import type { AzureLogLevel } from "@azure/logger";
import { AzureLogger, getLogLevel, setLogLevel } from "@azure/logger";
import type {
  IdentityTestContextInterface,
  RawTestResponse,
  TestResponse,
} from "../../httpRequestsCommon.js";
import type { RestError } from "@azure/core-rest-pipeline";
import { getError } from "../../authTestUtils.js";
import { type MockInstance, vi } from "vitest";

/**
 * Helps specify a different number of responses for Node and for the browser.
 * In Node, this method will return an array that will have a response
 * for the MSAL's initial discovery request.
 *
 * In the browser, it will return an array with no responses.
 * This is due to the fact that the only browser credential using MSAL
 * is the InteractiveBrowserCredential, which we won't test this way (it requires user interaction).
 *
 * The other credentials that we technically support in the browser are meant to work without CORS verifications.
 * These credentials are supported both as a way to comply with v1 credentials, and to make it easier for us to test
 * our clients in the browser.
 * @internal
 */
export function prepareMSALResponses(): RawTestResponse[] {
  return [];
}

/**
 * Keep track of requested resources.
 * @internal
 */
export type TrackedRequest = {
  url: string;
  body: string;
  method: string;
  headers: Record<string, string>;
};

/**
 * Sets up the environment necessary to do unit testing to Identity credentials.
 * Once the environment is set, we return a set of utility functions.
 * Some of these functions can be used to test promises that send individual requests,
 * others allow testing or full-on credential requests
 * that may expect more than one response (or error) from more than one endpoint.
 * @internal
 */
export class IdentityTestContext implements IdentityTestContextInterface {
  public oldLogLevel: AzureLogLevel | undefined;
  public oldLogger: any;
  public logMessages: string[];
  public fetch: MockInstance;
  public requests: TrackedRequest[];
  public responses: RawTestResponse[];

  constructor({ replaceLogger, logLevel }: { replaceLogger?: boolean; logLevel?: AzureLogLevel }) {
    vi.useFakeTimers();
    this.oldLogLevel = getLogLevel();
    this.oldLogger = AzureLogger.log;
    this.logMessages = [];

    /**
     * Browser specific code.
     * Sets up a fake fetch implementation that will be used to answer any outgoing request.
     */
    this.fetch = vi.spyOn(self, "fetch");
    this.requests = [];
    this.responses = [];

    if (logLevel) {
      setLogLevel(logLevel);
    }

    if (replaceLogger) {
      AzureLogger.log = (args) => {
        this.logMessages.push(args);
      };
    }
  }

  private _trackRequest(url: RequestInfo, request?: RequestInit): void {
    const headers = new Headers(request?.headers);
    const rawHeaders: Record<string, string> = {};

    headers.forEach((key, value) => {
      rawHeaders[key] = value;
    });

    this.requests.push({
      url: url.toString(),
      body: request?.body?.toString() ?? "",
      method: request?.method ?? "GET",
      headers: rawHeaders,
    });
  }

  async restore(): Promise<void> {
    vi.useRealTimers();
    vi.restoreAllMocks();
    AzureLogger.log = this.oldLogger;
    setLogLevel(this.oldLogLevel);
  }

  /**
   * Wraps a credential's getToken in a mocked environment, then returns the results from the request,
   * including potentially an AccessToken, an error and the list of outgoing requests in a simplified format.
   */
  async sendIndividualRequest<T>(
    sendPromise: () => Promise<T | null>,
    { response }: { response: TestResponse },
  ): Promise<T | null> {
    /**
     * Both keeps track of the outgoing requests,
     * and ensures each request answers with each received response, in order.
     */
    this.fetch.mockImplementation(async (url, request) => {
      this._trackRequest(url, request);

      return new Response(response.body, {
        headers: response.headers,
        status: response.statusCode,
      });
    });
    const promise = sendPromise();
    await vi.runAllTimersAsync();
    return promise;
  }

  /**
   * Wraps the outgoing request in a mocked environment, then returns the error that results from the request.
   */
  async sendIndividualRequestAndGetError<T>(
    sendPromise: () => Promise<T | null>,
    response: { response: TestResponse },
  ): Promise<Error> {
    return getError(this.sendIndividualRequest(sendPromise, response));
  }

  /**
   * Wraps a credential's getToken in a mocked environment, then returns the results from the request.
   */
  async sendCredentialRequests({
    scopes,
    getTokenOptions,
    credential,
    insecureResponses = [],
    secureResponses = [],
  }: {
    scopes: string | string[];
    getTokenOptions?: GetTokenOptions;
    credential: TokenCredential;
    insecureResponses?: RawTestResponse[];
    secureResponses?: RawTestResponse[];
  }): Promise<{
    result: AccessToken | null;
    error?: RestError;
    requests: {
      url: string;
      body: string;
      method: string;
      headers: Record<string, string>;
    }[];
  }> {
    this.responses.push(...[...insecureResponses, ...secureResponses]);
    this.fetch.mockImplementation(async (url, request) => {
      this._trackRequest(url, request);
      if (!this.responses.length) {
        throw new Error("No responses to send");
      }
      const { response, error } = this.responses.shift()!;
      if (response) {
        return new Response(response.body, {
          headers: response.headers,
          status: response.statusCode,
        });
      } else if (error) {
        return new Response(error.message, {
          headers: {},
          status: error.statusCode,
        });
      } else {
        throw new Error("No response or error to send");
      }
    });

    let result: AccessToken | null = null;
    let error: RestError | undefined;
    try {
      // This only makes sense in the browser:
      // By this point we've queued up responses to go out.
      // We need the promises to begin triggering, so the server has something to respond to,
      // and only then we can wait for all of the async processes to finish.
      const promise = credential.getToken(scopes, getTokenOptions);
      await vi.runAllTimersAsync();
      result = await promise;
    } catch (e: any) {
      error = e;
    }

    return {
      result,
      error,
      requests: this.requests,
    };
  }
}
