// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how get a list of parties and how to get all pages in case the service returns a paged result
 *
 * @summary gets a list of parties
 */

const FarmBeats = require("@azure-rest/agrifood-farming").default,
  { isUnexpected, paginate } = require("@azure-rest/agrifood-farming");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

const endpoint = process.env["FARMBEATS_ENDPOINT"] || "";

async function main() {
  const farming = FarmBeats(endpoint, new DefaultAzureCredential());
  const response = await farming.path("/parties").get();

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  const parties = paginate(farming, response);

  // Lof each party id
  for await (const party of parties) {
    const partyOutput = party;
    console.log(partyOutput.id);
  }
}

main().catch(console.error);
