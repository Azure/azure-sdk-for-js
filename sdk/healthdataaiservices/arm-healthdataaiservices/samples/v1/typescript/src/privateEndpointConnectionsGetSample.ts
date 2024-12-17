// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthDataAIServicesClient } from "@azure/arm-healthdataaiservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a specific private connection
 *
 * @summary get a specific private connection
 * x-ms-original-file: 2024-09-20/PrivateEndpointConnections_Get_MaximumSet_Gen.json
 */
async function privateEndpointConnectionsGetGeneratedByMaximumSetRuleStable() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F21BB31B-C214-42C0-ACF0-DACCA05D3011";
  const client = new HealthDataAIServicesClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get(
    "rgopenapi",
    "deidTest",
    "kgwgrrpabvrsrrvpcgcnfmyfgyrl",
  );
  console.log(result);
}

async function main() {
  privateEndpointConnectionsGetGeneratedByMaximumSetRuleStable();
}

main().catch(console.error);
