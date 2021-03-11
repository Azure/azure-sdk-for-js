// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  record,
  Recorder,
  RecorderEnvironmentSetup,
  TestContextInterface
} from "@azure/test-utils-recorder";
import Sinon, { createSandbox } from "sinon";
import assert from "assert";
import { OperationTracingOptions, setSpan, setTracer, SpanGraph, TestTracer, context as otContext } from "@azure/core-tracing";
import { MsalBaseUtilities } from "../src/msal/utils";
import * as dotenv from "dotenv";
dotenv.config();

export type MsalTestCleanup = () => Promise<void>;

export interface MsalTestSetupResponse {
  cleanup: MsalTestCleanup;
  recorder: Recorder;
  sandbox: Sinon.SinonSandbox;
}

export const PlaybackTenantId = "12345678-1234-1234-1234-123456789012";

export function msalNodeTestSetup(
  testContext: TestContextInterface | Mocha.Context
): MsalTestSetupResponse {
  const playbackValues = {
    correlationId: "client-request-id"
  };
  const recorderEnvSetup: RecorderEnvironmentSetup = {
    replaceableVariables: {
      AZURE_TENANT_ID: PlaybackTenantId,
      AZURE_CLIENT_ID: "azure_client_id",
      AZURE_CLIENT_SECRET: "azure_client_secret",
      AZURE_USERNAME: "azure_username",
      AZURE_PASSWORD: "azure_password"
    },
    customizationsOnRecordings: [
      (recording: string): string =>
        recording.replace(/"access_token":"[^"]*"/g, `"access_token":"access_token"`),
      (recording: string): string =>
        recording.replace(/"refresh_token":"[^"]*"/g, `"refresh_token":"refresh_token"`),
      (recording: string): string =>
        recording.replace(
          /client-request-id=[a-z0-9-]*/g,
          `client-request-id=${playbackValues.correlationId}`
        ),
      (recording: string): string =>
        recording.replace(/client_assertion=[a-zA-Z0-9-._]*/g, `client_assertion=client_assertion`),
      (recording: string): string => recording.replace(/esctx=[a-zA-Z0-9-_]*/g, `esctx=esctx`),
      (recording: string): string => recording.replace(/'fpc=[^;]*/g, `'fpc=fpc;`),
      // Device code specific
      (recording: string): string =>
        recording.replace(/user_code":"[^"]*/g, `user_code":"USER_CODE`),
      (recording: string): string =>
        recording.replace(
          /enter the code [A-Z0-9]* to authenticate/g,
          `enter the code USER_CODE to authenticate`
        ),
      (recording: string): string =>
        recording.replace(/device_code":"[^"]*/g, `device_code":"DEVICE_CODE`),
      (recording: string): string =>
        recording.replace(/device_code=[^&]*/g, `device_code=DEVICE_CODE`),
      // This last part is a JWT token that comes from the service, that has three parts joined by a dot.
      // Our fake id_token has the following parts encoded in base64 and joined by a dot:
      // - {"typ":"JWT","alg":"RS256","kid":"kid"}
      // - {"aud":"aud","iss":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","iat":1615337163,"nbf":1615337163,"exp":1615341063,"aio":"aio","idp":"https://sts.windows.net/idp/","name":"Daniel Rodríguez","oid":"oid","preferred_username":"danrodri@microsoft.com","rh":"rh.","sub":"sub","tid":"12345678-1234-1234-1234-123456789012","uti":"uti","ver":"2.0"}
      // - no_idea_whats_this
      (recording: string): string =>
        recording.replace(
          /id_token":"[^"]*/g,
          `id_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImtpZCJ9.eyJhdWQiOiJhdWQiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vMTIzNDU2NzgtMTIzNC0xMjM0LTEyMzQtMTIzNDU2Nzg5MDEyL3YyLjAiLCJpYXQiOjE2MTUzMzcxNjMsIm5iZiI6MTYxNTMzNzE2MywiZXhwIjoxNjE1MzQxMDYzLCJhaW8iOiJhaW8iLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9pZHAvIiwibmFtZSI6IkRhbmllbCBSb2Ryw61ndWV6Iiwib2lkIjoib2lkIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiZGFucm9kcmlAbWljcm9zb2Z0LmNvbSIsInJoIjoicmguIiwic3ViIjoic3ViIiwidGlkIjoiMTIzNDU2NzgtMTIzNC0xMjM0LTEyMzQtMTIzNDU2Nzg5MDEyIiwidXRpIjoidXRpIiwidmVyIjoiMi4wIn0=.bm9faWRlYV93aGF0c190aGlz`
        )
    ],
    queryParametersToSkip: []
  };
  const recorder = record(testContext, recorderEnvSetup);
  const sandbox = createSandbox();

  const stub = sandbox.stub(MsalBaseUtilities.prototype, "generateUuid");
  stub.returns(playbackValues.correlationId);

  return {
    sandbox,
    recorder,
    async cleanup() {
      await recorder.stop();
      sandbox.restore();
    }
  };
}

export interface TestTracingOptions {
  test(options: OperationTracingOptions): Promise<void>;
  children: any[];
}

export function testTracing(options: TestTracingOptions): () => Promise<void> {
  return async function() {
    const { test, children } = options;
    const tracer = new TestTracer();
    setTracer(tracer);
    const rootSpan = tracer.startSpan("root");

    const tracingContext = setSpan(otContext.active(), rootSpan);

    await test({
      tracingContext
    });

    rootSpan.end();

    const rootSpans = tracer.getRootSpans();
    assert.strictEqual(rootSpans.length, 1, "Should only have one root span.");
    assert.strictEqual(rootSpan, rootSpans[0], "The root span should match what was passed in.");

    const expectedGraph: SpanGraph = {
      roots: [
        {
          name: rootSpan.name,
          children
        }
      ]
    };

    assert.deepStrictEqual(tracer.getSpanGraph(rootSpan.context().traceId), expectedGraph);
    assert.strictEqual(tracer.getActiveSpans().length, 0, "All spans should have had end called");
  };
}
