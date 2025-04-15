// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { matrix } from "@azure-tools/test-utils-vitest";
import { env, isPlaybackMode, type Recorder } from "@azure-tools/test-recorder";
import type { PhoneNumbersReservation } from "../../src/index.js";
import { type BrowseAvailableNumbersRequest, type PhoneNumbersClient } from "../../src/index.js";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach, beforeAll } from "vitest";
import { getReservationId } from "./utils/testPhoneNumber.js";

matrix([[true, false]], async (useAad) => {
  const includePhoneNumberLiveTests = env.INCLUDE_PHONENUMBER_LIVE_TESTS === "true";

  describe(
    `PhoneNumbersClient - reservations${useAad ? " [AAD]" : ""}`,
    { skip: !includePhoneNumberLiveTests && !isPlaybackMode() },
    () => {
      let recorder: Recorder;
      let client: PhoneNumbersClient;
      let reservationId: string;

      beforeAll(async () => {
        reservationId = getReservationId();
      });
      beforeEach(async (ctx) => {
        ({ client, recorder } = useAad
          ? await createRecordedClientWithToken(ctx)!
          : await createRecordedClient(ctx));
      });

      afterEach(async () => {
        await recorder.stop();
      });

      it("can purchase a phone number reservation", { timeout: 60000 }, async () => {
        const browseAvailableNumberRequest: BrowseAvailableNumbersRequest = {
          countryCode: "US",
          phoneNumberType: "tollFree",
          assignmentType: "application",
        };

        const browseAvailableNumbers = await client.browseAvailablePhoneNumbers(
          browseAvailableNumberRequest,
        );

        const phoneNumbers = browseAvailableNumbers.phoneNumbers;
        const phoneNumberForPurchase = phoneNumbers[0].phoneNumber
          ? phoneNumbers[0].phoneNumber
          : "";

        assert.isNotEmpty(phoneNumberForPurchase);
        const phoneNumbersReservation: PhoneNumbersReservation = {
          phoneNumbers: { [String(phoneNumbers[0].id)]: phoneNumbers[0] },
        };

        const reservationResponse = await client.createOrUpdateReservation(
          reservationId,
          phoneNumbersReservation,
        );
        const responseReservationId = reservationResponse.id ? reservationResponse.id : "";
        assert.equal(reservationResponse.status, "active");
        assert.isTrue(reservationResponse.id !== "");

        const getReservationResponse = await client.getReservation(responseReservationId);
        assert.equal(getReservationResponse.status, "active");
        assert.isTrue(getReservationResponse.id === responseReservationId);

        const purchasePoller = await client.beginReservationPurchase(reservationId);
        await purchasePoller.pollUntilDone();
        assert.ok(purchasePoller.getOperationState().isCompleted);

        const { phoneNumber } = await client.getPurchasedPhoneNumber(phoneNumberForPurchase);
        assert.equal(phoneNumberForPurchase, phoneNumber);

        const releasePoller = await client.beginReleasePhoneNumber(phoneNumberForPurchase);

        await releasePoller.pollUntilDone();
        assert.ok(releasePoller.getOperationState().isCompleted);
        const result = releasePoller.getOperationState().result! as any;
        assert.equal(result.body.status, "succeeded");
      });
    },
  );
});
