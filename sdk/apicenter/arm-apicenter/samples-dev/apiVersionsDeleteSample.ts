// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureAPICenter } from "@azure/arm-apicenter";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes specified API version
 *
 * @summary Deletes specified API version
 * x-ms-original-file: specification/apicenter/resource-manager/Microsoft.ApiCenter/stable/2024-03-01/examples/ApiVersions_Delete.json
 */
async function apiVersionsDelete(): Promise<void> {
  const subscriptionId =
    process.env["APICENTER_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["APICENTER_RESOURCE_GROUP"] || "contoso-resources";
  const serviceName = "contoso";
  const workspaceName = "default";
  const apiName = "echo-api";
  const versionName = "2023-01-01";
  const credential = new DefaultAzureCredential();
  const client = new AzureAPICenter(credential, subscriptionId);
  const result = await client.apiVersions.delete(
    resourceGroupName,
    serviceName,
    workspaceName,
    apiName,
    versionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiVersionsDelete();
}

main().catch(console.error);
