// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list of countries for Rulestack
 *
 * @summary list of countries for Rulestack
 * x-ms-original-file: 2025-10-08/LocalRulestacks_listCountries_MaximumSet_Gen.json
 */
async function localRulestacksListCountriesMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.localRulestacks.listCountries("rgopenapi", "lrs1", {
    skip: "a6a321",
    top: 20,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list of countries for Rulestack
 *
 * @summary list of countries for Rulestack
 * x-ms-original-file: 2025-10-08/LocalRulestacks_listCountries_MinimumSet_Gen.json
 */
async function localRulestacksListCountriesMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.localRulestacks.listCountries("rgopenapi", "lrs1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await localRulestacksListCountriesMaximumSetGen();
  await localRulestacksListCountriesMinimumSetGen();
}

main().catch(console.error);
