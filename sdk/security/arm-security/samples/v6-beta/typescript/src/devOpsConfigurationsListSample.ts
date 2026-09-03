// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list DevOps Configurations.
 *
 * @summary list DevOps Configurations.
 * x-ms-original-file: 2025-11-01-preview/SecurityConnectorsDevOps/ListDevOpsConfigurations_example.json
 */
async function listDevOpsConfigurations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0806e1cd-cfda-4ff8-b99c-2b0af42cffd3";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.devOpsConfigurations.list("myRg", "mySecurityConnectorName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listDevOpsConfigurations();
}

main().catch(console.error);
