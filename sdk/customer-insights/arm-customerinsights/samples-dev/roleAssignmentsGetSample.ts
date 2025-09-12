// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the role assignment in the hub.
 *
 * @summary Gets the role assignment in the hub.
 * x-ms-original-file: specification/customer-insights/resource-manager/Microsoft.CustomerInsights/stable/2017-04-26/examples/RoleAssignmentsGet.json
 */

import { CustomerInsightsManagementClient } from "@azure/arm-customerinsights";
import { DefaultAzureCredential } from "@azure/identity";

async function roleAssignmentsGet(): Promise<void> {
  const subscriptionId = "subid";
  const resourceGroupName = "TestHubRG";
  const hubName = "sdkTestHub";
  const assignmentName = "assignmentName8976";
  const credential = new DefaultAzureCredential();
  const client = new CustomerInsightsManagementClient(credential, subscriptionId);
  const result = await client.roleAssignments.get(resourceGroupName, hubName, assignmentName);
  console.log(result);
}

roleAssignmentsGet().catch(console.error);
