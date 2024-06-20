// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context, Test } from "mocha";
import * as dotenv from "dotenv";

import {
  Recorder,
  RecorderStartOptions,
  SanitizerOptions,
  assertEnvironmentVariable,
  env,
  isPlaybackMode,
} from "@azure-tools/test-recorder";
import { SipRoutingClient, SipTrunk, SipTrunkRoute } from "../../../../src";
import { parseConnectionString } from "@azure/communication-common";
import { TokenCredential } from "@azure/identity";
import { isNodeLike } from "@azure/core-util";
import { createTestCredential } from "@azure-tools/test-credential";
import { randomUUID } from "@azure/core-util";
import { createMSUserAgentPolicy } from "./msUserAgentPolicy";

if (isNodeLike) {
  dotenv.config();
}

export interface RecordedClient<T> {
  client: T;
  recorder: Recorder;
}

const envSetupForPlayback: { [k: string]: string } = {
  COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=YQ==",
  SKIP_UPDATE_CAPABILITIES_LIVE_TESTS: "false",
  COMMUNICATION_ENDPOINT: "https://endpoint/",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "azure_tenant_id",
  AZURE_USERAGENT_OVERRIDE: "fake-useragent",
};

const sanitizerOptions: SanitizerOptions = {
  connectionStringSanitizers: [
    {
      actualConnString: env.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING,
      fakeConnString: envSetupForPlayback["COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING"],
    },
  ],
  generalSanitizers: [
    { regex: true, target: `"access_token"\\s?:\\s?"[^"]*"`, value: `"access_token":"sanitized"` },
    {
      regex: true,
      target: `(https://)([^/'",}]*)`,
      value: `$1endpoint`,
    },
    {
      regex: true,
      target: `[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}`,
      value: `sanitized`,
    },
  ],
};

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback,
  sanitizerOptions: sanitizerOptions,
  removeCentralSanitizers: [
    "AZSDK3493", // .name in the body is not a secret and is listed below in the beforeEach section
    "AZSDK3430", // .id in the body is not a secret and is listed below in the beforeEach section
  ],
};

export async function createRecorder(context: Test | undefined): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start(recorderOptions);
  await recorder.setMatcher("CustomDefaultMatcher", {
    excludedHeaders: [
      "Accept-Language", // This is env-dependent
      "x-ms-content-sha256", // This is dependent on the current datetime
    ],
  });
  return recorder;
}

export async function createRecordedClient(
  context: Context,
): Promise<RecordedClient<SipRoutingClient>> {
  const recorder = await createRecorder(context.currentTest);

  const client = new SipRoutingClient(
    assertEnvironmentVariable("COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING"),
    recorder.configureClientOptions({
      additionalPolicies: [
        {
          policy: createMSUserAgentPolicy(),
          position: "perCall",
        },
      ],
    }),
  );

  return { client, recorder };
}

export function createMockToken(): TokenCredential {
  return {
    getToken: async (_scopes) => {
      return { token: "testToken", expiresOnTimestamp: 11111 };
    },
  };
}

export async function createRecordedClientWithToken(
  context: Context,
): Promise<RecordedClient<SipRoutingClient>> {
  const recorder = await createRecorder(context.currentTest);

  let credential: TokenCredential;
  const endpoint = parseConnectionString(
    assertEnvironmentVariable("COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING"),
  ).endpoint;

  if (isPlaybackMode()) {
    credential = createMockToken();
  } else {
    credential = createTestCredential();
  }

  const client = new SipRoutingClient(
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
  );

  // casting is a workaround to enable min-max testing
  return { client, recorder };
}

export async function clearSipConfiguration(): Promise<void> {
  const client = new SipRoutingClient(
    assertEnvironmentVariable("COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING"),
  );
  await client.setRoutes([]);
  await client.setTrunks([]);
}

let fqdnNumber = 1;
export function getUniqueFqdn(recorder: Recorder): string {
  const id = randomUUID().replace(/-/g, "");
  return recorder.variable(`fqdn-${fqdnNumber++}`, `test${id}.${getAzureTestDomain()}`);
}
export function resetUniqueFqdns(): void {
  fqdnNumber = 1;
}

export async function listAllTrunks(client: SipRoutingClient): Promise<SipTrunk[]> {
  const result: SipTrunk[] = [];

  for await (const trunk of client.listTrunks()) {
    if (trunk) {
      result.push(trunk);
    }
  }
  return result;
}

export async function listAllRoutes(client: SipRoutingClient): Promise<SipTrunkRoute[]> {
  const result: SipTrunkRoute[] = [];
  for await (const route of client.listRoutes()) {
    if (route) {
      result.push(route);
    }
  }
  return result;
}

function getAzureTestDomain(): string {
  return env.AZURE_TEST_DOMAIN ?? "sanitized.sbc.test";
}
