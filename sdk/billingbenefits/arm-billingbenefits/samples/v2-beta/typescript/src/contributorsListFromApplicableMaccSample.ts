// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list contributors under applicable MACCs for a given billing account.
 *
 * @summary list contributors under applicable MACCs for a given billing account.
 * x-ms-original-file: 2025-12-01-preview/ContributorsListFromApplicableMacc.json
 */
async function contributorsScopeList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const resArray = new Array();
  for await (const item of client.contributors.listFromApplicableMacc(
    "20000000-1000-0000-0000-000000000000:20000000-0000-3000-0000-000000000000_2019-05-31",
    "13810867107109237",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await contributorsScopeList();
}

main().catch(console.error);
