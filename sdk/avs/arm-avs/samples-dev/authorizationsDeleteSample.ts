// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to delete a ExpressRouteAuthorization
 *
 * @summary delete a ExpressRouteAuthorization
 * x-ms-original-file: 2024-09-01/Authorizations_Delete.json
 */

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

async function authorizationsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.authorizations.delete("group1", "cloud1", "authorization1");
}

async function main(): Promise<void> {
  await authorizationsDelete();
}

main().catch(console.error);
