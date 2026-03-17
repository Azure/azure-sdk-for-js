// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list supported trusted access roles.
 *
 * @summary list supported trusted access roles.
 * x-ms-original-file: 2026-01-01/TrustedAccessRoles_List.json
 */
async function listTrustedAccessRoles() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.trustedAccessRoles.list("westus2")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listTrustedAccessRoles();
}

main().catch(console.error);
