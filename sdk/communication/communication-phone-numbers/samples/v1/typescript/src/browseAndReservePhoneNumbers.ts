// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Browse and reserve an available phone number.
 */

import type {
  BrowseAvailableNumbersRequest,
  AvailablePhoneNumber,
} from "@azure/communication-phone-numbers";
import { randomUUID } from "@azure/core-util";
import { PhoneNumbersClient } from "@azure/communication-phone-numbers";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log("\n== Browse and reserve available phone numbers sample ==\n");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

  // create new client
  const client = new PhoneNumbersClient(connectionString);

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
    }
  );
  const phoneNumbers = browseAvailableNumbers.phoneNumbers;
  const phoneNumbersList = [phoneNumbers[0], phoneNumbers[1]];
  const reservationId = randomUUID();
  const reservationResponse = await client.createOrUpdateReservation(
    {
      reservationId: reservationId,
    },
    {
      add: phoneNumbersList,
    }
  );
  const numbersWithError: AvailablePhoneNumber[] = [];
  for (const number of Object.values(reservationResponse.phoneNumbers || {})) {
    if (number != null && number.status === "error") {
      numbersWithError.push(number);
    }
  }
  if (numbersWithError.length > 0) {
    console.log("Errors occurred during reservation");
  } else {
    console.log("Reservation operation completed without errors.");
  }
  await client.deleteReservation(reservationId);
}

main().catch((error) => {
  console.log("The sample encountered an error:", error);
  process.exit(1);
});
