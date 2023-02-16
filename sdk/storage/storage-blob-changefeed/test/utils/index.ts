// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { config } from "dotenv";
import { SimpleTokenCredential } from "./testutils.common";
import {
  StorageSharedKeyCredential,
  BlobServiceClient,
  StoragePipelineOptions,
} from "@azure/storage-blob";
import { BlobChangeFeedClient } from "../../src";
import { TokenCredential } from "@azure/core-auth";
import { env } from "@azure-tools/test-recorder";

config();

export * from "./testutils.common";

export function getGenericCredential(accountType: string): StorageSharedKeyCredential {
  const accountNameEnvVar = `${accountType}ACCOUNT_NAME`;
  const accountKeyEnvVar = `${accountType}ACCOUNT_KEY`;

  const accountName = process.env[accountNameEnvVar];
  const accountKey = process.env[accountKeyEnvVar];
  if (!accountName || !accountKey || accountName === "" || accountKey === "") {
    throw new Error(
      `${accountNameEnvVar} and/or ${accountKeyEnvVar} environment variables not specified.`
    );
  }

  return new StorageSharedKeyCredential(accountName, accountKey);
}

export function getGenericBSU(
  accountType: string,
  accountNameSuffix: string = ""
): BlobServiceClient {
  if (
    env.STORAGE_CONNECTION_STRING &&
    env.STORAGE_CONNECTION_STRING.startsWith("UseDevelopmentStorage=true")
  ) {
    return BlobServiceClient.fromConnectionString(getConnectionStringFromEnvironment());
  } else {
    const credential = getGenericCredential(accountType) as StorageSharedKeyCredential;

    const blobPrimaryURL = `https://${credential.accountName}${accountNameSuffix}.blob.core.windows.net/`;
    return new BlobServiceClient(blobPrimaryURL, credential);
  }
}

export function getTokenCredential(): TokenCredential {
  const accountTokenEnvVar = `ACCOUNT_TOKEN`;
  const accountToken = process.env[accountTokenEnvVar];
  if (!accountToken || accountToken === "") {
    throw new Error(`${accountTokenEnvVar} environment variables not specified.`);
  }

  return new SimpleTokenCredential(accountToken);
}

export function getTokenBSU(): BlobServiceClient {
  const accountNameEnvVar = `ACCOUNT_NAME`;

  const accountName = process.env[accountNameEnvVar];
  if (!accountName || accountName === "") {
    throw new Error(`${accountNameEnvVar} environment variables not specified.`);
  }

  const credential = getTokenCredential();
  const blobPrimaryURL = `https://${accountName}.blob.core.windows.net/`;
  return new BlobServiceClient(blobPrimaryURL, credential);
}

export function getBSU(): BlobServiceClient {
  return getGenericBSU("");
}

export function getAlternateBSU(): BlobServiceClient {
  return getGenericBSU("SECONDARY_", "-secondary");
}

export function getConnectionStringFromEnvironment(): string {
  const connectionStringEnvVar = `STORAGE_CONNECTION_STRING`;
  const connectionString = process.env[connectionStringEnvVar];

  if (!connectionString) {
    throw new Error(`${connectionStringEnvVar} environment variables not specified.`);
  }

  return connectionString;
}

export function getBlobChangeFeedClient(
  accountType: string = "",
  accountNameSuffix: string = "",
  options: StoragePipelineOptions = {}
): BlobChangeFeedClient {
  if (
    env.STORAGE_CONNECTION_STRING &&
    env.STORAGE_CONNECTION_STRING.startsWith("UseDevelopmentStorage=true")
  ) {
    return BlobChangeFeedClient.fromConnectionString(getConnectionStringFromEnvironment());
  } else {
    const credential = getGenericCredential(accountType) as StorageSharedKeyCredential;

    const blobPrimaryURL = `https://${credential.accountName}${accountNameSuffix}.blob.core.windows.net/`;
    return new BlobChangeFeedClient(blobPrimaryURL, credential, options);
  }
}
