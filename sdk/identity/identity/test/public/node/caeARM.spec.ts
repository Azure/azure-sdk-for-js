// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { assert } from "chai";
import { delay, env, Recorder } from "@azure-tools/test-recorder";
import { MsalTestCleanup, msalNodeTestSetup } from "../../msalTestUtils";
import {
  AccessToken,
  DeviceCodeCredential,
  TokenCredential,
  UsernamePasswordCredential,
} from "../../../src";
import { Context } from "mocha";
import { IdentityClient } from "../../../src/client/identityClient";
import {
  bearerTokenAuthenticationPolicy,
  createDefaultHttpClient,
  createEmptyPipeline,
  createPipelineRequest,
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
async function challengeFlow(
  credential: TokenCredential,
  recorder: Recorder
): Promise<AccessToken[]> {
  const managementScope = "https://management.azure.com/.default";
  const graphScope = "User.ReadWrite.All";
  const revokeUrl = "https://graph.microsoft.com/v1.0/me/revokeSignInSessions";
  const managementSubscriptions = `${env.AZURE_CAE_MANAGEMENT_ENDPOINT}subscriptions?api-version=2020-01-01`;
  const resultingAccessTokens: AccessToken[] = [];

  // First, we retrieve a graph token valid with access to the management service.
  const managementToken = await credential.getToken(managementScope);
  assert.ok(managementToken?.token);
  assert.ok(managementToken?.expiresOnTimestamp! > Date.now());
  resultingAccessTokens.push(managementToken!);

  const client = new IdentityClient(recorder.configureClientOptions({}));

  // A first request to the subscriptions endpoint should work
  const subscriptionsRequest = await client.sendGetRequestAsync(managementSubscriptions, {
    headers: {
      Authorization: `Bearer ${managementToken!.token}`,
    },
  });
  assert.equal(subscriptionsRequest.status, 200, "Failed initial subscriptions request");

  // Then, we retrieve a graph token valid to revoke the active sessions.
  const graphToken = await credential.getToken(graphScope);
  assert.ok(graphToken?.token);
  assert.ok(graphToken?.expiresOnTimestamp! > Date.now());

  const subscriptionsRequest2 = await client.sendPostRequestAsync(revokeUrl, {
    headers: {
      Authorization: `Bearer ${graphToken!.token}`,
    },
  });
  assert.equal(subscriptionsRequest2.status, 200, "Revoke request failed");

  // Our goal is to revoke the token, so that the challenge flow can be triggered.
  // me/revokeSignInSessions does not work immediately, so we wait until the service reports the management token is expired.
  // We do this by calling to the me/revokeSignInSessions endpoint outside of the pipeline every so often, until the service stops answering with status code 200.
  let count = 0;
  while (count < 100) {
    const managementResponse = await client.sendGetRequestAsync(managementSubscriptions, {
      headers: {
        Authorization: `Bearer ${managementToken!.token}`,
      },
    });
    if (managementResponse.status !== 200) {
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
      scopes: [managementScope],
      credential,
      challengeCallbacks: {
        async authorizeRequest({ request }): Promise<void> {
          request.headers.set("Authorization", `Bearer ${managementToken!.token}`);
        },
        authorizeRequestOnChallenge: authorizeRequestOnClaimChallenge,
      },
    })
  );
  pipeline.addPolicy(recorder.configureClientOptions({}).additionalPolicies![0].policy);
  const httpClient = createDefaultHttpClient();

  // Sending a final request through the pipeline.
  // On the recordings, we should see that:
  // 1. This request fails with 401 and has a WWW-Authenticate header in its response.
  // 2. Then we do a token request with the claims received from the challenge.
  // 3. Then the original request is repeated and succeeds.
  const finalResponse = await pipeline.sendRequest(
    httpClient,
    createPipelineRequest({
      url: managementSubscriptions,
      method: "GET",
    })
  );
  assert.equal(finalResponse.status, 200, "Final response failed.");

  // Getting a new token at this point should return a token different from the initially obtained.
  // Recordings help us verify that the internal flow indeed happened.
  const finalAccessToken = await credential.getToken(managementScope);
  assert.ok(finalAccessToken?.token);
  assert.ok(finalAccessToken?.expiresOnTimestamp! > Date.now());
  resultingAccessTokens.push(finalAccessToken!);

  return resultingAccessTokens;
}

// Unskip and re-record after this PR is merged:
// https://github.com/AzureAD/microsoft-authentication-library-for-js/pull/4533
describe.skip("CAE", function () {
  let cleanup: MsalTestCleanup;
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    const setup = await msalNodeTestSetup(this.currentTest);
    cleanup = setup.cleanup;
    recorder = setup.recorder;
  });
  afterEach(async function () {
    await cleanup();
  });

  it("DeviceCodeCredential", async function (this: Context) {
    const [firstAccessToken, finalAccessToken] = await challengeFlow(
      new DeviceCodeCredential(recorder.configureClientOptions({ tenantId: env.AZURE_TENANT_ID })),
      recorder
    );

    assert.notDeepEqual(firstAccessToken, finalAccessToken);
  });

  it("UsernamePasswordCredential", async function (this: Context) {
    // Important: Recording this test may only work in certain tenants.

    const [firstAccessToken, finalAccessToken] = await challengeFlow(
      new UsernamePasswordCredential(
        env.AZURE_TENANT_ID!,
        DeveloperSignOnClientId,
        env.AZURE_USERNAME!,
        env.AZURE_PASSWORD!,
        recorder.configureClientOptions({})
      ),
      recorder
    );

    assert.notDeepEqual(firstAccessToken, finalAccessToken);
  });
});
