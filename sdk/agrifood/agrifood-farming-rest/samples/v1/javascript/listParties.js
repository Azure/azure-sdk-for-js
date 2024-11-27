// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how get a list of parties and how to get all pages in case the service returns a paged result
 *
 * @summary gets a list of parties
 */

const FarmBeats = require("@azure-rest/agrifood-farming");
const { DefaultAzureCredential } = require("@azure/identity");
const dotenv = require("dotenv");

dotenv.config();

const endpoint = process.env["FARMBEATS_ENDPOINT"] || "";

async function main() {
  const farmbeatsClient = FarmBeats(endpoint, new DefaultAzureCredential());

  const result = await farmbeatsClient.path("/parties").get();

  if (result.status !== "200") {
    throw result.body.error?.message;
  }

  let parties = result.body.value ?? [];
  let skipToken = result.body.skipToken;

  // Party results may be paginated. In case there are more than one page of parties
  // the service would return a skipToken that can be used for subsequent request to get
  // the next page of parties. Here we'll keep calling until the service stops returning a
  // skip token which means that there are no more pages.
  while (skipToken) {
    const page = await farmbeatsClient.path("/parties").get({ queryParameters: { $skipToken: skipToken } });
    if (page.status !== "200") {
      throw page.body.error;
    }

    parties.concat(page.body.value ?? []);
    skipToken = page.body.skipToken;
  }

  // Lof each party id
  parties.forEach((party) => {
    console.log(party.id);
  });
}

main().catch(console.error);
