// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DomainRegistrationManagementClient } from "@azure/arm-domainregistration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Transfer out domain to another registrar
 *
 * @summary Transfer out domain to another registrar
 * x-ms-original-file: specification/domainregistration/resource-manager/Microsoft.DomainRegistration/DomainRegistration/stable/2024-11-01/examples/TransferOutDomain.json
 */
async function transferOutDomain(): Promise<void> {
  const subscriptionId =
    process.env["DOMAINREGISTRATION_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["DOMAINREGISTRATION_RESOURCE_GROUP"] || "testrg123";
  const domainName = "example.com";
  const credential = new DefaultAzureCredential();
  const client = new DomainRegistrationManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.domains.transferOut(
    resourceGroupName,
    domainName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await transferOutDomain();
}

main().catch(console.error);
