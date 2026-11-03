// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a retained discovery result by its ID, or uses latest to select the most recently durably admitted discovery. Returns 200 with the current representation while processing or terminal. A Failed result can contain errors without a snapshot. Returns 404 if no qualifying retained result exists. This is not an LRO polling endpoint.
 *
 * @summary gets a retained discovery result by its ID, or uses latest to select the most recently durably admitted discovery. Returns 200 with the current representation while processing or terminal. A Failed result can contain errors without a snapshot. Returns 404 if no qualifying retained result exists. This is not an LRO polling endpoint.
 * x-ms-original-file: 2026-11-01/WorkspaceDiscoveries_Get_BaselineUnknown.json
 */
async function getAHealthyContainerScanWithAStructurallyUnknownInventoryDenominator(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.workspaceDiscoveries.get(
    "exampleRG",
    "exampleWorkspace",
    "00000000-0000-0000-0000-000000000006",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a retained discovery result by its ID, or uses latest to select the most recently durably admitted discovery. Returns 200 with the current representation while processing or terminal. A Failed result can contain errors without a snapshot. Returns 404 if no qualifying retained result exists. This is not an LRO polling endpoint.
 *
 * @summary gets a retained discovery result by its ID, or uses latest to select the most recently durably admitted discovery. Returns 200 with the current representation while processing or terminal. A Failed result can contain errors without a snapshot. Returns 404 if no qualifying retained result exists. This is not an LRO polling endpoint.
 * x-ms-original-file: 2026-11-01/WorkspaceDiscoveries_Get_Established.json
 */
async function getAnEstablishedDiscoveryResultWithAKnownResourcePopulation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.workspaceDiscoveries.get(
    "exampleRG",
    "exampleWorkspace",
    "00000000-0000-0000-0000-000000000002",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a retained discovery result by its ID, or uses latest to select the most recently durably admitted discovery. Returns 200 with the current representation while processing or terminal. A Failed result can contain errors without a snapshot. Returns 404 if no qualifying retained result exists. This is not an LRO polling endpoint.
 *
 * @summary gets a retained discovery result by its ID, or uses latest to select the most recently durably admitted discovery. Returns 200 with the current representation while processing or terminal. A Failed result can contain errors without a snapshot. Returns 404 if no qualifying retained result exists. This is not an LRO polling endpoint.
 * x-ms-original-file: 2026-11-01/WorkspaceDiscoveries_Get_Failed.json
 */
async function getATerminalFailedDiscoveryWithoutAnAcceptedInventoryResult(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.workspaceDiscoveries.get(
    "exampleRG",
    "exampleWorkspace",
    "00000000-0000-0000-0000-000000000005",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a retained discovery result by its ID, or uses latest to select the most recently durably admitted discovery. Returns 200 with the current representation while processing or terminal. A Failed result can contain errors without a snapshot. Returns 404 if no qualifying retained result exists. This is not an LRO polling endpoint.
 *
 * @summary gets a retained discovery result by its ID, or uses latest to select the most recently durably admitted discovery. Returns 200 with the current representation while processing or terminal. A Failed result can contain errors without a snapshot. Returns 404 if no qualifying retained result exists. This is not an LRO polling endpoint.
 * x-ms-original-file: 2026-11-01/WorkspaceDiscoveries_Get_InProgress.json
 */
async function readARunningDiscoveryWithHttp200WithoutInventingAcceptedCoverage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.workspaceDiscoveries.get(
    "exampleRG",
    "exampleWorkspace",
    "00000000-0000-0000-0000-000000000009",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a retained discovery result by its ID, or uses latest to select the most recently durably admitted discovery. Returns 200 with the current representation while processing or terminal. A Failed result can contain errors without a snapshot. Returns 404 if no qualifying retained result exists. This is not an LRO polling endpoint.
 *
 * @summary gets a retained discovery result by its ID, or uses latest to select the most recently durably admitted discovery. Returns 200 with the current representation while processing or terminal. A Failed result can contain errors without a snapshot. Returns 404 if no qualifying retained result exists. This is not an LRO polling endpoint.
 * x-ms-original-file: 2026-11-01/WorkspaceDiscoveries_Get_KnownEmpty.json
 */
async function getAnEstablishedDiscoveryResultWithAnAuthoritativelyEmptyExpectedSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.workspaceDiscoveries.get(
    "exampleRG",
    "exampleWorkspace",
    "00000000-0000-0000-0000-000000000007",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a retained discovery result by its ID, or uses latest to select the most recently durably admitted discovery. Returns 200 with the current representation while processing or terminal. A Failed result can contain errors without a snapshot. Returns 404 if no qualifying retained result exists. This is not an LRO polling endpoint.
 *
 * @summary gets a retained discovery result by its ID, or uses latest to select the most recently durably admitted discovery. Returns 200 with the current representation while processing or terminal. A Failed result can contain errors without a snapshot. Returns 404 if no qualifying retained result exists. This is not an LRO polling endpoint.
 * x-ms-original-file: 2026-11-01/WorkspaceDiscoveries_Get_Latest.json
 */
async function readLatestAsAnAliasWhileReturningTheCanonicalDiscoveryIdentity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.workspaceDiscoveries.get("exampleRG", "exampleWorkspace", "latest");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a retained discovery result by its ID, or uses latest to select the most recently durably admitted discovery. Returns 200 with the current representation while processing or terminal. A Failed result can contain errors without a snapshot. Returns 404 if no qualifying retained result exists. This is not an LRO polling endpoint.
 *
 * @summary gets a retained discovery result by its ID, or uses latest to select the most recently durably admitted discovery. Returns 200 with the current representation while processing or terminal. A Failed result can contain errors without a snapshot. Returns 404 if no qualifying retained result exists. This is not an LRO polling endpoint.
 * x-ms-original-file: 2026-11-01/WorkspaceDiscoveries_Get_PartialMixed.json
 */
async function getAPartiallySucceededResultWithClassifiedGuidanceSystemUncertaintyAndATruncatedWarningSample(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.workspaceDiscoveries.get(
    "exampleRG",
    "exampleWorkspace",
    "00000000-0000-0000-0000-000000000008",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAHealthyContainerScanWithAStructurallyUnknownInventoryDenominator();
  await getAnEstablishedDiscoveryResultWithAKnownResourcePopulation();
  await getATerminalFailedDiscoveryWithoutAnAcceptedInventoryResult();
  await readARunningDiscoveryWithHttp200WithoutInventingAcceptedCoverage();
  await getAnEstablishedDiscoveryResultWithAnAuthoritativelyEmptyExpectedSet();
  await readLatestAsAnAliasWhileReturningTheCanonicalDiscoveryIdentity();
  await getAPartiallySucceededResultWithClassifiedGuidanceSystemUncertaintyAndATruncatedWarningSample();
}

main().catch(console.error);
