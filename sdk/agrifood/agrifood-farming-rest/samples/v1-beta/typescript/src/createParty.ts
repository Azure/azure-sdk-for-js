// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how create a party
 *
 * @summary creates a party
 */

import FarmBeats, { PartyOutput, isUnexpected } from "@azure-rest/agrifood-farming";
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

  if (isUnexpected(result)) {
    throw result.body.error;
  }

  const party = result.body;
  console.log(`Created Party: ${party.name}`);
}

main().catch(console.error);
