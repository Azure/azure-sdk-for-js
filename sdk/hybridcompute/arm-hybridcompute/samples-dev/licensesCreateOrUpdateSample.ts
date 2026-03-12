// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation to create or update a license.
 *
 * @summary The operation to create or update a license.
 * x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/preview/2025-02-19-preview/examples/license/License_CreateOrUpdate.json
 */

import {
  License,
  HybridComputeManagementClient,
} from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createOrUpdateALicense(): Promise<void> {
  const subscriptionId =
    process.env["HYBRIDCOMPUTE_SUBSCRIPTION_ID"] || "{subscriptionId}";
  const resourceGroupName =
    process.env["HYBRIDCOMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const licenseName = "{licenseName}";
  const parameters: License = {
    licenseDetails: {
      type: "pCore",
      edition: "Datacenter",
      processors: 6,
      state: "Activated",
      target: "Windows Server 2012",
    },
    licenseType: "ESU",
    location: "eastus2euap",
  };
  const credential = new DefaultAzureCredential();
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.licenses.beginCreateOrUpdateAndWait(
    resourceGroupName,
    licenseName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateALicense();
}

main().catch(console.error);
