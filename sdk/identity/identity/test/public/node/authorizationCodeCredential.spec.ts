// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import assert from "assert";
import {
  assertClientCredentials,
  createResponse,
  IdentityTestContext,
  prepareIdentityTests,
  SendCredentialRequests
} from "../../authTestUtils";
import { AuthorizationCodeCredential } from "../../../src";
import { TestTracer, setTracer, SpanGraph } from "@azure/core-tracing";
import { setSpan, context as otContext } from "@azure/core-tracing";

describe("AuthorizationCodeCredential", function() {
  let testContext: IdentityTestContext;
  let sendCredentialRequests: SendCredentialRequests;

  beforeEach(async function() {
    testContext = await prepareIdentityTests({});
    sendCredentialRequests = testContext.sendCredentialRequests;
  });
  afterEach(async function() {
    await testContext.restore();
  });

  it("sends an authorization request with the given credentials and authorization code", async () => {
    const redirectUri = "http://localhost:8080/authresponse";
    const authDetails = await sendCredentialRequests({
      scopes: ["scope"],
      credential: new AuthorizationCodeCredential(
        "tenant",
        "client",
        "secret",
        "authCode",
        redirectUri
      ),
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

    const authRequest = authDetails.secureRequestOptions[0];
    const spy = authDetails.secureRequestWriteSpies[0];
    const requestBody = spy.args[0][0];
    assertClientCredentials(authRequest, requestBody, "tenant", "client", "secret");

    assert.strictEqual(
      requestBody.indexOf(`code=authCode`) > -1,
      true,
      "Request body doesn't contain expected authorization code"
    );
    assert.strictEqual(
      requestBody.indexOf(`redirect_uri=${encodeURIComponent(redirectUri)}`) > -1,
      true,
      "Request body doesn't contain expected redirect URI"
    );
  });

  it("omits the client_secret field in authorization request if it is not provided", async () => {
    const redirectUri = "http://localhost:8080/authresponse";
    const authDetails = await sendCredentialRequests({
      scopes: ["scope"],
      credential: new AuthorizationCodeCredential("tenant", "client", "authCode", redirectUri),
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

    const spy = authDetails.secureRequestWriteSpies[0];
    const requestBody = spy.args[0][0];
    assert.strictEqual(
      requestBody.indexOf(`client_id=client`) > -1,
      true,
      "Request body doesn't contain expected clientId"
    );

    assert.strictEqual(
      requestBody.indexOf(`client_secret=`),
      -1,
      "Request body contains unexpected client_secret"
    );
  });

  it("traces the authorization code request when tracing is enabled", async function() {
    const tracer = new TestTracer();
    setTracer(tracer);

    const redirectUri = "http://localhost:8080/authresponse";
    const rootSpan = tracer.startSpan("root");

    const authDetails = await sendCredentialRequests({
      scopes: ["scope"],
      getTokenOptions: {
        tracingOptions: {
          tracingContext: setSpan(otContext.active(), rootSpan)
        }
      },
      credential: new AuthorizationCodeCredential(
        "tenant",
        "client",
        "secret",
        "authCode",
        redirectUri
      ),
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

    const authRequest = authDetails.secureRequestOptions[0];
    const spy = authDetails.secureRequestWriteSpies[0];
    const requestBody = spy.args[0][0];
    assertClientCredentials(authRequest, requestBody, "tenant", "client", "secret");

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

    assert.deepStrictEqual(tracer.getSpanGraph(rootSpan.spanContext().traceId), expectedGraph);
    assert.strictEqual(tracer.getActiveSpans().length, 0, "All spans should have had end called");
  });
});
