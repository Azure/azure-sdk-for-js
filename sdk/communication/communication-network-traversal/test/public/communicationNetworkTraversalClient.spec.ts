// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import {
  createRecordedCommunicationRelayClient,
  createRecordedCommunicationRelayClientWithToken,
} from "./utils/recordedClient";
import { CommunicationIdentityClient } from "@azure/communication-identity";
import { CommunicationRelayClient } from "../../src";
import { CommunicationUserIdentifier } from "@azure/communication-common";
import { Context } from "mocha";
import { GetRelayConfigurationOptions } from "../../src/models";
import { assert } from "chai";
import { matrix } from "@azure/test-utils";

matrix([[true, false]], async function (useAad: boolean) {
  describe(`CommunicationNetworkingClient [Playback/Live]${useAad ? " [AAD]" : ""}`, function () {
    let recorder: Recorder;
    let relayClient: CommunicationRelayClient;
    let identityClient: CommunicationIdentityClient;

    beforeEach(async function (this: Context) {
      if (useAad) {
        ({ identityClient, relayClient, recorder } =
          await createRecordedCommunicationRelayClientWithToken(this));
      } else {
        ({ identityClient, relayClient, recorder } = await createRecordedCommunicationRelayClient(
          this
        ));
      }
    });

    afterEach(async function (this: Context) {
      if (!this.currentTest?.isPending()) {
        await recorder.stop();
      }
    });

    it("successfully gets a turn credential with user identity", async function () {
      const user: CommunicationUserIdentifier = await identityClient.createUser();
      const options: GetRelayConfigurationOptions = { id: user.communicationUserId };

      const turnCredentialResponse = await relayClient.getRelayConfiguration(options);
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

    it("successfully gets a turn credential without providing a user identity", async function () {
      const turnCredentialResponse = await relayClient.getRelayConfiguration();
      assert.isNotNull(turnCredentialResponse);

      const turnTokenExpiresOn = turnCredentialResponse.expiresOn;
      assert.isNotNull(turnTokenExpiresOn);

      const turnServers = turnCredentialResponse.iceServers;
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

    it("successfully gets a turn credential providing roteType nearest", async function () {
      const options: GetRelayConfigurationOptions = { routeType: "nearest" };
      const turnCredentialResponse = await relayClient.getRelayConfiguration(options);
      assert.isNotNull(turnCredentialResponse);

      const turnTokenExpiresOn = turnCredentialResponse.expiresOn;
      assert.isNotNull(turnTokenExpiresOn);

      const turnServers = turnCredentialResponse.iceServers;
      assert.equal(turnServers.length, 1);

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

    it("successfully gets a turn credential providing roteType any", async function () {
      const options: GetRelayConfigurationOptions = { routeType: "any" };
      const turnCredentialResponse = await relayClient.getRelayConfiguration(options);
      assert.isNotNull(turnCredentialResponse);

      const turnTokenExpiresOn = turnCredentialResponse.expiresOn;
      assert.isNotNull(turnTokenExpiresOn);

      const turnServers = turnCredentialResponse.iceServers;
      assert.equal(turnServers.length, 1);

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

    it("successfully gets a turn credential providing ttl", async function () {
      const requestedTime = new Date();
      const ttl = 4000;

      // Token should expire a few milliseconds earlier than the given 1000 ms margin
      const expectedExpirationTime = new Date();
      expectedExpirationTime.setSeconds(expectedExpirationTime.getSeconds() + ttl + 1000);

      const options: GetRelayConfigurationOptions = { ttl: ttl };
      const turnCredentialResponse = await relayClient.getRelayConfiguration(options);
      const turnTokenExpiresOn = turnCredentialResponse.expiresOn;

      assert.isNotNull(turnCredentialResponse);
      assert.isNotNull(turnTokenExpiresOn);

      if (!isPlaybackMode()) {
        // The token should expire between the requestedTime and the expectedExpirationTime
        assert.isTrue(
          requestedTime <= turnTokenExpiresOn && turnTokenExpiresOn <= expectedExpirationTime
        );
      }

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

    it("successfully gets a turn credential with all options", async function () {
      const user: CommunicationUserIdentifier = await identityClient.createUser();
      const options: GetRelayConfigurationOptions = {
        id: user.communicationUserId,
        routeType: "nearest",
        ttl: 4000,
      };

      const turnCredentialResponse = await relayClient.getRelayConfiguration(options);
      assert.isNotNull(turnCredentialResponse);

      const turnTokenExpiresOn = turnCredentialResponse.expiresOn;
      assert.isNotNull(turnTokenExpiresOn);

      const turnServers = turnCredentialResponse.iceServers;
      assert.equal(turnServers.length, 1);

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
