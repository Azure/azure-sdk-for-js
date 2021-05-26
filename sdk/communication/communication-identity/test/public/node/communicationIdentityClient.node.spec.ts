// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { matrix } from "@azure/test-utils";
import { Recorder } from "@azure/test-utils-recorder";
import * as msal from "@azure/msal-node";
import { CommunicationAccessToken, CommunicationIdentityClient } from "../../../src";
import {
  createRecordedCommunicationIdentityClient,
  createRecordedCommunicationIdentityClientWithToken
} from "../utils/recordedClient";
import { Context } from "mocha";

matrix([[true, false]], async function(useAad) {
  describe(`CommunicationIdentityClient [Playback/Live]${
    useAad ? " [AAD]" : ""
  } [Node specific]`, function() {
    let recorder: Recorder;
    let client: CommunicationIdentityClient;

    beforeEach(function(this: Context) {
      if (useAad) {
        ({ client, recorder } = createRecordedCommunicationIdentityClientWithToken(this));
      } else {
        ({ client, recorder } = createRecordedCommunicationIdentityClient(this));
      }
    });

    afterEach(async function(this: Context) {
      if (!this.currentTest?.isPending()) {
        await recorder.stop();
      }
    });

    it("successfully exchanges an AAD token for an ACS token", async function() {
      const msalConfig = {
        auth: {
          clientId: "VAULT_CLIENT_ID",
          authority: "VAULT_AUTHORITY/VAULT_TENANT_ID"
        }
      };

      var request = {
        username: "VAULT_USERNAME",
        password: "VAULT_PASSWORD",
        scopes: ["VAULT_SCOPE"]
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
    });

    describe("Error Cases: ", async function() {
      it("throws an error when attempting to exchange an invalid AAD token", async function() {
        try {
          await client.exchangeAADtokenForACStoken("invalid");
          assert.fail("Should have thrown an error");
        } catch (e) {
          assert.equal(e.statusCode, 401);
        }
      });
    });
  });
});
