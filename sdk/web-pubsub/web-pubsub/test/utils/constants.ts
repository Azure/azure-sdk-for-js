// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export enum EnvVarKeys {
  SUBSCRIPTION_ID = "SUBSCRIPTION_ID",
  RESOURCE_GROUP = "RESOURCE_GROUP",
  WPS_NAME = "WPS_NAME",
  ENDPOINT = "WPS_ENDPOINT",
  DISABLE_LOCAL_AUTH = "DISABLE_LOCAL_AUTH",
  CONNECTION_STRING = "WPS_CONNECTION_STRING",
  REVERSE_PROXY_ENDPOINT = "WPS_REVERSE_PROXY_ENDPOINT",
  SOCKETIO_ENDPOINT = "WPS_SOCKETIO_ENDPOINT",
  API_KEY = "WPS_API_KEY",
  TEST_MODE = "TEST_MODE",
}

export const DISABLE_LOCAL_AUTH = false;
export const ENDPOINT = "https://endpoint";
export const API_KEY = "api_key";
export const CONNECTION_STRING = `Endpoint=${ENDPOINT};AccessKey=${API_KEY};Version=1.0;`;
export const REVERSE_PROXY_ENDPOINT = "https://endpoint";
export const SOCKETIO_ENDPOINT = "https://socketio.endpoint";
