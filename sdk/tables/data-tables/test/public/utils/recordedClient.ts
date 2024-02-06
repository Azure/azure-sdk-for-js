// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureNamedKeyCredential, AzureSASCredential } from "@azure/core-auth";
import { Recorder, RecorderStartOptions, SanitizerOptions, env } from "@azure-tools/test-recorder";
import { TableClient, TableServiceClient, TableServiceClientOptions } from "../../../src";

import { createTestCredential } from "@azure-tools/test-credential";

const mockAccountName = "fakeaccountname";
const mockAccountKey = "fakeKey";
const fakeConnString =
  "TableEndpoint=https://fakeaccountname.table.core.windows.net/;SharedAccessSignature=st=2021-08-03T08:52:15Z&spr=https&sig=fakesigval";
const replaceableVariables: { [k: string]: string } = {
  // Used in record and playback modes
  // 1. The key-value pairs will be used as the environment variables in playback mode
  // 2. If the env variables are present in the recordings as plain strings, they will be replaced with the provided values in record mode
  ACCOUNT_NAME: `${mockAccountName}`,
  ACCOUNT_KEY: `${mockAccountKey}`,
  ACCOUNT_SAS: `${mockAccountKey}`,
  TABLES_URL: `https://fakeaccountname.table.core.windows.net`,
  SAS_CONNECTION_STRING: fakeConnString,
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
};

const sanitizerOptions: SanitizerOptions = {
  removeHeaderSanitizer: { headersForRemoval: ["Connection", "Accept-Charset"] },
  connectionStringSanitizers: [
    {
      actualConnString: env.SAS_CONNECTION_STRING,
      fakeConnString: fakeConnString,
    },
  ],
};

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: replaceableVariables,
  sanitizerOptions,
};

export type CreateClientMode =
  | "SASConnectionString"
  | "SASToken"
  | "AccountKey"
  | "AccountConnectionString"
  | "TokenCredential";

export async function createTableClient(
  tableName: string,
  mode: CreateClientMode = "SASConnectionString",
  recorder?: Recorder
): Promise<TableClient> {
  let options: TableServiceClientOptions = {};

  if (recorder) {
    await recorder.start(recorderOptions);
    await recorder.setMatcher("HeaderlessMatcher");
    options = { ...options, ...recorder.configureClientOptions({ allowInsecureConnection: true }) };
  }

  let client: TableClient;
  switch (mode) {
    case "SASConnectionString":
      if (!env.SAS_CONNECTION_STRING) {
        throw new Error(
          "SASConnectionString is not defined, make sure that SAS_CONNECTION_STRING is defined in the environment"
        );
      }

      client = TableClient.fromConnectionString(env.SAS_CONNECTION_STRING, tableName, options);
      break;

    case "SASToken":
      if (!env.SAS_TOKEN || !env.TABLES_URL) {
        throw new Error(
          "SAS Token and AccountURL must be defined, make sure that SAS_TOKEN and  TABLES_URL are defined in the environment"
        );
      }

      client = new TableClient(
        env.TABLES_URL,
        tableName,
        new AzureSASCredential(env.SAS_TOKEN ?? ""),
        options
      );
      break;

    case "AccountKey":
      if (!env.ACCOUNT_NAME || !env.ACCOUNT_KEY || !env.TABLES_URL) {
        throw new Error(
          "AccountName, AccountURL and AccountKey must be defined, make sure that ACCOUNT_NAME, ACCOUNT_KEY and TABLES_URL are defined in the environment"
        );
      }

      client = new TableClient(
        env.TABLES_URL,
        tableName,
        new AzureNamedKeyCredential(env.ACCOUNT_NAME, env.ACCOUNT_KEY),
        options
      );
      break;

    case "TokenCredential": {
      if (!env.AZURE_TENANT_ID || !env.AZURE_CLIENT_ID || !env.AZURE_CLIENT_SECRET) {
        throw new Error(
          "AZURE_TENANT_ID, AZURE_CLIENT_ID and AZURE_CLIENT_SECRET must be defined, make sure that they are in the environment"
        );
      }

      const credential = createTestCredential();
      client = new TableClient(env.TABLES_URL ?? "", tableName, credential, options);
      break;
    }

    case "AccountConnectionString":
      if (!env.ACCOUNT_CONNECTION_STRING) {
        throw new Error(
          "AccountConnectionString is not defined, make sure that ACCOUNT_CONNECTION_STRING is defined in the environment"
        );
      }
      client = TableClient.fromConnectionString(env.ACCOUNT_CONNECTION_STRING, tableName, options);
      break;

    default:
      throw new Error(`Unknown authentication mode ${mode}`);
  }

  return client;
}

export async function createTableServiceClient(
  mode: CreateClientMode = "SASConnectionString",
  recorder?: Recorder
): Promise<TableServiceClient> {
  let options: TableServiceClientOptions = {};

  if (recorder) {
    await recorder.start(recorderOptions);
    await recorder.setMatcher("HeaderlessMatcher");
    options = { ...options, ...recorder.configureClientOptions({ allowInsecureConnection: true }) };
  }

  let client: TableServiceClient;

  switch (mode) {
    case "SASConnectionString":
      if (!env.SAS_CONNECTION_STRING) {
        throw new Error(
          "SASConnectionString is not defined, make sure that SAS_CONNECTION_STRING is defined in the environment"
        );
      }

      client = TableServiceClient.fromConnectionString(env.SAS_CONNECTION_STRING, options);
      break;

    case "SASToken":
      if (!env.SAS_TOKEN || !env.TABLES_URL) {
        throw new Error(
          "SAS Token and AccountURL must be defined, make sure that SAS_TOKEN and  TABLES_URL are defined in the environment"
        );
      }

      client = new TableServiceClient(`${env.TABLES_URL}${env.SAS_TOKEN}`, options);
      break;

    case "AccountKey":
      if (!env.ACCOUNT_NAME || !env.ACCOUNT_KEY || !env.TABLES_URL) {
        throw new Error(
          "AccountName, AccountURL and AccountKey must be defined, make sure that ACCOUNT_NAME, ACCOUNT_KEY and TABLES_URL are defined in the environment"
        );
      }

      client = new TableServiceClient(
        env.TABLES_URL,
        new AzureNamedKeyCredential(env.ACCOUNT_NAME, env.ACCOUNT_KEY),
        options
      );
      break;

    case "TokenCredential": {
      if (!env.AZURE_TENANT_ID || !env.AZURE_CLIENT_ID || !env.AZURE_CLIENT_SECRET) {
        throw new Error(
          "AZURE_TENANT_ID, AZURE_CLIENT_ID and AZURE_CLIENT_SECRET must be defined, make sure that they are in the environment"
        );
      }

      const credential = createTestCredential();
      client = new TableServiceClient(env.TABLES_URL ?? "", credential, {
        ...options,
        version: "2020-12-06",
      });
      break;
    }

    case "AccountConnectionString":
      if (!env.ACCOUNT_CONNECTION_STRING) {
        throw new Error(
          "AccountConnectionString is not defined, make sure that ACCOUNT_CONNECTION_STRING is defined in the environment"
        );
      }

      client = TableServiceClient.fromConnectionString(env.ACCOUNT_CONNECTION_STRING, options);
      break;

    default:
      throw new Error(`Unknown authentication mode ${mode}`);
  }

  return client;
}
