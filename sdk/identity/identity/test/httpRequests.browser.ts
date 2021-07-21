// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as sinon from "sinon";
import { assert } from "chai";
import { setLogLevel, AzureLogger, getLogLevel, AzureLogLevel } from "@azure/logger";
import { RawHttpHeaders, RestError } from "@azure/core-rest-pipeline";
import { getError } from "./authTestUtils";
import { TestResponse, IdentityTestContext, SendCredentialRequests } from "./httpRequestsTypes";

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

  // Browser specific code
  const xhrMock = sandbox.useFakeXMLHttpRequest();
  const requests: sinon.SinonFakeXMLHttpRequest[] = [];
  const responses: { response?: TestResponse; error?: RestError }[] = [];
  xhrMock.onCreate = (xhr) => {
    const response = responses.shift();
    if (!response) {
      throw new Error("Insufficient responses");
    }
    requests.push(xhr);
    if (response.error) {
      xhr.status = response.error.statusCode!;
      xhr.statusText = response.error.code!;
      xhr.error();
    } else if (response.response) {
      xhr.respond(
        response.response.statusCode,
        response.response.headers,
        response.response.body || ""
      );
    } else {
      throw new Error(
        "Bad fake response structure. Expected either an `error` or a `response` property."
      );
    }
  };

  /**
   * Wraps the outgoing request in a mocked environment, then returns the result of the request.
   */
  async function sendIndividualRequest<T>(
    sendPromise: () => Promise<T | null>,
    response: TestResponse
  ): Promise<T | null> {
    responses.push({ response });
    const promise = sendPromise();
    assert.equal(requests.length, 1);
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
    responses.push(...[...insecureResponses, ...secureResponses]);

    const promise = credential.getToken(scopes, getTokenOptions);
    await clock.runAllAsync();

    return {
      result: await promise,
      requests: requests.map((request) => {
        return {
          url: request.url,
          body: request.requestBody,
          method: request.method,
          headers: request.requestHeaders
        };
      })
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
