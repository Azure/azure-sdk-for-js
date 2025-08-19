// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomanageClient } from "@azure/arm-automanage";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get the Automanage AAD first party Application Service Principal details for the subscription id.
 *
 * @summary Get the Automanage AAD first party Application Service Principal details for the subscription id.
 * x-ms-original-file: specification/automanage/resource-manager/Microsoft.Automanage/stable/2022-05-04/examples/listServicePrincipalBySubscription.json
 */
async function listServicePrincipalBySubscription(): Promise<void> {
  const subscriptionId = process.env["AUTOMANAGE_SUBSCRIPTION_ID"] || "mySubscriptionId";
  const credential = new DefaultAzureCredential();
  const client = new AutomanageClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.servicePrincipals.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listServicePrincipalBySubscription();
}

main().catch(console.error);
