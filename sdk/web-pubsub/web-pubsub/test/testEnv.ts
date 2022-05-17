// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RecorderStartOptions } from "@azure-tools/test-recorder";

const envSetupForPlayback: Record<string, string> = {
  WPS_CONNECTION_STRING: "Endpoint=endpoint;AccessKey=api_key;Version=1.0;",
  WPS_API_KEY: "api_key",
  WPS_ENDPOINT: "https://endpoint",
  WPS_REVERSE_PROXY_ENDPOINT: "https://endpoint",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "azuretenantid",
};

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback,
};

export default recorderOptions;
