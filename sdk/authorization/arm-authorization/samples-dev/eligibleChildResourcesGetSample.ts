// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EligibleChildResourcesGetOptionalParams } from "@azure/arm-authorization";
import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get the child resources of a resource on which user has eligible access
 *
 * @summary Get the child resources of a resource on which user has eligible access
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2020-10-01-preview/examples/GetEligibleChildResourcesByScope.json
 */
async function getEligibleChildResourcesByScope(): Promise<void> {
  const scope =
    "providers/Microsoft.Subscription/subscriptions/dfa2a084-766f-4003-8ae1-c4aeb893a99f";
  const filter = "resourceType+eq+'resourcegroup'";
  const options: EligibleChildResourcesGetOptionalParams = { filter };
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.eligibleChildResources.list(scope, options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getEligibleChildResourcesByScope();
}

main().catch(console.error);
