// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import assert from "assert";
import path from "path";
import {
  assertClientCredentials,
  createResponse,
  IdentityTestContext,
  prepareIdentityTests,
  SendCredentialRequests
} from "./nodeAuthTestUtils";
import { TestTracer, setTracer, SpanGraph, setSpan, context } from "@azure/core-tracing";
import { EnvironmentCredential, AuthenticationError, CredentialUnavailable } from "../../../src";
import { assertRejects } from "../../authTestUtils";

interface OAuthErrorResponse {
  error: string;
  error_description: string;
  error_codes?: number[];
  timestamp?: string;
  trace_id?: string;
  correlation_id?: string;
}

describe("EnvironmentCredential", function() {
  let testContext: IdentityTestContext;
  let sendCredentialRequests: SendCredentialRequests;

  beforeEach(async function() {
    testContext = await prepareIdentityTests({});
    sendCredentialRequests = testContext.sendCredentialRequests;
  });
  afterEach(async function() {
    await testContext.restore();
  });

  it("finds and uses client credential environment variables", async () => {
    process.env.AZURE_TENANT_ID = "tenant";
    process.env.AZURE_CLIENT_ID = "client";
    process.env.AZURE_CLIENT_SECRET = "secret";

    const authDetails = await sendCredentialRequests({
      scopes: ["scope"],
      credential: new EnvironmentCredential(),
      secureResponses: [
        {
          response: createResponse(
            200,
            JSON.stringify({
              access_token: "token",
              expires_on: "06/20/2019 02:57:58 +00:00"
            })
          )
        }
      ]
    });

    delete process.env.AZURE_TENANT_ID;
    delete process.env.AZURE_CLIENT_ID;
    delete process.env.AZURE_CLIENT_SECRET;

    const authRequest = authDetails.secureRequestOptions[0];
    const spy = authDetails.secureRequestWriteSpies[0];
    const requestBody = spy.args[0][0];
    assertClientCredentials(authRequest, requestBody, "tenant", "client", "secret");
  });

  it("finds and uses client certificate path environment variables", async () => {
    process.env.AZURE_TENANT_ID = "tenant";
    process.env.AZURE_CLIENT_ID = "client";
    process.env.AZURE_CLIENT_CERTIFICATE_PATH = path.resolve(
      __dirname,
      "../test/azure-identity-test.crt"
    );

    const credential = new EnvironmentCredential();
    await sendCredentialRequests({
      scopes: ["scope"],
      credential,
      secureResponses: [
        {
          response: createResponse(
            200,
            JSON.stringify({
              access_token: "token",
              expires_on: "06/20/2019 02:57:58 +00:00"
            })
          )
        }
      ]
    });

    delete process.env.AZURE_TENANT_ID;
    delete process.env.AZURE_CLIENT_ID;
    delete process.env.AZURE_CLIENT_CERTIFICATE_PATH;

    assert.strictEqual(
      (credential as any)._credential.certificateThumbprint,
      "47080F3BAA6BF8DF068531106FBCF2DC6E5F6919"
    );

    assert.strictEqual(
      (credential as any)._credential.certificateX5t,
      "RwgPO6pr+N8GhTEQb7zy3G5faRk="
    );
  });

  it("finds and uses client username/password environment variables", async () => {
    process.env.AZURE_TENANT_ID = "tenant";
    process.env.AZURE_CLIENT_ID = "client";
    process.env.AZURE_USERNAME = "user";
    process.env.AZURE_PASSWORD = "password";

    const authDetails = await sendCredentialRequests({
      scopes: ["scope"],
      credential: new EnvironmentCredential(),
      secureResponses: [
        {
          response: createResponse(
            200,
            JSON.stringify({
              access_token: "token",
              expires_on: "06/20/2019 02:57:58 +00:00"
            })
          )
        }
      ]
    });

    delete process.env.AZURE_TENANT_ID;
    delete process.env.AZURE_CLIENT_ID;
    delete process.env.AZURE_USERNAME;
    delete process.env.AZURE_PASSWORD;

    const authRequest = authDetails.secureRequestOptions[0];
    const spy = authDetails.secureRequestWriteSpies[0];
    const requestBody = spy.args[0][0];
    assertClientCredentials(authRequest, requestBody, "tenant", "client");

    assert.strictEqual(
      requestBody.indexOf(`password=password`) > -1,
      true,
      "Request body doesn't contain expected password"
    );
  });

  it("finds and uses client credential environment variables with tracing", async () => {
    process.env.AZURE_TENANT_ID = "tenant";
    process.env.AZURE_CLIENT_ID = "client";
    process.env.AZURE_CLIENT_SECRET = "secret";

    const tracer = new TestTracer();
    setTracer(tracer);
    const rootSpan = tracer.startSpan("root");

    await sendCredentialRequests({
      scopes: ["scope"],
      getTokenOptions: {
        tracingOptions: {
          tracingContext: setSpan(context.active(), rootSpan)
        }
      },
      credential: new EnvironmentCredential(),
      secureResponses: [
        {
          response: createResponse(
            200,
            JSON.stringify({
              access_token: "token",
              expires_on: "06/20/2019 02:57:58 +00:00"
            })
          )
        }
      ]
    });

    rootSpan.end();

    delete process.env.AZURE_TENANT_ID;
    delete process.env.AZURE_CLIENT_ID;
    delete process.env.AZURE_CLIENT_SECRET;

    const rootSpans = tracer.getRootSpans();
    assert.strictEqual(rootSpans.length, 1, "Should only have one root span.");
    assert.strictEqual(rootSpan, rootSpans[0], "The root span should match what was passed in.");

    const expectedGraph: SpanGraph = {
      roots: [
        {
          name: rootSpan.name,
          children: [
            {
              name: "Azure.Identity.EnvironmentCredential-getToken",
              children: [
                {
                  name: "Azure.Identity.ClientSecretCredential-getToken",
                  children: [
                    {
                      children: [],
                      name: "/tenant/oauth2/v2.0/token"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };

    assert.deepStrictEqual(tracer.getSpanGraph(rootSpan.spanContext().traceId), expectedGraph);
    assert.strictEqual(tracer.getActiveSpans().length, 0, "All spans should have had end called");
  });

  it("throws an CredentialUnavailable when getToken is called and no credential was configured", async () => {
    await assertRejects(
      sendCredentialRequests({
        scopes: ["scope"],
        credential: new EnvironmentCredential()
      }),
      (error: CredentialUnavailable) =>
        error.message.indexOf(
          "EnvironmentCredential is unavailable. Environment variables are not fully configured."
        ) > -1
    );
  });

  it("throws an CredentialUnavailable when getToken is called and no credential was configured (this time only with AZURE_TENANT_ID)", async () => {
    process.env.AZURE_TENANT_ID = "Itme";

    await assertRejects(
      sendCredentialRequests({
        scopes: ["scope"],
        credential: new EnvironmentCredential()
      }),
      (error: CredentialUnavailable) =>
        error.message.indexOf(
          "EnvironmentCredential is unavailable. Environment variables are not fully configured."
        ) > -1
    );

    delete process.env.AZURE_TENANT_ID;
  });

  it("throws an AuthenticationError when getToken is called and EnvironmentCredential authentication failed", async () => {
    process.env.AZURE_TENANT_ID = "tenant";
    process.env.AZURE_CLIENT_ID = "errclient";
    process.env.AZURE_CLIENT_SECRET = "secret";

    const errResponse: OAuthErrorResponse = {
      error: "EnvironmentCredential authentication failed.",
      error_description: ""
    };

    await assertRejects(
      sendCredentialRequests({
        scopes: ["scope"],
        credential: new EnvironmentCredential(),
        secureResponses: [
          {
            response: createResponse(400, JSON.stringify(errResponse))
          }
        ]
      }),
      (error: AuthenticationError) =>
        error.errorResponse.error.indexOf("EnvironmentCredential authentication failed.") > -1
    );
  });
});
