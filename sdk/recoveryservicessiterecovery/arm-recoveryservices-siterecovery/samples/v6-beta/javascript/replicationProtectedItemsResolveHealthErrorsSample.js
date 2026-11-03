// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to operation to resolve health issues of the replication protected item.
 *
 * @summary operation to resolve health issues of the replication protected item.
 * x-ms-original-file: 2025-08-01/ReplicationProtectedItems_ResolveHealthErrors.json
 */
async function resolveHealthErrors() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationProtectedItems.resolveHealthErrors(
    "resourceGroupPS1",
    "vault1",
    "cloud1",
    "cloud_6d224fc6-f326-5d35-96de-fbf51efb3179",
    "f8491e4f-817a-40dd-a90c-af773978c75b",
    { properties: { healthErrors: [{ healthErrorId: "3:8020" }] } },
  );
  console.log(result);
}

async function main() {
  await resolveHealthErrors();
}

main().catch(console.error);
