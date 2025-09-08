// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { matrix } from "@azure-tools/test-utils-vitest";
import { type Recorder } from "@azure-tools/test-recorder";
import {
  type BrowseAvailableNumbersRequest,
  type PhoneNumbersClient,
  type SearchAvailablePhoneNumbersRequest,
} from "../../src/index.js";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient.js";
import { isClientErrorStatusCode } from "./utils/statusCodeHelpers.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { getReservationId } from "./utils/testPhoneNumber.js";

matrix([[true, false]], async (useAad) => {
  describe(`PhoneNumbersClient - reservations${useAad ? " [AAD]" : ""}`, () => {
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

    it("can browse available phone number", { timeout: 60000 }, async () => {
      const browseAvailableNumberRequest: BrowseAvailableNumbersRequest = {
        countryCode: "US",
        phoneNumberType: "tollFree",
      };

      const browseAvailableNumbers = await client.browseAvailablePhoneNumbers(
        browseAvailableNumberRequest,
        {
          capabilities: {
            calling: "outbound",
          },
          assignmentType: "application",
        },
      );
      assert.isTrue(browseAvailableNumbers.phoneNumbers.length > 0);

      for (const phoneNumber of browseAvailableNumbers.phoneNumbers) {
        assert.equal(phoneNumber.phoneNumberType, "tollFree");
        assert.isTrue(phoneNumber.capabilities.calling.includes("outbound"));
        assert.equal(phoneNumber.assignmentType, "application");
      }

      const browseGeographicAvailableNumberRequest: BrowseAvailableNumbersRequest = {
        countryCode: "US",
        phoneNumberType: "geographic",
      };

      const browseGeographicAvailableNumbers = await client.browseAvailablePhoneNumbers(
        browseGeographicAvailableNumberRequest,
      );
      assert.isTrue(browseGeographicAvailableNumbers.phoneNumbers.length > 0);

      for (const phoneNumber of browseGeographicAvailableNumbers.phoneNumbers) {
        assert.equal(phoneNumber.phoneNumberType, "geographic");
      }

      const browseMobileAvailableNumberRequest: BrowseAvailableNumbersRequest = {
        countryCode: "IE",
        phoneNumberType: "mobile",
      };

      const browseMobileAvailableNumbers = await client.browseAvailablePhoneNumbers(
        browseMobileAvailableNumberRequest,
      );
      assert.isTrue(browseMobileAvailableNumbers.phoneNumbers.length > 0);

      for (const phoneNumber of browseMobileAvailableNumbers.phoneNumbers) {
        assert.equal(phoneNumber.phoneNumberType, "mobile");
      }
    });

    it("throws error on invalid browse request", { timeout: 60000 }, async () => {
      // Invalid value for countryCode
      const invalidBrowseRequest: BrowseAvailableNumbersRequest = {
        countryCode: "INVALID",
        phoneNumberType: "tollFree",
      };

      try {
        await client.browseAvailablePhoneNumbers(invalidBrowseRequest, {
          assignmentType: "application",
          capabilities: {
            sms: "inbound+outbound",
            calling: "none",
          },
        });
      } catch (error: any) {
        assert.isTrue(
          isClientErrorStatusCode(error.statusCode),
          `Status code ${error.statusCode} does not indicate client error.`,
        );
        return;
      }

      assert.fail("browseAvailablePhoneNumbers should have thrown an exception.");
    });

    it("can update an existing reservation", { timeout: 60000 }, async () => {
      const browseAvailableNumberRequest: BrowseAvailableNumbersRequest = {
        countryCode: "US",
        phoneNumberType: "tollFree",
      };

      const browseAvailableNumbers = await client.browseAvailablePhoneNumbers(
        browseAvailableNumberRequest,
        {
          capabilities: {
            calling: "outbound",
          },
          assignmentType: "application",
        },
      );

      const phoneNumbers = browseAvailableNumbers.phoneNumbers;
      const phoneNumbersList = [phoneNumbers[0]];

      const reservationId = getReservationId();
      const reservationResponse = await client.createOrUpdateReservation(
        {
          reservationId: reservationId,
        },
        {
          add: phoneNumbersList,
        },
      );

      assert.equal(reservationResponse.status, "active");
      assert.isTrue(
        Object.keys(reservationResponse.phoneNumbers || {}).includes(phoneNumbers[0].id as string),
      );

      const updatedPhoneNumbersList = [phoneNumbers[1]];

      let updatedReservationResponse = await client.createOrUpdateReservation(
        {
          reservationId: reservationId,
        },
        {
          add: updatedPhoneNumbersList,
        },
      );
      assert.isTrue(
        Object.keys(updatedReservationResponse.phoneNumbers || {}).includes(
          phoneNumbers[0].id as string,
        ),
      );
      assert.isTrue(
        Object.keys(updatedReservationResponse.phoneNumbers || {}).includes(
          phoneNumbers[1].id as string,
        ),
      );

      // Only test the remove functionality if we have different phone number IDs
      // In playback mode, sanitization might make all IDs the same
      if (phoneNumbers[0].id !== phoneNumbers[1].id) {
        const phoneNumbersToRemove = [phoneNumbers[0].id as string];
        phoneNumbersList.push(phoneNumbers[1]);
        updatedReservationResponse = await client.createOrUpdateReservation(
          {
            reservationId: reservationId,
          },
          {
            add: phoneNumbersList,
            remove: phoneNumbersToRemove,
          },
        );

        assert.isFalse(
          Object.keys(updatedReservationResponse.phoneNumbers || {}).includes(
            phoneNumbers[0].id as string,
          ),
        );
      }

      await client.deleteReservation(reservationId);
    });

    it(
      "throws error when starting purchase without agreement to not resell Browse API",
      { timeout: 60000 },
      async () => {
        const browseAvailableNumberRequest: BrowseAvailableNumbersRequest = {
          countryCode: "FR",
          phoneNumberType: "tollFree",
        };

        const browseAvailableNumbers = await client.browseAvailablePhoneNumbers(
          browseAvailableNumberRequest,
          {
            capabilities: {
              calling: "outbound",
            },
            assignmentType: "application",
          },
        );

        const phoneNumbers = browseAvailableNumbers.phoneNumbers;
        const phoneNumbersList = [phoneNumbers[0]];

        const reservationResponse = await client.createOrUpdateReservation(
          {
            reservationId: getReservationId(),
          },
          {
            add: phoneNumbersList,
          },
        );
        const reservationId = reservationResponse.id as string;

        try {
          await client.beginReservationPurchase(reservationId, {
            agreeToNotResell: false,
          });
        } catch (error: any) {
          assert.isTrue(
            isClientErrorStatusCode(error.statusCode),
            `Status code ${error.statusCode} does not indicate client error.`,
          );
          return;
        }

        assert.fail("beginReservationPurchase should have thrown an exception.");
      },
    );

    it(
      "throws error when starting purchase without agreement to not resell search API",
      { timeout: 60000 },
      async () => {
        const searchRequest: SearchAvailablePhoneNumbersRequest = {
          countryCode: "FR",
          phoneNumberType: "tollFree",
          assignmentType: "application",
          capabilities: {
            sms: "none",
            calling: "outbound",
          },
        };

        const searchPoller = await client.beginSearchAvailablePhoneNumbers(searchRequest);

        const results = await searchPoller.pollUntilDone();
        assert.ok(searchPoller.getOperationState().isCompleted);
        assert.equal(results.phoneNumbers.length, 1);

        try {
          await client.beginPurchasePhoneNumbers(results.searchId, {
            agreeToNotResell: false,
          });
        } catch (error: any) {
          assert.isTrue(
            isClientErrorStatusCode(error.statusCode),
            `Status code ${error.statusCode} does not indicate client error.`,
          );
          return;
        }

        assert.fail("beginReservationPurchase should have thrown an exception.");
      },
    );
  });
});
