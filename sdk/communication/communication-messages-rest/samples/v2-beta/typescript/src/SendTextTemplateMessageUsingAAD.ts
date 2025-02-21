// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Use AAD token credentials when sending a whatsapp template message.
 */

import { isNodeLike } from "@azure/core-util";
import type { TokenCredential } from "@azure/identity";
import { ClientSecretCredential, DefaultAzureCredential } from "@azure/identity";
import type {
  MessageTemplate,
  MessageTemplateValue,
  MessageTemplateBindings
} from "@azure-rest/communication-messages";
import NotificationClient, { isUnexpected } from "@azure-rest/communication-messages";

// Load the .env file if it exists
import "dotenv/config";

export async function main(): Promise<void> {
  // You will need to set this environment variable or edit the following values
  const endpoint = process.env.ACS_URL || "";

  // Azure AD Credential information is required to run this sample:
  if (
    !process.env.AZURE_TENANT_ID ||
    !process.env.AZURE_CLIENT_ID ||
    !process.env.AZURE_CLIENT_SECRET
  ) {
    console.error(
      "Azure AD authentication information not provided, but it is required to run this sample. Exiting.",
    );
    return;
  }

  // get credentials
  const credential: TokenCredential = isNodeLike
    ? new DefaultAzureCredential()
    : new ClientSecretCredential(
        process.env.AZURE_TENANT_ID,
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
      );

  const client = NotificationClient(endpoint, credential);

  const DaysTemplateValue: MessageTemplateValue = {
    kind: "text",
    name: "Days",
    text: "5",
  };

  const templateBindings: MessageTemplateBindings = {
    kind: "whatsApp",
    body: [
      {
        refValue: "Days",
      },
    ],
  };

  const template: MessageTemplate = {
    name: "sample_shipping_confirmation",
    language: "en_US",
    bindings: templateBindings,
    values: [DaysTemplateValue],
  };

  const result = await client.path("/messages/notifications:send").post({
    contentType: "application/json",
    body: {
      channelRegistrationId: process.env.CHANNEL_ID || "",
      to: [process.env.RECIPIENT_PHONE_NUMBER || ""],
      kind: "template",
      template: template,
    },
  });

  console.log("Response: " + JSON.stringify(result, null, 2));

  if (isUnexpected(result)) {
    throw new Error("Failed to send message");
  }

  await result.body.receipts.forEach((receipt) => {
        console.log("Message sent to:" + receipt.to + " with message id:" + receipt.messageId);
      });
}

main().catch((error) => {
  console.error("Encountered an error while sending message: ", error);
  throw error;
});
