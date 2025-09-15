/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */
/**
 * This sample demonstrates how to Description for Get the network endpoints of all outbound dependencies of an App Service Environment.
 *
 * @summary Description for Get the network endpoints of all outbound dependencies of an App Service Environment.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2021-03-01/examples/GetOutboundNetworkDependenciesEndpoints.json
 */

import WebSiteManagementClient, { paginate } from "@azure-rest/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

async function getOutboundNetworkDependenciesEndpoints() {
  const subscriptionId = process.env.SUBSCRIPTION_ID as string;
  const resourceGroupName = "Sample-WestUSResourceGroup";
  const name = "SampleAse";
  const credential = new DefaultAzureCredential();
  const client = WebSiteManagementClient(credential);
  const result = [];
  const initialResposne = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/outboundNetworkDependenciesEndpoints",
      subscriptionId,
      resourceGroupName,
      name,
    )
    .get();
  const res = paginate(client, initialResposne);
  for await (const item of res) {
    result.push(item);
  }
  console.log(result);
}

getOutboundNetworkDependenciesEndpoints().catch(console.error);
