// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a diagnostics result of a Container App.
 *
 * @summary get a diagnostics result of a Container App.
 * x-ms-original-file: 2025-10-02-preview/ContainerAppsDiagnostics_Get.json
 */
async function getContainerAppDiagnosticsInfo() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "f07f3711-b45e-40fe-a941-4e6d93f851e6";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerAppsDiagnostics.getDetector(
    "mikono-workerapp-test-rg",
    "mikono-capp-stage1",
    "cappcontainerappnetworkIO",
  );
  console.log(result);
}

async function main() {
  await getContainerAppDiagnosticsInfo();
}

main().catch(console.error);
