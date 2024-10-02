// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  ApplicationSecurityGroupsGetParameters
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets information about the specified application security group.
 *
 * @summary Gets information about the specified application security group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/ApplicationSecurityGroupGet.json
 */
async function getApplicationSecurityGroup() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const applicationSecurityGroupName = "test-asg";
  const options: ApplicationSecurityGroupsGetParameters = {
    queryParameters: { "api-version": "2022-05-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/applicationSecurityGroups/{applicationSecurityGroupName}",
      subscriptionId,
      resourceGroupName,
      applicationSecurityGroupName
    )
    .get(options);
  console.log(result);
}

getApplicationSecurityGroup().catch(console.error);
