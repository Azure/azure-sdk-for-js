// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NginxManagementClient } from "@azure/arm-nginx";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to analyze an Nginx Waf Policy
 *
 * @summary analyze an Nginx Waf Policy
 * x-ms-original-file: 2025-11-01/NginxDeploymentWafPolicies_Analysis.json
 */
async function nginxDeploymentWafPoliciesAnalysis(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NginxManagementClient(credential, subscriptionId);
  const result = await client.nginxDeploymentWafPolicies.analysis(
    "myResourceGroup",
    "myDeployment",
    "myWafPolicy",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await nginxDeploymentWafPoliciesAnalysis();
}

main().catch(console.error);
