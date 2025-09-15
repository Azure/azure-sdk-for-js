// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Checks if the specified management group name is valid and unique
 *
 * @summary Checks if the specified management group name is valid and unique
 * x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/CheckManagementGroupNameAvailability.json
 */

import type { CheckNameAvailabilityRequest } from "@azure/arm-managementgroups";
import { ManagementGroupsAPI } from "@azure/arm-managementgroups";
import { DefaultAzureCredential } from "@azure/identity";

async function checkManagementGroupNameAvailability(): Promise<void> {
  const checkNameAvailabilityRequest: CheckNameAvailabilityRequest = {
    name: "nameTocheck",
    type: "Microsoft.Management/managementGroups",
  };
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const result = await client.checkNameAvailability(checkNameAvailabilityRequest);
  console.log(result);
}

checkManagementGroupNameAvailability().catch(console.error);
