import { padStart } from "../../src/utils/utils.common";
import {
  setReplaceableVariables,
  skipQueryParams,
  env,
  setReplacements
} from "@azure/test-utils-recorder";

export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function setupEnvironment() {
  // setReplaceableVariables()
  // 1. The key-value pairs will be used as the environment variables in playback
  // 2. If the env variales are present in the recordings as plain strings, they will be replaced with the provided values
  setReplaceableVariables({
    // Providing dummy values
    ACCOUNT_NAME: "fakestorageaccount",
    ACCOUNT_KEY: "aaaaa",
    ACCOUNT_SAS: "aaaaa",
    STORAGE_CONNECTION_STRING: `DefaultEndpointsProtocol=https;AccountName=${env.ACCOUNT_NAME};AccountKey=${env.ACCOUNT_KEY};EndpointSuffix=core.windows.net`,
    // Comment following line to skip user delegation key/SAS related cases in record and play
    // which depends on this environment variable
    ACCOUNT_TOKEN: "aaaaa"
  });

  // Array of callback functions can be passed to `setReplacements` to customize the generated recordings
  // `sig` param of SAS Token is being filtered here
  setReplacements([
    (recording: string): string =>
      recording.replace(new RegExp(env.ACCOUNT_SAS.match("(.*)&sig=(.*)")[2], "g"), "aaaaa")
  ]);

  // SAS token may contain sensitive information
  // skipQueryParams() method will filter out the plain parameter info from the recordings
  skipQueryParams(["se", "sig", "sp", "spr", "srt", "ss", "st", "sv"]);
}

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
