// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to use this method to delete yours IoT Security solution
 *
 * @summary use this method to delete yours IoT Security solution
 * x-ms-original-file: 2019-08-01/IoTSecuritySolutions/DeleteIoTSecuritySolution.json
 */
async function deleteAnIoTSecuritySolution(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  await client.iotSecuritySolution.delete("MyGroup", "default");
}

async function main(): Promise<void> {
  await deleteAnIoTSecuritySolution();
}

main().catch(console.error);
