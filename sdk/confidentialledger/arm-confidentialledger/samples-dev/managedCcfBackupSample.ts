// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Backs up a Managed CCF Resource.
 *
 * @summary Backs up a Managed CCF Resource.
 * x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/ManagedCCF_Backup.json
 */

import type {
  ManagedCCFBackup} from "@azure/arm-confidentialledger";
import {
  ConfidentialLedgerClient,
} from "@azure/arm-confidentialledger";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function managedCcfBackup(): Promise<void> {
  const subscriptionId =
    process.env["CONFIDENTIALLEDGER_SUBSCRIPTION_ID"] ||
    "0000000-0000-0000-0000-000000000001";
  const resourceGroupName =
    process.env["CONFIDENTIALLEDGER_RESOURCE_GROUP"] ||
    "DummyResourceGroupName";
  const appName = "DummyMccfAppName";
  const managedCCF: ManagedCCFBackup = {
    restoreRegion: "EastUS",
    uri: "DummySASUri",
  };
  const credential = new DefaultAzureCredential();
  const client = new ConfidentialLedgerClient(credential, subscriptionId);
  const result = await client.managedCCFOperations.beginBackupAndWait(
    resourceGroupName,
    appName,
    managedCCF,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await managedCcfBackup();
}

main().catch(console.error);
