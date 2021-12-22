// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env, RecorderStartOptions } from "@azure-tools/test-recorder-new";

export function isBrowser(): boolean {
  return typeof self !== "undefined";
}

const mockAccountName = "fakestorageaccount";
const mockAccountKey = "aaaaa";

export function assertEnvironmentVariable(name: string): string {
  const value = env[name];
  if (value === undefined || value === null) {
    throw new Error(`Expected variable ${name} to be set`);
  }

  return value;
}

export const recorderStartOptions: RecorderStartOptions = {
  envSetupForPlayback: {
    // Used in record and playback modes
    // 1. The key-value pairs will be used as the environment variables in playback mode
    // 2. If the env variables are present in the recordings as plain strings, they will be replaced with the provided values in record mode
    ACCOUNT_NAME: `${mockAccountName}`,
    ACCOUNT_KEY: `${mockAccountKey}`,
    ACCOUNT_SAS: `${mockAccountKey}`,
    STORAGE_CONNECTION_STRING: `DefaultEndpointsProtocol=https;AccountName=${mockAccountName};AccountKey=${mockAccountKey};EndpointSuffix=core.windows.net`,
    // Comment following line to skip user delegation key/SAS related cases in record and play
    // which depends on this environment variable
    ACCOUNT_TOKEN: `${mockAccountKey}`
  },

  sanitizerOptions: {
    generalRegexSanitizers: [
      {
        regex: assertEnvironmentVariable("ACCOUNT_SAS").match("(.*)&sig=(.*)")![2],
        value: mockAccountKey
      }
    ],

    connectionStringSanitizers: [
      {
        actualConnString: assertEnvironmentVariable("STORAGE_CONNECTION_STRING"),
        fakeConnString: `DefaultEndpointsProtocol=https;AccountName=${mockAccountName};AccountKey=${mockAccountKey};EndpointSuffix=core.windows.net`
      }
    ]
  }
};

export function getUniqueName(prefix: string): string {
  return `${prefix}${new Date().getTime()}${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(5, "00000")}`;
}

export function base64encode(content: string): string {
  return isBrowser() ? btoa(content) : Buffer.from(content).toString("base64");
}

export function base64decode(encodedString: string): string {
  return isBrowser() ? atob(encodedString) : Buffer.from(encodedString, "base64").toString();
}
