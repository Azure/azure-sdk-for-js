// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as sinon from "sinon";
import { AzureLogger, AzureLogLevel } from "@azure/logger";
import { RawHttpHeaders, RestError } from "@azure/core-rest-pipeline";
import { AccessToken, GetTokenOptions, TokenCredential } from "../src";

/**
 * A simple structure representing a response.
 * Things will be converted from their original shape, depending on the environment,
 * into this shape in order for tests to look similar both in Node.js and in the browser.
 * @internal
 */
export interface TestResponse {
  statusCode: number;
  headers?: RawHttpHeaders;
  body: string;
}

/**
 * A simple structure that can contain either a response or an error.
 * @internal
 */
export type RawTestResponse = { response?: TestResponse; error?: RestError };

/**
 * The cross-environment representation of a function that...
 * wraps a credential's getToken in a mocked environment, then returns the results from the request,
 * including potentially an AccessToken, an error and the list of outgoing requests in a simplified format.
 * @internal
 */
export type SendIndividualRequest = <T>(
  sendPromise: () => Promise<T | null>,
  response: { response: TestResponse }
) => Promise<T | null>;

/**
 * The cross-environment representation of a function that...
 * wraps the outgoing request in a mocked environment, then returns the error that results from the request.
 * @internal
 */
export type SendIndividualRequestAndGetError = <T>(
  sendPromise: () => Promise<T | null>,
  response: { response: TestResponse }
) => Promise<Error>;

/**
 * The cross-environment representation of a function that...
 * wraps a credential's getToken in a mocked environment, then returns the results from the request.
 * @internal
 */
export type SendCredentialRequests = (options: {
  scopes: string | string[];
  getTokenOptions?: GetTokenOptions;
  credential: TokenCredential;
  insecureResponses?: RawTestResponse[];
  secureResponses?: RawTestResponse[];
}) => Promise<{
  result: AccessToken | null;
  error?: RestError;
  requests: {
    url: string;
    body: string;
    method: string;
    headers: Record<string, string>;
  }[];
}>;

/**
 * The cross-environment representation of the set of tools that can be used to test Identity credential requests.
 * This is the returned value of the `prepareIdentityTests` function that is both available in Node.js and in the browser.
 * @internal
 */
export interface IdentityTestContextInterface {
  sandbox: sinon.SinonSandbox;
  clock: sinon.SinonFakeTimers;
  logMessages: string[];
  oldLogger: typeof AzureLogger.log;
  oldLogLevel: AzureLogLevel | undefined;
  restore: () => Promise<void>;
  sendIndividualRequest: SendIndividualRequest;
  sendIndividualRequestAndGetError: SendIndividualRequestAndGetError;
  sendCredentialRequests: SendCredentialRequests;
}

/**
 * A simple function that makes it more pleasing to build a test response.
 * @internal
 */
export function createResponse(
  statusCode: number,
  body: Record<string, string | string[] | boolean | number> = {},
  headers: RawHttpHeaders = {}
): { response: TestResponse } {
  return {
    response: {
      statusCode,
      body: JSON.stringify(body),
      headers,
    },
  };
}
