// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import "./env";

import { Context } from "mocha";
import { createTestCredential } from "@azure-tools/test-credential";
import { AccessControlClient, AccessControlClientOptionalParams } from "../../../src";
import {
  Recorder,
  RecorderStartOptions,
  env,
} from "@azure-tools/test-recorder";


// export const environmentSetup: RecorderEnvironmentSetup = {
//   replaceableVariables,
//   customizationsOnRecordings: [
//     (recording: string): string =>
//       recording.replace(/"access_token"\s?:\s?"[^"]*"/g, `"access_token":"access_token"`),
//     // If we put ENDPOINT in replaceableVariables above, it will not capture
//     // the endpoint string used with nock, which will be expanded to
//     // https://<endpoint>:443/ and therefore will not match, so we have to do
//     // this instead.
//     (recording: string): string => {
//       const replaced = recording.replace(
//         "testaccount.dev.azuresynapse.net:443",
//         "testaccount.dev.azuresynapse.net"
//       );
//       return replaced;
//     },
//   ],
//   queryParametersToSkip: [],
// };

export function createClient(options?: AccessControlClientOptionalParams): AccessControlClient {
  let credential = createTestCredential();
  // credential = new ClientSecretCredential(
  //   env.AZURE_TENANT_ID,
  //   env.AZURE_CLIENT_ID,
  //   env.AZURE_CLIENT_SECRET,
  //   { httpClient }
  // );

  let endpoint = env.ENDPOINT ? env.ENDPOINT : "endpoint";
  return new AccessControlClient(credential, endpoint, { ...options });
}

/**
 * creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export async function createRecorder(context: Context): Promise<Recorder> {
  const recorderStartOptions: RecorderStartOptions = {
    envSetupForPlayback: {
      AZURE_CLIENT_ID: "azure_client_id",
      AZURE_CLIENT_SECRET: "azure_client_secret",
      AZURE_TENANT_ID: "azuretenantid",
    },
  };
  const recorder = new Recorder(context.currentTest);
  await recorder.start(recorderStartOptions);
  recorder.addSanitizers({
    generalSanitizers:[
      {
        regex: true,
        target: `/"access_token"\s?:\s?"[^"]*"/g`,
        value: `"access_token":"access_token"`,
      },
      {
        target: "testaccount.dev.azuresynapse.net:44,3",
        value: "testaccount.dev.azuresynapse.net"
      }
    ]
  })
  return recorder;

}
