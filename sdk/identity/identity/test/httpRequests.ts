// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as sinon from "sinon";
import * as https from "https";
import * as http from "http";
import { ClientRequest, IncomingHttpHeaders, IncomingMessage } from "http";
import { PassThrough } from "stream";
import { RestError } from "@azure/core-rest-pipeline";
import { setLogLevel, AzureLogger, getLogLevel, AzureLogLevel } from "@azure/logger";
import { getError } from "./authTestUtils";
import {
  createResponse,
  IdentityTestContext,
  RawTestResponse,
  SendCredentialRequests,
  TestResponse
} from "./httpRequestsCommon";
import { AccessToken } from "../src";
import { openIdConfigurationResponse } from "./msalTestUtils";

/**
 * Helps write responses that extend the PassThrough class.
 * These are necessary to emulate the http/https module request/response wiring.
 * @internal
 */
export class PassThroughResponse extends PassThrough {
  public statusCode?: number;
  public headers?: IncomingHttpHeaders;
}

/**
 * Helps write requests that extend the PassThrough class.
 * These are necessary to emulate the http/https module request/response wiring.
 * @internal
 */
export class FakeRequest extends PassThrough {
  public finished?: boolean;
  public abort(): void {
    this.finished = true;
  }
}

/**
 * Helps creating a PassThrough request that can be manually altered by our tests.
 * This could be done inline, but in case in the future it needs further setup, it seemed safe to abstract it out.
 * @internal
 */
export function createRequest(): ClientRequest {
  const request = new FakeRequest();
  request.finished = false;
  return (request as unknown) as ClientRequest;
}

/**
 * Traduces a simple key-value response object into a response in the shape of
 * an IncomingMessage, as required by the http & https modules.
 * @internal
 */
function responseToIncomingMessage(response: TestResponse): IncomingMessage {
  const passThroughResponse = new PassThroughResponse();
  passThroughResponse.headers = {};
  passThroughResponse.statusCode = response.statusCode;
  if (response.headers) {
    passThroughResponse.headers = response.headers;
  }
  passThroughResponse.write(response.body);
  passThroughResponse.end();
  return (passThroughResponse as unknown) as IncomingMessage;
}

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
  return [createResponse(200, openIdConfigurationResponse)];
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
  logLevel
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
    AzureLogger.log = (...args) => {
      logMessages.push(args.join(" "));
    };
  }

  /**
   * Wraps the outgoing request in a mocked environment, then returns the result of the request.
   */
  async function sendIndividualRequest<T>(
    sendPromise: () => Promise<T | null>,
    { response }: { response: TestResponse }
  ): Promise<T | null> {
    const request = createRequest();
    sandbox.replace(
      https,
      "request",
      (_options: string | URL | http.RequestOptions, resolve: any) => {
        resolve(responseToIncomingMessage(response));
        return request;
      }
    );
    clock.runAllAsync();
    return sendPromise();
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
   * Wraps a credential's getToken in a mocked environment, then returns the results from the request,
   * including potentially an AccessToken, an error and the list of outgoing requests in a simplified format.
   */
  const sendCredentialRequests: SendCredentialRequests = async ({
    scopes,
    getTokenOptions,
    credential,
    insecureResponses = [],
    secureResponses = []
  }) => {
    /**
     * Helps replace the <provider>.request() method with one we can control.
     */
    const registerResponses = (
      provider: "http" | "https",
      responses: { response?: TestResponse; error?: RestError }[],
      spies: sinon.SinonSpy[]
    ): http.RequestOptions[] => {
      const providerObject = provider === "http" ? http : https;
      const totalOptions: http.RequestOptions[] = [];

      try {
        const fakeRequest = (options: string | URL | http.RequestOptions, resolve: any) => {
          totalOptions.push(options as http.RequestOptions);

          const { response, error } = responses.shift()!;
          if (error) {
            throw error;
          } else {
            resolve(responseToIncomingMessage(response!));
          }
          const request = createRequest();
          spies.push(sandbox.spy(request, "end"));
          return request;
        };
        sandbox.replace(providerObject, "request", fakeRequest);
        sandbox.replace(providerObject.Agent.prototype as any, "request", fakeRequest);
      } catch (e) {
        console.debug(
          "Failed to replace the request. This might be expected if you're running multiple sendCredentialRequests() calls."
        );
      }

      return totalOptions;
    };

    // We optimistically order the incoming responses as:
    // The first set of responses will be those that are expected to come from insecure endpoints,
    // Then all of the remaining responses will be expected to come from secure endpoints.
    //
    // Generally, there should be no insecure requests, but in practice, some authentication methods require
    // requests to go out to insecure endpoints, specially at the beginning of the authentication flow.
    // An example would be the IMDS endpoint.
    const insecureSpies: sinon.SinonSpy[] = [];
    const insecureOptions = registerResponses("http", insecureResponses, insecureSpies);

    const secureSpies: sinon.SinonSpy[] = [];
    const secureOptions = registerResponses("https", secureResponses, secureSpies);

    let result: AccessToken | null = null;
    let error: RestError | undefined;
    try {
      // In Node, due to Node 16 dropping uncaught rejections,
      // we need to make sure to trigger the promise and wait for it on the same line.
      // So loosely tell Sinon's clock to advance the time,
      // and then we trigger our main getToken request, and wait for it.
      // All the errors will be safely be caught by the try surrounding the getToken request.
      clock.runAllAsync();
      result = await credential.getToken(scopes, getTokenOptions);
    } catch (e) {
      error = e;
    }

    /**
     * Working with the http/https modules is a bit weird.
     * We use this function to extract information from the outgoing requests into a format easy to work with.
     * We have to use both the stub for the http/https <module>.request() method,
     * and the request spies we've been accumulating throughout the getToken() execution.
     */
    const extractRequests = (
      options: http.RequestOptions[],
      spies: sinon.SinonSpy[],
      protocol: "http" | "https"
    ): {
      url: string;
      body: string;
      method: string;
      headers: Record<string, string>;
    }[] =>
      spies.reduce((accumulator: any, spy: sinon.SinonSpy, index: number) => {
        if (!options[index]) {
          return accumulator;
        }
        const requestOptions = options[index];
        return [
          ...accumulator,
          {
            url: `${protocol}://${requestOptions.hostname}${requestOptions.path}`,
            body: (spy.args[0] && spy.args[0][0]) || "",
            method: requestOptions.method,
            headers: requestOptions.headers
          }
        ];
      }, []);

    return {
      result,
      error,
      requests: [
        ...extractRequests(insecureOptions, insecureSpies, "http"),
        ...extractRequests(secureOptions, secureSpies, "https")
      ]
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
    sendCredentialRequests
  };
}
