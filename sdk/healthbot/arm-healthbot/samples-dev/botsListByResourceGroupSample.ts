// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns all the resources of a particular type belonging to a resource group
 *
 * @summary Returns all the resources of a particular type belonging to a resource group
 * x-ms-original-file: specification/healthbot/resource-manager/Microsoft.HealthBot/stable/2021-06-10/examples/ListBotsByResourceGroup.json
 */

import { HealthbotClient } from "@azure/arm-healthbot";
import { DefaultAzureCredential } from "@azure/identity";

async function listBotsByResourceGroup(): Promise<void> {
  const subscriptionId = "subscription-id";
  const resourceGroupName = "OneResourceGroupName";
  const credential = new DefaultAzureCredential();
  const client = new HealthbotClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.bots.listByResourceGroup(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

listBotsByResourceGroup().catch(console.error);
