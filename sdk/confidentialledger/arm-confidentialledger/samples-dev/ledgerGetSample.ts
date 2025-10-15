// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Retrieves the properties of a Confidential Ledger.
 *
 * @summary Retrieves the properties of a Confidential Ledger.
 * x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/ConfidentialLedger_Get.json
 */

import { ConfidentialLedgerClient } from "@azure/arm-confidentialledger";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function confidentialLedgerGet(): Promise<void> {
  const subscriptionId =
    process.env["CONFIDENTIALLEDGER_SUBSCRIPTION_ID"] ||
    "0000000-0000-0000-0000-000000000001";
  const resourceGroupName =
    process.env["CONFIDENTIALLEDGER_RESOURCE_GROUP"] ||
    "DummyResourceGroupName";
  const ledgerName = "DummyLedgerName";
  const credential = new DefaultAzureCredential();
  const client = new ConfidentialLedgerClient(credential, subscriptionId);
  const result = await client.ledger.get(resourceGroupName, ledgerName);
  console.log(result);
}

async function main(): Promise<void> {
  await confidentialLedgerGet();
}

main().catch(console.error);
