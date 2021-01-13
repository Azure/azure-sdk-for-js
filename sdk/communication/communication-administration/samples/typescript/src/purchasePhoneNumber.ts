// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to us the PhoneNumberAdministrationClient
 * to purchase a phone number and use it to send a SMS.
 */

import {
  CreateReservationRequest,
  PhoneNumberAdministrationClient
} from "@azure/communication-administration";

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

// You will need to set this environment variables or edit the following values
const connectionString =
  process.env["COMMUNICATION_CONNECTION_STRING"] || "<communication service connection string>";

export const main = async () => {
  console.log("\n== Purchase Phone Number Typescript Sample ==\n");

  // create an instance of PhoneNumberAdministrationClient
  const phoneNumberClient = new PhoneNumberAdministrationClient(connectionString);

  // create reservation request
  const phonePlanIds = ["ac4b0d70-30ef-422a-b5c7-8b751f021d0a"];
  const areaCode = "833";
  const reservationRequest: CreateReservationRequest = {
    name: "New reservation for 1 phone number",
    description: "New reservation for 1 phone number from sample app.",
    areaCode,
    phonePlanIds,
    quantity: 1
  };

  // create reservation poller
  const reservationPoller = await phoneNumberClient.beginReservePhoneNumbers(reservationRequest);

  console.log("Reserving phone number for purchase.");

  // poll until phone number reservation is made
  const reservation = await reservationPoller.pollUntilDone();

  if (reservation.reservationId && reservation.phoneNumbers && reservation.phoneNumbers.length) {
    console.log("Phone number reserved for purchase.");
    console.log(`Reservation: ${JSON.stringify(reservation)}`);

    const phoneNumber = reservation.phoneNumbers[0];

    // create purchase poller
    const purchasePoller = await phoneNumberClient.beginPurchaseReservation(
      reservation.reservationId!
    );

    console.log("Purchasing phone number from reservation.");

    // poll until reservation is purchased
    purchasePoller.pollUntilDone();

    console.log(`Phone number, ${phoneNumber}, purchased successfully.`);
  } else {
    console.log("No phone number found matching request.");
  }
};

main().catch((error) => {
  console.error("Encountered an error while purchasing phone number: ");
  console.error("Request: \n", error.request);
  console.error("\nResponse: \n", error.response);
  console.error(error);
});
