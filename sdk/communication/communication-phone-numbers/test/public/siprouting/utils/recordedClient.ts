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
import { SipDomain, SipRoutingClient, SipTrunk, SipTrunkRoute } from "../../../../src";
import { parseConnectionString } from "@azure/communication-common";
import { TokenCredential } from "@azure/identity";
import { isNode } from "@azure/test-utils";
import { v4 as uuid } from "uuid";
import { createTestCredential } from "@azure-tools/test-credential";
import { createMSUserAgentPolicy } from "./msUserAgentPolicy";
import { AdditionalPolicyConfig } from "@azure/core-client";

if (isNode) {
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
  headerSanitizers: [
    {
      key: "Sec-Fetch-Dest",
      value: "empty",
    },
  ],
};

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback,
  sanitizerOptions: sanitizerOptions,
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
  mockedAPI: boolean = false
): Promise<RecordedClient<SipRoutingClient>> {
  const recorder = await createRecorder(context.currentTest);
  const policies = getAdditionalPolicies(mockedAPI);

  const client = new SipRoutingClient(
    assertEnvironmentVariable("COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING"),
    recorder.configureClientOptions({ additionalPolicies: policies })
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
  mockedAPI: boolean = false
): Promise<RecordedClient<SipRoutingClient>> {
  const recorder = await createRecorder(context.currentTest);
  const policies = getAdditionalPolicies(mockedAPI);

  let credential: TokenCredential;
  const endpoint = parseConnectionString(
    assertEnvironmentVariable("COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING")
  ).endpoint;

  if (isPlaybackMode()) {
    credential = createMockToken();
  } else {
    credential = createTestCredential();
  }

  const client = new SipRoutingClient(
    endpoint,
    credential,
    recorder.configureClientOptions({ additionalPolicies: policies })
  );

  // casting is a workaround to enable min-max testing
  return { client, recorder };
}

export async function clearSipConfiguration(): Promise<void> {
  const client = new SipRoutingClient(
    assertEnvironmentVariable("COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING")
  );
  await client.setRoutes([]);
  await client.setTrunks([]);
  const verifiedDomains = (await listAllDomains(client)).filter((x) => x.enabled === true);
  await client.setDomains(verifiedDomains);
}

let fqdnNumber = 1;
let domainNumber = 1;
export function getUniqueFqdn(recorder: Recorder, domain = ""): string {
  fqdnNumber++;
  const fqdn =
    domain.length > 0 ? `test${fqdnNumber}.` + domain : `test${fqdnNumber}.` + getAzureTestDomain();
  return recorder.variable(`fqdn-${fqdnNumber}`, fqdn);
}

export function getUniqueDomain(recorder: Recorder): string {
  const uniqueDomain = uuid().replace(/-/g, "") + ".skype.net";
  return recorder.variable(`domain-${domainNumber++}`, `${uniqueDomain}`);
}

export function resetUniqueFqdns(): void {
  fqdnNumber = 0;
}

export async function listAllTrunks(
  client: SipRoutingClient,
  includeHealth?: boolean
): Promise<SipTrunk[]> {
  const result = [];
  for await (const trunk of client.listTrunks({ includeHealth })) {
    result.push(trunk);
  }
  return result;
}

export async function listAllDomains(client: SipRoutingClient): Promise<SipDomain[]> {
  const result: SipDomain[] = [];
  for await (const domain of client.listDomains()) {
    result.push(domain);
  }
  return result;
}

export function resetUniqueDomains(): void {
  domainNumber = 1;
}

export function getAdditionalPolicies(mockedApi: boolean): AdditionalPolicyConfig[] {
  const additionalPolicies: AdditionalPolicyConfig[] = [
    {
      policy: createMSUserAgentPolicy(mockedApi),
      position: "perRetry",
    },
  ];

  return additionalPolicies;
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

export function getAzureTestDomain(): string {
  return env.AZURE_TEST_DOMAIN ?? "sanitized.sbc.test";
}
