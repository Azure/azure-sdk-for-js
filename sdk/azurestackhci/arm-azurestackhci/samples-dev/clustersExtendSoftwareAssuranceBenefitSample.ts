// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SoftwareAssuranceChangeRequest } from "@azure/arm-azurestackhci";
import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Extends Software Assurance Benefit to a cluster
 *
 * @summary Extends Software Assurance Benefit to a cluster
 * x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/stable/2024-04-01/examples/ExtendSoftwareAssuranceBenefit.json
 */
async function createClusterIdentity(): Promise<void> {
  const subscriptionId =
    process.env["AZURESTACKHCI_SUBSCRIPTION_ID"] || "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const resourceGroupName = process.env["AZURESTACKHCI_RESOURCE_GROUP"] || "test-rg";
  const clusterName = "myCluster";
  const softwareAssuranceChangeRequest: SoftwareAssuranceChangeRequest = {
    properties: { softwareAssuranceIntent: "Enable" },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.clusters.beginExtendSoftwareAssuranceBenefitAndWait(
    resourceGroupName,
    clusterName,
    softwareAssuranceChangeRequest,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createClusterIdentity();
}

main().catch(console.error);
