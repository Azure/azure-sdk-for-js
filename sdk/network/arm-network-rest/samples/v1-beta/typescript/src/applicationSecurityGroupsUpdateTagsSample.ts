// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  ApplicationSecurityGroupsUpdateTagsParameters
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Updates an application security group's tags.
 *
 * @summary Updates an application security group's tags.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/ApplicationSecurityGroupUpdateTags.json
 */
async function updateApplicationSecurityGroupTags() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const applicationSecurityGroupName = "test-asg";
  const options: ApplicationSecurityGroupsUpdateTagsParameters = {
    body: { tags: { tag1: "value1", tag2: "value2" } },
    queryParameters: { "api-version": "2022-05-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/applicationSecurityGroups/{applicationSecurityGroupName}",
      subscriptionId,
      resourceGroupName,
      applicationSecurityGroupName
    )
    .patch(options);
  console.log(result);
}

updateApplicationSecurityGroupTags().catch(console.error);
