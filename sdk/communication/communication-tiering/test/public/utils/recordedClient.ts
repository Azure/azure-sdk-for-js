// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import * as dotenv from "dotenv";

import type { TokenCredential } from "@azure/identity";
import { ClientSecretCredential, DefaultAzureCredential } from "@azure/identity";
import type { RecorderStartOptions, TestInfo } from "@azure-tools/test-recorder";
import {
  Recorder,
  assertEnvironmentVariable,
  env,
  isPlaybackMode,
} from "@azure-tools/test-recorder";
import { TieringClient } from "../../../src/index.js";
import { isNodeLike } from "@azure/core-util";
import { parseConnectionString } from "@azure/communication-common";

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
  RESOURCE_ID: "9d787bd6-07fc-4c7b-8e57-17f1fee41298",
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
        value: "9d787bd6-07fc-4c7b-8e57-17f1fee41298",
      },
    ],
  },
};

export async function createRecordedClient(
  context: TestInfo,
): Promise<RecordedClient<TieringClient>> {
  const recorder = new Recorder(context);
  await recorder.start(recorderOptions);
  await recorder.setMatcher("CustomDefaultMatcher", {
    excludedHeaders: [
      "Accept-Language", // This is env-dependent
      "x-ms-content-sha256", // This is dependent on the current datetime
    ],
  });

  // casting is a workaround to enable min-max testing
  return {
    client: new TieringClient(
      assertEnvironmentVariable("COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING"),
      recorder.configureClientOptions({}),
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
  context: TestInfo,
): Promise<RecordedClient<TieringClient> | undefined> {
  const recorder = new Recorder(context);
  await recorder.start(recorderOptions);

  let credential: TokenCredential;
  const endpoint = parseConnectionString(
    assertEnvironmentVariable("COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING"),
  ).endpoint;

  if (isPlaybackMode()) {
    credential = createMockToken();

    // casting is a workaround to enable min-max testing
    return {
      client: new TieringClient(endpoint, credential, recorder.configureClientOptions({})),
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
    client: new TieringClient(endpoint, credential, recorder.configureClientOptions({})),
    recorder,
  };
}

export const testPollerOptions = {
  pollInterval: isPlaybackMode() ? 0 : undefined,
};
