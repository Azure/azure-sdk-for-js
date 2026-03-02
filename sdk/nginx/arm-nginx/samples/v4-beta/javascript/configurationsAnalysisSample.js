// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NginxManagementClient } = require("@azure/arm-nginx");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to analyze an NGINX configuration without applying it to the NGINXaaS deployment
 *
 * @summary analyze an NGINX configuration without applying it to the NGINXaaS deployment
 * x-ms-original-file: 2025-03-01-preview/Configurations_Analysis.json
 */
async function configurationsAnalysis() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NginxManagementClient(credential, subscriptionId);
  const result = await client.configurations.analysis("myResourceGroup", "myDeployment", "default");
  console.log(result);
}

async function main() {
  await configurationsAnalysis();
}

main().catch(console.error);
