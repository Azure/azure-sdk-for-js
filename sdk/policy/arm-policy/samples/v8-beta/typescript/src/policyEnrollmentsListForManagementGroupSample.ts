// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation retrieves the list of all policy enrollments applicable to the management group that match the given $filter. Valid values for $filter are: 'atScope()' or 'atExactScope()'. If $filter=atScope() is provided, the returned list includes all policy enrollments that are assigned to the management group or the management group's ancestors.
 *
 * @summary this operation retrieves the list of all policy enrollments applicable to the management group that match the given $filter. Valid values for $filter are: 'atScope()' or 'atExactScope()'. If $filter=atScope() is provided, the returned list includes all policy enrollments that are assigned to the management group or the management group's ancestors.
 * x-ms-original-file: 2026-01-01-preview/listPolicyEnrollmentsForManagementGroup.json
 */
async function listPolicyEnrollmentsForManagementGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const resArray = new Array();
  for await (const item of client.policyEnrollments.listForManagementGroup("DevOrg", {
    filter: "atScope()",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listPolicyEnrollmentsForManagementGroup();
}

main().catch(console.error);
