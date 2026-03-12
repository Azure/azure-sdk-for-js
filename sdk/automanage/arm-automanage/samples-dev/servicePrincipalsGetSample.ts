// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the Automanage AAD first party Application Service Principal details for the subscription id.
 *
 * @summary Get the Automanage AAD first party Application Service Principal details for the subscription id.
 * x-ms-original-file: specification/automanage/resource-manager/Microsoft.Automanage/stable/2022-05-04/examples/getServicePrincipal.json
 */

import { AutomanageClient } from "@azure/arm-automanage";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getServicePrincipal(): Promise<void> {
  const subscriptionId = process.env["AUTOMANAGE_SUBSCRIPTION_ID"] || "mySubscriptionId";
  const credential = new DefaultAzureCredential();
  const client = new AutomanageClient(credential, subscriptionId);
  const result = await client.servicePrincipals.get();
  console.log(result);
}

async function main(): Promise<void> {
  await getServicePrincipal();
}

main().catch(console.error);
