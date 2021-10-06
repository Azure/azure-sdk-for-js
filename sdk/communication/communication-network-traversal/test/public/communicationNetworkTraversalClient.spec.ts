// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommunicationUserIdentifier } from "@azure/communication-common";
import { assert } from "chai";
import { Recorder, env } from "@azure-tools/test-recorder";
import { CommunicationRelayClient } from "../../src";
import { CommunicationIdentityClient } from "@azure/communication-identity";
import {
  createRecordedCommunicationRelayClient,
  createRecordedCommunicationRelayClientWithToken
} from "./utils/recordedClient";
import { Context } from "mocha";
import { matrix } from "@azure/test-utils";

matrix([[true, false]], async function(useAad) {
  describe(`CommunicationNetworkingClient [Playback/Live]${useAad ? " [AAD]" : ""}`, function() {
    let recorder: Recorder;
    let client: CommunicationRelayClient;

    beforeEach(function(this: Context) {
      if (useAad) {
        ({ client, recorder } = createRecordedCommunicationRelayClientWithToken(this));
      } else {
        ({ client, recorder } = createRecordedCommunicationRelayClient(this));
      }
    });

    afterEach(async function(this: Context) {
      if (!this.currentTest?.isPending()) {
        await recorder.stop();
      }
    });

    it("successfully gets a turn credential", async function() {
      const connectionString = env.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING;
      const identityClient = new CommunicationIdentityClient(connectionString);
      const user: CommunicationUserIdentifier = await identityClient.createUser();

      const turnCredentialResponse = await client.getRelayConfiguration(user);
      assert.isNotNull(turnCredentialResponse);

      const turnTokenExpiresOn = turnCredentialResponse.expiresOn;
      assert.isNotNull(turnTokenExpiresOn);

      const turnServers = turnCredentialResponse.iceServers;

      for (const iceServer of turnServers) {
        for (const url of iceServer.urls) {
          assert.isNotNull(url);
        }
        assert.isNotNull(iceServer.username);
        assert.isNotNull(iceServer.credential);
      }
    }).timeout(5000);
  });
});
