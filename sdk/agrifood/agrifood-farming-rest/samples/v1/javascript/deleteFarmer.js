// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This sample demonstrates how delete a farmer
 *
 * @summary deletes a farmer
 */

const FarmBeats = require("@azure-rest/agrifood-farming");
const { DefaultAzureCredential } = require("@azure/identity");
const dotenv = require("dotenv");

dotenv.config();

const endpoint = process.env["FARMBEATS_ENDPOINT"] || "";

async function main() {
  const farming = FarmBeats(endpoint, new DefaultAzureCredential());
  const farmerId = "test_farmer";
  const result = await farming.path("/farmers/{farmerId}", farmerId).delete();
  if (result.status !== "204") {
    throw result.body.error;
  }

  console.log(`Deleted Farmer: ${farmerId}`);
}

main().catch(console.error);
