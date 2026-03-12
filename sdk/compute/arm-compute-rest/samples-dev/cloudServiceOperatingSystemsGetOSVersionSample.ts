// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets properties of a guest operating system version that can be specified in the XML service configuration (.cscfg) for a cloud service.
 *
 * @summary Gets properties of a guest operating system version that can be specified in the XML service configuration (.cscfg) for a cloud service.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/CloudserviceRP/stable/2022-04-04/examples/CloudServiceOSVersion_Get.json
 */

import type { CloudServiceOperatingSystemsGetOSVersionParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getCloudServiceOSVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const location = "westus2";
  const osVersionName = "WA-GUEST-OS-3.90_202010-02";
  const options: CloudServiceOperatingSystemsGetOSVersionParameters = {
    queryParameters: { "api-version": "2022-04-04" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/cloudServiceOsVersions/{osVersionName}",
      subscriptionId,
      location,
      osVersionName,
    )
    .get(options);
  console.log(result);
}

getCloudServiceOSVersion().catch(console.error);
