// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CommunicationUserIdentifier } from "@azure/communication-common";
import { isCommunicationUserIdentifier } from "@azure/communication-common";
import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import {
  createRecordedCommunicationIdentityClient,
  createRecordedCommunicationIdentityClientWithToken,
} from "./utils/recordedClient.js";
import type { CommunicationIdentityClient, TokenScope } from "@azure/communication-identity";
import { matrix } from "@azure-tools/test-utils-vitest";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

matrix([[true, false]], async (useAad: boolean) => {
  describe(`CommunicationIdentityClient [Playback/Live]${useAad ? " [AAD]" : ""}`, () => {
    let recorder: Recorder;
    let client: CommunicationIdentityClient;

    const scopes: TokenScope[] = ["chat", "voip"];

    const tokenScopeScenarios = [
      { scopes: ["chat"], description: "ChatScope" },
      { scopes: ["voip"], description: "VoipScope" },
      { scopes: ["chat.join"], description: "ChatJoinScope" },
      { scopes: ["chat.join.limited"], description: "ChatJoinLimitedScope" },
      { scopes: ["voip.join"], description: "VoipJoinScope" },
      { scopes: ["chat", "voip"], description: "ChatVoipScopes" },
      { scopes: ["chat", "chat.join", "chat.join.limited"], description: "AllChatScopes" },
      { scopes: ["voip", "voip.join"], description: "AllVoipScopes" },
      { scopes: ["chat.join", "voip.join"], description: "ChatJoinVoipJoinScopes" },
    ];

    beforeEach(async (ctx) => {
      if (useAad) {
        ({ client, recorder } = await createRecordedCommunicationIdentityClientWithToken(ctx));
      } else {
        ({ client, recorder } = await createRecordedCommunicationIdentityClient(ctx));
      }
    });

    afterEach(async () => {
      await recorder.stop();
    });

    it("successfully creates a user", async () => {
      const user: CommunicationUserIdentifier = await client.createUser();
      assert.isString(user.communicationUserId);
    });

    it("successfully creates and gets a user with customId", async () => {
      const customId = "alice@contoso.com";
      const user: CommunicationUserIdentifier = await client.createUser({ customId });
      assert.isString(user.communicationUserId);
      const user2: CommunicationUserIdentifier = await client.createUser({ customId });
      assert.equal(user.communicationUserId, user2.communicationUserId);
      const getResult = await client.getUserDetail(user);
      assert.equal(getResult.customId, customId);
    });

    tokenScopeScenarios.forEach((scenario) =>
      it(`successfully creates a user and token <${scenario.description}>`, async () => {
        const {
          user: newUser,
          token,
          expiresOn,
        } = await client.createUserAndToken(scenario.scopes as TokenScope[]);
        assert.isTrue(isCommunicationUserIdentifier(newUser));
        assert.isString(newUser.communicationUserId);
        assert.isString(token);
        assert.instanceOf(expiresOn, Date);
      }),
    );

    tokenScopeScenarios.forEach((scenario) =>
      it(`successfully gets a token for a user <${scenario.description}>`, async () => {
        const user: CommunicationUserIdentifier = await client.createUser();
        const { token, expiresOn } = await client.getToken(user, scenario.scopes as TokenScope[]);
        assert.isString(token);
        assert.instanceOf(expiresOn, Date);
      }),
    );

    it("successfully revokes tokens issued for a user", async () => {
      const { user } = await client.createUserAndToken(scopes);
      await client.revokeTokens(user);
    });

    it("successfully deletes a user", async () => {
      const user: CommunicationUserIdentifier = await client.createUser();
      await client.deleteUser(user);
    });

    describe("Error Cases: ", async () => {
      const fakeUser: CommunicationUserIdentifier = {
        communicationUserId: isPlaybackMode()
          ? "sanitized"
          : "8:acs:00000000-0000-0000-0000-000000000000_00000000-0000-0000-0000-000000000000",
      };

      it("throws an error when attempting to issue a token without any scopes", async () => {
        try {
          const user: CommunicationUserIdentifier = await client.createUser();
          await client.getToken(user, []);
          assert.fail("Should have thrown an error");
        } catch (e: any) {
          assert.equal(e.statusCode, 400);
          assert.equal(e.message, "Invalid scopes - Scopes field is required.");
        }
      });

      it("throws an error when attempting to issue a token for an invalid user", async () => {
        try {
          await client.getToken(fakeUser, scopes);
          assert.fail("Should have thrown an error");
        } catch (e: any) {
          assert.equal(e.statusCode, 401);
        }
      });

      it("throws an error when attempting to revoke a token from an invalid user", async () => {
        try {
          await client.revokeTokens(fakeUser);
          assert.fail("Should have thrown an error");
        } catch (e: any) {
          assert.equal(e.statusCode, 401);
        }
      });

      it("throws an error when attempting to delete an invalid user", async () => {
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
