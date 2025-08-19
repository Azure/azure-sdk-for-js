// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all the security connectors in the specified subscription. Use the 'nextLink' property in the response to get the next page of security connectors for the specified subscription.
 *
 * @summary Lists all the security connectors in the specified subscription. Use the 'nextLink' property in the response to get the next page of security connectors for the specified subscription.
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2023-10-01-preview/examples/SecurityConnectors/GetSecurityConnectorsSubscription_example.json
 */

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listAllSecurityConnectorsOfASpecifiedSubscription(): Promise<void> {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] || "a5caac9c-5c04-49af-b3d0-e204f40345d5";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.securityConnectors.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllSecurityConnectorsOfASpecifiedSubscription();
}

main().catch(console.error);
