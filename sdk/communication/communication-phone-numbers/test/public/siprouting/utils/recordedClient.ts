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
import { SipRoutingClient } from "../../../../src";
import { parseConnectionString } from "@azure/communication-common";
import { ClientSecretCredential, DefaultAzureCredential, TokenCredential } from "@azure/identity";
import { createXhrHttpClient, isNode } from "@azure/test-utils";
import { AdditionalPolicyConfig } from "@azure/core-client";
import { createMSUserAgentPolicy } from "../../utils/msUserAgentPolicy";

if (isNode) {
  dotenv.config();
}

const httpClient = isNode || isLiveMode() ? undefined : createXhrHttpClient();

export interface RecordedClient<T> {
  client: T;
  recorder: Recorder;
}

const replaceableVariables: { [k: string]: string } = {
  COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=YQ==",
  SKIP_UPDATE_CAPABILITIES_LIVE_TESTS: "false",
  COMMUNICATION_ENDPOINT: "https://endpoint/",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "azure_tenant_id",
  AZURE_USERAGENT_OVERRIDE: "fake-useragent",
};

export const environmentSetup: RecorderEnvironmentSetup = {
  replaceableVariables,
  customizationsOnRecordings: [
    (recording: string): string => recording.replace(/(https:\/\/)([^/'",}]*)/, "$1endpoint"),
    (recording: string): string =>
      recording.replace(/[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}/gi, "sanitized"),
  ],
  queryParametersToSkip: [],
};

const additionalPolicies: AdditionalPolicyConfig[] = [
  {
    policy: createMSUserAgentPolicy(),
    position: "perRetry",
  },
];

export function createRecordedClient(context: Context): RecordedClient<SipRoutingClient> {
  const recorder = record(context, environmentSetup);

  // casting is a workaround to enable min-max testing
  return {
    client: new SipRoutingClient(env.COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING, {
      httpClient,
      additionalPolicies,
    }),
    recorder,
  };
}

export function createMockToken(): TokenCredential {
  return {
    getToken: async (_scopes) => {
      return { token: "testToken", expiresOnTimestamp: 11111 };
    },
  };
}

export function createRecordedClientWithToken(
  context: Context
): RecordedClient<SipRoutingClient> | undefined {
  const recorder = record(context, environmentSetup);
  let credential: TokenCredential;
  const endpoint = parseConnectionString(
    env.COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING
  ).endpoint;
  if (isPlaybackMode()) {
    credential = createMockToken();

    // casting is a workaround to enable min-max testing
    return {
      client: new SipRoutingClient(endpoint, credential, {
        httpClient,
      }),
      recorder,
    };
  }

  if (isNode) {
    credential = new DefaultAzureCredential();
  } else {
    credential = new ClientSecretCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      env.AZURE_CLIENT_SECRET,
      { httpClient }
    );
  }

  // casting is a workaround to enable min-max testing
  return {
    client: new SipRoutingClient(endpoint, credential, {
      httpClient,
      additionalPolicies,
    }),
    recorder,
  };
}
