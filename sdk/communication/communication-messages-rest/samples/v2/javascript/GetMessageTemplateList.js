// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Get Template list for a channel
 */

const { isUnexpected, paginate } = require("@azure-rest/communication-messages");
const MessageTemplateClient = require("@azure-rest/communication-messages").default;
const { AzureKeyCredential } = require("@azure/core-auth");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  const credential = new AzureKeyCredential(process.env.ACS_ACCESS_KEY || "");
  const endpoint = process.env.ACS_URL || "";
  const client = MessageTemplateClient(endpoint, credential);
  console.log("Fetch Templates...");
  const response = await client
    .path("/messages/channels/{channelId}/templates", process.env.CHANNEl_ID || "")
    .get({
      queryParameters: { maxPageSize: 2 },
    });

  if (isUnexpected(response)) {
    throw new Error("Failed to get template for the channel.");
  }

  // The paginate helper creates a paged async iterator using metadata from the first page.
  const items = paginate(client, response);

  // We get an PageableAsyncIterator so we need to do `for await`.
  for await (const item of items) {
    console.log(JSON.stringify(item, null, 2));
  }
}

main().catch((error) => {
  console.error("Encountered an error while sending message: ", error);
  throw error;
});
