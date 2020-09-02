// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import assert from "assert";
import { AuthorizationCodeCredential } from "../../src";
import { TestTracer, setTracer, SpanGraph } from "@azure/core-tracing";
import { MockAuthHttpClient, assertClientCredentials } from "../authTestUtils";

describe("AuthorizationCodeCredential", function() {
  it("sends an authorization request with the given credentials and authorization code", async () => {
    const mockHttpClient = new MockAuthHttpClient();
    const redirectUri = "http://localhost:8080/authresponse";

    const credential = new AuthorizationCodeCredential(
      "tenant",
      "client",
      "secret",
      "authCode",
      redirectUri,
      { ...mockHttpClient.tokenCredentialOptions }
    );

    await credential.getToken("scope");

    const authRequest = mockHttpClient.requests[0];
    assertClientCredentials(authRequest, "tenant", "client", "secret");

    assert.strictEqual(
      authRequest.body.indexOf(`code=authCode`) > -1,
      true,
      "Request body doesn't contain expected authorization code"
    );
    assert.strictEqual(
      authRequest.body.indexOf(`redirect_uri=${encodeURIComponent(redirectUri)}`) > -1,
      true,
      "Request body doesn't contain expected redirect URI"
    );
  });

  it("omits the client_secret field in authorization request if it is not provided", async () => {
    const mockHttpClient = new MockAuthHttpClient();
    const redirectUri = "http://localhost:8080/authresponse";

    const credential = new AuthorizationCodeCredential(
      "tenant",
      "client",
      "authCode",
      redirectUri,
      {
        ...mockHttpClient.tokenCredentialOptions
      }
    );

    await credential.getToken("scope");

    const authRequest = mockHttpClient.requests[0];
    assert.strictEqual(
      authRequest.body.indexOf(`client_id=client`) > -1,
      true,
      "Request body doesn't contain expected clientId"
    );

    assert.strictEqual(
      authRequest.body.indexOf(`client_secret=`),
      -1,
      "Request body contains unexpected client_secret"
    );
  });

  it("traces the authorization code request when tracing is enabled", async function() {
    const tracer = new TestTracer();
    setTracer(tracer);

    const redirectUri = "http://localhost:8080/authresponse";
    const mockHttpClient = new MockAuthHttpClient({
      authResponse: [
        {
          status: 200,
          parsedBody: {
            token: "token",
            expires_on: "06/20/2019 02:57:58 +00:00"
          }
        }
      ]
    });

    const rootSpan = tracer.startSpan("root");

    const credential = new AuthorizationCodeCredential(
      "tenant",
      "client",
      "secret",
      "authCode",
      redirectUri,
      {
        ...mockHttpClient.tokenCredentialOptions
      }
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
              name: "Azure.Identity.AuthorizationCodeCredential-getToken",
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
    };

    assert.deepStrictEqual(tracer.getSpanGraph(rootSpan.context().traceId), expectedGraph);
    assert.strictEqual(tracer.getActiveSpans().length, 0, "All spans should have had end called");
  });
});
