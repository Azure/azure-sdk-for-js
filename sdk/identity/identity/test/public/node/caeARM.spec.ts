// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { assert } from "chai";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
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
import { delay } from "@azure/core-util";
import { authorizeRequestOnClaimChallenge } from "@azure/core-client";

describe("CAE on ARM clients", function() {
  let cleanup: MsalTestCleanup;
  beforeEach(function(this: Context) {
    cleanup = msalNodeTestSetup(this).cleanup;
  });
  afterEach(async function() {
    await cleanup();
  });

  it("authenticates", async function(this: Context) {
    if (!isPlaybackMode()) {
      this.skip();
    }

    // This test first retrieves a token, then revokes this token.
    // Right afterwards, it forces an HTTP pipeline to use the revoked token
    // with a specific management endpoint that supports challenges,
    // which in turn triggers the CAE challenge flow.
    // Finally, this test verifies that the credential token has indeed changed.
    //
    // Note: this test relies on recordings to validate the underlying expected network requests.

    const credential = new DeviceCodeCredential({
      tenantId: env.AZURE_TENANT_ID
    });

    // Retrieving a token
    const token = await credential.getToken("User.ReadWrite.All");
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());

    // Revoking that token, which is about the same as to wait for that token to expire.
    const client = new IdentityClient();
    const response = await client.sendPostRequestAsync(
      "https://graph.microsoft.com/v1.0/me/revokeSignInSessions",
      {
        headers: {
          Authorization: `Bearer ${token!.token}`,
          "Content-Type": "application/json"
        }
      }
    );
    assert.equal(response.status, 200, "Session revocation failed");
    await delay(400);

    // Setting up a simple pipeline that uses the revoked token on its first request.
    // This emulates using an expired token.
    // We use a management endpoint that we know supports this feature.
    const managementScopes = ["https://management.azure.com/.default"];
    const pipeline = createEmptyPipeline();
    const bearerPolicy = bearerTokenAuthenticationPolicy({
      scopes: managementScopes,
      credential,
      challengeCallbacks: {
        async authorizeRequest({ request }) {
          // Forcing the pipeline to use the revoked token.
          request.headers.set("Authorization", `Bearer ${token!.token}`);
        },
        authorizeRequestOnChallenge: authorizeRequestOnClaimChallenge
      }
    });
    pipeline.addPolicy(bearerPolicy);
    const httpClient = createDefaultHttpClient();
    const pipelineRequest = createPipelineRequest({
      url: `https://${env.CAE_ARM_MANAGEMENT_NAME}.management.azure.com/subscriptions?api-version=2020-01-01`
    });
    await pipeline.sendRequest(httpClient, pipelineRequest);

    // At this point, the management request must have failed then retrieved a new token.
    // Getting a new token at this point should return a token different from the initially obtained.
    // Recordings help us verify that the internal flow indeed happened.
    const newToken = await credential.getToken(managementScopes);
    assert.notDeepEqual(token, newToken);
  });
});
