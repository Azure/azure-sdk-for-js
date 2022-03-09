// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env, isPlaybackMode } from "@azure-tools/test-recorder";

const DEFAULT_PHONE_NUMBER = "+14155550100";
const testAgentPhoneNumber = () => env[`AZURE_PHONE_NUMBER_${env.AZURE_TEST_AGENT}`];
const defaultTestPhoneNumber = () => env.AZURE_PHONE_NUMBER;

export function getPhoneNumber(): string {
  return isPlaybackMode() ? DEFAULT_PHONE_NUMBER : getPhoneNumberFromEnvironment();
}

function getPhoneNumberFromEnvironment(): string {
  if (env.SKIP_UPDATE_CAPABILITIES_LIVE_TESTS === "true") {
    return defaultTestPhoneNumber();
  }

  // If either the AZURE_TEST_AGENT or the AZURE_PHONE_NUMBER_<AZURE_TEST_AGENT> are missing,
  // this will return `undefined` and, in turn, tests will fail because of this.
  return testAgentPhoneNumber();
}
