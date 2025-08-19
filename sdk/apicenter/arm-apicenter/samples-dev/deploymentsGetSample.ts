// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureAPICenter } from "@azure/arm-apicenter";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Returns details of the API deployment.
 *
 * @summary Returns details of the API deployment.
 * x-ms-original-file: specification/apicenter/resource-manager/Microsoft.ApiCenter/stable/2024-03-01/examples/Deployments_Get.json
 */
async function deploymentsGet(): Promise<void> {
  const subscriptionId =
    process.env["APICENTER_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["APICENTER_RESOURCE_GROUP"] || "contoso-resources";
  const serviceName = "contoso";
  const workspaceName = "default";
  const apiName = "echo-api";
  const deploymentName = "production";
  const credential = new DefaultAzureCredential();
  const client = new AzureAPICenter(credential, subscriptionId);
  const result = await client.deployments.get(
    resourceGroupName,
    serviceName,
    workspaceName,
    apiName,
    deploymentName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deploymentsGet();
}

main().catch(console.error);
