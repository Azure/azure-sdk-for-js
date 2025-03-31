// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { matrix } from "@azure-tools/test-utils-vitest";
import { isPlaybackMode, type Recorder } from "@azure-tools/test-recorder";
import type {
  PhoneNumbersBrowseRequest,
  PhoneNumbersClient,
  PhoneNumbersCreateOrUpdateReservationOptionalParams,
} from "../../src/index.js";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient.js";
import { isClientErrorStatusCode } from "./utils/statusCodeHelpers.js";
import { describe, it, assert, beforeEach, afterEach, beforeAll, afterAll } from "vitest";
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

    afterAll(async () => {
      // await client.deleteReservation(reservationId);
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
      "can create phone number reservation with given reservation id",
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
        const options: PhoneNumbersCreateOrUpdateReservationOptionalParams = {
          phoneNumbers: { [phoneNumbers[0].id as string]: phoneNumbers[0] },
        };

        const reservationResponse = await client.createOrUpdateReservation(reservationId, options);
        assert.equal(reservationResponse.status, "active");
        assert.isTrue(reservationResponse.id === reservationId);

        const getReservationResponse = await client.getReservation(reservationId);
        assert.equal(getReservationResponse.status, "active");
        assert.isTrue(getReservationResponse.id === reservationId);
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
      const options: PhoneNumbersCreateOrUpdateReservationOptionalParams = {
        phoneNumbers: { [phoneNumbers[0].id as string]: phoneNumbers[0] },
      };

      const reservationResponse = await client.createOrUpdateReservation(reservationId, options);
      assert.equal(reservationResponse.status, "active");
      assert.isTrue(reservationResponse.id === reservationId);

      let updatedOptions: PhoneNumbersCreateOrUpdateReservationOptionalParams = {
        phoneNumbers: {
          [phoneNumbers[0].id as string]: phoneNumbers[0],
          [phoneNumbers[1].id as string]: phoneNumbers[1],
        },
      };
      let updatedReservationResponse = await client.createOrUpdateReservation(
        reservationId,
        updatedOptions,
      );
      assert.isTrue(
        Object.keys(updatedReservationResponse.phoneNumbers || {}).includes(
          phoneNumbers[1].id as string,
        ),
      );

      updatedOptions = {
        phoneNumbers: {
          [phoneNumbers[0].id as string]: null,
          [phoneNumbers[1].id as string]: null,
        },
      };
      updatedReservationResponse = await client.createOrUpdateReservation(
        reservationId,
        updatedOptions,
      );
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
    });
  });
});
