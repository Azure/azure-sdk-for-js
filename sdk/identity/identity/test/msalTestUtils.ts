// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { OperationTracingOptions, setSpan, context as otContext } from "@azure/core-tracing";
import { SpanGraph, setTracer } from "@azure/test-utils";
import { isNode } from "@azure/core-util";
import * as dotenv from "dotenv";

// Browser tests fail if dotenv.config is called in that environment.
if (isNode) {
  dotenv.config({ path: ".env" });
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
    "client_secret_basic",
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
    "email",
  ],
  tenant_region_scope: "NA",
  cloud_instance_name: "microsoftonline.com",
  cloud_graph_host_name: "graph.windows.net",
  msgraph_host: "graph.microsoft.com",
  rbac_url: "https://pas.windows.net",
};

export interface TestTracingOptions {
  test(options: OperationTracingOptions): Promise<void>;
  children: any[];
}

export function testTracing(options: TestTracingOptions): () => Promise<void> {
  return async function () {
    const { test, children } = options;
    const tracer = setTracer();
    const rootSpan = tracer.startSpan("root");

    const tracingContext = setSpan(otContext.active(), rootSpan);

    await test({
      tracingContext,
    });

    rootSpan.end();

    const rootSpans = tracer.getRootSpans();
    assert.strictEqual(rootSpans.length, 1, "Should only have one root span.");
    assert.strictEqual(rootSpan, rootSpans[0], "The root span should match what was passed in.");

    const expectedGraph: SpanGraph = {
      roots: [
        {
          name: rootSpan.name,
          children,
        },
      ],
    };

    assert.deepStrictEqual(tracer.getSpanGraph(rootSpan.spanContext().traceId), expectedGraph);
    assert.strictEqual(tracer.getActiveSpans().length, 0, "All spans should have had end called");
  };
}
