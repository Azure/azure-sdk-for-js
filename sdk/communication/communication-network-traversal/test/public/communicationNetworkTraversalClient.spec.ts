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

    it("successfully gets a turn credential with user identity", async function() {
      const connectionString = env.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING;
      const identityClient = new CommunicationIdentityClient(connectionString);
      const user: CommunicationUserIdentifier = await identityClient.createUser();

      const turnCredentialResponse = await client.getRelayConfiguration(user);
      assert.isNotNull(turnCredentialResponse);

      const turnTokenExpiresOn = turnCredentialResponse.expiresOn;
      assert.isNotNull(turnTokenExpiresOn);

      const turnServers = turnCredentialResponse.iceServers;

      // Should return both ANY and NEAREST routeType iceServers
      assert.equal(turnServers.length, 2);

      for (const iceServer of turnServers) {
        for (const url of iceServer.urls) {
          assert.isNotNull(url);
        }

        assert.isNotNull(iceServer.username);
        assert.isNotNull(iceServer.credential);
        assert.isNotNull(iceServer.routeType);
      }
    }).timeout(5000);

    it("successfully gets a turn credential without providing a user identity", async function() {
      const turnCredentialResponse = await client.getRelayConfiguration();
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
        assert.isNotNull(iceServer.routeType);
      }
    }).timeout(5000);

    it("successfully gets a turn credential with identity and routeType any", async function() {
      const connectionString = env.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING;
      const identityClient = new CommunicationIdentityClient(connectionString);
      const user: CommunicationUserIdentifier = await identityClient.createUser();

      const turnCredentialResponse = await client.getRelayConfiguration(user, "any");
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
        assert.isNotNull(iceServer.routeType);
        assert.equal(iceServer.routeType, "any");
      }
    }).timeout(5000);

    it("successfully gets a turn credential with identity routeType nearest", async function() {
      const connectionString = env.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING;
      const identityClient = new CommunicationIdentityClient(connectionString);
      const user: CommunicationUserIdentifier = await identityClient.createUser();

      const turnCredentialResponse = await client.getRelayConfiguration(user, "nearest");
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
        assert.isNotNull(iceServer.routeType);
        assert.equal(iceServer.routeType, "nearest");
      }
    }).timeout(5000);
  });
});
