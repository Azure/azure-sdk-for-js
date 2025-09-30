// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Only returns the latest version of each node image. For example there may be an AKSUbuntu-1804gen2containerd-2024.01.26, but only AKSUbuntu-1804gen2containerd-2024.02.02 is visible in this list.
 *
 * @summary Only returns the latest version of each node image. For example there may be an AKSUbuntu-1804gen2containerd-2024.01.26, but only AKSUbuntu-1804gen2containerd-2024.02.02 is visible in this list.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/preview/2025-07-02-preview/examples/NodeImageVersions_List.json
 */
async function listNodeImageVersions() {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const location = "location1";
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.containerService.listNodeImageVersions(location)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listNodeImageVersions();
}

main().catch(console.error);
