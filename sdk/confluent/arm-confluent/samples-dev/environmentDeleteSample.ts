// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete confluent environment by id
 *
 * @summary delete confluent environment by id
 * x-ms-original-file: 2025-08-18-preview/Environment_Delete_MaximumSet_Gen.json
 */
async function environmentDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  await client.environment.delete(
    "rgconfluent",
    "sowkvcymfiziohnofcudjyyaro",
    "lnmkjsylkxqqyrqmdaf",
  );
}

/**
 * This sample demonstrates how to delete confluent environment by id
 *
 * @summary delete confluent environment by id
 * x-ms-original-file: 2025-08-18-preview/Environment_Delete_MinimumSet_Gen.json
 */
async function environmentDeleteMinimumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  await client.environment.delete(
    "rgconfluent",
    "yetpbmqrfbsanzjzkzdodlcygpj",
    "quuhiyvpfajfxrqcyxsb",
  );
}

async function main(): Promise<void> {
  await environmentDeleteMaximumSet();
  await environmentDeleteMinimumSet();
}

main().catch(console.error);
