// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all the private links in the specified resource group. private links enable secure, private connectivity to Microsoft Defender for Cloud services without exposing traffic to the public internet. Use the 'nextLink' property in the response to get the next page of private links for the specified resource group.
 *
 * @summary lists all the private links in the specified resource group. private links enable secure, private connectivity to Microsoft Defender for Cloud services without exposing traffic to the public internet. Use the 'nextLink' property in the response to get the next page of private links for the specified resource group.
 * x-ms-original-file: 2026-01-01/PrivateLinks/PrivateLinks_List.json
 */
async function listPrivateLinks(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateLinks.list("rg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listPrivateLinks();
}

main().catch(console.error);
