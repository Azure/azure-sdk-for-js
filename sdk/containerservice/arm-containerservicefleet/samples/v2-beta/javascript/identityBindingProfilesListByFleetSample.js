// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceFleetClient } = require("@azure/arm-containerservicefleet");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list IdentityBindingProfile resources by Fleet
 *
 * @summary list IdentityBindingProfile resources by Fleet
 * x-ms-original-file: 2026-11-02-preview/IdentityBindingProfiles_ListByFleet.json
 */
async function listIdentityBindingProfilesByFleet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.identityBindingProfiles.listByFleet("rg1", "fleet1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listIdentityBindingProfilesByFleet();
}

main().catch(console.error);
