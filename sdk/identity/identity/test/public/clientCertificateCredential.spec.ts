// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import qs from "qs";
import jws from "jws";
import path from "path";
import assert from "assert";
import { ClientCertificateCredential } from "../../src";
import { MockAuthHttpClient } from "../authTestUtils";
import { setTracer, TestTracer, SpanGraph } from "@azure/core-tracing";

describe("ClientCertificateCredential", function() {
  it("loads a PEM-formatted certificate from a file", () => {
    const credential = new ClientCertificateCredential(
      "tenant",
      "client",
      path.resolve(__dirname, "../test/azure-identity-test.crt")
    );

    assert.strictEqual(
      (credential as any).certificateThumbprint,
      "47080F3BAA6BF8DF068531106FBCF2DC6E5F6919"
    );

    assert.strictEqual((credential as any).certificateX5t, "RwgPO6pr+N8GhTEQb7zy3G5faRk=");
  });

  it("throws when given a file that doesn't contain a PEM-formatted certificate", () => {
    assert.throws(() => {
      new ClientCertificateCredential(
        "tenant",
        "client",
        path.resolve(__dirname, "../src/index.ts")
      );
    });
  });

  it("sends a correctly formatted token request", async () => {
    const tenantId = "tenantId";
    const clientId = "clientId";
    const mockHttpClient = new MockAuthHttpClient();

    const credential = new ClientCertificateCredential(
      tenantId,
      clientId,
      path.resolve(__dirname, "../test/azure-identity-test.crt"),
      mockHttpClient.tokenCredentialOptions
    );

    await credential.getToken("scope");

    const authRequest = mockHttpClient.requests[0];
    if (!authRequest) {
      assert.fail("No authentication request was intercepted");
    } else {
      assert.strictEqual(
        authRequest.url.startsWith(`https://authority/${tenantId}`),
        true,
        "Request URL doesn't contain expected tenantId"
      );
      assert.strictEqual(
        authRequest.body.indexOf(`client_id=${clientId}`) > -1,
        true,
        "Request URL doesn't contain expected clientId"
      );

      const queryParams = qs.parse(authRequest.body);
      const jwtToken = jws.decode(queryParams.client_assertion as string);

      assert.strictEqual(jwtToken.header.x5t, (credential as any).certificateX5t);
      assert.strictEqual(jwtToken.payload.iss, clientId);
      assert.strictEqual(jwtToken.payload.sub, clientId);
      assert.strictEqual(
        jwtToken.payload.aud.startsWith(`https://authority/${tenantId}`),
        true,
        "Audience does not have the correct authority or tenantId"
      );
    }
  });

  it("sends a correctly formatted token request while tracing", async () => {
    const tracer = new TestTracer();
    setTracer(tracer);
    const tenantId = "tenantId";
    const clientId = "clientId";
    const mockHttpClient = new MockAuthHttpClient();

    const rootSpan = tracer.startSpan("root");

    const credential = new ClientCertificateCredential(
      tenantId,
      clientId,
      path.resolve(__dirname, "../test/azure-identity-test.crt"),
      mockHttpClient.tokenCredentialOptions
    );

    await credential.getToken("scope", {
      tracingOptions: {
        spanOptions: {
          parent: rootSpan.context()
        }
      }
    });

    rootSpan.end();

    const rootSpans = tracer.getRootSpans();
    assert.strictEqual(rootSpans.length, 1, "Should only have one root span.");
    assert.strictEqual(rootSpan, rootSpans[0], "The root span should match what was passed in.");

    const expectedGraph: SpanGraph = {
      roots: [
        {
          name: rootSpan.name,
          children: [
            {
              name: "Azure.Identity.ClientCertificateCredential-getToken",
              children: [
                {
                  children: [],
                  name: "/tenantId/oauth2/v2.0/token"
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
