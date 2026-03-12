// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadsClient } = require("@azure/arm-workloadssapvirtualinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the SAP Disk Configuration Layout prod/non-prod SAP System.
 *
 * @summary get the SAP Disk Configuration Layout prod/non-prod SAP System.
 * x-ms-original-file: 2024-09-01/SapVirtualInstances_InvokeDiskConfigurations_NonProd.json
 */
async function sapDiskConfigurationsForInputEnvironmentNonProd() {
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
async function sapDiskConfigurationsForInputEnvironmentProd() {
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

async function main() {
  await sapDiskConfigurationsForInputEnvironmentNonProd();
  await sapDiskConfigurationsForInputEnvironmentProd();
}

main().catch(console.error);
