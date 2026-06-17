// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get access review instance contacted reviewers
 *
 * @summary get access review instance contacted reviewers
 * x-ms-original-file: 2021-12-01-preview/GetAccessReviewInstanceContactedReviewers.json
 */
async function getAccessReviews(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.scopeAccessReviewInstanceContactedReviewers.list(
    "subscriptions/fa73e90b-5bf1-45fd-a182-35ce5fc0674d",
    "265785a7-a81f-4201-8a18-bb0db95982b7",
    "f25ed880-9c31-4101-bc57-825d8df3b58c",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAccessReviews();
}

main().catch(console.error);
