// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecorderStartOptions, TestInfo } from "@azure-tools/test-recorder";
import {
  Recorder,
  assertEnvironmentVariable,
  isPlaybackMode,
} from "@azure-tools/test-recorder";
import { AlphaIdsClient } from "../../../src/index.js";
import { createMSUserAgentPolicy } from "./msUserAgentPolicy.js";
import { createTestCredential } from "@azure-tools/test-credential";

export interface RecordedClient<T> {
  client: T;
  recorder: Recorder;
}

const envSetupForPlayback: { [k: string]: string } = {
  COMMUNICATION_SERVICE_ENDPOINT: "https://endpoint",
  AZURE_USERAGENT_OVERRIDE: "fake-useragent",
};

export const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback,
  sanitizerOptions: {
    generalSanitizers: [
      {
        regex: true,
        target: `[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}`,
        value: "00000000-0000-0000-0000-000000000000",
      },
    ],
  },
};

export async function createRecordedClient(
  context: TestInfo,
): Promise<RecordedClient<AlphaIdsClient>> {
  const recorder = new Recorder(context);
  await recorder.start(recorderOptions);

  // casting is a workaround to enable min-max testing
  return {
    client: new AlphaIdsClient(
      assertEnvironmentVariable("COMMUNICATION_SERVICE_ENDPOINT"),
      createTestCredential(),
      recorder.configureClientOptions({
        additionalPolicies: [
          {
            policy: createMSUserAgentPolicy(),
            position: "perCall",
          },
        ],
      }),
    ),
    recorder,
  };
}

export async function createRecordedClientWithToken(
  context: TestInfo,
): Promise<RecordedClient<AlphaIdsClient> | undefined> {
  const recorder = new Recorder(context);
  await recorder.start(recorderOptions);

  // casting is a workaround to enable min-max testing
  return {
    client: new AlphaIdsClient(
      assertEnvironmentVariable("COMMUNICATION_SERVICE_ENDPOINT"),
      createTestCredential(),
      recorder.configureClientOptions({
        additionalPolicies: [
          {
            policy: createMSUserAgentPolicy(),
            position: "perCall",
          },
        ],
      }),
    ),
    recorder,
  };
}

export const testPollerOptions = {
  pollInterval: isPlaybackMode() ? 0 : undefined,
};
