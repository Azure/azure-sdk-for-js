// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the child resources of a resource on which user has eligible access
 *
 * @summary get the child resources of a resource on which user has eligible access
 * x-ms-original-file: 2024-09-01-preview/GetEligibleChildResourcesByScope.json
 */
async function getEligibleChildResourcesByScope() {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.eligibleChildResources.list(
    "providers/Microsoft.Subscription/subscriptions/dfa2a084-766f-4003-8ae1-c4aeb893a99f",
    { filter: "resourceType+eq+'resourcegroup'" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getEligibleChildResourcesByScope();
}

main().catch(console.error);
