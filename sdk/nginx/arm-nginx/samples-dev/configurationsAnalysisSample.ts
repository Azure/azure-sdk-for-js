// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NginxManagementClient } from "@azure/arm-nginx";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to analyze an NGINX configuration without applying it to the NGINXaaS deployment
 *
 * @summary analyze an NGINX configuration without applying it to the NGINXaaS deployment
 * x-ms-original-file: 2025-03-01-preview/Configurations_Analysis.json
 */
async function configurationsAnalysis(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NginxManagementClient(credential, subscriptionId);
  const result = await client.configurations.analysis("myResourceGroup", "myDeployment", "default");
  console.log(result);
}

async function main(): Promise<void> {
  await configurationsAnalysis();
}

main().catch(console.error);
