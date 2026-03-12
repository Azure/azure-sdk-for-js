// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete an application control machine group
 *
 * @summary Delete an application control machine group
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/stable/2020-01-01/examples/ApplicationWhitelistings/DeleteAdaptiveApplicationControls_example.json
 */

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteAnApplicationControlMachineGroup(): Promise<void> {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] || "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const ascLocation = "centralus";
  const groupName = "GROUP1";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.adaptiveApplicationControls.delete(ascLocation, groupName);
  console.log(result);
}

async function main(): Promise<void> {
  await deleteAnApplicationControlMachineGroup();
}

main().catch(console.error);
