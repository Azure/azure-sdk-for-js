// Copyright (c) Microsoft Corporation.
// Licensed under the MIT Licence.

/**
 * @summary Use AAD token credentials when sending a SMS message.
 */

import { parseConnectionString } from "@azure/communication-common";
import { SmsClient, SmsSendRequest } from "@azure/communication-sms";
import { isNode } from "@azure/core-util";
import { ClientSecretCredential, DefaultAzureCredential, TokenCredential } from "@azure/identity";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log("== Send SMS Message With AAD Authentication ==");

  // You will need to set this environment variable or edit the following values
  const endpoint =
    parseConnectionString(process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING!).endpoint ||
    "https://<resource-name>.communication.azure.com";

  // Azure AD Credential information is required to run this sample:
  if (
    !process.env.AZURE_TENANT_ID ||
    !process.env.AZURE_CLIENT_ID ||
    !process.env.AZURE_CLIENT_SECRET
  ) {
    console.error(
      "Azure AD authentication information not provided, but it is required to run this sample. Exiting."
    );
    return;
  }

  // get credentials
  const credential: TokenCredential = isNode
    ? new DefaultAzureCredential()
    : new ClientSecretCredential(
        process.env.AZURE_TENANT_ID,
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET
      );

  // create new client with endpoint and credentials
  const client = new SmsClient(endpoint, credential);

  // construct send request
  let phoneNumbers: string[];
  if (process.env.TO_PHONE_NUMBERS !== undefined) {
    phoneNumbers = process.env.TO_PHONE_NUMBERS.split(",");
  } else if (process.env.AZURE_PHONE_NUMBER !== undefined) {
    phoneNumbers = [process.env.AZURE_PHONE_NUMBER];
  } else {
    phoneNumbers = ["<to-phone-number-1>", "<to-phone-number-2>"];
  }

  const sendRequest: SmsSendRequest = {
    from: process.env.FROM_PHONE_NUMBER || process.env.AZURE_PHONE_NUMBER || "<from-phone-number>",
    to: phoneNumbers,
    message: "Hello World via SMS!",
  };

  // send sms with request
  const sendResults = await client.send(sendRequest);

  for (const sendResult of sendResults) {
    if (sendResult.successful) {
      console.log("Success: ", sendResult);
    } else {
      console.error("Something went wrong when trying to send this message: ", sendResult);
    }
  }
}

main().catch((error) => {
  console.error("Encountered an error while sending SMS: ", error);
  process.exit(1);
});
