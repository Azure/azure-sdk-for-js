// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Revalidates workspace managed sql server's existing encryption protector.
 *
 * @summary Revalidates workspace managed sql server's existing encryption protector.
 * x-ms-original-file: specification/synapse/resource-manager/Microsoft.Synapse/stable/2021-06-01/examples/WorkspaceManagedSqlServerEncryptionProtectorRevalidate.json
 */

import { SynapseManagementClient } from "@azure/arm-synapse";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function revalidatesTheEncryptionProtector(): Promise<void> {
  const subscriptionId =
    process.env["SYNAPSE_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SYNAPSE_RESOURCE_GROUP"] || "wsg-7398";
  const workspaceName = "testWorkspace";
  const encryptionProtectorName = "current";
  const credential = new DefaultAzureCredential();
  const client = new SynapseManagementClient(credential, subscriptionId);
  const result = await client.workspaceManagedSqlServerEncryptionProtector.beginRevalidateAndWait(
    resourceGroupName,
    workspaceName,
    encryptionProtectorName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await revalidatesTheEncryptionProtector();
}

main().catch(console.error);
