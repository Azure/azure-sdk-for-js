// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "assert";
import { delay } from "@azure/core-http";
import { AbortController } from "@azure/abort-controller";
import { MockAuthHttpClient, assertRejects } from "../authTestUtils";
import { AuthenticationError, ErrorResponse } from "../../src/client/errors";
import { DeviceCodeCredential, DeviceCodeResponse } from '../../src/credentials/deviceCodeCredential';

const deviceCodeResponse: DeviceCodeResponse = {
  interval: 1,
  expires_in: 20,
  verification_uri: "https://contoso.com/devicelogin",
  device_code: "XXXXXXXXXXXXXXXXXX",
  user_code: "B3920934",
  message: "Visit https://contoso.com/devicelogin and enter code B3920934",
}

const pendingResponse: ErrorResponse = {
  error: "authorization_pending",
  error_description: "Waiting for user to authenticate"
};

describe("DeviceCodeCredential", function () {
  this.timeout(10000); // eslint-disable-line no-invalid-this

  it("sends a device code request and returns a token when the user completes it", async function() {
    const mockHttpClient = new MockAuthHttpClient({
      authResponse: [
        { status: 200, parsedBody: deviceCodeResponse },
        { status: 400, parsedBody: pendingResponse },
        { status: 400, parsedBody: pendingResponse },
        { status: 400, parsedBody: pendingResponse },
        { status: 200, parsedBody: { access_token: "token", expires_in: 5 } },
      ]
    });

    const credential = new DeviceCodeCredential(
      "tenant",
      "client",
      details => assert.equal(details.message, deviceCodeResponse.message),
      mockHttpClient.identityClientOptions
    );

    const accessToken = await credential.getToken("scope");
    const currentTimestamp = Date.now() + 5000;

    if (accessToken === null) {
      assert.fail("getToken did not return an AccessToken")
    } else {
      assert.strictEqual(accessToken.token, "token")
      assert.ok(
        accessToken.expiresOnTimestamp >= currentTimestamp - 1000
        && accessToken.expiresOnTimestamp <= currentTimestamp,
        `AccessToken.expiresOnTimestamp is not ~${currentTimestamp}: ${accessToken.expiresOnTimestamp}`);
    }
  });

  it("refreshes the access token on subsequent getToken requests", async function() {
    const mockHttpClient = new MockAuthHttpClient({
      authResponse: [
        { status: 200, parsedBody: deviceCodeResponse },
        { status: 200, parsedBody: { access_token: "token", expires_in: 5, refresh_token: "ABC123" } },
        { status: 200, parsedBody: { access_token: "token", expires_in: 5, refresh_token: "ABC123" } },
      ]
    });

    const credential = new DeviceCodeCredential(
      "tenant",
      "client",
      details => assert.equal(details.message, deviceCodeResponse.message),
      mockHttpClient.identityClientOptions
    );

    await credential.getToken("scope");
    const refreshedToken = await credential.getToken("scope");

    if (refreshedToken === null) {
      assert.fail("getToken did not return a refreshed AccessToken")
    } else {
      // Basic verification that a refresh request was made with the
      // refresh_token returned by the previous request
      const refreshRequest = mockHttpClient.requests[2];
      assert.ok(
        refreshRequest.body.indexOf(`grant_type=refresh_token`) > -1,
        "Request does not contain refresh_token grant type");
      assert.ok(
        refreshRequest.body.indexOf(`refresh_token=ABC123`) > -1,
        "Request does not contain refresh token");
    }
  });

  it("re-initiates the device code flow when the refresh token expires", async function() {
    const mockHttpClient = new MockAuthHttpClient({
      authResponse: [
        { status: 200, parsedBody: deviceCodeResponse },
        { status: 200, parsedBody: { access_token: "token", expires_in: 5, refresh_token: "ABC123" } },
        { status: 400, parsedBody: { error: "interaction_required", error_description: "Interaction required" } },
        { status: 200, parsedBody: deviceCodeResponse },
        { status: 200, parsedBody: { access_token: "token", expires_in: 5 } },
      ]
    });

    const credential = new DeviceCodeCredential(
      "tenant",
      "client",
      details => assert.equal(details.message, deviceCodeResponse.message),
      mockHttpClient.identityClientOptions
    );

    await credential.getToken("scope");
    const refreshedToken = await credential.getToken("scope");

    if (refreshedToken === null) {
      assert.fail("getToken did not return a refreshed AccessToken")
    } else {
      // Basic verification that the device code flow was re-initiated
      // once the refresh token request failed with "interaction_required"
      const refreshRequest = mockHttpClient.requests[3];
      assert.ok(
        refreshRequest.url.endsWith("devicecode"),
        "Device code authorization request was not re-initiated");
    }
  });

  it("throws an AuthenticationError when the user declines the authorization flow", async function() {
    const mockHttpClient = new MockAuthHttpClient({
      authResponse: [
        { status: 200, parsedBody: deviceCodeResponse },
        { status: 400, parsedBody: pendingResponse },
        { status: 400, parsedBody: pendingResponse },
        { status: 400, parsedBody: { error: "authorization_declined", error_description: "" }},
      ]
    });

    const credential = new DeviceCodeCredential(
      "tenant",
      "client",
      details => assert.equal(details.message, deviceCodeResponse.message),
      mockHttpClient.identityClientOptions
    );

    await assertRejects(
      credential.getToken("scope"),
      error => {
        const authError = error as AuthenticationError;
        assert.strictEqual(error.name, 'AuthenticationError')
        assert.strictEqual(authError.errorResponse.error, "authorization_declined")
        return true;
      });
  });

  it("throws an AuthenticationError when the authorization token expires", async function() {
    const mockHttpClient = new MockAuthHttpClient({
      authResponse: [
        { status: 200, parsedBody: deviceCodeResponse },
        { status: 400, parsedBody: pendingResponse },
        { status: 400, parsedBody: pendingResponse },
        { status: 400, parsedBody: { error: "expired_token", error_description: "" }},
      ]
    });

    const credential = new DeviceCodeCredential(
      "tenant",
      "client",
      details => assert.equal(details.message, deviceCodeResponse.message),
      mockHttpClient.identityClientOptions
    );

    await assertRejects(
      credential.getToken("scope"),
      error => {
        const authError = error as AuthenticationError;
        assert.strictEqual(error.name, 'AuthenticationError')
        assert.strictEqual(authError.errorResponse.error, "expired_token")
        return true;
      });
  });

  it("throws an AuthenticationError when the client sends the wrong device code", async function() {
    const mockHttpClient = new MockAuthHttpClient({
      authResponse: [
        { status: 200, parsedBody: deviceCodeResponse },
        { status: 400, parsedBody: { error: "bad_verification_code", error_description: "" }},
      ]
    });

    const credential = new DeviceCodeCredential(
      "tenant",
      "client",
      details => assert.equal(details.message, deviceCodeResponse.message),
      mockHttpClient.identityClientOptions
    );

    await assertRejects(
      credential.getToken("scope"),
      error => {
        const authError = error as AuthenticationError;
        assert.strictEqual(error.name, 'AuthenticationError')
        assert.strictEqual(authError.errorResponse.error, "bad_verification_code")
        return true;
      });
  });

  it("cancels polling when abort signal is raised", async function() {
    const mockHttpClient = new MockAuthHttpClient({
      authResponse: [
        { status: 200, parsedBody: deviceCodeResponse },
        { status: 400, parsedBody: pendingResponse },
        { status: 400, parsedBody: pendingResponse },
        { status: 200, parsedBody: { access_token: "token", expires_in: 5 } },
      ]
    });

    const credential = new DeviceCodeCredential(
      "tenant",
      "client",
      details => assert.equal(details.message, deviceCodeResponse.message),
      mockHttpClient.identityClientOptions
    );

    const abortController = new AbortController();
    const getTokenPromise = credential.getToken("scope", { abortSignal: abortController.signal });
    await delay(1500); // Long enough for device code request and one polling request
    abortController.abort();

    const token = await getTokenPromise;

    assert.strictEqual(token, null);
    assert.strictEqual(mockHttpClient.requests.length, 2);
  });
});
