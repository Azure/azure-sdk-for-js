// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { QumuloStorage } = require("@azure/arm-qumulo");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a FileSystemResource
 *
 * @summary get a FileSystemResource
 * x-ms-original-file: 2026-04-16/FileSystems_Get_MaximumSet_Gen.json
 */
async function fileSystemsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C9CC2D2A-5AA0-4839-A85F-18491F2D244A";
  const client = new QumuloStorage(credential, subscriptionId);
  const result = await client.fileSystems.get("rgQumulo", "qumulo-fs-01");
  console.log(result);
}

/**
 * This sample demonstrates how to get a FileSystemResource
 *
 * @summary get a FileSystemResource
 * x-ms-original-file: 2026-04-16/FileSystems_Get_MinimumSet_Gen.json
 */
async function fileSystemsGetMaximumSetGenGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "53BA951C-DA09-400A-AB3A-F8E98F317423";
  const client = new QumuloStorage(credential, subscriptionId);
  const result = await client.fileSystems.get("rgQumulo", "qumulo-fs-01");
  console.log(result);
}

async function main() {
  await fileSystemsGetMaximumSet();
  await fileSystemsGetMaximumSetGenGeneratedByMinimumSetRule();
}

main().catch(console.error);
