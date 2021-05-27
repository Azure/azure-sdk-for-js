// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { matrix } from "@azure/test-utils";
import { env, isPlaybackMode, Recorder } from "@azure/test-utils-recorder";
import * as msal from "@azure/msal-node";
import { CommunicationAccessToken, CommunicationIdentityClient } from "../../../src";
import {
  createRecordedCommunicationIdentityClient,
  createRecordedCommunicationIdentityClientWithToken
} from "../utils/recordedClient";
import { Context } from "mocha";

matrix([[true, false]], async function(useAad) {
  describe(`Exchange AAD token for ACS token [Playback/Live]${useAad ? " [AAD]" : ""}`, function() {
    let recorder: Recorder;
    let client: CommunicationIdentityClient;

    before(function(this: Context) {
      const skipTests = env.SKIP_INT_IDENTITY_EXCHANGE_TOKEN_TEST === "true";
      if (skipTests) {
        this.skip();
      }
      else if (isPlaybackMode()) {
        this.skip();
      }
    });

    beforeEach(async function(this: Context) {
      if (useAad) {
        ({ client, recorder } = createRecordedCommunicationIdentityClientWithToken(this));
      } else {
        ({ client, recorder } = createRecordedCommunicationIdentityClient(this));
      }

      await recorder.stop();
    });

    afterEach(async function(this: Context) {
      if (!this.currentTest?.isPending()) {
        await recorder.stop();
      }
    });

    it("successfully exchanges an AAD token for an ACS token", async function() {
      recorder.skip();

      const msalConfig = {
        auth: {
          clientId: env.COMMUNICATION_M365_APP_ID,
          authority: `${env.COMMUNICATION_M365_AAD_AUTHORITY}/${env.COMMUNICATION_M365_AAD_TENANT}`
        }
      };

      const request = {
        username: env.COMMUNICATION_MSAL_USERNAME,
        password: env.COMMUNICATION_MSAL_PASSWORD,
        scopes: [env.COMMUNICATION_M365_SCOPE]
      };

      const pca = new msal.PublicClientApplication(msalConfig);

      const response = await pca.acquireTokenByUsernamePassword(request);
      assert.isNotNull(response);

      const {
        token,
        expiresOn
      }: CommunicationAccessToken = await client.exchangeAADtokenForACStoken(response!.accessToken);
      assert.isString(token);
      assert.instanceOf(expiresOn, Date);
    }).timeout(5000);

    it("throws an error when attempting to exchange an invalid AAD token", async function() {
      recorder.skip();

      try {
        await client.exchangeAADtokenForACStoken("invalid");
        assert.fail("Should have thrown an error");
      } catch (e) {
        assert.equal(e.statusCode, 401);
      }
    });
  });
});
