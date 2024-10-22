// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Download a media file
 */

const NotificationClient = require("@azure-rest/communication-messages").default;
const { AzureKeyCredential } = require("@azure/core-auth");
const fs = require("fs");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  const credential = new AzureKeyCredential(process.env.ACS_ACCESS_KEY || "");
  const endpoint = process.env.ACS_URL || "";
  const client = NotificationClient(endpoint, credential);
  console.log("Downloading...");
  await client
    .path("/messages/streams/{id}", "<MEDIA_ID>")
    .get()
    .asNodeStream()
    .then((resp) => {
      resp.body?.pipe(fs.createWriteStream("downloadedMedia.jpeg"));
      return;
    });
}

main().catch((error) => {
  console.error("Encountered an error while sending message: ", error);
  process.exit(1);
});
