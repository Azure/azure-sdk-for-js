// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { assert } from "chai";
import { delay, env, isPlaybackMode } from "@azure-tools/test-recorder";
import { MsalTestCleanup, msalNodeTestSetup } from "../../msalTestUtils";
import { DeviceCodeCredential } from "../../../src";
import { Context } from "mocha";
import { IdentityClient } from "../../../src/client/identityClient";
import {
  bearerTokenAuthenticationPolicy,
  createDefaultHttpClient,
  createEmptyPipeline,
  createPipelineRequest
} from "@azure/core-rest-pipeline";
import { authorizeRequestOnClaimChallenge } from "@azure/core-client";

describe("CAE", function() {
  let cleanup: MsalTestCleanup;
  beforeEach(function(this: Context) {
    cleanup = msalNodeTestSetup(this).cleanup;
  });
  afterEach(async function() {
    await cleanup();
  });

  it("DeviceCodeCredential", async function(this: Context) {
    if (!isPlaybackMode()) {
      this.skip();
    }

    const graphScope = "https://graph.microsoft.com/User.ReadWrite.All";
    const revokeUrl = "https://graph.microsoft.com/v1.0/me/revokeSignInSessions";

    // Important: Recording test may only work in certain tenants.
    const credential = new DeviceCodeCredential({ tenantId: env.AZURE_TENANT_ID });

    // First, we retrieve a graph token valid to revoke the active sessions.
    const graphToken = await credential.getToken(graphScope);
    assert.ok(graphToken?.token);
    assert.ok(graphToken?.expiresOnTimestamp! > Date.now());

    // Our goal is to revoke the token, so that the challenge flow can be triggered.
    // me/revokeSignInSessions does not work immediately, so we wait until the service reports the management token is expired.
    // We do this by calling to the me/revokeSignInSessions endpoint outside of the pipeline every so often, until the service stops answering with status code 200.
    let count = 0;
    const client = new IdentityClient();
    while (count < 100) {
      const subscriptionsRequest = await client.sendPostRequestAsync(revokeUrl, {
        headers: {
          Authorization: `Bearer ${graphToken!.token}`
        }
      });
      if (subscriptionsRequest.status !== 200) {
        break;
      }
      // This log line helps us see how long this is taking on record mode.
      console.log("revoke 200", count++);
      await delay(30000);
    }

    // Setting up a simple pipeline that uses the original token that should be invalid now.
    // This pipeline will trigger the CAE challenge and handle the CAE flow.
    const pipeline = createEmptyPipeline();
    pipeline.addPolicy(
      bearerTokenAuthenticationPolicy({
        scopes: [graphScope],
        credential,
        challengeCallbacks: {
          async authorizeRequest({ request }): Promise<void> {
            request.headers.set("Authorization", `Bearer ${graphToken.token}`);
          },
          authorizeRequestOnChallenge: authorizeRequestOnClaimChallenge
        }
      })
    );
    const httpClient = createDefaultHttpClient();

    // Sending a final request through the pipeline.
    // On the recordings, we should see that:
    // 1. This request fails with 401 and has a WWW-Authenticate header in its response.
    // 2. Then we do a token request with the claims received from the challenge.
    // 3. Then the original request is repeated and succeeds.
    const subscriptions = await pipeline.sendRequest(
      httpClient,
      createPipelineRequest({
        url: revokeUrl,
        method: "POST"
      })
    );
    assert.equal(subscriptions.status, 200, "Final response failed.");

    // Getting a new token at this point should return a token different from the initially obtained.
    // Recordings help us verify that the internal flow indeed happened.
    const finalAccessToken = await credential.getToken(graphScope);
    assert.ok(finalAccessToken?.token);
    assert.ok(finalAccessToken?.expiresOnTimestamp! > Date.now());
    assert.notDeepEqual(graphToken, finalAccessToken);
  });
});
