// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets deny assignments for a resource.
 *
 * @summary gets deny assignments for a resource.
 * x-ms-original-file: 2024-07-01-preview/GetDenyAssignmentsForResource.json
 */
async function listDenyAssignmentsForResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a925f2f7-5c63-4b7b-8799-25a5f97bc3b2";
  const client = new AuthorizationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.denyAssignments.listForResource(
    "rgname",
    "resourceProviderNamespace",
    "parentResourceType/parentResourceName",
    "resourceType",
    "resourceName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listDenyAssignmentsForResource();
}

main().catch(console.error);
