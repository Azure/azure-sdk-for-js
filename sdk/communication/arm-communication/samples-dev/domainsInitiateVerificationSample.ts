// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  VerificationParameter} from "@azure/arm-communication";
import {
  CommunicationServiceManagementClient,
} from "@azure/arm-communication";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Initiate verification of DNS record.
 *
 * @summary Initiate verification of DNS record.
 * x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2025-09-01/examples/domains/initiateVerification.json
 */
async function initiateVerification(): Promise<void> {
  const subscriptionId =
    process.env["COMMUNICATION_SUBSCRIPTION_ID"] ||
    "11112222-3333-4444-5555-666677778888";
  const resourceGroupName =
    process.env["COMMUNICATION_RESOURCE_GROUP"] || "MyResourceGroup";
  const emailServiceName = "MyEmailServiceResource";
  const domainName = "mydomain.com";
  const parameters: VerificationParameter = { verificationType: "SPF" };
  const credential = new DefaultAzureCredential();
  const client = new CommunicationServiceManagementClient(
    credential,
    subscriptionId,
  );
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
