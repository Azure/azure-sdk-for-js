// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a security standard on a scope.
 *
 * @summary delete a security standard on a scope.
 * x-ms-original-file: 2021-08-01-preview/Standards/DeleteStandard_example.json
 */
async function deleteASecurityStandardOverTheSpecifiedScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  await client.standards.delete("myResourceGroup", "8bb8be0a-6010-4789-812f-e4d661c4ed0e");
}

async function main(): Promise<void> {
  await deleteASecurityStandardOverTheSpecifiedScope();
}

main().catch(console.error);
