// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation to update a license profile.
 *
 * @summary The operation to update a license profile.
 * x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/preview/2025-02-19-preview/examples/licenseProfile/LicenseProfile_Update.json
 */

import {
  LicenseProfileUpdate,
  HybridComputeManagementClient,
} from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateALicenseProfile(): Promise<void> {
  const subscriptionId =
    process.env["HYBRIDCOMPUTE_SUBSCRIPTION_ID"] || "{subscriptionId}";
  const resourceGroupName =
    process.env["HYBRIDCOMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const machineName = "myMachine";
  const parameters: LicenseProfileUpdate = {
    assignedLicense: "{LicenseResourceId}",
    productFeatures: [{ name: "Hotpatch", subscriptionStatus: "Enable" }],
    productType: "WindowsServer",
    softwareAssuranceCustomer: true,
    subscriptionStatus: "Enable",
  };
  const credential = new DefaultAzureCredential();
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.licenseProfiles.beginUpdateAndWait(
    resourceGroupName,
    machineName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateALicenseProfile();
}

main().catch(console.error);
