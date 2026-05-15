// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves the current status of IDPS signatures for the relevant policy. Maximal amount of returned signatures is 1000.
 *
 * @summary retrieves the current status of IDPS signatures for the relevant policy. Maximal amount of returned signatures is 1000.
 * x-ms-original-file: 2025-05-01/FirewallPolicyQuerySignatureOverrides.json
 */
async function querySignatureOverrides(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e747cc13-97d4-4a79-b463-42d7f4e558f2";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.firewallPolicyIdpsSignatures.list("rg1", "firewallPolicy", {
    filters: [{ field: "Mode", values: ["Deny"] }],
    orderBy: { field: "severity", order: "Ascending" },
    resultsPerPage: 20,
    search: "",
    skip: 0,
  });
  console.log(result);
}

async function main(): Promise<void> {
  await querySignatureOverrides();
}

main().catch(console.error);
