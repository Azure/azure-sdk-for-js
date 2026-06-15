// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete security contact configurations for the subscription
 *
 * @summary delete security contact configurations for the subscription
 * x-ms-original-file: 2023-12-01-preview/SecurityContacts/DeleteSecurityContact_example.json
 */
async function deletesASecurityContactData(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  await client.securityContacts.delete("default");
}

async function main(): Promise<void> {
  await deletesASecurityContactData();
}

main().catch(console.error);
