// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how delete a party
 *
 * @summary deletes a party
 */

const FarmBeats = require("@azure-rest/agrifood-farming");
const { DefaultAzureCredential } = require("@azure/identity");
const dotenv = require("dotenv");

dotenv.config();

const endpoint = process.env["FARMBEATS_ENDPOINT"] || "";

async function main() {
  const farmbeatsClient = FarmBeats(endpoint, new DefaultAzureCredential());
  const partyId = "test_party";
  const result = await farmbeatsClient.path("/parties/{partyId}", partyId).delete();
  if (result.status !== "204") {
    throw result.body.error;
  }

  console.log(`Deleted Party: ${partyId}`);
}

main().catch(console.error);
