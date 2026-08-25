// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation retrieves the list of all policy enrollments associated with the given subscription that match the optional given $filter. Valid values for $filter are: 'atScope()' or 'atExactScope()'. If $filter is not provided, the unfiltered list includes all policy enrollments associated with the subscription, including those that apply directly or from management groups that contain the given subscription, as well as any applied to objects contained within the subscription.
 *
 * @summary this operation retrieves the list of all policy enrollments associated with the given subscription that match the optional given $filter. Valid values for $filter are: 'atScope()' or 'atExactScope()'. If $filter is not provided, the unfiltered list includes all policy enrollments associated with the subscription, including those that apply directly or from management groups that contain the given subscription, as well as any applied to objects contained within the subscription.
 * x-ms-original-file: 2026-01-01-preview/listPolicyEnrollmentsForSubscription.json
 */
async function listPolicyEnrollmentsForSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ae640e6b-ba3e-4256-9d62-2993eecfa6f2";
  const client = new PolicyClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.policyEnrollments.list({ filter: "atScope()" })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listPolicyEnrollmentsForSubscription();
}

main().catch(console.error);
