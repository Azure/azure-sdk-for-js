// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as sinon from "sinon";
import * as https from "https";
import * as http from "http";
import { ClientRequest } from "http";
import { PassThrough } from "stream";
import { createHttpHeaders, RawHttpHeaders } from "@azure/core-rest-pipeline";
import { setLogLevel, AzureLogger, getLogLevel, AzureLogLevel } from "@azure/logger";
import { getError } from "./authTestUtils";
import { IdentityTestContext, SendCredentialRequests, TestResponse } from "./httpRequestsTypes";

/**
 * @internal
 */
export class FakeRequest extends PassThrough {
  public finished?: boolean;
  public abort(): void {
    this.finished = true;
  }
}

/**
 * @internal
 */
export function createResponse(
  statusCode: number,
  body: Record<string, string | string[] | boolean | number> = {},
  headers: RawHttpHeaders = {}
): TestResponse {
  return {
    statusCode,
    body: JSON.stringify(body),
    headers
  };
}

/**
 * @internal
 */
export function createRequest(): ClientRequest {
  const request = new FakeRequest();
  request.finished = false;
  return (request as unknown) as ClientRequest;
}

/**
 * @internal
 */
function responseToPassThrough(response: TestResponse): PassThrough {
  const passThroughResponse = new PassThrough();
  (passThroughResponse as any).statusCode = response.statusCode;
  if (response.headers) {
    (passThroughResponse as any).headers = createHttpHeaders({
      ...response.headers
    });
  }
  passThroughResponse.write(response.body);
  passThroughResponse.end();
  return passThroughResponse;
}

/**
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
    AzureLogger.log = (args) => {
      logMessages.push(args);
    };
  }

  /**
   * Wraps the outgoing request in a mocked environment, then returns the result of the request.
   */
  async function sendIndividualRequest<T>(
    sendPromise: () => Promise<T | null>,
    response: TestResponse
  ): Promise<T | null> {
    const stubbedHttpsRequest = sandbox.stub(https, "request");

    stubbedHttpsRequest.returns(createRequest());
    const promise = sendPromise();

    stubbedHttpsRequest.yield(responseToPassThrough(response));
    await clock.runAllAsync();
    return promise;
  }

  /**
   * Wraps the outgoing request in a mocked environment, then returns the error that results from the request.
   */
  async function sendIndividualRequestAndGetError<T>(
    sendPromise: () => Promise<T | null>,
    response: TestResponse
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
    secureResponses = []
  }) => {
    const stubbedHttpRequest = sandbox.stub(http, "request");
    const stubbedHttpsRequest = sandbox.stub(https, "request");
    const insecureSpies: sinon.SinonSpy[] = [];
    const secureSpies: sinon.SinonSpy[] = [];

    insecureResponses.forEach(({ response, error }, index) => {
      if (error) {
        stubbedHttpRequest.throws(error);
      } else if (response) {
        const request = createRequest();
        insecureSpies.push(sandbox.spy(request, "write"));
        stubbedHttpRequest.onCall(index).returns(request);
        stubbedHttpRequest.onCall(index).yields(responseToPassThrough(response));
      } else {
        throw new Error(
          "Bad fake response structure. Expected either an `error` or a `response` property."
        );
      }
    });

    secureResponses.forEach(({ response, error }, index) => {
      if (error) {
        stubbedHttpsRequest.throws(error);
      } else if (response) {
        const request = createRequest();
        secureSpies.push(sandbox.spy(request, "write"));
        stubbedHttpsRequest.onCall(index).returns(request);
        stubbedHttpsRequest.onCall(index).yields(responseToPassThrough(response));
      } else {
        throw new Error(
          "Bad fake response structure. Expected either an `error` or a `response` property."
        );
      }
    });

    const promise = credential.getToken(scopes, getTokenOptions);

    await clock.runAllAsync();

    return {
      result: await promise,
      requests: [
        ...(stubbedHttpRequest.args as any).reduce((accumulator: any, args: any, index: number) => {
          const requestOptions = args[0] as http.RequestOptions;
          return [
            ...accumulator,
            {
              url: `https://${requestOptions.hostname}/${requestOptions.path}`,
              body: insecureSpies[index - 1].args[0][0],
              method: requestOptions.method,
              headers: requestOptions.headers
            }
          ];
        }, [])
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
