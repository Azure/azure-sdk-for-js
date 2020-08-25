// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as dotenv from "dotenv";
import { env, RecorderEnvironmentSetup } from "@azure/test-utils-recorder";

import { TableClient, TableServiceClient, TablesSharedKeyCredential } from "../../../src";

dotenv.config();

const mockAccountName = "fakestorageaccount";
const mockAccountKey = "fakeKey";
const replaceableVariables: { [k: string]: string } = {
  // Used in record and playback modes
  // 1. The key-value pairs will be used as the environment variables in playback mode
  // 2. If the env variables are present in the recordings as plain strings, they will be replaced with the provided values in record mode
  ACCOUNT_NAME: `${mockAccountName}`,
  ACCOUNT_KEY: `${mockAccountKey}`,
  ACCOUNT_SAS: `${mockAccountKey}`
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

export function createTableClient(tableName: string): TableClient {
  if (env.STORAGE_CONNECTION_STRING) {
    return TableClient.fromConnectionString(env.STORAGE_CONNECTION_STRING, tableName);
  }

  if (!env.ACCOUNT_URL) {
    throw new Error("Either STORAGE_CONNECTION_STRING or ACCOUNT_URL must be defined");
  }

  if (env.ACCOUNT_SAS) {
    return new TableClient(`${env.ACCOUNT_URL}${env.SAS_TOKEN}`, tableName);
  }

  if (env.ACCOUNT_NAME && env.ACCOUNT_KEY) {
    return new TableClient(
      env.ACCOUNT_URL,
      tableName,
      new TablesSharedKeyCredential(env.ACCOUNT_NAME, env.ACCOUNT_KEY)
    );
  }

  throw new Error(
    "Couldn't find Connection String or Account Key, Name and SAS in the environment variables"
  );
}

export function createTableServiceClient(): TableServiceClient {
  if (env.STORAGE_CONNECTION_STRING) {
    return TableServiceClient.fromConnectionString(env.STORAGE_CONNECTION_STRING);
  }

  if (!env.ACCOUNT_URL) {
    throw new Error("Either STORAGE_CONNECTION_STRING or ACCOUNT_URL must be defined");
  }

  if (env.ACCOUNT_SAS) {
    return new TableServiceClient(`${env.ACCOUNT_URL}${env.SAS_TOKEN}`);
  }

  if (env.ACCOUNT_NAME && env.ACCOUNT_KEY) {
    return new TableServiceClient(
      env.ACCOUNT_URL,
      new TablesSharedKeyCredential(env.ACCOUNT_NAME, env.ACCOUNT_KEY)
    );
  }

  throw new Error(
    "Couldn't find Connection String or Account Key, Name and SAS in the environment variables"
  );
}
