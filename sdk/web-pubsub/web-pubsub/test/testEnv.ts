// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecorderStartOptions } from "@azure-tools/test-recorder";
import {
  getConnectionString,
  getEndpoint,
  getReverseProxyEndpoint,
  getSocketIOEndpoint,
} from "./utils/injectables.js";
import * as MOCKS from "./utils/constants.js";

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: {},
  sanitizerOptions: {
    uriSanitizers: [
      {
        target: getEndpoint(),
        value: MOCKS.ENDPOINT,
      },
      {
        target: getReverseProxyEndpoint(),
        value: MOCKS.REVERSE_PROXY_ENDPOINT,
      },
      {
        target: getSocketIOEndpoint(),
        value: MOCKS.SOCKETIO_ENDPOINT,
      },
    ],
    connectionStringSanitizers: [
      {
        actualConnString: getConnectionString(),
        fakeConnString: MOCKS.CONNECTION_STRING,
      },
    ],
  },
  removeCentralSanitizers: ["AZSDK4001"],
};

export default recorderOptions;
