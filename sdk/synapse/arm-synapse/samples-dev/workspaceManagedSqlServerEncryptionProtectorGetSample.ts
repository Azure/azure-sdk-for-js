// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get workspace managed sql server's encryption protector.
 *
 * @summary Get workspace managed sql server's encryption protector.
 * x-ms-original-file: specification/synapse/resource-manager/Microsoft.Synapse/stable/2021-06-01/examples/GetWorkspaceManagedSqlServerEncryptionProtector.json
 */

import { SynapseManagementClient } from "@azure/arm-synapse";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getWorkspaceManagedSqlServerEncryptionProtector(): Promise<void> {
  const subscriptionId =
    process.env["SYNAPSE_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SYNAPSE_RESOURCE_GROUP"] || "wsg-7398";
  const workspaceName = "testWorkspace";
  const encryptionProtectorName = "current";
  const credential = new DefaultAzureCredential();
  const client = new SynapseManagementClient(credential, subscriptionId);
  const result = await client.workspaceManagedSqlServerEncryptionProtector.get(
    resourceGroupName,
    workspaceName,
    encryptionProtectorName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getWorkspaceManagedSqlServerEncryptionProtector();
}

main().catch(console.error);
