// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates an integration account partner.
 *
 * @summary Creates or updates an integration account partner.
 * x-ms-original-file: specification/logic/resource-manager/Microsoft.Logic/stable/2019-05-01/examples/IntegrationAccountPartners_CreateOrUpdate.json
 */

import type { IntegrationAccountPartner } from "@azure/arm-logic";
import { LogicManagementClient } from "@azure/arm-logic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createOrUpdateAPartner(): Promise<void> {
  const subscriptionId =
    process.env["LOGIC_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["LOGIC_RESOURCE_GROUP"] || "testResourceGroup";
  const integrationAccountName = "testIntegrationAccount";
  const partnerName = "testPartner";
  const partner: IntegrationAccountPartner = {
    content: {
      b2B: { businessIdentities: [{ qualifier: "AA", value: "ZZ" }] },
    },
    location: "westus",
    metadata: {},
    partnerType: "B2B",
    tags: {},
  };
  const credential = new DefaultAzureCredential();
  const client = new LogicManagementClient(credential, subscriptionId);
  const result = await client.integrationAccountPartners.createOrUpdate(
    resourceGroupName,
    integrationAccountName,
    partnerName,
    partner,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAPartner();
}

main().catch(console.error);
