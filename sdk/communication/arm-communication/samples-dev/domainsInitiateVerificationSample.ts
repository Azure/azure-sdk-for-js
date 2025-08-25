// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Initiate verification of DNS record.
 *
 * @summary Initiate verification of DNS record.
 * x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2023-04-01/examples/domains/initiateVerification.json
 */

import type { VerificationParameter } from "@azure/arm-communication";
import { CommunicationServiceManagementClient } from "@azure/arm-communication";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function initiateVerification(): Promise<void> {
  const subscriptionId =
    process.env["COMMUNICATION_SUBSCRIPTION_ID"] || "11112222-3333-4444-5555-666677778888";
  const resourceGroupName = process.env["COMMUNICATION_RESOURCE_GROUP"] || "MyResourceGroup";
  const emailServiceName = "MyEmailServiceResource";
  const domainName = "mydomain.com";
  const parameters: VerificationParameter = { verificationType: "SPF" };
  const credential = new DefaultAzureCredential();
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.domains.beginInitiateVerificationAndWait(
    resourceGroupName,
    emailServiceName,
    domainName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await initiateVerification();
}

main().catch(console.error);
