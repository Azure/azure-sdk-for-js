// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This sample demonstrates how create a party
 *
 * @summary creates a party
 */

import FarmBeats from "@azure-rest/agrifood-farming";
import { DefaultAzureCredential } from "@azure/identity";
import dotenv from "dotenv";

dotenv.config();

const endpoint = process.env["FARMBEATS_ENDPOINT"] || "";

async function main() {
  const farmbeatsClient = FarmBeats(endpoint, new DefaultAzureCredential());
  const partyId = "test_party";
  const result = await farmbeatsClient.path("/parties/{partyId}", partyId).patch({
    body: {
      name: "Contoso Party",
      description: "Your custom party description here",
      status: "Active",
      properties: { foo: "bar", "numeric one": 1, "1": "numeric key" },
    },
    // Set the content-type of the request
    contentType: "application/merge-patch+json",
  });

  if (result.status !== "200" && result.status !== "201") {
    throw result.body.error;
  }

  console.log(`Created Party: ${result.body.name}`);
}

main().catch(console.error);
