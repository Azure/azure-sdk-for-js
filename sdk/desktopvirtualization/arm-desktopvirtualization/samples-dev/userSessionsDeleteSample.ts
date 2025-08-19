// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Remove a userSession.
 *
 * @summary Remove a userSession.
 * x-ms-original-file: specification/desktopvirtualization/resource-manager/Microsoft.DesktopVirtualization/stable/2024-04-03/examples/UserSession_Delete.json
 */

import type { UserSessionsDeleteOptionalParams } from "@azure/arm-desktopvirtualization";
import { DesktopVirtualizationAPIClient } from "@azure/arm-desktopvirtualization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function userSessionDelete(): Promise<void> {
  const subscriptionId =
    process.env["DESKTOPVIRTUALIZATION_SUBSCRIPTION_ID"] || "daefabc0-95b4-48b3-b645-8a753a63c4fa";
  const resourceGroupName = process.env["DESKTOPVIRTUALIZATION_RESOURCE_GROUP"] || "resourceGroup1";
  const hostPoolName = "hostPool1";
  const sessionHostName = "sessionHost1.microsoft.com";
  const userSessionId = "1";
  const force = true;
  const options: UserSessionsDeleteOptionalParams = { force };
  const credential = new DefaultAzureCredential();
  const client = new DesktopVirtualizationAPIClient(credential, subscriptionId);
  const result = await client.userSessions.delete(
    resourceGroupName,
    hostPoolName,
    sessionHostName,
    userSessionId,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await userSessionDelete();
}

main().catch(console.error);
