// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This sample demonstrates how create a farmer
 *
 * @summary creates a farmer
 */

const FarmBeats = require("@azure-rest/agrifood-farming");
const { DefaultAzureCredential } = require("@azure/identity");
const dotenv = require("dotenv");

dotenv.config();

const endpoint = process.env["FARMBEATS_ENDPOINT"] || "";

async function main() {
  const farming = FarmBeats(endpoint, new DefaultAzureCredential());
  const farmerId = "test_farmer";
  const result = await farming.path("/farmers/{farmerId}", farmerId).patch({
    body: {
      name: "Contoso Farmer",
      description: "Your custom farmer description here",
      status: "Active",
      properties: { foo: "bar", "numeric one": 1, "1": "numeric key" }
    },
    // Set the content-type of the request
    contentType: "application/merge-patch+json"
  });

  if (result.status !== "200" && result.status !== "201") {
    throw result.body.error;
  }

  console.log(`Created Farmer: ${result.body.name}`);
}

main().catch(console.error);
