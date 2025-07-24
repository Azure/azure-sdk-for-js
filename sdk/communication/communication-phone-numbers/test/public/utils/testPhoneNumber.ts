// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import { randomUUID } from "@azure/core-util";

const DEFAULT_PHONE_NUMBER = "+14155550100";
const testAgentPhoneNumber = (): string => env[`AZURE_PHONE_NUMBER_${env.AZURE_TEST_AGENT}`] ?? "";
const defaultTestPhoneNumber = (): string => env.AZURE_PHONE_NUMBER ?? "";

export function getPhoneNumber(): string {
  return isPlaybackMode() ? DEFAULT_PHONE_NUMBER : getPhoneNumberFromEnvironment();
}

export function getReservationId(): string {
  return isPlaybackMode() ? "00000000-0000-0000-0000-000000000000" : randomUUID();
}

function getPhoneNumberFromEnvironment(): string {
  if (env.SKIP_UPDATE_CAPABILITIES_LIVE_TESTS === "true") {
    return defaultTestPhoneNumber();
  }

  // If either the AZURE_TEST_AGENT or the AZURE_PHONE_NUMBER_<AZURE_TEST_AGENT> are missing,
  // this will return `undefined` and, in turn, tests will fail because of this.
  return testAgentPhoneNumber();
}
