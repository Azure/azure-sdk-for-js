// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  CommunicationAccessToken,
  CommunicationIdentityClient,
  GetTokenForTeamsUserOptions,
} from "@azure/communication-identity";
import type { Recorder } from "@azure-tools/test-recorder";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import {
  createRecordedCommunicationIdentityClient,
  createRecordedCommunicationIdentityClientWithToken,
} from "../utils/recordedClient.js";
import { PublicClientApplication } from "@azure/msal-node";
import { matrix } from "@azure-tools/test-utils-vitest";
import { describe, it, assert, beforeEach, afterEach, beforeAll } from "vitest";

matrix([[true, false]], async (useAad) => {
  describe(
    `Get Token For Teams User [Playback/Live]${useAad ? " [AAD]" : ""}`,
    { skip: env.SKIP_INT_IDENTITY_EXCHANGE_TOKEN_TEST === "true" },
    () => {
      let recorder: Recorder;
      let client: CommunicationIdentityClient;
      const sanitizedValue = "sanitized";
      let options: GetTokenForTeamsUserOptions = {
        teamsUserAadToken: sanitizedValue,
        clientId: sanitizedValue,
        userObjectId: sanitizedValue,
      };

      beforeAll(async () => {
        if (!isPlaybackMode()) {
          options = await fetchParamsForGetTokenForTeamsUser();
        }
      });

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

      async function fetchParamsForGetTokenForTeamsUser(): Promise<GetTokenForTeamsUserOptions> {
        const msalConfig = {
          auth: {
            clientId: env.COMMUNICATION_M365_APP_ID ?? "",
            authority:
              env.COMMUNICATION_M365_AAD_AUTHORITY + "/" + env.COMMUNICATION_M365_AAD_TENANT,
          },
        };
        const msalInstance = new PublicClientApplication(msalConfig);
        const usernamePasswordRequest = {
          scopes: [
            "https://auth.msft.communication.azure.com/Teams.ManageCalls",
            "https://auth.msft.communication.azure.com/Teams.ManageChats",
          ],
          username: env.COMMUNICATION_MSAL_USERNAME ?? "",
          password: env.COMMUNICATION_MSAL_PASSWORD ?? "",
        };
        const response = await msalInstance.acquireTokenByUsernamePassword(usernamePasswordRequest);
        const getTokenForTeamsUserOptions: GetTokenForTeamsUserOptions = {
          teamsUserAadToken: response!.accessToken,
          clientId: env.COMMUNICATION_M365_APP_ID ?? "",
          userObjectId: response!.uniqueId,
        };
        return getTokenForTeamsUserOptions;
      }

      it(
        "successfully exchanges a Teams User AAD token for a Communication access token",
        { timeout: 5000 },
        async () => {
          const { token, expiresOn }: CommunicationAccessToken =
            await client.getTokenForTeamsUser(options);
          assert.isString(token);
          assert.instanceOf(expiresOn, Date);
        },
      );

      [
        { teamsUserAadToken: "", description: "an empty teamsUserAadToken" },
        { teamsUserAadToken: "invalid", description: "an invalid teamsUserAadToken" },
        {
          teamsUserAadToken: env.COMMUNICATION_EXPIRED_TEAMS_TOKEN ?? "",
          description: "an expired teamsUserAadToken",
        },
      ].forEach((input) =>
        it(`throws an error when attempting to exchange <${input.description}>`, async () => {
          try {
            if (isPlaybackMode()) {
              input.teamsUserAadToken = sanitizedValue;
            }
            await client.getTokenForTeamsUser({
              teamsUserAadToken: input.teamsUserAadToken,
              clientId: options.clientId,
              userObjectId: options.clientId,
            });
          } catch (e: any) {
            assert.equal(e.statusCode, 401);
            return;
          }

          assert.fail("Should have thrown an error");
        }),
      );

      [
        { clientId: "", description: "an empty clientId" },
        { clientId: "invalid", description: "an invalid clientId" },
        { clientId: options.userObjectId, description: "a wrong clientId" },
      ].forEach((input) =>
        it(`throws an error when attempting to exchange <${input.description}>`, async () => {
          try {
            if (isPlaybackMode()) {
              input.clientId = sanitizedValue;
            }
            await client.getTokenForTeamsUser({
              teamsUserAadToken: options.teamsUserAadToken,
              clientId: input.clientId,
              userObjectId: options.userObjectId,
            });
          } catch (e: any) {
            assert.equal(e.statusCode, 400);
            return;
          }

          assert.fail("Should have thrown an error");
        }),
      );

      [
        { userObjectId: "", description: "an empty userObjectId" },
        { userObjectId: "invalid", description: "an invalid userObjectId" },
        { userObjectId: options.clientId, description: "a wrong userObjectId" },
      ].forEach((input) =>
        it(`throws an error when attempting to exchange <${input.description}>`, async () => {
          try {
            if (isPlaybackMode()) {
              input.userObjectId = sanitizedValue;
            }
            await client.getTokenForTeamsUser({
              teamsUserAadToken: options.teamsUserAadToken,
              clientId: options.clientId,
              userObjectId: input.userObjectId,
            });
          } catch (e: any) {
            assert.equal(e.statusCode, 400);
            return;
          }

          assert.fail("Should have thrown an error");
        }),
      );
    },
  );
});
