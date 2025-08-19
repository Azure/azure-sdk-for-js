// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the content callback url.
 *
 * @summary Get the content callback url.
 * x-ms-original-file: specification/logic/resource-manager/Microsoft.Logic/stable/2019-05-01/examples/IntegrationAccountSchemas_ListContentCallbackUrl.json
 */

import type { GetCallbackUrlParameters } from "@azure/arm-logic";
import { LogicManagementClient } from "@azure/arm-logic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getTheContentCallbackUrl(): Promise<void> {
  const subscriptionId =
    process.env["LOGIC_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["LOGIC_RESOURCE_GROUP"] || "testResourceGroup";
  const integrationAccountName = "testIntegrationAccount";
  const schemaName = "testSchema";
  const listContentCallbackUrl: GetCallbackUrlParameters = {
    keyType: "Primary",
    notAfter: new Date("2018-04-19T16:00:00Z"),
  };
  const credential = new DefaultAzureCredential();
  const client = new LogicManagementClient(credential, subscriptionId);
  const result = await client.integrationAccountSchemas.listContentCallbackUrl(
    resourceGroupName,
    integrationAccountName,
    schemaName,
    listContentCallbackUrl,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getTheContentCallbackUrl();
}

main().catch(console.error);
