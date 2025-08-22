// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns a monitored AzureDevOps Connector resource for a given ID.
 *
 * @summary Returns a monitored AzureDevOps Connector resource for a given ID.
 * x-ms-original-file: specification/securitydevops/resource-manager/Microsoft.SecurityDevOps/preview/2022-09-01-preview/examples/AzureDevOpsConnectorGet.json
 */

import { MicrosoftSecurityDevOps } from "@azure/arm-securitydevops";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function azureDevOpsConnectorGet(): Promise<void> {
  const subscriptionId =
    process.env["SECURITYDEVOPS_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["SECURITYDEVOPS_RESOURCE_GROUP"] || "westusrg";
  const azureDevOpsConnectorName = "testconnector";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSecurityDevOps(credential, subscriptionId);
  const result = await client.azureDevOpsConnectorOperations.get(
    resourceGroupName,
    azureDevOpsConnectorName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await azureDevOpsConnectorGet();
}

main().catch(console.error);
