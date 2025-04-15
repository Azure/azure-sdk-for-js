// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { matrix } from "@azure-tools/test-utils-vitest";
import { type Recorder } from "@azure-tools/test-recorder";
import {
  PhoneNumbersReservation,
  type BrowseAvailableNumbersRequest,
  type PhoneNumbersClient,
  type SearchAvailablePhoneNumbersRequest,
} from "../../src/index.js";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient.js";
import { isClientErrorStatusCode } from "./utils/statusCodeHelpers.js";
import { describe, it, assert, beforeEach, afterEach, beforeAll } from "vitest";
import { getReservationId } from "./utils/testPhoneNumber.js";

matrix([[true, false]], async (useAad) => {
  describe(`PhoneNumbersClient - reservations${useAad ? " [AAD]" : ""}`, () => {
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

    it("can browse available phone number", { timeout: 60000 }, async () => {
      const browseAvailableNumberRequest: BrowseAvailableNumbersRequest = {
        countryCode: "US",
        phoneNumberType: "tollFree",
        capabilities: {
          calling: "outbound",
        },
        assignmentType: "application",
      };

      const browseAvailableNumbers = await client.browseAvailablePhoneNumbers(
        browseAvailableNumberRequest,
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
    });

    it("throws error on invalid browse request", { timeout: 60000 }, async () => {
      // Invalid value for countryCode
      const invalidBrowseRequest: BrowseAvailableNumbersRequest = {
        countryCode: "INVALID",
        phoneNumberType: "tollFree",
        assignmentType: "application",
        capabilities: {
          sms: "inbound+outbound",
          calling: "none",
        },
      };

      try {
        await client.browseAvailablePhoneNumbers(invalidBrowseRequest);
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
        capabilities: {
          calling: "outbound",
        },
        assignmentType: "application",
      };

      const browseAvailableNumbers = await client.browseAvailablePhoneNumbers(
        browseAvailableNumberRequest,
      );

      const phoneNumbers = browseAvailableNumbers.phoneNumbers;
      const phoneNumbersReservation = new PhoneNumbersReservation(reservationId);
      phoneNumbersReservation.addPhoneNumber(phoneNumbers[0]);

      const reservationResponse = await client.createOrUpdateReservation(phoneNumbersReservation);
      assert.equal(reservationResponse.status, "active");
      assert.isTrue(reservationResponse.id === reservationId);

      phoneNumbersReservation.addPhoneNumber(phoneNumbers[1]);
      let updatedReservationResponse =
        await client.createOrUpdateReservation(phoneNumbersReservation);
      assert.isTrue(
        Object.keys(updatedReservationResponse.phoneNumbers || {}).includes(
          phoneNumbers[1].id as string,
        ),
      );

      phoneNumbersReservation.removePhoneNumber(phoneNumbers[0].id as string);
      phoneNumbersReservation.removePhoneNumber(phoneNumbers[1].id as string);
      updatedReservationResponse = await client.createOrUpdateReservation(phoneNumbersReservation);

      assert.isFalse(
        Object.keys(updatedReservationResponse.phoneNumbers || {}).includes(
          phoneNumbers[0].id as string,
        ),
      );
      assert.isFalse(
        Object.keys(updatedReservationResponse.phoneNumbers || {}).includes(
          phoneNumbers[1].id as string,
        ),
      );

      await client.deleteReservation(reservationId);
    });

    it(
      "throws error when starting purchase without agreement to not resell Browse API",
      { timeout: 60000 },
      async () => {
        const browseAvailableNumberRequest: BrowseAvailableNumbersRequest = {
          countryCode: "FR",
          phoneNumberType: "tollFree",
          capabilities: {
            calling: "outbound",
          },
          assignmentType: "application",
        };

        const browseAvailableNumbers = await client.browseAvailablePhoneNumbers(
          browseAvailableNumberRequest,
        );

        const phoneNumbers = browseAvailableNumbers.phoneNumbers;
        const phoneNumbersReservation = new PhoneNumbersReservation(reservationId);
        phoneNumbersReservation.addPhoneNumber(phoneNumbers[0]);

        await client.createOrUpdateReservation(phoneNumbersReservation);

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
          await client.beginPurchasePhoneNumbers(reservationId, {
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
