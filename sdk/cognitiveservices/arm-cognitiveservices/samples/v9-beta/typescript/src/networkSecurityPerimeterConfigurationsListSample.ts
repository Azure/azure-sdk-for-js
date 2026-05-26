// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of NSP configurations for an account.
 *
 * @summary gets a list of NSP configurations for an account.
 * x-ms-original-file: 2026-01-15-preview/ListNetworkSecurityPerimeterConfigurations.json
 */
async function listNetworkSecurityPerimeterConfigurations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkSecurityPerimeterConfigurations.list(
    "resourceGroupName",
    "accountName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listNetworkSecurityPerimeterConfigurations();
}

main().catch(console.error);
