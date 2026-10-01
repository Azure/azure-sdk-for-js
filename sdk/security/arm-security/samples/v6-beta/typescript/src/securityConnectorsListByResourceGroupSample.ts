// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all the security connectors in the specified resource group. Use the 'nextLink' property in the response to get the next page of security connectors for the specified resource group.
 *
 * @summary lists all the security connectors in the specified resource group. Use the 'nextLink' property in the response to get the next page of security connectors for the specified resource group.
 * x-ms-original-file: 2024-08-01-preview/SecurityConnectors/GetSecurityConnectorsResourceGroup_example.json
 */
async function listAllSecurityConnectorsOfASpecifiedResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a5caac9c-5c04-49af-b3d0-e204f40345d5";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.securityConnectors.listByResourceGroup("exampleResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllSecurityConnectorsOfASpecifiedResourceGroup();
}

main().catch(console.error);
