// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedHatOpenShiftClient } = require("@azure/arm-redhatopenshifthcp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a ExternalAuth
 *
 * @summary delete a ExternalAuth
 * x-ms-original-file: 2026-06-30-preview/ExternalAuths_Delete_MaximumSet_Gen.json
 */
async function externalAuthsDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "FDEA43EA-0230-4A7D-BDEE-F3AFF2183B1D";
  const client = new RedHatOpenShiftClient(credential, subscriptionId);
  await client.externalAuths.delete("rgopenapi", "hcpCluster-name", "my-cool-auth");
}

async function main() {
  await externalAuthsDeleteMaximumSet();
}

main().catch(console.error);
