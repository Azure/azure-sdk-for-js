// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DomainsDeleteOptionalParams} from "@azure/arm-domainregistration";
import {
  DomainRegistrationManagementClient,
} from "@azure/arm-domainregistration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Description for Delete a domain.
 *
 * @summary Description for Delete a domain.
 * x-ms-original-file: specification/domainregistration/resource-manager/Microsoft.DomainRegistration/DomainRegistration/stable/2024-11-01/examples/DeleteAppServiceDomain.json
 */
async function deleteAppServiceDomain(): Promise<void> {
  const subscriptionId =
    process.env["DOMAINREGISTRATION_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["DOMAINREGISTRATION_RESOURCE_GROUP"] || "testrg123";
  const domainName = "example.com";
  const forceHardDeleteDomain = true;
  const options: DomainsDeleteOptionalParams = { forceHardDeleteDomain };
  const credential = new DefaultAzureCredential();
  const client = new DomainRegistrationManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.domains.delete(
    resourceGroupName,
    domainName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteAppServiceDomain();
}

main().catch(console.error);
