// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env, isPlaybackMode } from "@azure-tools/test-recorder";

const DEFAULT_PHONE_NUMBER = "+14155550100";
const testAgentPhoneNumber = () => env[`AZURE_PHONE_NUMBER_${env.AZURE_TEST_AGENT}`];
const operatorConnectPhoneNumber = () => env[`AZURE_PHONE_NUMBER_OPERATOR_CONNECT`];
const defaultTestPhoneNumber = () => env.AZURE_PHONE_NUMBER;

export function getPhoneNumber(isOperatorConnect = false): string {
  return isPlaybackMode() ? DEFAULT_PHONE_NUMBER : getPhoneNumberFromEnvironment(isOperatorConnect);
}

function getPhoneNumberFromEnvironment(isOperatorConnect = false): string {
  if (env.SKIP_UPDATE_CAPABILITIES_LIVE_TESTS === "true") {
    return defaultTestPhoneNumber();
  }

  if(isOperatorConnect){
    // Requires AZURE_PHONE_NUMBER_OPERATOR_CONNECT number.
    return operatorConnectPhoneNumber();
  }

  // If either the AZURE_TEST_AGENT or the AZURE_PHONE_NUMBER_<AZURE_TEST_AGENT> are missing,
  // this will return `undefined` and, in turn, tests will fail because of this.
  return testAgentPhoneNumber();
}
