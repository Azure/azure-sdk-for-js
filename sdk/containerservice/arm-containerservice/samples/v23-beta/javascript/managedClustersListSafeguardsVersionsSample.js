// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Contains list of Safeguards version along with its support info and whether it is a default version.
 *
 * @summary Contains list of Safeguards version along with its support info and whether it is a default version.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/preview/2025-07-02-preview/examples/ListSafeguardsVersions.json
 */
async function listSafeguardsVersions() {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const location = "location1";
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedClusters.listSafeguardsVersions(location)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listSafeguardsVersions();
}

main().catch(console.error);
