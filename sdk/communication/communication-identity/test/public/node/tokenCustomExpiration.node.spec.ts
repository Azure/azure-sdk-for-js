// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CommunicationUserIdentifier } from "@azure/communication-common";
import type { Recorder } from "@azure-tools/test-recorder";
import { isLiveMode } from "@azure-tools/test-recorder";
import { matrix } from "@azure-tools/test-utils-vitest";
import type { CommunicationIdentityClient } from "$internal/communicationIdentityClient.js";
import {
  createRecordedCommunicationIdentityClient,
  createRecordedCommunicationIdentityClientWithToken,
} from "../utils/recordedClient.js";
import type { CreateUserAndTokenOptions, GetTokenOptions } from "$internal/models.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

matrix([[true, false]], async (useAad: boolean) => {
  describe(`Get Token With Custom Expiration [Playback/Live]${useAad ? " [AAD]" : ""}`, () => {
    const TOKEN_EXPIRATION_ALLOWED_DEVIATION: number = 0.05;
    let recorder: Recorder;
    let client: CommunicationIdentityClient;

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

    function tokenExpirationWithinAllowedDeviation(
      expectedTokenExpiration: number,
      tokenExpiresIn: Date,
      allowedDeviation: number,
    ): {
      withinAllowedDeviation: boolean;
      tokenExpirationInMinutes: number;
    } {
      const timeNow = Date.now();
      const expiration = tokenExpiresIn.getTime();
      const tokenSeconds = (expiration - timeNow) / 1000;
      const expectedSeconds = expectedTokenExpiration * 60;
      const timeDiff = Math.abs(expectedSeconds - tokenSeconds);
      const allowedDiff = expectedSeconds * allowedDeviation;
      return {
        withinAllowedDeviation: timeDiff < allowedDiff,
        tokenExpirationInMinutes: tokenSeconds / 60,
      };
    }

    [
      { tokenExpiresInMinutes: 60, description: "min valid" },
      { tokenExpiresInMinutes: 1440, description: "max valid" },
    ].forEach((input) =>
      it(`successfully gets a valid custom expiration token <${input.description}>`, async () => {
        const user: CommunicationUserIdentifier = await client.createUser();
        const tokenOptions: GetTokenOptions = {
          tokenExpiresInMinutes: input.tokenExpiresInMinutes,
        };
        const { token, expiresOn } = await client.getToken(user, ["chat"], tokenOptions);

        assert.isString(token);
        assert.instanceOf(expiresOn, Date);
        if (isLiveMode()) {
          const { withinAllowedDeviation, tokenExpirationInMinutes } =
            tokenExpirationWithinAllowedDeviation(
              input.tokenExpiresInMinutes,
              expiresOn,
              TOKEN_EXPIRATION_ALLOWED_DEVIATION,
            );
          assert.isTrue(
            withinAllowedDeviation,
            `Token expiration is outside of allowed ${
              TOKEN_EXPIRATION_ALLOWED_DEVIATION * 100
            }% deviation. Expected minutes: ${input.tokenExpiresInMinutes}, actual minutes: ${
              // to round to max 2 decimal places
              Math.round((tokenExpirationInMinutes + Number.EPSILON) * 100) / 100
            }.`,
          );
        }
      }),
    );

    [
      { tokenExpiresInMinutes: 60, description: "min valid" },
      { tokenExpiresInMinutes: 1440, description: "max valid" },
    ].forEach((input) =>
      it(`successfully gets user and valid custom expiration token <${input.description}>`, async () => {
        const tokenOptions: CreateUserAndTokenOptions = {
          tokenExpiresInMinutes: input.tokenExpiresInMinutes,
        };
        const { token, expiresOn } = await client.createUserAndToken(["chat"], tokenOptions);

        assert.isString(token);
        assert.instanceOf(expiresOn, Date);
        if (isLiveMode()) {
          const { withinAllowedDeviation, tokenExpirationInMinutes } =
            tokenExpirationWithinAllowedDeviation(
              input.tokenExpiresInMinutes,
              expiresOn,
              TOKEN_EXPIRATION_ALLOWED_DEVIATION,
            );
          assert.isTrue(
            withinAllowedDeviation,
            `Token expiration is outside of allowed ${
              TOKEN_EXPIRATION_ALLOWED_DEVIATION * 100
            }% deviation. Expected minutes: ${input.tokenExpiresInMinutes}, actual minutes: ${
              // to round to max 2 decimal places
              Math.round((tokenExpirationInMinutes + Number.EPSILON) * 100) / 100
            }.`,
          );
        }
      }),
    );

    [
      { tokenExpiresInMinutes: 59, description: "lo inval" },
      { tokenExpiresInMinutes: 1441, description: "hi inval" },
    ].forEach((input) =>
      it(`throws error when attempting to issue an invalid expiration token <${input.description}>`, async () => {
        const user: CommunicationUserIdentifier = await client.createUser();
        const tokenOptions: GetTokenOptions = {
          tokenExpiresInMinutes: input.tokenExpiresInMinutes,
        };
        try {
          await client.getToken(user, ["chat"], tokenOptions);
          assert.fail("Should have thrown an error");
        } catch (e: any) {
          assert.equal(e.statusCode, 400);
        }
      }),
    );

    [
      { tokenExpiresInMinutes: 59, description: "lo inval" },
      { tokenExpiresInMinutes: 1441, description: "hi inval" },
    ].forEach((input) =>
      it(`throws error when attempting to issue user and invalid expiration token <${input.description}>`, async () => {
        const tokenOptions: CreateUserAndTokenOptions = {
          tokenExpiresInMinutes: input.tokenExpiresInMinutes,
        };
        try {
          await client.createUserAndToken(["chat"], tokenOptions);
          assert.fail("Should have thrown an error");
        } catch (e: any) {
          assert.equal(e.statusCode, 400);
        }
      }),
    );
  });
});
