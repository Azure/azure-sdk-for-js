// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how get a list of parties and how to get all pages in case the service returns a paged result
 *
 * @summary gets a list of parties
 */

import FarmBeats, { isUnexpected, PartyOutput, paginate } from "@azure-rest/agrifood-farming";
import { DefaultAzureCredential } from "@azure/identity";
import dotenv from "dotenv";

dotenv.config();

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
