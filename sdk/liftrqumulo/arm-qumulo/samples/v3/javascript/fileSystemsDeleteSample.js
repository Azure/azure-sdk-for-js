// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { QumuloStorage } = require("@azure/arm-qumulo");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a FileSystemResource
 *
 * @summary delete a FileSystemResource
 * x-ms-original-file: 2026-04-16/FileSystems_Delete_MaximumSet_Gen.json
 */
async function fileSystemsDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C9CC2D2A-5AA0-4839-A85F-18491F2D244A";
  const client = new QumuloStorage(credential, subscriptionId);
  await client.fileSystems.delete("rgQumulo", "qumulo-fs-01");
}

/**
 * This sample demonstrates how to delete a FileSystemResource
 *
 * @summary delete a FileSystemResource
 * x-ms-original-file: 2026-04-16/FileSystems_Delete_MinimumSet_Gen.json
 */
async function fileSystemsDeleteMaximumSetGenGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "53BA951C-DA09-400A-AB3A-F8E98F317423";
  const client = new QumuloStorage(credential, subscriptionId);
  await client.fileSystems.delete("rgQumulo", "qumulo-fs-01");
}

async function main() {
  await fileSystemsDeleteMaximumSet();
  await fileSystemsDeleteMaximumSetGenGeneratedByMinimumSetRule();
}

main().catch(console.error);
