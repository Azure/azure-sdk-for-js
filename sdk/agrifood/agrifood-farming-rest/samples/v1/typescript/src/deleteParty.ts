// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how delete a party
 *
 * @summary deletes a party
 */

import FarmBeats from "@azure-rest/agrifood-farming";
import { DefaultAzureCredential } from "@azure/identity";
import dotenv from "dotenv";

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
