// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Get all the Kubernetes Environments in a resource group.
 *
 * @summary description for Get all the Kubernetes Environments in a resource group.
 * x-ms-original-file: 2025-05-01/KubeEnvironments_ListByResourceGroup.json
 */
async function listKubeEnvironmentsByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.kubeEnvironments.listByResourceGroup("examplerg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listKubeEnvironmentsByResourceGroup();
}

main().catch(console.error);
