// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  OrganizationResourceUpdate,
  OrganizationUpdateOptionalParams,
} from "@azure/arm-confluent";
import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Update Organization resource
 *
 * @summary Update Organization resource
 * x-ms-original-file: specification/confluent/resource-manager/Microsoft.Confluent/stable/2024-02-13/examples/Organization_Update.json
 */
async function confluentUpdate(): Promise<void> {
  const subscriptionId =
    process.env["CONFLUENT_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONFLUENT_RESOURCE_GROUP"] || "myResourceGroup";
  const organizationName = "myOrganization";
  const body: OrganizationResourceUpdate = {
    tags: { client: "dev-client", env: "dev" },
  };
  const options: OrganizationUpdateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.organization.update(resourceGroupName, organizationName, options);
  console.log(result);
}

async function main(): Promise<void> {
  await confluentUpdate();
}

main().catch(console.error);
