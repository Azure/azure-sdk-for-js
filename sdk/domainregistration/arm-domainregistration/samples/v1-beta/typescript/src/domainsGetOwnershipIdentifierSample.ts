// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DomainRegistrationManagementClient } from "@azure/arm-domainregistration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Description for Get ownership identifier for domain
 *
 * @summary Description for Get ownership identifier for domain
 * x-ms-original-file: specification/domainregistration/resource-manager/Microsoft.DomainRegistration/DomainRegistration/stable/2024-11-01/examples/GetDomainOwnershipIdentifier.json
 */
async function getDomainOwnershipIdentifier(): Promise<void> {
  const subscriptionId =
    process.env["DOMAINREGISTRATION_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["DOMAINREGISTRATION_RESOURCE_GROUP"] || "testrg123";
  const domainName = "example.com";
  const name = "SampleOwnershipId";
  const credential = new DefaultAzureCredential();
  const client = new DomainRegistrationManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.domains.getOwnershipIdentifier(
    resourceGroupName,
    domainName,
    name,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getDomainOwnershipIdentifier();
}

main().catch(console.error);
