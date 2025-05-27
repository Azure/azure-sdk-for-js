// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a Service Fabric node type of a given managed cluster.
 *
 * @summary create or update a Service Fabric node type of a given managed cluster.
 * x-ms-original-file: 2025-03-01-preview/NodeTypePutOperationAutoScale_example.json
 */
async function putANodeTypeWithAutoScaleParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  const result = await client.nodeTypes.createOrUpdate("resRg", "myCluster", "BE");
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Service Fabric node type of a given managed cluster.
 *
 * @summary create or update a Service Fabric node type of a given managed cluster.
 * x-ms-original-file: 2025-03-01-preview/NodeTypePutOperationCustomImage_example.json
 */
async function putNodeTypeWithCustomVmImage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  const result = await client.nodeTypes.createOrUpdate("resRg", "myCluster", "BE");
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Service Fabric node type of a given managed cluster.
 *
 * @summary create or update a Service Fabric node type of a given managed cluster.
 * x-ms-original-file: 2025-03-01-preview/NodeTypePutOperationCustomSharedGalleriesImage_example.json
 */
async function putNodeTypeWithSharedGalleriesCustomVmImage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  const result = await client.nodeTypes.createOrUpdate("resRg", "myCluster", "BE");
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Service Fabric node type of a given managed cluster.
 *
 * @summary create or update a Service Fabric node type of a given managed cluster.
 * x-ms-original-file: 2025-03-01-preview/NodeTypePutOperationDedicatedHost_example.json
 */
async function putNodeTypeWithDedicatedHosts(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  const result = await client.nodeTypes.createOrUpdate("resRg", "myCluster", "BE");
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Service Fabric node type of a given managed cluster.
 *
 * @summary create or update a Service Fabric node type of a given managed cluster.
 * x-ms-original-file: 2025-03-01-preview/NodeTypePutOperationStateless_example.json
 */
async function putAnStatelessNodeTypeWithTemporaryDiskForServiceFabric(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  const result = await client.nodeTypes.createOrUpdate("resRg", "myCluster", "BE");
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Service Fabric node type of a given managed cluster.
 *
 * @summary create or update a Service Fabric node type of a given managed cluster.
 * x-ms-original-file: 2025-03-01-preview/NodeTypePutOperationVmImagePlan_example.json
 */
async function putNodeTypeWithVmImagePlan(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  const result = await client.nodeTypes.createOrUpdate("resRg", "myCluster", "BE");
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Service Fabric node type of a given managed cluster.
 *
 * @summary create or update a Service Fabric node type of a given managed cluster.
 * x-ms-original-file: 2025-03-01-preview/NodeTypePutOperation_example_max.json
 */
async function putANodeTypeWithMaximumParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  const result = await client.nodeTypes.createOrUpdate(
    "resRg",
    "myCluster",
    "BE-testResourceGroup-testRegion-test",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Service Fabric node type of a given managed cluster.
 *
 * @summary create or update a Service Fabric node type of a given managed cluster.
 * x-ms-original-file: 2025-03-01-preview/NodeTypePutOperation_example_min.json
 */
async function putANodeTypeWithMinimumParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  const result = await client.nodeTypes.createOrUpdate("resRg", "myCluster", "BE");
  console.log(result);
}

async function main(): Promise<void> {
  await putANodeTypeWithAutoScaleParameters();
  await putNodeTypeWithCustomVmImage();
  await putNodeTypeWithSharedGalleriesCustomVmImage();
  await putNodeTypeWithDedicatedHosts();
  await putAnStatelessNodeTypeWithTemporaryDiskForServiceFabric();
  await putNodeTypeWithVmImagePlan();
  await putANodeTypeWithMaximumParameters();
  await putANodeTypeWithMinimumParameters();
}

main().catch(console.error);
