// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecorderStartOptions } from "@azure-tools/test-recorder";

const envSetupForPlayback: Record<string, string> = {
  WPS_CONNECTION_STRING: "Endpoint=endpoint;AccessKey=api_key;Version=1.0;",
  WPS_API_KEY: "api_key",
  WPS_ENDPOINT: "https://endpoint",
  WPS_REVERSE_PROXY_ENDPOINT: "https://endpoint",
  WPS_SOCKETIO_ENDPOINT: "https://socketio.endpoint",
};

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback,
  sanitizerOptions: {
    generalSanitizers: [
      {
        regex: true,
        target: "(?<=http://|https://)(?<host>[^/?]+)",
        value: "Sanitized",
        groupForReplace: "host",
      },
    ],
  },
};

export default recorderOptions;
