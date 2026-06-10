// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the endpoints that agents may call as part of Dev Box service administration. These FQDNs should be allowed for outbound access in order for the Dev Box service to function.
 *
 * @summary lists the endpoints that agents may call as part of Dev Box service administration. These FQDNs should be allowed for outbound access in order for the Dev Box service to function.
 * x-ms-original-file: 2026-01-01-preview/NetworkConnections_ListOutboundNetworkDependenciesEndpoints.json
 */
async function listOutboundNetworkDependencies() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkConnections.listOutboundNetworkDependenciesEndpoints(
    "rg1",
    "uswest3network",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listOutboundNetworkDependencies();
}

main().catch(console.error);
