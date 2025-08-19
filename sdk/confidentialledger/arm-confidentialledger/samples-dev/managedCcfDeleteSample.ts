// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes an existing Managed CCF.
 *
 * @summary Deletes an existing Managed CCF.
 * x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/ManagedCCF_Delete.json
 */

import { ConfidentialLedgerClient } from "@azure/arm-confidentialledger";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function confidentialLedgerDelete(): Promise<void> {
  const subscriptionId =
    process.env["CONFIDENTIALLEDGER_SUBSCRIPTION_ID"] ||
    "0000000-0000-0000-0000-000000000001";
  const resourceGroupName =
    process.env["CONFIDENTIALLEDGER_RESOURCE_GROUP"] ||
    "DummyResourceGroupName";
  const appName = "DummyMccfAppName";
  const credential = new DefaultAzureCredential();
  const client = new ConfidentialLedgerClient(credential, subscriptionId);
  const result = await client.managedCCFOperations.beginDeleteAndWait(
    resourceGroupName,
    appName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await confidentialLedgerDelete();
}

main().catch(console.error);
