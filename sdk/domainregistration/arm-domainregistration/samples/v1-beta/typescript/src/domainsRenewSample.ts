// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DomainRegistrationManagementClient } from "@azure/arm-domainregistration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Description for Renew a domain.
 *
 * @summary Description for Renew a domain.
 * x-ms-original-file: specification/domainregistration/resource-manager/Microsoft.DomainRegistration/DomainRegistration/stable/2024-11-01/examples/RenewDomain.json
 */
async function renewAnExistingDomain(): Promise<void> {
  const subscriptionId =
    process.env["DOMAINREGISTRATION_SUBSCRIPTION_ID"] ||
    "3dddfa4f-cedf-4dc0-ba29-b6d1a69ab545";
  const resourceGroupName =
    process.env["DOMAINREGISTRATION_RESOURCE_GROUP"] || "RG";
  const domainName = "example.com";
  const credential = new DefaultAzureCredential();
  const client = new DomainRegistrationManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.domains.renew(resourceGroupName, domainName);
  console.log(result);
}

async function main(): Promise<void> {
  await renewAnExistingDomain();
}

main().catch(console.error);
