// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets properties of a guest operating system family that can be specified in the XML service configuration (.cscfg) for a cloud service.
 *
 * @summary Gets properties of a guest operating system family that can be specified in the XML service configuration (.cscfg) for a cloud service.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/CloudserviceRP/stable/2024-11-04/examples/CloudServiceOSFamily_Get.json
 */
async function getCloudServiceOSFamily(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const location = "westus2";
  const osFamilyName = "3";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.cloudServiceOperatingSystems.getOSFamily(
    location,
    osFamilyName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getCloudServiceOSFamily();
}

main().catch(console.error);
