// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { UserSessionsListByHostPoolOptionalParams } from "@azure/arm-desktopvirtualization";
import { DesktopVirtualizationAPIClient } from "@azure/arm-desktopvirtualization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List userSessions.
 *
 * @summary List userSessions.
 * x-ms-original-file: specification/desktopvirtualization/resource-manager/Microsoft.DesktopVirtualization/stable/2024-04-03/examples/UserSession_ListByHostPool.json
 */
async function userSessionListByHostPool(): Promise<void> {
  const subscriptionId =
    process.env["DESKTOPVIRTUALIZATION_SUBSCRIPTION_ID"] || "daefabc0-95b4-48b3-b645-8a753a63c4fa";
  const resourceGroupName = process.env["DESKTOPVIRTUALIZATION_RESOURCE_GROUP"] || "resourceGroup1";
  const hostPoolName = "hostPool1";
  const filter = "userPrincipalName eq 'user1@microsoft.com' and state eq 'active'";
  const pageSize = 10;
  const isDescending = true;
  const initialSkip = 0;
  const options: UserSessionsListByHostPoolOptionalParams = {
    filter,
    pageSize,
    isDescending,
    initialSkip,
  };
  const credential = new DefaultAzureCredential();
  const client = new DesktopVirtualizationAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.userSessions.listByHostPool(
    resourceGroupName,
    hostPoolName,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await userSessionListByHostPool();
}

main().catch(console.error);
