// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageSharedKeyCredential } from "@azure/storage-common";
import { newPipeline, StoragePipelineOptions } from "../../src/Pipeline.js";
import { QueueServiceClient } from "../../src/QueueServiceClient.js";
import {
  generateAccountSASQueryParameters,
  AccountSASPermissions,
  SASProtocol,
  AccountSASResourceTypes,
  AccountSASServices,
} from "../../src/index.js";
import { extractConnectionStringParts } from "../../src/utils/utils.common.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { env } from "@azure-tools/test-recorder";
import { configureStorageClient, SimpleTokenCredential } from "./testutils.common.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { TokenCredential } from "@azure/identity";
export * from "./testutils.common.js";

export function getGenericQSU(
  recorder: Recorder,
  accountType: string,
  accountNameSuffix: string = "",
): QueueServiceClient {
  if ((env.STORAGE_CONNECTION_STRING ?? "").startsWith("UseDevelopmentStorage=true")) {
    // Expected environment variable to run tests with the emulator
    // [Azurite - Extension for VS Code](https://marketplace.visualstudio.com/items?itemName=Azurite.azurite)
    // STORAGE_CONNECTION_STRING=UseDevelopmentStorage=true
    return QueueServiceClient.fromConnectionString(getConnectionStringFromEnvironment());
  } else {
    const accountNameEnvVar = `${accountType}ACCOUNT_NAME`;
    const accountKeyEnvVar = `${accountType}ACCOUNT_KEY`;

    const accountName = env[accountNameEnvVar];
    const accountKey = env[accountKeyEnvVar];

    if (!accountName || !accountKey || accountName === "" || accountKey === "") {
      throw new Error(
        `${accountNameEnvVar} and/or ${accountKeyEnvVar} environment variables not specified.`,
      );
    }

    const credentials = new StorageSharedKeyCredential(accountName, accountKey);
    const pipeline = newPipeline(credentials);
    const queuePrimaryURL = `https://${accountName}${accountNameSuffix}.queue.core.windows.net/`;
    const client = new QueueServiceClient(queuePrimaryURL, pipeline);
    configureStorageClient(recorder, client);
    return client;
  }
}

export function getQSU(recorder: Recorder): QueueServiceClient {
  return getGenericQSU(recorder, "");
}

export function getAlternateQSU(recorder: Recorder): QueueServiceClient {
  return getGenericQSU(recorder, "SECONDARY_", "-secondary");
}

export function getConnectionStringFromEnvironment(): string {
  const connectionStringEnvVar = `STORAGE_CONNECTION_STRING`;
  const connectionString = env[connectionStringEnvVar];

  if (!connectionString) {
    throw new Error(`${connectionStringEnvVar} environment variables not specified.`);
  }

  return connectionString;
}

export function getSASConnectionStringFromEnvironment(recorder: Recorder): string {
  const now = new Date();
  now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

  const tmr = new Date();
  tmr.setDate(tmr.getDate() + 1);
  const queueServiceClient = getQSU(recorder);
  const sharedKeyCredential = queueServiceClient["credential"];

  const sas = generateAccountSASQueryParameters(
    {
      expiresOn: tmr,
      // ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
      permissions: AccountSASPermissions.parse("rwdlacup"),
      protocol: SASProtocol.HttpsAndHttp,
      resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
      services: AccountSASServices.parse("btqf").toString(),
      startsOn: now,
      version: "2016-05-31",
    },
    sharedKeyCredential as StorageSharedKeyCredential,
  ).toString();

  const queueEndpoint = extractConnectionStringParts(getConnectionStringFromEnvironment()).url;

  return `BlobEndpoint=${queueEndpoint.replace(
    ".queue.",
    ".blob.",
  )}/;QueueEndpoint=${queueEndpoint}/;FileEndpoint=${queueEndpoint.replace(
    ".queue.",
    ".file.",
  )}/;TableEndpoint=${queueEndpoint.replace(".queue.", ".table.")}/;SharedAccessSignature=${sas}`;
}

export function getTokenBSUWithDefaultCredential(
  recorder: Recorder,
  accountType: string = "",
  accountNameSuffix: string = "",
  queueOptions?: StoragePipelineOptions,
): QueueServiceClient {
  const accountNameEnvVar = `${accountType}ACCOUNT_NAME`;

  const accountName = env[accountNameEnvVar];

  if (!accountName || accountName === "") {
    throw new Error(`${accountNameEnvVar} environment variables not specified.`);
  }

  const credential = createTestCredential();
  const queuePrimaryURL = `https://${accountName}${accountNameSuffix}.queue.core.windows.net/`;
  const client = new QueueServiceClient(queuePrimaryURL, credential, queueOptions);
  configureStorageClient(recorder, client);
  return client;
}

export function getTokenCredential(): TokenCredential {
  const accountTokenEnvVar = `ACCOUNT_TOKEN`;

  const accountToken = env[accountTokenEnvVar];

  if (!accountToken || accountToken === "") {
    throw new Error(`${accountTokenEnvVar} environment variables not specified.`);
  }

  return new SimpleTokenCredential(accountToken);
}

export function getTokenBSU(recorder: Recorder): QueueServiceClient {
  const accountNameEnvVar = `ACCOUNT_NAME`;

  const accountName = env[accountNameEnvVar];

  if (!accountName || accountName === "") {
    throw new Error(`${accountNameEnvVar} environment variables not specified.`);
  }

  const credential = getTokenCredential();
  const pipeline = newPipeline(credential);
  const blobPrimaryURL = `https://${accountName}.queue.core.windows.net/`;
  const client = new QueueServiceClient(blobPrimaryURL, pipeline);
  configureStorageClient(recorder, client);
  return client;
}

export function getSignatureFromSasUrl(sasUrl: string): string {
  const url = new URL(sasUrl);
  const signature = url.searchParams.get("sig");
  return signature!;
}
