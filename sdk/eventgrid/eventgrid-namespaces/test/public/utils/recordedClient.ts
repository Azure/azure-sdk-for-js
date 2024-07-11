// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Test } from "mocha";

import {
  assertEnvironmentVariable,
  Recorder,
  RecorderStartOptions,
} from "@azure-tools/test-recorder";

import { EventGridSenderClient, EventGridReceiverClient } from "../../../src";
import { createTestCredential } from "@azure-tools/test-credential";
import { AdditionalPolicyConfig } from "@azure/core-client";

export interface RecordedV2Client {
  senderClient: EventGridSenderClient;
  receiverClient: EventGridReceiverClient;
  recorder: Recorder;
}

const envSetupForPlayback: { [k: string]: string } = {
  EVENT_GRID_NAMESPACES_ENDPOINT: "https://Sanitized",
  EVENT_SUBSCRIPTION_NAME: "testsubscription1",
  TOPIC_NAME: "testtopic1",
  MAX_DELIVERY_COUNT: "10",
};

export const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback,
  removeCentralSanitizers: [
    "AZSDK4001", // url should not be over-sanitized, fake env setup handles it already
  ],
};

export async function createRecordedClient(
  currentTest: Test | undefined,
  endpointEnv: string,
  topicName: string,
  subscriptionName: string,
  options: {
    additionalPolicies?: AdditionalPolicyConfig[];
  } = {},
): Promise<RecordedV2Client> {
  const recorder = new Recorder(currentTest);
  await recorder.start(recorderOptions);

  return {
    senderClient: new EventGridSenderClient(
      assertEnvironmentVariable(endpointEnv),
      createTestCredential(),
      topicName,
      recorder.configureClientOptions({
        additionalPolicies: options.additionalPolicies,
      }),
    ),
    receiverClient: new EventGridReceiverClient(
      assertEnvironmentVariable(endpointEnv),
      createTestCredential(),
      topicName,
      subscriptionName,
      recorder.configureClientOptions({
        additionalPolicies: options.additionalPolicies,
      }),
    ),
    recorder,
  };
}
