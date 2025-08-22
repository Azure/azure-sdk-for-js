// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List all security contact configurations for the subscription
 *
 * @summary List all security contact configurations for the subscription
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2023-12-01-preview/examples/SecurityContacts/GetSecurityContactsSubscription_example.json
 */

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listSecurityContactData(): Promise<void> {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] || "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.securityContacts.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listSecurityContactData();
}

main().catch(console.error);
