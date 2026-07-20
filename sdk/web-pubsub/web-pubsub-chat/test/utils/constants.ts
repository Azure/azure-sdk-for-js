// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export enum EnvVarKeys {
  ENDPOINT = "WPS_CHAT_ENDPOINT",
  CONNECTION_STRING = "WPS_CHAT_CONNECTION_STRING",
  API_KEY = "WPS_CHAT_API_KEY",
  TEST_MODE = "TEST_MODE",
}

declare module "vitest" {
  type MyEnvVarKeys = {
    [K in (typeof EnvVarKeys)[keyof typeof EnvVarKeys]]: string;
  };
  export interface ProvidedContext extends MyEnvVarKeys {}
}

export const ENDPOINT = "https://endpoint";
export const API_KEY = "api_key";
export const CONNECTION_STRING = `Endpoint=${ENDPOINT};AccessKey=${API_KEY};Version=1.0;`;
