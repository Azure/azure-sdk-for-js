// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricManagedClustersManagementClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to restart a code package instance of a service replica or instance. This is a potentially destabilizing operation that should be used with immense care.
 *
 * @summary restart a code package instance of a service replica or instance. This is a potentially destabilizing operation that should be used with immense care.
 * x-ms-original-file: 2026-02-01/ApplicationActionRestartDeployedCodePackage_example.json
 */
async function restartDeployedCodePackage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  await client.applications.restartDeployedCodePackage("resRg", "myCluster", "myApp", {
    nodeName: "nt1_0",
    serviceManifestName: "TestPkg",
    servicePackageActivationId: "sharedProcess",
    codePackageName: "Code",
    codePackageInstanceId: "133991326715515522",
  });
}

async function main(): Promise<void> {
  await restartDeployedCodePackage();
}

main().catch(console.error);
