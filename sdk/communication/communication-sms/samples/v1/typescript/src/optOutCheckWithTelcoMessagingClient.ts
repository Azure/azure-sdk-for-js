// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Check if 1 or more recipients are opted out of receiving SMS messages using TelcoMessagingClient
 */

import { TelcoMessagingClient } from "@azure/communication-sms";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main(): Promise<void> {
    console.log("== Opt Out Check with TelcoMessagingClient ==");

    // You will need to set this environment variable or edit the following values
    const connectionString =
        process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
        "endpoint=https://<resource-name>.communication.azure.com/;<access-key>";

    // create new TelcoMessagingClient
    const client = new TelcoMessagingClient(connectionString);

    // construct send parameters
    const from = process.env.FROM_PHONE_NUMBER || process.env.AZURE_PHONE_NUMBER || "<from-phone-number>";
    let phoneNumbers: string[];
    if (process.env.TO_PHONE_NUMBERS !== undefined) {
        phoneNumbers = process.env.TO_PHONE_NUMBERS.split(",");
    } else if (process.env.AZURE_PHONE_NUMBER !== undefined) {
        phoneNumbers = [process.env.AZURE_PHONE_NUMBER];
    } else {
        phoneNumbers = ["<to-phone-number-1>", "<to-phone-number-2>"];
    }

    // send check opt out request using the optOuts sub-client
    const optOutCheckResults = await client.optOuts.check(
        from,
        phoneNumbers);

    // individual messages can encounter errors during sending
    // use the "httpStatusCode" property to verify
    for (const optOutCheckResult of optOutCheckResults) {
        if (optOutCheckResult.httpStatusCode === 200) {
            console.log("Success: ", optOutCheckResult);
        } else {
            console.error("Something went wrong when trying to send opt out check request: ", optOutCheckResults);
        }
    }

    console.log("== Done: Opt Out Check with TelcoMessagingClient ==");
}

main().catch((error) => {
    console.error("Encountered an error while checking opt out status: ", error);
    process.exit(1);
});
