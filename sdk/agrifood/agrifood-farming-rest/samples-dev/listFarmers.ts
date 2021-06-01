// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This sample demonstrates how get a list of farmers and how to get all pages in case the service returns a paged result
 *
 * @summary gets a list of farmers
 * @azsdk-weight 20
 */

import FarmBeats, { Farmer } from "@azure-rest/agrifood-farming";
import { DefaultAzureCredential } from "@azure/identity";
import dotenv from "dotenv";

dotenv.config();

const endpoint = process.env["FARMBEATS_ENDPOINT"] || "";

async function main() {
  const farming = FarmBeats(endpoint, new DefaultAzureCredential());

  const result = await farming.path("/farmers").get();

  if (result.status !== "200") {
    throw result.body.error?.message;
  }

  let farmers: Farmer[] = result.body.value ?? [];
  let skipToken = result.body.skipToken;

  // Farmer results may be paginated. In case there are more than one page of farmers
  // the service would return a skipToken that can be used for subsequent request to get
  // the next page of farmers. Here we'll keep calling until the service stops returning a
  // skip token which means that there are no more pages.
  while (skipToken) {
    const page = await farming.path("/farmers").get({ queryParameters: { $skipToken: skipToken } });
    if (page.status !== "200") {
      throw page.body.error;
    }

    farmers.concat(page.body.value ?? []);
    skipToken = page.body.skipToken;
  }

  // Lof each farmer id
  farmers.forEach((farmer) => {
    console.log(farmer.id);
  });
}

main().catch(console.error);
