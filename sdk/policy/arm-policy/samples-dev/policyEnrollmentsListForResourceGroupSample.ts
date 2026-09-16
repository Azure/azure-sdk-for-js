// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation retrieves the list of all policy enrollments associated with the given resource group in the given subscription that match the optional given $filter. Valid values for $filter are: 'atScope()' or 'atExactScope()'. If $filter is not provided, the unfiltered list includes all policy enrollments associated with the resource group, including those that apply directly or apply from containing scopes, as well as any applied to resources contained within the resource group.
 *
 * @summary this operation retrieves the list of all policy enrollments associated with the given resource group in the given subscription that match the optional given $filter. Valid values for $filter are: 'atScope()' or 'atExactScope()'. If $filter is not provided, the unfiltered list includes all policy enrollments associated with the resource group, including those that apply directly or apply from containing scopes, as well as any applied to resources contained within the resource group.
 * x-ms-original-file: 2026-01-01-preview/listPolicyEnrollmentsForResourceGroup.json
 */
async function listPolicyEnrollmentsForResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ae640e6b-ba3e-4256-9d62-2993eecfa6f2";
  const client = new PolicyClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.policyEnrollments.listForResourceGroup("TestResourceGroup", {
    filter: "atScope()",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listPolicyEnrollmentsForResourceGroup();
}

main().catch(console.error);
