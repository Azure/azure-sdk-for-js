// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as sinon from "sinon";
import { AzureLogger, AzureLogLevel } from "@azure/logger";
import { RawHttpHeaders, RestError } from "@azure/core-rest-pipeline";
import { AccessToken, GetTokenOptions, TokenCredential } from "../src";

/**
 * @internal
 */
export interface TestResponse {
  statusCode: number;
  headers: RawHttpHeaders;
  body: string;
}

/**
 * @internal
 */
export type SendIndividualRequest = <T>(
  sendPromise: () => Promise<T | null>,
  response: TestResponse
) => Promise<T | null>;

/**
 * @internal
 */
export type SendIndividualRequestAndGetError = <T>(
  sendPromise: () => Promise<T | null>,
  response: TestResponse
) => Promise<Error>;

/**
 * @internal
 */
export type SendCredentialRequests = (options: {
  scopes: string | string[];
  getTokenOptions?: GetTokenOptions;
  credential: TokenCredential;
  insecureResponses?: { response?: TestResponse; error?: RestError }[];
  secureResponses?: { response?: TestResponse; error?: RestError }[];
}) => Promise<{
  result: AccessToken | null;
  requests: {
    url: string;
    body: string;
    method: string;
    headers: Record<string, string>;
  }[];
}>;

/**
 * @internal
 */
export interface IdentityTestContext {
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
