// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApplicationInsightsManagementClient } = require("@azure/arm-appinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of Application Insights components within a resource group.
 *
 * @summary gets a list of Application Insights components within a resource group.
 * x-ms-original-file: 2020-02-02/ComponentsListByResourceGroup.json
 */
async function componentListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.components.listByResourceGroup("my-resource-group")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await componentListByResourceGroup();
}

main().catch(console.error);
