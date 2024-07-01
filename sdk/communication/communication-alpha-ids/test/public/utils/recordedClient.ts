// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as dotenv from "dotenv";
import { ClientSecretCredential, DefaultAzureCredential, TokenCredential } from "@azure/identity";
import {
  Recorder,
  RecorderStartOptions,
  assertEnvironmentVariable,
  env,
  isPlaybackMode,
} from "@azure-tools/test-recorder";
import { AlphaIdsClient } from "../../../src";
import { Context } from "mocha";
import { isNodeLike } from "@azure/core-util";
import { parseConnectionString } from "@azure/communication-common";
import { createMSUserAgentPolicy } from "./msUserAgentPolicy";

if (isNodeLike) {
  dotenv.config();
}

export interface RecordedClient<T> {
  client: T;
  recorder: Recorder;
}

const envSetupForPlayback: { [k: string]: string } = {
  COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=banana",
  AZURE_CLIENT_ID: "SomeClientId",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "SomeTenantId",
  AZURE_USERAGENT_OVERRIDE: "fake-useragent",
};

export const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback,
  sanitizerOptions: {
    connectionStringSanitizers: [
      {
        actualConnString: env.COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING,
        fakeConnString: envSetupForPlayback["COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING"],
      },
    ],
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
  context: Context,
): Promise<RecordedClient<AlphaIdsClient>> {
  const recorder = new Recorder(context.currentTest);
  await recorder.start(recorderOptions);

  // casting is a workaround to enable min-max testing
  return {
    client: new AlphaIdsClient(
      assertEnvironmentVariable("COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING"),
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

export function createMockToken(): {
  getToken: (_scopes: string) => Promise<{ token: string; expiresOnTimestamp: number }>;
} {
  return {
    getToken: async (_scopes: string) => {
      return { token: "testToken", expiresOnTimestamp: 11111 };
    },
  };
}

export async function createRecordedClientWithToken(
  context: Context,
): Promise<RecordedClient<AlphaIdsClient> | undefined> {
  const recorder = new Recorder(context.currentTest);
  await recorder.start(recorderOptions);

  let credential: TokenCredential;
  const endpoint = parseConnectionString(
    assertEnvironmentVariable("COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING"),
  ).endpoint;

  if (isPlaybackMode()) {
    credential = createMockToken();

    // casting is a workaround to enable min-max testing
    return {
      client: new AlphaIdsClient(
        endpoint,
        credential,
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

  if (isNodeLike) {
    credential = new DefaultAzureCredential();
  } else {
    credential = new ClientSecretCredential(
      assertEnvironmentVariable("AZURE_TENANT_ID"),
      assertEnvironmentVariable("AZURE_CLIENT_ID"),
      assertEnvironmentVariable("AZURE_CLIENT_SECRET"),
    );
  }

  // casting is a workaround to enable min-max testing
  return {
    client: new AlphaIdsClient(
      endpoint,
      credential,
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
