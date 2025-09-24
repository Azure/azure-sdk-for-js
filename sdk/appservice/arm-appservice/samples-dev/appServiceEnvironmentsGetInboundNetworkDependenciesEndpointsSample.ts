// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Description for Get the network endpoints of all inbound dependencies of an App Service Environment.
 *
 * @summary Description for Get the network endpoints of all inbound dependencies of an App Service Environment.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2024-11-01/examples/GetInboundNetworkDependenciesEndpoints.json
 */

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getTheNetworkEndpointsOfAllInboundDependenciesOfAnAppServiceEnvironment(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["APPSERVICE_RESOURCE_GROUP"] || "Sample-WestUSResourceGroup";
  const name = "SampleAse";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.appServiceEnvironments.listInboundNetworkDependenciesEndpoints(
    resourceGroupName,
    name,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getTheNetworkEndpointsOfAllInboundDependenciesOfAnAppServiceEnvironment();
}

main().catch(console.error);
