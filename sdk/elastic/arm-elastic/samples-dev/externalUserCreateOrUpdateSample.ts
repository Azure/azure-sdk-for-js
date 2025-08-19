// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create User inside elastic deployment which are used by customers to perform operations on the elastic deployment
 *
 * @summary Create User inside elastic deployment which are used by customers to perform operations on the elastic deployment
 * x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/ExternalUserInfo.json
 */

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function externalUserCreateOrUpdate(): Promise<void> {
  const subscriptionId =
    process.env["ELASTIC_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["ELASTIC_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.externalUser.createOrUpdate(resourceGroupName, monitorName);
  console.log(result);
}

async function main(): Promise<void> {
  await externalUserCreateOrUpdate();
}

main().catch(console.error);
