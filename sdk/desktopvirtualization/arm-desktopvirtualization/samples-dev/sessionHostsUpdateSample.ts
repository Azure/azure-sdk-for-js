// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update a session host.
 *
 * @summary Update a session host.
 * x-ms-original-file: specification/desktopvirtualization/resource-manager/Microsoft.DesktopVirtualization/stable/2024-04-03/examples/SessionHost_Update.json
 */

import type {
  SessionHostPatch,
  SessionHostsUpdateOptionalParams,
} from "@azure/arm-desktopvirtualization";
import { DesktopVirtualizationAPIClient } from "@azure/arm-desktopvirtualization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function sessionHostUpdate(): Promise<void> {
  const subscriptionId =
    process.env["DESKTOPVIRTUALIZATION_SUBSCRIPTION_ID"] || "daefabc0-95b4-48b3-b645-8a753a63c4fa";
  const resourceGroupName = process.env["DESKTOPVIRTUALIZATION_RESOURCE_GROUP"] || "resourceGroup1";
  const hostPoolName = "hostPool1";
  const sessionHostName = "sessionHost1.microsoft.com";
  const force = true;
  const sessionHost: SessionHostPatch = {
    allowNewSession: true,
    assignedUser: "user1@microsoft.com",
    friendlyName: "friendly",
  };
  const options: SessionHostsUpdateOptionalParams = { force, sessionHost };
  const credential = new DefaultAzureCredential();
  const client = new DesktopVirtualizationAPIClient(credential, subscriptionId);
  const result = await client.sessionHosts.update(
    resourceGroupName,
    hostPoolName,
    sessionHostName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await sessionHostUpdate();
}

main().catch(console.error);
