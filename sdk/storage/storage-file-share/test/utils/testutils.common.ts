import { padStart } from "../../src/utils/utils.common";
import { env, RecorderEnvironmentSetup } from "@azure/test-utils-recorder";

export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

const mockAccountName = "fakestorageaccount";
const mockAccountKey = "aaaaa";
const mockSDAccountName = "sd-fakestorageaccount";
export const recorderEnvSetup: RecorderEnvironmentSetup = {
         replaceableVariables: {
           // Used in record and playback modes
           // 1. The key-value pairs will be used as the environment variables in playback mode
           // 2. If the env variables are present in the recordings as plain strings, they will be replaced with the provided values in record mode
           ACCOUNT_NAME: `${mockAccountName}`,
           ACCOUNT_KEY: `${mockAccountKey}`,
           ACCOUNT_SAS: `${mockAccountKey}`,
           STORAGE_CONNECTION_STRING: `DefaultEndpointsProtocol=https;AccountName=${mockAccountName};AccountKey=${mockAccountKey};EndpointSuffix=core.windows.net`,
           // Comment following line to skip user delegation key/SAS related cases in record and play
           // which depends on this environment variable
           ACCOUNT_TOKEN: `${mockAccountKey}`,
           SOFT_DELETE_ACCOUNT_NAME: `${mockSDAccountName}`,
           SOFT_DELETE_ACCOUNT_KEY: `${mockAccountKey}`,
           SOFT_DELETE_ACCOUNT_SAS: `${mockAccountKey}`,
           SOFT_DELETE_STORAGE_CONNECTION_STRING: `DefaultEndpointsProtocol=https;AccountName=${mockSDAccountName};AccountKey=${mockAccountKey};EndpointSuffix=core.windows.net`
         },
         customizationsOnRecordings: [
           // Used in record mode
           // Array of callback functions can be provided to customize the generated recordings in record mode
           // `sig` param of SAS Token is being filtered here
           (recording: string): string =>
             recording.replace(
               new RegExp(env.ACCOUNT_SAS.match("(.*)&sig=(.*)")[2], "g"),
               `${mockAccountKey}`
             )
         ],
         // SAS token may contain sensitive information
         queryParametersToSkip: [
           // Used in record and playback modes
           "se",
           "sig",
           "sp",
           "spr",
           "srt",
           "ss",
           "st",
           "sv"
         ]
       };

export function getUniqueName(prefix: string): string {
  return `${prefix}${new Date().getTime()}${padStart(
    Math.floor(Math.random() * 10000).toString(),
    5,
    "00000"
  )}`;
}

export function base64encode(content: string): string {
  return isBrowser() ? btoa(content) : Buffer.from(content).toString("base64");
}

export function base64decode(encodedString: string): string {
  return isBrowser() ? atob(encodedString) : Buffer.from(encodedString, "base64").toString();
}
