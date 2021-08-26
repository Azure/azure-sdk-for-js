// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StorageSharedKeyCredential } from "../../src/credentials/StorageSharedKeyCredential";
import { newPipeline } from "../../src/Pipeline";
import { QueueServiceClient } from "../../src/QueueServiceClient";
import {
  generateAccountSASQueryParameters,
  AccountSASPermissions,
  SASProtocol,
  AccountSASResourceTypes,
  AccountSASServices
} from "../../src";
import { extractConnectionStringParts } from "../../src/utils/utils.common";
import { env } from "@azure-tools/test-recorder";

// Uncomment if need to enable logger when debugging
// import {HttpPipelineLogLevel} from "../../src"
// import {ConsoleHttpPipelineLogger} from "./testutils.common"

export function getGenericQSU(
  accountType: string,
  accountNameSuffix: string = ""
): QueueServiceClient {
  if (env.STORAGE_CONNECTION_STRING.startsWith("UseDevelopmentStorage=true")) {
    // Expected environment variable to run tests with the emulator
    // [Azurite - Extension for VS Code](https://marketplace.visualstudio.com/items?itemName=Azurite.azurite)
    // STORAGE_CONNECTION_STRING=UseDevelopmentStorage=true
    return QueueServiceClient.fromConnectionString(getConnectionStringFromEnvironment());
  } else {
    const accountNameEnvVar = `${accountType}ACCOUNT_NAME`;
    const accountKeyEnvVar = `${accountType}ACCOUNT_KEY`;

    let accountName: string | undefined;
    let accountKey: string | undefined;

    accountName = process.env[accountNameEnvVar];
    accountKey = process.env[accountKeyEnvVar];

    if (!accountName || !accountKey || accountName === "" || accountKey === "") {
      throw new Error(
        `${accountNameEnvVar} and/or ${accountKeyEnvVar} environment variables not specified.`
      );
    }

    const credentials = new StorageSharedKeyCredential(accountName, accountKey);
    const pipeline = newPipeline(credentials, {
      // Enable logger when debugging
      // logger: new ConsoleHttpPipelineLogger(HttpPipelineLogLevel.INFO)
    });
    const queuePrimaryURL = `https://${accountName}${accountNameSuffix}.queue.core.windows.net/`;
    return new QueueServiceClient(queuePrimaryURL, pipeline);
  }
}

export function getQSU(): QueueServiceClient {
  return getGenericQSU("");
}

export function getAlternateQSU(): QueueServiceClient {
  return getGenericQSU("SECONDARY_", "-secondary");
}

export function getConnectionStringFromEnvironment(): string {
  const connectionStringEnvVar = `STORAGE_CONNECTION_STRING`;
  const connectionString = process.env[connectionStringEnvVar];

  if (!connectionString) {
    throw new Error(`${connectionStringEnvVar} environment variables not specified.`);
  }

  return connectionString;
}

export function getSASConnectionStringFromEnvironment(): string {
  const now = new Date();
  now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

  const tmr = new Date();
  tmr.setDate(tmr.getDate() + 1);
  const queueServiceClient = getQSU();
  // By default, credential is always the last element of pipeline factories
  const factories = (queueServiceClient as any).pipeline.factories;
  const sharedKeyCredential = factories[factories.length - 1];

  const sas = generateAccountSASQueryParameters(
    {
      expiresOn: tmr,
      ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
      permissions: AccountSASPermissions.parse("rwdlacup"),
      protocol: SASProtocol.HttpsAndHttp,
      resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
      services: AccountSASServices.parse("btqf").toString(),
      startsOn: now,
      version: "2016-05-31"
    },
    sharedKeyCredential as StorageSharedKeyCredential
  ).toString();

  const queueEndpoint = extractConnectionStringParts(getConnectionStringFromEnvironment()).url;

  return `BlobEndpoint=${queueEndpoint.replace(
    ".queue.",
    ".blob."
  )}/;QueueEndpoint=${queueEndpoint}/;FileEndpoint=${queueEndpoint.replace(
    ".queue.",
    ".file."
  )}/;TableEndpoint=${queueEndpoint.replace(".queue.", ".table.")}/;SharedAccessSignature=${sas}`;
}
