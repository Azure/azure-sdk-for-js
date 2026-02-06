// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of identity bindings in the specified managed cluster.
 *
 * @summary gets a list of identity bindings in the specified managed cluster.
 * x-ms-original-file: 2025-10-02-preview/IdentityBindings_List.json
 */
async function listIdentityBindingsByManagedCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.identityBindings.listByManagedCluster("rg1", "clustername1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listIdentityBindingsByManagedCluster();
}

main().catch(console.error);
