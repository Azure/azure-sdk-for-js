// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an entity.
 *
 * @summary gets an entity.
 * x-ms-original-file: 2025-07-01-preview/entities/GetAccountEntityById.json
 */
async function getAnAccountEntity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.entities.get(
    "myRg",
    "myWorkspace",
    "e1d3d618-e11f-478b-98e3-bb381539a8e1",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets an entity.
 *
 * @summary gets an entity.
 * x-ms-original-file: 2025-07-01-preview/entities/GetAzureResourceEntityById.json
 */
async function getAnAzureResourceEntity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.entities.get(
    "myRg",
    "myWorkspace",
    "e1d3d618-e11f-478b-98e3-bb381539a8e1",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets an entity.
 *
 * @summary gets an entity.
 * x-ms-original-file: 2025-07-01-preview/entities/GetCloudApplicationEntityById.json
 */
async function getACloudApplicationEntity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.entities.get(
    "myRg",
    "myWorkspace",
    "e1d3d618-e11f-478b-98e3-bb381539a8e1",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets an entity.
 *
 * @summary gets an entity.
 * x-ms-original-file: 2025-07-01-preview/entities/GetDnsEntityById.json
 */
async function getADnsEntity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.entities.get(
    "myRg",
    "myWorkspace",
    "f4e74920-f2c0-4412-a45f-66d94fdf01f8",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets an entity.
 *
 * @summary gets an entity.
 * x-ms-original-file: 2025-07-01-preview/entities/GetFileEntityById.json
 */
async function getAFileEntity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.entities.get(
    "myRg",
    "myWorkspace",
    "af378b21-b4aa-4fe7-bc70-13f8621a322f",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets an entity.
 *
 * @summary gets an entity.
 * x-ms-original-file: 2025-07-01-preview/entities/GetFileHashEntityById.json
 */
async function getAFileHashEntity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.entities.get(
    "myRg",
    "myWorkspace",
    "ea359fa6-c1e5-f878-e105-6344f3e399a1",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets an entity.
 *
 * @summary gets an entity.
 * x-ms-original-file: 2025-07-01-preview/entities/GetHostEntityById.json
 */
async function getAHostEntity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.entities.get(
    "myRg",
    "myWorkspace",
    "e1d3d618-e11f-478b-98e3-bb381539a8e1",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets an entity.
 *
 * @summary gets an entity.
 * x-ms-original-file: 2025-07-01-preview/entities/GetIoTDeviceEntityById.json
 */
async function getAnIoTDeviceEntity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.entities.get(
    "myRg",
    "myWorkspace",
    "e1d3d618-e11f-478b-98e3-bb381539a8e1",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets an entity.
 *
 * @summary gets an entity.
 * x-ms-original-file: 2025-07-01-preview/entities/GetIpEntityById.json
 */
async function getAnIpEntity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.entities.get(
    "myRg",
    "myWorkspace",
    "e1d3d618-e11f-478b-98e3-bb381539a8e1",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets an entity.
 *
 * @summary gets an entity.
 * x-ms-original-file: 2025-07-01-preview/entities/GetMailClusterEntityById.json
 */
async function getAMailClusterEntity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.entities.get(
    "myRg",
    "myWorkspace",
    "e1d3d618-e11f-478b-98e3-bb381539a8e1",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets an entity.
 *
 * @summary gets an entity.
 * x-ms-original-file: 2025-07-01-preview/entities/GetMailMessageEntityById.json
 */
async function getAMailMessageEntity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.entities.get(
    "myRg",
    "myWorkspace",
    "e1d3d618-e11f-478b-98e3-bb381539a8e1",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets an entity.
 *
 * @summary gets an entity.
 * x-ms-original-file: 2025-07-01-preview/entities/GetMailboxEntityById.json
 */
async function getAMailboxEntity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.entities.get(
    "myRg",
    "myWorkspace",
    "e1d3d618-e11f-478b-98e3-bb381539a8e1",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets an entity.
 *
 * @summary gets an entity.
 * x-ms-original-file: 2025-07-01-preview/entities/GetMalwareEntityById.json
 */
async function getAMalwareEntity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.entities.get(
    "myRg",
    "myWorkspace",
    "af378b21-b4aa-4fe7-bc70-13f8621a322f",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets an entity.
 *
 * @summary gets an entity.
 * x-ms-original-file: 2025-07-01-preview/entities/GetProcessEntityById.json
 */
async function getAProcessEntity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.entities.get(
    "myRg",
    "myWorkspace",
    "7264685c-038c-42c6-948c-38e14ef1fb98",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets an entity.
 *
 * @summary gets an entity.
 * x-ms-original-file: 2025-07-01-preview/entities/GetRegistryKeyEntityById.json
 */
async function getARegistryKeyEntity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.entities.get(
    "myRg",
    "myWorkspace",
    "e1d3d618-e11f-478b-98e3-bb381539a8e1",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets an entity.
 *
 * @summary gets an entity.
 * x-ms-original-file: 2025-07-01-preview/entities/GetRegistryValueEntityById.json
 */
async function getARegistryValueEntity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.entities.get(
    "myRg",
    "myWorkspace",
    "dc44bd11-b348-4d76-ad29-37bf7aa41356",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets an entity.
 *
 * @summary gets an entity.
 * x-ms-original-file: 2025-07-01-preview/entities/GetSecurityAlertEntityById.json
 */
async function getASecurityAlertEntity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.entities.get(
    "myRg",
    "myWorkspace",
    "4aa486e0-6f85-41af-99ea-7acdce7be6c8",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets an entity.
 *
 * @summary gets an entity.
 * x-ms-original-file: 2025-07-01-preview/entities/GetSecurityGroupEntityById.json
 */
async function getASecurityGroupEntity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.entities.get(
    "myRg",
    "myWorkspace",
    "e1d3d618-e11f-478b-98e3-bb381539a8e1",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets an entity.
 *
 * @summary gets an entity.
 * x-ms-original-file: 2025-07-01-preview/entities/GetSubmissionMailEntityById.json
 */
async function getASubmissionMailEntity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.entities.get(
    "myRg",
    "myWorkspace",
    "e1d3d618-e11f-478b-98e3-bb381539a8e1",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets an entity.
 *
 * @summary gets an entity.
 * x-ms-original-file: 2025-07-01-preview/entities/GetUrlEntityById.json
 */
async function getAUrlEntity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.entities.get(
    "myRg",
    "myWorkspace",
    "e1d3d618-e11f-478b-98e3-bb381539a8e1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAnAccountEntity();
  await getAnAzureResourceEntity();
  await getACloudApplicationEntity();
  await getADnsEntity();
  await getAFileEntity();
  await getAFileHashEntity();
  await getAHostEntity();
  await getAnIoTDeviceEntity();
  await getAnIpEntity();
  await getAMailClusterEntity();
  await getAMailMessageEntity();
  await getAMailboxEntity();
  await getAMalwareEntity();
  await getAProcessEntity();
  await getARegistryKeyEntity();
  await getARegistryValueEntity();
  await getASecurityAlertEntity();
  await getASecurityGroupEntity();
  await getASubmissionMailEntity();
  await getAUrlEntity();
}

main().catch(console.error);
