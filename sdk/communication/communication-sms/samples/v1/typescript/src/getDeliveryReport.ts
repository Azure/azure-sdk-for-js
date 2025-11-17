// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Get delivery report for a sent SMS message
 * @azsdk-weight 70
 */

import { SmsClient } from "@azure/communication-sms";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  console.log("== Get Delivery Report Sample ==");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

  // create new client
  const client = new SmsClient(connectionString);

  // construct send request
  const sendRequest = {
    from: process.env.FROM_PHONE_NUMBER || process.env.AZURE_PHONE_NUMBER || "<from-phone-number>",
    to: [process.env.TO_PHONE_NUMBERS || process.env.AZURE_PHONE_NUMBER || "<from-phone-number>"],
    message: "Hello World via SMS with delivery report!",
  };

  // send sms with delivery reports enabled
  console.log("Sending SMS with delivery reports enabled...");
  const sendResults = await client.send(sendRequest, {
    enableDeliveryReport: true,
    tag: "delivery-report-sample",
  });

  // individual messages can encounter errors during sending
  // use the "successful" property to verify
  for (const sendResult of sendResults) {
    if (sendResult.successful) {
      console.log("Success: ", sendResult);

      // Get delivery report for this message
      const messageId = sendResult.messageId;
      console.log(`\nFetching delivery report for message ID: ${messageId}`);

      try {
        const deliveryReport = await client.getDeliveryReport(messageId);

        console.log("Delivery Report:");
        console.log("  Message ID: ", deliveryReport.messageId);
        console.log("  From: ", deliveryReport.from);
        console.log("  To: ", deliveryReport.to);
        console.log("  Status: ", deliveryReport.deliveryStatus);
        console.log("  Status Details: ", deliveryReport.deliveryStatusDetails);
        console.log("  Tag: ", deliveryReport.tag);

        if (deliveryReport.deliveryAttempts) {
          console.log("\n  Delivery Attempts:");
          for (const attempt of deliveryReport.deliveryAttempts) {
            console.log(`    - Timestamp: ${attempt.timestamp}`);
            console.log(`      Segments Succeeded: ${attempt.segmentsSucceeded}`);
            console.log(`      Segments Failed: ${attempt.segmentsFailed}`);
          }
        }
      } catch (error: any) {
        if (error.statusCode === 404) {
          console.log(
            "Delivery report not yet available. Note: Delivery reports may take some time to be available after message is sent.",
          );
        } else {
          console.error("Error getting delivery report:", error.message);
        }
      }
    } else {
      console.log("Something went wrong when trying to send this message: ", sendResult);
    }
  }

  console.log("\n== Done: Get Delivery Report Sample ==");
}

main().catch((error) => {
  console.error("Encountered an error while sending SMS: ", error);
  process.exit(1);
});
