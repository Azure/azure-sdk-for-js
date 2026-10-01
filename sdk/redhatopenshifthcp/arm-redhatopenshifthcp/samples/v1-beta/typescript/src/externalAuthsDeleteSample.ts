// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedHatOpenShiftClient } from "@azure/arm-redhatopenshifthcp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a ExternalAuth
 *
 * @summary delete a ExternalAuth
 * x-ms-original-file: 2026-09-01-preview/ExternalAuths_Delete_MaximumSet_Gen.json
 */
async function externalAuthsDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "FDEA43EA-0230-4A7D-BDEE-F3AFF2183B1D";
  const client = new RedHatOpenShiftClient(credential, subscriptionId);
  await client.externalAuths.delete("rgopenapi", "hcpCluster-name", "my-cool-auth");
}

async function main(): Promise<void> {
  await externalAuthsDeleteMaximumSet();
}

main().catch(console.error);
