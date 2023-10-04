// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CommunicationUserIdentifier,
  isCommunicationUserIdentifier,
} from "@azure/communication-common";
import { Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import {
  createRecordedCommunicationIdentityClient,
  createRecordedCommunicationIdentityClientWithToken,
} from "./utils/recordedClient";
import { CommunicationIdentityClient, TokenScope } from "../../src";
import { Context } from "mocha";
import { assert } from "chai";
import { matrix } from "@azure/test-utils";

matrix([[true, false]], async function (useAad: boolean) {
  describe(`CommunicationIdentityClient [Playback/Live]${useAad ? " [AAD]" : ""}`, function () {
    let recorder: Recorder;
    let client: CommunicationIdentityClient;
    const chatScope: TokenScope[] = ["chat"];
    const voipScope: TokenScope[] = ["voip"];
    const multipleScopes: TokenScope[] = ["chat", "voip"];

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

    it("successfully creates a user", async function () {
      const user: CommunicationUserIdentifier = await client.createUser();
      assert.isString(user.communicationUserId);
    });

    [
      { scopes: chatScope, description: "chat scope" },
      { scopes: voipScope, description: "voip scope" },
      { scopes: multipleScopes, description: "multiple scopes" },
    ].forEach((input) =>
      it(`successfully creates a user and token <${input.description}>`, async function () {
        const { user: newUser, token, expiresOn } = await client.createUserAndToken(input.scopes);
        assert.isTrue(isCommunicationUserIdentifier(newUser));
        assert.isString(newUser.communicationUserId);
        assert.isString(token);
        assert.instanceOf(expiresOn, Date);
      })
    );

    [
      { scopes: chatScope, description: "chat scope" },
      { scopes: voipScope, description: "voip scope" },
      { scopes: multipleScopes, description: "multiple scopes" },
    ].forEach((input) =>
      it(`successfully gets a token for a user <${input.description}>`, async function () {
        const user: CommunicationUserIdentifier = await client.createUser();
        const { token, expiresOn } = await client.getToken(user, input.scopes);
        assert.isString(token);
        assert.instanceOf(expiresOn, Date);
      })
    );

    it("successfully revokes tokens issued for a user", async function () {
      const { user } = await client.createUserAndToken(multipleScopes);
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
          await client.getToken(fakeUser, multipleScopes);
          assert.fail("Should have thrown an error");
        } catch (e: any) {
          assert.equal(e.statusCode, 401);
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
