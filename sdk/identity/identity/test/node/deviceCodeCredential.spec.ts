// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import assert from "assert";
import { TestTracer, setTracer, SpanGraph } from "@azure/core-tracing";
import { AbortController } from "@azure/abort-controller";
import {
  MockAuthHttpClient,
  assertRejects,
  setDelayInstantlyCompletes,
  restoreDelayBehavior,
  createDelayController,
  DelayController
} from "../authTestUtils";
import { AuthenticationError, OAuthErrorResponse } from "../../src/client/errors";
import {
  DeviceCodeCredential,
  DeviceCodeResponse
} from "../../src/credentials/deviceCodeCredential";

const deviceCodeResponse: DeviceCodeResponse = {
  interval: 1,
  expires_in: 20,
  verification_uri: "https://contoso.com/devicelogin",
  device_code: "XXXXXXXXXXXXXXXXXX",
  user_code: "B3920934",
  message: "Visit https://contoso.com/devicelogin and enter code B3920934"
};

const pendingResponse: OAuthErrorResponse = {
  error: "authorization_pending",
  error_description: "Waiting for user to authenticate"
};

describe("DeviceCodeCredential", function() {
  before(() => {
    setDelayInstantlyCompletes();
  });
  after(() => {
    restoreDelayBehavior();
  });

  it("sends a device code request and returns a token when the user completes it", async function() {
    const mockHttpClient = new MockAuthHttpClient({
      authResponse: [
        { status: 200, parsedBody: deviceCodeResponse },
        { status: 400, parsedBody: pendingResponse },
        { status: 400, parsedBody: pendingResponse },
        { status: 400, parsedBody: pendingResponse },
        { status: 200, parsedBody: { access_token: "token", expires_in: 5 } }
      ]
    });

    const credential = new DeviceCodeCredential(
      "tenant",
      "client",
      (details) => assert.equal(details.message, deviceCodeResponse.message),
      { ...mockHttpClient.tokenCredentialOptions }
    );

    const accessToken = await credential.getToken("scope");
    const currentTimestamp = Date.now() + 5000;

    if (accessToken === null) {
      assert.fail("getToken did not return an AccessToken");
    } else {
      assert.strictEqual(accessToken.token, "token");
      assert.ok(
        accessToken.expiresOnTimestamp >= currentTimestamp - 1000 &&
          accessToken.expiresOnTimestamp <= currentTimestamp,
        `AccessToken.expiresOnTimestamp is not ~${currentTimestamp}: ${accessToken.expiresOnTimestamp}`
      );
    }
  });

  it("refreshes the access token on subsequent getToken requests", async function() {
    const mockHttpClient = new MockAuthHttpClient({
      authResponse: [
        { status: 200, parsedBody: deviceCodeResponse },
        {
          status: 200,
          parsedBody: { access_token: "token", expires_in: 5, refresh_token: "ABC123" }
        },
        {
          status: 200,
          parsedBody: { access_token: "token", expires_in: 5, refresh_token: "ABC123" }
        }
      ]
    });

    const credential = new DeviceCodeCredential(
      "tenant",
      "client",
      (details) => assert.equal(details.message, deviceCodeResponse.message),
      { ...mockHttpClient.tokenCredentialOptions }
    );

    await credential.getToken("scope");
    const refreshedToken = await credential.getToken("scope");

    if (refreshedToken === null) {
      assert.fail("getToken did not return a refreshed AccessToken");
    } else {
      // Basic verification that a refresh request was made with the
      // refresh_token returned by the previous request
      const refreshRequest = mockHttpClient.requests[2];
      assert.ok(
        refreshRequest.body.indexOf(`grant_type=refresh_token`) > -1,
        "Request does not contain refresh_token grant type"
      );
      assert.ok(
        refreshRequest.body.indexOf(`refresh_token=ABC123`) > -1,
        "Request does not contain refresh token"
      );
    }
  });

  it("re-initiates the device code flow when the refresh token expires", async function() {
    const mockHttpClient = new MockAuthHttpClient({
      authResponse: [
        { status: 200, parsedBody: deviceCodeResponse },
        {
          status: 200,
          parsedBody: { access_token: "token", expires_in: 5, refresh_token: "ABC123" }
        },
        {
          status: 400,
          parsedBody: { error: "interaction_required", error_description: "Interaction required" }
        },
        { status: 200, parsedBody: deviceCodeResponse },
        { status: 200, parsedBody: { access_token: "token", expires_in: 5 } }
      ]
    });

    const credential = new DeviceCodeCredential(
      "tenant",
      "client",
      (details) => assert.equal(details.message, deviceCodeResponse.message),
      { ...mockHttpClient.tokenCredentialOptions }
    );

    await credential.getToken("scope");
    const refreshedToken = await credential.getToken("scope");

    if (refreshedToken === null) {
      assert.fail("getToken did not return a refreshed AccessToken");
    } else {
      // Basic verification that the device code flow was re-initiated
      // once the refresh token request failed with "interaction_required"
      const refreshRequest = mockHttpClient.requests[3];
      assert.ok(
        refreshRequest.url.endsWith("devicecode"),
        "Device code authorization request was not re-initiated"
      );
    }
  });

  it("throws an AuthenticationError when the user declines the authorization flow", async function() {
    const mockHttpClient = new MockAuthHttpClient({
      authResponse: [
        { status: 200, parsedBody: deviceCodeResponse },
        { status: 400, parsedBody: pendingResponse },
        { status: 400, parsedBody: pendingResponse },
        {
          status: 400,
          parsedBody: {
            error: "authorization_declined",
            error_description: "",
            correlation_id: "correlation_id",
            trace_id: "trace_id",
            error_codes: [1, 2, 3],
            timestamp: "timestamp"
          } as OAuthErrorResponse
        }
      ]
    });

    const credential = new DeviceCodeCredential(
      "tenant",
      "client",
      (details) => assert.equal(details.message, deviceCodeResponse.message),
      { ...mockHttpClient.tokenCredentialOptions }
    );

    await assertRejects(credential.getToken("scope"), (error) => {
      const authError = error as AuthenticationError;
      assert.strictEqual(error.name, "AuthenticationError");
      assert.strictEqual(authError.errorResponse.error, "authorization_declined");
      assert.strictEqual(authError.errorResponse.correlationId, "correlation_id");
      assert.strictEqual(authError.errorResponse.traceId, "trace_id");
      assert.strictEqual(authError.errorResponse.timestamp, "timestamp");
      assert.deepStrictEqual(authError.errorResponse.errorCodes, [1, 2, 3]);
      return true;
    });
  });

  it("throws an AuthenticationError when the authorization token expires", async function() {
    const mockHttpClient = new MockAuthHttpClient({
      authResponse: [
        { status: 200, parsedBody: deviceCodeResponse },
        { status: 400, parsedBody: pendingResponse },
        { status: 400, parsedBody: pendingResponse },
        { status: 400, parsedBody: { error: "expired_token", error_description: "" } }
      ]
    });

    const credential = new DeviceCodeCredential(
      "tenant",
      "client",
      (details) => assert.equal(details.message, deviceCodeResponse.message),
      { ...mockHttpClient.tokenCredentialOptions }
    );

    await assertRejects(credential.getToken("scope"), (error) => {
      const authError = error as AuthenticationError;
      assert.strictEqual(error.name, "AuthenticationError");
      assert.strictEqual(authError.errorResponse.error, "expired_token");
      return true;
    });
  });

  it("throws an AuthenticationError when the client sends the wrong device code", async function() {
    const mockHttpClient = new MockAuthHttpClient({
      authResponse: [
        { status: 200, parsedBody: deviceCodeResponse },
        { status: 400, parsedBody: { error: "bad_verification_code", error_description: "" } }
      ]
    });

    const credential = new DeviceCodeCredential(
      "tenant",
      "client",
      (details) => assert.equal(details.message, deviceCodeResponse.message),
      { ...mockHttpClient.tokenCredentialOptions }
    );

    await assertRejects(credential.getToken("scope"), (error) => {
      const authError = error as AuthenticationError;
      assert.strictEqual(error.name, "AuthenticationError");
      assert.strictEqual(authError.errorResponse.error, "bad_verification_code");
      return true;
    });
  });

  it("rethrows an unexpected AuthenticationError", async function() {
    const mockHttpClient = new MockAuthHttpClient({
      authResponse: [
        { status: 200, parsedBody: deviceCodeResponse },
        { status: 400, parsedBody: pendingResponse },
        { status: 400, parsedBody: pendingResponse },
        {
          status: 401,
          parsedBody: {
            error: "invalid_client",
            error_description: "The request body must contain..."
          }
        }
      ]
    });

    const credential = new DeviceCodeCredential(
      "tenant",
      "client",
      (details) => assert.equal(details.message, deviceCodeResponse.message),
      { ...mockHttpClient.tokenCredentialOptions }
    );

    await assertRejects(credential.getToken("scope"), (error) => {
      const authError = error as AuthenticationError;
      assert.strictEqual(error.name, "AuthenticationError");
      assert.strictEqual(authError.errorResponse.error, "invalid_client");
      return true;
    });
  });

  describe("tests with delays", function() {
    let delayController: DelayController;
    before(() => {
      delayController = createDelayController();
    });

    it("cancels polling when abort signal is raised", async function() {
      const mockHttpClient = new MockAuthHttpClient({
        authResponse: [
          { status: 200, parsedBody: deviceCodeResponse },
          { status: 400, parsedBody: pendingResponse },
          { status: 400, parsedBody: pendingResponse },
          { status: 200, parsedBody: { access_token: "token", expires_in: 5 } }
        ]
      });

      const credential = new DeviceCodeCredential(
        "tenant",
        "client",
        (details) => assert.equal(details.message, deviceCodeResponse.message),
        { ...mockHttpClient.tokenCredentialOptions }
      );

      const abortController = new AbortController();
      const getTokenPromise = credential.getToken("scope", { abortSignal: abortController.signal });
      // getToken ends up calling pollForToken which normally has a 1000ms delay.
      // This code allows us to control the delay programatically in the test.
      let delay = await delayController.waitForDelay();
      delay.resolve();
      delay = await delayController.waitForDelay();
      // abort the request before the second poll is allowed to complete
      abortController.abort();
      delay.resolve();
      const token = await getTokenPromise;
      assert.strictEqual(token, null);
      assert.strictEqual(mockHttpClient.requests.length, 2);
    });
  });

  it("sends a device code request and returns a token with tracing", async function() {
    const tracer = new TestTracer();
    setTracer(tracer);
    const mockHttpClient = new MockAuthHttpClient({
      authResponse: [
        { status: 200, parsedBody: deviceCodeResponse },
        { status: 400, parsedBody: pendingResponse },
        { status: 400, parsedBody: pendingResponse },
        { status: 400, parsedBody: pendingResponse },
        { status: 200, parsedBody: { access_token: "token", expires_in: 5 } }
      ]
    });

    const rootSpan = tracer.startSpan("root");

    const credential = new DeviceCodeCredential(
      "tenant",
      "client",
      (details) => assert.equal(details.message, deviceCodeResponse.message),
      { ...mockHttpClient.tokenCredentialOptions }
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
              name: "Azure.Identity.DeviceCodeCredential-getToken",
              children: [
                {
                  name: "Azure.Identity.DeviceCodeCredential-sendDeviceCodeRequest",
                  children: [
                    {
                      children: [],
                      name: "/tenant/oauth2/v2.0/devicecode"
                    }
                  ]
                },
                {
                  name: "Azure.Identity.DeviceCodeCredential-pollForToken",
                  children: [
                    // We see 4 traces from core-http here because the client in
                    // this test polls 4 times for the authorization code.
                    {
                      children: [],
                      name: "/tenant/oauth2/v2.0/token"
                    },
                    {
                      children: [],
                      name: "/tenant/oauth2/v2.0/token"
                    },
                    {
                      children: [],
                      name: "/tenant/oauth2/v2.0/token"
                    },
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

    assert.deepStrictEqual(tracer.getSpanGraph(rootSpan.context().traceId), expectedGraph);
    assert.strictEqual(tracer.getActiveSpans().length, 0, "All spans should have had end called");
  });
});
