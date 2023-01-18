// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import "./env";
import {
  Recorder,
  RecorderStartOptions,
  env
} from "@azure-tools/test-recorder";
import { AzureKeyCredential } from "@azure/core-auth";
import { Context } from "mocha";
import { MixedRealityStsClient, MixedRealityStsClientOptions } from "../../src";

// When the recorder observes the values of these environment variables
// in any recorded HTTP request or response, it will replace them with
// the values they are mapped to below, which are not real account details.
// const replaceableVariables: Record<string, string> = {
//   MIXEDREALITY_ACCOUNT_DOMAIN: "mixedreality.azure.com",
//   MIXEDREALITY_ACCOUNT_ID: "68321d5a-7978-4ceb-b880-0f49751daae9",
//   MIXEDREALITY_ACCOUNT_KEY: "NjgzMjFkNWEtNzk3OC00Y2ViLWI4ODAtMGY0OTc1MWRhYWU5",
// };

// export const environmentSetup: RecorderEnvironmentSetup = {
//   replaceableVariables,
//   queryParametersToSkip: [],
//   customizationsOnRecordings: [
//     // Replace the recorded AccessToken value with a fake one.
//     // We need a real JWT so that we can still parse the expiration value.
//     (recording: string): string =>
//       recording.replace(
//         /"AccessToken":"[^"]*"/g,
//         `"AccessToken":"eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJlbWFpbCI6IkJvYkBjb250b3NvLmNvbSIsImdpdmVuX25hbWUiOiJCb2IiLCJpc3MiOiJodHRwOi8vRGVmYXVsdC5Jc3N1ZXIuY29tIiwiYXVkIjoiaHR0cDovL0RlZmF1bHQuQXVkaWVuY2UuY29tIiwiaWF0IjoiMTYwNzk3ODY4MyIsIm5iZiI6IjE2MDc5Nzg2ODMiLCJleHAiOiIxNjA3OTc4OTgzIn0."`
//       ),
//   ],
// };

// function getEnv(name: string): string {
//   // If a value exists on the real environment, use it,
//   // otherwise, try to use the default values from
//   // replaceableVariables
//   return env[name] ?? replaceableVariables[name];
// }

export function createClient(options?: MixedRealityStsClientOptions): MixedRealityStsClient {
  const accountDomain = env.MIXEDREALITY_ACCOUNT_DOMAIN as string;
  const accountId = env.MIXEDREALITY_ACCOUNT_ID as string;
  const accountKey = env.MIXEDREALITY_ACCOUNT_KEY as string;
//   const httpClient = isNode || isLiveMode() ? undefined : createXhrHttpClient();

  const keyCredential = new AzureKeyCredential(accountKey);
  return new MixedRealityStsClient(accountId, accountDomain, keyCredential, { ...options });
}

/**
 * Creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export async function createRecorder(context: Context): Promise<Recorder> {
  const recorderStartOptions: RecorderStartOptions = {
    envSetupForPlayback: {
      AZURE_CLIENT_ID: "azure_client_id",
      AZURE_CLIENT_SECRET: "azure_client_secret",
      AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
      MIXEDREALITY_ACCOUNT_DOMAIN: "mixedreality.azure.com",
      MIXEDREALITY_ACCOUNT_ID: "68321d5a-7978-4ceb-b880-0f49751daae9",
      MIXEDREALITY_ACCOUNT_KEY: "NjgzMjFkNWEtNzk3OC00Y2ViLWI4ODAtMGY0OTc1MWRhYWU5",
    },
  };
  const recorder = new Recorder(context.currentTest);
  await recorder.start(recorderStartOptions);
  return recorder;
}
