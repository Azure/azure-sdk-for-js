// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists the endpoints that agents may call as part of load testing.
 *
 * @summary Lists the endpoints that agents may call as part of load testing.
 * x-ms-original-file: specification/loadtestservice/resource-manager/Microsoft.LoadTestService/stable/2022-12-01/examples/LoadTests_ListOutboundNetworkDependenciesEndpoints.json
 */

import { LoadTestClient } from "@azure/arm-loadtesting";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listOutboundNetworkDependencies(): Promise<void> {
  const subscriptionId = process.env["LOADTESTSERVICE_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName =
    process.env["LOADTESTSERVICE_RESOURCE_GROUP"] || "default-azureloadtest-japaneast";
  const loadTestName = "sampleloadtest";
  const credential = new DefaultAzureCredential();
  const client = new LoadTestClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.loadTests.listOutboundNetworkDependenciesEndpoints(
    resourceGroupName,
    loadTestName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listOutboundNetworkDependencies();
}

main().catch(console.error);
