// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Retrieves cert chain.
 *
 * @summary Retrieves cert chain.
 * x-ms-original-file: specification/sphere/resource-manager/Microsoft.AzureSphere/stable/2024-04-01/examples/PostRetrieveCatalogCertChain.json
 */

import { AzureSphereManagementClient } from "@azure/arm-sphere";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function certificatesRetrieveCertChain(): Promise<void> {
  const subscriptionId =
    process.env["SPHERE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["SPHERE_RESOURCE_GROUP"] || "MyResourceGroup1";
  const catalogName = "MyCatalog1";
  const serialNumber = "active";
  const credential = new DefaultAzureCredential();
  const client = new AzureSphereManagementClient(credential, subscriptionId);
  const result = await client.certificates.retrieveCertChain(
    resourceGroupName,
    catalogName,
    serialNumber,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await certificatesRetrieveCertChain();
}

main().catch(console.error);
