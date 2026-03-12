// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation to create or update a gateway.
 *
 * @summary The operation to create or update a gateway.
 * x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/preview/2025-02-19-preview/examples/gateway/Gateway_CreateOrUpdate.json
 */

import {
  Gateway,
  HybridComputeManagementClient,
} from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createOrUpdateAGateway(): Promise<void> {
  const subscriptionId =
    process.env["HYBRIDCOMPUTE_SUBSCRIPTION_ID"] ||
    "ffd506c8-3415-42d3-9612-fdb423fb17df";
  const resourceGroupName =
    process.env["HYBRIDCOMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const gatewayName = "{gatewayName}";
  const parameters: Gateway = {
    allowedFeatures: ["*"],
    gatewayType: "Public",
    location: "eastus2euap",
  };
  const credential = new DefaultAzureCredential();
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.gateways.beginCreateOrUpdateAndWait(
    resourceGroupName,
    gatewayName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAGateway();
}

main().catch(console.error);
