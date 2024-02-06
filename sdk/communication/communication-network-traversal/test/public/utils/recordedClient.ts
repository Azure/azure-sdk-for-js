// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context, Test } from "mocha";
import {
  Recorder,
  RecorderStartOptions,
  SanitizerOptions,
  env,
  isPlaybackMode,
} from "@azure-tools/test-recorder";
import { CommunicationIdentityClient } from "@azure/communication-identity";
import { CommunicationRelayClient } from "../../../src";
import { TokenCredential } from "@azure/core-auth";
import { createTestCredential } from "@azure-tools/test-credential";
import { parseConnectionString } from "@azure/communication-common";

export interface RecordedClient {
  identityClient: CommunicationIdentityClient;
  relayClient: CommunicationRelayClient;
  recorder: Recorder;
}

const envSetupForPlayback: { [k: string]: string } = {
  COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=banana",
  AZURE_CLIENT_ID: "SomeClientId",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "12345678-1234-1234-1234-123456789012",
  INCLUDE_PHONENUMBER_LIVE_TESTS: "false",
  COMMUNICATION_ENDPOINT: "https://endpoint/",
  SKIP_INT_IDENTITY_EXCHANGE_TOKEN_TEST: "false",
};

const sanitizerOptions: SanitizerOptions = {
  connectionStringSanitizers: [
    {
      actualConnString: env.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING,
      fakeConnString: envSetupForPlayback["COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING"],
    },
  ],
  uriSanitizers: [
    {
      regex: true,
      target: `(.*)/identities/(?<secret_content>.*?)[/|?](.*)`,
      value: "sanitized",
      groupForReplace: "secret_content",
    },
  ],
  generalSanitizers: [
    { regex: true, target: `"token"\\s?:\\s?"[^"]*"`, value: `"token":"sanitized"` },
    { regex: true, target: `"id"\\s?:\\s?"[^"]*"`, value: `"id":"sanitized"` },
    { regex: true, target: `(https://)([^/',]*)`, value: "$1endpoint" },
    {
      regex: true,
      target: `"expiresOn"\\s?:\\s?"[^"]*"`,
      value: `"expiresOn":"2022-05-18T12:00:00.00+00:00"`,
    },
    { regex: true, target: `"(turn|stun):[^"]*"`, value: `"turn.skype.com"` },
    { regex: true, target: `"username"\\s?:\\s?"[^"]*"`, value: `"username":"sanitized_username"` },
    {
      regex: true,
      target: `"credential"\\s?:\\s?"[^"]*"`,
      value: `"credential":"sanitized_credential"`,
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

export async function createRecordedCommunicationRelayClient(
  context: Context
): Promise<RecordedClient> {
  const recorder = await createRecorder(context.currentTest);

  const identityClient = new CommunicationIdentityClient(
    env.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING ?? "",
    recorder.configureClientOptions({})
  );
  const client = new CommunicationRelayClient(
    env.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING ?? "",
    recorder.configureClientOptions({})
  );

  // casting is a workaround to enable min-max testing
  return {
    identityClient,
    relayClient: client,
    recorder,
  };
}

export async function createRecordedCommunicationRelayClientWithToken(
  context: Context
): Promise<RecordedClient> {
  const recorder = await createRecorder(context.currentTest);

  let credential: TokenCredential;
  const endpoint = parseConnectionString(
    env.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING ?? ""
  ).endpoint;
  if (isPlaybackMode()) {
    credential = {
      getToken: async (_scopes: any) => {
        return { token: "testToken", expiresOnTimestamp: 11111 };
      },
    };
  } else {
    credential = createTestCredential();
  }
  const identityClient = new CommunicationIdentityClient(
    endpoint,
    credential,
    recorder.configureClientOptions({})
  );

  const client = new CommunicationRelayClient(
    endpoint,
    credential,
    recorder.configureClientOptions({})
  );

  return {
    identityClient,
    relayClient: client,
    recorder,
  };
}
