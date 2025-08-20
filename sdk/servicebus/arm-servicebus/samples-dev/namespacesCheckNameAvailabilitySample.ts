// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Check the give namespace name availability.
 *
 * @summary Check the give namespace name availability.
 * x-ms-original-file: specification/servicebus/resource-manager/Microsoft.ServiceBus/preview/2022-10-01-preview/examples/NameSpaces/SBNameSpaceCheckNameAvailability.json
 */

import type { CheckNameAvailability } from "@azure/arm-servicebus";
import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function nameSpaceCheckNameAvailability(): Promise<void> {
  const subscriptionId =
    process.env["SERVICEBUS_SUBSCRIPTION_ID"] || "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const parameters: CheckNameAvailability = { name: "sdk-Namespace-2924" };
  const credential = new DefaultAzureCredential();
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.namespaces.checkNameAvailability(parameters);
  console.log(result);
}

async function main(): Promise<void> {
  await nameSpaceCheckNameAvailability();
}

main().catch(console.error);
