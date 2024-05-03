// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommunicationUserIdentifier } from "@azure/communication-common";
import { Recorder, isLiveMode } from "@azure-tools/test-recorder";
import { Context } from "mocha";
import { assert } from "chai";
import { matrix } from "@azure-tools/test-utils";
import { CommunicationIdentityClient } from "../../../src/communicationIdentityClient";
import {
  createRecordedCommunicationIdentityClient,
  createRecordedCommunicationIdentityClientWithToken,
} from "../utils/recordedClient";
import { CreateUserAndTokenOptions, GetTokenOptions } from "../../../src/models";

matrix([[true, false]], async function (useAad: boolean) {
  describe(`Get Token With Custom Expiration [Playback/Live]${
    useAad ? " [AAD]" : ""
  }`, function () {
    const TOKEN_EXPIRATION_ALLOWED_DEVIATION: number = 0.05;
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

    function tokenExpirationWithinAllowedDeviation(
      expectedTokenExpiration: number,
      tokenExpiresIn: Date,
      allowedDeviation: number,
    ) {
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
      it(`successfully gets a valid custom expiration token <${input.description}>`, async function () {
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
      it(`successfully gets user and valid custom expiration token <${input.description}>`, async function () {
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
      it(`throws error when attempting to issue an invalid expiration token <${input.description}>`, async function () {
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
      it(`throws error when attempting to issue user and invalid expiration token <${input.description}>`, async function () {
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
