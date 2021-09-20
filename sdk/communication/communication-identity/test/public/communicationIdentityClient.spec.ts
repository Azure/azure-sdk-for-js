// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CommunicationUserIdentifier,
  isCommunicationUserIdentifier
} from "@azure/communication-common";
import { assert } from "chai";
import { matrix } from "@azure/test-utils";
import { isPlaybackMode, Recorder } from "@azure-tools/test-recorder";
import { CommunicationIdentityClient } from "../../src";
import {
  createRecordedCommunicationIdentityClient,
  createRecordedCommunicationIdentityClientWithToken
} from "./utils/recordedClient";
import { Context } from "mocha";

matrix([[true, false]], async function(useAad) {
  describe(`CommunicationIdentityClient [Playback/Live]${useAad ? " [AAD]" : ""}`, function() {
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

    it("successfully creates a user", async function() {
      const user: CommunicationUserIdentifier = await client.createUser();
      assert.isString(user.communicationUserId);
    });

    it("successfully creates a user and token", async function() {
      const { user: newUser, token } = await client.createUserAndToken(["voip"]);
      assert.isString(newUser.communicationUserId);
      assert.isString(token);
    });

    it("successfully gets a token for a user [single scope]", async function() {
      const user: CommunicationUserIdentifier = await client.createUser();
      const { token, expiresOn } = await client.getToken(user, ["chat"]);
      assert.isString(token);
      assert.instanceOf(expiresOn, Date);
    });

    it("successfully gets a token for a user [multiple scopes]", async function() {
      const user: CommunicationUserIdentifier = await client.createUser();
      const { token, expiresOn } = await client.getToken(user, ["chat", "voip"]);
      assert.isString(token);
      assert.instanceOf(expiresOn, Date);
    });

    it("successfully creates a user and gets a token in a single request", async function() {
      const { user: newUser, token, expiresOn } = await client.createUserAndToken(["chat", "voip"]);
      assert.isTrue(isCommunicationUserIdentifier(newUser));
      assert.isString(token);
      assert.instanceOf(expiresOn, Date);
    });

    it("successfully revokes tokens issued for a user", async function() {
      const { user } = await client.createUserAndToken(["chat", "voip"]);
      await client.revokeTokens(user);
    });

    it("successfully deletes a user", async function() {
      const user: CommunicationUserIdentifier = await client.createUser();
      await client.deleteUser(user);
    });

    describe("Error Cases: ", async function() {
      const fakeUser: CommunicationUserIdentifier = {
        communicationUserId: isPlaybackMode()
          ? "sanitized"
          : "8:acs:00000000-0000-0000-0000-000000000000_00000000-0000-0000-0000-000000000000"
      };

      it("throws an error when attempting to issue a token without any scopes", async function() {
        try {
          const user: CommunicationUserIdentifier = await client.createUser();
          await client.getToken(user, []);
          assert.fail("Should have thrown an error");
        } catch (e) {
          assert.equal(e.statusCode, 400);
          assert.equal(e.message, "Invalid scopes - Scopes field is required.");
        }
      });

      it("throws an error when attempting to issue a token for an invalid user", async function() {
        try {
          await client.getToken(fakeUser, ["chat", "voip"]);
          assert.fail("Should have thrown an error");
        } catch (e) {
          assert.equal(e.statusCode, 401);
        }
      });

      it("throws an error when attempting to revoke a token from an invalid user", async function() {
        try {
          await client.revokeTokens(fakeUser);
          assert.fail("Should have thrown an error");
        } catch (e) {
          assert.equal(e.statusCode, 401);
        }
      });

      it("throws an error when attempting to delete an invalid user", async function() {
        try {
          await client.deleteUser(fakeUser);
          assert.fail("Should have thrown an error");
        } catch (e) {
          assert.equal(e.statusCode, 401);
        }
      });
    });
  });
});
