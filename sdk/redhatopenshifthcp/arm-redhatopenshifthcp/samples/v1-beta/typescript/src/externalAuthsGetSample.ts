// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedHatOpenShiftClient } from "@azure/arm-redhatopenshifthcp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a ExternalAuth
 *
 * @summary get a ExternalAuth
 * x-ms-original-file: 2026-06-30-preview/ExternalAuths_Get_MaximumSet_Gen.json
 */
async function externalAuthsGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "FDEA43EA-0230-4A7D-BDEE-F3AFF2183B1D";
  const client = new RedHatOpenShiftClient(credential, subscriptionId);
  const result = await client.externalAuths.get("rgopenapi", "hcpCluster-name", "my-cool-auth");
  console.log(result);
}

async function main(): Promise<void> {
  await externalAuthsGetMaximumSet();
}

main().catch(console.error);
