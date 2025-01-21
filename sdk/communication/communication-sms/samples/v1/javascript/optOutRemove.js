// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Remove 1 or more recipients from Opt Out list
 */

const { SmsClient } = require("@azure/communication-sms");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
    console.log("== Opt Out Remove ==");

    // You will need to set this environment variable or edit the following values
    const connectionString =
        process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
        "endpoint=https://<resource-name>.communication.azure.com/;<access-key>";

    // create new client
    const client = new SmsClient(connectionString);

    // construct send parameters
    const from = process.env.FROM_PHONE_NUMBER || process.env.AZURE_PHONE_NUMBER || "<from-phone-number>";
    let phoneNumbers;
    if (process.env.TO_PHONE_NUMBERS !== undefined) {
        phoneNumbers = process.env.TO_PHONE_NUMBERS.split(",");
    } else if (process.env.AZURE_PHONE_NUMBER !== undefined) {
        phoneNumbers = [process.env.AZURE_PHONE_NUMBER];
    } else {
        phoneNumbers = ["<to-phone-number-1>", "<to-phone-number-2>"];
    }

    // send opt out remove request
    const optOutRemoveResults = await client.optOuts.remove(
        from,
        phoneNumbers);

    // individual messages can encounter errors during sending
    // use the "httpStatusCode" property to verify
    for (const optOutRemoveResult of optOutRemoveResults) {
        if (optOutRemoveResult.httpStatusCode == 200) {
            console.log("Success: ", optOutRemoveResult);
        } else {
            console.error("Something went wrong when trying to send opt out remove request: ", optOutRemoveResults);
        }
    }

    console.log("== Done: Opt Out Remove ==");
}

main().catch((error) => {
    console.error("Encountered an error while sending opt out remove request: ", error);
    process.exit(1);
});

module.exports = { main };
