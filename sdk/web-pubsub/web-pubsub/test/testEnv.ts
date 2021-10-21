// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { RecorderEnvironmentSetup } from "@azure-tools/test-recorder";

const environmentSetup: RecorderEnvironmentSetup = {
  replaceableVariables: {
    WPS_CONNECTION_STRING: "Endpoint=endpoint;AccessKey=api_key;Version=1.0;",
    WPS_API_KEY: "api_key",
    ENDPOINT: "https://endpoint",
    REVERSE_PROXY_ENDPOINT: "https://rp-endpoint",
    AZURE_CLIENT_ID: "azure_client_id",
    AZURE_CLIENT_SECRET: "azure_client_secret",
    AZURE_TENANT_ID: "azuretenantid"
  },
  customizationsOnRecordings: [],
  queryParametersToSkip: []
};

export default environmentSetup;
