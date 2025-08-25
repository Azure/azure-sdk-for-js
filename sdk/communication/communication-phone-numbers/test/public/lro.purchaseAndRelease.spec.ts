// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { matrix } from "@azure-tools/test-utils-vitest";
import type { Recorder } from "@azure-tools/test-recorder";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import type {
  PhoneNumbersClient,
  SearchAvailablePhoneNumbersRequest,
} from "@azure/communication-phone-numbers";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

matrix([[true, false]], async (useAad) => {
  const includePhoneNumberLiveTests = env.INCLUDE_PHONENUMBER_LIVE_TESTS === "true";

  describe(
    `PhoneNumbersClient - lro - purchase and release${useAad ? " [AAD]" : ""}`,
    { skip: !includePhoneNumberLiveTests && !isPlaybackMode() },
    () => {
      let recorder: Recorder;
      let client: PhoneNumbersClient;

      beforeEach(async (ctx) => {
        ({ client, recorder } = useAad
          ? await createRecordedClientWithToken(ctx)!
          : await createRecordedClient(ctx));
      });

      afterEach(async () => {
        await recorder.stop();
      });

      it("can purchase and release a phone number", { timeout: 90000 }, async () => {
        // search for phone number
        const searchRequest: SearchAvailablePhoneNumbersRequest = {
          countryCode: "US",
          phoneNumberType: "tollFree",
          assignmentType: "application",
          capabilities: {
            sms: "inbound+outbound",
            calling: "none",
          },
        };
        const searchPoller = await client.beginSearchAvailablePhoneNumbers(searchRequest);
        const searchResults = await searchPoller.pollUntilDone();

        assert.ok(searchPoller.getOperationState().isCompleted);
        assert.isNotEmpty(searchResults.searchId);
        assert.isNotEmpty(searchResults.phoneNumbers);
        assert.equal(searchResults.phoneNumbers.length, 1);

        const purchasedPhoneNumber = searchResults.phoneNumbers[0];
        assert.isNotEmpty(purchasedPhoneNumber);

        // purchase phone number
        const purchasePoller = await client.beginPurchasePhoneNumbers(searchResults.searchId);

        await purchasePoller.pollUntilDone();
        assert.ok(purchasePoller.getOperationState().isCompleted);

        console.log(`Purchased ${purchasedPhoneNumber}`);

        // get phone number to ensure it was purchased
        const { phoneNumber } = await client.getPurchasedPhoneNumber(purchasedPhoneNumber);
        assert.equal(purchasedPhoneNumber, phoneNumber);

        // release phone number
        console.log(`Will release ${purchasedPhoneNumber}`);

        const releasePoller = await client.beginReleasePhoneNumber(purchasedPhoneNumber as string);

        await releasePoller.pollUntilDone();
        assert.ok(releasePoller.getOperationState().isCompleted);
        const result = releasePoller.getOperationState().result! as any;
        assert.equal(result.body.status, "succeeded");

        console.log(`Released: ${purchasedPhoneNumber}`);
      });
    },
  );
});
