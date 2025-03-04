// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthDataAIServicesClient } from "@azure/arm-healthdataaiservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list private endpoint connections on the given resource
 *
 * @summary list private endpoint connections on the given resource
 * x-ms-original-file: 2024-09-20/PrivateEndpointConnections_ListByDeidService_MaximumSet_Gen.json
 */
async function privateEndpointConnectionsListByDeidServiceGeneratedByMaximumSetRuleStable(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F21BB31B-C214-42C0-ACF0-DACCA05D3011";
  const client = new HealthDataAIServicesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.listByDeidService(
    "rgopenapi",
    "deidTest",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await privateEndpointConnectionsListByDeidServiceGeneratedByMaximumSetRuleStable();
}

main().catch(console.error);
