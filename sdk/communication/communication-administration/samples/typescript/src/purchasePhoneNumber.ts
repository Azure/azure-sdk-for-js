// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to us the PhoneNumberAdministrationClient
 * to purchase a phone number and use it to send a SMS.
 */

import { CreateReservationRequest, PhoneNumberAdministrationClient } from "@azure/communication-administration";
import { SmsClient } from "@azure/communication-sms";

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
  
  console.log("Phone number reserved for purchase.");
  console.log(`Reservation: ${JSON.stringify(reservation)}`);

  if (reservation.reservationId && reservation.phoneNumbers && reservation.phoneNumbers.length) {
    const phoneNumber = reservation.phoneNumbers[0];

    // create purchase poller
    const purchasePoller = await phoneNumberClient.beginPurchaseReservation(reservation.reservationId!);
    
    console.log("Purchasing phone number from reservation.");

    // poll until reservation is purchased
    purchasePoller.pollUntilDone();

    console.log(`Phone number, ${phoneNumber}, purchased successfully.`);
    console.log("Will attempt to send an SMS with new number...");

    // wait before using number to send SMS
    let timer = 45;
    const interval = setInterval(() => {
      timer -= 9;
      console.log(`Sending SMS in ${timer}s...`);
    }, 9000);

    await new Promise((resolve) => {
      setTimeout(async () => {
        clearInterval(interval);

        console.log("Sending Sms...");

        // create an instance of SmsClient
        const smsClient = new SmsClient(connectionString);
        
        // send sms with new number
        await smsClient.send({
          to: ["+12127319863"],
          from: phoneNumber,
          message: "New phone number purchased successfully!"
        });
    
        console.log("Message sent successfully!");
        resolve();
      }, 46000);
    });
  } else {
    throw new Error("No phone numbers found.");
  }
}

main().catch((error) => {
  console.error("Encountered an error while purchasing phone number: ");
  console.error("Request: \n", error.request);
  console.error("\nResponse: \n", error.response);
  console.error(error);
});