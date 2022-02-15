import { env, isPlaybackMode } from "@azure-tools/test-recorder";

const DEFAULT_PHONE_NUMBER = "+14155550100";
const testAgent = () => env.AZURE_TEST_AGENT;
const testAgentPhoneNumber = () => env[`AZURE_PHONE_NUMBER_${env.AZURE_TEST_AGENT}`];
const defaultTestPhoneNumber = () => env.AZURE_PHONE_NUMBER;

export function getPhoneNumber(): string {
  return isPlaybackMode() ? DEFAULT_PHONE_NUMBER : getPhoneNumberFromEnvironment();
}

function getPhoneNumberFromEnvironment(): string {
  return testAgent() ? testAgentPhoneNumber() : defaultTestPhoneNumber();
}