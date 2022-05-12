// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommunicationAccessToken, CommunicationIdentityClient } from "../../../src";
import { Recorder, env, isPlaybackMode } from "@azure-tools/test-recorder";
import {
  createRecordedCommunicationIdentityClient,
  createRecordedCommunicationIdentityClientWithToken,
} from "../utils/recordedClient";
import { PublicClientApplication } from "@azure/msal-node";
import { matrix } from "@azure/test-utils";
import { Context } from "mocha";
import { assert } from "chai";
import { given } from "mocha-testdata";

matrix([[true, false]], async function (useAad) {
  describe(`Get Token For Teams User [Playback/Live]${useAad ? " [AAD]" : ""}`, function () {
    let recorder: Recorder;
    let client: CommunicationIdentityClient;
    const sanitizedValue = "sanitized";
    let params = {
      teamsToken: sanitizedValue,
      appId: sanitizedValue,
      userId: sanitizedValue,
    };

    before(async function (this: Context) {
      const skipTests = env.SKIP_INT_IDENTITY_EXCHANGE_TOKEN_TEST === "true";
      if (skipTests) {
        this.skip();
      }
      if (!isPlaybackMode()) {
        params = await fetchParamsForGetTokenForTeamsUser();
      }
    });

    beforeEach(async function (this: Context) {
      if (useAad) {
        ({ client, recorder } = await createRecordedCommunicationIdentityClientWithToken(this));
      } else {
        ({ client, recorder } = await createRecordedCommunicationIdentityClient(this));
      }
    });

    afterEach(async function (this: Context) {
      if (!this.currentTest?.isPending()) {
        await recorder.stop();
      }
    });

    async function fetchParamsForGetTokenForTeamsUser() {
      const msalConfig = {
        auth: {
          clientId: env.COMMUNICATION_M365_APP_ID ?? "",
          authority: env.COMMUNICATION_M365_AAD_AUTHORITY + "/" + env.COMMUNICATION_M365_AAD_TENANT,
        },
      };
      const msalInstance = new PublicClientApplication(msalConfig);
      const usernamePasswordRequest = {
        scopes: [env.COMMUNICATION_M365_SCOPE ?? ""],
        username: env.COMMUNICATION_MSAL_USERNAME ?? "",
        password: env.COMMUNICATION_MSAL_PASSWORD ?? "",
      };
      const response = await msalInstance.acquireTokenByUsernamePassword(usernamePasswordRequest);
      params.teamsToken = response!.accessToken;
      params.appId = env.COMMUNICATION_M365_APP_ID ?? "";
      params.userId = response!.account!.homeAccountId.split(".")[0];
      return params;
    }

    it("successfully exchanges a Teams User AAD token for a Communication access token", async function () {
      const { token, expiresOn }: CommunicationAccessToken = await client.getTokenForTeamsUser({
        teamsUserAadToken: params.teamsToken,
        appId: params.appId,
        userId: params.userId,
      });
      assert.isString(token);
      assert.instanceOf(expiresOn, Date);
    }).timeout(5000);

    given([
      { teamsToken: "", description: "an empty teamsToken" },
      { teamsToken: "invalid", description: "an invalid teamsToken" },
      {
        teamsToken: env.COMMUNICATION_EXPIRED_TEAMS_TOKEN ?? "",
        description: "an expired teamsToken",
      },
    ]).it("throws an error when attempting to exchange", async function (input) {
      try {
        if (isPlaybackMode()) {
          input.teamsToken = sanitizedValue;
        }
        await client.getTokenForTeamsUser({
          teamsUserAadToken: params.teamsToken,
          appId: params.appId,
          userId: params.userId,
        });
      } catch (e: any) {
        assert.equal(e.statusCode, 401);
        return;
      }

      assert.fail("Should have thrown an error");
    });

    given([
      { appId: "", description: "an empty appId" },
      { appId: "invalid", description: "an invalid appId" },
      { appId: params.userId, description: "a wrong appId" },
    ]).it("throws an error when attempting to exchange", async function (input) {
      try {
        if (isPlaybackMode()) {
          input.appId = sanitizedValue;
        }
        await client.getTokenForTeamsUser({
          teamsUserAadToken: params.teamsToken,
          appId: params.appId,
          userId: params.userId,
        });
      } catch (e: any) {
        assert.equal(e.statusCode, 400);
        return;
      }

      assert.fail("Should have thrown an error");
    });

    given([
      { userId: "", description: "an empty userId" },
      { userId: "invalid", description: "an invalid userId" },
      { userId: params.appId, description: "a wrong userId" },
    ]).it("throws an error when attempting to exchange", async function (input) {
      try {
        if (isPlaybackMode()) {
          input.userId = sanitizedValue;
        }
        await client.getTokenForTeamsUser({
          teamsUserAadToken: params.teamsToken,
          appId: params.appId,
          userId: params.userId,
        });
      } catch (e: any) {
        assert.equal(e.statusCode, 400);
        return;
      }

      assert.fail("Should have thrown an error");
    });
  });
});
