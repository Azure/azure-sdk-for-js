// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import * as dotenv from "dotenv";

import {
  Recorder,
  RecorderEnvironmentSetup,
  env,
  isLiveMode,
  isPlaybackMode,
  record,
} from "@azure-tools/test-recorder";
import { ShortCodesClient, ShortCodesClientOptions } from "../../../src";
import { parseConnectionString } from "@azure/communication-common";
import { ClientSecretCredential, DefaultAzureCredential, TokenCredential } from "@azure/identity";
import { createXhrHttpClient, isNode } from "@azure/test-utils";

if (isNode) {
  dotenv.config();
}

const httpClient = isNode || isLiveMode() ? undefined : createXhrHttpClient();

export interface RecordedClient<T> {
  client: T;
  recorder: Recorder;
}

const replaceableVariables: { [k: string]: string } = {
  COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=banana",
  AZURE_CLIENT_ID: "SomeClientId",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "SomeTenantId",
};

export const environmentSetup: RecorderEnvironmentSetup = {
  replaceableVariables,
  customizationsOnRecordings: [
    (recording: string): string => recording.replace(/(https:\/\/)([^/'",}]*)/, "$1endpoint"),
    (recording: string): string =>
      recording.replace(
        /[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}/gi,
        "00000000-0000-0000-0000-000000000000"
      ),
  ],
  queryParametersToSkip: [],
};

export function createRecordedClient(context: Context): RecordedClient<ShortCodesClient> {
  const recorder = record(context, environmentSetup);

  // casting is a workaround to enable min-max testing
  return {
    client: new ShortCodesClient(env.COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING, {
      httpClient,
    } as ShortCodesClientOptions),
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

export function createRecordedClientWithToken(
  context: Context
): RecordedClient<ShortCodesClient> | undefined {
  const recorder = record(context, environmentSetup);
  let credential: TokenCredential;
  const endpoint = parseConnectionString(
    env.COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING
  ).endpoint;
  if (isPlaybackMode()) {
    credential = createMockToken();

    // casting is a workaround to enable min-max testing
    return {
      client: new ShortCodesClient(endpoint, credential, {
        httpClient,
      } as ShortCodesClientOptions),
      recorder,
    };
  }

  if (isNode) {
    credential = new DefaultAzureCredential();
  } else {
    credential = new ClientSecretCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      env.AZURE_CLIENT_SECRET
    );
  }

  // casting is a workaround to enable min-max testing
  return {
    client: new ShortCodesClient(endpoint, credential, {
      httpClient,
    } as ShortCodesClientOptions),
    recorder,
  };
}

export const testPollerOptions = {
  pollInterval: isPlaybackMode() ? 0 : undefined,
};
