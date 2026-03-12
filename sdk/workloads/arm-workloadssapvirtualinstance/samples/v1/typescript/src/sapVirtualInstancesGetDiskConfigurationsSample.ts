// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadsClient } from "@azure/arm-workloadssapvirtualinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the SAP Disk Configuration Layout prod/non-prod SAP System.
 *
 * @summary get the SAP Disk Configuration Layout prod/non-prod SAP System.
 * x-ms-original-file: 2024-09-01/SapVirtualInstances_InvokeDiskConfigurations_NonProd.json
 */
async function sapDiskConfigurationsForInputEnvironmentNonProd(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapVirtualInstances.getDiskConfigurations("centralus", {
    appLocation: "eastus",
    sapProduct: "S4HANA",
    environment: "NonProd",
    databaseType: "HANA",
    deploymentType: "ThreeTier",
    dbVmSku: "Standard_M32ts",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to get the SAP Disk Configuration Layout prod/non-prod SAP System.
 *
 * @summary get the SAP Disk Configuration Layout prod/non-prod SAP System.
 * x-ms-original-file: 2024-09-01/SapVirtualInstances_InvokeDiskConfigurations_Prod.json
 */
async function sapDiskConfigurationsForInputEnvironmentProd(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapVirtualInstances.getDiskConfigurations("centralus", {
    appLocation: "eastus",
    sapProduct: "S4HANA",
    environment: "Prod",
    databaseType: "HANA",
    deploymentType: "ThreeTier",
    dbVmSku: "Standard_M32ts",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await sapDiskConfigurationsForInputEnvironmentNonProd();
  await sapDiskConfigurationsForInputEnvironmentProd();
}

main().catch(console.error);
