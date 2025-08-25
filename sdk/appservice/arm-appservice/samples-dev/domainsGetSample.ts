// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Description for Get a domain.
 *
 * @summary Description for Get a domain.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.DomainRegistration/stable/2024-11-01/examples/GetDomain.json
 */

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getDomain(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["APPSERVICE_RESOURCE_GROUP"] || "testrg123";
  const domainName = "example.com";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.domains.get(resourceGroupName, domainName);
  console.log(result);
}

async function main(): Promise<void> {
  await getDomain();
}

main().catch(console.error);
