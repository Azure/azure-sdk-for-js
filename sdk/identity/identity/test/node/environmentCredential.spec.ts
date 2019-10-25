// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "assert";
import path from "path";
import { EnvironmentCredential } from "../../src";
import {
  MockAuthHttpClient,
  assertClientCredentials,
  assertClientUsernamePassword
} from "../authTestUtils";
import { TestTracer, setTracer, SpanGraph } from "@azure/core-tracing";

describe("EnvironmentCredential", function() {
  it("finds and uses client credential environment variables", async () => {
    process.env.AZURE_TENANT_ID = "tenant";
    process.env.AZURE_CLIENT_ID = "client";
    process.env.AZURE_CLIENT_SECRET = "secret";

    const mockHttpClient = new MockAuthHttpClient();

    const credential = new EnvironmentCredential(mockHttpClient.tokenCredentialOptions);
    await credential.getToken("scope");

    delete process.env.AZURE_TENANT_ID;
    delete process.env.AZURE_CLIENT_ID;
    delete process.env.AZURE_CLIENT_SECRET;

    const authRequest = mockHttpClient.requests[0];
    assertClientCredentials(authRequest, "tenant", "client", "secret");
  });

  it("finds and uses client certificate path environment variables", async () => {
    process.env.AZURE_TENANT_ID = "tenant";
    process.env.AZURE_CLIENT_ID = "client";
    process.env.AZURE_CLIENT_CERTIFICATE_PATH = path.resolve(
      __dirname,
      "../test/azure-identity-test.crt"
    );

    const mockHttpClient = new MockAuthHttpClient();

    const credential = new EnvironmentCredential(mockHttpClient.identityClientOptions);
    await credential.getToken("scope");

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

    const mockHttpClient = new MockAuthHttpClient();

    const credential = new EnvironmentCredential(mockHttpClient.identityClientOptions);
    await credential.getToken("scope");

    delete process.env.AZURE_TENANT_ID;
    delete process.env.AZURE_CLIENT_ID;
    delete process.env.AZURE_USERNAME;
    delete process.env.AZURE_PASSWORD;

    const authRequest = mockHttpClient.requests[0];
    assertClientUsernamePassword(authRequest, "tenant", "client", "user", "password");
  });

  it("finds and uses client credential environment variables with tracing", async () => {
    process.env.AZURE_TENANT_ID = "tenant";
    process.env.AZURE_CLIENT_ID = "client";
    process.env.AZURE_CLIENT_SECRET = "secret";

    const mockHttpClient = new MockAuthHttpClient();
    const tracer = new TestTracer();
    setTracer(tracer);

    const credential = new EnvironmentCredential(mockHttpClient.tokenCredentialOptions);
    const rootSpan = tracer.startSpan("root");
    await credential.getToken("scope", {
      spanOptions: {
        parent: rootSpan
      }
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
                      name: "core-http"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };

    assert.deepStrictEqual(tracer.getSpanGraph(rootSpan.context().traceId), expectedGraph);
    assert.strictEqual(tracer.getActiveSpans().length, 0, "All spans should have had end called");
  });
});
