// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env, RecorderEnvironmentSetup } from "@azure-tools/test-recorder";

import { ClientSecretCredential } from "@azure/identity";
import { TableClient, TableServiceClient } from "../../../src";
import { AzureNamedKeyCredential, AzureSASCredential } from "@azure/core-auth";

import "./env";

const mockAccountName = "fakeaccount";
const mockAccountKey = "fakeKey";
const fakeSas =
  "sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacuptfx&se=2021-01-31T05:16:52Z&st=2021-01-26T21:16:52Z&spr=https&sig=fakeSignature";
const mockSasConnectionString = `TableEndpoint=https://${mockAccountName}.table.core.windows.net/;SharedAccessSignature=${fakeSas}`;
const replaceableVariables: { [k: string]: string } = {
  // Used in record and playback modes
  // 1. The key-value pairs will be used as the environment variables in playback mode
  // 2. If the env variables are present in the recordings as plain strings, they will be replaced with the provided values in record mode
  ACCOUNT_NAME: `${mockAccountName}`,
  ACCOUNT_KEY: `${mockAccountKey}`,
  ACCOUNT_SAS: `${mockAccountKey}`,
  TABLES_URL: `https://${mockAccountName}.table.core.windows.net`,
  SAS_CONNECTION_STRING: `${mockSasConnectionString}`,
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888"
};

export const recordedEnvironmentSetup: RecorderEnvironmentSetup = {
  replaceableVariables,
  customizationsOnRecordings: [
    // Used in record mode
    // Array of callback functions can be provided to customize the generated recordings in record mode
    // `sig` param of SAS Token is being filtered here
    (recording: string): string =>
      env.ACCOUNT_SAS
        ? recording.replace(
            new RegExp(env.ACCOUNT_SAS.match("(.*)&sig=(.*)")[2], "g"),
            `${mockAccountKey}`
          )
        : recording
  ],
  // SAS token may contain sensitive information
  queryParametersToSkip: [
    // Used in record and playback modes
    "se",
    "sig",
    "sp",
    "spr",
    "srt",
    "ss",
    "st",
    "sv"
  ]
};

export type CreateClientMode =
  | "SASConnectionString"
  | "SASToken"
  | "AccountKey"
  | "AccountConnectionString"
  | "TokenCredential";

export function createTableClient(
  tableName: string,
  mode: CreateClientMode = "SASConnectionString"
): TableClient {
  switch (mode) {
    case "SASConnectionString":
      if (!env.SAS_CONNECTION_STRING) {
        throw new Error(
          "SASConnectionString is not defined, make sure that SAS_CONNECTION_STRING is defined in the environment"
        );
      }

      return TableClient.fromConnectionString(env.SAS_CONNECTION_STRING, tableName);

    case "SASToken":
      if (!env.SAS_TOKEN || !env.TABLES_URL) {
        throw new Error(
          "SAS Token and AccountURL must be defined, make sure that SAS_TOKEN and  TABLES_URL are defined in the environment"
        );
      }

      return new TableClient(
        env.TABLES_URL,
        tableName,
        new AzureSASCredential(env.SAS_TOKEN ?? "")
      );

    case "AccountKey":
      if (!env.ACCOUNT_NAME || !env.ACCOUNT_KEY || !env.TABLES_URL) {
        throw new Error(
          "AccountName, AccountURL and AccountKey must be defined, make sure that ACCOUNT_NAME, ACCOUNT_KEY and TABLES_URL are defined in the environment"
        );
      }

      return new TableClient(
        env.TABLES_URL,
        tableName,
        new AzureNamedKeyCredential(env.ACCOUNT_NAME, env.ACCOUNT_KEY)
      );

    case "TokenCredential": {
      if (!env.AZURE_TENANT_ID || !env.AZURE_CLIENT_ID || !env.AZURE_CLIENT_SECRET) {
        throw new Error(
          "AZURE_TENANT_ID, AZURE_CLIENT_ID and AZURE_CLIENT_SECRET must be defined, make sure that they are in the environment"
        );
      }

      const credential = new ClientSecretCredential(
        env.AZURE_TENANT_ID,
        env.AZURE_CLIENT_ID,
        env.AZURE_CLIENT_SECRET
      );

      return new TableClient(env.TABLES_URL, tableName, credential);
    }

    case "AccountConnectionString":
      if (!env.ACCOUNT_CONNECTION_STRING) {
        throw new Error(
          "AccountConnectionString is not defined, make sure that ACCOUNT_CONNECTION_STRING is defined in the environment"
        );
      }

      return TableClient.fromConnectionString(env.ACCOUNT_CONNECTION_STRING, tableName);

    default:
      throw new Error(`Unknown authentication mode ${mode}`);
  }
}

export function createTableServiceClient(
  mode: CreateClientMode = "SASConnectionString"
): TableServiceClient {
  switch (mode) {
    case "SASConnectionString":
      if (!env.SAS_CONNECTION_STRING) {
        throw new Error(
          "SASConnectionString is not defined, make sure that SAS_CONNECTION_STRING is defined in the environment"
        );
      }

      return TableServiceClient.fromConnectionString(env.SAS_CONNECTION_STRING);

    case "SASToken":
      if (!env.SAS_TOKEN || !env.TABLES_URL) {
        throw new Error(
          "SAS Token and AccountURL must be defined, make sure that SAS_TOKEN and  TABLES_URL are defined in the environment"
        );
      }

      return new TableServiceClient(`${env.TABLES_URL}${env.SAS_TOKEN}`);

    case "AccountKey":
      if (!env.ACCOUNT_NAME || !env.ACCOUNT_KEY || !env.TABLES_URL) {
        throw new Error(
          "AccountName, AccountURL and AccountKey must be defined, make sure that ACCOUNT_NAME, ACCOUNT_KEY and TABLES_URL are defined in the environment"
        );
      }

      return new TableServiceClient(
        env.TABLES_URL,
        new AzureNamedKeyCredential(env.ACCOUNT_NAME, env.ACCOUNT_KEY)
      );

    case "TokenCredential": {
      if (!env.AZURE_TENANT_ID || !env.AZURE_CLIENT_ID || !env.AZURE_CLIENT_SECRET) {
        throw new Error(
          "AZURE_TENANT_ID, AZURE_CLIENT_ID and AZURE_CLIENT_SECRET must be defined, make sure that they are in the environment"
        );
      }

      const credential = new ClientSecretCredential(
        env.AZURE_TENANT_ID,
        env.AZURE_CLIENT_ID,
        env.AZURE_CLIENT_SECRET
      );

      return new TableServiceClient(env.TABLES_URL, credential);
    }

    case "AccountConnectionString":
      if (!env.ACCOUNT_CONNECTION_STRING) {
        throw new Error(
          "AccountConnectionString is not defined, make sure that ACCOUNT_CONNECTION_STRING is defined in the environment"
        );
      }

      return TableServiceClient.fromConnectionString(env.ACCOUNT_CONNECTION_STRING);

    default:
      throw new Error(`Unknown authentication mode ${mode}`);
  }
}
