// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CommunicationAccessToken,
  CommunicationIdentityClient,
  GetTokenForTeamsUserOptions,
} from "../../../src";
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
    let options: GetTokenForTeamsUserOptions = {
      teamsUserAadToken: sanitizedValue,
      clientId: sanitizedValue,
      userObjectId: sanitizedValue,
    };

    before(async function (this: Context) {
      const skipTests = env.SKIP_INT_IDENTITY_EXCHANGE_TOKEN_TEST === "true";
      if (skipTests) {
        this.skip();
      }
      if (!isPlaybackMode()) {
        options = await fetchParamsForGetTokenForTeamsUser();
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

    async function fetchParamsForGetTokenForTeamsUser(): Promise<GetTokenForTeamsUserOptions> {
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
      const getTokenForTeamsUserOptions: GetTokenForTeamsUserOptions = {
        teamsUserAadToken: response!.accessToken,
        clientId: env.COMMUNICATION_M365_APP_ID ?? "",
        userObjectId: response!.uniqueId,
      };
      return getTokenForTeamsUserOptions;
    }

    it("successfully exchanges a Teams User AAD token for a Communication access token", async function () {
      const { token, expiresOn }: CommunicationAccessToken = await client.getTokenForTeamsUser(
        options
      );
      assert.isString(token);
      assert.instanceOf(expiresOn, Date);
    }).timeout(5000);

    given([
      { teamsUserAadToken: "", description: "an empty teamsUserAadToken" },
      { teamsUserAadToken: "invalid", description: "an invalid teamsUserAadToken" },
      {
        teamsUserAadToken: env.COMMUNICATION_EXPIRED_TEAMS_TOKEN ?? "",
        description: "an expired teamsUserAadToken",
      },
    ]).it("throws an error when attempting to exchange", async function (input) {
      try {
        if (isPlaybackMode()) {
          input.teamsUserAadToken = sanitizedValue;
        }
        await client.getTokenForTeamsUser({
          teamsUserAadToken: input.teamsUserAadToken,
          clientId: options.clientId,
          userObjectId: options.clientId,
        });
      } catch (e: any) {
        assert.equal(e.statusCode, 401);
        return;
      }

      assert.fail("Should have thrown an error");
    });

    given([
      { clientId: "", description: "an empty clientId" },
      { clientId: "invalid", description: "an invalid clientId" },
      { clientId: options.userObjectId, description: "a wrong clientId" },
    ]).it("throws an error when attempting to exchange", async function (input) {
      try {
        if (isPlaybackMode()) {
          input.clientId = sanitizedValue;
        }
        await client.getTokenForTeamsUser({
          teamsUserAadToken: options.teamsUserAadToken,
          clientId: input.clientId,
          userObjectId: options.userObjectId,
        });
      } catch (e: any) {
        assert.equal(e.statusCode, 400);
        return;
      }

      assert.fail("Should have thrown an error");
    });

    given([
      { userObjectId: "", description: "an empty userObjectId" },
      { userObjectId: "invalid", description: "an invalid userObjectId" },
      { userObjectId: options.clientId, description: "a wrong userObjectId" },
    ]).it("throws an error when attempting to exchange", async function (input) {
      try {
        if (isPlaybackMode()) {
          input.userObjectId = sanitizedValue;
        }
        await client.getTokenForTeamsUser({
          teamsUserAadToken: options.teamsUserAadToken,
          clientId: options.clientId,
          userObjectId: input.userObjectId,
        });
      } catch (e: any) {
        assert.equal(e.statusCode, 400);
        return;
      }

      assert.fail("Should have thrown an error");
    });
  });
});
