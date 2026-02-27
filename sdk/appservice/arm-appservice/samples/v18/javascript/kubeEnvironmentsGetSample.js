// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Get the properties of a Kubernetes Environment.
 *
 * @summary description for Get the properties of a Kubernetes Environment.
 * x-ms-original-file: 2025-05-01/KubeEnvironments_Get.json
 */
async function getKubeEnvironmentsByName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.kubeEnvironments.get("examplerg", "jlaw-demo1");
  console.log(result);
}

async function main() {
  await getKubeEnvironmentsByName();
}

main().catch(console.error);
