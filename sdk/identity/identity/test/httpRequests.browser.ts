// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as sinon from "sinon";
import { setLogLevel, AzureLogger, getLogLevel, AzureLogLevel } from "@azure/logger";
import { RestError } from "@azure/core-rest-pipeline";
import { AccessToken } from "@azure/core-auth";
import { getError } from "./authTestUtils";
import {
  IdentityTestContext,
  SendCredentialRequests,
  RawTestResponse,
  TestResponse,
} from "./httpRequestsCommon";

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
 * Sets up the environment necessary to do unit testing to Identity credentials.
 * We leverage Sinon to mock the internals of the http and the https modules (in Node, and the SinonFakeXMLHttpRequest in the browser).
 * Once the environment is set, we return a set of utility functions.
 * Some of these functions can be used to test promises that send individual requests,
 * others allow testing or full-on credential requests
 * that may expect more than one response (or error) from more than one endpoint.
 * @internal
 */
export async function prepareIdentityTests({
  replaceLogger,
  logLevel,
}: {
  replaceLogger?: boolean;
  logLevel?: AzureLogLevel;
}): Promise<IdentityTestContext> {
  const sandbox = sinon.createSandbox();
  const clock = sandbox.useFakeTimers();
  const oldLogLevel = getLogLevel();
  const oldLogger = AzureLogger.log;
  const logMessages: string[] = [];

  if (logLevel) {
    setLogLevel(logLevel);
  }

  if (replaceLogger) {
    AzureLogger.log = (args) => {
      logMessages.push(args);
    };
  }

  /**
   * Browser specific code.
   * Sets up a fake server that will be used to answer any outgoing request.
   */
  const server = sandbox.useFakeServer();
  const fetch = sandbox.stub(self, "fetch");
  const requests: TrackedRequest[] = [];
  const responses: RawTestResponse[] = [];

  type TrackedRequest = {
    url: string;
    body: string;
    method: string;
    headers: Record<string, string>;
  };

  function trackRequest(url: RequestInfo, request?: RequestInit) {
    const headers = new Headers(request?.headers);
    const rawHeaders: Record<string, string> = {};

    headers.forEach((key, value) => {
      rawHeaders[key] = value;
    });

    requests.push({
      url: url.toString(),
      body: request?.body?.toString() ?? "",
      method: request?.method ?? "GET",
      headers: rawHeaders,
    });
  }

  /**
   * Wraps a credential's getToken in a mocked environment, then returns the results from the request,
   * including potentially an AccessToken, an error and the list of outgoing requests in a simplified format.
   */
  async function sendIndividualRequest<T>(
    sendPromise: () => Promise<T | null>,
    { response }: { response: TestResponse }
  ): Promise<T | null> {
    /**
     * Both keeps track of the outgoing requests,
     * and ensures each request answers with each received response, in order.
     */
    fetch.callsFake(async (url, request) => {
      trackRequest(url, request);

      return new Response(response.body, {
        headers: response.headers,
        status: response.statusCode,
      });
    });
    const promise = sendPromise();
    server.respond();
    await clock.runAllAsync();
    return promise;
  }

  /**
   * Wraps the outgoing request in a mocked environment, then returns the error that results from the request.
   */
  async function sendIndividualRequestAndGetError<T>(
    sendPromise: () => Promise<T | null>,
    response: { response: TestResponse }
  ): Promise<Error> {
    return getError(sendIndividualRequest(sendPromise, response));
  }

  /**
   * Wraps a credential's getToken in a mocked environment, then returns the results from the request.
   */
  const sendCredentialRequests: SendCredentialRequests = async ({
    scopes,
    getTokenOptions,
    credential,
    insecureResponses = [],
    secureResponses = [],
  }) => {
    responses.push(...[...insecureResponses, ...secureResponses]);
    fetch.callsFake(async (url, request) => {
      trackRequest(url, request);
      if (!responses.length) {
        throw new Error("No responses to send");
      }
      const { response, error } = responses.shift()!;
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
      // By this point we've queued up responses to go out on our Sinon server.
      // We need the promises to begin triggering, so the server has something to respond to,
      // and only then we can wait for all of the async processes to finish.
      const promise = credential.getToken(scopes, getTokenOptions);
      server.respond();
      await clock.runAllAsync();
      result = await promise;
    } catch (e) {
      error = e;
    }

    return {
      result,
      error,
      requests,
    };
  };

  return {
    clock,
    logMessages,
    oldLogLevel,
    sandbox,
    oldLogger,
    async restore() {
      sandbox.restore();
      AzureLogger.log = oldLogger;
      setLogLevel(oldLogLevel);
    },
    sendIndividualRequest,
    sendIndividualRequestAndGetError,
    sendCredentialRequests,
  };
}
