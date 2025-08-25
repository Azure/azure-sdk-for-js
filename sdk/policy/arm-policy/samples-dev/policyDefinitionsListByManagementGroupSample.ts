// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to This operation retrieves a list of all the policy definitions in a given management group that match the optional given $filter. Valid values for $filter are: 'atExactScope()', 'policyType -eq {value}' or 'category eq '{value}''. If $filter is not provided, the unfiltered list includes all policy definitions associated with the management group, including those that apply directly or from management groups that contain the given management group. If $filter=atExactScope() is provided, the returned list only includes all policy definitions that at the given management group. If $filter='policyType -eq {value}' is provided, the returned list only includes all policy definitions whose type match the {value}. Possible policyType values are NotSpecified, BuiltIn, Custom, and Static. If $filter='category -eq {value}' is provided, the returned list only includes all policy definitions whose category match the {value}.
 *
 * @summary This operation retrieves a list of all the policy definitions in a given management group that match the optional given $filter. Valid values for $filter are: 'atExactScope()', 'policyType -eq {value}' or 'category eq '{value}''. If $filter is not provided, the unfiltered list includes all policy definitions associated with the management group, including those that apply directly or from management groups that contain the given management group. If $filter=atExactScope() is provided, the returned list only includes all policy definitions that at the given management group. If $filter='policyType -eq {value}' is provided, the returned list only includes all policy definitions whose type match the {value}. Possible policyType values are NotSpecified, BuiltIn, Custom, and Static. If $filter='category -eq {value}' is provided, the returned list only includes all policy definitions whose category match the {value}.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2024-05-01/examples/listPolicyDefinitionsByManagementGroup.json
 */

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listPolicyDefinitionsByManagementGroup(): Promise<void> {
  const managementGroupId = "MyManagementGroup";
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const resArray = new Array();
  for await (const item of client.policyDefinitions.listByManagementGroup(
    managementGroupId,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listPolicyDefinitionsByManagementGroup();
}

main().catch(console.error);
