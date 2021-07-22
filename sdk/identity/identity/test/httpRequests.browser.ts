// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as sinon from "sinon";
import { assert } from "chai";
import { setLogLevel, AzureLogger, getLogLevel, AzureLogLevel } from "@azure/logger";
import { RawHttpHeaders, RestError } from "@azure/core-rest-pipeline";
import { AccessToken } from "@azure/core-auth";
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
  const server = sandbox.useFakeServer();
  const requests: sinon.SinonFakeXMLHttpRequest[] = [];
  const responses: { response?: TestResponse; error?: RestError }[] = [];

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
    server.respondWith((xhr) => {
      requests.push(xhr);
      if (!responses.length) {
        throw new Error("No responses to send");
      }
      const { response, error } = responses.shift()!;
      if (response) {
        xhr.respond(response.statusCode, response.headers, response.body);
      } else if (error) {
        xhr.respond(error.statusCode!, {}, error.message);
      } else {
        throw new Error("No response or error to send");
      }
    });

    let result: AccessToken | null = null;
    let error: RestError | undefined;
    try {
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
