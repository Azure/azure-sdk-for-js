// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { matrix } from "@azure/test-utils";
import { env, isPlaybackMode, Recorder } from "@azure-tools/test-recorder";
import { UsernamePasswordCredential } from "@azure/identity";
import { CommunicationAccessToken, CommunicationIdentityClient } from "../../../src";
import {
  createRecordedCommunicationIdentityClient,
  createRecordedCommunicationIdentityClientWithToken
} from "../utils/recordedClient";
import { Context } from "mocha";

matrix([[true, false]], async function(useAad) {
  describe(`Exchange Teams token for ACS token [Playback/Live]${
    useAad ? " [AAD]" : ""
  }`, function() {
    let recorder: Recorder;
    let client: CommunicationIdentityClient;

    before(function(this: Context) {
      const skipTests = env.SKIP_INT_IDENTITY_EXCHANGE_TOKEN_TEST === "true";
      if (skipTests) {
        this.skip();
      } else if (isPlaybackMode()) {
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

    it("successfully exchanges a Teams token for an ACS token", async function() {
      recorder.skip();

      const credential = new UsernamePasswordCredential(
        env.COMMUNICATION_M365_AAD_TENANT,
        env.COMMUNICATION_M365_APP_ID,
        env.COMMUNICATION_MSAL_USERNAME,
        env.COMMUNICATION_MSAL_PASSWORD
      );

      const response = await credential.getToken([env.COMMUNICATION_M365_SCOPE]);
      assert.isNotNull(response);

      const { token, expiresOn }: CommunicationAccessToken = await client.exchangeTeamsToken(
        response!.token
      );
      assert.isString(token);
      assert.instanceOf(expiresOn, Date);
    }).timeout(5000);

    it("throws an error when attempting to exchange an invalid Teams token", async function() {
      recorder.skip();

      try {
        await client.exchangeTeamsToken("invalid");
      } catch (e) {
        assert.equal(e.statusCode, 401);
        return;
      }

      assert.fail("Should have thrown an error");
    });
  });
});
