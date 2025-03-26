// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { matrix } from "@azure-tools/test-utils-vitest";
import type { Recorder } from "@azure-tools/test-recorder";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import type { PhoneNumbersBrowseRequest, PhoneNumbersClient, PhoneNumbersCreateOrUpdateReservationOptionalParams } from "../../src/index.js";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient.js";
import { isClientErrorStatusCode } from "./utils/statusCodeHelpers.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { generateGUID } from "../../src/utils/helpers.js";

matrix([[true, false]], async (useAad) => {
  const skipPhoneNumbersTests = env.COMMUNICATION_SKIP_INT_PHONENUMBERS_TESTS === "true";

  describe(
    `PhoneNumbersClient  - reservations${useAad ? " [AAD]" : ""}`,
    { skip: skipPhoneNumbersTests && !isPlaybackMode() },
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

      it("can browse available phone number", { timeout: 60000 }, async () => {
        const browseAvailableNumberRequest: PhoneNumbersBrowseRequest = {
          phoneNumberType: "tollFree",
          capabilities: {
          calling: "outbound",
          },
          assignmentType: "application",
          };

          const browseAvailableNumbers = await client.browseAvailablePhoneNumbers("US", browseAvailableNumberRequest);
          assert.isTrue(browseAvailableNumbers.phoneNumbers.length > 0);

          for (const phoneNumber of browseAvailableNumbers.phoneNumbers) {
            assert.equal(phoneNumber.phoneNumberType, "tollFree");
            assert.isTrue(phoneNumber.capabilities.calling.includes("outbound"));
            assert.equal(phoneNumber.assignmentType, "application");
          }

          const browseGeographicAvailableNumberRequest: PhoneNumbersBrowseRequest = {
            phoneNumberType: "geographic"
          };

          const browseGeographicAvailableNumbers = await client.browseAvailablePhoneNumbers("US", browseGeographicAvailableNumberRequest);
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

      it("can create phone number reservation without reservationId", { timeout: 60000 }, async () => {
        const browseAvailableNumberRequest: PhoneNumbersBrowseRequest = {
          phoneNumberType: "tollFree",
          capabilities: {
          calling: "outbound",
          },
          assignmentType: "application",
          };

          const browseAvailableNumbers = await client.browseAvailablePhoneNumbers("US", browseAvailableNumberRequest);

          const phoneNumbers = browseAvailableNumbers.phoneNumbers;
          const options: PhoneNumbersCreateOrUpdateReservationOptionalParams = {
            phoneNumbers: { [phoneNumbers[0].id as string]: phoneNumbers[0] },
          };

          const reservationResponse = await client.createOrUpdateReservation("", options);
          const reservationId = reservationResponse.id ? reservationResponse.id : "";
          assert.equal(reservationResponse.status, "active");
          assert.isTrue(reservationResponse.id !== "");

          const getReservationResponse = await client.getReservation(reservationId);
          assert.equal(getReservationResponse.status, "active");
          assert.isTrue(getReservationResponse.id === reservationId);

          await client.deleteReservation(reservationId);
      });

      it("can create phone number reservation with given reservation id", { timeout: 60000 }, async () => {
        const browseAvailableNumberRequest: PhoneNumbersBrowseRequest = {
          phoneNumberType: "tollFree",
          capabilities: {
          calling: "outbound",
          },
          assignmentType: "application",
          };

          const browseAvailableNumbers = await client.browseAvailablePhoneNumbers("US", browseAvailableNumberRequest);

          const phoneNumbers = browseAvailableNumbers.phoneNumbers;
          const options: PhoneNumbersCreateOrUpdateReservationOptionalParams = {
            phoneNumbers: { [phoneNumbers[0].id as string]: phoneNumbers[0] },
          };

          const reservationId = generateGUID();
          const reservationResponse = await client.createOrUpdateReservation(reservationId, options);
          assert.equal(reservationResponse.status, "active");
          assert.isTrue(reservationResponse.id === reservationId);

          const getReservationResponse = await client.getReservation(reservationId);
          assert.equal(getReservationResponse.status, "active");
          assert.isTrue(getReservationResponse.id === reservationId);

          await client.deleteReservation(reservationId);
      });

      it("can update an existing reservation", { timeout: 60000 }, async () => {
        const browseAvailableNumberRequest: PhoneNumbersBrowseRequest = {
          phoneNumberType: "tollFree",
          capabilities: {
          calling: "outbound",
          },
          assignmentType: "application",
          };

          const browseAvailableNumbers = await client.browseAvailablePhoneNumbers("US", browseAvailableNumberRequest);

          const phoneNumbers = browseAvailableNumbers.phoneNumbers;
          let options: PhoneNumbersCreateOrUpdateReservationOptionalParams = {
            phoneNumbers: { [phoneNumbers[0].id as string]: phoneNumbers[0] },
          };

          const reservationId = generateGUID();
          let reservationResponse = await client.createOrUpdateReservation(reservationId, options);
          assert.equal(reservationResponse.status, "active");
          assert.isTrue(reservationResponse.id === reservationId);
          assert.equal(Object.keys(reservationResponse.phoneNumbers || {}).length, 1);

          options = {
            phoneNumbers: { 
              [phoneNumbers[0].id as string]: phoneNumbers[0], 
              [phoneNumbers[1].id as string]: phoneNumbers[1] 
            }
          };
          reservationResponse = await client.createOrUpdateReservation(reservationId, options);
          assert.equal(reservationResponse.status, "active");
          assert.isTrue(reservationResponse.id === reservationId);
          assert.equal(Object.keys(reservationResponse.phoneNumbers || {}).length, 2);

          const updatedOptions = {
            phoneNumbers: { 
              [phoneNumbers[0].id as string]: null, 
              [phoneNumbers[1].id as string]: phoneNumbers[1] 
            }
          };
          reservationResponse = await client.createOrUpdateReservation(reservationId, updatedOptions);
          assert.equal(Object.keys(reservationResponse.phoneNumbers || {}).length, 1);

          await client.deleteReservation(reservationId);
      });
    },
  );
});
