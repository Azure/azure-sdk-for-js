// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { matrix } from "@azure-tools/test-utils-vitest";
import { type Recorder } from "@azure-tools/test-recorder";
import type {
  PhoneNumbersBrowseRequest,
  PhoneNumbersClient} from "../../src/index.js";
import {
  PhoneNumbersReservation,
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
      const browseAvailableNumberRequest: PhoneNumbersBrowseRequest = {
        phoneNumberType: "tollFree",
        capabilities: {
          calling: "outbound",
        },
        assignmentType: "application",
      };

      const browseAvailableNumbers = await client.browseAvailablePhoneNumbers(
        "US",
        browseAvailableNumberRequest,
      );
      assert.isTrue(browseAvailableNumbers.phoneNumbers.length > 0);

      for (const phoneNumber of browseAvailableNumbers.phoneNumbers) {
        assert.equal(phoneNumber.phoneNumberType, "tollFree");
        assert.isTrue(phoneNumber.capabilities.calling.includes("outbound"));
        assert.equal(phoneNumber.assignmentType, "application");
      }

      const browseGeographicAvailableNumberRequest: PhoneNumbersBrowseRequest = {
        phoneNumberType: "geographic",
      };

      const browseGeographicAvailableNumbers = await client.browseAvailablePhoneNumbers(
        "US",
        browseGeographicAvailableNumberRequest,
      );
      assert.isTrue(browseGeographicAvailableNumbers.phoneNumbers.length > 0);

      for (const phoneNumber of browseGeographicAvailableNumbers.phoneNumbers) {
        assert.equal(phoneNumber.phoneNumberType, "geographic");
      }
    });

    it("throws error on invalid browse request", { timeout: 60000 }, async () => {
      // Invalid value for countryCode
      const invalidBrowseRequest: PhoneNumbersBrowseRequest = {
        phoneNumberType: "tollFree",
        assignmentType: "application",
        capabilities: {
          sms: "inbound+outbound",
          calling: "none",
        },
      };

      try {
        await client.browseAvailablePhoneNumbers("INVALID", invalidBrowseRequest);
      } catch (error: any) {
        assert.isTrue(
          isClientErrorStatusCode(error.statusCode),
          `Status code ${error.statusCode} does not indicate client error.`,
        );
        return;
      }

      assert.fail("browseAvailablePhoneNumbers should have thrown an exception.");
    });

    it(
      "can create phone number reservation without reservationId",
      { timeout: 60000 },
      async () => {
        const browseAvailableNumberRequest: PhoneNumbersBrowseRequest = {
          phoneNumberType: "tollFree",
          capabilities: {
            calling: "outbound",
          },
          assignmentType: "application",
        };

        const browseAvailableNumbers = await client.browseAvailablePhoneNumbers(
          "US",
          browseAvailableNumberRequest,
        );

        const phoneNumbers = browseAvailableNumbers.phoneNumbers;
        const phoneNumbersReservation = new PhoneNumbersReservation(reservationId);
        phoneNumbersReservation.addPhoneNumber(phoneNumbers[0]);

        const reservationResponse = await client.createOrUpdateReservation(phoneNumbersReservation);
        const responseReservationId = reservationResponse.id ? reservationResponse.id : "";
        assert.equal(reservationResponse.status, "active");
        assert.isTrue(reservationResponse.id !== "");

        const getReservationResponse = await client.getReservation(responseReservationId);
        assert.equal(getReservationResponse.status, "active");
        assert.isTrue(getReservationResponse.id === responseReservationId);

        await client.deleteReservation(responseReservationId);
      },
    );

    it("can update an existing reservation", { timeout: 60000 }, async () => {
      const browseAvailableNumberRequest: PhoneNumbersBrowseRequest = {
        phoneNumberType: "tollFree",
        capabilities: {
          calling: "outbound",
        },
        assignmentType: "application",
      };

      const browseAvailableNumbers = await client.browseAvailablePhoneNumbers(
        "US",
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

      phoneNumbersReservation.removePhoneNumber(phoneNumbers[0]);
      phoneNumbersReservation.removePhoneNumber(phoneNumbers[1]);
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
      "throws error when starting purchase without agreement to not resell",
      { timeout: 60000 },
      async () => {
        const browseAvailableNumberRequest: PhoneNumbersBrowseRequest = {
          phoneNumberType: "tollFree",
          capabilities: {
            calling: "outbound",
          },
          assignmentType: "application",
        };

        const browseAvailableNumbers = await client.browseAvailablePhoneNumbers(
          "FR",
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
  });
});
