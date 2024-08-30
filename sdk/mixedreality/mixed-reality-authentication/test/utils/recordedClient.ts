// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import "./env";
import { Recorder, RecorderStartOptions, env } from "@azure-tools/test-recorder";
import { Context } from "mocha";
import { AzureKeyCredential, MixedRealityStsClient, MixedRealityStsClientOptions } from "../../src";

export function createClient(options?: MixedRealityStsClientOptions): MixedRealityStsClient {
  const accountDomain = env.MIXEDREALITY_ACCOUNT_DOMAIN as string;
  const accountId = env.MIXEDREALITY_ACCOUNT_ID as string;
  const accountKey = env.MIXEDREALITY_ACCOUNT_KEY as string;

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
  await recorder.addSanitizers(
    {
      removeHeaderSanitizer: {
        headersForRemoval: ["X-MRC-CV", "x-mrc-cv"],
      },
    },
    ["record", "playback"],
  );
  return recorder;
}
