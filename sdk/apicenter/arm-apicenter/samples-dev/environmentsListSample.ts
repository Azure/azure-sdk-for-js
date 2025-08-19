// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns a collection of environments.
 *
 * @summary Returns a collection of environments.
 * x-ms-original-file: specification/apicenter/resource-manager/Microsoft.ApiCenter/stable/2024-03-01/examples/Environments_List.json
 */

import { AzureAPICenter } from "@azure/arm-apicenter";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function environmentsListByWorkspace(): Promise<void> {
  const subscriptionId =
    process.env["APICENTER_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["APICENTER_RESOURCE_GROUP"] || "contoso-resources";
  const serviceName = "contoso";
  const workspaceName = "default";
  const credential = new DefaultAzureCredential();
  const client = new AzureAPICenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.environments.list(
    resourceGroupName,
    serviceName,
    workspaceName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await environmentsListByWorkspace();
}

main().catch(console.error);
