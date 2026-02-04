// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list trusted access role bindings.
 *
 * @summary list trusted access role bindings.
 * x-ms-original-file: 2025-10-02-preview/TrustedAccessRoleBindings_List.json
 */
async function listTrustedAccessRoleBindings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.trustedAccessRoleBindings.list("rg1", "clustername1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listTrustedAccessRoleBindings();
}

main().catch(console.error);
