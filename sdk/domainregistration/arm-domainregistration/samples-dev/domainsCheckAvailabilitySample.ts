// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  NameIdentifier} from "@azure/arm-domainregistration";
import {
  DomainRegistrationManagementClient,
} from "@azure/arm-domainregistration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Description for Check if a domain is available for registration.
 *
 * @summary Description for Check if a domain is available for registration.
 * x-ms-original-file: specification/domainregistration/resource-manager/Microsoft.DomainRegistration/DomainRegistration/stable/2024-11-01/examples/CheckDomainAvailability.json
 */
async function checkDomainAvailability(): Promise<void> {
  const subscriptionId =
    process.env["DOMAINREGISTRATION_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const identifier: NameIdentifier = { name: "abcd.com" };
  const credential = new DefaultAzureCredential();
  const client = new DomainRegistrationManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.domains.checkAvailability(identifier);
  console.log(result);
}

async function main(): Promise<void> {
  await checkDomainAvailability();
}

main().catch(console.error);
