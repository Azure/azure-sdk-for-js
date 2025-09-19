// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a list of all update domains in a cloud service.
 *
 * @summary Gets a list of all update domains in a cloud service.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/CloudserviceRP/stable/2024-11-04/examples/CloudServiceUpdateDomain_List.json
 */
async function listUpdateDomainsInCloudService() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "ConstosoRG";
  const cloudServiceName = "{cs-name}";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cloudServicesUpdateDomain.listUpdateDomains(
    resourceGroupName,
    cloudServiceName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listUpdateDomainsInCloudService();
}

main().catch(console.error);
