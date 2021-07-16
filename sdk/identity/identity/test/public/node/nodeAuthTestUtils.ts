// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import assert from "assert";
import * as sinon from "sinon";
import * as https from "https";
import * as http from "http";
import { PipelineRequest } from "@azure/core-rest-pipeline";
import { PassThrough } from "stream";
import { IncomingMessage, IncomingHttpHeaders, ClientRequest } from "http";
import { setLogLevel, AzureLogger, getLogLevel, AzureLogLevel } from "@azure/logger";
import { AccessToken, AuthenticationError, GetTokenOptions, TokenCredential } from "../../../src";
import { DefaultAuthorityHost } from "../../../src/constants";

export function assertClientCredentials(
  authRequest: http.RequestOptions,
  requestBody: string,
  expectedTenantId: string,
  expectedClientId: string,
  expectedClientSecret?: string
): void {
  if (!authRequest) {
    assert.fail("No authentication request was intercepted");
  } else {
    assert.strictEqual(`https://${authRequest.hostname}`, DefaultAuthorityHost);
    assert.ok(authRequest.path?.indexOf(expectedTenantId) === 1);

    assert.strictEqual(
      requestBody.indexOf(`client_id=${expectedClientId}`) > -1,
      true,
      "Request body doesn't contain expected clientId"
    );

    if (expectedClientSecret) {
      assert.strictEqual(
        requestBody.indexOf(`client_secret=${expectedClientSecret}`) > -1,
        true,
        "Request body doesn't contain expected clientSecret"
      );
    }
  }
}

export function assertClientUsernamePassword(
  authRequest: PipelineRequest,
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
      (authRequest.body as string).indexOf(`client_id=${expectedClientId}`) > -1,
      true,
      "Request body doesn't contain expected clientId"
    );
    assert.strictEqual(
      (authRequest.body as string).indexOf(`username=${expectedUsername}`) > -1,
      true,
      "Request body doesn't contain expected username"
    );
    assert.strictEqual(
      (authRequest.body as string).indexOf(`password=${expectedPassword}`) > -1,
      true,
      "Request body doesn't contain expected password"
    );
  }
}

/**
 * @internal
 */
export function isExpectedError(expectedErrorName: string): (error: any) => boolean {
  return (error: any) => {
    if (!(error instanceof AuthenticationError)) {
      assert.ifError(error);
    }
    return error.errorResponse.error === expectedErrorName;
  };
}

/**
 * @internal
 */
export class FakeResponse extends PassThrough {
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
  body = "",
  headers?: IncomingHttpHeaders
): IncomingMessage {
  const response = new FakeResponse();
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
export function createRequest(): ClientRequest {
  const request = new FakeRequest();
  request.finished = false;
  return (request as unknown) as ClientRequest;
}

/**
 * @internal
 */
export type SendCredentialRequests = (options: {
  scopes: string | string[];
  getTokenOptions?: GetTokenOptions;
  credential: TokenCredential;
  insecureResponses?: { response?: IncomingMessage; error?: Error }[];
  secureResponses?: { response?: IncomingMessage; error?: Error }[];
}) => Promise<{
  result: AccessToken | null;
  insecureRequestWriteSpies: sinon.SinonSpy[];
  secureRequestWriteSpies: sinon.SinonSpy[];
  insecureRequestOptions: http.RequestOptions[];
  secureRequestOptions: https.RequestOptions[];
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
  sendCredentialRequests: SendCredentialRequests;
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
    async sendCredentialRequests({
      scopes,
      getTokenOptions,
      credential,
      insecureResponses = [],
      secureResponses = []
    }) {
      const stubbedHttpRequest = sandbox.stub(http, "request");
      const stubbedHttpsRequest = sandbox.stub(https, "request");
      const insecureSpies: sinon.SinonSpy[] = [];
      const secureSpies: sinon.SinonSpy[] = [];

      insecureResponses.forEach(({ response, error }, index) => {
        if (error) {
          stubbedHttpRequest.throws(error);
        } else {
          const request = createRequest();
          insecureSpies.push(sandbox.spy(request, "write"));
          stubbedHttpRequest.onCall(index).returns(request);
          stubbedHttpRequest.onCall(index).yields(response);
        }
      });

      secureResponses.forEach(({ response, error }, index) => {
        if (error) {
          stubbedHttpsRequest.throws(error);
        } else {
          const request = createRequest();
          secureSpies.push(sandbox.spy(request, "write"));
          stubbedHttpsRequest.onCall(index).returns(request);
          stubbedHttpsRequest.onCall(index).yields(response);
        }
      });

      const promise = credential.getToken(scopes, getTokenOptions);

      await clock.runAllAsync();

      return {
        result: await promise,
        insecureRequestWriteSpies: insecureSpies,
        secureRequestWriteSpies: secureSpies,
        insecureRequestOptions: stubbedHttpRequest.args.map(
          (args) => args[0]
        ) as http.RequestOptions[],
        secureRequestOptions: stubbedHttpsRequest.args.map(
          (args) => args[0]
        ) as https.RequestOptions[]
      };
    }
  };
}
