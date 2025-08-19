// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns a collection of API definitions.
 *
 * @summary Returns a collection of API definitions.
 * x-ms-original-file: specification/apicenter/resource-manager/Microsoft.ApiCenter/stable/2024-03-01/examples/ApiDefinitions_List.json
 */

import { AzureAPICenter } from "@azure/arm-apicenter";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiDefinitionsListByApiVersion(): Promise<void> {
  const subscriptionId =
    process.env["APICENTER_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["APICENTER_RESOURCE_GROUP"] || "contoso-resources";
  const serviceName = "contoso";
  const workspaceName = "default";
  const apiName = "echo-api";
  const versionName = "2023-01-01";
  const credential = new DefaultAzureCredential();
  const client = new AzureAPICenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.apiDefinitions.list(
    resourceGroupName,
    serviceName,
    workspaceName,
    apiName,
    versionName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await apiDefinitionsListByApiVersion();
}

main().catch(console.error);
