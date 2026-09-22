// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FluxConfigurationClient } from "@azure/arm-kubernetesconfiguration-fluxconfigurations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get Async Operation status
 *
 * @summary get Async Operation status
 * x-ms-original-file: 2025-04-01/GetFluxConfigurationAsyncOperationStatus.json
 */
async function fluxConfigurationAsyncOperationStatusGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new FluxConfigurationClient(credential, subscriptionId);
  const result = await client.fluxConfigOperationStatus.get(
    "rg1",
    "Microsoft.Kubernetes",
    "connectedClusters",
    "clusterName1",
    "srs-fluxconfig",
    "99999999-9999-9999-9999-999999999999",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await fluxConfigurationAsyncOperationStatusGet();
}

main().catch(console.error);
