// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete an Application over a given scope
 *
 * @summary delete an Application over a given scope
 * x-ms-original-file: 2022-07-01-preview/Applications/DeleteSecurityConnectorApplication_example.json
 */
async function deleteSecurityApplication(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  await client.securityConnectorApplication.delete(
    "gcpResourceGroup",
    "gcpconnector",
    "ad9a8e26-29d9-4829-bb30-e597a58cdbb8",
  );
}

async function main(): Promise<void> {
  await deleteSecurityApplication();
}

main().catch(console.error);
