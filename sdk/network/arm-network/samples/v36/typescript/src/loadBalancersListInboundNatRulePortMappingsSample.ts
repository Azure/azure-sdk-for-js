// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  QueryInboundNatRulePortMappingRequest} from "@azure/arm-network";
import {
  NetworkManagementClient,
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List of inbound NAT rule port mappings.
 *
 * @summary List of inbound NAT rule port mappings.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/QueryInboundNatRulePortMapping.json
 */
async function queryInboundNatRulePortMapping(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const groupName = "rg1";
  const loadBalancerName = "lb1";
  const backendPoolName = "bp1";
  const parameters: QueryInboundNatRulePortMappingRequest = {
    ipAddress: "10.0.0.4",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.loadBalancers.beginListInboundNatRulePortMappingsAndWait(
      groupName,
      loadBalancerName,
      backendPoolName,
      parameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await queryInboundNatRulePortMapping();
}

main().catch(console.error);
