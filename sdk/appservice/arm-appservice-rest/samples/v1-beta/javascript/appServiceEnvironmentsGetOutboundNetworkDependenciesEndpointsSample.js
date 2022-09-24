/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const WebSiteManagementClient = require("@azure-rest/arm-appservice").default,
  { paginate } = require("@azure-rest/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to Description for Get the network endpoints of all outbound dependencies of an App Service Environment.
 *
 * @summary Description for Get the network endpoints of all outbound dependencies of an App Service Environment.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2021-03-01/examples/GetOutboundNetworkDependenciesEndpoints.json
 */
async function getOutboundNetworkDependenciesEndpoints() {
  const subscriptionId = process.env.SUBSCRIPTION_ID;
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
      name
    )
    .get();
  const res = paginate(client, initialResposne);
  for await (let item of res) {
    result.push(item);
  }
  console.log(result);
}

getOutboundNetworkDependenciesEndpoints().catch(console.error);
