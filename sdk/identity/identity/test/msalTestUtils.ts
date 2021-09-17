// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  record,
  Recorder,
  RecorderEnvironmentSetup,
  TestContextInterface,
  pluginForIdentitySDK
} from "@azure-tools/test-recorder";
import Sinon, { createSandbox } from "sinon";
import { assert } from "chai";
import { OperationTracingOptions, setSpan, context as otContext } from "@azure/core-tracing";
import { SpanGraph, setTracer } from "@azure/test-utils";
import { MsalBaseUtilities } from "../src/msal/utils";

export type MsalTestCleanup = () => Promise<void>;

export interface MsalTestSetupResponse {
  cleanup: MsalTestCleanup;
  recorder: Recorder;
  sandbox: Sinon.SinonSandbox;
}

export const PlaybackTenantId = "12345678-1234-1234-1234-123456789012";

/**
 * OpenId configuration discovery endpoint response
 * @internal
 */
export const openIdConfigurationResponse: Record<string, string | string[] | boolean> = {
  token_endpoint: `https://login.microsoftonline.com/${PlaybackTenantId}/oauth2/v2.0/token`,
  token_endpoint_auth_methods_supported: [
    "client_secret_post",
    "private_key_jwt",
    "client_secret_basic"
  ],
  jwks_uri: `https://login.microsoftonline.com/${PlaybackTenantId}/discovery/v2.0/keys`,
  response_modes_supported: ["query", "fragment", "form_post"],
  subject_types_supported: ["pairwise"],
  id_token_signing_alg_values_supported: ["RS256"],
  response_types_supported: ["code", "id_token", "code id_token", "id_token token"],
  scopes_supported: ["openid", "profile", "email", "offline_access"],
  issuer: `https://login.microsoftonline.com/${PlaybackTenantId}/v2.0`,
  request_uri_parameter_supported: false,
  userinfo_endpoint: "https://graph.microsoft.com/oidc/userinfo",
  authorization_endpoint: `https://login.microsoftonline.com/${PlaybackTenantId}/oauth2/v2.0/authorize`,
  device_authorization_endpoint:
    "https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode",
  http_logout_supported: true,
  frontchannel_logout_supported: true,
  end_session_endpoint: `https://login.microsoftonline.com/${PlaybackTenantId}/oauth2/v2.0/logout`,
  claims_supported: [
    "sub",
    "iss",
    "cloud_instance_name",
    "cloud_instance_host_name",
    "cloud_graph_host_name",
    "msgraph_host",
    "aud",
    "exp",
    "iat",
    "auth_time",
    "acr",
    "nonce",
    "preferred_username",
    "name",
    "tid",
    "ver",
    "at_hash",
    "c_hash",
    "email"
  ],
  tenant_region_scope: "NA",
  cloud_instance_name: "microsoftonline.com",
  cloud_graph_host_name: "graph.windows.net",
  msgraph_host: "graph.microsoft.com",
  rbac_url: "https://pas.windows.net"
};

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
        recording.replace(/refresh_token=[^&]*/g, `refresh_token=refresh_token`),
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
      (recording: string): string => recording.replace(/"interval": *[0-9]*/g, `"interval": 0`),
      // This last part is a JWT token that comes from the service, that has three parts joined by a dot.
      // Our fake id_token has the following parts encoded in base64 and joined by a dot:
      // - {"typ":"JWT","alg":"RS256","kid":"kid"}
      // - {"aud":"aud","iss":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","iat":1615337163,"nbf":1615337163,"exp":1615341063,"aio":"aio","idp":"https://sts.windows.net/idp/","name":"Daniel Rodríguez","oid":"oid","preferred_username":"danrodri@microsoft.com","rh":"rh.","sub":"sub","tid":"12345678-1234-1234-1234-123456789012","uti":"uti","ver":"2.0"}
      // - no_idea_whats_this
      (recording: string): string =>
        recording.replace(
          /id_token":"[^"]*/g,
          `id_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImtpZCJ9.eyJhdWQiOiJhdWQiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vMTIzNDU2NzgtMTIzNC0xMjM0LTEyMzQtMTIzNDU2Nzg5MDEyL3YyLjAiLCJpYXQiOjE2MTUzMzcxNjMsIm5iZiI6MTYxNTMzNzE2MywiZXhwIjoxNjE1MzQxMDYzLCJhaW8iOiJhaW8iLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9pZHAvIiwibmFtZSI6IkRhbmllbCBSb2Ryw61ndWV6Iiwib2lkIjoib2lkIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiZGFucm9kcmlAbWljcm9zb2Z0LmNvbSIsInJoIjoicmguIiwic3ViIjoic3ViIiwidGlkIjoiMTIzNDU2NzgtMTIzNC0xMjM0LTEyMzQtMTIzNDU2Nzg5MDEyIiwidXRpIjoidXRpIiwidmVyIjoiMi4wIn0=.bm9faWRlYV93aGF0c190aGlz`
        ),
      // client_info is base64-encoded JSON that contains information about the user and tenant IDs
      // The following replaces it with some dummy JSON that uses a UID/UTID of 12345678-1234-1234-1234-123456789012
      (recording) =>
        recording.replace(
          /client_info":"[^"]*/g,
          'client_info":"eyJ1aWQiOiIxMjM0NTY3OC0xMjM0LTEyMzQtMTIzNC0xMjM0NTY3ODkwMTIiLCJ1dGlkIjoiMTIzNDU2NzgtMTIzNC0xMjM0LTEyMzQtMTIzNDU2Nzg5MDEyIn0K'
        )
    ],
    queryParametersToSkip: [],
    onLoadCallbackForPlayback: pluginForIdentitySDK
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
    const tracer = setTracer();
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

    assert.deepStrictEqual(tracer.getSpanGraph(rootSpan.spanContext().traceId), expectedGraph);
    assert.strictEqual(tracer.getActiveSpans().length, 0, "All spans should have had end called");
  };
}
