// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as sinon from "sinon";
import * as https from "https";
import * as http from "http";
import { ClientRequest, IncomingHttpHeaders, IncomingMessage } from "http";
import { PassThrough } from "stream";
import { RawHttpHeaders, RestError } from "@azure/core-rest-pipeline";
import { setLogLevel, AzureLogger, getLogLevel, AzureLogLevel } from "@azure/logger";
import { getError } from "./authTestUtils";
import { IdentityTestContext, SendCredentialRequests, TestResponse } from "./httpRequestsTypes";
import { AccessToken } from "../src";

/**
 * @internal
 */
export class PassThroughResponse extends PassThrough {
  public statusCode?: number;
  public headers?: IncomingHttpHeaders;
}

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
  headers?: RawHttpHeaders
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
* @internal
*/
export function createWTFResponse(
  statusCode: number,
  body = "",
  headers?: IncomingHttpHeaders
): IncomingMessage {
  const response = new PassThroughResponse();
  response.headers = {};
  response.statusCode = statusCode;
  if (headers) {
    response.headers = headers;
  }
  response.write(body);
  response.end();
  return (response as unknown) as IncomingMessage;
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
    // const wtfResponse = createWTFResponse(400, JSON.stringify({ error: "test_error", error_description: "This is a test error" }));
    const incomingMessageResponse = responseToIncomingMessage(response);
    // console.log({ wtfResponse, incomingMessageResponse });
    const stubbedHttpsRequest = sandbox.stub(https, "request");

    stubbedHttpsRequest.returns(createRequest());
    const promise = sendPromise();
    stubbedHttpsRequest.yield(incomingMessageResponse);
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
    const insecureSpies: sinon.SinonSpy[] = [];
    const stubbedHttpRequest = sandbox.stub(http, "request");
    insecureResponses.forEach(({ response, error }, index) => {
      if (error) {
        stubbedHttpRequest.throws(error);
      } else if (response) {
        const request = createRequest();
        insecureSpies.push(sandbox.spy(request, "write"));
        stubbedHttpRequest.onCall(index).returns(request);
        stubbedHttpRequest.onCall(index).yields(responseToIncomingMessage(response));
      } else {
        throw new Error(
          "Bad fake response structure. Expected either an `error` or a `response` property."
        );
      }
    });

    const secureSpies: sinon.SinonSpy[] = [];
    const stubbedHttpsRequest = sandbox.stub(https, "request");
    secureResponses.forEach(({ response, error }, index) => {
      if (error) {
        stubbedHttpsRequest.throws(error);
      } else if (response) {
        console.log({ response });
        const request = createRequest();
        secureSpies.push(sandbox.spy(request, "write"));
        stubbedHttpsRequest.onCall(index).returns(request);
        stubbedHttpsRequest.onCall(index).yields(responseToIncomingMessage(response));
      } else {
        throw new Error(
          "Bad fake response structure. Expected either an `error` or a `response` property."
        );
      }
    });

    const promise = credential.getToken(scopes, getTokenOptions);

    await clock.runAllAsync();

    let result: AccessToken | null = null;
    let error: RestError | undefined;
    try {
      result = await promise;
    } catch (e) {
      error = e;
    }

    return {
      result,
      error,
      requests: [
        ...(stubbedHttpRequest.args as any).reduce((accumulator: any, args: any, index: number) => {
          console.log("AAAAAA HTTP REQUESTS", index);
          const requestOptions = args[0] as http.RequestOptions;
          const spiesArgs = insecureSpies[index]?.args;
          let body = "";
          if (spiesArgs && spiesArgs[0] && spiesArgs[0][0]) {
            body = spiesArgs[0][0];
          }
          return [
            ...accumulator,
            {
              url: `https://${requestOptions.hostname}/${requestOptions.path}`,
              body,
              method: requestOptions.method,
              headers: requestOptions.headers
            }
          ];
        }, []),
        ...(stubbedHttpsRequest.args as any).reduce((accumulator: any, args: any, index: number) => {
          console.log("AAAAAA HTTPS REQUESTS", index);
          const requestOptions = args[0] as http.RequestOptions;
          const spiesArgs = secureSpies[index]?.args;
          let body = "";
          if (spiesArgs && spiesArgs[0] && spiesArgs[0][0]) {
            body = spiesArgs[0][0];
          }
          return [
            ...accumulator,
            {
              url: `https://${requestOptions.hostname}/${requestOptions.path}`,
              body,
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
