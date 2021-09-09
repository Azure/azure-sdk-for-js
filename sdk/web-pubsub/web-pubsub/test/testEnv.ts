// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { RecorderEnvironmentSetup } from "@azure-tools/test-recorder";

const environmentSetup: RecorderEnvironmentSetup = {
  replaceableVariables: {
    WPS_CONNECTION_STRING: "Endpoint=endpoint;AccessKey=api_key;Version=1.0;",
    WPS_API_KEY: "api_key",
    ENDPOINT: "endpoint"
  },
  customizationsOnRecordings: [],
  queryParametersToSkip: []
};

export default environmentSetup;
