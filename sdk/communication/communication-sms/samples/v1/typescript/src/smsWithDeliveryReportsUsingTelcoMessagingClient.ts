// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Send SMS with delivery reports and retrieve delivery status using TelcoMessagingClient
 */

import { TelcoMessagingClient } from "@azure/communication-sms";
import type { SmsSendRequest, SmsSendOptions } from "@azure/communication-sms";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main(): Promise<void> {
    console.log("== SMS with Delivery Reports using TelcoMessagingClient ==");

    // You will need to set this environment variable or edit the following values
    const connectionString =
        process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
        "endpoint=https://<resource-name>.communication.azure.com/;<access-key>";

    // create new TelcoMessagingClient
    const client = new TelcoMessagingClient(connectionString);

    // construct send request with delivery reports enabled
    const phoneNumber = process.env.TO_PHONE_NUMBER || process.env.AZURE_PHONE_NUMBER || "<to-phone-number>";

    const sendRequest: SmsSendRequest = {
        from: process.env.FROM_PHONE_NUMBER || process.env.AZURE_PHONE_NUMBER || "<from-phone-number>",
        to: [phoneNumber],
        message: "Hello! This message has delivery reports enabled.",
    };

    const sendOptions: SmsSendOptions = {
        enableDeliveryReport: true,
        tag: "delivery-report-sample"
    };

    // send sms using the sms sub-client
    const sendResults = await client.sms.send(sendRequest, sendOptions);

    // check if message was sent successfully and get message ID
    for (const sendResult of sendResults) {
        if (sendResult.successful && sendResult.messageId) {
            console.log("SMS sent successfully. Message ID: ", sendResult.messageId);
            
            // Get delivery report using the deliveryReports sub-client
            try {
                console.log("Fetching delivery report...");
                const deliveryReport = await client.deliveryReports.get(sendResult.messageId);
                console.log("Delivery Report: ", deliveryReport);
            } catch (error: any) {
                if (error.statusCode === 404) {
                    console.log("Delivery report not yet available. It may take some time to be generated.");
                } else {
                    console.error("Error fetching delivery report: ", error);
                }
            }
        } else {
            console.error("Failed to send SMS: ", sendResult);
        }
    }

    console.log("== Done: SMS with Delivery Reports using TelcoMessagingClient ==");
}

main().catch((error) => {
    console.error("Encountered an error: ", error);
    process.exit(1);
});
