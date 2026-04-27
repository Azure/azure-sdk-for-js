// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to delete a network mapping.
 *
 * @summary the operation to delete a network mapping.
 * x-ms-original-file: 2025-08-01/ReplicationNetworkMappings_Delete.json
 */
async function deleteNetworkMapping() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9112a37f-0f3e-46ec-9c00-060c6edca071";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  await client.replicationNetworkMappings.delete(
    "srcBvte2a14C27",
    "srce2avaultbvtaC27",
    "b0cef6e9a4437b81803d0b55ada4f700ab66caae59c35d62723a1589c0cd13ac",
    "e2267b5c-2650-49bd-ab3f-d66aae694c06",
    "corpe2amap",
  );
}

async function main() {
  await deleteNetworkMapping();
}

main().catch(console.error);
