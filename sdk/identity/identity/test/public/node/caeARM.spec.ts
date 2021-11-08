// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { assert } from "chai";
import { delay, env, isPlaybackMode } from "@azure-tools/test-recorder";
import { MsalTestCleanup, msalNodeTestSetup } from "../../msalTestUtils";
import {
  AccessToken,
  DeviceCodeCredential,
  TokenCredential,
  UsernamePasswordCredential
} from "../../../src";
import { Context } from "mocha";
import { IdentityClient } from "../../../src/client/identityClient";
import {
  bearerTokenAuthenticationPolicy,
  createDefaultHttpClient,
  createEmptyPipeline,
  createPipelineRequest
} from "@azure/core-rest-pipeline";
import { authorizeRequestOnClaimChallenge } from "@azure/core-client";
import { DeveloperSignOnClientId } from "../../../src/constants";

/**
 * Sequence of events needed to test the CAE challenges on the Graph endpoint.
 *
 * NOTE:
 * Although in our tests, the Graph endpoint did answer with the same challenges one would receive with ARM requests
 * (which can be verified through the recordings), the Graph endpoint historically has had a different format for the claims
 * (not a base64 quoted string, but a plain JSON). We did not see this different format in our tests
 * (and so the recordings do not have this different format).
 */
async function graphChallengeFlow(credential: TokenCredential): Promise<AccessToken[]> {
  const graphScope = "https://graph.microsoft.com/User.ReadWrite.All";
  const revokeUrl = "https://graph.microsoft.com/v1.0/me/revokeSignInSessions";
  const resultingAccessTokens: AccessToken[] = [];

  // First, we retrieve a graph token valid to revoke the active sessions.
  const graphToken = await credential.getToken(graphScope);
  assert.ok(graphToken?.token);
  assert.ok(graphToken?.expiresOnTimestamp! > Date.now());
  resultingAccessTokens.push(graphToken!);

  // Our goal is to revoke the token, so that the challenge flow can be triggered.
  // me/revokeSignInSessions does not work immediately, so we wait until the service reports the management token is expired.
  // We do this by calling to the me/revokeSignInSessions endpoint outside of the pipeline every so often, until the service stops answering with status code 200.
  const client = new IdentityClient();
  let count = 0;
  // The only way this is going to finish in a reasonable time is if the token is revoked by the service.
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
    console.log(
      "Waiting for the revocation of the token. Retrying in 30 seconds. Retry number",
      ++count
    );
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
          request.headers.set("Authorization", `Bearer ${graphToken!.token}`);
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
  const finalResponse = await pipeline.sendRequest(
    httpClient,
    createPipelineRequest({
      url: revokeUrl,
      method: "POST"
    })
  );
  assert.equal(finalResponse.status, 200, "Final response failed.");

  // Getting a new token at this point should return a token different from the initially obtained.
  // Recordings help us verify that the internal flow indeed happened.
  const finalAccessToken = await credential.getToken(graphScope);
  assert.ok(finalAccessToken?.token);
  assert.ok(finalAccessToken?.expiresOnTimestamp! > Date.now());
  resultingAccessTokens.push(finalAccessToken!);

  return resultingAccessTokens;
}

describe("CAE", function() {
  let cleanup: MsalTestCleanup;
  beforeEach(function(this: Context) {
    cleanup = msalNodeTestSetup(this).cleanup;
  });
  afterEach(async function() {
    await cleanup();
  });

  it("DeviceCodeCredential", async function(this: Context) {
    // Important: Recording this test may only work in certain tenants.

    // Improtant:
    // After recording these tests, the scopes in the recordings need to be changed manually.
    // This is because MSAL is changing the scopes here: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/a81fcef3d82523e03828d91bb0ee8d2ab2cc20d8/lib/msal-common/src/request/RequestParameterBuilder.ts#L49-L53
    // in a way that breaks the recorder's sanitizeScopeUrl: https://github.com/Azure/azure-sdk-for-js/blob/1514d847f5a4fdb868d0407f40dcf308e5086f5a/sdk/test-utils/recorder/src/utils/index.ts#L539-L541

    if (!isPlaybackMode()) {
      this.skip();
    }

    const [firstAccessToken, finalAccessToken] = await graphChallengeFlow(
      new DeviceCodeCredential({ tenantId: env.AZURE_TENANT_ID })
    );

    // Important:
    // IN PLAYBACK MODE...
    // Verifying that the first access token and the final one are different will not work consistently in this test.
    // The recorder strips out the access tokens from the responses on the recordings.
    if (!isPlaybackMode()) {
      assert.notDeepEqual(firstAccessToken, finalAccessToken);
    }
  });

  it("UsernamePasswordCredential", async function(this: Context) {
    // Important: Recording this test may only work in certain tenants.

    if (!isPlaybackMode()) {
      this.skip();
    }

    const [firstAccessToken, finalAccessToken] = await graphChallengeFlow(
      new UsernamePasswordCredential(
        env.AZURE_TENANT_ID,
        DeveloperSignOnClientId,
        env.AZURE_USERNAME,
        env.AZURE_PASSWORD
      )
    );

    // Important:
    // IN PLAYBACK MODE...
    // Verifying that the first access token and the final one are different will not work consistently in this test.
    // The recorder strips out the access tokens from the responses on the recordings.
    if (!isPlaybackMode()) {
      assert.notDeepEqual(firstAccessToken, finalAccessToken);
    }
  });
});
