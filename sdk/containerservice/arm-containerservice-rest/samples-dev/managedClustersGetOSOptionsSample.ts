// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets supported OS options in the specified subscription.
 *
 * @summary Gets supported OS options in the specified subscription.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/preview/2022-05-02-preview/examples/ContainerServiceGetOSOptions.json
 */

import ContainerServiceManagementClient from "@azure-rest/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

async function getContainerServiceOSOptions(): Promise<void> {
  const subscriptionId = "subid1";
  const location = "location1";
  const credential = new DefaultAzureCredential();
  const client = ContainerServiceManagementClient(credential);
  const result = await client.path(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/locations/{location}/osOptions/default",
    subscriptionId,
    location,
  );
  console.log(result);
}

getContainerServiceOSOptions().catch(console.error);
