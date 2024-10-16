// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createComputeManagementClient = require("@azure-rest/arm-compute").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Gets properties of a guest operating system family that can be specified in the XML service configuration (.cscfg) for a cloud service.
 *
 * @summary Gets properties of a guest operating system family that can be specified in the XML service configuration (.cscfg) for a cloud service.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/CloudserviceRP/stable/2022-04-04/examples/CloudServiceOSFamily_Get.json
 */
async function getCloudServiceOSFamily() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const location = "westus2";
  const osFamilyName = "3";
  const options = {
    queryParameters: { "api-version": "2022-04-04" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/cloudServiceOsFamilies/{osFamilyName}",
      subscriptionId,
      location,
      osFamilyName
    )
    .get(options);
  console.log(result);
}

getCloudServiceOSFamily().catch(console.error);
