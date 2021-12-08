// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";

import { AzureKeyCredential } from "@azure/core-auth";
import { Recorder, RecorderEnvironmentSetup, env, record } from "@azure-tools/test-recorder";

import { MixedRealityStsClient } from "../../src";
import "./env";

// When the recorder observes the values of these environment variables
// in any recorded HTTP request or response, it will replace them with
// the values they are mapped to below, which are not real account details.
const replaceableVariables: Record<string, string> = {
  MIXEDREALITY_ACCOUNT_DOMAIN: "mixedreality.azure.com",
  MIXEDREALITY_ACCOUNT_ID: "68321d5a-7978-4ceb-b880-0f49751daae9",
  MIXEDREALITY_ACCOUNT_KEY: "NjgzMjFkNWEtNzk3OC00Y2ViLWI4ODAtMGY0OTc1MWRhYWU5"
};

export const environmentSetup: RecorderEnvironmentSetup = {
  replaceableVariables,
  queryParametersToSkip: [],
  customizationsOnRecordings: [
    // Replace the recorded AccessToken value with a fake one.
    // We need a real JWT so that we can still parse the expiration value.
    (recording: string): string =>
      recording.replace(
        /"AccessToken":"[^"]*"/g,
        `"AccessToken":"eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJlbWFpbCI6IkJvYkBjb250b3NvLmNvbSIsImdpdmVuX25hbWUiOiJCb2IiLCJpc3MiOiJodHRwOi8vRGVmYXVsdC5Jc3N1ZXIuY29tIiwiYXVkIjoiaHR0cDovL0RlZmF1bHQuQXVkaWVuY2UuY29tIiwiaWF0IjoiMTYwNzk3ODY4MyIsIm5iZiI6IjE2MDc5Nzg2ODMiLCJleHAiOiIxNjA3OTc4OTgzIn0."`
      )
  ]
};

function getEnv(name: string): string {
  // If a value exists on the real environment, use it,
  // otherwise, try to use the default values from
  // replaceableVariables
  return env[name] ?? replaceableVariables[name];
}

export function createClient(): MixedRealityStsClient {
  const accountDomain = getEnv("MIXEDREALITY_ACCOUNT_DOMAIN");
  const accountId = getEnv("MIXEDREALITY_ACCOUNT_ID");
  const accountKey = getEnv("MIXEDREALITY_ACCOUNT_KEY");

  const keyCredential = new AzureKeyCredential(accountKey);

  return new MixedRealityStsClient(accountId, accountDomain, keyCredential);
}

/**
 * Creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export function createRecorder(context: Context): Recorder {
  return record(context, environmentSetup);
}
