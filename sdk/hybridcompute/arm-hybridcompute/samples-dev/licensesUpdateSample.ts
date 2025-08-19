// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation to update a license.
 *
 * @summary The operation to update a license.
 * x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/preview/2025-02-19-preview/examples/license/License_Update.json
 */

import {
  LicenseUpdate,
  HybridComputeManagementClient,
} from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateALicense(): Promise<void> {
  const subscriptionId =
    process.env["HYBRIDCOMPUTE_SUBSCRIPTION_ID"] || "{subscriptionId}";
  const resourceGroupName =
    process.env["HYBRIDCOMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const licenseName = "{licenseName}";
  const parameters: LicenseUpdate = {
    type: "pCore",
    edition: "Datacenter",
    licenseType: "ESU",
    processors: 6,
    state: "Activated",
    target: "Windows Server 2012",
  };
  const credential = new DefaultAzureCredential();
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.licenses.beginUpdateAndWait(
    resourceGroupName,
    licenseName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateALicense();
}

main().catch(console.error);
