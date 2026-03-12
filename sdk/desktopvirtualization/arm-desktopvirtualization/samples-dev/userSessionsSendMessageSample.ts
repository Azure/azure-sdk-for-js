// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Send a message to a user.
 *
 * @summary Send a message to a user.
 * x-ms-original-file: specification/desktopvirtualization/resource-manager/Microsoft.DesktopVirtualization/stable/2024-04-03/examples/UserSession_SendMessage_Post.json
 */

import type {
  SendMessage,
  UserSessionsSendMessageOptionalParams,
} from "@azure/arm-desktopvirtualization";
import { DesktopVirtualizationAPIClient } from "@azure/arm-desktopvirtualization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function userSessionSendMessagePost(): Promise<void> {
  const subscriptionId =
    process.env["DESKTOPVIRTUALIZATION_SUBSCRIPTION_ID"] || "daefabc0-95b4-48b3-b645-8a753a63c4fa";
  const resourceGroupName = process.env["DESKTOPVIRTUALIZATION_RESOURCE_GROUP"] || "resourceGroup1";
  const hostPoolName = "hostPool1";
  const sessionHostName = "sessionHost1.microsoft.com";
  const userSessionId = "1";
  const sendMessage: SendMessage = {
    messageBody: "body",
    messageTitle: "title",
  };
  const options: UserSessionsSendMessageOptionalParams = { sendMessage };
  const credential = new DefaultAzureCredential();
  const client = new DesktopVirtualizationAPIClient(credential, subscriptionId);
  const result = await client.userSessions.sendMessage(
    resourceGroupName,
    hostPoolName,
    sessionHostName,
    userSessionId,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await userSessionSendMessagePost();
}

main().catch(console.error);
