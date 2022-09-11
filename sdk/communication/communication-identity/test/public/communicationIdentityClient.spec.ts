// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CommunicationUserIdentifier,
  isCommunicationUserIdentifier,
} from "@azure/communication-common";
import { Recorder, isLiveMode, isPlaybackMode } from "@azure-tools/test-recorder";
import {
  createRecordedCommunicationIdentityClient,
  createRecordedCommunicationIdentityClientWithToken,
} from "./utils/recordedClient";
import { CommunicationIdentityClient } from "../../src";
import { Context } from "mocha";
import { assert } from "chai";
import { matrix } from "@azure/test-utils";

matrix([[true, false]], async function (useAad: boolean) {
  describe(`CommunicationIdentityClient [Playback/Live]${useAad ? " [AAD]" : ""}`, function () {
    let recorder: Recorder;
    let client: CommunicationIdentityClient;

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

    function isTokenExpirationValid(
      expectedTokenExpiration: number,
      tokenExpiresAfter: Date
    ): boolean {
      const timeNow = Date.now();
      const expiration = tokenExpiresAfter.getTime();
      const tokenSeconds = (expiration - timeNow) / 1000;
      const expectedSeconds = expectedTokenExpiration * 60;
      const timeDiff = Math.abs(expectedSeconds - tokenSeconds);
      const allowedDiff = expectedSeconds * 0.05;
      return timeDiff < allowedDiff;
    }

    it("successfully creates a user", async function () {
      const user: CommunicationUserIdentifier = await client.createUser();
      assert.isString(user.communicationUserId);
    });

    it("successfully creates a user and token", async function () {
      const { user: newUser, token } = await client.createUserAndToken(["voip"]);
      assert.isString(newUser.communicationUserId);
      assert.isString(token);
    });

    it("successfully gets a token for a user [single scope]", async function () {
      const user: CommunicationUserIdentifier = await client.createUser();
      const { token, expiresOn } = await client.getToken(user, ["chat"]);
      assert.isString(token);
      assert.instanceOf(expiresOn, Date);
    });

    it("successfully gets a token for a user [multiple scopes]", async function () {
      const user: CommunicationUserIdentifier = await client.createUser();
      const { token, expiresOn } = await client.getToken(user, ["chat", "voip"]);
      assert.isString(token);
      assert.instanceOf(expiresOn, Date);
    });

    it("successfully gets a token with min valid custom expiration", async function () {
      const user: CommunicationUserIdentifier = await client.createUser();
      const expectedTokenExpiration: number = 60;
      const { token, expiresOn } = await client.getToken(user, ["chat"], expectedTokenExpiration);

      assert.isString(token);
      assert.instanceOf(expiresOn, Date);
      if (isLiveMode()) {
        const isValid = isTokenExpirationValid(expectedTokenExpiration, expiresOn);
        assert.isTrue(isValid);
      }
    });

    it("successfully gets a token with max valid custom expiration", async function () {
      const user: CommunicationUserIdentifier = await client.createUser();
      const expectedTokenExpiration: number = 1440;
      const { token, expiresOn } = await client.getToken(user, ["chat"], expectedTokenExpiration);

      assert.isString(token);
      assert.instanceOf(expiresOn, Date);
      if (isLiveMode()) {
        const isValid = isTokenExpirationValid(expectedTokenExpiration, expiresOn);
        assert.isTrue(isValid);
      }
    });

    it("successfully creates a user and gets a token in a single request", async function () {
      const { user: newUser, token, expiresOn } = await client.createUserAndToken(["chat", "voip"]);
      assert.isTrue(isCommunicationUserIdentifier(newUser));
      assert.isString(token);
      assert.instanceOf(expiresOn, Date);
    });

    it("successfully creates a user and a token with custom expiration in a single request", async function () {
      const {
        user: newUser,
        token,
        expiresOn,
      } = await client.createUserAndToken(["chat", "voip"], 60);
      assert.isTrue(isCommunicationUserIdentifier(newUser));
      assert.isString(token);
      assert.instanceOf(expiresOn, Date);
    });

    it("successfully revokes tokens issued for a user", async function () {
      const { user } = await client.createUserAndToken(["chat", "voip"]);
      await client.revokeTokens(user);
    });

    it("successfully deletes a user", async function () {
      const user: CommunicationUserIdentifier = await client.createUser();
      await client.deleteUser(user);
    });

    describe("Error Cases: ", async function () {
      const fakeUser: CommunicationUserIdentifier = {
        communicationUserId: isPlaybackMode()
          ? "sanitized"
          : "8:acs:00000000-0000-0000-0000-000000000000_00000000-0000-0000-0000-000000000000",
      };

      it("throws an error when attempting to issue a token without any scopes", async function () {
        try {
          const user: CommunicationUserIdentifier = await client.createUser();
          await client.getToken(user, []);
          assert.fail("Should have thrown an error");
        } catch (e: any) {
          assert.equal(e.statusCode, 400);
          assert.equal(e.message, "Invalid scopes - Scopes field is required.");
        }
      });

      it("throws an error when attempting to issue a token for an invalid user", async function () {
        try {
          await client.getToken(fakeUser, ["chat", "voip"]);
          assert.fail("Should have thrown an error");
        } catch (e: any) {
          assert.equal(e.statusCode, 401);
        }
      });

      it("throws an error when attempting to issue a token with min invalid expiration", async function () {
        const user: CommunicationUserIdentifier = await client.createUser();
        try {
          await client.getToken(user, ["chat"], 1441);
          assert.fail("Should have thrown an error");
        } catch (e: any) {
          assert.equal(e.statusCode, 400);
        }
      });

      it("throws an error when attempting to issue a token with max invalid expiration", async function () {
        const user: CommunicationUserIdentifier = await client.createUser();
        try {
          await client.getToken(user, ["chat"], 59);
          assert.fail("Should have thrown an error");
        } catch (e: any) {
          assert.equal(e.statusCode, 400);
        }
      });

      it("throws an error when attempting to revoke a token from an invalid user", async function () {
        try {
          await client.revokeTokens(fakeUser);
          assert.fail("Should have thrown an error");
        } catch (e: any) {
          assert.equal(e.statusCode, 401);
        }
      });

      it("throws an error when attempting to delete an invalid user", async function () {
        try {
          await client.deleteUser(fakeUser);
          assert.fail("Should have thrown an error");
        } catch (e: any) {
          assert.equal(e.statusCode, 401);
        }
      });
    });
  });
});
