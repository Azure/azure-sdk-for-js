// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createComputeManagementClient = require("@azure-rest/arm-compute").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Gets properties of a guest operating system version that can be specified in the XML service configuration (.cscfg) for a cloud service.
 *
 * @summary Gets properties of a guest operating system version that can be specified in the XML service configuration (.cscfg) for a cloud service.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/CloudserviceRP/stable/2022-04-04/examples/CloudServiceOSVersion_Get.json
 */
async function getCloudServiceOSVersion() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const location = "westus2";
  const osVersionName = "WA-GUEST-OS-3.90_202010-02";
  const options = {
    queryParameters: { "api-version": "2022-04-04" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/cloudServiceOsVersions/{osVersionName}",
      subscriptionId,
      location,
      osVersionName
    )
    .get(options);
  console.log(result);
}

getCloudServiceOSVersion().catch(console.error);
