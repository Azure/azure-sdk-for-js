// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  DisksListParameters,
  paginate,
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Lists all the disks under a subscription.
 *
 * @summary Lists all the disks under a subscription.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2022-07-02/examples/diskExamples/Disk_ListBySubscription.json
 */
async function listAllManagedDisksInASubscription() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const options: DisksListParameters = {
    queryParameters: { "api-version": "2022-07-02" },
  };
  const initialResponse = await client
    .path("/subscriptions/{subscriptionId}/providers/Microsoft.Compute/disks", subscriptionId)
    .get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

listAllManagedDisksInASubscription().catch(console.error);
